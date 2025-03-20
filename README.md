# GeoGuessr Clone with Mapillary

A free GeoGuessr clone built with Next.js, React, and Mapillary for street-level imagery.

## Features

- Free street-level imagery from Mapillary
- Interactive map for location guessing
- Score calculation based on distance
- Modern, responsive UI with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- A Mapillary API key (free)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd geoguessr-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Mapillary API key:
```
NEXT_PUBLIC_MAPILLARY_CLIENT_ID=your_mapillary_client_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing!

## How to Play

1. You'll be shown a street-level image from somewhere in the world
2. Look for clues in the image about your location
3. Click on the map to place your guess
4. Click "Submit Guess" to see how close you were
5. Your score is based on the distance between your guess and the actual location
6. Click "New Game" to play again

## Getting a Mapillary API Key

1. Go to [Mapillary Developers](https://www.mapillary.com/developer)
2. Sign up for a free account
3. Create a new application
4. Copy your client ID and add it to `.env.local`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
