import * as Transactions from "./transaction-svc";

interface Transaction {
  _id?: string;
  userid: string;
  amount: number;
  type?: "income" | "expense";
  merchant?: string;
  date?: string;
}

interface Category {
  name: string;
  amount: number;
}

interface Merchant {
  name: string;
  monthlySpend?: number;
}

export async function computeDashboard(userid: string) {
  const transactions = await Transactions.list(userid);

  const income = transactions
    .filter((t: Transaction) => t.type === "income")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  const expense = transactions
    .filter((t: Transaction) => t.type === "expense")
    .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

  return {
    income,
    expense,
    balance: income - expense
  };
}
