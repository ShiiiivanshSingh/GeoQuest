'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function HowToPlay() {
  const router = useRouter();

  return (
    <main className="min-h-screen relative bg-black">
      {/* Background Image - Limited to Viewport */}
      <div className="h-screen fixed inset-0 z-0 animate-slowZoom">
        <Image
          src="/landing.jpg"
          alt="Mountain landscape"
          fill
          className="object-cover grayscale"
          priority
        />
        {/* Noise Effect Overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: 'url(data:image/png;base64,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)',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 pointer-events-auto">
        <Navigation />

        {/* Decorative Globe Icons */}
        <div className="fixed top-[35%] right-[25%] w-20 h-20 text-white/20 animate-float animation-delay-300">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="fixed bottom-[40%] left-[25%] w-12 h-12 text-white/10 animate-float animation-delay-700">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
          </svg>
        </div>
        <div className="fixed top-[50%] right-[35%] w-16 h-16 text-white/15 animate-floatSlow animation-delay-1000">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
          </svg>
        </div>

        {/* Hero Section */}
        <section className="h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight animate-slideInUp">
                How to Play GeoQuest
              </h1>
              <p className="text-white/80 text-xl mb-8 tracking-wide animate-fadeIn animation-delay-300">
                Master the art of geographic exploration with our comprehensive guide
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="bg-gray-900">
          {/* Game Rules */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-white">Game Rules</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Basic Gameplay</h3>
                    <ul className="space-y-3 text-white/80">
                      <li>• You'll be shown a street-level view of a location</li>
                      <li>• Explore the surroundings by moving and rotating the view</li>
                      <li>• Place your guess on the world map</li>
                      <li>• You have 5 rounds to accumulate points</li>
                      <li>• Each round has a time limit of 3 minutes</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Scoring System</h3>
                    <ul className="space-y-3 text-white/80">
                      <li>• Maximum 5000 points per round</li>
                      <li>• Points decrease based on distance from actual location</li>
                      <li>• Perfect guess (within 150m): 5000 points</li>
                      <li>• Wrong continent: Maximum 500 points</li>
                      <li>• Total possible score: 25,000 points</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips & Tricks */}
          <section className="py-16 bg-black/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-white">Pro Tips</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Visual Clues</h3>
                    <ul className="space-y-4 text-white/80">
                      <li className="flex items-start gap-3">
                        <span className="text-white/60">1.</span>
                        <p>Look for road signs and their languages</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-white/60">2.</span>
                        <p>Check which side of the road vehicles are driving on</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-white/60">3.</span>
                        <p>Notice architectural styles and building materials</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-white/60">4.</span>
                        <p>Observe vegetation and climate indicators</p>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-white">Regional Characteristics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-white mb-2">Europe</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Narrow streets and historic architecture</li>
                          <li>• EU-style license plates</li>
                          <li>• Distinctive road markings</li>
                          <li>• Roundabouts common</li>
                          <li>• Cobblestone streets</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">North America</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Wide roads and highways</li>
                          <li>• Yellow school buses</li>
                          <li>• Distinctive street signs</li>
                          <li>• Grid-based cities</li>
                          <li>• Large parking lots</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Asia</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Dense urban development</li>
                          <li>• Unique script on signs</li>
                          <li>• Scooters/motorcycles common</li>
                          <li>• Street food vendors</li>
                          <li>• Traditional temples</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                      <div>
                        <h4 className="font-medium text-white mb-2">South America</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Spanish/Portuguese signs</li>
                          <li>• Colorful buildings</li>
                          <li>• Mountain backdrops</li>
                          <li>• Soccer fields common</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Africa</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Red soil common</li>
                          <li>• Mix of modern/traditional</li>
                          <li>• Distinctive vegetation</li>
                          <li>• Unpaved roads frequent</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Oceania</h4>
                        <ul className="text-white/80 space-y-2">
                          <li>• Left-side driving</li>
                          <li>• Wide open spaces</li>
                          <li>• Unique wildlife signs</li>
                          <li>• Beach culture visible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold mb-8 text-white">Ready to Test Your Skills?</h2>
              <button
                onClick={() => router.push('/game')}
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-medium
                         transition-all duration-500 ease-in-out
                         shadow-lg hover:shadow-2xl
                         relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors ease-in">Start Playing</span>
                <span className="absolute inset-0 bg-gradient-to-br from-gray-500/40 to-gray-600/40 
                               opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in
                               group-hover:animate-pulse rounded-lg"></span>
                <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-white/10 to-white/5 opacity-0 
                               group-hover:opacity-100 transition-all duration-500 ease-in blur-sm"></span>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent
                               transform translate-y-[1px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100
                               transition-all duration-500 ease-in"></span>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        .animation-delay-700 {
          animation-delay: 700ms;
        }
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .animate-slowZoom {
          animation: slowZoom 30s ease-in-out infinite alternate;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite alternate;
        }
        .animate-floatSlow {
          animation: float 8s ease-in-out infinite alternate;
        }
        .animate-slideInUp {
          animation: slideInUp 1s ease-out forwards;
        }
        .animate-slideInFromLeft {
          animation: slideInFromLeft 1s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 5s linear infinite;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slowZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(5px); }
        }
        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInFromLeft {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .7; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
