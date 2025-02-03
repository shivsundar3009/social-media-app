import multer from "multer";

// Define storage (temporary before uploading to Cloudinary)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// Updated file filter: Allows files that start with "image/" or "video/"
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed!"), false);
  }
};

// Set upload limits (optional)
const limits = { fileSize: 50 * 1024 * 1024 }; // 50MB max

// Initialize multer
const upload = multer({ storage, fileFilter, limits });

export default upload;
