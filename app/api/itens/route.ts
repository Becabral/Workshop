import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { CategoriaItem } from "@prisma/client";

const VALID_CATEGORIAS: CategoriaItem[] = [
  "QUARTO",
  "COZINHA",
  "SALA",
  "ESCRITORIO",
  "BANHEIRO",
  "AREA_SERVICO",
  "CAIXAS",
];

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categoriaParam = searchParams.get("categoria");

  const categoria =
    categoriaParam && VALID_CATEGORIAS.includes(categoriaParam as CategoriaItem)
      ? (categoriaParam as CategoriaItem)
      : undefined;

  try {
    const itens = await db.item.findMany({
      where: {
        // Catalog defaults (userId null) OR the user's own custom items
        OR: [{ userId: null }, { userId: session.user.id }],
        ...(categoria && { categoria }),
      },
      orderBy: [{ categoria: "asc" }, { nome: "asc" }],
    });

    return NextResponse.json(itens);
  } catch (error) {
    console.error("GET /api/itens error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
