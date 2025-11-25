import { Auth, ThenUpdate } from "@calpoly/mustang";
import type {
  Msg,
  LoadPayload,
  SavePayload,
  LoadedPayload
} from "./message";
import type { Model } from "./model";
import { loadProfile, saveProfile } from "./services/profile-service";

export default function update(
  message: Msg,
  model: Model,
  _user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [type, payload, reactions] = message;

  switch (type) {
    case "profile/load": {
      const { userid } = payload as LoadPayload;

      const loading: Model = {
        ...model,
        profileStatus: "loading",
        profileError: undefined
      };

      const continuation = loadProfile(userid).then((profile) => {
        return ["profile/loaded", { profile }, {}] as Msg;
      });

      return [loading, continuation] as ThenUpdate<Model, Msg>;
    }

    case "profile/loaded": {
      const { profile } = payload as LoadedPayload;

      return {
        ...model,
        profile,
        profileStatus: "ready",
        profileError: undefined
      };
    }

    case "profile/save": {
      const { userid, profile } = payload as SavePayload;

      const saving: Model = {
        ...model,
        profile,
        profileStatus: "loading",
        profileError: undefined
      };

      const continuation = saveProfile(userid, profile)
        .then((updated) => {
          reactions.onSuccess?.();
          return ["profile/loaded", { profile: updated }, {}] as Msg;
        })
        .catch((err: Error) => {
          reactions.onFailure?.(err);
          return ["profile/loaded", { profile }, {}] as Msg;
        });

      return [saving, continuation] as ThenUpdate<Model, Msg>;
    }

    default:
      return model;
  }
}
