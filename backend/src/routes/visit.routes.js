
import express from 'express'
import Visit from '../models/visit.models.js';
const router = express.Router();

router.post("/book", async (req, res) => {
  try {
    const { name, phone, date, time, message, pgId } = req.body;
    const newVisit = new Visit({ name, phone, date, time, message, pgId });
    await newVisit.save();
    res.status(201).json({ message: "Visit booked successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to book visit" });
  }
});

export default router
