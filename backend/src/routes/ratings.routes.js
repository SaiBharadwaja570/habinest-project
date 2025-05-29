import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { averageRatings, getReviews, postReview } from "../controllers/ratings.controller.js";

const router = Router();

// Post a new rating/review for a PG (requires authentication)
router.post('/:id', verifyJWT, postReview);

// Get all ratings/reviews for a PG (public)
router.get('/:id', getReviews);

// Get average rating for a PG (public)
router.get('/average/:id', averageRatings);

export default router;
