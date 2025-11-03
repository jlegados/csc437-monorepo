import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Merchants from "./services/merchant-svc";
import merchantsApi from "./routes/merchants";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

// Must be before routes that read req.body
app.use(express.json());

// Static files stay public (leave this unprotected)
app.use(express.static(staticDir));

// Mount auth (public)
app.use("/auth", auth);

// Protect your data API router
app.use("/api/merchants", authenticateUser, merchantsApi);


app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello, World");
});

// Public versions:
app.get("/merchants", async (_req: Request, res: Response) => {
  res.json(await Merchants.index());
});
app.get("/merchants/:key", async (req: Request, res: Response) => {
  const doc = await Merchants.get(req.params.key);
  if (doc) res.json(doc);
  else res.status(404).send();
});

app.get("/merchants", authenticateUser, async (_req: Request, res: Response) => {
   res.json(await Merchants.index());
 });
app.get("/merchants/:key", authenticateUser, async (req: Request, res: Response) => {
   const doc = await Merchants.get(req.params.key);
   if (doc) res.json(doc);
   else res.status(404).send();
 });

connect("coinbear");

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
