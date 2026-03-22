export type UiMudancaStatus =
  | "RASCUNHO"
  | "COTANDO"
  | "CONFIRMADA"
  | "CONCLUIDA";

export type DbMudancaStatus =
  | "DRAFT"
  | "QUOTED"
  | "BOOKED"
  | "COMPLETED"
  | "CANCELLED";

const dbToUiStatusMap: Record<DbMudancaStatus, UiMudancaStatus> = {
  DRAFT: "RASCUNHO",
  QUOTED: "COTANDO",
  BOOKED: "CONFIRMADA",
  COMPLETED: "CONCLUIDA",
  CANCELLED: "CONCLUIDA",
};

const uiToDbStatusMap: Record<UiMudancaStatus, DbMudancaStatus> = {
  RASCUNHO: "DRAFT",
  COTANDO: "QUOTED",
  CONFIRMADA: "BOOKED",
  CONCLUIDA: "COMPLETED",
};

export const activeDbMudancaStatuses: DbMudancaStatus[] = [
  "DRAFT",
  "QUOTED",
  "BOOKED",
];

export function mapDbMudancaStatusToUi(status: string): UiMudancaStatus {
  return dbToUiStatusMap[status as DbMudancaStatus] ?? "RASCUNHO";
}

export function mapUiMudancaStatusToDb(status: UiMudancaStatus): DbMudancaStatus {
  return uiToDbStatusMap[status];
}

export function serializeMudancaStatus<T extends { status: string }>(mudanca: T) {
  return {
    ...mudanca,
    status: mapDbMudancaStatusToUi(mudanca.status),
  };
}
