export type Transaction = {
  label: string;
  amount: number;
};

export interface Dashboard {
  userid: string;
  income: number;
  expenses: number;
  balance: number;
  transactions: Transaction[];
}

export const defaultDashboard: Dashboard = {
  userid: "",
  income: 0,
  expenses: 0,
  balance: 0,
  transactions: []
};
