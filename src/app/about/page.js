'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';

export default function AboutUs() {
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
      
      {/* Content Container - Ensures content flows over the fixed background */}
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
          <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight animate-slideInUp">
                About GeoQuest
              </h1>
              <p className="text-white/80 text-xl mb-8 tracking-wide animate-fadeIn animation-delay-300">
              Explore the world and test your geographic knowledge with our immersive game experience
            </p>
          </div>
        </div>
      </section>

        {/* Content Sections with Solid Background */}
        <div className="bg-gray-900 pt-8">
      {/* Project Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                  <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                  <p className="text-lg text-white/80 mb-6">
                GeoQuest was created to make geography learning fun and engaging. We believe that
                understanding our world's geography is essential in today's connected global society.
              </p>
                  <p className="text-lg text-white/80 mb-8">
                Our interactive game challenges players to identify locations around the world using 
                street-level imagery, helping develop spatial awareness and global knowledge.
              </p>
              <button 
                onClick={() => router.push('/game')}
                    className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-medium
                         transition-all duration-500 ease-in-out
                         shadow-lg hover:shadow-2xl
                         relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-transform duration-500 ease-in group-hover:translate-y-[-2px] inline-block">Play Now</span>
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
            <div className="relative">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-1">
                    <div className="bg-black/40 rounded-2xl p-8">
                      <h3 className="text-2xl font-semibold mb-6 text-white">How It Works</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                          <div className="bg-white/10 rounded-full p-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Explore Real Locations</h4>
                            <p className="text-white/60">View street-level imagery from around the world</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                          <div className="bg-white/10 rounded-full p-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Make Your Guess</h4>
                            <p className="text-white/60">Pin the location on the world map</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                          <div className="bg-white/10 rounded-full p-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Score Points</h4>
                            <p className="text-white/60">Earn points based on your accuracy</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                          <div className="bg-white/10 rounded-full p-2 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Review Results</h4>
                            <p className="text-white/60">See your final score and compare with others</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Features */}
          <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Game Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Global Exploration</h3>
                  <p className="text-white/60">
                Discover and explore locations from all around the world with our extensive database of street-view imagery.
              </p>
            </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Interactive Maps</h3>
                  <p className="text-white/60">
                High-quality interactive world maps that allow you to pinpoint your guess with precision.
              </p>
            </div>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:transform hover:translate-y-[-5px] transition-all duration-300">
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Score Tracking</h3>
                  <p className="text-white/60">
                Detailed round-by-round scoring with distance calculations and a final summary of your performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
          <section className="py-20 bg-black/60">
            <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">Ready to Test Your Geography Knowledge?</h2>
                <p className="text-white/80 text-xl mb-10">
              Challenge yourself with GeoQuest and see how well you know our world.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => router.push('/game')}
                    className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-medium
                         transition-all duration-500 ease-in-out
                         shadow-lg hover:shadow-2xl
                         relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-transform duration-500 ease-in group-hover:translate-y-[-2px] inline-block">Play Now</span>
                    <span className="absolute inset-0 bg-gradient-to-br from-gray-500/40 to-gray-600/40 
                                   opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in
                                   group-hover:animate-pulse rounded-lg"></span>
                    <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-white/10 to-white/5 opacity-0 
                                   group-hover:opacity-100 transition-all duration-500 ease-in blur-sm"></span>
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent
                                   transform translate-y-[1px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100
                                   transition-all duration-500 ease-in"></span>
              </button>
              <Link
                href="/"
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 py-4 px-8 rounded-lg
                       hover:bg-white/20 transition-all duration-300 font-medium"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </section>

          {/* Contribute Section - New */}
          <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Contribute to GeoQuest</h2>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                  <p className="text-white/80 text-lg mb-6">
                    GeoQuest is an open-source project and contributions are welcome! Here's how you can help:
                  </p>
                  <ol className="list-decimal pl-5 space-y-3 text-white/80 mb-8">
                    <li>Fork the repository on GitHub</li>
                    <li>Create your feature branch (<span className="text-white/60 font-mono text-sm">git checkout -b feature/AmazingFeature</span>)</li>
                    <li>Make your changes</li>
                    <li>Commit your changes (<span className="text-white/60 font-mono text-sm">git commit -m 'Add some AmazingFeature'</span>)</li>
                    <li>Push to the branch (<span className="text-white/60 font-mono text-sm">git push origin feature/AmazingFeature</span>)</li>
                    <li>Open a Pull Request</li>
                  </ol>
                  <div className="flex justify-center">
                    <a
                      href="https://github.com/ShiiiivanshSingh/GeoQuest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-medium
                           transition-all duration-500 ease-in-out
                           shadow-lg hover:shadow-2xl
                           relative overflow-hidden flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span className="relative z-10 transition-transform duration-500 ease-in-out group-hover:translate-y-[-2px] inline-block">View on GitHub</span>
                      <span className="absolute inset-0 bg-gradient-to-br from-gray-600/40 to-gray-800/40 
                                   opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out
                                   group-hover:animate-pulse rounded-lg"></span>
                      <span className="absolute -inset-px rounded-lg bg-gradient-to-br from-white/10 to-white/5 opacity-0 
                                   group-hover:opacity-100 transition-all duration-500 ease-in-out blur-sm"></span>
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent
                                   transform translate-y-[1px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100
                                   transition-all duration-500 ease-in-out"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer with Social Links - Updated */}
          <footer className="bg-black/70 backdrop-blur-sm py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-6">GeoQuest</div>
                
                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                  <a href="https://github.com/ShiiiivanshSingh/GeoQuest" target="_blank" rel="noopener noreferrer" 
                     className="text-white/60 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" 
                     className="text-white/60 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" 
                     className="text-white/60 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Links */}
                <div className="flex gap-6 mb-6 flex-wrap justify-center">
                  <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
                  <Link href="/about" className="text-white/60 hover:text-white transition-colors">About</Link>
                  <Link href="/game" className="text-white/60 hover:text-white transition-colors">Play</Link>
                  <a href="https://github.com/ShiiiivanshSingh/GeoQuest" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a>
                </div>
                
                <div className="text-white/60 text-sm">
                  © {new Date().getFullYear()} GeoQuest. by Shivansh!
            </div>
          </div>
        </div>
      </footer>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
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