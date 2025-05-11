import { Router } from "express";
import { getPGs, createPG } from "../controllers/listings.controller.js";
import uploadImage from "../utils/cloudinary.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/', 
    // to handle multiple files we use fields 
    upload.fields([
        { name: 'photo', maxCount: 1 }
      ]),
    createPG
);

router.get('/', getPGs)

export default router;