'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Loading Animation Component
const LoadingAnimation = () => (
  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="relative w-24 h-24 mb-8 mx-auto">
        {/* Pulsing circles */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
        <div className="absolute inset-2 bg-blue-500/40 rounded-full animate-ping animation-delay-150"></div>
        <div className="absolute inset-4 bg-blue-500/60 rounded-full animate-ping animation-delay-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
        
        {/* Globe icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">Loading Map</h3>
        <p className="text-blue-200 text-sm">Preparing the world map...</p>
      </div>
    </div>
  </div>
);

// Dynamically import the GuessMap component to avoid SSR issues with Leaflet
const GuessMap = dynamic(() => import('./GuessMap'), {
  ssr: false,
  loading: () => <LoadingAnimation />
});

const MAPILLARY_CLIENT_ID = process.env.NEXT_PUBLIC_MAPILLARY_CLIENT_ID;

// List of major cities around the world with their coordinates
const CITIES = [
  // North America
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207 },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332 },
  { name: 'Miami', lat: 25.7617, lng: -80.1918 },
  { name: 'Las Vegas', lat: 36.1699, lng: -115.1398 },

  // Europe
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734 },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038 },
  { name: 'Vienna', lat: 48.2082, lng: 16.3738 },
  { name: 'Prague', lat: 50.0755, lng: 14.4378 },
  { name: 'Copenhagen', lat: 55.6761, lng: 12.5683 },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686 },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784 },

  // Asia
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780 },
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { name: 'Taipei', lat: 25.0330, lng: 121.5654 },
  { name: 'Osaka', lat: 34.6937, lng: 135.5023 },
  { name: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },

  // Indian Subcontinent
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', lat: 31.5204, lng: 74.3587 },
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479 },
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', lat: 22.3569, lng: 91.7832 },
  { name: 'Colombo', lat: 6.9271, lng: 79.8612 },
  { name: 'Kathmandu', lat: 27.7172, lng: 85.3240 },
  { name: 'Goa', lat: 15.2993, lng: 74.1240 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },

  // Australia & Oceania
  { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { name: 'Auckland', lat: -36.8509, lng: 174.7645 },
  { name: 'Brisbane', lat: -27.4705, lng: 153.0260 },

  // South America
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333 },
  { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816 },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693 },
  { name: 'Lima', lat: -12.0464, lng: -77.0428 },

  // Africa
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241 },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898 }
];

// Game Over Summary Component
const GameOverScreen = ({ roundHistory, onPlayAgain }) => (
  <div className="fixed inset-0 z-[200]">
    <div className="absolute inset-0 bg-[#1f2937]"></div>
    <div className="relative z-[201] h-full flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-white text-center mb-2">Game Over!</h1>
        <p className="text-white/60 text-center mb-8">Here's how you did:</p>
        
        {/* Total Score */}
        <div className="bg-white/10 rounded-xl p-6 mb-8">
          <div className="text-center">
            <div className="text-white/60 text-sm uppercase tracking-wider mb-2">Total Score</div>
            <div className="text-5xl font-bold text-white">
              {roundHistory.reduce((sum, round) => sum + round.score, 0).toFixed(0)}
            </div>
          </div>
        </div>

        {/* Rounds Summary */}
        <div className="grid gap-4 mb-8">
          {roundHistory.map((round, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 rounded-full p-2 w-12 h-12 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <div className="text-white font-medium">{round.cityName}</div>
                  <div className="text-white/60 text-sm">{round.distance.toFixed(1)} km away</div>
                </div>
              </div>
              <div className="text-xl font-bold text-white">{round.score.toFixed(0)} pts</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white/60 text-sm mb-1">Best Round</div>
            <div className="text-2xl font-bold text-white">
              {Math.max(...roundHistory.map(r => r.score)).toFixed(0)}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white/60 text-sm mb-1">Average Distance</div>
            <div className="text-2xl font-bold text-white">
              {(roundHistory.reduce((sum, r) => sum + r.distance, 0) / roundHistory.length).toFixed(1)} km
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white/60 text-sm mb-1">Perfect Rounds</div>
            <div className="text-2xl font-bold text-white">
              {roundHistory.filter(r => r.score > 4900).length}
            </div>
          </div>
        </div>

        {/* Play Again Button */}
        <button 
          onClick={onPlayAgain}
          className="bg-[#84cc16] hover:bg-[#84cc16]/90 active:bg-[#84cc16]/80 w-full
                   text-white px-8 py-4 rounded-lg transition-all duration-200 
                   font-medium text-xl uppercase tracking-wide"
        >
          Play Again
        </button>
      </div>
    </div>
  </div>
);

const Game = () => {
  const [image, setImage] = useState(null);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [round, setRound] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const getRandomCity = () => {
    return CITIES[Math.floor(Math.random() * CITIES.length)];
  };

  const fetchImage = async (abortController) => {
    try {
      if (!MAPILLARY_CLIENT_ID) {
        setError('Mapillary API key not found. Please add your NEXT_PUBLIC_MAPILLARY_CLIENT_ID to .env.local');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      // Get a random city
      const city = getRandomCity();
      setCurrentCity(city);
      
      // Create a bounding box around the selected city
      // Increased box size for better coverage (roughly 5km box)
      const boxSize = 0.045;
      const bbox = {
        min_lat: city.lat - boxSize,
        max_lat: city.lat + boxSize,
        min_lng: city.lng - boxSize,
        max_lng: city.lng + boxSize
      };

      // Get more images within the bounding box
      const apiUrl = `https://graph.mapillary.com/images?fields=id,thumb_2048_url,computed_geometry&bbox=${bbox.min_lng},${bbox.min_lat},${bbox.max_lng},${bbox.max_lat}&limit=100`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `OAuth ${MAPILLARY_CLIENT_ID}`
        },
        signal: abortController.signal
      });
      
      if (!response.data?.data?.length) {
        console.log(`No images found in ${city.name}, trying another city...`);
        return fetchImage(abortController); // Try another city
      }

      // Randomly select one image from the results
      const randomIndex = Math.floor(Math.random() * response.data.data.length);
      const imageData = response.data.data[randomIndex];

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
      
      // Add round to history
      setRoundHistory(prev => [...prev, {
        cityName: currentCity.name,
        distance: distance,
        score: roundScore,
        guess: guess,
        actual: [image.lat, image.lng]
      }]);

      // Check if game is over
      if (round === 5) {
        setIsGameOver(true);
      }
    }
  };

  const handleNewGame = () => {
    if (round === 5) {
      // Reset everything for a new game
      setRoundHistory([]);
      setTotalScore(0);
      setRound(1);
      setIsGameOver(false);
    } else {
      // Continue to next round
      setRound(prev => prev + 1);
    }
    setGuess(null);
    setScore(null);
    const abortController = new AbortController();
    fetchImage(abortController);
  };

  const handlePlayAgain = () => {
    setRoundHistory([]);
    setTotalScore(0);
    setRound(1);
    setIsGameOver(false);
    setGuess(null);
    setScore(null);
    const abortController = new AbortController();
    fetchImage(abortController);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Main Content */}
      {loading ? (
        <LoadingAnimation />
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
                <div className="flex items-center gap-2">
                  <div className="flex flex-col bg-black/50 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-300 font-medium">Total Score</span>
                    <span className="text-2xl font-bold text-white">{totalScore}</span>
                  </div>
                  {!score && (
                    <button 
                      onClick={handleNewGame}
                      className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                               active:from-red-700 active:to-red-800 text-white px-10 py-3 rounded-lg 
                               transition-all duration-200 text-lg font-bold shadow-lg hover:shadow-xl 
                               active:transform active:scale-95 uppercase tracking-wider
                               border border-red-400/30 hover:border-red-400/50"
                      title="Skip this round (0 points)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
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
          {!score && (
            <div 
              className={`fixed transition-all duration-300 ease-out ${
                isMapExpanded 
                  ? 'inset-0 z-[100]' 
                  : 'bottom-24 right-4 w-[300px] h-[200px] z-[100] hover:scale-110 hover:shadow-2xl'
              }`}
              style={{ 
                transformOrigin: 'bottom right',
                isolation: 'isolate'
              }}
            >
              <div className="relative w-full h-full bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200
                            transition-all duration-300">
                <GuessMap 
                  setGuess={setGuess} 
                  actualLocation={score ? image : null}
                  guessLocation={score ? guess : null}
                  isGuessPhase={!score}
                />
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
          )}

          {/* Score Display */}
          {score && (
            <div className="fixed inset-0 z-50">
              <div className="absolute inset-0 bg-[#1f2937]"></div>
              <div className="relative z-[51] h-full flex">
                {/* Left side - Score Display */}
                <div className="w-1/2 h-full flex items-center justify-center p-8 border-r border-white/10">
                  <div className="max-w-md w-full space-y-4">
                    {/* Flag Icon */}
                    <div className="flex justify-center mb-2">
                      <div className="bg-white/10 rounded-full p-3">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Round Info */}
                    <div className="text-white/60 text-sm font-medium text-center uppercase tracking-wider">
                      ROUND {round} / 5
                    </div>
                    
                    {/* Points */}
                    <div className="text-center mt-4">
                      <div className="text-white text-lg font-medium">
                        You got
                      </div>
                      <div className="text-4xl font-bold text-white my-1">
                        {score} points!
                      </div>
                      <div className="text-white/60 text-sm">
                        You guessed {haversine(image.lat, image.lng, guess[0], guess[1]).toFixed(1)} km from the correct location
                      </div>
                    </div>

                    {/* Game Summary Button */}
                    <button 
                      onClick={handleNewGame}
                      className="bg-[#84cc16] hover:bg-[#84cc16]/90 active:bg-[#84cc16]/80 w-full
                               text-white px-8 py-3 rounded-lg transition-all duration-200 
                               font-medium text-lg uppercase tracking-wide mt-4"
                    >
                      Next Round
                    </button>
                  </div>
                </div>

                {/* Right side - Map Display */}
                <div className="w-1/2 h-full relative">
                  <GuessMap 
                    setGuess={setGuess} 
                    actualLocation={score ? image : null}
                    guessLocation={score ? guess : null}
                    isGuessPhase={!score}
                    hideControls={true}
                  />
                </div>
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

      {/* Game Over Screen */}
      {isGameOver && (
        <GameOverScreen 
          roundHistory={roundHistory}
          onPlayAgain={handlePlayAgain}
        />
      )}
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