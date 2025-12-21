const VideoResult = require("../models/videoResult");

const getResults = async (req, res) => {
  try {
    const results = await VideoResult.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
};

module.exports = {
  getResults
};
