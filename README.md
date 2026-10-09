# Lumière landing page

Landing page for the Lumière DRC sovereign carbon registry, recreated from the
Figma Make project "Lumiere landing page with animations".

Built with React 19, Vite and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Structure

- `src/App.tsx` — page markup, content data, and the scroll-reveal / stewardship parallax hooks
- `src/index.css` — all styling and animations (hero word reveal, nav slide-in, hover effects, scroll reveals)
- `public/assets/` — photos and icons referenced by `App.tsx`
- `src/imports/` — Lumière logo
