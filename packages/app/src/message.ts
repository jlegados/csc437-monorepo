import type { DashboardMsg } from "./components/dashboard/dashboard-message";
import type { ProfileMsg } from "./components/profile/profile-message";
import type { MerchantMsg } from "./components/merchant/merchant-message";

export type AppMsg = ProfileMsg | DashboardMsg | MerchantMsg;

