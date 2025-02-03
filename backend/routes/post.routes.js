import express from 'express';
import { createPost, getAllPosts } from '../controllers/post.controllers.js';
import upload from '../middlewares/postMulter.middleware.js';

const router = express.Router();

router.post('/createPost' , upload.array('media',10) , createPost)

router.get('/getAllPosts' , getAllPosts)

export default router;

