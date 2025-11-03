import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    hashedPassword: {
      type: String,
      required: true
    }
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>("Credential", credentialSchema);

async function create(username: string, password: string): Promise<Credential> {
  const exists = await credentialModel.findOne({ username }).lean();
  if (exists) throw new Error(`Username exists: ${username}`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const doc = new credentialModel({ username, hashedPassword });
  return doc.save();
}

async function verify(username: string, password: string): Promise<string> {
  const creds = await credentialModel.findOne({ username });
  if (!creds) throw new Error("Invalid username or password");

  const ok = await bcrypt.compare(password, creds.hashedPassword);
  if (!ok) throw new Error("Invalid username or password");

  return creds.username;
}

export default { create, verify };
