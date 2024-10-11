import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import './Map.css'; // Optional: Create separate CSS for Map component

const Map = ({ user }) => {
    const [location, setLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });
                fetchHospitals(latitude, longitude);
            });
        }
    }, []);

    const fetchHospitals = async (lat, lng) => {
        const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${API_KEY}`
            );
            setHospitals(response.data.results);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

    if (!location) return <div className="loading">Loading...</div>;

    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Replace with your API key */}
            <div className="map-container">
                <GoogleMap
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    center={location}
                    zoom={14}
                >
                    {hospitals.map((hospital) => (
                        <Marker
                            key={hospital.id}
                            position={{
                                lat: hospital.geometry.location.lat,
                                lng: hospital.geometry.location.lng,
                            }}
                            title={hospital.name}
                        />
                    ))}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default Map;