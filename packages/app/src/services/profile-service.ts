import { Auth } from "@calpoly/mustang";
import type { Profile } from "../model";

export function loadProfile(userid: string): Promise<Profile> {
  return fetch(`/api/profile/${userid}`, {
    headers: Auth.headers()
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to load profile");
    return res.json();
  });
}

export function saveProfile(userid: string, profile: Profile): Promise<Profile> {
  return fetch(`/api/profile/${userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers()
    },
    body: JSON.stringify(profile)
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to save profile");
    return res.json();
  });
}
