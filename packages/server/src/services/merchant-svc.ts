import { Schema, model } from "mongoose";
import { Merchant } from "../models/merchant";

const MerchantSchema = new Schema<Merchant>(
  {
    id:            { type: String, trim: true, unique: true, sparse: true }, // optional slug
    name:          { type: String, required: true, trim: true, unique: true },
    logoSrc:       { type: String, trim: true },
    websiteHref:   { type: String, trim: true },
    phone:         { type: String, trim: true },
    category:      { type: String, trim: true },
    monthlySpend:  { type: Number },
    transactions:  { type: Number },
    lastDate:      { type: Date },     // Mongoose will cast ISO strings
    notes:         { type: String }
  },
  { collection: "cb_merchants" }
);

const MerchantModel = model<Merchant>("Merchant", MerchantSchema);

// List all
function index(): Promise<Merchant[]> {
  return MerchantModel.find().lean();
}

// Get by slug if present, otherwise by exact name
async function get(key: string): Promise<Merchant | null> {
  // try id first (slug), fall back to name
  const byId = await MerchantModel.findOne({ id: key }).lean();
  if (byId) return byId;
  return MerchantModel.findOne({ name: key }).lean();
}

export default { index, get };
