import express from 'express';
import multer from 'multer';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import {  getAllCities, deleteCity, getAllHotels, deleteHotel, addCityWithHotels } from '../services/cityService';
import cityModel from '../models/citiesModel';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/', upload.fields([{ name: 'cityImage', maxCount: 1 }, { name: 'hotelImages', maxCount: 10 }]), async (req, res) => {
    const { cityname, description, hotels } = req.body;
    // const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const files = req.files as {
        cityImage?: Express.Multer.File[];
        hotelImages?: Express.Multer.File[];
      } | undefined;
      
    const result = await addCityWithHotels(cityname, description, hotels, files);
    return res.status(result.statusCode).json({ data: result.data, message: result.message });
});


// GET route to retrieve all cities
router.get('/', async (req, res) => {
    try {
        const response = await getAllCities();
        return res.status(response.statusCode).json(response.data);
    } catch (error: unknown) {
        console.error('Error in GET /cities:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

router.get('/:cityname/hotels', async (req, res) => {
    try {
        const {cityname}= req.params;
        const response = await getAllHotels(cityname);
        return res.status(response.statusCode).json(response.data);
    } catch (error: unknown) {
        console.error('Error in GET /cities:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// DELETE route to delete a city and associated images
router.delete('/:cityId', async (req, res) => {
    try {
        const { cityId } = req.params;

        const response = await deleteCity(cityId);
        return res.status(response.statusCode).json({ message: response.message });
    } catch (error: unknown) {
        console.error('Error in DELETE /cities/:cityId:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

router.delete('/:cityId/hotels/:hotelId', async (req, res) => {
    const { cityId, hotelId } = req.params;

    try {
        const result = await deleteHotel(cityId, hotelId);
        res.status(result.statusCode).json({ message: result.message });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});
export default router;

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