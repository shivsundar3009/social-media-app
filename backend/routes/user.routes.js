import express from 'express';

import {getAllUsers , createUser , deleteUser , getUserById, checkIfUserExists} from "../controllers/user.controllers.js";

import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.get("/getAllUsers" , authenticateUser ,getAllUsers);

router.get("/getUserById/:userId" , getUserById);

router.post('/createUser', createUser);

router.post('/checkIfUserExists', checkIfUserExists);

router.delete('/deleteUser/:userId', deleteUser);

export default router;