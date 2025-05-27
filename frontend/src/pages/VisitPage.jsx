import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VisitPage = () => {
    const [visits, setVisits] = useState(null);
    const [pg, setPg] = useState(null);
    useEffect(()=>{
        axios({
            method: "GET",
            url:`${import.meta.env.VITE_BACKEND_VISITS}/show`,
            withCredentials: true,
        }).then((res)=>{
            setVisits(res.data.data)
        }).catch((err)=>{
            console.error("Visits not fetched", err)
        })
    }, [])
    console.log(visits)
    useEffect(() => {
        const fetchPGData = async () => {
          if (!visits || visits.length === 0) return;
          try {
            const pgIds = visits.map((visit) => visit.pgId);
            // Optional: deduplicate pgIds
            const uniquePgIds = [...new Set(pgIds)];
            // Fetch all PGs in parallel
            const pgRequests = uniquePgIds.map((pgId) =>
              axios.get(`${import.meta.env.VITE_BACKEND_PG}/${pgId}`)
            );
            const pgResponses = await Promise.all(pgRequests);
            const fetchedPgs = pgResponses.map((res) => res.data.data); // Assuming API response structure
            setPg(fetchedPgs);
          } catch (error) {
            console.error("Error fetching PG data:", error);
          }
        };
        fetchPGData();
      }, [visits]);
      console.log(pg)
    return (
        <div>
            <div>
                Hello
            </div>
        </div>
    )
}

export default VisitPage
