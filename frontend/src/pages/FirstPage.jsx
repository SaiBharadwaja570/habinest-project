import React, {useState, useEffect} from "react";
import HomePage from './HomePage'
import PGListPage from './PGListPage'
import axios from "axios";

const FirstPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER}`, { withCredentials: true });
                setIsLoggedIn(res.data.data);
                setLoading(false);
            } catch (error) {
                setIsLoggedIn(false);
                setLoading(false);
            }
        };
        checkLoginStatus();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {isLoggedIn ? ( isLoggedIn.type=="owner" ? <PGListPage/> : <HomePage isLoggedIn={true}/>) : (<HomePage isLoggedIn={false}/>) }
        </div>
    )
}

export default FirstPage
