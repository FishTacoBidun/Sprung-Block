import mongoose from "mongoose";
import "dotenv/config";
import crypto from "crypto";

const SHARE_DB_NAME = "share_db";

let shareConnection = undefined;

async function connectToDatabase() {
    try {
        shareConnection = await mongoose.connect(
            process.env.MONGODB_CONNECT_STRING,
            { dbName: SHARE_DB_NAME }
        );
        console.log("Successfully connected to MongoDB - Share DB");
    } catch (err) {
        console.error(err);
        throw Error(`Could not connect to MongoDB - Share DB ${err.message}`);
    }
}

//schema for shareable game results
const shareSchema = mongoose.Schema({
    levelNum: { type: Number, required: true },
    time: { type: String, required: true },
    health: { type: Number, required: true },
    username: { type: String, required: true }, //username or "Your friend" for guests
    shareId: { type: String, required: true, unique: true }, //random unique hash
    expires: { type: Date, required: true, index: { expireAfterSeconds: 0 } } //TTL index for auto-deletion after 1 week
});

//model
const Share_Data = mongoose.model(SHARE_DB_NAME, shareSchema);

//helper to generate a unique ID for sharing
function generateShareId() {
    return crypto.randomBytes(5).toString("hex"); //10-char hash
}

const createShareData = async (levelNum, time, health, username) => {
    const shareId = generateShareId();
    //set expires to 1 week from now for MongoDB TTL auto-deletion
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); //add 7 days
    const shareEntry = new Share_Data({ levelNum, time, health, username, shareId, expires });
    return shareEntry.save();
};

const getShareDataByShareId = async (shareId) => {
    const query = Share_Data.findOne({ shareId });
    return query.exec();
};

export {
    connectToDatabase,
    createShareData,
    getShareDataByShareId
};