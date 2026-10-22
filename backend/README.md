# Ponte backend

FastAPI + SQLite. Receives the website contact form, stores it, and optionally alerts the team.

## Run (development)

```bash
cd backend
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
cp .env.example .env          # then set ADMIN_TOKEN (and optional Slack/SMTP)
.venv/bin/uvicorn app.main:app --reload --port 8000
```

The Vite dev server (`frontend`, `npm run dev`) proxies `/api` to port 8000. API docs: http://127.0.0.1:8000/api/docs

## Endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | liveness check |
| POST | `/api/contact` | founder or talent enquiry. 201 stored, 422 invalid, 429 rate limited. Honeypot field `website` returns 200 and stores nothing |
| GET | `/api/admin/submissions` | JSON list, header `X-Admin-Token: <ADMIN_TOKEN>`; `?limit=&offset=` |
| GET | `/api/admin/submissions.csv` | CSV export, same header; formulas neutralised |

Admin endpoints return 404 when `ADMIN_TOKEN` is empty and 401 for a wrong token.

```bash
curl -H "X-Admin-Token: $(grep ^ADMIN_TOKEN .env | cut -d= -f2)" http://127.0.0.1:8000/api/admin/submissions
```

## Alerts

Set `SLACK_WEBHOOK_URL` (a Slack incoming webhook, must be `https://hooks.slack.com/...`) and/or `SMTP_*` in `.env`. Failures are logged by type only and never break the form. WhatsApp is not implemented (needs a Meta WhatsApp Business API account); see `app/notify.py`.

## Privacy (India DPDP)

Each row stores the consent timestamp and the version of the consent text shown (`CONSENT_TEXT_VERSION` in `app/schemas.py`; bump it when the website wording changes). We do not store IP addresses or log request bodies. Still to decide by the owner: retention period and a process to delete a person's data on request.

## Tests

```bash
.venv/bin/python -m pytest
```

## Production notes

Run behind HTTPS (reverse proxy). Set `TRUST_PROXY=true` only if the proxy sets `X-Forwarded-For`; the rate limiter is in-memory, so run a single process or move it to Redis. Back up the SQLite file.
