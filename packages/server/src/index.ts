import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Merchants from "./services/merchant-svc";
import merchantsApi from "./routes/merchants";   

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/merchants", merchantsApi);          

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

// All merchants
app.get("/merchants", async (_req: Request, res: Response) => {
  res.json(await Merchants.index());
});

// One merchant by slug OR by name (exact match)
app.get("/merchants/:key", async (req: Request, res: Response) => {
  const doc = await Merchants.get(req.params.key);
  if (doc) res.json(doc);
  else res.status(404).send();
});

connect("coinbear");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
