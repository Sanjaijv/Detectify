import mongoose from "mongoose";

const ScanResultSchema = new mongoose.Schema(
    {
        filename: String,
        scanType: {
            type: String,
            enum: ["quick", "deep", "forensic"],
            default: "quick",
        },
        aiProbability: Number,
        verdict: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

export default mongoose.model("ScanResult", ScanResultSchema);