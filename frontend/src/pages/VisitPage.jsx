import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VisitPage = () => {
    const [visits, setVisits] = useState(null);
    useEffect(()=>{
        axios({
            method: "GET",
            url:`${import.meta.env.VITE_BACKEND_VISITS}/show`,
            withCredentials: true,
        }).then((res)=>{
            setVisits(res.data)
        })
    }, [])
    console.log(visits)

    return (
        <div>
            <div>

            </div>
        </div>
    )
}

export default VisitPage
