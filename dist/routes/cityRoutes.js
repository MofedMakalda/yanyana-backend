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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cityService_1 = require("../services/cityService");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/', upload.fields([{ name: 'cityImage', maxCount: 1 }, { name: 'hotelImages', maxCount: 10 }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityname, description, hotels } = req.body;
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const files = req.files;
    const result = yield (0, cityService_1.addCityWithHotels)(cityname, description, hotels, files);
    return res.status(result.statusCode).json({ data: result.data, message: result.message });
}));
// GET route to retrieve all cities
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, cityService_1.getAllCities)();
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error('Error in GET /cities:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
router.get('/:cityname/hotels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cityname } = req.params;
        const response = yield (0, cityService_1.getAllHotels)(cityname);
        return res.status(response.statusCode).json(response.data);
    }
    catch (error) {
        console.error('Error in GET /cities:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
// DELETE route to delete a city and associated images
router.delete('/:cityId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cityId } = req.params;
        const response = yield (0, cityService_1.deleteCity)(cityId);
        return res.status(response.statusCode).json({ message: response.message });
    }
    catch (error) {
        console.error('Error in DELETE /cities/:cityId:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
}));
router.delete('/:cityId/hotels/:hotelId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cityId, hotelId } = req.params;
    try {
        const result = yield (0, cityService_1.deleteHotel)(cityId, hotelId);
        res.status(result.statusCode).json({ message: result.message });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}));
exports.default = router;
//-------------------------------------------------------------------
// import express from 'express';
// import multer from 'multer';
// import * as cloudinary from 'cloudinary';
// import { Readable } from 'stream';
// import {  getAllCities, deleteCity, getAllHotels, deleteHotel, addCityWithHotels } from '../services/cityService';
// import cityModel from '../models/citiesModel';
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });
// router.post('/', upload.fields([{ name: 'cityImage', maxCount: 1 }, { name: 'hotelImages', maxCount: 10 }]), async (req, res) => {
//     const { cityname, description, hotels } = req.body;
//     // const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
//     const files = req.files as {
//         cityImage?: Express.Multer.File[];
//         hotelImages?: Express.Multer.File[];
//       } | undefined;
//     const result = await addCityWithHotels(cityname, description, hotels, files);
//     return res.status(result.statusCode).json({ data: result.data, message: result.message });
// });
// // GET route to retrieve all cities
// router.get('/', async (req, res) => {
//     try {
//         const response = await getAllCities();
//         return res.status(response.statusCode).json(response.data);
//     } catch (error: unknown) {
//         console.error('Error in GET /cities:', error);
//         return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
//     }
// });
// router.get('/:cityname/hotels', async (req, res) => {
//     try {
//         const {cityname}= req.params;
//         const response = await getAllHotels(cityname);
//         return res.status(response.statusCode).json(response.data);
//     } catch (error: unknown) {
//         console.error('Error in GET /cities:', error);
//         return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
//     }
// });
// // DELETE route to delete a city and associated images
// router.delete('/:cityId', async (req, res) => {
//     try {
//         const { cityId } = req.params;
//         const response = await deleteCity(cityId);
//         return res.status(response.statusCode).json({ message: response.message });
//     } catch (error: unknown) {
//         console.error('Error in DELETE /cities/:cityId:', error);
//         return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
//     }
// });
// router.delete('/:cityId/hotels/:hotelId', async (req, res) => {
//     const { cityId, hotelId } = req.params;
//     try {
//         const response = await deleteHotel(cityId, hotelId);
//         return res.status(response.statusCode).json({ message: response.message });
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// });
// export default router;
