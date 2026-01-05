# The Professor's Keyboard

An interactive web application that combines a 4-octave piano keyboard with a musical staff. Click on piano keys to see notes appear on the staff, or click on the staff to play corresponding keys!

## Features

- 🎹 **4-Octave Piano Keyboard**: Full range from C2 to C6
- 🎵 **Musical Staff Display**: Visual representation of notes in treble clef
- 🔄 **Bidirectional Interaction**: 
  - Click piano keys → Notes appear on staff and sound plays
  - Click staff positions → Corresponding keys play and depress
- 🎶 **Real-time Audio**: Web Audio API generates piano-like tones

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/professors-keyboard.git
cd professors-keyboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### 🚀 Deploy to Vercel (Recommended)

**One-click deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KenAdler/professors-keyboard)

Or follow the steps in [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)

**After deployment:**
- Your site will be live at: `https://professors-keyboard.vercel.app` (or similar)
- Every push to `main` automatically deploys
- Preview deployments for every pull request

### Other Platforms

This project is also configured for:
- GitHub Pages
- Netlify (see [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md) if needed)

## Technologies Used

- React 18
- Vite
- Web Audio API
- SVG for staff rendering

## License

MIT

