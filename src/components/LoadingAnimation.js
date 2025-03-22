'use client';

import { useState, useEffect } from 'react';

export default function LoadingAnimation() {
  const loadingMessages = [
    "Preparing the world map...",
    "Gathering map data...",
    "Loading terrain features...",
    "Calculating distances...",
    "Spinning the globe...",
    "Finding interesting locations...",
    "Scanning coordinates...",
    "Rendering continents...",
  ];

  const [message, setMessage] = useState(loadingMessages[0]);
  const [key, setKey] = useState(0); // Key to force re-render of animation

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
      setMessage(newMessage);
      setKey(prevKey => prevKey + 1); // Change key to restart animation
    }, 3000); // Change message every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
          {/* Shadow effect */}
          <div className="absolute inset-0 shadow-2xl filter blur-md bg-white/5 rounded-full"></div>
          
          {/* Pulsing circles */}
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping shadow-lg"></div>
          <div className="absolute inset-2 bg-white/40 rounded-full animate-ping-delay-150 shadow-lg"></div>
          <div className="absolute inset-4 bg-white/60 rounded-full animate-ping-delay-300 shadow-lg"></div>
          <div className="absolute inset-0 bg-white/80 rounded-full animate-pulse shadow-xl"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-spin drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="loading-title">Loading Map</h3>
          <p key={key} className="loading-subtitle typing-animation">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
} 