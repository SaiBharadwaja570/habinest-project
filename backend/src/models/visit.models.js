import { Listings } from "./listings.models";

const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  name: String,
  phone: String,
  date: String,
  time: String,
  message: String,
  pgId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listings",
  }
}, {
    timestamps: true
});

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;