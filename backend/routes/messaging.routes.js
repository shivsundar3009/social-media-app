import express from 'express';

import { getMutualFollowers } from '../controllers/messaging.controllers.js';
import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.get('/getMutualFollowers' ,authenticateUser , getMutualFollowers)

export default router;