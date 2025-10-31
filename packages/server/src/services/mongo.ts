import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname: string) {
  let uri = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    console.log(
      "Connecting to MongoDB at",
      `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${dbname}`
    );
    uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  } else {
    console.log("Connecting to local MongoDB at", uri);
  }
  return uri;
}

export function connect(dbname: string) {
  mongoose
    .connect(getMongoURI(dbname))
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Mongo connection error:", err));
}
