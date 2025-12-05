// src/components/profile/profile-message.ts
import type { Profile } from "../../model";

export type LoadPayload = { userid: string };
export type SavePayload = { userid: string; profile: Profile };

export type LoadedPayload = { profile: Profile };
export type SavedPayload = { profile: Profile };
export type ErrorPayload = { error: string };

export type ProfileMsg =
  | ["profile/load", LoadPayload]
  | ["profile/loaded", LoadedPayload]
  | ["profile/save", SavePayload]
  | ["profile/saved", SavedPayload]
  | ["profile/error", ErrorPayload];
