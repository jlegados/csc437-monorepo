import type { Profile } from "./model";

export type Reactions = {
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
};

export type LoadPayload = { userid: string };
export type SavePayload = { userid: string; profile: Profile };
export type LoadedPayload = { profile: Profile };

export type Msg =
  | ["profile/load", LoadPayload, Reactions]
  | ["profile/save", SavePayload, Reactions]
  | ["profile/loaded", LoadedPayload, Reactions];
