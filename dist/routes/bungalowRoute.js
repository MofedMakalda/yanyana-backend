"use strict";
// import express from 'express';
// import multer from 'multer';
// import * as cloudinary from 'cloudinary';
// import { Readable } from 'stream';
// import { AddBungalow, getAllBungalows } from '../services/bungalowService';
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
// const upload = multer({ storage: multer.memoryStorage() }); // Store images in memory
// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// // Function to upload images to Cloudinary
// const uploadToCloudinary = (file: Express.Multer.File, bungalowFolder: string): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.v2.uploader.upload_stream(
//             {
//                 folder: `bungalows/${bungalowFolder}`, // Set the folder path dynamically
//                 resource_type: 'auto',
//             },
//             (error, result) => {
//                 if (error) {
//                     reject(new Error(`Image upload failed for ${file.originalname}: ${error.message}`));
//                 } else {
//                     resolve(result?.secure_url ?? ''); // Return the secure URL of the uploaded image
//                 }
//             }
//         );
//         // Convert buffer to readable stream and pipe it to Cloudinary upload stream
//         const bufferStream = new Readable();
//         bufferStream.push(file.buffer);
//         bufferStream.push(null);
//         bufferStream.pipe(uploadStream);
//     });
// };
// // POST route to add a bungalow
// router.post('/', upload.array('images'), async (req, res) => {
//     try {
//         const { location, capacity } = req.body;
//         const bungalowImages: Express.Multer.File[] = req.files as Express.Multer.File[];
//         if (!bungalowImages || !Array.isArray(bungalowImages) || bungalowImages.length === 0) {
//             return res.status(400).json({ message: 'No images uploaded or invalid file format.' });
//         }
//         // Use the bungalow's location as the unique folder name
//         const bungalowFolder = location;
//         // Upload images to Cloudinary and store them in the corresponding folder
//         const uploadedImageUrls = await Promise.all(bungalowImages.map(file => uploadToCloudinary(file, bungalowFolder)));
//         // Pass the uploaded image URLs to your service
//         const response = await AddBungalow({ location, capacity, bungalowImages: uploadedImageUrls });
//         return res.status(response.statusCode).json(response.data);
//     } catch (error: unknown) {
//         console.error('Error in POST /bungalows:', error);
//         return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
//     }
// });
// // GET route to fetch bungalows
// router.get('/', async (req, res) => {
//     try {
//         const response = await getAllBungalows(); // Use the getAllBungalows function
//         return res.status(response.statusCode).json(response.data);
//     } catch (error) {
//         console.error('Error fetching bungalows:', error);
//         return res.status(500).json({ message: 'Error fetching bungalows' });
//     }
// });
// export default router;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary = __importStar(require("cloudinary"));
const stream_1 = require("stream");
const bungalowService_1 = require("../services/bungalowService");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }); // Store images in memory
// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Function to upload images to Cloudinary
const uploadToCloudinary = (file, bungalowFolder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream({
            folder: `bungalows/${bungalowFolder}`, // Set the folder path dynamically
            resource_type: 'auto',
        }, (error, result) => {
            var _a;
            if (error) {
                reject(new Error(`Image upload failed for ${file.originalname}: ${error.message}`));
            }
            else {
                resolve((_a = result === null || result === void 0 ? void 0 : result.secure_url) !== null && _a !== void 0 ? _a : ''); // Return the secure URL of the uploaded image
            }
        });
        // Convert buffer to readable stream and pipe it to Cloudinary upload stream
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
// POST route to add a bungalow
router.post('/', upload.array('images'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, capacity } = req.body;
        const bungalowImages = req.files;
        if (!bungalowImages || !Array.isArray(bungalowImages) || bungalowImages.length === 0) {
            return res.status(400).json({ message: 'No images uploaded or invalid file format.' });
        }
        // Use the bungalow's location as the unique folder name
        const bungalowFolder = location;
        // Upload images to Cloudinary and store them in the corresponding folder
        const uploadedImageUrls = yield Promise.all(bungalowImages.map(file => uploadToCloudinary(file, bungalowFolder)));
        // Pass the uploaded image URLs to your service
        const response = yield (0, bungalowService_1.AddBungalow)({ location, capacity, bungalowImages: uploadedImageUrls });
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error('Error in POST /bungalows:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// GET route to fetch bungalows
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, bungalowService_1.getAllBungalows)(); // Use the getAllBungalows function
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error('Error fetching bungalows:', error);
        return res.status(500).json({ message: 'Error fetching bungalows' });
    }
}));
// DELETE route to remove a bungalow
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bungalowId = req.params.id;
        const response = yield (0, bungalowService_1.deleteBungalow)(bungalowId); // Call the delete service
        return res.status(response.statusCode).json(response.message);
    }
    catch (error) {
        console.error('Error deleting bungalow:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
exports.default = router;
