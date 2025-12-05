import express, { Request, Response, NextFunction } from "express";
import * as CredentialSvc from "../services/credential-svc";
import * as ProfileSvc from "../services/profile-svc";

const router = express.Router();

function makeUserPayload(userid: string, name: string, email: string) {
  return {
    authenticated: true,
    token: userid,
    user: {
      username: userid,
      name,
      email
    }
  };
}

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await CredentialSvc.findByUsername(username);
  if (existing) return res.status(409).json({ error: "User already exists" });

  await CredentialSvc.create({ username, email, password });

  await ProfileSvc.save({
    userid: username,
    name: username,
    email
  });

  res.json(makeUserPayload(username, username, email));
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const cred = await CredentialSvc.findByUsername(username);
  if (!cred || cred.password !== password)
    return res.status(401).json({ error: "Invalid credentials" });

  res.json(makeUserPayload(username, username, cred.email ?? ""));
});

// SESSION
router.get("/session", authenticateUser, async (req, res) => {
  const { userid } = res.locals.user;

  const profile = await ProfileSvc.get(userid);
  if (!profile) return res.status(404).json({ error: "No profile found" });

  res.json(makeUserPayload(userid, profile.name, profile.email));
});

// AUTH MIDDLEWARE
function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const header = req.get("Authorization") || "";
  const match = header.match(/^Bearer (.+)$/);

  if (!match)
    return res.status(401).json({ error: "Missing Authorization" });

  res.locals.user = { userid: match[1] };
  next();
}

export { authenticateUser };
export default router;
