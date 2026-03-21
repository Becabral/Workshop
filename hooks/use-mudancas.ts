"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { MudancaInput } from "@/lib/validations";

// ─── Types ────────────────────────────────────────────────

export type MudancaListItem = {
  id: string;
  userId: string;
  enderecoOrigem: string;
  enderecoDestino: string;
  dataDesejada: string | null;
  caminhaoId: string | null;
  status: "RASCUNHO" | "COTANDO" | "CONFIRMADA" | "CONCLUIDA";
  createdAt: string;
  updatedAt: string;
  caminhao: Caminhao | null;
  cargaLayout: CargaLayoutSummary | null;
  _count: { cotacoes: number };
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

export type CargaLayoutSummary = {
  id: string;
  mudancaId: string;
  caminhaoId: string;
  ocupacaoPercentual: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateMudancaInput = {
  enderecoOrigem?: string;
  enderecoDestino?: string;
  dataDesejada?: string | null;
  caminhaoId?: string | null;
  status?: "RASCUNHO" | "COTANDO" | "CONFIRMADA" | "CONCLUIDA";
};

// ─── Query Keys ───────────────────────────────────────────

export const mudancasKeys = {
  all: ["mudancas"] as const,
  lists: () => [...mudancasKeys.all, "list"] as const,
  detail: (id: string) => [...mudancasKeys.all, "detail", id] as const,
};

// ─── Hooks ────────────────────────────────────────────────

export function useMudancas(
  options?: Omit<UseQueryOptions<MudancaListItem[]>, "queryKey" | "queryFn">
) {
  return useQuery<MudancaListItem[]>({
    queryKey: mudancasKeys.lists(),
    queryFn: async () => {
      const res = await fetch("/api/mudancas");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao carregar mudanças");
      }
      return res.json();
    },
    ...options,
  });
}

export function useMudanca(
  id: string,
  options?: Omit<UseQueryOptions<MudancaListItem>, "queryKey" | "queryFn">
) {
  return useQuery<MudancaListItem>({
    queryKey: mudancasKeys.detail(id),
    queryFn: async () => {
      const res = await fetch(`/api/mudancas/${id}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao carregar mudança");
      }
      return res.json();
    },
    enabled: !!id,
    ...options,
  });
}

export function useCreateMudanca() {
  const queryClient = useQueryClient();

  return useMutation<MudancaListItem, Error, MudancaInput>({
    mutationFn: async (input) => {
      const res = await fetch("/api/mudancas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao criar mudança");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mudancasKeys.lists() });
    },
  });
}

export function useUpdateMudanca() {
  const queryClient = useQueryClient();

  return useMutation<
    MudancaListItem,
    Error,
    { id: string; data: UpdateMudancaInput }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await fetch(`/api/mudancas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Erro ao atualizar mudança");
      }
      return json;
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: mudancasKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: mudancasKeys.detail(updated.id),
      });
    },
  });
}

export function useDeleteMudanca() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/mudancas/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao excluir mudança");
      }
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: mudancasKeys.lists() });
      queryClient.removeQueries({ queryKey: mudancasKeys.detail(id) });
    },
  });
}
