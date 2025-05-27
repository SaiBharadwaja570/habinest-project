import React, {useState, useEffect} from "react";
import HomePage from './HomePage'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_USER}`, { withCredentials: true });
                setIsLoggedIn(res.data.data);
                setLoading(false);
                localStorage.setItem("isLoggedIn", true)
            } catch (error) {
                localStorage.removeItem("isLoggedIn")
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
            {isLoggedIn ? ( isLoggedIn.type=="owner" ? navigate("/pg-list") : navigate('/')) : (navigate('/')) }
        </div>
    )
}

export default FirstPage
