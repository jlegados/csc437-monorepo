import type { Credential } from "../models/credential";
import { getCollection } from "../mongo";

const COLLECTION = "credentials";

export async function create(cred: Credential): Promise<Credential> {
  const col = getCollection<Credential>(COLLECTION);
  await col.insertOne(cred);
  return cred;
}

export async function findByUsername(
  username: string
): Promise<Credential | null> {
  const col = getCollection<Credential>(COLLECTION);
  return col.findOne({ username });
}
