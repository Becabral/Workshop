import type { UserWithPlan, UsageLimitResult } from "@/types";

// ─── Plan Limits ─────────────────────────────────────────
// FREE: 1 mudança ativa, até 15 itens no canvas, 3 cotações por mudança, sem filtros avançados
// TRIAL (14 dias): tudo ilimitado
// PRO: tudo ilimitado — R$ 29,90/mês

export const PLAN_LIMITS = {
  FREE: {
    mudancasAtivas: 1,
    itensNoCanvas: 15,
    cotacoesPorMudanca: 3,
    filtrosAvancados: false,
  },
  TRIAL: {
    mudancasAtivas: Infinity,
    itensNoCanvas: Infinity,
    cotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
  PRO: {
    mudancasAtivas: Infinity,
    itensNoCanvas: Infinity,
    cotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
} as const;

export type ResourceKey = "mudancasAtivas" | "itensNoCanvas" | "cotacoesPorMudanca";

// ─── Trial & Subscription Checks ────────────────────────

export function isTrialActive(user: UserWithPlan): boolean {
  if (user.plan !== "TRIAL") return false;
  if (!user.trialEndsAt) return false;
  return new Date(user.trialEndsAt) > new Date();
}

export function isSubscribed(user: UserWithPlan): boolean {
  if (user.plan !== "PRO") return false;
  if (!user.stripeCurrentPeriodEnd) return false;
  return new Date(user.stripeCurrentPeriodEnd) > new Date();
}

export function hasAccess(user: UserWithPlan): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(user: UserWithPlan): number {
  if (!user.trialEndsAt) return 0;
  const diff = new Date(user.trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// ─── Usage Limits ────────────────────────────────────────

export function checkUsageLimit(
  user: UserWithPlan,
  resource: ResourceKey,
  currentUsage: number
): UsageLimitResult {
  const plan = user.plan;
  const limit = PLAN_LIMITS[plan][resource];

  return {
    allowed: currentUsage < (limit as number),
    current: currentUsage,
    limit: limit === Infinity ? -1 : (limit as number),
  };
}

export function hasAdvancedFilters(user: UserWithPlan): boolean {
  return PLAN_LIMITS[user.plan].filtrosAvancados;
}

export function getPlanDisplayName(plan: string): string {
  switch (plan) {
    case "PRO":
      return "Pro";
    case "TRIAL":
      return "Trial";
    default:
      return "Gratuito";
  }
}
