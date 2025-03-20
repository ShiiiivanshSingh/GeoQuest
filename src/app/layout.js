import { Inter } from 'next/font/google';
import "./globals.css";
import "leaflet/dist/leaflet.css";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "GeoGuessr Clone",
  description: "A location guessing game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-900 text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
