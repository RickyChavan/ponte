from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All configuration comes from environment variables or backend/.env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_path: str = "ponte.db"
    # Leave empty to disable the admin endpoints entirely.
    admin_token: str = ""
    allowed_origins: str = "http://localhost:5173,https://ponte.co.in,https://www.ponte.co.in"

    # Abuse protection: max contact submissions per client IP per window.
    rate_limit_max: int = 10
    rate_limit_window_seconds: int = 600
    # Only enable behind a reverse proxy you control; otherwise clients can spoof it.
    trust_proxy: bool = False

    # Optional notifiers. A notifier with no config is simply skipped.
    slack_webhook_url: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = ""
    notify_email: str = "hello@ponte.co.in"

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
