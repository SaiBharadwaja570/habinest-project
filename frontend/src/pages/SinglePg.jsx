import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'
const SinglePg = () => {
    const {id}=useParams()
    console.log(id)
    const [pgData, setPgData]= useState(null)
    useEffect(()=>{
        axios({
            method:"GET",
            url:`http://localhost:8000/api/pg/${id}`
        }).then(res=>{console.log(res);setPgData(res.data.data)}).catch(err=>{console.error("ERROR",err)})
    },[])
    if(pgData){
        console.log(pgData.location.coordinates)
    }
    return (
        <div>
            {pgData ? <Map coords={pgData.location.coordinates} name={pgData.name}/> : <h2>Loading...</h2>}
        </div>
    )
}

export default SinglePg
