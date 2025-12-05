import type { Model } from "./model";
import type { AppMsg } from "./message";

import dashboardUpdate from "./components/dashboard/dashboard-update";
import profileUpdate from "./components/profile/profile-update";

export default function update(model: Model, msg: AppMsg): Model {
  const [type] = msg;

  if (type.startsWith("dashboard/")) {
    return dashboardUpdate(model, msg as any);
  }

  if (type.startsWith("profile/")) {
    return profileUpdate(model, msg as any);
  }

  return model;
}
