'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { CITIES } from '../data/cities';

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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
const GuessMap = dynamic(() => import("./GuessMap"), { 
  loading: LoadingAnimation,
  ssr: false 
});

const MAPILLARY_CLIENT_ID = process.env.NEXT_PUBLIC_MAPILLARY_CLIENT_ID;

// Game Over Summary Component
const GameOverScreen = ({ roundHistory, onPlayAgain }) => {
  const totalScore = roundHistory.reduce((sum, round) => sum + round.score, 0);
  const averageDistance = roundHistory.reduce((sum, r) => sum + r.distance, 0) / roundHistory.length;
  const bestRound = Math.max(...roundHistory.map(r => r.score));
  const perfectRounds = roundHistory.filter(r => r.score > 4900).length;

  return (
    <div className="fixed inset-0 z-[200] bg-[#1f2937] overflow-hidden">
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          {/* Score */}
          <div className="text-center mb-2">
            <h1 className="text-[5rem] leading-none font-bold text-yellow-400">
              {totalScore.toFixed(0)}
            </h1>
            <p className="text-white/60 text-xs uppercase tracking-widest">FINAL SCORE</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{bestRound.toFixed(0)}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Best Round</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{averageDistance.toFixed(0)}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Avg Distance km</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{perfectRounds}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Perfect Rounds</div>
            </div>
          </div>

          {/* Rounds Timeline */}
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/40 mb-1 pl-14">Round Summary</div>
            {roundHistory.map((round, index) => (
              <div key={index} 
                className="bg-white/5 rounded-lg p-3 flex items-center justify-between group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white/60">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{round.cityName}</div>
                    <div className="text-white/40 text-xs">{round.distance.toFixed(1)} km</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-blue-400">
                  {round.score.toFixed(0)}
                </div>
              </div>
            ))}
          </div>

          {/* Play Again Button */}
          <button 
            onClick={onPlayAgain}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-all 
                     text-sm font-medium uppercase tracking-wider border border-white/10"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

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
                      onClick={() => {
                        // Set a dummy guess far away to ensure 0 points
                        setGuess([0, 0]);
                        // Calculate score which will be 0 due to large distance
                        const distance = haversine(image.lat, image.lng, 0, 0);
                        const roundScore = 0; // Force 0 score for skips
                        setScore(roundScore.toFixed(2));
                        setTotalScore(prev => prev + roundScore);
                        
                        // Add round to history
                        setRoundHistory(prev => [...prev, {
                          cityName: currentCity.name,
                          distance: distance,
                          score: roundScore,
                          guess: [0, 0],
                          actual: [image.lat, image.lng]
                        }]);

                        // Check if game is over
                        if (round === 5) {
                          setIsGameOver(true);
                        }
                      }}
                      className="bg-gradient-to-br from-black-600 to-black-700 hover:from-black-700 hover:to-black-800 
                               active:from-black-800 active:to-black-900 text-white px-6 py-3 rounded-lg 
                               transition-all duration-200 font-medium shadow-lg hover:shadow-xl 
                               active:transform active:scale-95 uppercase tracking-wider
                               border border-black-500/30 hover:border-black-500/50 flex items-center gap-2"
                      title="Skip this round (0 points)"
                    >
                      <span>Skip</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  : 'bottom-10 right-4 w-[300px] h-[200px] z-[100] hover:scale-110 hover:shadow-2xl'
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
                  className="absolute top-3 left-3 z-30 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg 
                           shadow-lg hover:bg-white transition-all duration-200 
                           active:transform active:scale-95 border border-gray-200
                           hover:shadow-xl text-gray-700 hover:text-gray-900
                           text-sm font-medium flex items-center gap-2"
                >
                  {isMapExpanded ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>Collapse</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      <span>Expand</span>
                    </>
                  )}
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
                        Location: {currentCity.name}
                      </div>
                      <div className="text-4xl font-bold text-white my-1">
                        {score} points!
                      </div>
                      <div className="text-white/60 text-sm">
                        You guessed {haversine(image.lat, image.lng, guess[0], guess[1]).toFixed(1)} km from {currentCity.name}
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