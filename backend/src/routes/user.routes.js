import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// Note :- All the functionalities will be brought from user controller

// register
router.post('/register',registerUser)

// login
router.post('/login',loginUser)

export default router