import { Auth } from "@calpoly/mustang";
import { Msg } from "./message";
import { Model } from "./model";
import { Profile } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | Promise<Model> {
  switch (message[0]) {
    case "profile/load": {
      const { userid } = message[1];

      return loadProfile(userid, user).then((profile) => {
        console.log("update.ts loaded profile:", profile);
        if (!profile) return model;
        return {
          ...model,
          profile        // <- this is what profile-view reads
        };
      });
    }

    default:
      console.warn("Unhandled message:", message[0]);
      return model;
  }
}

function loadProfile(
  userid: string,
  user: Auth.User
): Promise<Profile | undefined> {
  return fetch(`/api/profile/${userid}`, {
    headers: Auth.headers(user)
  })
    .then((res: Response) => (res.ok ? res.json() : undefined))
    .then((json: unknown) => {
      if (json) {
        console.log("loadProfile() response:", json);
        return json as Profile;
      }
    });
}
