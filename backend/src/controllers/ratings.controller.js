import { Listings as PG } from "../models/listings.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const postReview = asyncHandler(async (req, res) => {
  try {
    const listingId = req.params.id;
    const { rating, comment } = req.body;
    const user = req.user.email; // or req.user.id or req.user.name depending on auth

    const listing = await PG.findById(listingId);
    if (!listing) return res.status(404).json({ message: "PG not found" });

    // Check if the user already reviewed
    const existingIndex = listing.ratings.findIndex(r => r.user === user);

    if (existingIndex !== -1) {
      listing.ratings[existingIndex].rating = rating;
      listing.ratings[existingIndex].comment = comment;
      listing.ratings[existingIndex].createdAt = new Date();
    } else {
      // Add new review
      listing.ratings.push({ user, rating, comment });
    }

    await listing.save();
    res.status(200).json({ message: "Review saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

const getReviews = asyncHandler(async (req, res) => {
  try {
    const listing = await PG.findById(req.params.id).select("ratings");
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.status(200).json(listing.ratings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

const averageRatings = asyncHandler(async (req, res) => {
  try {
    const listing = await PG.findById(req.params.id).select("ratings");
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const ratings = listing.ratings;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = ratings.length ? total / ratings.length : 0;
    res.json({ avgRating: avg.toFixed(1), count: ratings.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
})

export {
    postReview,
    getReviews,
    averageRatings
}