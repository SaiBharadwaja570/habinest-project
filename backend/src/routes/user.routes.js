import express from 'express';
import { loginUser, logoutUser, registerUser, getCurrentUser, updateAccountInfo, updatePassword, refreshAccessToken } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Note :- All the functionalities will be brought from user controller

// register
router.post('/register',registerUser)

// login
router.post('/login',loginUser)

// logout
router.post('/logout', verifyJWT, logoutUser)

// update password
router.patch('/updateAccountInfo', verifyJWT, updateAccountInfo);

// update account info
router.patch('/updatePassword', verifyJWT, updateAccountInfo);

// get user
router.get('/', verifyJWT ,getCurrentUser)

// refresh-token
router.post('/refresh-token', refreshAccessToken)

export default router