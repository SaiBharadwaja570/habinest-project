import express from 'express';
import { 
  loginUser, 
  logoutUser, 
  registerUser, 
  getCurrentUser, 
  updateAccountInfo, 
  updatePassword, 
  refreshAccessToken 
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// register
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

// logout
router.post('/logout', verifyJWT, logoutUser);

// update account info
router.patch('/updateAccountInfo', verifyJWT, updateAccountInfo);

// update password
router.patch('/updatePassword', verifyJWT, updatePassword);


// get current user
router.get('/', verifyJWT, getCurrentUser);

// refresh token
router.post('/refresh-token', refreshAccessToken);

export default router;
