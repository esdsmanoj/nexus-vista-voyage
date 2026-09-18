# FutureTech Nexus

Build an interactive futuristic corporate ecosystem portal based on the attached specification archive (futuristic-corporate-ecosystem-md.zip).

Key requirements:
1. Hierarchy & Navigation:
   - Parent Company ('FutureTech Group') → Child Companies (AI, Cloud, CyberSec, Quantum/Robotics) → Categories → Products → Interactive 3D Product Details.
   - Persistent breadcrumb trail with quick jumping (Parent / Company / Category / Product).
   - Interactive 2D/3D visual Ecosystem Map showing all company nodes, categories, and connection lines.

2. Visual Aesthetic:
   - Dark enterprise futuristic aesthetic: deep black/navy background (#070B14, #0A0F1D), glassmorphic panels, glowing cyan (#00F0FF) and violet/indigo accents.
   - Animated particle field/grid background with depth and subtle glowing connection rays.
   - High-contrast typography optimized for 16:9 displays and 4K event screens.

3. Interactive 3D Product Viewer:
   - Built-in 3D viewer using Three.js / React Three Fiber with procedural/geometric tech models (or customizable meshes), orbit controls (rotate, zoom, pan).
   - Camera presets: Front, Back, Left, Right, Top, Isometric.
   - Interactive hotspot callouts with technical annotations and specifications.
   - Auto-rotation toggle and wireframe/shaded view modes.

4. Event & Kiosk Experience:
   - Presentation / Kiosk mode with fullscreen support and large touch-friendly targets (48px+).
   - Inactivity timer with automatic reset to home.
   - Auto-demo tour mode cycling through companies and flagship products.

5. Search & Admin:
   - Global search modal (Cmd+K) indexing companies, categories, and products with instant preview.
   - Admin management view prototype to add, edit, or customize companies, categories, and product specs.

6. Data Fixtures:
   - Expand the sample dataset to 4 child companies (FutureTech AI, FutureTech Cloud, FutureTech CyberSec, FutureTech Quantum), with 3+ categories each, and 3+ products each with rich specs, benefits, features, and 3D configs.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nexus-vista-voyage.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2d754306-0ff8-46f8-8cb8-ab38dd7f5c0e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
