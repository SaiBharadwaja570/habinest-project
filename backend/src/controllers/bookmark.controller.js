import User from '../models/user.models.js';
import { Listings } from '../models/listings.models.js';

export const addBookmark = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bookmarks = await Listings.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

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

    // Manually fetch updated bookmarks using the other DB connection
    const bookmarks = await Listings.find({ _id: { $in: user.bookmarks } });

    return res.status(200).json({ message: 'Bookmark removed', bookmarks });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


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
