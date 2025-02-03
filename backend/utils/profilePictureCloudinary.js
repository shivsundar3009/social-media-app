import cloudinary from "./cloudinaryConfig.js";
import fs from 'fs';

// Utility function to upload image to Cloudinary
const uploadImage = async (file , folder) => {
    try {

        console.log('file from cloudinary upload:' , file);
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {

            folder ,// Upload to a specific folder
            use_filename: true, // Use the original filename
        });

        console.log('cloudyResult' , result);

        // Check if the upload was successful and then delete the file from the local system
        if (result && result.secure_url) {
            // Successfully uploaded, now delete the local file
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log(`File ${file.path} deleted successfully`);
                }
            });

            return result; // Return the Cloudinary upload result containing the URL
        } else {
            throw new Error('Cloudinary upload failed');
        }
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        throw new Error('Error uploading image to Cloudinary');
    }
};

export default uploadImage;