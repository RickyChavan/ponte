import json
import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL,
    role TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    stage TEXT,
    needs TEXT,
    expertise TEXT,
    link TEXT,
    notes TEXT,
    consent_at TEXT NOT NULL,
    consent_text_version TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
);
"""

COLUMNS = [
    "id", "created_at", "role", "name", "email", "phone", "company", "stage",
    "needs", "expertise", "link", "notes", "consent_at", "consent_text_version", "status",
]


def _connect(path: str) -> sqlite3.Connection:
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(path: str) -> None:
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with closing(_connect(path)) as conn:
        conn.execute("PRAGMA journal_mode=WAL")
        conn.executescript(SCHEMA)
        conn.commit()


def insert_submission(path: str, data: dict, consent_text_version: str) -> int:
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with closing(_connect(path)) as conn:
        cur = conn.execute(
            """INSERT INTO submissions
               (created_at, role, name, email, phone, company, stage, needs,
                expertise, link, notes, consent_at, consent_text_version)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                now,
                data["role"],
                data["name"],
                data["email"],
                data.get("phone"),
                data.get("company"),
                data.get("stage"),
                json.dumps(data["needs"]) if data.get("needs") else None,
                data.get("expertise"),
                data.get("link"),
                data.get("notes"),
                now,
                consent_text_version,
            ),
        )
        conn.commit()
        return int(cur.lastrowid)


def list_submissions(path: str, limit: int = 100, offset: int = 0) -> list[dict]:
    with closing(_connect(path)) as conn:
        rows = conn.execute(
            "SELECT * FROM submissions ORDER BY id DESC LIMIT ? OFFSET ?", (limit, offset)
        ).fetchall()
    out = []
    for row in rows:
        d = dict(row)
        d["needs"] = json.loads(d["needs"]) if d["needs"] else None
        out.append(d)
    return out
