import express from "express";
import Action from "../models/Action.js";

const router = express.Router();

// Get last 20 actions
router.get("/", async (req, res) => {
  try {
    const actions = await Action.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .populate("user", "username");
    res.json(actions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
