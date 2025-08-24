# ENTN - Underground Digital Zine

An experimental full-screen digital magazine that brings underground zine aesthetics to the web. ENTN is a living digital canvas that feels like stepping into an immersive, chaotic, but curated art space.

## 🎨 Concept

ENTN transforms the traditional magazine experience into something raw, experimental, and alive. Every page takes up the entire screen with no traditional scrolling article lists. Instead, content is revealed through animations, swipes, and cinematic transitions.

## ✨ Features

### Core Experience
- **Full-screen pages**: Each section fills the entire viewport
- **Cinematic transitions**: Swipe/slide/glitch/fade between sections
- **Interactive homepage**: Central ENTN logo with scattered navigation links
- **Dropdown filtering**: Filter by Day (daily entries) and Issue (thematic collections)
- **Keyboard navigation**: ← → to switch pages, ↑ ↓ to move within sections

### Experimental Design Systems

Each section has its own "insane design system":

- **glitchmouth** — Text flickers, webcam/FaceTime video overlays
- **outloud** — Event posters, loud colors, stacked typography
- **blurredmap** — Blurred photos, interactive maps that glitch on hover
- **looprot** — Rotating vinyl discs, music waveforms as background
- **scrapfile** — Cut-out collages, taped scans, handwriting fonts
- **textwreck** — Chaotic streams of text, shifting and sliding

### Underground Aesthetics
- **Experimental typography**: Oversized, rotated, stretched, distorted text
- **Glitch effects**: Text distortion, element breaking and reforming
- **Raw imperfection**: Torn textures, grain overlays, low-res images
- **Custom cursor**: Interactive cursor with blend modes
- **Grain overlay**: Dynamic film grain for authentic feel

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with React 18
- **Styling**: TailwindCSS + Custom CSS
- **Animations**: Framer Motion
- **Typography**: Custom web fonts (Space Grotesk, JetBrains Mono, Bebas Neue)
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd entn-urban-canvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Navigation

- **Mouse**: Hover effects, custom cursor interactions
- **Keyboard**:
  - `←` `→` Navigate between sections
  - `↑` `↓` Move within sections
  - `ESC` Return to homepage
  - `SPACE` Special interactions
- **Mobile**: Touch/swipe interactions

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── globals.css        # Global styles & experimental CSS
│   ├── layout.tsx         # Root layout with core components
│   ├── page.tsx           # Homepage
│   └── [section]/         # Dynamic section pages
├── components/
│   ├── CustomCursor.tsx   # Interactive cursor
│   ├── GrainOverlay.tsx   # Film grain effect
│   ├── KeyboardNavigation.tsx # Keyboard controls
│   ├── HomePage.tsx       # Main homepage component
│   ├── FilterDropdown.tsx # Day/Issue filtering
│   └── sections/          # Individual section components
└── types/                 # TypeScript definitions
```

## 🎨 Design Philosophy

ENTN embraces:
- **Controlled chaos**: Structured randomness in layouts and animations
- **Digital decay**: Glitch aesthetics and imperfection as features
- **Immersive experience**: Full-screen, no-distraction content
- **Underground culture**: Raw, experimental, anti-corporate design
- **Living canvas**: Dynamic, ever-changing visual elements

## 🔧 Customization

### Adding New Sections
1. Create a new directory in `src/app/[section-name]/`
2. Add `page.tsx` that imports your section component
3. Create the section component in `src/components/sections/`
4. Add the section to the navigation array in `HomePage.tsx`

### Modifying Aesthetics
- Global styles: `src/app/globals.css`
- Typography effects: CSS classes like `.text-glitch`, `.text-distorted`
- Color scheme: CSS custom properties in `:root`
- Animations: Framer Motion configurations in components

## 🌐 Deployment

Deploy on Vercel (recommended):
```bash
npm run build
```

Or deploy to any static hosting service that supports Next.js.

## 🎯 Future Enhancements

- [ ] Content Management System integration
- [ ] Audio/video media handling
- [ ] WebGL shader effects
- [ ] Real-time collaborative features
- [ ] Mobile-optimized touch interactions
- [ ] Performance optimizations for complex animations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**ENTN** - Where digital meets underground. Where chaos meets curation. Where the web becomes art.
