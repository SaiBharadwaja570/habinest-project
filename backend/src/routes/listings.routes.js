import { Router } from "express";
import { getPGs, createPG } from "../controllers/listings.controller.js";
import upload from "../middlewares/multer.middleware.js";
import uploadImageOnCloudinary from "../utils/cloudinary.js";
const router = Router();

router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 }
  ]), 
  createPG                     
);

router.get('/', getPGs)

export default router;