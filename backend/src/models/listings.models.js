import mongoose from 'mongoose';
import listingsDB from '../db/listingsDB.js';

const listingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  
  address: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },
  
  sharingType: String,
  
  photo: String,
  
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [lng, lat]
  }
  
});

pgSchema.index({ location: '2dsphere' });

export const Listings = listingsDB.model('Listings', listingsSchema, 'data');
