import express, { Request, Response } from "express";
import Merchants from "../services/merchant-svc";

const router = express.Router();

/** GET /api/merchants > list */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const list = await Merchants.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

/** GET /api/merchants/:id > one (by slug/id) */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Merchants.get(req.params.id);
    if (!doc) return res.status(404).send("Not Found");
    res.json(doc);
  } catch (err) {
    res.status(404).send(String(err));
  }
});

/** POST /api/merchants > create */
router.post("/", async (req: Request, res: Response) => {
  try {
    // const body = req.body as Merchant;
    const created = await Merchants.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).send(String(err));
  }
});

/** PUT /api/merchants/:id > update */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Merchants.update(req.params.id, req.body);
    if (!updated) return res.status(404).send("Not Found");
    res.json(updated);
  } catch (err) {
    res.status(404).send(String(err));
  }
});

/** DELETE /api/merchants/:id > remove */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Merchants.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send(String(err));
  }
});

export default router;
