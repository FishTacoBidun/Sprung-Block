import mongoose from 'mongoose';
import 'dotenv/config';

const FEEDBACK_DB_NAME = 'feedback_db';

let connectionFeedback = undefined;

async function connectToDatabase() {
    try {
        connectionFeedback = await mongoose.connect(
            process.env.MONGODB_CONNECT_STRING, 
            { dbName: FEEDBACK_DB_NAME }
        );
        console.log("Successfully connected to MongoDB - Feedback DB");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB - Feedback DB ${err.message}`);
    }
}

//feedback schema
const feedbackSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    email:       { type: String, required: true },
    category:    { type: String, required: true, enum: ['bug report', 'feedback', 'other'] },
    message:     { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

//compile model
const Feedback_Data = mongoose.model("Feedback_Data", feedbackSchema);

//creates a new feedback entry
const create_feedback = async (name, email, category, message) => {
    const feedback = new Feedback_Data({ name, email, category, message });
    return feedback.save();
};

//returns all feedback
const getAllFeedback = async () => {
    const query = Feedback_Data.find();
    return query.exec();
};

export { 
    connectToDatabase, 
    create_feedback, 
    getAllFeedback 
};