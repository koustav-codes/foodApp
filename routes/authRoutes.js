import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router = express.Router()

//Routes
//REGISTER || POST METHOD
router.post('/register', registerController);

// LOGIN || POST METHOD

router.post('/login',loginController);


export default router