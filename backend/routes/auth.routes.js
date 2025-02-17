
import express from 'express';

import { updateOnRefresh, userLogin, userLogout } from '../controllers/auth.controllers.js';
import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

router.post('/userLogin', userLogin);

router.post('/userLogout', userLogout);

router.get('/updateOnRefresh', authenticateUser,  updateOnRefresh);

export default router;