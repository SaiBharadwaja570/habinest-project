import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Map from '../components/Map'
import { BookmarkPlus, BookmarkCheck, ArrowLeft, Share2, Copy, X, Calendar } from 'lucide-react'
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
    const [copySuccess, setCopySuccess] = useState(false)
    const [bookingSubmitting, setBookingSubmitting] = useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        phone: '',
        date: ''
    })

    useEffect(() => {
        const fetchPgData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_PG}/${id}`)
                setPgData(response.data.data)

                const bookmarkStatus = await axios.get(`${import.meta.env.VITE_BACKEND_BOOKMARKS}/status/${id}`, {
                    withCredentials: true
                })
                setIsBookmarked(bookmarkStatus.data.isBookmarked)
            } catch (err) {
                console.error("ERROR", err)
                setError("Failed to load PG details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPgData()
    }, [id])

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
            if (err.response?.status === 400 && err.response?.data?.message === 'Listing already bookmarked') {
                setIsBookmarked(true)
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
            alert("Failed to book visit. Please try again.")
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

                        {/* {pgData.amenities && (
                            <div className="pg-amenities">
                                <h3>Amenities</h3>
                                <ul className="amenities-list">
                                    {pgData.amenities.map((amenity, index) => (
                                        <li key={index} className="amenity-item">{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                        )} */}
                    </div>
                </div>
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