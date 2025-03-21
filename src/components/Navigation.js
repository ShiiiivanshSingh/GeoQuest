'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  // Don't show navigation on game page
  if (pathname === '/game') {
    return null;
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold tracking-wider animate-fadeIn cursor-pointer">
            <Link href="/">GeoQuest</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="text-white/70 hover:text-white transition-colors hover:translate-y-[-2px] transition-transform duration-200">Home</Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors hover:translate-y-[-2px] transition-transform duration-200">About</Link>
            <Link href="/game" className="text-white/70 hover:text-white transition-colors hover:translate-y-[-2px] transition-transform duration-200">Play</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 