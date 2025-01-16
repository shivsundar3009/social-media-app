
import express from 'express';

import { userLogin, userLogout } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/userLogin', userLogin);

router.post('/userLogout', userLogout);

export default router;