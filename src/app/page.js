'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Game component to avoid SSR issues with Leaflet
const Game = dynamic(() => import('../components/Game'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Game />
    </main>
  );
}
