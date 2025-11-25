import type { Profile as ServerProfile } from "server/models";

export type Profile = ServerProfile;

export interface Model {
  profile?: Profile;
  profileStatus: "idle" | "loading" | "ready" | "error";
  profileError?: string;
}

export const init: Model = {
  profile: undefined,
  profileStatus: "idle",
  profileError: undefined
};
