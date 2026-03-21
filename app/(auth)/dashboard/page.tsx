"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  Package,
  MapPin,
  Calendar,
  Plus,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaywallGate } from "@/components/paywall/paywall-gate";
import { PLAN_LIMITS } from "@/lib/subscription";

// ─── Types ────────────────────────────────────────────────

type MudancaStatus = "Rascunho" | "Cotando" | "Confirmada" | "Concluída";

interface Mudanca {
  id: string;
  status: MudancaStatus;
  enderecoOrigem: string;
  enderecoDestino: string;
  dataDesejada: string;
  numeroItens: number;
  caminhaoSelecionado: string | null;
}

// ─── Mock Data ────────────────────────────────────────────

const MOCK_MUDANCAS: Mudanca[] = [
  {
    id: "mud_001",
    status: "Confirmada",
    enderecoOrigem: "Rua das Flores, 123 – São Paulo, SP",
    enderecoDestino: "Av. Paulista, 1500 – São Paulo, SP",
    dataDesejada: "2026-04-05",
    numeroItens: 34,
    caminhaoSelecionado: "Caminhão Baú 3/4",
  },
  {
    id: "mud_002",
    status: "Cotando",
    enderecoOrigem: "Rua XV de Novembro, 80 – Curitiba, PR",
    enderecoDestino: "Rua Marechal Deodoro, 200 – Curitiba, PR",
    dataDesejada: "2026-04-18",
    numeroItens: 21,
    caminhaoSelecionado: null,
  },
  {
    id: "mud_003",
    status: "Rascunho",
    enderecoOrigem: "Rua Consolação, 400 – São Paulo, SP",
    enderecoDestino: "Rua Oscar Freire, 900 – São Paulo, SP",
    dataDesejada: "2026-05-10",
    numeroItens: 8,
    caminhaoSelecionado: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────

const STATUS_STYLES: Record<MudancaStatus, { label: string; className: string }> = {
  Rascunho: {
    label: "Rascunho",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  Cotando: {
    label: "Cotando",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  Confirmada: {
    label: "Confirmada",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  Concluída: {
    label: "Concluída",
    className: "bg-green-100 text-green-700 border-green-200",
  },
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

// ─── MudancaCard ──────────────────────────────────────────

function MudancaCard({ mudanca }: { mudanca: Mudanca }) {
  const statusStyle = STATUS_STYLES[mudanca.status];

  return (
    <Link href={`/dashboard/mudanca/${mudanca.id}`}>
    <Card className="group cursor-pointer border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <Badge
          variant="outline"
          className={`text-xs font-medium ${statusStyle.className}`}
        >
          {statusStyle.label}
        </Badge>
        <span className="inline-flex items-center h-7 px-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
          Ver detalhes
          <ArrowRight className="ml-1 h-3 w-3" />
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Origin → Destination */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" />
            <span className="leading-snug">{mudanca.enderecoOrigem}</span>
          </div>
          <div className="ml-6 flex items-center gap-1.5 text-xs text-gray-400">
            <ArrowRight className="h-3 w-3" />
            <span className="leading-snug text-gray-600">
              {mudanca.enderecoDestino}
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5 text-[#F59E0B]" />
            <span>{formatDate(mudanca.dataDesejada)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Package className="h-3.5 w-3.5 text-[#2563EB]" />
            <span>
              {mudanca.numeroItens}{" "}
              {mudanca.numeroItens === 1 ? "item" : "itens"}
            </span>
          </div>

          {mudanca.caminhaoSelecionado && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Truck className="h-3.5 w-3.5 text-gray-400" />
              <span>{mudanca.caminhaoSelecionado}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  const userPlan = session.user.plan || "FREE";
  const mudancaCount = MOCK_MUDANCAS.length;
  const freeLimit = PLAN_LIMITS.FREE.mudancasAtivas;
  const isAtLimit = userPlan === "FREE" && mudancaCount >= freeLimit;

  return (
    <div className="flex flex-col gap-8 px-8 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Minhas Mudanças
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie e acompanhe todas as suas mudanças em um só lugar.
          </p>
        </div>

        <PaywallGate
          featureName="mudança ativa"
          currentUsage={mudancaCount}
          limit={freeLimit}
          isBlocked={isAtLimit}
        >
          <Link href="/dashboard/nova-mudanca">
            <Button className="gap-2 bg-[#2563EB] text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Nova Mudança
            </Button>
          </Link>
        </PaywallGate>
      </div>

      {/* Mudanças list */}
      {MOCK_MUDANCAS.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-20 text-center">
          <Truck className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-800">
            Nenhuma mudança ainda
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Crie sua primeira mudança para começar a receber cotações.
          </p>
          <Link href="/dashboard/nova-mudanca">
            <Button className="mt-6 gap-2 bg-[#2563EB] text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Nova Mudança
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MUDANCAS.map((mudanca) => (
            <MudancaCard key={mudanca.id} mudanca={mudanca} />
          ))}
        </div>
      )}
    </div>
  );
}
