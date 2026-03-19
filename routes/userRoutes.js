import express from 'express';
import { getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET USER || GET
router.get('/getUser', requireSignIn, getUserController);

//UPDATE PROFILE || PUT
router.put('/updateUser', requireSignIn, updateUserController)

//UPDATE PASSWORD
router.post("/updatePassword", requireSignIn, updatePasswordController)

//RESET PASSWORD
router.post('/resetPassword', requireSignIn, resetPasswordController)

export default router;