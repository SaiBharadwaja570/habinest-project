import { Listings } from "./listings.models.js";
import visitDB from "../db/visitDB.js";
import mongoose from "mongoose";
const visitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  date: {
    type: String,
    required:true
  },
  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listings",
  }
}, {
    timestamps: true
});

const db = await visitDB();
const Visit = db.model('Visit', visitSchema);

export default Visit;