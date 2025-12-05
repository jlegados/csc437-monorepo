import { connect, getCollection } from "../mongo";
import { ObjectId } from "mongodb";

connect("coinbear");

export interface Transaction {
  _id?: string;
  userid: string;
  amount: number;
  merchant: string;
  date: string;
}

const collection = getCollection<Transaction>("transactions");

export async function list(userid: string) {
  const cursor = collection.find({ userid }).sort({ date: -1 });
  const results = await cursor.toArray();

  return results.map((t: any) => ({
    ...t,
    _id: t._id?.toString()
  }));
}

export async function create(tx: Transaction) {
  const result = await collection.insertOne(tx);
  return { ...tx, _id: result.insertedId.toString() };
}
