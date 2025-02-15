import express from 'express';
import { bookMarkPost, createPost, getAllPosts, likePost, unBookMarkPost, unLikePost } from '../controllers/post.controllers.js';
import upload from '../middlewares/postMulter.middleware.js';
import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.post('/createPost' , upload.array('media',10) , createPost);

router.get('/getAllPosts' , getAllPosts);

router.post('/bookMarkPost/:postId' , authenticateUser , bookMarkPost );

router.post('/unBookMarkPost/:postId' , authenticateUser , unBookMarkPost );

router.post('/likePost/:postId' , authenticateUser , likePost );

router.post('/unLikePost/:postId' , authenticateUser , unLikePost );

export default router;

