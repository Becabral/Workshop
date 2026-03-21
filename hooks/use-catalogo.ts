"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { CategoriaItem } from "@prisma/client";

// ─── Types ────────────────────────────────────────────────

export type Item = {
  id: string;
  nome: string;
  categoria: CategoriaItem;
  iconeUrl: string | null;
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
  pesoKg: number;
  volumeM3: number;
  customizado: boolean;
  userId: string | null;
  createdAt: string;
};

export type Caminhao = {
  id: string;
  nome: string;
  tipo: string;
  capacidadeM3: number;
  capacidadeKg: number;
  comprimentoCm: number;
  larguraCm: number;
  alturaCm: number;
  imagemUrl: string | null;
  createdAt: string;
};

// ─── Query Keys ───────────────────────────────────────────

export const catalogoKeys = {
  itens: {
    all: ["itens"] as const,
    list: (categoria?: CategoriaItem) =>
      [...catalogoKeys.itens.all, "list", { categoria }] as const,
  },
  caminhoes: {
    all: ["caminhoes"] as const,
    list: () => [...catalogoKeys.caminhoes.all, "list"] as const,
  },
};

// ─── Hooks ────────────────────────────────────────────────

export function useItens(
  categoria?: CategoriaItem,
  options?: Omit<UseQueryOptions<Item[]>, "queryKey" | "queryFn">
) {
  return useQuery<Item[]>({
    queryKey: catalogoKeys.itens.list(categoria),
    queryFn: async () => {
      const url = new URL("/api/itens", window.location.origin);
      if (categoria) url.searchParams.set("categoria", categoria);

      const res = await fetch(url.toString());
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao carregar itens");
      }
      return res.json();
    },
    ...options,
  });
}

export function useCaminhoes(
  options?: Omit<UseQueryOptions<Caminhao[]>, "queryKey" | "queryFn">
) {
  return useQuery<Caminhao[]>({
    queryKey: catalogoKeys.caminhoes.list(),
    queryFn: async () => {
      const res = await fetch("/api/caminhoes");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao carregar caminhões");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // caminhões mudam raramente — 10 min cache
    ...options,
  });
}
