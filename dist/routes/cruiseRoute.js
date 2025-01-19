"use strict";
// import express from "express";
// import multer from "multer";
// import * as cloudinary from "cloudinary";
// import { Readable } from "stream";
// import {
//   addCruise,
//   deleteCruiseByMonthAndDate,
//   deleteCruisesByMonth,
//   getCruisesByMonth,
//   getCruisesByMonthAndDate,
// } from "../services/cruiseService";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() }); // Memory storage for images
// // Cloudinary configuration
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // Helper function to upload images to Cloudinary
// const uploadToCloudinary = (
//   file: Express.Multer.File,
//   folderPath: string
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       { folder: folderPath, resource_type: "auto" },
//       (error, result) => {
//         if (error) {
//           reject(
//             new Error(
//               `Failed to upload image ${file.originalname}: ${error.message}`
//             )
//           );
//         } else {
//           resolve(result?.secure_url ?? ""); // Return secure URL
//         }
//       }
//     );
//     // Stream buffer to Cloudinary
//     const bufferStream = new Readable();
//     bufferStream.push(file.buffer);
//     bufferStream.push(null);
//     bufferStream.pipe(uploadStream);
//   });
// };
// // POST route to add a new cruise with images
// router.post("/", upload.array("images"), async (req, res) => {
//   try {
//     const { month, cruisename, destinations, nights, date } = req.body;
//     const files = req.files as Express.Multer.File[];
//     if (!files || !Array.isArray(files) || files.length === 0) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }
//     // Cloudinary folder path: 'cruises/{month}/{date}'
//     const folderPath = `cruises/${month}/${date}`;
//     // Upload each image to Cloudinary
//     const imageUrls = await Promise.all(
//       files.map((file) => uploadToCloudinary(file, folderPath))
//     );
//     // Save cruise data in MongoDB
//     const response = await addCruise({
//       month,
//       cruisename,
//       destinations,
//       nights,
//       date,
//       images: imageUrls,
//     });
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in POST /cruises:", error);
//     return res.status(500).json({
//       message: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });
// // GET route to fetch cruises by month
// router.get("/:month", async (req, res) => {
//   try {
//     const { month } = req.params;
//     const response = await getCruisesByMonth(month);
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in GET /cruises:", error);
//     return res.status(500).json({ message: "Error fetching cruises" });
//   }
// });
// router.get("/:month/:date", async (req, res) => {
//   try {
//     const { month, date } = req.params;
//     const response = await getCruisesByMonthAndDate(month, date);
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in GET /cruises:", error);
//     return res.status(500).json({ message: "Error fetching cruises" });
//   }
// });
// // DELETE route to delete all cruises for a specific month
// router.delete("/:month", async (req, res) => {
//   try {
//       const { month } = req.params;
//       const response = await deleteCruisesByMonth(month);
//       return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//       console.error("Error in DELETE /cruises/:month:", error);
//       return res.status(500).json({ message: "Error deleting cruises" });
//   }
// });
// // DELETE route to delete a specific cruise by month and date
// router.delete("/:month/date/:date", async (req, res) => {
//   try {
//       const { month, date } = req.params;
//       const response = await deleteCruiseByMonthAndDate(month, date);
//       return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//       console.error("Error in DELETE /cruises/:month/date/:date:", error);
//       return res.status(500).json({ message: "Error deleting the specified cruise" });
//   }
// });
// export default router;
//-----------------------------------------------------------------------------------------
// import express from "express";
// import multer from "multer";
// import * as cloudinary from "cloudinary";
// import { Readable } from "stream";
// import {
//   addCruiseWithImages,
//   deleteCruiseByMonthAndDate,
//   deleteCruisesByMonth,
//   getCruisesByMonth,
//   getCruisesByMonthAndDate,
// } from "../services/cruiseService";
// import { uploadToCloudinary } from "../cloudinary/uploadToCloudinary";
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() }); // Memory storage for images
// // // POST route to add a new cruise with images
// // router.post("/", upload.array("images"), async (req, res) => {
// //   try {
// //     const { month, cruisename, destinations, nights, date } = req.body;
// //     const files = req.files as Express.Multer.File[];
// //     // Call the service function to handle the logic
// //     const response = await addCruiseWithImages({
// //       month,
// //       cruisename,
// //       destinations,
// //       nights,
// //       date,
// //       files,
// //     });
// //     return res.status(response.statusCode).json(response.data);
// //   } catch (error) {
// //     console.error("Error in POST /cruises:", error);
// //     return res.status(500).json({
// //       message: error instanceof Error ? error.message : "Unknown error",
// //     });
// //   }
// // });
// // POST route to add a new cruise with images
// // POST route to add a new cruise with images
// router.post("/", upload.fields([{ name: "images", maxCount: 10 }]), async (req, res) => {
//   try {
//     const { month, cruisename, destinations, nights, date } = req.body;
//     // Type guard to check if 'images' field exists and is an array of files
//     // const files = (req.files as { [fieldname: string]: Express.Multer.File[] })['images'];
//     const files = (req.files as { images?: Express.Multer.File[] })?.images;
//     // If no files are uploaded, return an error response
//     if (!files) {
//       return res.status(400).json({ message: "No images uploaded" });
//     }
//     // Call the service function to handle the logic
//     const response = await addCruiseWithImages({
//       month,
//       cruisename,
//       destinations,
//       nights,
//       date,
//       files, // Pass the images array to the service
//     });
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in POST /cruises:", error);
//     return res.status(500).json({
//       message: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// });
// // GET route to fetch cruises by month
// router.get("/:month", async (req, res) => {
//   try {
//     const { month } = req.params;
//     const response = await getCruisesByMonth(month);
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in GET /cruises:", error);
//     return res.status(500).json({ message: "Error fetching cruises" });
//   }
// });
// router.get("/:month/:date", async (req, res) => {
//   try {
//     const { month, date } = req.params;
//     const response = await getCruisesByMonthAndDate(month, date);
//     return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//     console.error("Error in GET /cruises:", error);
//     return res.status(500).json({ message: "Error fetching cruises" });
//   }
// });
// // DELETE route to delete all cruises for a specific month
// router.delete("/:month", async (req, res) => {
//   try {
//       const { month } = req.params;
//       const response = await deleteCruisesByMonth(month);
//       return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//       console.error("Error in DELETE /cruises/:month:", error);
//       return res.status(500).json({ message: "Error deleting cruises" });
//   }
// });
// // DELETE route to delete a specific cruise by month and date
// router.delete("/:month/date/:date", async (req, res) => {
//   try {
//       const { month, date } = req.params;
//       const response = await deleteCruiseByMonthAndDate(month, date);
//       return res.status(response.statusCode).json(response.data);
//   } catch (error) {
//       console.error("Error in DELETE /cruises/:month/date/:date:", error);
//       return res.status(500).json({ message: "Error deleting the specified cruise" });
//   }
// });
// export default router;
//-----------------------------------------------------------------
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cruiseService_1 = require("../services/cruiseService");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }); // Memory storage for images
router.post("/", upload.fields([
    { name: "images", maxCount: 10 },
    { name: "mainImage", maxCount: 1 },
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { month, cruisename, destinations, nights, date } = req.body;
    const files = req.files;
    const result = yield (0, cruiseService_1.addCruiseWithImages)(month, cruisename, destinations, nights, date, files);
    return res.status(result.statusCode).json(result.data);
}));
// GET route to fetch cruises by month
router.get("/:month", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month } = req.params;
        const response = yield (0, cruiseService_1.getCruisesByMonth)(month);
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error("Error in GET /cruises:", error);
        return res.status(500).json({ message: "Error fetching cruises" });
    }
}));
router.get("/:month/:date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, date } = req.params;
        const response = yield (0, cruiseService_1.getCruisesByMonthAndDate)(month, date);
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error("Error in GET /cruises:", error);
        return res.status(500).json({ message: "Error fetching cruises" });
    }
}));
// DELETE route to delete all cruises for a specific month
router.delete("/:month", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month } = req.params;
        const response = yield (0, cruiseService_1.deleteCruisesByMonth)(month);
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error("Error in DELETE /cruises/:month:", error);
        return res.status(500).json({ message: "Error deleting cruises" });
    }
}));
// DELETE route to delete a specific cruise by month and date
router.delete("/:month/:date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, date } = req.params;
        const response = yield (0, cruiseService_1.deleteCruiseByMonthAndDate)(month, date);
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error("Error in DELETE /cruises/:month/date/:date:", error);
        return res
            .status(500)
            .json({ message: "Error deleting the specified cruise" });
    }
}));
exports.default = router;
