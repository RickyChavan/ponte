import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator

NEEDS = {"eng", "sales", "ops", "fin", "unsure"}
STAGES = {"Just starting", "Growing (under 20 people)", "Established (20+)"}
# Bump when the consent wording on the website changes, so we know what each person agreed to.
CONSENT_TEXT_VERSION = "2026-10-22-v2"  # v2: privacy-policy link removed, plain data-use note added

_PHONE = re.compile(r"^[0-9+()\-\s]{6,30}$")


class ContactIn(BaseModel):
    """Contact form payload. Mirrors ContactPayload in frontend/src/lib/api.ts."""

    model_config = ConfigDict(extra="ignore", str_strip_whitespace=True)

    role: Literal["founder", "talent"]
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    company: str | None = Field(default=None, max_length=160)
    stage: str | None = None
    needs: list[str] | None = None
    expertise: str | None = Field(default=None, max_length=160)
    link: str | None = Field(default=None, max_length=300)
    notes: str | None = Field(default=None, max_length=500)
    consent: bool
    # Honeypot: real users never see or fill this.
    website: str | None = Field(default=None, max_length=200)

    @field_validator("phone", "company", "stage", "expertise", "link", "notes", "website", mode="before")
    @classmethod
    def blank_to_none(cls, v):
        if isinstance(v, str) and not v.strip():
            return None
        return v

    @field_validator("phone")
    @classmethod
    def check_phone(cls, v):
        if v is not None and not _PHONE.match(v):
            raise ValueError("Please enter a valid phone number.")
        return v

    @field_validator("link")
    @classmethod
    def check_link(cls, v):
        if v is not None and not re.match(r"^https?://\S+$", v, re.IGNORECASE):
            raise ValueError("Link must start with http:// or https://")
        return v

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v):
        if v is not True:
            raise ValueError("Consent is required.")
        return v

    @model_validator(mode="after")
    def role_requirements(self):
        if self.role == "founder":
            # Company, stage and roles are optional extras; a founder only has to say what they need.
            if self.stage is not None and self.stage not in STAGES:
                raise ValueError("Please choose a valid stage and size.")
            if self.needs is not None and not set(self.needs) <= NEEDS:
                raise ValueError("Pick valid roles only.")
            self.needs = sorted(set(self.needs)) if self.needs else None
            if not self.needs and not self.notes:
                raise ValueError("Tell us what you need help with, or pick at least one role.")
            self.expertise = None
            self.link = None
        else:
            if not self.expertise:
                raise ValueError("Area of expertise is required.")
            self.company = None
            self.stage = None
            self.needs = None
        return self
