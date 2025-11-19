import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import credentials from "../services/credential-svc";

dotenv.config();

const router = express.Router();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

// Helper: make a JWT that expires in 1 day
function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error || !token) reject(error ?? new Error("Token error"));
        else resolve(token as string);
      }
    );
  });
}

// POST /auth/register
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  try {
    const creds = await credentials.create(username, password);
    const token = await generateAccessToken(creds.username);
    res.status(201).send({ token });
  } catch (err: any) {
    const msg =
      err?.code === 11000
        ? `Username exists: ${username}`   // duplicate key from unique index
        : err?.message ?? "Conflict";
    res.status(409).send({ error: msg });
  }
});

// POST /auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  try {
    const goodUser = await credentials.verify(username, password);
    const token = await generateAccessToken(goodUser);
    res.status(200).send({ token });
  } catch {
    res.status(401).send("Unauthorized");
  }
});

// Middleware: verify Authorization: Bearer <token>
export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).end();

  jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
    if (decoded && typeof decoded === "object") {
      (req as any).user = (decoded as any).username;  // ← attach username
      next();
    } else {
      res.status(403).end();
    }
  });
  
}

export default router;
