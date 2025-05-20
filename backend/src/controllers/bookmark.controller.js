import User from '../models/user.models.js';
import { Listings } from '../models/listings.models.js';

// Add a new bookmark listingId from req.body
export const addBookmark = async (req, res) => {
  const userId = req.user._id;
  const { listingId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Avoid duplicate bookmarks
    if (user.bookmarks.includes(listingId)) {
      return res.status(400).json({ message: 'Listing already bookmarked' });
    }

    user.bookmarks.push(listingId);
    await user.save();

    // Manually fetch updated bookmarks using listing IDs
    const bookmarks = await Listings.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ message: 'Bookmark added', bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Remove a bookmark
export const removeBookmark = async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user._id;

  try {
    // Remove the bookmark ID from user's bookmarks array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: listingId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Manually fetch updated bookmarks using listing IDs
    const bookmarks = await Listings.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ message: 'Bookmark removed', bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all bookmarks for user
export const getBookmarks = async (req, res) => {
  const userId = req.user._id;

  try {
    // Get user and their bookmark IDs
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch listing details manually using listing IDs
    const bookmarks = await Listings.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const isBookmarked = async (req, res) => {
  const userId = req.user._id;
  const { listingId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isBookmarked = user.bookmarks.includes(listingId);
    return res.status(200).json({ isBookmarked });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};