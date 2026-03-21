"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────

type Categoria =
  | "Quarto"
  | "Cozinha"
  | "Sala"
  | "Escritório"
  | "Banheiro"
  | "Área de Serviço"
  | "Caixas";

interface Item {
  id: string;
  nome: string;
  categoria: Categoria;
  largura: number;  // cm
  altura: number;   // cm
  profundidade: number; // cm
  peso: number;     // kg
  volume: number;   // m³
  cor: string;      // bg tailwind color for icon
}

// ─── Mock Data ────────────────────────────────────────────

const MOCK_ITEMS: Item[] = [
  {
    id: "item_001",
    nome: "Cama Casal",
    categoria: "Quarto",
    largura: 188,
    altura: 45,
    profundidade: 138,
    peso: 40,
    volume: 1.17,
    cor: "bg-purple-400",
  },
  {
    id: "item_002",
    nome: "Guarda-Roupa 6 Portas",
    categoria: "Quarto",
    largura: 240,
    altura: 210,
    profundidade: 55,
    peso: 120,
    volume: 2.77,
    cor: "bg-purple-500",
  },
  {
    id: "item_003",
    nome: "Geladeira Duplex",
    categoria: "Cozinha",
    largura: 70,
    altura: 175,
    profundidade: 75,
    peso: 90,
    volume: 0.92,
    cor: "bg-sky-400",
  },
  {
    id: "item_004",
    nome: "Fogão 4 Bocas",
    categoria: "Cozinha",
    largura: 60,
    altura: 85,
    profundidade: 60,
    peso: 30,
    volume: 0.31,
    cor: "bg-sky-500",
  },
  {
    id: "item_005",
    nome: "Sofá 3 Lugares",
    categoria: "Sala",
    largura: 210,
    altura: 85,
    profundidade: 90,
    peso: 60,
    volume: 1.60,
    cor: "bg-emerald-400",
  },
  {
    id: "item_006",
    nome: "Mesa de Jantar",
    categoria: "Sala",
    largura: 160,
    altura: 76,
    profundidade: 90,
    peso: 35,
    volume: 1.09,
    cor: "bg-emerald-500",
  },
  {
    id: "item_007",
    nome: "Mesa de Escritório",
    categoria: "Escritório",
    largura: 150,
    altura: 75,
    profundidade: 70,
    peso: 25,
    volume: 0.79,
    cor: "bg-orange-400",
  },
  {
    id: "item_008",
    nome: "Cadeira de Escritório",
    categoria: "Escritório",
    largura: 65,
    altura: 115,
    profundidade: 65,
    peso: 15,
    volume: 0.49,
    cor: "bg-orange-500",
  },
  {
    id: "item_009",
    nome: "Armário de Banheiro",
    categoria: "Banheiro",
    largura: 80,
    altura: 60,
    profundidade: 20,
    peso: 12,
    volume: 0.10,
    cor: "bg-teal-400",
  },
  {
    id: "item_010",
    nome: "Máquina de Lavar",
    categoria: "Área de Serviço",
    largura: 60,
    altura: 85,
    profundidade: 60,
    peso: 65,
    volume: 0.31,
    cor: "bg-indigo-400",
  },
  {
    id: "item_011",
    nome: "Caixa Pequena",
    categoria: "Caixas",
    largura: 40,
    altura: 30,
    profundidade: 30,
    peso: 10,
    volume: 0.04,
    cor: "bg-amber-400",
  },
  {
    id: "item_012",
    nome: "Caixa Grande",
    categoria: "Caixas",
    largura: 60,
    altura: 50,
    profundidade: 50,
    peso: 20,
    volume: 0.15,
    cor: "bg-amber-500",
  },
];

const CATEGORIAS: Array<"Todos" | Categoria> = [
  "Todos",
  "Quarto",
  "Cozinha",
  "Sala",
  "Escritório",
  "Banheiro",
  "Área de Serviço",
  "Caixas",
];

// ─── ItemCard ──────────────────────────────────────────────

function ItemCard({ item }: { item: Item }) {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Icon placeholder */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.cor} text-white text-base font-bold select-none`}
        >
          {item.nome.charAt(0)}
        </div>

        {/* Name + category */}
        <div>
          <div className="text-sm font-semibold text-gray-900 leading-tight">
            {item.nome}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{item.categoria}</div>
        </div>

        {/* Dimensions / weight / volume */}
        <div className="space-y-1 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Dimensões</span>
            <span className="font-medium text-gray-700">
              {item.largura} × {item.altura} × {item.profundidade} cm
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Peso</span>
            <span className="font-medium text-gray-700">{item.peso} kg</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Volume</span>
            <span className="font-medium text-[#2563EB]">{item.volume} m³</span>
          </div>
        </div>

        {/* Add to mudança button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full h-7 text-xs border-gray-200 text-gray-600 hover:border-[#2563EB] hover:text-[#2563EB] mt-1"
        >
          Adicionar à mudança
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | Categoria>("Todos");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    return MOCK_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "Todos" || item.categoria === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        item.nome.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="flex flex-col gap-6 px-8 py-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Catálogo de Itens
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Encontre e adicione itens à sua mudança com dimensões e peso pré-definidos.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-gray-500">
        {filteredItems.length}{" "}
        {filteredItems.length === 1 ? "item encontrado" : "itens encontrados"}
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">
            Nenhum item encontrado para{" "}
            <span className="font-medium">"{search}"</span>.
          </p>
          <button
            onClick={() => { setSearch(""); setActiveCategory("Todos"); }}
            className="mt-3 text-xs text-[#2563EB] hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
