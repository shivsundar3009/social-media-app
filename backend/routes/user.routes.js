import express from 'express';

import {getAllUsers , createUser , deleteUser , getUserById} from "../controllers/user.controllers.js";

import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.get("/getAllUsers" , authenticateUser ,getAllUsers);

router.get("/getUserById/:userId" , getUserById);

router.post('/createUser', createUser);

router.delete('/deleteUser/:userId', deleteUser);

export default router;