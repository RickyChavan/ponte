# Ponte frontend

React + TypeScript + Vite + Tailwind CSS 4 + daisyUI 5.

```bash
npm install
npm run dev      # http://localhost:5173 (proxies /api to the Python backend on :8000)
npm run build    # type-check and production build into dist/
```

- Design system: Hallmark tokens in `src/tokens.css` (colours, fonts, spacing), base rules in `src/base.css`, the page's own rules in `src/index.css`. Change colours and fonts in `tokens.css`.
- Sections: `src/components/Sections.tsx`, form: `src/components/Contact.tsx`, nav `Header.tsx`, footer `Footer.tsx`.
- **Your photographs:** copy files into `public/photos/`, then set `src` (and `alt`) for `hero`, `founder-1` and `founder-2` in `src/photos.ts`. The hero currently shows a credited Wikimedia Commons stand-in; the founder frames stay plain until you add pictures. Replace the dashed "Founder name and role" captions in `Sections.tsx` (`About`) and the "Why we built Ponte." text with the founders' real names and story.
- daisyUI and Tailwind are still installed but no longer imported; add `@import "tailwindcss"; @plugin "daisyui";` at the top of `src/index.css` to use them again.
- The contact form posts to the Python backend through `submitContact()` in `src/lib/api.ts`; set the backend address in `public/config.js` when hosting (see `docs/hosting-prototype.md`).
- The earlier plain HTML/CSS/JS version is kept in `../design/prototype-static/`.
