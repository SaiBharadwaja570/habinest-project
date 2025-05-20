import axios from 'axios'
async function geocodeAddress(address) {
    const encoded = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'HabinestApp/1.0 (contact: saibharadwaja1000@gmail.com)'
            }
        });

        const data = response.data;
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { lat, lon };
        } else {
            throw new Error('No coordinates found for the given address.');
        }
    } catch (error) {
        throw new Error('Geocoding failed: ' + error);
    }
}



export default geocodeAddress
