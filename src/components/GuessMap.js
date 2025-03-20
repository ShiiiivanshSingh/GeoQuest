'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const MapClickHandler = ({ setMarker }) => {
  useMapEvents({
    click: (e) => {
      setMarker([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const LoadingScreen = () => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
      <p className="text-gray-600 text-sm">Loading map...</p>
    </div>
  </div>
);

const GuessMap = ({ setGuess }) => {
  const [marker, setMarker] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleSetMarker = (position) => {
    setMarker(position);
    setGuess(position);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!isMapLoaded && <LoadingScreen />}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        minZoom={2}
        maxBoundsViscosity={1.0}
        maxBounds={[[-90, -180], [90, 180]]}
        whenReady={() => setIsMapLoaded(true)}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler setMarker={handleSetMarker} />
        {marker && <Marker position={marker} icon={icon} />}
      </MapContainer>
    </div>
  );
};

export default GuessMap; 