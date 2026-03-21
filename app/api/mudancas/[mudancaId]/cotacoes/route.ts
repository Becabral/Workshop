import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type RouteParams = { params: Promise<{ mudancaId: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mudancaId } = await params;

  try {
    const mudanca = await db.mudanca.findUnique({
      where: { id: mudancaId },
      select: { userId: true },
    });

    if (!mudanca) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (mudanca.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const cotacoes = await db.cotacao.findMany({
      where: { mudancaId },
      include: { transportadora: true },
      orderBy: { precoCentavos: "asc" },
    });

    return NextResponse.json(cotacoes);
  } catch (error) {
    console.error(`GET /api/mudancas/${mudancaId}/cotacoes error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Placeholder: Create mock cotação
export async function POST(_request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mudancaId } = await params;

  try {
    const mudanca = await db.mudanca.findUnique({
      where: { id: mudancaId },
      select: { userId: true },
    });

    if (!mudanca) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (mudanca.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Find or create a mock transportadora for seeding purposes
    let transportadora = await db.transportadora.findFirst({
      where: { nome: "Transportadora Demo" },
    });

    if (!transportadora) {
      transportadora = await db.transportadora.create({
        data: {
          nome: "Transportadora Demo",
          notaMedia: 4.5,
          totalAvaliacoes: 42,
          cidade: "São Paulo",
          tiposCaminhao: ["FIORINO", "VAN", "3/4"],
        },
      });
    }

    const dataDisponivel = new Date();
    dataDisponivel.setDate(dataDisponivel.getDate() + 3);

    const validade = new Date();
    validade.setDate(validade.getDate() + 7);

    // Mock price between R$ 500 and R$ 2000
    const precoCentavos = Math.floor(Math.random() * 150000) + 50000;

    const cotacao = await db.cotacao.create({
      data: {
        mudancaId,
        transportadoraId: transportadora.id,
        precoCentavos,
        dataDisponivel,
        seguroIncluso: Math.random() > 0.5,
        validade,
      },
      include: { transportadora: true },
    });

    return NextResponse.json(cotacao, { status: 201 });
  } catch (error) {
    console.error(`POST /api/mudancas/${mudancaId}/cotacoes error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
