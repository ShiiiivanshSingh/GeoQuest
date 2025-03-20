export default function LoadingAnimation() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
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
        <div>
          <h3 className="loading-title">Loading Map</h3>
          <p className="loading-subtitle">Preparing the world map...</p>
        </div>
      </div>
    </div>
  );
} 