<a name="readme-top"></a>

<div align="center">
  <h1>GeoQuest 🌍</h1>
  <p>An immersive geography exploration game that tests your knowledge of locations around the world through street-level imagery, interactive maps, and engaging gameplay mechanics.</p>
  
  <a href="https://geog-eight.vercel.app/"><img src="https://img.shields.io/badge/Geo-Quest-0066FF?style=for-the-badge&logo=vercel&logoColor=white" alt="GeoQuest"></a>


</div>


Welcome to GeoQuest! A modern geography game built with Next.js and React that challenges players to identify locations from street-level imagery around the globe. With an intuitive interface, real-time scoring, and comprehensive game statistics, it's perfect for geography enthusiasts, travelers, educators, and anyone looking to expand their world knowledge in an engaging way!

## ✨ Key Features

* 🗺️ **Global Exploration**
  </br>Discover locations from all around the world with street-level imagery

* 🔍 **Interactive Maps**
  </br>High-quality interactive world maps to pinpoint your guesses with precision

* 📊 **Score Tracking**
  </br>Detailed round-by-round scoring with distance calculations

* 🏆 **Performance Summary**
  </br>Comprehensive game summary with total score, average accuracy, best round, and detailed statistics. Includes shareable results and performance graphs

* 📱 **Responsive Design**
  </br>Play seamlessly on desktop, tablet, or mobile devices with a fully responsive UI that adapts to any screen size. Touch-optimized controls for mobile players

* 🎮 **Five-Round Games**
  </br>Each game consists of five challenging rounds with increasing difficulty and diverse locations. Features unique location selection algorithm to ensure variety

## 🎮 How to Play

1. You'll be shown a street-level image from somewhere in the world, powered by Mapillary's global imagery
2. Look for clues in the image about your location - architecture, road signs, vegetation, driving side, etc.
3. Click or tap on the interactive world map to place your guess marker
4. Click "Make Guess" to submit your location and see how close you were
5. Your score is calculated based on the distance between your guess and the actual location using a custom scoring algorithm
6. After 5 rounds, view your final score, statistics, and performance breakdown with detailed metrics

## 🔧 Technologies Used

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Mapillary-3B5998?style=for-the-badge&logo=mapillary&logoColor=white" alt="Mapillary">
</div>

## 🚀 Getting Started


  <a href="#-getting-started"><img src="https://img.shields.io/badge/🔧%20How%20to%20Install-808080?style=for-the-badge" alt="How to Install"></a>

  
### Prerequisites
- Node.js 18+ installed
- A Mapillary API key (free)
- NPM or Yarn package manager

### Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd geoquest
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

## 🗺️ Getting a Mapillary API Key

1. Go to [Mapillary Developers](https://www.mapillary.com/developer)
2. Sign up for a free account
3. Create a new application
4. Copy your client ID and add it to `.env.local`

## 🎯 Features Coming Soon

* 🌐 User accounts and leaderboards
* 🏙️ City and country challenge modes
* 🔄 Daily challenges with unique locations
* 🔍 Zoom and street view controls
* 🎭 Multiplayer mode for competing with friends

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Screenshots

<div align="center">
  <p><i>Screenshots coming soon!</i></p>
</div>

<div align="center">
  <a href="https://geog-eight.vercel.app/"><img src="https://img.shields.io/badge/🌍%20Play%20GeoQuest%20Now-4285F4?style=for-the-badge" alt="Play GeoQuest Now"></a>
</div>

<div align="center">
<br>


  Built with ♥️ by Shivansh Pratap Singh.
</div>
