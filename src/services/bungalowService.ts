
// import bungalowModel from "../models/bungalowModel";
// import * as cloudinary from "cloudinary";

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


import bungalowModel from "../models/bungalowModel";
import * as cloudinary from "cloudinary";

interface AddBungalowParams {
    location: string;
    capacity: string;
    bungalowImages: string[]; // Expecting an array of image URLs
}

// Configure Cloudinary (Make sure it's configured)
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const AddBungalow = async ({ location, capacity, bungalowImages }: AddBungalowParams) => {
    try {
        console.log("Adding bungalow with location:", location, "capacity:", capacity, "images:", bungalowImages);
        
        const newBungalow = new bungalowModel({
            location,
            capacity,
            bungalowImages // Save Cloudinary URLs to the database
        });
        await newBungalow.save();
        return { data: newBungalow, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error adding Bungalow: ' + error.message);
        } else {
            throw new Error('Error adding Bungalow: Unknown error');
        }
    }
};

export const getAllBungalows = async () => {
    try {
        const bungalows = await bungalowModel.find().select('location capacity bungalowImages');
        return { data: bungalows, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching Bungalows: ' + error.message);
        } else {
            throw new Error('Error fetching Bungalows: Unknown error');
        }
    }
};

// Function to delete a bungalow
export const deleteBungalow = async (bungalowId: string) => {
    try {
        // Find the bungalow by ID
        const bungalow = await bungalowModel.findById(bungalowId);

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

        await Promise.all(
            publicIds.map(publicId =>
                cloudinary.v2.uploader.destroy(`bungalows/${bungalow.location}/${publicId}`)
            )
        );

        // Remove bungalow from the database
        await bungalowModel.findByIdAndDelete(bungalowId);

        return { message: 'Bungalow deleted successfully', statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error deleting Bungalow: ' + error.message);
        } else {
            throw new Error('Error deleting Bungalow: Unknown error');
        }
    }
};
