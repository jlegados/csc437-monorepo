export interface Transaction {
  _id?: string;
  userid: string;
  merchant: string;
  amount: number;
  date: string; // ISO
  category?: string;
}
