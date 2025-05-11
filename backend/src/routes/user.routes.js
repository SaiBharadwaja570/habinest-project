import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Note :- All the functionalities will be brought from user controller

// register
router.post('/register',registerUser)

// login
router.post('/login',loginUser)

// logout
router.post('/logout', verifyJWT, logoutUser)

export default router