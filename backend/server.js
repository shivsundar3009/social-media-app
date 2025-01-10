import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './db/db.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, social media backend');
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});