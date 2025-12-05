// packages/server/src/routes/dashboard.ts

import express from "express";
import Dashboard from "../services/dashboard-service";

const router = express.Router();

// GET /api/dashboard/:userid
router.get("/:userid", async (req, res, next) => {
  try {
    const { userid } = req.params;

    const dashboard = await Dashboard.getDashboard(userid);

    res.json(dashboard);
  } catch (err) {
    next(err);
  }
});

// POST /api/dashboard/:userid/transactions
router.post("/:userid/transactions", async (req, res, next) => {
  try {
    const { userid } = req.params;
    const data = req.body; // should match TransactionInput shape

    const dashboard = await Dashboard.addTransaction(userid, data);

    res.status(201).json(dashboard);
  } catch (err) {
    next(err);
  }
});

export default router;
