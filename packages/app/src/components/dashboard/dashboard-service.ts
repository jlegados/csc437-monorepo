import type { Dashboard } from "./dashboard-model";

const BASE_URL = "/api/dashboard";

export const DashboardService = {
  async load(userid: string): Promise<Dashboard> {
    const response = await fetch(`${BASE_URL}/${encodeURIComponent(userid)}`);
    if (!response.ok)
      throw new Error(`Failed to load dashboard (${response.status})`);
    return response.json();
  }
};
