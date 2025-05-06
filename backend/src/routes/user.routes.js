import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// Note :- All the functionalities will be brought from user controller

// register
router.route('/register').post(registerUser)

// login
router.route('/login').post(loginUser)

export default router