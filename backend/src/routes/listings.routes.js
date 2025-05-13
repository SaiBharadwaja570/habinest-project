import { Router } from "express";
import { getPGs, createPG } from "../controllers/listings.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { uploadImage } from "../controllers/listings.controller.js";
const router = Router();

router.post('/', 
    // to handle multiple files we use fields 
    createPG
);

router.post('/upload', upload.single('photo'), uploadImage)

router.get('/', getPGs)

export default router;