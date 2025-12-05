// src/components/profile/profile-service.ts

import type { Profile } from "./profile-model";

const BASE_URL = "/api/profile";

export const ProfileService = {
  async load(userid: string): Promise<Profile> {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(userid)}`);
    if (!response.ok)
      throw new Error(`Failed to load profile (${response.status})`);
    return response.json();
  },

  async save(userid: string, profile: Profile): Promise<Profile> {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(userid)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!response.ok)
      throw new Error(`Failed to save profile (${response.status})`);
    return response.json();
  }
};
