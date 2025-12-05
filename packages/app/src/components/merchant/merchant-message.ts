export type MerchantsLoadPayload = { userid: string };
export type MerchantsLoadedPayload = { merchants: any[] };
export type MerchantsErrorPayload = { error: string };

export type MerchantMsg =
  | ["merchants/load", MerchantsLoadPayload]
  | ["merchants/loaded", MerchantsLoadedPayload]
  | ["merchants/error", MerchantsErrorPayload];
