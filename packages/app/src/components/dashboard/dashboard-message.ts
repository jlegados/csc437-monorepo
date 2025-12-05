import type { Dashboard } from "./dashboard-model";

export type LoadPayload = { userid: string };
export type LoadedPayload = { dashboard: Dashboard };
export type ErrorPayload = { error: string };

export type DashboardMsg =
  | ["dashboard/load", LoadPayload]
  | ["dashboard/loaded", LoadedPayload]
  | ["dashboard/error", ErrorPayload];
