import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'
import '../App.css'
const SinglePg = () => {
    const {id}=useParams()
    const [pgData, setPgData]= useState(null)
    useEffect(()=>{
        axios({
            method:"GET",
            url:`http://localhost:8000/api/pg/${id}`
        }).then(res=>{setPgData(res.data.data)}).catch(err=>{console.error("ERROR",err)})
    },[])
    if(!pgData){
        return(<h2>Loading...</h2>)
    }
    return (
        <div className='pg-container'>
            <div className="pg-map-wrapper">
                <Map coords={pgData.location.coordinates} name={pgData.name}/>
            </div>
            <div className="pg-details">
                <img src={pgData.photo}/>
                <h2>{pgData.name}</h2>
                <p>{pgData.address}</p>
                <p>Price: ₹{pgData.priceRange}</p>
                <p>Gender: {pgData.gender}</p>
                {/* Add more details as needed */}
            </div>
        </div>
    )
}

export default SinglePg
