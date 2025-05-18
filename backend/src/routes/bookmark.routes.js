import express from 'express';
import { addBookmark, removeBookmark, getBookmarks } from '../controllers/bookmark.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', verifyJWT, addBookmark);
router.post('/remove', verifyJWT, removeBookmark);
router.get('/', verifyJWT, getBookmarks);

export default router;
