"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
// uploadToCloudinary.ts
const cloudinaryConfig_1 = __importDefault(require("./cloudinaryConfig")); // Adjust path as necessary
const stream_1 = require("stream");
// Helper function to upload images to Cloudinary
const uploadToCloudinary = (file, folderPath) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryConfig_1.default.v2.uploader.upload_stream({
            folder: folderPath,
            resource_type: 'auto',
        }, (error, result) => {
            var _a;
            if (error) {
                reject(new Error(`Image upload failed for ${file.originalname}: ${error.message}`));
            }
            else {
                resolve((_a = result === null || result === void 0 ? void 0 : result.secure_url) !== null && _a !== void 0 ? _a : '');
            }
        });
        const bufferStream = new stream_1.Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
