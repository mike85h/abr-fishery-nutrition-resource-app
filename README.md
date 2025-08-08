## ABR Fishery Nutrition Resource

A React + Vite application to browse nutritional information of NOAA Fisheries Regions and their associated fish species.

---

### Table of Contents

1. [Overview](#overview)  
2. [Prerequisites](#prerequisites)  
3. [Getting Started](#getting-started)  
   - [Installation](#installation)  
   - [Running the App](#running-the-app)  
   - [Building for Production](#building-for-production)  
4. [Project Structure](#project-structure)  
5. [Available Scripts](#available-scripts)  
6. [Core Concepts](#core-concepts)  
   - [Routing](#routing)  
   - [Data Fetching & Grouping](#data-fetching--grouping)  
7. [Components](#components)  
8. [Pages](#pages)  
9. [Data Files](#data-files)  
10. [Styling](#styling)  
11. [ESLint Configuration](#eslint-configuration)  
12. [Customizing API Endpoint](#customizing-api-endpoint)  
13. [Contributing](#contributing)  
14. [License](#license)  

---

## Overview

This project provides a front-end interface for the ABR Fishery Nutrition Resource coding challenge. It fetches fish nutrition data from a local server endpoint and lets users:

- View all NOAA Fishery Regions  
- See average Calories and Fat per region  
- Drill down into a region to view each species’ image and nutrition facts  

---

## Prerequisites

- **Node.js** (v14+) and **npm** (or yarn)  
- A running instance of the ABR coding challenge server at `http://localhost:5001` with a valid API key  

---

## Getting Started

### Installation

```bash
git clone <your-repo-url>
cd gofish-react-app
npm install
```

### Running the App

```bash
npm run dev
```

By default, Vite serves the app at `http://localhost:5173`.

### Building for Production

```bash
npm run build
npm run preview
```

- **build** outputs static assets to `dist/`  
- **preview** spins up a local static server to serve `dist/`  

---

## Project Structure

```
.
├── public/
│   └── [static assets]
├── src/
│   ├── assets/
│   │   └── favicon.ico
│   ├── components/
│   │   └── NavBar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── RegionPage.jsx
│   │   └── fishData.json    <!-- Sample data for offline/testing -->
│   ├── data/
│   │   └── data.json        <!-- Placeholder -->
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Available Scripts

- **npm run dev** - Start development server (HMR)  
- **npm run build** - Bundle for production  
- **npm run preview** - Preview production bundle  

---

## Core Concepts

### Routing

- Uses **React Router v6**  
- Defined in `src/main.jsx`:
  - `/` → `<Home />`  
  - `/region/:regionName` → `<RegionPage />`  

### Data Fetching & Grouping

- **Home.jsx**  
  - Fetches all fish entries from `/gofish?apikey=...`  
  - Groups by `NOAAFisheriesRegion` with `Object.groupBy`  
  - Calculates average Calories and TotalFat per region  
- **RegionPage.jsx**  
  - Re-fetches data, filters for the selected region  
  - Computes region averages, then renders each species  

---

## Components

### NavBar (`src/components/NavBar.jsx`)

- Simple navigation bar with a link to Home  
- Inline styling for padding and border  

### App Layout (`src/App.jsx`)

- Renders `NavBar` and a `<main>` that hosts nested routes via `<Outlet />`  

---

## Pages

### Home (`src/pages/Home.jsx`)

- **State:** `regions` (array of `{ region, avgCalories, avgFat }`)  
- **Lifecycle:** Fetch & process data on mount (`useEffect`)  
- **UI:** List of clickable region names  

### RegionPage (`src/pages/RegionPage.jsx`)

- **Params:** `regionName` from URL  
- **State:** `fishList` and `regionInfo` (contains avg metrics)  
- **UI:** Region summary and list of species with images & nutrition facts  

---

## Data Files

- **fishData.json** – Sample JSON payload for development/testing  
- **data.json** – Currently empty placeholder  

---

## Styling

- **Global:** `src/index.css`  
- **App-specific:** `src/App.css`  
- Minimal, utility-style CSS for layout and spacing  

---

## ESLint Configuration

Defined in `eslint.config.js`, extending:

- `js.configs.recommended`  
- `react-hooks` (“recommended-latest”)  
- `react-refresh` for Vite  

Custom rule to ignore unused vars starting with an uppercase or underscore.  

---

## Customizing API Endpoint

Fetch URLs are hardcoded:

```js
fetch('http://localhost:5001/gofish?apikey=abrradiology')
```

To make this configurable:

1. Create a `.env` file:

   ```env
   VITE_API_URL=http://localhost:5001
   ```

2. Update fetch calls:

   ```bash
   fetch(`${import.meta.env.VITE_API_URL}/gofish?apikey=YOUR_KEY`)
   ```

---

## Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/foo`)  
3. Commit your changes (`git commit -m 'Add foo'`)  
4. Push to branch (`git push origin feature/foo`)  
5. Open a Pull Request  

Please follow the existing code style and include tests when relevant.  

---

## License

Specify your license here (e.g., MIT).
