import { Schema, model } from "mongoose";

export interface Wish {
  userid: string;
  item: string;
  cost?: number;
}

const WishSchema = new Schema<Wish>(
  {
    userid: { type: String, required: true },
    item: { type: String, required: true },
    cost: Number
  },
  { collection: "cb_wishes" }
);

export const WishModel = model<Wish>("Wish", WishSchema);
