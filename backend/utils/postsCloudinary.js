import cloudinary from "./cloudinaryConfig.js";
import fs from "fs/promises"; // For deleting local files after upload

export const uploadToCloudinary = async (files, folder) => {
  try {
    if (!files || files.length === 0) {
      throw new Error("No files provided for upload");
    }

    // Upload each file and get the URL & mediaType
    const mediaArray = await Promise.all(
      files.map(async (file) => {

        
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder, // Upload to custom folder
            resource_type: "auto", // Auto-detect (image/video)
          });
  
          // Delete the local file after upload
          await fs.unlink(file.path);
  
          // Extract media type from Cloudinary response
          const mediaType = result.resource_type === "image" ? "image" : "video";
  
          return {
            url: result.secure_url, // Cloudinary URL
            mediaType, // image or video
          };
        } catch (error) {

          // Delete the local file in case of error during upload
          try {
            await fs.unlink(file.path);
          } catch (deleteError) {
            console.error("Error deleting file:", file.path, deleteError.message);
          }

          // Re-throw the error with more specific details
          throw new Error(`Error uploading file ${file.path} to Cloudinary: ${error.message}`);
          
        }
      })
    );

    return mediaArray; // Return final array
  } catch (error) {

    console.error("Error uploading files to Cloudinary:", error.message);
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};