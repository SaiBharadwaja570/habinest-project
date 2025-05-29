import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Map from '../components/Map'
import { BookmarkPlus, BookmarkCheck, ArrowLeft, Share2, Copy, X, Calendar, Star, MessageSquare } from 'lucide-react'
import '../App.css'

const SinglePg = () => {
    const { id } = useParams()
    const [pgData, setPgData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showReviewModal, setShowReviewModal] = useState(false)
    const [showLoginPrompt, setShowLoginPrompt] = useState(false)
    const [loginPromptMessage, setLoginPromptMessage] = useState('')
    const [copySuccess, setCopySuccess] = useState(false)
    const [bookingSubmitting, setBookingSubmitting] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        date: ''
    })

    // Reviews state
    const [reviews, setReviews] = useState([])
    const [averageRating, setAverageRating] = useState({ avgRating: 0, count: 0 })
    const [reviewsLoading, setReviewsLoading] = useState(false)
    const [reviewSubmitting, setReviewSubmitting] = useState(false)
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

    // Helper function to handle authentication errors
    const handleAuthError = (actionName) => {
        setLoginPromptMessage(`Please login to ${actionName}`)
        setShowLoginPrompt(true)
    }

    useEffect(() => {
        const fetchPgData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_PG}/${id}`)
                setPgData(response.data.data)

                // Try to fetch bookmark status (only if user is logged in)
                try {
                    const bookmarkStatus = await axios.get(`${import.meta.env.VITE_BACKEND_BOOKMARKS}/status/${id}`, {
                        withCredentials: true
                    })
                    setIsBookmarked(bookmarkStatus.data.isBookmarked)
                } catch (bookmarkErr) {
                    // User might not be logged in, that's okay for viewing
                    if (bookmarkErr.response?.status !== 401) {
                        console.error("Error fetching bookmark status:", bookmarkErr)
                    }
                }
                
                // Fetch reviews and average rating
                await fetchReviews()
                await fetchAverageRating()
            } catch (err) {
                console.error("ERROR", err)
                setError("Failed to load PG details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPgData()
    }, [id])

    const fetchReviews = async () => {
        try {
            setReviewsLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_RATINGS}/${id}`)
            setReviews(response.data)
        } catch (err) {
            console.error("Error fetching reviews:", err)
        } finally {
            setReviewsLoading(false)
        }
    }

    const fetchAverageRating = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_RATINGS}/average/${id}`)
            setAverageRating(response.data)
        } catch (err) {
            console.error("Error fetching average rating:", err)
        }
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            setReviewSubmitting(true)
            await axios.post(
                `${import.meta.env.VITE_BACKEND_RATINGS}/${id}`,
                newReview,
                { withCredentials: true }
            )
            
            alert("Review submitted successfully!")
            setShowReviewModal(false)
            setNewReview({ rating: 5, comment: '' })
            
            // Refresh reviews and average rating
            await fetchReviews()
            await fetchAverageRating()
        } catch (err) {
            console.error("Review submission error:", err)
            if (err.response?.status === 401) {
                handleAuthError("submit a review")
            } else {
                alert("Failed to submit review. Please try again.")
            }
        } finally {
            setReviewSubmitting(false)
        }
    }

    const handleBookmark = async () => {
        try {
            setBookmarkLoading(true)
            await axios.post(`${import.meta.env.VITE_BACKEND_BOOKMARKS}/add`, {
                listingId: id
            }, {
                withCredentials: true
            })
            setIsBookmarked(true)
        } catch (err) {
            console.error("Bookmark error:", err)
            if (err.response?.status === 401) {
                handleAuthError("bookmark this PG")
            } else if (err.response?.status === 400 && err.response?.data?.message === 'Listing already bookmarked') {
                setIsBookmarked(true)
            } else {
                alert("Failed to bookmark. Please try again.")
            }
        } finally {
            setBookmarkLoading(false)
        }
    }

    const handleUnbookmark = async () => {
        try {
            setBookmarkLoading(true)
            await axios.post(`${import.meta.env.VITE_BACKEND_BOOKMARKS}/remove`, {
                listingId: id
            }, {
                withCredentials: true
            })
            setIsBookmarked(false)
        } catch (err) {
            console.error("Unbookmark error:", err)
            if (err.response?.status === 401) {
                handleAuthError("remove bookmark")
            } else {
                alert("Failed to remove bookmark. Please try again.")
            }
        } finally {
            setBookmarkLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBookingDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleReviewInputChange = (e) => {
        const { name, value } = e.target
        setNewReview(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }))
    }

    const handleBookingSubmit = async (e) => {
        e.preventDefault()
        try {
            setBookingSubmitting(true)
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_BACKEND_VISITS}/book/${id}`,
                data: bookingDetails,
                withCredentials: true
            })
            console.log("Booking submitted:", bookingDetails)
            
            alert("Visit booked successfully!")
            setShowBookingModal(false)
            setBookingDetails({ name: '', email: '', phone: '', date: '' })
        } catch (err) {
            console.error("Booking error:", err)
            if (err.response?.status === 401) {
                handleAuthError("book a visit")
            } else {
                alert("Failed to book visit. Please try again.")
            }
        } finally {
            setBookingSubmitting(false)
        }
    }

    const handleShare = () => {
        setShowShareModal(true)
        setCopySuccess(false)
    }

    const handleBookVisit = () => {
        setShowBookingModal(true)
    }

    const handleWriteReview = () => {
        setShowReviewModal(true)
    }

    const handleCopyUrl = async () => {
        const currentUrl = window.location.href
        try {
            await navigator.clipboard.writeText(currentUrl)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
            console.error('Failed to copy URL:', err)
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = currentUrl
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        }
    }

    const closeShareModal = () => {
        setShowShareModal(false)
        setCopySuccess(false)
    }

    const closeBookingModal = () => {
        setShowBookingModal(false)
        setBookingDetails({ name: '', email: '', phone: '', date: '' })
    }

    const closeReviewModal = () => {
        setShowReviewModal(false)
        setNewReview({ rating: 5, comment: '' })
    }

    const closeLoginPrompt = () => {
        setShowLoginPrompt(false)
        setLoginPromptMessage('')
    }

    const renderStars = (rating, interactive = false, onRatingChange = null) => {
        return (
            <div className={`stars-container ${interactive ? 'interactive' : ''}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        className={`star ${star <= rating ? 'filled' : ''}`}
                        onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    />
                ))}
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <h2>Loading PG details...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>{error}</h2>
                <Link to="/filter" className="back-button">
                    <ArrowLeft size={16} />
                    Back to Search
                </Link>
            </div>
        )
    }

    return (
        <div className='single-pg-container'>
            <div className="pg-header">
                <Link to="/filter" className="back-button">
                    <ArrowLeft size={16} />
                    Back to Search
                </Link>
                <h1 className="pg-title">{pgData.name}</h1>
                
                <div className="header-actions">
                    <button
                        className="share-button"
                        onClick={handleShare}
                    >
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>

                    <button
                        className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                        onClick={isBookmarked ? handleUnbookmark : handleBookmark}
                        disabled={bookmarkLoading}
                    >
                        {isBookmarked ? (
                            <>
                                <BookmarkCheck size={20} />
                                <span>{bookmarkLoading ? 'Removing...' : 'Bookmarked'}</span>
                            </>
                        ) : (
                            <>
                                <BookmarkPlus size={20} />
                                <span>{bookmarkLoading ? 'Saving...' : 'Bookmark'}</span>
                            </>
                        )}
                    </button>

                    <button
                        className="book-visit-button"
                        onClick={handleBookVisit}
                    >
                        <Calendar size={20} />
                        <span>Book a Visit</span>
                    </button>
                </div>
            </div>

            {/* Login Prompt Modal */}
            {showLoginPrompt && (
                <div className="modal-overlay" onClick={closeLoginPrompt} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="login-prompt-modal" onClick={(e) => e.stopPropagation()} style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        position: 'relative'
                    }}>
                        <div className="modal-header" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                            borderBottom: '1px solid #eee',
                            paddingBottom: '12px'
                        }}>
                            <h3 style={{ margin: 0, color: '#333' }}>Login Required</h3>
                            <button className="close-button" onClick={closeLoginPrompt} style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="login-prompt-content">
                            <p style={{
                                marginBottom: '20px',
                                color: '#666',
                                textAlign: 'center',
                                fontSize: '16px',
                                lineHeight: '1.5'
                            }}>{loginPromptMessage}</p>
                            <div className="login-prompt-actions" style={{
                                display: 'flex',
                                gap: '12px',
                                justifyContent: 'center'
                            }}>
                                <button 
                                    className="cancel-button" 
                                    onClick={closeLoginPrompt}
                                    style={{
                                        background: '#f8f9fa',
                                        color: '#6c757d',
                                        border: '1px solid #dee2e6',
                                        padding: '10px 20px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Cancel
                                </button>
                                <Link 
                                    to="/login" 
                                    className="login-button"
                                    onClick={closeLoginPrompt}
                                    style={{
                                        background: '#007bff',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '6px',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        transition: 'background-color 0.2s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="modal-overlay" onClick={closeShareModal}>
                    <div className="share-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Share this PG</h3>
                            <button className="close-button" onClick={closeShareModal}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="share-content">
                            <div className="pg-preview">
                                <img src={pgData.photo} alt={pgData.name} className="preview-image" />
                                <div className="preview-details">
                                    <h4>{pgData.name}</h4>
                                    <p>{pgData.address}</p>
                                    <p>₹{pgData.priceRange}</p>
                                </div>
                            </div>
                            
                            <div className="url-container">
                                <label>Share this link:</label>
                                <div className="url-input-container">
                                    <input
                                        type="text"
                                        value={window.location.href}
                                        readOnly
                                        className="url-input"
                                    />
                                    <button
                                        className={`copy-button ${copySuccess ? 'copied' : ''}`}
                                        onClick={handleCopyUrl}
                                    >
                                        <Copy size={16} />
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Book Visit Modal */}
            {showBookingModal && (
                <div className="modal-overlay" onClick={closeBookingModal}>
                    <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Book a Visit</h3>
                            <button className="close-button" onClick={closeBookingModal}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="booking-content">
                            <div className="pg-preview">
                                <img src={pgData.photo} alt={pgData.name} className="preview-image" />
                                <div className="preview-details">
                                    <h4>{pgData.name}</h4>
                                    <p>{pgData.address}</p>
                                    <p>₹{pgData.priceRange}</p>
                                </div>
                            </div>

                            <form className="booking-form" onSubmit={handleBookingSubmit}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={bookingDetails.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={bookingDetails.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={bookingDetails.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date of Visit:</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={bookingDetails.date}
                                        onChange={handleInputChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button 
                                        type="button" 
                                        className="cancel-button" 
                                        onClick={closeBookingModal}
                                        disabled={bookingSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="submit-booking-button"
                                        disabled={bookingSubmitting}
                                    >
                                        {bookingSubmitting ? 'Booking...' : 'Book Visit'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReviewModal && (
                <div className="modal-overlay" onClick={closeReviewModal}>
                    <div className="review-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Write a Review</h3>
                            <button className="close-button" onClick={closeReviewModal}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="review-content">
                            <div className="pg-preview">
                                <img src={pgData.photo} alt={pgData.name} className="preview-image" />
                                <div className="preview-details">
                                    <h4>{pgData.name}</h4>
                                    <p>{pgData.address}</p>
                                </div>
                            </div>

                            <form className="review-form" onSubmit={handleSubmitReview}>
                                <div className="form-group">
                                    <label>Rating:</label>
                                    <div className="rating-input">
                                        {renderStars(newReview.rating, true, (rating) => 
                                            setNewReview(prev => ({ ...prev, rating }))
                                        )}
                                        <span className="rating-text">({newReview.rating}/5)</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Comment:</label>
                                    <textarea
                                        name="comment"
                                        value={newReview.comment}
                                        onChange={handleReviewInputChange}
                                        placeholder="Share your experience about this PG..."
                                        rows={4}
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button 
                                        type="button" 
                                        className="cancel-button" 
                                        onClick={closeReviewModal}
                                        disabled={reviewSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="submit-review-button"
                                        disabled={reviewSubmitting}
                                    >
                                        {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="pg-content">
                <div className="pg-image-container">
                    <img
                        src={pgData.photo}
                        alt={pgData.name}
                        className="pg-image"
                    />
                </div>

                <div className="pg-info-container">
                    <div className="pg-details">
                        <div className="pg-location">
                            <h3>Address</h3>
                            <p>{pgData.address}</p>
                        </div>

                        <div className="pg-price">
                            <h3>Price</h3>
                            <p>₹{pgData.priceRange}</p>
                        </div>

                        <div className="pg-gender">
                            <h3>Gender</h3>
                            <p>{pgData.gender}</p>
                        </div>

                        {/* Rating Summary */}
                        <div className="pg-rating-summary">
                            <h3>Rating</h3>
                            <div className="rating-info">
                                {renderStars(Math.round(averageRating.avgRating))}
                                <span className="rating-text">
                                    {averageRating.avgRating}/5 ({averageRating.count} reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="reviews-header">
                    <h2>Reviews ({averageRating.count})</h2>
                    <button 
                        className="write-review-button"
                        onClick={handleWriteReview}
                    >
                        <MessageSquare size={20} />
                        Write Review
                    </button>
                </div>

                {reviewsLoading ? (
                    <div className="reviews-loading">Loading reviews...</div>
                ) : reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <span className="reviewer-name">{review.user}</span>
                                        <span className="review-date">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {renderStars(review.rating)}
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-reviews">
                        <p>No reviews yet. Be the first to review this PG!</p>
                    </div>
                )}
            </div>

            <div className="pg-map-container">
                <h2>Location</h2>
                <div className="pg-map-wrapper">
                    <Map coords={pgData.location.coordinates} name={pgData.name} />
                </div>
            </div>
        </div>
    )
}

export default SinglePg