import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import merchantsApi from "./routes/merchants";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static(staticDir));

app.use("/auth", auth);

app.use("/api/merchants", authenticateUser, merchantsApi);

app.use("/app", async (_req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  const html = await fs.readFile(indexHtml, "utf8");
  res.send(html);
});

connect("coinbear");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Serving static from: ${path.resolve(staticDir)}`);
});
