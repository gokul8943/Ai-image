import mongoose from "mongoose";

export function connectToDB() {
    const MONGO_URL = process.env.MONGO_URL!;

    if (!process.env.MONGO_URL) {
        console.error("No Mongoose URL specified");
        process.exit(1); // Exit the process if no URL is provided
    }
    mongoose.connect(MONGO_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log("Connection error: " + err)
        );
}