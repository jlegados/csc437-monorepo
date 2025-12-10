import express from "express";
import * as Merchants from "../services/merchant-svc";

const router = express.Router();

// GET /api/merchants  — list all merchants for this user
router.get("/", async (req, res) => {
  try {
    const userid = req.user?.username;
    if (!userid) return res.status(401).json({ error: "Unauthorized" });

    const list = await Merchants.list(userid);
    res.json(list);
  } catch (err) {
    console.error("Error listing merchants:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/merchants/:id  — get single merchant (owned by user)
router.get("/:id", async (req, res) => {
  try {
    const userid = req.user?.username;
    if (!userid) return res.status(401).json({ error: "Unauthorized" });

    const merchant = await Merchants.get(req.params.id, userid);
    if (!merchant) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    res.json(merchant);
  } catch (err) {
    console.error("Error getting merchant:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/merchants  — create new merchant
router.post("/", async (req, res) => {
  try {
    const userid = req.user?.username;
    if (!userid) return res.status(401).json({ error: "Unauthorized" });

    const created = await Merchants.create(userid, req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error("Error creating merchant:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/merchants/:id  — update merchant
router.put("/:id", async (req, res) => {
  try {
    const userid = req.user?.username;
    if (!userid) return res.status(401).json({ error: "Unauthorized" });

    const updated = await Merchants.update(req.params.id, userid, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating merchant:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/merchants/:id  — delete merchant
router.delete("/:id", async (req, res) => {
  try {
    const userid = req.user?.username;
    if (!userid) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await Merchants.remove(req.params.id, userid);
    if (!deleted) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Error deleting merchant:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
