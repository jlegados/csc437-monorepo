import type { Model } from "../../model";
import type { ProfileMsg } from "./profile-message";

export default function profileUpdate(model: Model, msg: ProfileMsg): Model {
  const [tag, payload] = msg;

  switch (tag) {
    case "profile/load":
      return {
        ...model,
        profileStatus: "loading",
        profileError: undefined
      };

    case "profile/loaded":
      return {
        ...model,
        profile: payload.profile,
        profileStatus: "ready",
        profileError: undefined
      };

    case "profile/save":
      return {
        ...model,
        profileStatus: "loading"
      };

    case "profile/saved":
      return {
        ...model,
        profile: payload.profile,
        profileStatus: "ready"
      };

    case "profile/error":
      return {
        ...model,
        profileStatus: "error",
        profileError: payload.error
      };
  }
}
