import mongoose from "mongoose";
import {config} from "../config/config.js";


export const openMongoDBConnection = async () => {
    try {
        const mongo = await mongoose.connect(config.database.uri, {
            serverSelectionTimeoutMS: 10_000,
            socketTimeoutMS: 45_000,
            maxPoolSize: 10,
            maxIdleTimeMS: 30_000,
        });
        console.log(`MongoDB connected ${mongo.connection.host}`);
    } catch (e) {
        console.log(`MongoDB connection error: ${e}`);
        process.exit(1);
    }
}

export const closeMongoDBConnection = async () => {
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed.")
}