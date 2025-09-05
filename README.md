# 🏠 MakaanWala

![React 19](https://img.shields.io/badge/React-19.1.0-61dafb?logo=react&labelColor=20232a)
![React Router](https://img.shields.io/badge/React%20Router-7.x-CA4245?logo=reactrouter&labelColor=20232a)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-0.180.0-black?logo=three.js)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

**MakaanWala** is a performance‑focused real estate experience for the Indian market featuring interactive 3D property visualisation, a rule‑driven AI assistant, and structured property data.

Live Demo: [makaanwala.vercel.app](https://makaanwala.vercel.app/)

---

## 🧭 Overview

MakaanWala delivers a modern property discovery journey:

- Immersive real‑time 3D previews for select properties using Three.js + react-three-fiber
- A contextual property assistant (rule-based conversational engine) that interprets budget, location and intent keywords
- Structured property catalogue with enriched metadata (amenities, features, nearby points, agents, model references)
- Fast, cache‑friendly static delivery via Vite build output & modern bundling
- Clean, modular React component architecture ready for scale

> Note: The current "AI" assistant is deterministic / rule driven (no remote LLM calls). It can be upgraded to a true LLM pipeline later without architectural friction.

---

## ✨ Core Features

| Category | Highlights |
|----------|------------|
| Property Discovery | Filter by type, budget, city, amenities; structured slugs for detail routes |
| Interactive 3D | GLTF + FBX models with automatic camera fitting, procedural fallback renderer |
| Conversational Helper | Budget extraction (lakh/crore), location & asset-type intent classification |
| Performance | Lazy loading, suspense loaders, shadow & tone‑mapping tuned for realism vs cost |
| Mobile UX | Responsive layout, touch gestures in 3D viewport, accessible navigation |
| Data Layer | Centralised `properties` dataset with model metadata and search utilities |
| Theming & Animations | CSS variables, intersection observer driven reveal animations |

---

## 3D & Visualization

| Property Model Type | Source | Loader | Target Scale Strategy |
|---------------------|--------|--------|-----------------------|
| Apartment (id:1) | `/models/apartments/scene.gltf` | GLTF | Bounding box fit → uniform scale |
| Luxury Villa (id:2) | `/models/modern-luxury-villa-house-building-with-pool/source/42.fbx` | FBX | Dynamic scale + center/ground offset |
| Office (id:3) | `/models/modern_office_building/scene.gltf` | GLTF | Box3 fit & camera auto framing |

---

## Architecture

```text
src/
 ├── components/        UI + feature components (Chatbot, Gallery, 3D Viewer, etc.)
 ├── data/              Structured domain datasets (properties, blogs)
 ├── hooks/             Reusable behaviour (scroll animations)
 ├── utils/             Pure helpers (animations, property utils, theme manager)
 ├── styles/            Global + responsive CSS
 ├── App.jsx            Route & layout composition
 └── main.jsx           Application bootstrap
public/
 └── models/            3D assets (each with individual license.txt)
```
---

## Tech Stack

- React 19 (functional components + hooks)
- React Router 7 (client navigation)
- Three.js + @react-three/fiber + @react-three/drei (3D rendering abstractions)
- Vite 5 (dev & production bundling)
- ESLint (strict rules; no unused disable directives)
- lucide-react (iconography)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled with Node) or yarn / pnpm

### Installation

```bash
git clone https://github.com/harshitt13/MakaanWala.git
cd MakaanWala
npm install
npm run dev
```
Visit: <http://localhost:5173> (or the port shown in terminal)

### Production Build

```bash
npm run build    # Generate optimized assets
npm run preview  # Local preview of dist
npm run lint     # Static analysis
```

> No environment variables are required in the current version. All data is static / in‑repo.

---

## 🧪 Development Workflow

1. Branch: `git checkout -b feat/<short-description>`
2. Code: follow ESLint guidance; keep components focused
3. Test locally: `npm run dev` + interactive usage
4. Lint & build: `npm run lint && npm run build`
5. Commit using Conventional Commits: `feat: add villa comparison widget`
6. Open PR with context + screenshots (3D / responsive views encouraged)

Commit style examples:

- `feat: add auto camera fit for FBX models`
- `fix: stabilize shadow bias in 3D viewer`
- `refactor: extract budget parser`

---

## 🏎 Performance & Optimization

- Vite native ESBuild transforms → sub‑second cold starts
- Suspense + granular lazy loading for 3D + ancillary views
- Procedural geometry fallback avoids stalled network for 3D
- Tone mapping + limited shadow cascade to balance realism vs GPU cost
- Texture colorSpace normalization to SRGB
- Debounced conversational updates for smoother typing experience

---

## 🎨 Design System

Color Tokens:

```text
Primary:    #1a365d
Secondary:  #2d3748
Accent:     #3182ce
Success:    #38a169
Text:       #1a202c
Background: #ffffff
```
Typography: System font stack for performance & cross‑platform rendering consistency.

Breakpoints:

```text
< 480px   Mobile
481–768px Tablet
> 768px   Desktop
```

---

## 🤖 AI Assistant Notes

Current implementation:

- Pure client‑side rule & keyword engine (no external API calls)
- Budget extraction supports: `50 lakh`, `1.2 cr`, `85L`, `1 cr` pattern forms
- Branch logic for property type, location, loan inquiries, scheduling, gratitude, greetings

---

## 🗂 3D Assets & Licensing

All third‑party 3D models bundled in `public/models` retain their original licensing. Each model directory already includes its respective `license.txt` file:

```text
public/models/
 ├── apartments/                             (contains license.txt)
 ├── modern_office_building/                 (contains license.txt)
 └── modern-luxury-villa-house-building-with-pool/ (contains license.txt)
```

Usage Policy:

- Do not remove or alter the included license files
- When re‑distributing, ensure each model’s `license.txt` accompanies the asset
- If replacing assets, add a new `license.txt` documenting the source & terms

If you introduce additional GLTF/FBX models, follow the same directory pattern and include attribution per the provider’s requirements.

---

## Support

Connect:

- GitHub: [github.com/harshitt13](https://github.com/harshitt13)
- LinkedIn: [linkedin.com/in/harshitt13](https://linkedin.com/in/harshitt13)

---

## License

Released under the MIT License – see [`LICENSE`](LICENSE).

> Third‑party 3D assets retain their own licenses (already included beside each model). You are responsible for compliance when re‑using them outside this repository.

---

**MakaanWala** – Transforming Indian Real Estate with 3D & Assistive Intelligence

