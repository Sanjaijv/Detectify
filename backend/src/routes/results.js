import express from "express";
import ScanResult from "../models/ScanResult.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await ScanResult.find().sort({ createdAt: -1 });
  res.json(results);
});

export default router;
