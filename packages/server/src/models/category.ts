import { Schema, model } from "mongoose";

export interface Category {
  userid: string;
  name: string;
  amount: number;
}

const CategorySchema = new Schema<Category>(
  {
    userid: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true }
  },
  { collection: "cb_categories" }
);

export const CategoryModel = model<Category>("Category", CategorySchema);
