
// import express from 'express';
// import multer from 'multer';
// import * as cloudinary from 'cloudinary';
// import { Readable } from 'stream';
// import { AddBungalow, getAllBungalows } from '../services/bungalowService';

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

import express from 'express';
import multer from 'multer';
import * as cloudinary from 'cloudinary';
import { Readable } from 'stream';
import { AddBungalow, getAllBungalows, deleteBungalow } from '../services/bungalowService';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store images in memory

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload images to Cloudinary
const uploadToCloudinary = (file: Express.Multer.File, bungalowFolder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                folder: `bungalows/${bungalowFolder}`, // Set the folder path dynamically
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    reject(new Error(`Image upload failed for ${file.originalname}: ${error.message}`));
                } else {
                    resolve(result?.secure_url ?? ''); // Return the secure URL of the uploaded image
                }
            }
        );
        // Convert buffer to readable stream and pipe it to Cloudinary upload stream
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};

// POST route to add a bungalow
router.post('/', upload.array('images'), async (req, res) => {
    try {
        const { location, capacity } = req.body;
        const bungalowImages: Express.Multer.File[] = req.files as Express.Multer.File[];

        if (!bungalowImages || !Array.isArray(bungalowImages) || bungalowImages.length === 0) {
            return res.status(400).json({ message: 'No images uploaded or invalid file format.' });
        }

        // Use the bungalow's location as the unique folder name
        const bungalowFolder = location;

        // Upload images to Cloudinary and store them in the corresponding folder
        const uploadedImageUrls = await Promise.all(bungalowImages.map(file => uploadToCloudinary(file, bungalowFolder)));

        // Pass the uploaded image URLs to your service
        const response = await AddBungalow({ location, capacity, bungalowImages: uploadedImageUrls });
        return res.status(response.statusCode).json(response.data);
    } catch (error: unknown) {
        console.error('Error in POST /bungalows:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// GET route to fetch bungalows
router.get('/', async (req, res) => {
    try {
        const response = await getAllBungalows(); // Use the getAllBungalows function
        return res.status(response.statusCode).json(response.data);
    } catch (error) {
        console.error('Error fetching bungalows:', error);
        return res.status(500).json({ message: 'Error fetching bungalows' });
    }
});

// DELETE route to remove a bungalow
router.delete('/:id', async (req, res) => {
    try {
        const bungalowId = req.params.id;
        const response = await deleteBungalow(bungalowId); // Call the delete service

        return res.status(response.statusCode).json(response.message);
    } catch (error) {
        console.error('Error deleting bungalow:', error);
        return res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;

