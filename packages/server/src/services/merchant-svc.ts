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
    lastDate:      { type: Date },   // ISO string will be cast
    notes:         { type: String }
  },
  { collection: "cb_merchants" }
);

const MerchantModel = model<Merchant>("Merchant", MerchantSchema);

/** List all */
function index(): Promise<Merchant[]> {
  return MerchantModel.find().lean();
}

async function get(key: string): Promise<Merchant | null> {
  const byId = await MerchantModel.findOne({ id: key }).lean();
  if (byId) return byId;
  return MerchantModel.findOne({ name: key }).lean();
}

function create(json: Merchant): Promise<Merchant> {
  const doc = new MerchantModel(json);
  return doc.save().then((d) => d.toObject() as Merchant);
}


function update(id: string, patch: Partial<Merchant>): Promise<Merchant | null> {
  return MerchantModel.findOneAndUpdate(
    { id },
    { $set: patch },
    {
      new: true,           
      upsert: true,       
      runValidators: true  
    }
  )
    .lean()
    .exec();
}


async function remove(id: string): Promise<void> {
  const deleted = await MerchantModel.findOneAndDelete({ id }).exec();
  if (!deleted) throw `${id} not deleted`;
}

export default { index, get, create, update, remove };
