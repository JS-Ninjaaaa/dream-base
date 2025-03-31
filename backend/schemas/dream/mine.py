from datetime import datetime
from typing import Optional
from flask import current_app

from pydantic import (
    BaseModel,
    ValidationError,
    field_serializer,
    field_validator,
)
from schemas.hashtag import HashtagResponse


class MyDreamResponse(BaseModel):
    id: int
    user_id: str
    content: str
    is_public: bool
    likes: int
    created_at: datetime
    updated_at: datetime
    hashtags: Optional[list[HashtagResponse]]

    @field_serializer("created_at")
    def serialize_created_at(self, created_at: datetime) -> str:
        return created_at.isoformat()

    @field_serializer("updated_at")
    def serialize_updated_at(self, updated_at: datetime) -> str:
        return updated_at.isoformat()


class GetMyDreamsParams(BaseModel):
    sort_by: str = "updated_at"

    @field_validator("sort_by")
    def validate_sort_by(cls, sort_by: str) -> str:
        if sort_by not in {"likes", "updated_at"}:
            raise ValidationError("Invalid sort_by value")

        return sort_by


class CreateMyDreamRequest(BaseModel):
    content: str
    is_public: bool = False
    hashtags: list[str]

    @field_validator("content")
    def validate_content(cls, content: str) -> str:
        if len(content) == 0:
            # 空白エラー
            current_app.logger.error("Content is required")
            raise ValidationError("Content is required")

        return content
