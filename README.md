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

### 🌐 Live Site

**Your app is live at:** https://professors-keyboard.netlify.app

### Automatic Deployments

The site is configured to automatically deploy via GitHub Actions when you push to `main`.

**To enable automatic deployments, add these GitHub secrets:**
1. Go to: https://github.com/KenAdler/professors-keyboard/settings/secrets/actions
2. Add `NETLIFY_AUTH_TOKEN`: `nfp_qZuPN5zAfmK5MDb9PRMT13ZLVaHPxp8P60e9`
3. Add `NETLIFY_SITE_ID`: `f243168c-0e79-40e8-a3da-f8a48e77b00f`

After adding the secrets, every push will automatically deploy!

### Manual Deployment

See [DEPLOY_NETLIFY.md](DEPLOY_NETLIFY.md) or [NETLIFY_API_SETUP.md](NETLIFY_API_SETUP.md) for details.

### Other Platforms

This project is also configured for:
- Vercel
- GitHub Pages

**📖 See [SETUP.md](SETUP.md) for detailed deployment instructions!**

## Technologies Used

- React 18
- Vite
- Web Audio API
- SVG for staff rendering

## License

MIT

