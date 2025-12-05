import express from "express";
import * as TransactionSvc from "../services/transaction-svc";

const router = express.Router();

/** GET /api/transactions/:userid */
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const tx = await TransactionSvc.list(userid);
  res.json(tx);
});

/** POST /api/transactions */
router.post("/", async (req, res) => {
  const tx = req.body;
  if (!tx.userid || !tx.amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const saved = await TransactionSvc.create(tx);
  res.json(saved);
});

export default router;
