import express from 'express';
import { addBookmark, removeBookmark, getBookmarks, isBookmarked } from '../controllers/bookmark.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', verifyJWT, addBookmark);
router.post('/remove', verifyJWT, removeBookmark);
router.get('/', verifyJWT, getBookmarks);
router.get('/status/:listingId', verifyJWT, isBookmarked);

export default router;