

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cityRoute from "./routes/cityRoutes";
import cruiseRoute from "./routes/cruiseRoute";
import bungalowRoute from "./routes/bungalowRoute";
import planRoute from "./routes/planRoute";
import * as cloudinary from "cloudinary";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();
// const port = process.env.PORT || 3002; // Use PORT from environment or default to 3002
const port = process.env.PORT ; // Use PORT from environment or default to 3002

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware for JSON parsing and CORS
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173.herokuapp.com",
}));

// Routes for cities, cruises, bungalows, and plans
app.use('/cities', cityRoute);
app.use('/cruise', cruiseRoute);
app.use('/bungalows', bungalowRoute);
app.use('/plan', planRoute);
app.use('/user', userRoute)



// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => {
        console.log("Connected Successfully to MongoDB");
    })
    .catch(error => {
        console.error("MongoDB connection error:", error);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


