"use client";

import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import {
  Truck,
  Package,
  MapPin,
  ArrowRight,
  BarChart3,
  Weight,
  Loader2,
  ChevronLeft,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────

type MudancaStatus = "Rascunho" | "Cotando" | "Confirmada" | "Concluída";

interface Truck {
  id: string;
  nome: string;
  capacidadeVolume: number; // m³
  capacidadePeso: number;   // kg
  descricao: string;
}

interface Cotacao {
  id: string;
  empresa: string;
  valor: number;
  prazoEntrega: string;
  avaliacao: number;
}

// ─── Mock Data ────────────────────────────────────────────

const MOCK_MUDANCA = {
  id: "mud_001",
  status: "Cotando" as MudancaStatus,
  enderecoOrigem: "Rua das Flores, 123 – São Paulo, SP",
  enderecoDestino: "Av. Paulista, 1500 – São Paulo, SP",
  dataDesejada: "2026-04-05",
  volumeTotal: 8.4,       // m³
  pesoTotal: 420,         // kg
  capacidadeCaminhao: 14, // m³ do caminhão selecionado
};

const MOCK_TRUCKS: Truck[] = [
  {
    id: "fiorino",
    nome: "Fiorino",
    capacidadeVolume: 2.5,
    capacidadePeso: 500,
    descricao: "Ideal para estúdios e pequenos apartamentos",
  },
  {
    id: "hr",
    nome: "HR (Pickup)",
    capacidadeVolume: 5,
    capacidadePeso: 1000,
    descricao: "Perfeito para apartamentos de 1 a 2 quartos",
  },
  {
    id: "tres_quartos",
    nome: "Caminhão 3/4",
    capacidadeVolume: 14,
    capacidadePeso: 2500,
    descricao: "Apartamentos de 2 a 3 quartos",
  },
  {
    id: "bau",
    nome: "Caminhão Baú",
    capacidadeVolume: 35,
    capacidadePeso: 8000,
    descricao: "Casas grandes e mudanças comerciais",
  },
];

const MOCK_COTACOES: Cotacao[] = [
  {
    id: "cot_001",
    empresa: "MudaTrans Logística",
    valor: 1250,
    prazoEntrega: "1 dia",
    avaliacao: 4.8,
  },
  {
    id: "cot_002",
    empresa: "Fretes Rápidos SP",
    valor: 980,
    prazoEntrega: "2 dias",
    avaliacao: 4.5,
  },
];

// ─── Helpers ──────────────────────────────────────────────

const STATUS_STYLES: Record<MudancaStatus, { label: string; className: string }> = {
  Rascunho: { label: "Rascunho", className: "bg-gray-100 text-gray-600 border-gray-200" },
  Cotando: { label: "Cotando", className: "bg-amber-100 text-amber-700 border-amber-200" },
  Confirmada: { label: "Confirmada", className: "bg-blue-100 text-blue-700 border-blue-200" },
  Concluída: { label: "Concluída", className: "bg-green-100 text-green-700 border-green-200" },
};

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

// ─── Sub-components ───────────────────────────────────────

function CargoSummaryPanel() {
  const ocupacao = Math.round((MOCK_MUDANCA.volumeTotal / MOCK_MUDANCA.capacidadeCaminhao) * 100);

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <BarChart3 className="h-4 w-4 text-[#2563EB]" />
          Resumo da Carga
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Volume</div>
            <div className="text-lg font-semibold text-[#2563EB]">
              {MOCK_MUDANCA.volumeTotal} m³
            </div>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Peso</div>
            <div className="text-lg font-semibold text-[#F59E0B]">
              <Weight className="inline h-4 w-4 mr-0.5 mb-0.5" />
              {MOCK_MUDANCA.pesoTotal} kg
            </div>
          </div>
        </div>

        {/* Occupation bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Ocupação do veículo</span>
            <span className="font-medium text-gray-700">{ocupacao}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-2 rounded-full bg-[#2563EB] transition-all"
              style={{ width: `${Math.min(ocupacao, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-400">
            {MOCK_MUDANCA.volumeTotal} m³ de {MOCK_MUDANCA.capacidadeCaminhao} m³ utilizados
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TruckSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Truck className="h-4 w-4 text-[#2563EB]" />
          Selecionar Veículo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {MOCK_TRUCKS.map((truck) => {
          const isSelected = selected === truck.id;
          return (
            <div
              key={truck.id}
              className={`rounded-lg border-2 p-3 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#2563EB] bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => onSelect(truck.id)}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className={`text-sm font-medium ${isSelected ? "text-[#2563EB]" : "text-gray-800"}`}>
                    {truck.nome}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">
                    {truck.descricao}
                  </div>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-gray-400">
                      {truck.capacidadeVolume} m³
                    </span>
                    <span className="text-xs text-gray-400">
                      {truck.capacidadePeso} kg
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className={`shrink-0 h-7 px-3 text-xs ${
                    isSelected
                      ? "bg-[#2563EB] text-white hover:bg-blue-700"
                      : "border-gray-200 text-gray-600 hover:border-[#2563EB] hover:text-[#2563EB]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(truck.id);
                  }}
                >
                  {isSelected ? "Selecionado" : "Selecionar"}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function CotacoesPanel() {
  const hasCotacoes = MOCK_COTACOES.length > 0;

  return (
    <Card className="border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Tag className="h-4 w-4 text-[#F59E0B]" />
          Cotações
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasCotacoes ? (
          <div className="space-y-3">
            {MOCK_COTACOES.map((cotacao) => (
              <div
                key={cotacao.id}
                className="rounded-lg border border-gray-200 p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">
                    {cotacao.empresa}
                  </span>
                  <span className="text-sm font-semibold text-[#2563EB]">
                    {formatCurrency(cotacao.valor)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Prazo: {cotacao.prazoEntrega}</span>
                  <span>Avaliação: {cotacao.avaliacao} / 5</span>
                </div>
                <Button
                  size="sm"
                  className="w-full h-7 text-xs bg-[#2563EB] text-white hover:bg-blue-700 mt-1"
                >
                  Aceitar cotação
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-4 text-center gap-3">
            <p className="text-sm text-gray-500">
              Nenhuma cotação recebida ainda.
            </p>
            <Button
              size="sm"
              className="bg-[#F59E0B] text-white hover:bg-amber-500 h-8 px-4 text-xs"
            >
              Solicitar cotações
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────

export default function MudancaDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const mudancaId = params?.id as string;

  const [selectedTruck, setSelectedTruck] = useState("tres_quartos");

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

  const mudanca = MOCK_MUDANCA;
  const statusStyle = STATUS_STYLES[mudanca.status];

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      {/* Breadcrumb + back */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2563EB] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Minhas Mudanças
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`text-xs font-medium ${statusStyle.className}`}
            >
              {statusStyle.label}
            </Badge>
            <span className="text-xs text-gray-400">
              {formatDate(mudanca.dataDesejada)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <MapPin className="h-4 w-4 shrink-0 text-[#2563EB]" />
              {mudanca.enderecoOrigem}
            </div>
            <div className="flex items-center gap-2 ml-1 text-sm text-gray-600">
              <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
              {mudanca.enderecoDestino}
            </div>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs border-gray-200 text-gray-600"
          >
            Editar endereços
          </Button>
          <Button
            size="sm"
            className="h-8 px-3 text-xs bg-[#2563EB] text-white hover:bg-blue-700"
          >
            <Package className="h-3.5 w-3.5 mr-1" />
            Adicionar item
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Canvas area (2/3) */}
        <div className="lg:col-span-2">
          <div className="flex h-[480px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-center">
            <Truck className="mb-4 h-12 w-12 text-gray-300" />
            <p className="text-base font-medium text-gray-500">
              Canvas de carga — drag &amp; drop em breve
            </p>
            <p className="mt-1.5 text-sm text-gray-400 max-w-xs">
              Aqui você poderá arrastar e posicionar seus itens visualmente
              dentro do caminhão selecionado.
            </p>
          </div>
        </div>

        {/* Right: Panels (1/3) */}
        <div className="flex flex-col gap-4">
          <CargoSummaryPanel />
          <TruckSelector selected={selectedTruck} onSelect={setSelectedTruck} />
          <CotacoesPanel />
        </div>
      </div>
    </div>
  );
}
