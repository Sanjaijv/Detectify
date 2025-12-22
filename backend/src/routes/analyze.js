import ScanResult from "../models/ScanResult.js";
import { analyzeVideo } from "../services/videoService.js";

export const quickScan = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const filename = req.file.originalname;
    const scanType = req.body.scanType || "quick";

    console.log(`Starting ${scanType} scan for ${filename} at ${videoPath}`);

    const aiResult = await analyzeVideo(videoPath, scanType);

    let savedResultId = null;
    try {
      const savedResult = await ScanResult.create({
        filename,
        scanType,
        aiProbability: aiResult.aiLikelihood,
        verdict: aiResult.aiLikelihood > 0.5 ? "fail" : "pass",
      });
      savedResultId = savedResult._id;
    } catch (dbErr) {
      console.error("Database save failed (continuing without saving):", dbErr.message);
    }

    res.json({
      id: savedResultId,
      ...aiResult,
    });

  } catch (err) {
    console.error("Backend scan error:", err.message);
    res.status(500).json({ error: err.message || "Server error during analysis" });
  }
};
