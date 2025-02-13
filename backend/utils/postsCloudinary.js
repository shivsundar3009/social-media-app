export const uploadToCloudinary = async (files, folder) => {
  try {
    if (!files || files.length === 0) {
      throw new Error("No files provided for upload");
    }

    const mediaArray = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder,
            resource_type: "auto",
          });

          return {
            url: result.secure_url,
            mediaType: result.resource_type === "image" ? "image" : "video",
          };
        } catch (uploadError) {
          console.error("Cloudinary upload failed for", file.path, uploadError.message);
          throw new Error(`Cloudinary upload failed: ${uploadError.message}`);
        } finally {
          // Ensure the local file is always deleted
          try {
            await fs.unlink(file.path);
            console.log("Deleted local file:", file.path);
          } catch (unlinkError) {
            console.error("Error deleting local file:", file.path, unlinkError.message);
          }
        }
      })
    );

    return mediaArray;
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error.message);
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};
