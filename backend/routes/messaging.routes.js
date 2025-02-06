import express from 'express';

import { getAllConversations, getMessages , getMutualFollowers , sayHi , sendMessage} from '../controllers/messaging.controllers.js';
import { authenticateUser } from '../utils/authenticateUser.js';

const router = express.Router();

// router.get("/getMutualFollowers" , authenticateUser , getMutualFollowers);

router.post("/sayHi/:mutualFollowerId" , authenticateUser , getMutualFollowers , sayHi);

router.post("/getAllConversations" , authenticateUser , getMutualFollowers , getAllConversations);

router.post("/sendMessage/:receiversId" , authenticateUser , sendMessage);

router.get("/getMessages/:receiversId" , authenticateUser , getMessages);

export default router;