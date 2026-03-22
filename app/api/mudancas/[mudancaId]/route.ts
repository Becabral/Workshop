import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  mapUiMudancaStatusToDb,
  serializeMudancaStatus,
  type UiMudancaStatus,
} from "@/lib/mudanca-status";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateMudancaSchema = z.object({
  enderecoOrigem: z.string().min(5).max(300).optional(),
  enderecoDestino: z.string().min(5).max(300).optional(),
  dataDesejada: z.string().datetime().nullable().optional(),
  caminhaoId: z.string().cuid().nullable().optional(),
  status: z.enum(["RASCUNHO", "COTANDO", "CONFIRMADA", "CONCLUIDA"]).optional(),
});

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
      include: {
        caminhao: true,
        cotacoes: {
          include: { transportadora: true },
          orderBy: { precoCentavos: "asc" },
        },
        cargaLayout: {
          include: {
            caminhao: true,
            itens: {
              include: { item: true },
            },
          },
        },
      },
    });

    if (!mudanca) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (mudanca.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(serializeMudancaStatus(mudanca));
  } catch (error) {
    console.error(`GET /api/mudancas/${mudancaId} error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mudancaId } = await params;

  try {
    const existing = await db.mudanca.findUnique({
      where: { id: mudancaId },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateMudancaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const { enderecoOrigem, enderecoDestino, dataDesejada, caminhaoId, status } =
      parsed.data;

    const mudanca = await db.mudanca.update({
      where: { id: mudancaId },
      data: {
        ...(enderecoOrigem !== undefined && { enderecoOrigem }),
        ...(enderecoDestino !== undefined && { enderecoDestino }),
        ...(dataDesejada !== undefined && {
          dataDesejada: dataDesejada ? new Date(dataDesejada) : null,
        }),
        ...(caminhaoId !== undefined && { caminhaoId }),
        ...(status !== undefined && {
          status: mapUiMudancaStatusToDb(status as UiMudancaStatus) as never,
        }),
      },
      include: {
        caminhao: true,
        cargaLayout: true,
        _count: {
          select: { cotacoes: true },
        },
      },
    });

    return NextResponse.json(serializeMudancaStatus(mudanca));
  } catch (error) {
    console.error(`PATCH /api/mudancas/${mudancaId} error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mudancaId } = await params;

  try {
    const existing = await db.mudanca.findUnique({
      where: { id: mudancaId },
      select: { userId: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (existing.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.mudanca.delete({ where: { id: mudancaId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(`DELETE /api/mudancas/${mudancaId} error:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
