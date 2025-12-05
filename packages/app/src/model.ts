import type { Dashboard } from "./components/dashboard/dashboard-model";
import type { Profile as ProfileModel } from "./components/profile/profile-model";

export type Profile = ProfileModel;

export interface Model {
  // ----- dashboard -----
  dashboard?: Dashboard;
  dashboardStatus: "idle" | "loading" | "ready" | "error";
  dashboardError?: string;

  // ----- profile -----
  profile?: Profile;
  profileStatus: "idle" | "loading" | "ready" | "error";
  profileError?: string;

  // ----- merchants -----
  merchants?: any[];
  merchantsStatus: "idle" | "loading" | "ready" | "error";
  merchantsError?: string;
}

export const init: Model = {
  // dashboard
  dashboard: undefined,
  dashboardStatus: "idle",
  dashboardError: undefined,

  // profile
  profile: undefined,
  profileStatus: "idle",
  profileError: undefined,

  // merchants
  merchants: undefined,
  merchantsStatus: "idle",
  merchantsError: undefined
};
