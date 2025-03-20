'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Dynamically import the GuessMap component to avoid SSR issues with Leaflet
const GuessMap = dynamic(() => import('./GuessMap'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

const MAPILLARY_CLIENT_ID = process.env.NEXT_PUBLIC_MAPILLARY_CLIENT_ID;

// Start with a single reliable location
const INITIAL_LOCATION = { lat: 40.7128, lng: -74.0060 }; // New York

const Game = () => {
  const [image, setImage] = useState(null);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const fetchImage = async (abortController) => {
    try {
      if (!MAPILLARY_CLIENT_ID) {
        setError('Mapillary API key not found. Please add your NEXT_PUBLIC_MAPILLARY_CLIENT_ID to .env.local');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      // Create a small bounding box around New York
      const bbox = {
        min_lat: INITIAL_LOCATION.lat - 0.01,
        max_lat: INITIAL_LOCATION.lat + 0.01,
        min_lng: INITIAL_LOCATION.lng - 0.01,
        max_lng: INITIAL_LOCATION.lng + 0.01
      };

      // Get a single image
      const apiUrl = `https://graph.mapillary.com/images?fields=id,thumb_2048_url,computed_geometry&bbox=${bbox.min_lng},${bbox.min_lat},${bbox.max_lng},${bbox.max_lat}&limit=1`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `OAuth ${MAPILLARY_CLIENT_ID}`
        },
        signal: abortController.signal
      });
      
      if (!response.data?.data?.[0]) {
        throw new Error('No image found. Please try again.');
      }

      const imageData = response.data.data[0];
      // Only set the image if the request wasn't aborted
      if (!abortController.signal.aborted) {
        setImage({
          url: imageData.thumb_2048_url,
          lat: imageData.computed_geometry.coordinates[1],
          lng: imageData.computed_geometry.coordinates[0],
        });
      }
    } catch (error) {
      // Only set error if the request wasn't aborted
      if (!abortController.signal.aborted) {
        console.error('Error fetching image:', error);
        if (error.response?.status === 401) {
          setError('Unauthorized. Please check your Mapillary API key format.');
        } else if (error.name === 'AbortError') {
          // Do nothing - the request was aborted
          return;
        } else {
          setError(
            error.response?.data?.error?.message || 
            error.message || 
            'Failed to fetch image. Please try again.'
          );
        }
      }
    } finally {
      // Only set loading to false if the request wasn't aborted
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchImage(abortController);
    
    // Cleanup function to abort any in-flight requests when the component unmounts
    return () => {
      abortController.abort();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const calculateScore = () => {
    if (image && guess) {
      const distance = haversine(image.lat, image.lng, guess[0], guess[1]);
      const roundScore = Math.max(5000 - distance * 2, 0);
      setScore(roundScore.toFixed(2));
      setTotalScore(prev => prev + parseFloat(roundScore));
    }
  };

  const handleNewGame = () => {
    setGuess(null);
    setScore(null);
    if (round < 5) {
      setRound(prev => prev + 1);
    } else {
      setRound(1);
      setTotalScore(0);
    }
    const abortController = new AbortController();
    fetchImage(abortController);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Content */}
      {loading ? (
        <div className="w-full h-full bg-gray-200 animate-pulse"></div>
      ) : image ? (
        <>
          {/* Street View Image Container */}
          <div className="absolute inset-0">
            <img 
              src={image.url} 
              alt="Street View" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Info Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md text-white p-4 z-10 border-t border-white/10">
            <div className="container mx-auto flex justify-between items-center max-w-7xl px-4">
              <div className="flex items-center gap-8">
                <div className="flex flex-col bg-black/50 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300 font-medium">Round</span>
                  <span className="text-2xl font-bold text-white">{round} / 5</span>
                </div>
                <div className="flex flex-col bg-black/50 rounded-lg px-4 py-2">
                  <span className="text-sm text-gray-300 font-medium">Total Score</span>
                  <span className="text-2xl font-bold text-white">{totalScore}</span>
                </div>
              </div>
              
              {/* Guess Button */}
              {guess && !score && (
                <button 
                  onClick={calculateScore}
                  className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                           active:from-green-700 active:to-green-800 text-white px-10 py-3 rounded-lg 
                           transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl 
                           active:transform active:scale-95 uppercase tracking-wider
                           border border-green-400/30 hover:border-green-400/50"
                >
                  Make Guess
                </button>
              )}
            </div>
          </div>

          {/* Map Container - Positioned in bottom right */}
          <div 
            className={`fixed transition-all duration-300 ease-out ${
              isMapExpanded 
                ? 'inset-0 z-50' 
                : 'bottom-24 right-4 w-[300px] h-[200px] z-20 hover:scale-110 hover:shadow-2xl'
            }`}
            style={{ 
              transformOrigin: 'bottom right',
            }}
          >
            <div className="relative w-full h-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200
                          transition-all duration-300">
              <GuessMap setGuess={setGuess} />
              <button
                onClick={() => setIsMapExpanded(!isMapExpanded)}
                className="absolute top-3 left-3 z-30 bg-white/90 backdrop-blur-sm p-2.5 rounded-lg 
                         shadow-lg hover:bg-white transition-all duration-200 
                         active:transform active:scale-95 border border-gray-200
                         hover:shadow-xl text-gray-700 hover:text-gray-900"
              >
                {isMapExpanded ? '↙' : '↗'}
              </button>
            </div>
          </div>

          {/* Score Display */}
          {score && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl text-center shadow-2xl transform transition-all duration-200
                            border border-white/20 max-w-md w-full mx-4">
                <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {score} points
                </div>
                <div className="text-gray-600 mb-8 text-lg font-medium">
                  {round === 5 ? 'Final Round Complete!' : `Round ${round} Complete`}
                </div>
                <button 
                  onClick={handleNewGame}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                           active:from-blue-700 active:to-blue-800 text-white px-8 py-3.5
                           rounded-lg transition-all duration-200 text-lg font-bold uppercase tracking-wider
                           shadow-lg hover:shadow-xl active:transform active:scale-95
                           border border-blue-400/30 hover:border-blue-400/50 w-full"
                >
                  {round === 5 ? 'Start New Game' : 'Next Round'}
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg p-8 max-w-2xl w-full mx-4 
                            text-center shadow-xl">
                <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
                <button
                  onClick={() => {
                    const abortController = new AbortController();
                    fetchImage(abortController);
                  }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                           text-white px-8 py-3 rounded-lg transition-all duration-200 text-lg font-bold
                           shadow-lg hover:shadow-xl active:transform active:scale-95
                           border border-blue-400/30 hover:border-blue-400/50"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

// Haversine formula to calculate distance between two points
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

export default Game; 