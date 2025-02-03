import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './db/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}


const app = express();

dotenv.config();

console.log(" env cloundinary server file",
  process.env.CLOUDINARY_API_KEY ,
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_SECRET,

);

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

connectDB();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, social media backend');
});

import userRoutes from './routes/user.routes.js';
app.use('/api/v1/user' , userRoutes)

import authRoutes from './routes/auth.routes.js';
app.use('/api/v1/auth' , authRoutes)

import postRoutes from './routes/post.routes.js';
app.use('/api/v1/post' , postRoutes)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});