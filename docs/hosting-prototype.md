# Hosting the prototype: InfinityFree (site) + PythonAnywhere (backend)

**Why two hosts.** InfinityFree runs PHP and MySQL only, so it can serve the React site as static files but cannot run the Python (FastAPI) backend. The backend goes on PythonAnywhere's free plan, which does run Python and keeps its files (so SQLite works). Items marked `[VERIFY]` come from general knowledge or secondary sources, not the hosts' current docs; check them in each dashboard.

You will do the account steps yourself; nothing here needs you to share a password with anyone.

## Live now: GitHub Pages (static site)

The portfolio-style build is published at https://rickychavan.github.io/ponte/ from the `gh-pages` branch (Settings > Pages > Deploy from a branch > `gh-pages` / root). The build uses relative asset paths (`base: './'` in `vite.config.ts`), so the same files also work at a domain root.

To republish after a change:

```bash
cd frontend && npm run build
# copy dist/ into a temp folder, add an empty .nojekyll file, git init, commit, then:
git push -f https://github.com/RickyChavan/ponte.git HEAD:gh-pages
```

Backend: the form needs the PythonAnywhere API (see below). When it is up, set `API_BASE` in the live `config.js` (edit `config.js` on the `gh-pages` branch) and add `https://rickychavan.github.io` to the backend's `ALLOWED_ORIGINS`.

## 0. Build the upload packages

```bash
cd "/Users/hrishikeshchavan/Downloads/claude code/ponte" && scripts/package-hosting.sh
```

This creates, in `deploy/` (git-ignored):
- `deploy/htdocs/` (and `ponte-site-infinityfree.zip` of the same): the site, ready to upload to InfinityFree. For a prototype it ships a `robots.txt` that blocks search engines and a `noindex` header.
- `deploy/ponte-backend.zip`: the backend, without `.env`, database or virtualenv.

## 1. Backend on PythonAnywhere

1. Create a free ("Beginner") account at https://www.pythonanywhere.com. Your username becomes the address: `https://<username>.pythonanywhere.com`.
2. **Files** tab → upload `ponte-backend.zip` to your home folder.
3. **Consoles** → start a Bash console and run (replace `<username>`; if `python3.13` is not offered, pick a version PythonAnywhere lists, 3.10 or newer `[VERIFY]`):

```bash
cd ~ && unzip -o ponte-backend.zip && cd backend
python3.13 -m venv .venv
.venv/bin/pip install -r requirements-wsgi.txt
mkdir -p ~/ponte-data
cp .env.example .env
nano .env
```

4. In `.env` set at least (save with Ctrl+O, exit with Ctrl+X):

```
DATABASE_PATH=/home/<username>/ponte-data/ponte.db
ADMIN_TOKEN=<a long random string; make one with: python3 -c "import secrets;print(secrets.token_urlsafe(32))">
ALLOWED_ORIGINS=https://ponte.infinityfree.io,http://ponte.infinityfree.io
```

   `ALLOWED_ORIGINS` must list the exact address people open your site at (the InfinityFree prototype domain), otherwise browsers will block the form. Leave `SLACK_WEBHOOK_URL` and `SMTP_*` empty for now (see notes below).

5. **Web** tab → "Add a new web app" → **Manual configuration** → pick the same Python version.
6. On the web app page:
   - **Virtualenv:** `/home/<username>/backend/.venv`
   - **WSGI configuration file:** open it, delete its contents and paste:

```python
import sys
sys.path.insert(0, "/home/<username>/backend")
from wsgi import application
```

   - Turn on **Force HTTPS**.
7. Click **Reload**. Open `https://<username>.pythonanywhere.com/api/health`; you should see `{"ok":true}`.

Notes:
- Free accounts get one worker and a fixed list of outbound sites; Slack alerts may or may not work, and SMTP email will not `[VERIFY]`. Submissions are always stored; read them at `https://<username>.pythonanywhere.com/api/admin/submissions` with the header `X-Admin-Token: <your token>` (use the CSV export at `/api/admin/submissions.csv` the same way).
- The rate limiter is in memory and resets when the app reloads.
- Free web apps usually need an "extend" click on the Web tab every few months or they are disabled `[VERIFY]`.
- ASGI servers are not available on the free plan, which is why `wsgi.py` wraps FastAPI with `a2wsgi`.

## 2. Site on InfinityFree

1. In your InfinityFree account, open the hosting account for your prototype domain and find the **FTP details** (host, username, password) `[VERIFY: wording]`, or use the **Online File Manager**.
2. Open the folder `htdocs` (this is the site's root). Delete InfinityFree's placeholder pages there (for example `index2.html` or a default `index.html`).
3. Upload **the contents** of `deploy/htdocs/` into `htdocs` (not the folder itself): `index.html`, `config.js`, `logo.svg`, `robots.txt`, `.htaccess` and the whole `assets/` folder.
   - With FileZilla, turn on *Server → Force showing hidden files* so `.htaccess` is visible and uploaded.
   - Keep the folder structure; `index.html` must sit directly in `htdocs`.
4. Edit `htdocs/config.js` on the server (File Manager editor, or edit locally and re-upload) so it reads:

```js
window.PONTE_CONFIG = { API_BASE: "https://<username>.pythonanywhere.com" };
```

   No trailing slash. No rebuild is needed when this changes.
5. Open your prototype address. If the browser warns about HTTPS, request InfinityFree's free SSL certificate for the domain in the client area `[VERIFY]` and wait for it to activate; until then use `http://` and make sure `ALLOWED_ORIGINS` lists that exact origin.

## 3. Test it

1. Open the site, scroll to the contact form and send a test enquiry.
2. Check the backend:

```bash
curl -H "X-Admin-Token: <your token>" https://<username>.pythonanywhere.com/api/admin/submissions
```

3. If the form shows "Something went wrong on our side": open the browser's developer tools → Console/Network. A CORS error means `ALLOWED_ORIGINS` does not match the address in the address bar; a failed request to the wrong place means `config.js` still has an empty or wrong `API_BASE`; a 404/500 means check the web app's error log on PythonAnywhere.
4. Delete your test row afterwards (stop and remove `~/ponte-data/ponte.db` on PythonAnywhere if it is only test data).

## Things to know about InfinityFree `[VERIFY]`

- It may show a short JavaScript check page to non-browser clients (curl, crawlers) on free domains, so use a browser to look at the site. This does not affect the form, because the form talks to PythonAnywhere.
- Free plans have daily hit and CPU limits and no SSH. They are fine for a prototype, not for launch.
- PHP's `mail()` is reportedly blocked, which does not matter here.
- When `ponte.co.in` goes live, repeat step 2 for that domain, add it to `ALLOWED_ORIGINS`, and remove the prototype `robots.txt` and `noindex` header (build the site without the prototype tweaks) so search engines can index it.

## What changed in the repo for hosting

- `frontend/public/config.js`: runtime `API_BASE` (empty in local dev, where the Vite proxy handles `/api`).
- `frontend/public/.htaccess`: compression and caching for Apache hosts.
- `backend/wsgi.py` and `backend/requirements-wsgi.txt`: run the API on WSGI hosts; `.env` and relative paths now resolve next to the backend files.
- `scripts/package-hosting.sh`: builds the packages above.
