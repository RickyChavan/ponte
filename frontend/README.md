# Ponte frontend

React + TypeScript + Vite + Tailwind CSS 4 + daisyUI 5.

```bash
npm install
npm run dev      # http://localhost:5173 (proxies /api to the Python backend on :8000)
npm run build    # type-check and production build into dist/
```

- Theme: custom daisyUI theme `ponte` in `src/index.css` (change colours there; other daisyUI themes can be added in the `@plugin "daisyui"` block).
- Sections: `src/components/Sections.tsx`, form: `src/components/Contact.tsx`.
- The contact form calls `submitContact()` in `src/lib/api.ts`, currently a stub. Replace it with a POST to `/api/contact` when the backend exists.
- The earlier plain HTML/CSS/JS version is kept in `../design/prototype-static/`.
