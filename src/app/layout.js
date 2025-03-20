import { montserrat } from './fonts'
import './globals.css'
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: 'GeoGuessr Clone',
  description: 'A location guessing game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="font-mont min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  )
}
