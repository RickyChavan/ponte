import csv
import io

import httpx
import pytest
from fastapi.testclient import TestClient

from app import notify
from app.config import Settings
from app.main import create_app

TOKEN = "t" * 32


def make_client(tmp_path, **overrides):
    values = {"database_path": str(tmp_path / "test.db"), "admin_token": TOKEN, **overrides}
    return TestClient(create_app(Settings(_env_file=None, **values)))


@pytest.fixture
def client(tmp_path):
    with make_client(tmp_path) as c:
        yield c


def founder(**kw):
    data = {
        "role": "founder",
        "name": "Asha Rao",
        "email": "asha@example.com",
        "company": "Rao Foods",
        "stage": "Growing (under 20 people)",
        "needs": ["eng", "sales"],
        "consent": True,
    }
    data.update(kw)
    return data


def talent(**kw):
    data = {
        "role": "talent",
        "name": "Dev Patel",
        "email": "dev@example.com",
        "expertise": "DevOps",
        "link": "https://linkedin.com/in/dev",
        "consent": True,
    }
    data.update(kw)
    return data


def admin():
    return {"X-Admin-Token": TOKEN}


def test_health(client):
    assert client.get("/api/health").json() == {"ok": True}


def test_founder_submission_is_stored(client):
    r = client.post("/api/contact", json=founder(phone="+91 98765 43210", notes="Hello"))
    assert r.status_code == 201
    rows = client.get("/api/admin/submissions", headers=admin()).json()
    assert len(rows) == 1
    row = rows[0]
    assert row["name"] == "Asha Rao" and row["needs"] == ["eng", "sales"]
    assert row["consent_text_version"] and row["consent_at"] and row["status"] == "new"


def test_talent_submission_drops_founder_fields(client):
    r = client.post("/api/contact", json=talent(company="Ignored", stage="Just starting", needs=["eng"]))
    assert r.status_code == 201
    row = client.get("/api/admin/submissions", headers=admin()).json()[0]
    assert row["company"] is None and row["needs"] is None and row["expertise"] == "DevOps"


@pytest.mark.parametrize(
    "bad",
    [
        {"email": "nope"},
        {"name": "   "},
        {"consent": False},
        {"company": ""},
        {"stage": "Huge"},
        {"needs": []},
        {"needs": ["hacking"]},
        {"phone": "call me maybe"},
        {"notes": "x" * 501},
        {"role": "admin"},
    ],
)
def test_founder_validation_failures(client, bad):
    assert client.post("/api/contact", json=founder(**bad)).status_code == 422
    assert client.get("/api/admin/submissions", headers=admin()).json() == []


def test_talent_requires_expertise_and_http_link(client):
    assert client.post("/api/contact", json=talent(expertise="")).status_code == 422
    assert client.post("/api/contact", json=talent(link="javascript:alert(1)")).status_code == 422


def test_honeypot_pretends_success_but_stores_nothing(client):
    r = client.post("/api/contact", json=founder(website="http://spam.example"))
    assert r.status_code == 200
    assert client.get("/api/admin/submissions", headers=admin()).json() == []


def test_rate_limit(tmp_path):
    with make_client(tmp_path, rate_limit_max=2) as c:
        assert c.post("/api/contact", json=founder()).status_code == 201
        assert c.post("/api/contact", json=founder()).status_code == 201
        r = c.post("/api/contact", json=founder())
        assert r.status_code == 429


def test_sql_injection_text_is_stored_literally(client):
    evil = "Robert'); DROP TABLE submissions;--"
    assert client.post("/api/contact", json=founder(name=evil)).status_code == 201
    assert client.get("/api/admin/submissions", headers=admin()).json()[0]["name"] == evil


def test_admin_auth(client, tmp_path):
    assert client.get("/api/admin/submissions").status_code == 401
    assert client.get("/api/admin/submissions", headers={"X-Admin-Token": "wrong"}).status_code == 401
    assert client.get("/api/admin/submissions.csv").status_code == 401
    assert client.get("/api/admin/submissions", headers=admin()).status_code == 200
    with make_client(tmp_path, admin_token="") as disabled:
        assert disabled.get("/api/admin/submissions", headers=admin()).status_code == 404


def test_csv_export_neutralises_formulas(client):
    client.post("/api/contact", json=founder(name="=HYPERLINK(\"http://evil\")", phone="+91 98765 43210"))
    r = client.get("/api/admin/submissions.csv", headers=admin())
    assert r.status_code == 200 and r.headers["content-type"].startswith("text/csv")
    rows = list(csv.DictReader(io.StringIO(r.text)))
    assert rows[0]["name"].startswith("'=")
    assert rows[0]["phone"] == "+91 98765 43210"


def test_notifier_failure_does_not_break_request(tmp_path, monkeypatch):
    def boom(*a, **k):
        raise httpx.ConnectError("down")

    monkeypatch.setattr(notify.httpx, "post", boom)
    with make_client(tmp_path, slack_webhook_url="https://hooks.slack.com/services/T/B/x") as c:
        assert c.post("/api/contact", json=founder()).status_code == 201
        assert len(c.get("/api/admin/submissions", headers=admin()).json()) == 1


def test_slack_is_called_when_configured(tmp_path, monkeypatch):
    calls = []

    class Resp:
        def raise_for_status(self):
            pass

    monkeypatch.setattr(notify.httpx, "post", lambda url, json, timeout: calls.append((url, json)) or Resp())
    with make_client(tmp_path, slack_webhook_url="https://hooks.slack.com/services/T/B/x") as c:
        c.post("/api/contact", json=founder())
    assert len(calls) == 1 and "Asha Rao" in calls[0][1]["text"]


def test_slack_rejects_non_slack_urls():
    with pytest.raises(ValueError):
        notify.send_slack("http://169.254.169.254/latest/meta-data", "x")
