"use strict";
// import bungalowModel from "../models/bungalowModel";
// import * as cloudinary from "cloudinary";
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
exports.deleteBungalow = exports.getAllBungalows = exports.AddBungalow = void 0;
// interface AddBungalowParams {
//     location: string;
//     capacity: string;
//     bungalowImages: string[]; // Expecting an array of image URLs
// }
// // Configure Cloudinary
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// export const AddBungalow = async ({ location, capacity, bungalowImages }: AddBungalowParams) => {
//     try {
//         // Log input values
//         console.log("Adding bungalow with location:", location, "capacity:", capacity, "images:", bungalowImages);
//         const newBungalow = new bungalowModel({
//             location,
//             capacity,
//             bungalowImages // Save Cloudinary URLs to the database
//         });
//         await newBungalow.save();
//         return { data: newBungalow, statusCode: 200 };
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             throw new Error('Error adding Bungalow: ' + error.message);
//         } else {
//             throw new Error('Error adding Bungalow: Unknown error');
//         }
//     }
// };
// export const getAllBungalows = async () => {
//     try {
//         const bungalows = await bungalowModel.find().select('location capacity bungalowImages');
//         return { data: bungalows, statusCode: 200 };
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             throw new Error('Error fetching Bungalows: ' + error.message);
//         } else {
//             throw new Error('Error fetching Bungalows: Unknown error');
//         }
//     }
// };
const bungalowModel_1 = __importDefault(require("../models/bungalowModel"));
const cloudinary = __importStar(require("cloudinary"));
// Configure Cloudinary (Make sure it's configured)
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const AddBungalow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ location, capacity, bungalowImages }) {
    try {
        console.log("Adding bungalow with location:", location, "capacity:", capacity, "images:", bungalowImages);
        const newBungalow = new bungalowModel_1.default({
            location,
            capacity,
            bungalowImages // Save Cloudinary URLs to the database
        });
        yield newBungalow.save();
        return { data: newBungalow, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error adding Bungalow: ' + error.message);
        }
        else {
            throw new Error('Error adding Bungalow: Unknown error');
        }
    }
});
exports.AddBungalow = AddBungalow;
const getAllBungalows = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bungalows = yield bungalowModel_1.default.find().select('location capacity bungalowImages');
        return { data: bungalows, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching Bungalows: ' + error.message);
        }
        else {
            throw new Error('Error fetching Bungalows: Unknown error');
        }
    }
});
exports.getAllBungalows = getAllBungalows;
// Function to delete a bungalow
const deleteBungalow = (bungalowId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the bungalow by ID
        const bungalow = yield bungalowModel_1.default.findById(bungalowId);
        if (!bungalow) {
            return { message: 'Bungalow not found', statusCode: 404 };
        }
        // Remove images from Cloudinary
        const bungalowImages = bungalow.bungalowImages; // Cloudinary image URLs
        const publicIds = bungalowImages.map(imageUrl => {
            // Extract the public ID from the Cloudinary URL
            const parts = imageUrl.split('/');
            const publicIdWithExtension = parts[parts.length - 1];
            return publicIdWithExtension.split('.')[0]; // Get public ID without extension
        });
        yield Promise.all(publicIds.map(publicId => cloudinary.v2.uploader.destroy(`bungalows/${bungalow.location}/${publicId}`)));
        // Remove bungalow from the database
        yield bungalowModel_1.default.findByIdAndDelete(bungalowId);
        return { message: 'Bungalow deleted successfully', statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting Bungalow: ' + error.message);
        }
        else {
            throw new Error('Error deleting Bungalow: Unknown error');
        }
    }
});
exports.deleteBungalow = deleteBungalow;
