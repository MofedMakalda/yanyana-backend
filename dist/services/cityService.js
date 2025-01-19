"use strict";
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
exports.deleteHotel = exports.deleteCity = exports.getAllHotels = exports.getAllCities = exports.addCityWithHotels = void 0;
const cloudinaryConfig_1 = __importDefault(require("../cloudinary/cloudinaryConfig"));
const uploadToCloudinary_1 = require("../cloudinary/uploadToCloudinary");
const citiesModel_1 = __importDefault(require("../models/citiesModel"));
const addCityWithHotels = (cityname, description, hotels, files) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const existingCity = yield citiesModel_1.default.findOne({ cityname });
        if (existingCity) {
            const hotelImagesFiles = (_a = files === null || files === void 0 ? void 0 : files['hotelImages']) !== null && _a !== void 0 ? _a : [];
            const uploadedHotels = yield Promise.all(hotels.map((hotel) => __awaiter(void 0, void 0, void 0, function* () {
                const hotelFolder = `cities/${cityname}/${hotel.hotelname}`;
                const hotelImages = yield Promise.all(hotelImagesFiles.map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file, hotelFolder)));
                // Ensure all required hotel properties are included
                return {
                    hotelname: hotel.hotelname,
                    nightpackage: hotel.nightpackage,
                    price: hotel.price,
                    address: hotel.address,
                    departure: hotel.departure,
                    arrival: hotel.arrival,
                    hotelImages: hotelImages, // Hotel images are returned as an array of strings
                };
            })));
            for (const newHotel of uploadedHotels) {
                const hotelExists = existingCity.hotels.some(hotel => hotel.hotelname === newHotel.hotelname);
                if (!hotelExists) {
                    existingCity.hotels.push(newHotel);
                }
            }
            yield existingCity.save();
            return { data: existingCity, statusCode: 200, message: 'City updated with new hotels.' };
        }
        else {
            if (!files || !files['cityImage'] || files['cityImage'].length === 0) {
                return { data: null, statusCode: 400, message: 'City image is required for new cities.' };
            }
            const cityImageFile = files['cityImage'][0];
            const cityFolder = `cities/${cityname}`;
            const cityImageUrl = yield (0, uploadToCloudinary_1.uploadToCloudinary)(cityImageFile, cityFolder);
            const uploadedHotels = yield Promise.all(hotels.map((hotel) => __awaiter(void 0, void 0, void 0, function* () {
                const hotelFolder = `${cityFolder}/${hotel.hotelname}`;
                const hotelImages = yield Promise.all(files['hotelImages'].map((file) => (0, uploadToCloudinary_1.uploadToCloudinary)(file, hotelFolder)));
                return {
                    hotelname: hotel.hotelname,
                    nightpackage: hotel.nightpackage,
                    price: hotel.price,
                    address: hotel.address,
                    departure: hotel.departure,
                    arrival: hotel.arrival,
                    hotelImages: hotelImages, // Hotel images are returned as an array of strings
                };
            })));
            const newCity = new citiesModel_1.default({
                cityname,
                cityImage: cityImageUrl,
                description,
                hotels: uploadedHotels,
            });
            yield newCity.save();
            return { data: newCity, statusCode: 200, message: 'City and hotels added successfully.' };
        }
    }
    catch (error) {
        console.error('Error in addCityWithHotels:', error);
        return { data: null, statusCode: 500, message: error instanceof Error ? error.message : 'Unknown error' };
    }
});
exports.addCityWithHotels = addCityWithHotels;
// Function to get all cities with hotel details
const getAllCities = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = yield citiesModel_1.default.find().select('cityname cityImage description hotels');
        return { data: cities, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching Cities: ' + error.message);
        }
        else {
            throw new Error('Error fetching Cities: Unknown error');
        }
    }
});
exports.getAllCities = getAllCities;
const getAllHotels = (cityname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield citiesModel_1.default.findOne({ cityname }).select('hotels');
        return { data: hotels, statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching Cities: ' + error.message);
        }
        else {
            throw new Error('Error fetching Cities: Unknown error');
        }
    }
});
exports.getAllHotels = getAllHotels;
// Function to delete a city and associated images
const deleteCity = (cityId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const city = yield citiesModel_1.default.findById(cityId);
        if (!city) {
            return { message: 'City not found', statusCode: 404 };
        }
        // Define folder path for the city
        const cityFolder = `cities/${city.cityname}`;
        // Delete the city image from Cloudinary
        const cityPublicId = (_b = (_a = city.cityImage) === null || _a === void 0 ? void 0 : _a.split('/').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0];
        if (cityPublicId) {
            yield cloudinaryConfig_1.default.v2.uploader.destroy(`${cityFolder}/${cityPublicId}`);
        }
        // Delete each hotel image from Cloudinary
        for (const hotel of city.hotels) {
            const hotelFolder = `${cityFolder}/${hotel.hotelname}`;
            for (const imageUrl of hotel.hotelImages) {
                const hotelPublicId = (_c = imageUrl.split('/').pop()) === null || _c === void 0 ? void 0 : _c.split('.')[0];
                if (hotelPublicId) {
                    yield cloudinaryConfig_1.default.v2.uploader.destroy(`${hotelFolder}/${hotelPublicId}`);
                }
            }
            // After deleting all images in the hotel folder, delete the hotel folder itself
            yield cloudinaryConfig_1.default.v2.api.delete_folder(hotelFolder);
        }
        // Delete the city folder after all hotel folders and images are removed
        yield cloudinaryConfig_1.default.v2.api.delete_folder(cityFolder);
        // Remove city from the database
        yield citiesModel_1.default.findByIdAndDelete(cityId);
        return { message: 'City and its folder deleted successfully', statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting City: ' + error.message);
            // console.log('Error deleting City: Unknown error')
        }
        else {
            throw new Error('Error deleting City: Unknown error');
            // console.log('Error deleting City: Unknown error')
        }
    }
});
exports.deleteCity = deleteCity;
const deleteHotel = (cityId, hotelId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Find the city by ID
        const city = yield citiesModel_1.default.findById(cityId);
        if (!city) {
            return { message: 'City not found', statusCode: 404 };
        }
        // Find the hotel by its ID in the city's hotels array
        const hotelIndex = city.hotels.findIndex(hotel => hotel._id.toString() === hotelId);
        if (hotelIndex === -1) {
            return { message: 'Hotel not found', statusCode: 404 };
        }
        const hotel = city.hotels[hotelIndex];
        // Delete each hotel image from Cloudinary
        const hotelFolder = `cities/${city.cityname}/${hotel.hotelname}`;
        for (const imageUrl of hotel.hotelImages) {
            const hotelPublicId = (_a = imageUrl.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
            if (hotelPublicId) {
                yield cloudinaryConfig_1.default.v2.uploader.destroy(`${hotelFolder}/${hotelPublicId}`);
            }
        }
        // Delete the hotel folder from Cloudinary
        yield cloudinaryConfig_1.default.v2.api.delete_folder(hotelFolder);
        // Remove the hotel from the city's hotels array
        city.hotels.splice(hotelIndex, 1);
        yield city.save(); // Save the changes to the database
        return { message: 'Hotel deleted successfully', statusCode: 200 };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error deleting hotel: ' + error.message);
        }
        else {
            throw new Error('Error deleting hotel: Unknown error');
        }
    }
});
exports.deleteHotel = deleteHotel;
