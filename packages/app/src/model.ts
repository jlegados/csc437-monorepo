import type { Dashboard } from "./components/dashboard/dashboard-model";
import type { Profile as ProfileModel } from "./components/profile/profile-model";

export type Profile = ProfileModel;

export interface Model {
  dashboard?: Dashboard;
  dashboardStatus: "idle" | "loading" | "ready" | "error";
  dashboardError?: string;

  profile?: Profile;
  profileStatus: "idle" | "loading" | "ready" | "error";
  profileError?: string;

  merchants?: any[];
  merchantsStatus: "idle" | "loading" | "ready" | "error";
  merchantsError?: string;
}

export const init: Model = {
  dashboard: undefined,
  dashboardStatus: "idle",
  dashboardError: undefined,

  profile: undefined,
  profileStatus: "idle",
  profileError: undefined,

  merchants: undefined,
  merchantsStatus: "idle",
  merchantsError: undefined
};
