const axios = require('axios');
const captainModel=require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&departure_time=now&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            throw new Error('Unable to fetch distance data from Google Maps');
        }

        const element = response.data.rows[0].elements[0];

        if (element.status === 'ZERO_RESULTS') {
            throw new Error('No routes found between origin and destination');
        }

        console.log("🛣️ Distance:", element.distance);
        console.log("⏱️ Duration:", element.duration);
        console.log("🚦 Duration in traffic:", element.duration_in_traffic);

        return {
            distance: element.distance,
            duration: element.duration,
            duration_in_traffic: element.duration_in_traffic || element.duration
        };
    } catch (err) {
        console.error('[getDistanceTime Error]', err.message);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports.getCaptainsIntheRadius=async(ltd,lng,radius)=>{
const captains=await captainModel.find({
    location:{
        $geoWithin:{
            $centerSphere:[[ltd,lng],radius/6371]
        }
    }
})
return captains;
}

