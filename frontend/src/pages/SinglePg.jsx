import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Map from '../components/Map'
import { BookmarkPlus, BookmarkCheck, ArrowLeft } from 'lucide-react'
import '../App.css'

const SinglePg = () => {
    const { id } = useParams()
    const [pgData, setPgData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)

    useEffect(() => {
        const fetchPgData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:8000/api/pg/${id}`)
                setPgData(response.data.data)

                const bookmarkStatus = await axios.get(`http://localhost:8000/api/bookmarks/status/${id}`, {
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
            await axios.post('http://localhost:8000/api/bookmarks/add', {
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
            await axios.post('http://localhost:8000/api/bookmark/remove', {
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
            </div>

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

                        {pgData.amenities && (
                            <div className="pg-amenities">
                                <h3>Amenities</h3>
                                <ul className="amenities-list">
                                    {pgData.amenities.map((amenity, index) => (
                                        <li key={index} className="amenity-item">{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
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
