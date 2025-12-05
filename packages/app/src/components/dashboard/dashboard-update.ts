// packages/app/src/components/dashboard/dashboard-update.ts

import type { Model } from "../../model";
import type { DashboardMsg } from "./dashboard-message";
import type { Dashboard } from "./dashboard-model";

export default function dashboardUpdate(
  model: Model,
  msg: DashboardMsg
): Model {
  const [type, payload] = msg as any;

  switch (type) {
    case "dashboard/load":
      return {
        ...model,
        dashboardStatus: "loading",
        dashboardError: undefined
      };

    case "dashboard/success": {
      const { dashboard } = payload as { dashboard: Dashboard };
      return {
        ...model,
        dashboard,
        dashboardStatus: "ready",
        dashboardError: undefined
      };
    }

    case "dashboard/error": {
      const { message } = payload as { message: string };
      return {
        ...model,
        dashboardStatus: "error",
        dashboardError: message
      };
    }

    default:
      return model;
  }
}
