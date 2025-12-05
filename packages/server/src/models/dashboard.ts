// packages/server/src/models/dashboard.ts

import { Schema, model } from "mongoose";

export type Transaction = {
  type: "income" | "expense";
  amount: number;
  description?: string;
  date?: string;
};

export type Dashboard = {
  userid: string;
  transactions: Transaction[];
  income: number;
  expenses: number;
  balance: number;
};

// Embedded subdocument schema for each transaction
const TransactionSchema = new Schema<Transaction>(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: String
    }
  },
  {
    _id: false // no separate _id for each transaction
  }
);

const DashboardSchema = new Schema<Dashboard>({
  userid: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  transactions: {
    type: [TransactionSchema],
    default: []
  },
  income: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  }
});

const DashboardModel = model<Dashboard>("Dashboard", DashboardSchema);

// 👇 THIS is the default export your service is importing
export default DashboardModel;
