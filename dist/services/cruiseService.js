"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCruiseByMonthAndDate = exports.deleteCruisesByMonth = exports.getCruisesByMonthAndDate = exports.getCruisesByMonth = exports.addCruiseWithImages = void 0;
const cloudinary = __importStar(require("cloudinary"));
const cruiseModel_1 = require("../models/cruiseModel");
const uploadToCloudinary_1 = require("../cloudinary/uploadToCloudinary");
const addCruiseWithImages = (month, cruisename, destinations, nights, date, files) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const imagesArray = (_a = files === null || files === void 0 ? void 0 : files['images']) !== null && _a !== void 0 ? _a : [];
        const cruiseImageArray = (files === null || files === void 0 ? void 0 : files['mainImage']) || [];
        if (imagesArray.length === 0 && cruiseImageArray.length === 0) {
            return { data: { message: "No images uploaded" }, statusCode: 400 };
        }
        const folderPath = `cruises/${month}/${date}`;
        const imageUrls = yield Promise.all([
            ...imagesArray.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file, folderPath)),
        ]);
        const CruiseUrls = yield Promise.all([
            ...cruiseImageArray.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file, folderPath))
        ]);
        const newCruiseDetails = {
            cruisename,
            destinations,
            nights,
            date,
            images: imageUrls,
            mainImage: CruiseUrls,
        };
        let cruise = yield cruiseModel_1.CruiseModel.findOne({ month });
        if (!cruise) {
            cruise = new cruiseModel_1.CruiseModel({ month, cruisedetails: [newCruiseDetails] });
        }
        else {
            cruise.cruisedetails.push(newCruiseDetails);
        }
        yield cruise.save();
        return { data: cruise, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error adding cruise: ' + error.message);
        }
        else {
            throw new Error('Error adding cruise: Unknown error');
        }
    }
});
exports.addCruiseWithImages = addCruiseWithImages;
// Service to get cruises by month
const getCruisesByMonth = (month) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cruises = yield cruiseModel_1.CruiseModel.findOne({ month }).select('cruisedetails');
        if (!cruises) {
            return { data: [], statusCode: 404, message: 'No cruises found for this month' };
        }
        return { data: cruises, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching cruises: ' + error.message);
        }
        else {
            throw new Error('Error fetching cruises: Unknown error');
        }
    }
});
exports.getCruisesByMonth = getCruisesByMonth;
const getCruisesByMonthAndDate = (month, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the cruise by month
        const cruise = yield cruiseModel_1.CruiseModel.findOne({ month }).select('cruisedetails');
        if (!cruise) {
            return { data: [], statusCode: 404, message: 'No cruises found for this month' };
        }
        // Filter the cruise details by the provided date
        const filteredCruises = cruise.cruisedetails.filter(detail => detail.date.toISOString().split('T')[0] === date // Compare date in 'YYYY-MM-DD' format
        );
        if (filteredCruises.length === 0) {
            return { data: [], statusCode: 404, message: 'No cruises found for this date' };
        }
        return { data: filteredCruises, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching cruises: ' + error.message);
        }
        else {
            throw new Error('Error fetching cruises: Unknown error');
        }
    }
});
exports.getCruisesByMonthAndDate = getCruisesByMonthAndDate;
// Service to delete all cruises for a specific month
// Service to delete a specific month and its associated cruises
const deleteCruisesByMonth = (month) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cruise = yield cruiseModel_1.CruiseModel.findOne({ month });
        if (!cruise) {
            return { data: { message: 'No cruises found for this month' }, statusCode: 404 };
        }
        // Prepare a list of image URLs to delete
        const imagesToDelete = cruise.cruisedetails.flatMap(detail => detail.images);
        // Delete the cruise document from the database
        yield cruiseModel_1.CruiseModel.deleteOne({ month });
        // Delete all images in the specified month's folder
        const folderPath = `cruises/${month}`;
        yield cloudinary.v2.api.delete_resources_by_prefix(folderPath, { resource_type: 'image' });
        // Optionally, you can delete the folder itself if no resources are left
        yield cloudinary.v2.api.delete_folder(folderPath);
        return { data: { message: 'Cruises and images deleted successfully' }, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting cruises: ' + error.message);
        }
        else {
            throw new Error('Error deleting cruises: Unknown error');
        }
    }
});
exports.deleteCruisesByMonth = deleteCruisesByMonth;
const deleteCruiseByMonthAndDate = (month, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the cruise document for the specified month
        const cruise = yield cruiseModel_1.CruiseModel.findOne({ month });
        if (!cruise) {
            return { data: { message: 'No cruises found for this month' }, statusCode: 404 };
        }
        // Filter the cruise details to find the index of the cruise to be deleted by date
        const cruiseIndex = cruise.cruisedetails.findIndex(detail => detail.date.toISOString().split('T')[0] === date // Compare date in 'YYYY-MM-DD' format
        );
        if (cruiseIndex === -1) {
            return { data: { message: 'Cruise not found for the specified date' }, statusCode: 404 };
        }
        // Get the images to delete
        const imagesToDelete = cruise.cruisedetails[cruiseIndex].images;
        // Delete all images first
        const deletePromises = imagesToDelete.map((imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const publicId = (_a = imageUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; // Extract public ID from image URL
            console.log(`Attempting to delete image with public ID: ${publicId}`);
            if (publicId) {
                try {
                    const result = yield cloudinary.v2.uploader.destroy(publicId);
                    console.log(`Deleted image ${publicId}:`, result);
                }
                catch (err) {
                    console.error(`Error deleting image ${publicId}:`, err);
                }
            }
            else {
                console.warn('No public ID found for image URL:', imageUrl);
            }
        }));
        // Wait for all image deletion promises to complete
        yield Promise.all(deletePromises);
        // Now remove the cruise from the array and save the updated document
        cruise.cruisedetails.splice(cruiseIndex, 1);
        yield cruise.save();
        // Now delete the entire folder
        const folderPath = `cruises/${month}/${date}`; // Construct the folder path
        console.log(`Attempting to delete folder: ${folderPath}`);
        try {
            // List all resources in the folder (images, videos, raw files, etc.)
            const resources = yield cloudinary.v2.api.resources({
                prefix: folderPath,
                resource_type: 'image', // Specify resource type (image)
                type: 'upload' // This ensures only uploaded resources are listed
            });
            console.log('Resources in folder:', resources);
            if (resources.resources.length > 0) {
                // Explicitly type 'resource' to match Cloudinary's resource object
                const deleteResourcesPromises = resources.resources.map((resource) => __awaiter(void 0, void 0, void 0, function* () {
                    const publicId = resource.public_id;
                    try {
                        const result = yield cloudinary.v2.uploader.destroy(publicId);
                        console.log(`Deleted resource ${publicId}:`, result);
                    }
                    catch (err) {
                        console.error(`Error deleting resource ${publicId}:`, err);
                    }
                }));
                yield Promise.all(deleteResourcesPromises);
            }
            // Attempt to delete the folder
            const folderResult = yield cloudinary.v2.api.delete_folder(folderPath);
            console.log('Folder delete response:', folderResult);
            if (folderResult.result !== 'ok') {
                console.warn(`Failed to delete folder ${folderPath}. Response:`, folderResult);
            }
        }
        catch (error) {
            console.error(`Error processing folder deletion for ${folderPath}:`, error);
        }
        return { data: { message: 'Cruise and images deleted successfully' }, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error deleting cruise:', error);
            throw new Error('Error deleting cruise: ' + error.message);
        }
        else {
            throw new Error('Error deleting cruise: Unknown error');
        }
    }
});
exports.deleteCruiseByMonthAndDate = deleteCruiseByMonthAndDate;
