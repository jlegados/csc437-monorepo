import { Schema, model } from "mongoose";

export interface Merchant {
  userid?: string;
  id?: string;
  name: string;
  logoSrc?: string;
  websiteHref?: string;
  phone?: string;
  category?: string;
  monthlySpend?: number;
  transactions?: number;
  lastDate?: Date;
  notes?: string;
}

const MerchantSchema = new Schema<Merchant>(
  {
    userid: { type: String },
    id: { type: String, trim: true, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    logoSrc: String,
    websiteHref: String,
    phone: String,
    category: String,
    monthlySpend: Number,
    transactions: Number,
    lastDate: Date,
    notes: String
  },
  { collection: "cb_merchants" }
);

export const MerchantModel = model<Merchant>("Merchant", MerchantSchema);
