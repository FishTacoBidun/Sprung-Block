import "dotenv/config";
import express from "express";
import asyncHandler from "express-async-handler";
import cors from "cors";

import {
    connectToDatabase,
    createShareData,
    getShareDataByShareId
} from "./share_model.mjs";

const ERROR_NOT_FOUND = { Error: "Not found" };
const ERROR_INVALID_REQ = { Error: "Invalid request" };
const PORT = process.env.SHARE_PORT || 3003;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Share service running on port ${PORT}...`);
    } catch (err) {
        console.error("Failed to start Share DB service:", err);
    }
});

//POST create a shareable completion record
app.post("/api/share", asyncHandler(async (req, res) => {
    const { levelNum, time, health, username } = req.body;

    if (
        typeof levelNum !== "number" ||
        typeof time !== "string" ||
        typeof health !== "number" ||
        typeof username !== "string"
    ) {
        res.status(400).json(ERROR_INVALID_REQ);
        return;
    }

    const result = await createShareData(levelNum, time, health, username);
    res.status(201).json({ shareId: result.shareId });
}));

//GET retrieve a shared run
app.get("/api/share/:shareId", asyncHandler(async (req, res) => {
    const shareId = req.params.shareId;

    const entry = await getShareDataByShareId(shareId);

    if (entry === null) {
        res.status(404).json(ERROR_NOT_FOUND);
        return;
    }

    res.status(200).json(entry);
}));