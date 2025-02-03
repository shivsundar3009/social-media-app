import { v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// // Utility function to upload image to Cloudinary
// const uploadImage = async (file) => {
//     try {

//         console.log('file from cloudinary upload:' , file);
//         // Upload the image to Cloudinary
//         const result = await cloudinary.uploader.upload(file.path, {

//             folder: 'user_profiles', // Optional: Upload to a specific folder
//             use_filename: true, // Use the original filename
//             unique_filename: true, // Ensure unique names
//         });

//         console.log(result);

//         // Check if the upload was successful and then delete the file from the local system
//         if (result && result.secure_url) {
//             // Successfully uploaded, now delete the local file
//             fs.unlink(file.path, (err) => {
//                 if (err) {
//                     console.error('Error deleting file:', err);
//                 } else {
//                     console.log(`File ${file.path} deleted successfully`);
//                 }
//             });

//             return result; // Return the Cloudinary upload result containing the URL
//         } else {
//             throw new Error('Cloudinary upload failed');
//         }
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error.message);
//         throw new Error('Error uploading image to Cloudinary');
//     }
// };

// export default uploadImage;

// import { v2 as cloudinary } from 'cloudinary';

// // Import dotenv for environment variables

// import dotenv from 'dotenv';
// dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // Function to upload to Cloudinary with Promise
// const uploadToCloudinary = (file) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//             { resource_type: 'auto' },  // Auto-detect file type
//             (error, result) => {
//                 if (error) {
//                     console.log('Error uploading to Cloudinary:', error);  // Log error if there's an error
//                     reject(error);  // Reject the promise if there's an error
//                 } else {
//                     resolve(result);  // Resolve with the complete result
//                 }
//             }
//         ).end(file.buffer);  // Upload the file buffer to Cloudinary
//     });
// };

// export default uploadToCloudinary;
