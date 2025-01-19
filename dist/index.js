"use strict";
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cityRoute from "./routes/cityRoutes";
// import cruiseRoute from "./routes/cruiseRoute";
// import bungalowRoute from "./routes/bungalowRoute";
// import planRoute from "./routes/planRoute";
// import * as cloudinary from "cloudinary";
// import userRoute from "./routes/userRoute";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// // const port = process.env.PORT || 3002; // Use PORT from environment or default to 3002
// const port = process.env.PORT ; // Use PORT from environment or default to 3002
// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // Middleware for JSON parsing and CORS
// app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:5173.herokuapp.com",
// }));
// // Routes for cities, cruises, bungalows, and plans
// app.use('/cities', cityRoute);
// app.use('/cruise', cruiseRoute);
// app.use('/bungalows', bungalowRoute);
// app.use('/plan', planRoute);
// app.use('/user', userRoute)
// // Connect to MongoDB
// mongoose.connect(process.env.DATABASE_URL || "")
//     .then(() => {
//         console.log("Connected Successfully to MongoDB");
//     })
//     .catch(error => {
//         console.error("MongoDB connection error:", error);
//     });
// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cityRoutes_1 = __importDefault(require("./routes/cityRoutes"));
const cruiseRoute_1 = __importDefault(require("./routes/cruiseRoute"));
const bungalowRoute_1 = __importDefault(require("./routes/bungalowRoute"));
const planRoute_1 = __importDefault(require("./routes/planRoute"));
const cloudinary = __importStar(require("cloudinary"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// const port = process.env.PORT || 3002; // Use PORT from environment or default to 3002
const port = process.env.PORT; // Use PORT from environment or default to 3002
// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const allowedOrigins = [
    "http://localhost:5173", // For local development
    "https://yanyana-frontend-qhsqh6jns-mofed-makaldas-projects.vercel.app", // Your Vercel frontend URL
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true, // If you're using cookies or authentication
}));
// Middleware for JSON parsing and CORS
app.use(express_1.default.json());
// Routes for cities, cruises, bungalows, and plans
app.use('/cities', cityRoutes_1.default);
app.use('/cruise', cruiseRoute_1.default);
app.use('/bungalows', bungalowRoute_1.default);
app.use('/plan', planRoute_1.default);
app.use('/user', userRoute_1.default);
// Connect to MongoDB
mongoose_1.default.connect(process.env.DATABASE_URL || "")
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
