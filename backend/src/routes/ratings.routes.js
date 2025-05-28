import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { averageRatings, getReviews, postReview } from "../controllers/ratings.controller.js";

const router = Router();

// Post a new rating/review for a PG (requires authentication)
router.post('/:pgId', verifyJWT, postReview);

// Get all ratings/reviews for a PG (public)
router.get('/:pgId', getReviews);

// Get average rating for a PG (public)
router.get('/average/:pgId', averageRatings);

export default router;
