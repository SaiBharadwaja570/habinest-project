import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VisitPage = () => {
    const [visits, setVisits] = useState(null);
    const [pgs, setPgs] = useState(null);
    const [loading, setLoading] = useState(true);
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
            setPgs(fetchedPgs);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching PG data:", error);
          }
        };
        fetchPGData();
      }, [visits]);
      console.log(pgs)
    return (
    <div>
        {loading ? (
        <p>Loading visits and PG data...</p>
        ) : (
        visits.map((visit) => {
            const pgInfo = pgs.find((pg) => pg._id === visit.pgId);
            return (
            <div key={visit._id}>
                <h3>{visit.name}</h3>
                <p>Email: {visit.email}</p>
                <p>Phone: {visit.phone}</p>
                <p>Visit Date: {visit.date}</p>
                {pgInfo ? (
                <>
                    <h4>PG Details:</h4>
                    <p>Name: {pgInfo.pgName}</p>
                    <p>Address: {pgInfo.address}</p>
                    {/* Add more PG fields as needed */}
                </>
                ) : (
                <p>PG data not found</p>
                )}
            </div>
            );
        })
        )}
    </div>
    );
};

export default VisitPage
