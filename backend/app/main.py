import csv
import hmac
import io
import json
from contextlib import asynccontextmanager

from fastapi import BackgroundTasks, Depends, FastAPI, Header, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from . import db
from .config import Settings, get_settings
from .notify import notify_new_submission
from .ratelimit import RateLimiter
from .schemas import CONSENT_TEXT_VERSION, ContactIn

CSV_UNSAFE_PREFIXES = ("=", "+", "-", "@", "\t", "\r")


def csv_safe(value) -> str:
    """Stop spreadsheet apps from running formulas in user-supplied text."""
    text = "" if value is None else str(value)
    return "'" + text if text.startswith(CSV_UNSAFE_PREFIXES) else text


def client_ip(request: Request, settings: Settings) -> str:
    if settings.trust_proxy:
        forwarded = request.headers.get("x-forwarded-for", "")
        if forwarded:
            return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings or get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        db.init_db(settings.database_path)
        yield

    app = FastAPI(title="Ponte API", docs_url="/api/docs", openapi_url="/api/openapi.json", lifespan=lifespan)
    app.state.settings = settings
    app.state.limiter = RateLimiter(settings.rate_limit_max, settings.rate_limit_window_seconds)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.origins,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "X-Admin-Token"],
    )

    def require_admin(request: Request, x_admin_token: str | None = Header(default=None)) -> None:
        expected = request.app.state.settings.admin_token
        if not expected:
            raise HTTPException(status_code=404, detail="Not found")
        if not x_admin_token or not hmac.compare_digest(x_admin_token.encode(), expected.encode()):
            raise HTTPException(status_code=401, detail="Invalid or missing admin token")

    @app.get("/api/health")
    def health():
        return {"ok": True}

    @app.post("/api/contact", status_code=201)
    def contact(payload: ContactIn, request: Request, background: BackgroundTasks):
        if not request.app.state.limiter.allow(client_ip(request, settings)):
            return JSONResponse(
                {"detail": "Too many requests. Please try again in a few minutes."}, status_code=429
            )
        if payload.website:  # honeypot: pretend success, store nothing
            return JSONResponse({"ok": True}, status_code=200)

        data = payload.model_dump(exclude={"website", "consent"})
        sub_id = db.insert_submission(settings.database_path, data, CONSENT_TEXT_VERSION)
        background.add_task(notify_new_submission, settings, {**data, "id": sub_id})
        return {"ok": True, "id": sub_id}

    @app.get("/api/admin/submissions", dependencies=[Depends(require_admin)])
    def admin_list(limit: int = Query(100, ge=1, le=500), offset: int = Query(0, ge=0)):
        return db.list_submissions(settings.database_path, limit, offset)

    @app.get("/api/admin/submissions.csv", dependencies=[Depends(require_admin)])
    def admin_csv():
        rows = db.list_submissions(settings.database_path, limit=100_000)
        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow(db.COLUMNS)
        for r in rows:
            out = []
            for col in db.COLUMNS:
                v = r[col]
                if col == "needs" and v:
                    v = json.dumps(v)
                out.append(v if col in ("id", "phone") else csv_safe(v))
            writer.writerow(out)
        return Response(
            buf.getvalue(),
            media_type="text/csv",
            headers={"Content-Disposition": 'attachment; filename="ponte-submissions.csv"'},
        )

    return app


app = create_app()
