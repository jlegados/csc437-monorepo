import express, { Request, Response } from "express";
import { connect } from "./mongo";
import merchantsApi from "./routes/merchants";
import auth, { authenticateUser } from "./routes/auth";
import profileRoutes from "./routes/profile";
import fs from "node:fs/promises";
import path from "node:path";
import dashboardRoutes from "./routes/dashboard";
import transactionRoutes from "./routes/transactions";
import merchantRoutes from "./routes/merchants";

const app = express();
const port = process.env.PORT || 3000;

connect("coinbear");

const appPublicDir = path.resolve(__dirname, "../../app/public");
const spaDistDir = path.resolve(__dirname, "../../app/dist");

// Basic routes
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(appPublicDir, "login.html"));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(appPublicDir));
app.use(express.static(spaDistDir));

app.use("/auth", auth);
app.use("/api/profile", profileRoutes);
app.use("/api/merchants", authenticateUser, merchantsApi);
app.use("/api/dashboard", authenticateUser, dashboardRoutes);
app.use("/api/transactions", transactionRoutes);

app.use("/app", async (_req: Request, res: Response) => {
  const indexHtml = path.join(spaDistDir, "index.html");
  const html = await fs.readFile(indexHtml, "utf8");
  res.send(html);
});

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Serving login/newuser from: ${appPublicDir}`);
    console.log(`Serving SPA from:           ${spaDistDir}`);
  });


