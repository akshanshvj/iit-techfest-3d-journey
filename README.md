# Techfest IIT Bombay - 3D Interactive Website

A fully responsive, highly interactive 3D web experience representing a "Journey Through The Future".

## Demo Video
https://github.com/akshanshvj/iit-techfest-3d-journey/blob/main/demo.mp4

## Technologies Used
- **React** & **TypeScript**
- **Three.js** & **React Three Fiber** for 3D rendering
- **Drei** for 3D helpers and scroll controls
- **Framer Motion** for HTML UI animations
- **Tailwind CSS** for styling

## Getting Started

### Prerequisites
- Node.js (v18 or higher)

### Installation
1. Clone the repository or extract the source code.
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is recommended due to peer dependency mismatches between `@react-three/drei` and `postprocessing` versions, which is normal for React Three Fiber ecosystems)*

### Running Locally
Start the Vite development server:
```bash
npm run dev
```

### Production Build
Create an optimized production build:
```bash
npm run build
```
You can then preview the build with:
```bash
npm run preview
```

## Architecture Overview
- `src/App.tsx`: Main entry point, sets up the global Canvas and Post-Processing (Bloom).
- `src/components/canvas/Scene.tsx`: Orchestrates the 3D scroll journey using Drei's `ScrollControls`. Positions each section sequentially along the Z-axis.
- `src/components/canvas/sections/`: Contains the individual 3D environment models (Hero, AI Universe, Robotics Arena, Space Exploration, Innovation City, Nexus Finale).
- `src/components/ui/`: Contains the HTML overlay (`Overlay.tsx`) mapped to the scroll positions and the `LoadingScreen.tsx`.

## Deployment
The project is configured for generic static deployment (e.g., Vercel, Netlify, GitHub Pages).
For Vercel or Netlify, simply point the build command to `npm run build` and the output directory to `dist`.
