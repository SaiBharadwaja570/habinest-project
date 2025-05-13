import ApiError from "./ApiError.js";
import axios from "axios";

const getCoordinatesFromAddress = async (address) =>{
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        
        const response = await axios.get(
            url,
            {
                headers: {
                    "User-Agent": "Habinest/1.0 (saibharadwaja1906@gmail.com)"
                }
            }
        )

        const data = response.data;

        if (data.length > 0) {
            const { lat, lon } = data[0];
            return [parseFloat(lon), parseFloat(lat)]; // GeoJSON format: [longitude, latitude]
          } else {
            throw new ApiError(500 ,'Coordinates not found for the given address.');
        }
    
    } catch (error) {
        throw new ApiError(401, "Geocode error: "+ error)
    }
}

export default getCoordinatesFromAddress;