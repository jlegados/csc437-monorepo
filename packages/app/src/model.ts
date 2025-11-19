import type { Profile } from "server/models";

export interface Model {
  profile: Profile | null;
  profileStatus: "idle" | "loading" | "ready" | "error";
  profileError?: string;
}

// initial model for the store
export const init: Model = {
  profile: null,
  profileStatus: "idle",
};
