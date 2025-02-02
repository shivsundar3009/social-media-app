import multer from 'multer';
import path from 'path';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// })

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Check if the file MIME type is an image
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only image files are allowed!'), false);  // Reject the file
    }
};

const upload = multer({storage , fileFilter});

export default upload;