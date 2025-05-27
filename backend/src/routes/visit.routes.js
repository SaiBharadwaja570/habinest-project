import express from 'express'
import { createVisit, showVisit } from '../controllers/visit.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/book/:id", createVisit);

router.get("/show", verifyJWT, showVisit)

export default router