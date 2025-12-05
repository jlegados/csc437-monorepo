import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname: string) {
  let uri = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  }
  return uri;
}

export async function connect(dbname: string) {
  try {
    await mongoose.connect(getMongoURI(dbname));
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo connection error:", err);
  }
}

export function getCollection<T = any>(name: string) {
  return mongoose.connection.collection(name) as any as {
    insertOne(doc: T): Promise<any>;
    findOne(filter: any): Promise<T | null>;
    find(filter: any): any;
    updateOne(filter: any, update: any, options?: any): Promise<any>;
    deleteOne(filter: any): Promise<any>;
  };
}
