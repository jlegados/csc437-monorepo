import { Router } from "express";

const router = Router();

router.get("/:userid", (req, res) => {
  const { userid } = req.params;

  // Simple fake profile data for the lab
  res.json({
    username: userid,
    name: userid.charAt(0).toUpperCase() + userid.slice(1) + " Example",
    email: `${userid}@example.com`,
  });
});

export default router;
