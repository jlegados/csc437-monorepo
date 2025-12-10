import DashboardModel from "../models/dashboard";

export type TransactionInput = {
  type: "income" | "expense";
  amount: number;
  description?: string;
  date?: string;
};

export async function getDashboard(userid: string) {
  // Try to find an existing dashboard
  let dashboard = await DashboardModel.findOne({ userid });

  // If none exists, create a new one with default values
  if (!dashboard) {
    dashboard = await DashboardModel.create({
      userid,
      transactions: [],
      income: 0,
      expenses: 0,
      balance: 0
    });
  }

  return dashboard;
}

export async function addTransaction(userid: string, data: TransactionInput) {
  // Find dash for this user
  let dashboard = await DashboardModel.findOne({ userid });

  // If no dashboard yet, make one
  if (!dashboard) {
    dashboard = new DashboardModel({
      userid,
      transactions: [],
      income: 0,
      expenses: 0,
      balance: 0
    });
  }

  // Add the transaction
  (dashboard.transactions as any).push(data);

  // Update totals
  if (data.type === "income") {
    dashboard.income += data.amount;
  } else {
    dashboard.expenses += data.amount;
  }

  // Recompute balance
  dashboard.balance = dashboard.income - dashboard.expenses;

  // Save to MongoDB
  await dashboard.save();

  return dashboard;
}

// Default export for routes
const DashboardService = {
  getDashboard,
  addTransaction
};

export default DashboardService;
