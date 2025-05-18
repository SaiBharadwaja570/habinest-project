import User from '../models/user.models.js';
import { Listings } from '../models/listings.models.js';

export const addBookmark = async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user._id; // assuming user is authenticated

  try {
    const listing = await Listings.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: listingId } }, // avoids duplicates
      { new: true }
    ).populate('bookmarks');

    return res.status(200).json({ message: 'Bookmarked successfully', bookmarks: user.bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const removeBookmark = async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: listingId } },
      { new: true }
    ).populate('bookmarks');

    return res.status(200).json({ message: 'Bookmark removed', bookmarks: user.bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getBookmarks = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate('bookmarks');
    return res.status(200).json({ bookmarks: user.bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
