import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  activeDbMudancaStatuses,
  serializeMudancaStatus,
} from "@/lib/mudanca-status";
import { checkUsageLimit } from "@/lib/subscription";
import { mudancaSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import type { UserWithPlan } from "@/types";

type MudancaRow = {
  id: string;
  userId: string;
  enderecoOrigem: string;
  enderecoDestino: string;
  dataDesejada: Date | null;
  caminhaoId: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  cotacoesCount: bigint | number;
  caminhaoNome: string | null;
  caminhaoTipo: string | null;
  caminhaoCapacidadeM3: number | null;
  caminhaoCapacidadeKg: number | null;
  caminhaoComprimentoCm: number | null;
  caminhaoLarguraCm: number | null;
  caminhaoAlturaCm: number | null;
  caminhaoImagemUrl: string | null;
};

function serializeMudancaRow(row: MudancaRow) {
  return serializeMudancaStatus({
    id: row.id,
    userId: row.userId,
    enderecoOrigem: row.enderecoOrigem,
    enderecoDestino: row.enderecoDestino,
    dataDesejada: row.dataDesejada,
    caminhaoId: row.caminhaoId,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    caminhao: row.caminhaoId
      ? {
          id: row.caminhaoId,
          nome: row.caminhaoNome,
          tipo: row.caminhaoTipo,
          capacidadeM3: row.caminhaoCapacidadeM3,
          capacidadeKg: row.caminhaoCapacidadeKg,
          comprimentoCm: row.caminhaoComprimentoCm,
          larguraCm: row.caminhaoLarguraCm,
          alturaCm: row.caminhaoAlturaCm,
          imagemUrl: row.caminhaoImagemUrl,
          createdAt: row.createdAt,
        }
      : null,
    cargaLayout: null,
    _count: {
      cotacoes:
        typeof row.cotacoesCount === "bigint"
          ? Number(row.cotacoesCount)
          : row.cotacoesCount,
    },
  });
}

async function getMudancasByUserId(userId: string) {
  const rows = await db.$queryRaw<MudancaRow[]>(Prisma.sql`
    SELECT
      m."id",
      m."userId",
      m."enderecoOrigem",
      m."enderecoDestino",
      m."dataDesejada",
      m."caminhaoId",
      m."status"::text AS "status",
      m."createdAt",
      m."updatedAt",
      COUNT(c."id") AS "cotacoesCount",
      cam."nome" AS "caminhaoNome",
      cam."tipo" AS "caminhaoTipo",
      cam."capacidadeM3" AS "caminhaoCapacidadeM3",
      cam."capacidadeKg" AS "caminhaoCapacidadeKg",
      cam."comprimentoCm" AS "caminhaoComprimentoCm",
      cam."larguraCm" AS "caminhaoLarguraCm",
      cam."alturaCm" AS "caminhaoAlturaCm",
      cam."imagemUrl" AS "caminhaoImagemUrl"
    FROM "Mudanca" m
    LEFT JOIN "Cotacao" c ON c."mudancaId" = m."id"
    LEFT JOIN "Caminhao" cam ON cam."id" = m."caminhaoId"
    WHERE m."userId" = ${userId}
    GROUP BY
      m."id",
      cam."id"
    ORDER BY m."createdAt" DESC
  `);

  return rows.map(serializeMudancaRow);
}

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const mudancas = await getMudancasByUserId(session.user.id);
    return NextResponse.json(mudancas);
  } catch (error) {
    console.error("GET /api/mudancas error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = mudancaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const user: UserWithPlan = {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email,
      image: session.user.image ?? null,
      plan: (session.user.plan as UserWithPlan["plan"]) ?? "FREE",
      trialEndsAt: session.user.trialEndsAt
        ? new Date(session.user.trialEndsAt)
        : null,
      stripeCustomerId: session.user.stripeCustomerId ?? null,
      stripePriceId: null,
      stripeSubscriptionId: session.user.stripeSubscriptionId ?? null,
      stripeCurrentPeriodEnd: session.user.stripeCurrentPeriodEnd
        ? new Date(session.user.stripeCurrentPeriodEnd)
        : null,
    };

    const activeRows = await db.$queryRaw<Array<{ status: string }>>(Prisma.sql`
      SELECT "status"::text AS "status"
      FROM "Mudanca"
      WHERE "userId" = ${session.user.id}
    `);

    const activeCount = activeRows.filter((mudanca) =>
      activeDbMudancaStatuses.includes(
        mudanca.status as (typeof activeDbMudancaStatuses)[number]
      )
    ).length;

    const limitCheck = checkUsageLimit(user, "mudancasAtivas", activeCount);

    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          error: "Limite do plano atingido",
          message: `Seu plano permite no máximo ${limitCheck.limit} mudança(s) ativa(s). Faça upgrade para criar mais.`,
          limit: limitCheck,
        },
        { status: 403 }
      );
    }

    const { enderecoOrigem, enderecoDestino, dataDesejada, caminhaoId } = parsed.data;

    const mudancaId = crypto.randomUUID();

    await db.$executeRaw(
      Prisma.sql`
        INSERT INTO "Mudanca"
          ("id", "userId", "enderecoOrigem", "enderecoDestino", "dataDesejada", "itens", "caminhaoId", "status", "createdAt", "updatedAt")
        VALUES
          (
            ${mudancaId},
            ${session.user.id},
            ${enderecoOrigem},
            ${enderecoDestino},
            ${dataDesejada ? new Date(dataDesejada) : new Date()},
            ${JSON.stringify([])}::jsonb,
            ${caminhaoId ?? null},
            CAST('DRAFT' AS "MudancaStatus"),
            NOW(),
            NOW()
          )
      `
    );

    const mudancas = await getMudancasByUserId(session.user.id);
    const mudanca = mudancas.find((item) => item.id === mudancaId);

    if (!mudanca) {
      throw new Error("Mudanca criada, mas nao encontrada para serializacao");
    }

    return NextResponse.json(mudanca, { status: 201 });
  } catch (error) {
    console.error("POST /api/mudancas error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
