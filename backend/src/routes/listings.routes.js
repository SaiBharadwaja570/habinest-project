import { Router } from "express";
import { getPGs, createPG, getSinglePG } from "../controllers/listings.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 }
  ]), 
  createPG                     
);

router.get('/', getPGs)

router.get('/:id', getSinglePG)

export default router;