# Ponte frontend

React + TypeScript + Vite + Tailwind CSS 4 + daisyUI 5.

```bash
npm install
npm run dev      # http://localhost:5173 (proxies /api to the Python backend on :8000)
npm run build    # type-check and production build into dist/
```

- Design (branch `ui-ux-pro`): a portfolio-style layout, large editorial headline, a hero photograph, the roles as a hover index, hairline rules and one accent, chosen with the UI/UX Pro Max skill (Portfolio Grid pattern, Minimalism and Swiss style). Light and dark themes live in `src/tokens.css` (the nav's sun/moon button switches and remembers the choice); layout rules are in `src/index.css`, base rules in `src/base.css`.
- Sections: `src/components/Sections.tsx`, form: `src/components/Contact.tsx`, nav `Header.tsx`, footer `Footer.tsx`.
- **Your photographs:** copy files into `public/photos/`, then set `src` (and `alt`) for `hero`, `founder-1` and `founder-2` in `src/photos.ts`. The hero currently shows a credited Wikimedia Commons stand-in; the founder frames stay plain until you add pictures. Replace the dashed "Founder name and role" captions in `Sections.tsx` (`About`) and the "Why we built Ponte." text with the founders' real names and story.
- daisyUI and Tailwind are still installed but no longer imported; add `@import "tailwindcss"; @plugin "daisyui";` at the top of `src/index.css` to use them again.
- The contact form posts to the Python backend through `submitContact()` in `src/lib/api.ts`; set the backend address in `public/config.js` when hosting (see `docs/hosting-prototype.md`).
- The earlier plain HTML/CSS/JS version is kept in `../design/prototype-static/`.
