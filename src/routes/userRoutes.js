import express from 'express'
import {userRegister, userLogin,userInfo} from '../controllers/userController.js'
import { validateToken } from '../middleware/validateToken.js';
const router=express.Router();


router.post('/register',userRegister); 
router.post('/login',userLogin);
router.get('/current',validateToken,userInfo);

export default router;