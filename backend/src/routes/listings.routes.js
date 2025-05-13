import { Router } from "express";
import { getPGs, createPG } from "../controllers/listings.controller.js";
import upload from "../middlewares/multer.middleware.js";
import uploadImageOnCloudinary from "../utils/cloudinary.js";
const router = Router();

router.post(
  '/',
  upload.single('photo'),      
  uploadImageOnCloudinary,     
  createPG                     
);

router.get('/', getPGs)

export default router;