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

//-------------------------------------- Current Working version
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cityRoute from "./routes/cityRoutes";
// import cruiseRoute from "./routes/cruiseRoute";
// import bungalowRoute from "./routes/bungalowRoute";
// // import planRoute from "./routes/planRoute";
// import * as cloudinary from "cloudinary";
// import userRoute from "./routes/userRoute";

// dotenv.config();

// const app = express();
// // const port = process.env.PORT || 3002; // Use PORT from environment or default to 3002
// const port = process.env.PORT || 3002; // Use PORT from environment or default to 3002

// // Configure Cloudinary
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const allowedOrigins = [
//   "http://localhost:5173", // For local development
//   "https://yanyana-frontend.vercel.app", // Your Vercel frontend URL
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // If you're using cookies or authentication
//   })
// );
// // Middleware for JSON parsing and CORS
// app.use(express.json());

// // Routes for cities, cruises, bungalows, and plans
// app.use("/cities", cityRoute);
// app.use("/cruise", cruiseRoute);
// app.use("/bungalows", bungalowRoute);
// // app.use('/plan', planRoute);
// app.use("/user", userRoute);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.DATABASE_URL || "")
//   .then(() => {
//     console.log("Connected Successfully to MongoDB");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://0.0.0.0:${port}`);
// });
//------------------------

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cityRoute from "./routes/cityRoutes";
import cruiseRoute from "./routes/cruiseRoute";
import bungalowRoute from "./routes/bungalowRoute";
// import planRoute from "./routes/planRoute";
import * as cloudinary from "cloudinary";
import userRoute from "./routes/userRoute";

// Load .env variables
dotenv.config();

const app = express();

// ✅ Convert PORT to number (TypeScript safe)
const port: number = parseInt(process.env.PORT || "3002", 10);

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "https://yanyana-frontend.vercel.app",
  "https://yanyana-group.com",
  "https://www.yanyana-group.com", // ✅ Add this!
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/cities", cityRoute);
app.use("/cruise", cruiseRoute);
app.use("/bungalows", bungalowRoute);
// app.use("/plan", planRoute);
app.use("/user", userRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });

// ✅ Listen on 0.0.0.0 to allow public access from EC2
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${port}`);
});
