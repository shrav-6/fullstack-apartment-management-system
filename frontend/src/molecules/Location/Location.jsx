import React, { useState, useEffect } from 'react';

export default function Location() {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
                if (permissionStatus.state === 'denied') {
                    alert('Location access is required to move ahead!.');
                    window.location.href = "app-settings:location";
                } else {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            setLocation({ latitude, longitude });
                        },
                        (error) => {
                            setError(`Error getting location: ${error.message}`);
                        }
                    );
                }
            });
        } else {
            alert('Geolocation is not supported in your browser.');
        }
    }, []);

        
    return (
        <div>
            {location ? (
                <div>
                <p>Your current location:</p>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>{error || 'Fetching location...'}</p>
            )}
        </div>
    );
}
