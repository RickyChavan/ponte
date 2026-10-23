# Ponte

Management-as-a-service for MSMEs and startups that need the right team to grow.

## Roadmap
1. **Design** (`design/`) — brand, UX research, wireframes, UI design system
2. **Frontend** (`frontend/`) — public website and client portal
3. **Backend** (`backend/`) — API, data, auth, integrations
4. **Hosting** — deploy under the Ponte domain (domain + DNS + SSL)

## Structure
| Folder | Purpose |
|---|---|
| `design/` | Brand, wireframes, design tokens, Figma exports |
| `frontend/` | Web UI code |
| `backend/` | API / server code |
| `docs/` | Product notes, decisions, deployment runbook |

## Status
Design phase in progress (brand brief, tokens, sitemap, copy deck, contact flow, home wireframe in `design/`).

Frontend: `frontend/` (React + Vite + Tailwind + daisyUI), see `frontend/README.md`. The earlier plain HTML/CSS/JS prototype lives in `design/prototype-static/`. Lovable was tried but paused for lack of credits; the brief is in `design/lovable-prompt.md` if we want to revisit it.

Hosting the prototype (InfinityFree site + PythonAnywhere API): see `docs/hosting-prototype.md`; build the upload packages with `scripts/package-hosting.sh`.

## Tech stack (decided)
- Frontend: React, TypeScript, Vite, Tailwind CSS 4, daisyUI 5 (switched from plain HTML/CSS/JS on 2026-10-22)
- Backend: Python, FastAPI + SQLite (WSGI wrapper for shared hosts)
- Domain: ponte.co.in (bought); prototype hosting: InfinityFree (site) + PythonAnywhere (API), see docs/hosting-prototype.md
