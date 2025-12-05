import { getCollection } from "../mongo";

const collection = getCollection("profiles");

export async function get(userid: string) {
  return await collection.findOne({ userid });
}

export async function save(profile: any) {
  await collection.updateOne(
    { userid: profile.userid },
    { $set: profile },
    { upsert: true }
  );
  return profile;
}
