import express from 'express';
import upload from '../middlewares/postMulter.middleware.js';

import {getAllUsers , createUser , deleteUser , getUserById, checkIfUserExists, followUser, unFollowUser} from "../controllers/user.controllers.js";

import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.get("/getAllUsers" , authenticateUser ,getAllUsers);

router.post("/followUser/:toBeFollowedUserId" , authenticateUser , followUser);

router.post("/unFollowUser/:toBeUnFollowedUserId" , authenticateUser , unFollowUser);


router.get("/getUserById/:userId" , getUserById);

router.post('/createUser', upload.single('profilePicture'),  createUser);

router.post('/checkIfUserExists', checkIfUserExists);

router.delete('/deleteUser/:userId', deleteUser);

export default router;