
import cloudinary from '../cloudinary/cloudinaryConfig';
import { uploadToCloudinary } from '../cloudinary/uploadToCloudinary';
import cityModel, { ICity, IHotel } from '../models/citiesModel';

export const addCityWithHotels = async (cityname: string, description: string, hotels: any[], files: any) => {
    try {
        const existingCity = await cityModel.findOne({ cityname });

        if (existingCity) {
            const hotelImagesFiles = files?.['hotelImages'] ?? [];
            const uploadedHotels: IHotel[] = await Promise.all(
                hotels.map(async (hotel: { hotelname: string; nightpackage: string; price: string; address: string; departure: string; arrival: string }) => {
                    const hotelFolder = `cities/${cityname}/${hotel.hotelname}`;
                    const hotelImages = await Promise.all(
                        hotelImagesFiles.map((file: Express.Multer.File) => uploadToCloudinary(file, hotelFolder))
                    );
                    // Ensure all required hotel properties are included
                    return {
                        hotelname: hotel.hotelname,
                        nightpackage: hotel.nightpackage,
                        price: hotel.price,
                        address: hotel.address,
                        departure: hotel.departure,
                        arrival: hotel.arrival,
                        hotelImages: hotelImages,  // Hotel images are returned as an array of strings
                    } as IHotel;
                })
            );

            for (const newHotel of uploadedHotels) {
                const hotelExists = existingCity.hotels.some(hotel => hotel.hotelname === newHotel.hotelname);
                if (!hotelExists) {
                    existingCity.hotels.push(newHotel);
                }
            }
            await existingCity.save();
            return { data: existingCity, statusCode: 200, message: 'City updated with new hotels.' };
        } else {
            if (!files || !files['cityImage'] || files['cityImage'].length === 0) {
                return { data: null, statusCode: 400, message: 'City image is required for new cities.' };
            }
            const cityImageFile = files['cityImage'][0];
            const cityFolder = `cities/${cityname}`;
            const cityImageUrl = await uploadToCloudinary(cityImageFile, cityFolder);
            const uploadedHotels: IHotel[] = await Promise.all(
                hotels.map(async (hotel: { hotelname: string; nightpackage: string; price: string; address: string; departure: string; arrival: string }) => {
                    const hotelFolder = `${cityFolder}/${hotel.hotelname}`;
                    const hotelImages = await Promise.all(
                        files['hotelImages'].map((file: Express.Multer.File) => uploadToCloudinary(file, hotelFolder))
                    );

                    return {
                        hotelname: hotel.hotelname,
                        nightpackage: hotel.nightpackage,
                        price: hotel.price,
                        address: hotel.address,
                        departure: hotel.departure,
                        arrival: hotel.arrival,
                        hotelImages: hotelImages,  // Hotel images are returned as an array of strings
                    } as IHotel;
                })
            );

            const newCity: ICity = new cityModel({
                cityname,
                cityImage: cityImageUrl,
                description,
                hotels: uploadedHotels,
            });

            await newCity.save();
            return { data: newCity, statusCode: 200, message: 'City and hotels added successfully.' };
        }
    } catch (error) {
        console.error('Error in addCityWithHotels:', error);
        return { data: null, statusCode: 500, message: error instanceof Error ? error.message : 'Unknown error' };
    }
};



// Function to get all cities with hotel details
export const getAllCities = async () => {
    try {
        const cities = await cityModel.find().select('cityname cityImage description hotels');
        return { data: cities, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching Cities: ' + error.message);
        } else {
            throw new Error('Error fetching Cities: Unknown error');
        }
    }
};
export const getAllHotels = async (cityname:string) => {
    try {
        const hotels = await cityModel.findOne({cityname}).select('hotels');
        return { data: hotels, statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching Cities: ' + error.message);
        } else {
            throw new Error('Error fetching Cities: Unknown error');
        }
    }
};

// Function to delete a city and associated images
export const deleteCity = async (cityId: string) => {
    try {
        const city = await cityModel.findById(cityId);

        if (!city) {
            return { message: 'City not found', statusCode: 404 };
        }

        // Define folder path for the city
        const cityFolder = `cities/${city.cityname}`;
        
        // Delete the city image from Cloudinary
        const cityPublicId = city.cityImage?.split('/').pop()?.split('.')[0]; 
        if (cityPublicId) {
            await cloudinary.v2.uploader.destroy(`${cityFolder}/${cityPublicId}`);
        }

        // Delete each hotel image from Cloudinary
        for (const hotel of city.hotels) {
            const hotelFolder = `${cityFolder}/${hotel.hotelname}`;
            for (const imageUrl of hotel.hotelImages) {
                const hotelPublicId = imageUrl.split('/').pop()?.split('.')[0];
                if (hotelPublicId) {
                    await cloudinary.v2.uploader.destroy(`${hotelFolder}/${hotelPublicId}`);
                }
            }
            // After deleting all images in the hotel folder, delete the hotel folder itself
            await cloudinary.v2.api.delete_folder(hotelFolder);
        }

        // Delete the city folder after all hotel folders and images are removed
        await cloudinary.v2.api.delete_folder(cityFolder);

        // Remove city from the database
        await cityModel.findByIdAndDelete(cityId);

        return { message: 'City and its folder deleted successfully', statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error deleting City: ' + error.message);
            // console.log('Error deleting City: Unknown error')

        } else {
            throw new Error('Error deleting City: Unknown error');
            // console.log('Error deleting City: Unknown error')
        }
    }
};


export const deleteHotel = async (cityId: string, hotelId: string) => {
    try {
        // Find the city by ID
        const city = await cityModel.findById(cityId);
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
            const hotelPublicId = imageUrl.split('/').pop()?.split('.')[0];
            if (hotelPublicId) {
                await cloudinary.v2.uploader.destroy(`${hotelFolder}/${hotelPublicId}`);
            }
        }

        // Delete the hotel folder from Cloudinary
        await cloudinary.v2.api.delete_folder(hotelFolder);

        // Remove the hotel from the city's hotels array
        city.hotels.splice(hotelIndex, 1);
        await city.save(); // Save the changes to the database

        return { message: 'Hotel deleted successfully', statusCode: 200 };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error deleting hotel: ' + error.message);
        } else {
            throw new Error('Error deleting hotel: Unknown error');
        }
    }
};

