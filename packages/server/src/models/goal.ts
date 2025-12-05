import { Schema, model } from "mongoose";

export interface Goal {
  userid: string;
  title: string;
  target: number;
  saved: number;
}

const GoalSchema = new Schema<Goal>(
  {
    userid: { type: String, required: true },
    title: { type: String, required: true },
    target: { type: Number, required: true },
    saved: { type: Number, default: 0 }
  },
  { collection: "cb_goals" }
);

export const GoalModel = model<Goal>("Goal", GoalSchema);
