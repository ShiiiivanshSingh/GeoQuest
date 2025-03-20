'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { Popup } from 'react-leaflet';

// Create custom divIcon for markers
const guessIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #2563eb; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const actualIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #dc2626; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapClickHandler = ({ setMarker, isGuessPhase }) => {
  useMapEvents({
    click: (e) => {
      if (isGuessPhase) {
        setMarker([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

// Component to fit bounds when showing result
const ResultBounds = ({ positions }) => {
  const map = useMap();
  
  useEffect(() => {
    if (positions.length === 2) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, positions]);

  return null;
};

const GuessMap = ({ setGuess, actualLocation, guessLocation, isGuessPhase = true, hideControls = false }) => {
  const [marker, setMarker] = useState(null);

  const handleSetMarker = (position) => {
    setMarker(position);
    setGuess(position);
  };

  // Calculate positions for the result view
  const positions = guessLocation && actualLocation ? [
    [guessLocation[0], guessLocation[1]],
    [actualLocation.lat, actualLocation.lng]
  ] : [];

  // Calculate distance if both positions are available
  const distance = positions.length === 2 ? 
    haversine(positions[0][0], positions[0][1], positions[1][0], positions[1][1]) : 0;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        minZoom={2}
        maxBoundsViscosity={1.0}
        maxBounds={[[-90, -180], [90, 180]]}
        zoomControl={!hideControls}
        attributionControl={!hideControls}
        className={hideControls ? 'score-map' : ''}
      >
        <TileLayer
          attribution={!hideControls ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' : ''}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler setMarker={handleSetMarker} isGuessPhase={isGuessPhase} />
        
        {/* Show guess marker during guess phase */}
        {isGuessPhase && marker && (
          <Marker position={marker} icon={guessIcon} />
        )}

        {/* Show both markers and line during result phase */}
        {!isGuessPhase && guessLocation && (
          <Marker 
            position={guessLocation} 
            icon={guessIcon}
          >
            {!hideControls && (
              <Popup>
                Your guess
              </Popup>
            )}
          </Marker>
        )}
        {!isGuessPhase && actualLocation && (
          <Marker 
            position={[actualLocation.lat, actualLocation.lng]} 
            icon={actualIcon}
          >
            {!hideControls && (
              <Popup>
                Actual location
              </Popup>
            )}
          </Marker>
        )}
        {!isGuessPhase && positions.length === 2 && (
          <>
            <Polyline 
              positions={positions}
              color="#ff0000"
              weight={3}
              dashArray="10"
              opacity={0.8}
            />
            <ResultBounds positions={positions} />
          </>
        )}
      </MapContainer>

      {/* Distance indicator */}
      {!isGuessPhase && positions.length === 2 && !hideControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
          Distance: {distance.toFixed(1)} km
        </div>
      )}

      <style jsx global>{`
        .score-map .leaflet-control-container {
          display: none;
        }
        .score-map {
          background-color: #e5f0f9;
        }
      `}</style>
    </div>
  );
};

// Haversine formula to calculate distance
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default GuessMap; 