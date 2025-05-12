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

  priceRange: {
    type: Number,
    required: true
  },
  
  sharingType: {
    type: String,
    required: true
  },
  
  photo: {
    type: String,
    required: true
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // longitudes and latitudes
      required: true
    }
  }
}, { timestamps: true });

listingsSchema.index({ location: '2dsphere' });

const db = await listingsDB();

export const Listings = db.model('Listings', listingsSchema, 'data');
