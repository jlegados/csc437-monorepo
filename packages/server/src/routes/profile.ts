import { Router } from "express";
import type { Profile } from "../models/profile";

const router = Router();

const profiles: Record<string, Profile> = {};

router.get("/:userid", (req, res) => {
  const { userid } = req.params;

  let profile = profiles[userid];
  if (!profile) {
    profile = {
      username: userid,
      name: userid.charAt(0).toUpperCase() + userid.slice(1) + " Example",
      email: `${userid}@example.com`
    };
    profiles[userid] = profile;
  }

  res.json(profile);
});

router.put("/:userid", (req, res) => {
  const { userid } = req.params;
  const body = req.body as Partial<Profile>;

  const existing: Profile =
    profiles[userid] ||
    ({
      username: userid,
      name: "",
      email: ""
    } as Profile);

  const updated: Profile = {
    ...existing,
    ...body,
    username: userid 
  };

  profiles[userid] = updated;
  res.json(updated);
});

export default router;
