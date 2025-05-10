import { Router } from "express";
import { getPGs, createPG } from "../controllers/listings.controller";
import uploadImage from "../utils/cloudinary";
import upload from "../middlewares/multer.middleware";

const router = Router();

router.post('/', 
    // to handle multiple files we use fields 
    upload.array('photo', 1),
    createPG
);

export default router;