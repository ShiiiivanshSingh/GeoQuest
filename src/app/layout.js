import { montserrat } from './fonts'
import './globals.css'
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: 'GeoGuessr Clone',
  description: 'A location guessing game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="font-mont">{children}</body>
    </html>
  )
}
