import { lazy, Suspense, useEffect } from 'react'


const Map = lazy(() => import('react-map-gl'))

export default function City() { 
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Map
                mapboxAccessToken={process.env.API_KEY}
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            />
        </Suspense>
    );
}