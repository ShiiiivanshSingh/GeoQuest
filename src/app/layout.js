import { montserrat } from './fonts'
import './globals.css'
import "leaflet/dist/leaflet.css";

export const metadata = {
  title: 'GeoQuest',
  description: 'Test your geography knowledge and explore the world',
  icons: {
    icon: [
      {
        url: '/globe-favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: 'any',
      }
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/globe-favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-mont min-h-screen bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
