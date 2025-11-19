import type { Profile } from "server/models";

export type Msg =
  | ["profile/load", { userid: string }]
  | ["profile/loaded", { profile: Profile }]
  | ["profile/error", { error: unknown }]

  // TODO: 
  // | ["merchants/load", ...]
  // | ["auth/login", ...]
  ;
