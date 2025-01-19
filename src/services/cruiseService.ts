

import * as cloudinary from 'cloudinary';
import { CruiseModel, ICruiseDetails } from '../models/cruiseModel';
import { uploadToCloudinary } from '../cloudinary/uploadToCloudinary';


export const addCruiseWithImages = async (
    month: string,
    cruisename: string,
    destinations: string,
    nights: string,
    date: Date,
    files: any
  ) => {
    try {
      const imagesArray = files?.['images'] ?? [];
      const cruiseImageArray = files?.['mainImage'] || [];
  
      if (imagesArray.length === 0 && cruiseImageArray.length === 0) {
        return { data: { message: "No images uploaded" }, statusCode: 400 };
      }
  
      const folderPath = `cruises/${month}/${date}`;
  
      const imageUrls = await Promise.all([
        ...imagesArray.map((file: Express.Multer.File) => uploadToCloudinary(file, folderPath)),
      ]);
  
      const CruiseUrls = await Promise.all([
        ...cruiseImageArray.map((file: Express.Multer.File) => uploadToCloudinary(file, folderPath))
      ]);
  
      const newCruiseDetails: ICruiseDetails = {
        cruisename,
        destinations,
        nights,
        date,
        images: imageUrls,
        mainImage: CruiseUrls,
      } as ICruiseDetails;
  
      let cruise = await CruiseModel.findOne({ month });
      if (!cruise) {
        cruise = new CruiseModel({ month, cruisedetails: [newCruiseDetails] });
      } else {
        cruise.cruisedetails.push(newCruiseDetails);
      }
  
      await cruise.save();
      return { data: cruise, statusCode: 200 };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error adding cruise: ' + error.message);
      } else {
        throw new Error('Error adding cruise: Unknown error');
      }
    }
  };
  

// Service to get cruises by month
export const getCruisesByMonth = async (month: string) => {
    try {
        const cruises = await CruiseModel.findOne({ month }).select('cruisedetails');
        if (!cruises) {
            return { data: [], statusCode: 404, message: 'No cruises found for this month' };
        }
        return { data: cruises, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching cruises: ' + error.message);
        } else {
            throw new Error('Error fetching cruises: Unknown error');
        }
    }
};
export const getCruisesByMonthAndDate = async (month: string, date: string) => {
    try {
        // Find the cruise by month
        const cruise = await CruiseModel.findOne({ month }).select('cruisedetails');
        
        if (!cruise) {
            return { data: [], statusCode: 404, message: 'No cruises found for this month' };
        }

        // Filter the cruise details by the provided date
        const filteredCruises = cruise.cruisedetails.filter(detail => 
            detail.date.toISOString().split('T')[0] === date // Compare date in 'YYYY-MM-DD' format
        );

        if (filteredCruises.length === 0) {
            return { data: [], statusCode: 404, message: 'No cruises found for this date' };
        }

        return { data: filteredCruises, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching cruises: ' + error.message);
        } else {
            throw new Error('Error fetching cruises: Unknown error');
        }
    }
};

// Service to delete all cruises for a specific month
// Service to delete a specific month and its associated cruises
export const deleteCruisesByMonth = async (month: string) => {
    try {
        const cruise = await CruiseModel.findOne({ month });
        if (!cruise) {
            return { data: { message: 'No cruises found for this month' }, statusCode: 404 };
        }

        // Prepare a list of image URLs to delete
        const imagesToDelete = cruise.cruisedetails.flatMap(detail => detail.images);

        // Delete the cruise document from the database
        await CruiseModel.deleteOne({ month });

        // Delete all images in the specified month's folder
        const folderPath = `cruises/${month}`;
        await cloudinary.v2.api.delete_resources_by_prefix(folderPath, { resource_type: 'image' });

        // Optionally, you can delete the folder itself if no resources are left
        await cloudinary.v2.api.delete_folder(folderPath);

        return { data: { message: 'Cruises and images deleted successfully' }, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error deleting cruises: ' + error.message);
        } else {
            throw new Error('Error deleting cruises: Unknown error');
        }
    }
};

export const deleteCruiseByMonthAndDate = async (month: string, date: string) => {
    try {
        // Find the cruise document for the specified month
        const cruise = await CruiseModel.findOne({ month });
        if (!cruise) {
            return { data: { message: 'No cruises found for this month' }, statusCode: 404 };
        }

        // Filter the cruise details to find the index of the cruise to be deleted by date
        const cruiseIndex = cruise.cruisedetails.findIndex(detail => 
            detail.date.toISOString().split('T')[0] === date // Compare date in 'YYYY-MM-DD' format
        );

        if (cruiseIndex === -1) {
            return { data: { message: 'Cruise not found for the specified date' }, statusCode: 404 };
        }

        // Get the images to delete
        const imagesToDelete = cruise.cruisedetails[cruiseIndex].images;

        // Delete all images first
        const deletePromises = imagesToDelete.map(async (imageUrl) => {
            const publicId = imageUrl.split('/').pop()?.split('.')[0]; // Extract public ID from image URL
            console.log(`Attempting to delete image with public ID: ${publicId}`);
            if (publicId) {
                try {
                    const result = await cloudinary.v2.uploader.destroy(publicId);
                    console.log(`Deleted image ${publicId}:`, result);
                } catch (err) {
                    console.error(`Error deleting image ${publicId}:`, err);
                }
            } else {
                console.warn('No public ID found for image URL:', imageUrl);
            }
        });

        // Wait for all image deletion promises to complete
        await Promise.all(deletePromises);

        // Now remove the cruise from the array and save the updated document
        cruise.cruisedetails.splice(cruiseIndex, 1);
        await cruise.save();

        // Now delete the entire folder
        const folderPath = `cruises/${month}/${date}`; // Construct the folder path
        console.log(`Attempting to delete folder: ${folderPath}`);

        try {
            // List all resources in the folder (images, videos, raw files, etc.)
            const resources = await cloudinary.v2.api.resources({
                prefix: folderPath,
                resource_type: 'image',  // Specify resource type (image)
                type: 'upload' // This ensures only uploaded resources are listed
            });

            console.log('Resources in folder:', resources);
            if (resources.resources.length > 0) {
                // Explicitly type 'resource' to match Cloudinary's resource object
                const deleteResourcesPromises = resources.resources.map(async (resource: { public_id: string }) => {
                    const publicId = resource.public_id;
                    try {
                        const result = await cloudinary.v2.uploader.destroy(publicId);
                        console.log(`Deleted resource ${publicId}:`, result);
                    } catch (err) {
                        console.error(`Error deleting resource ${publicId}:`, err);
                    }
                });

                await Promise.all(deleteResourcesPromises);
            }

            // Attempt to delete the folder
            const folderResult = await cloudinary.v2.api.delete_folder(folderPath);
            console.log('Folder delete response:', folderResult);
            if (folderResult.result !== 'ok') {
                console.warn(`Failed to delete folder ${folderPath}. Response:`, folderResult);
            }
        } catch (error) {
            console.error(`Error processing folder deletion for ${folderPath}:`, error);
        }

        return { data: { message: 'Cruise and images deleted successfully' }, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error deleting cruise:', error);
            throw new Error('Error deleting cruise: ' + error.message);
        } else {
            throw new Error('Error deleting cruise: Unknown error');
        }
    }
};