// uploadToCloudinary.ts
import cloudinary from './cloudinaryConfig';  // Adjust path as necessary
import { Readable } from 'stream';

// Helper function to upload images to Cloudinary
export const uploadToCloudinary = (file: Express.Multer.File, folderPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                folder: folderPath,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    reject(new Error(`Image upload failed for ${file.originalname}: ${error.message}`));
                } else {
                    resolve(result?.secure_url ?? '');
                }
            }
        );

        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null);
        bufferStream.pipe(uploadStream);
    });
};
