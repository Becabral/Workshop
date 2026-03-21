import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const caminhoes = await db.caminhao.findMany({
      orderBy: { capacidadeM3: "asc" },
    });

    return NextResponse.json(caminhoes);
  } catch (error) {
    console.error("GET /api/caminhoes error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
