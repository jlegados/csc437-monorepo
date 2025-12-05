import express, { Request, Response } from "express";
import type { Profile } from "../models/profile";
import * as ProfileSvc from "../services/profile-svc";
import * as CredentialSvc from "../services/credential-svc";

const router = express.Router();

// GET /api/profile/:userid
router.get("/:userid", async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    let profile = await ProfileSvc.get(userid);

    if (!profile) {
      // No profile yet: try to pull info from credentials
      const cred = await CredentialSvc.findByUsername(userid);
      const email = cred?.email ?? "";
      const name = cred?.username ?? userid;

      const newProfile: Profile = { userid, name, email };
      profile = await ProfileSvc.save(newProfile);
    } else if (!profile.email) {
      // Profile exists but email is blank: backfill from credentials if possible
      const cred = await CredentialSvc.findByUsername(userid);
      if (cred?.email && cred.email !== profile.email) {
        profile.email = cred.email;
        profile = await ProfileSvc.save(profile);
      }
    }

    return res.json(profile);
  } catch (err) {
    console.error("profile get error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/profile/:userid
router.put("/:userid", async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const { name, email } = req.body as {
      name?: string;
      email?: string;
    };

    const existing =
      (await ProfileSvc.get(userid)) ||
      ({ userid, name: "", email: "" } as Profile);

    const updated: Profile = {
      ...existing,
      name: name ?? existing.name,
      email: email ?? existing.email
    };

    const saved = await ProfileSvc.save(updated);
    return res.json(saved);
  } catch (err) {
    console.error("profile put error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
