import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";
import { getPGs, createPG, getSinglePG, getOwnerPGs, deletePg } from "../controllers/listings.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { isOwner } from "../middlewares/owner.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post(
  '/',
  verifyJWT,
  isOwner,
  upload.fields([
    { name: 'photo', maxCount: 1 }
  ]), 
  createPG                     
);

router.get('/owner-pgs', verifyJWT, isOwner, getOwnerPGs)

router.get('/', getPGs)

router.get('/:id', getSinglePG)

router.delete('/:id', verifyJWT, deletePg)

export default router;