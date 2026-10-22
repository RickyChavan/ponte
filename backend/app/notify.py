"""Optional new-enquiry alerts. A notifier with no configuration is skipped.

Failures are logged by exception type only (never the message or form data, which
may contain personal details) and never break the request.

WhatsApp alerts are not implemented: they need a WhatsApp Business API account from
Meta. To add one, write a `send_whatsapp(settings, text)` here and call it from
`notify_new_submission`.
"""

import logging
import smtplib
from email.message import EmailMessage

import httpx

from .config import Settings

log = logging.getLogger("ponte.notify")

NEED_LABELS = {
    "eng": "Software and DevOps engineers",
    "sales": "Sales and marketing",
    "ops": "Operations and project management",
    "fin": "Finance, HR and admin",
    "unsure": "Not sure yet",
}


def build_text(sub: dict) -> str:
    lines = [f"New Ponte enquiry #{sub['id']} ({sub['role']})", f"Name: {sub['name']}", f"Email: {sub['email']}"]
    if sub.get("phone"):
        lines.append(f"Phone: {sub['phone']}")
    if sub["role"] == "founder":
        if sub.get("company") or sub.get("stage"):
            lines.append("Company: " + " ".join(filter(None, [sub.get("company"), f"({sub['stage']})" if sub.get("stage") else None])))
        if sub.get("needs"):
            lines.append("Needs: " + ", ".join(NEED_LABELS.get(n, n) for n in sub["needs"]))
    else:
        lines.append(f"Expertise: {sub.get('expertise')}")
        if sub.get("link"):
            lines.append(f"Link: {sub['link']}")
    if sub.get("notes"):
        lines.append(f"Notes: {sub['notes']}")
    return "\n".join(lines)


def send_slack(webhook_url: str, text: str) -> None:
    if not webhook_url.startswith("https://hooks.slack.com/"):
        raise ValueError("SLACK_WEBHOOK_URL must be a hooks.slack.com URL")
    httpx.post(webhook_url, json={"text": text}, timeout=5).raise_for_status()


def send_email(settings: Settings, subject: str, text: str) -> None:
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = settings.smtp_from or settings.smtp_user
    msg["To"] = settings.notify_email
    msg.set_content(text)
    with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
        smtp.starttls()
        if settings.smtp_user:
            smtp.login(settings.smtp_user, settings.smtp_password)
        smtp.send_message(msg)


def notify_new_submission(settings: Settings, sub: dict) -> None:
    text = build_text(sub)
    if settings.slack_webhook_url:
        try:
            send_slack(settings.slack_webhook_url, text)
        except Exception as e:  # noqa: BLE001 - notifier must never raise
            log.warning("slack notification failed: %s", type(e).__name__)
    if settings.smtp_host:
        try:
            send_email(settings, f"New Ponte enquiry #{sub['id']}", text)
        except Exception as e:  # noqa: BLE001
            log.warning("email notification failed: %s", type(e).__name__)
