from datetime import datetime
from typing import Optional

from pydantic import (
    BaseModel,
    field_serializer,
)
from schemas.hashtag import HashtagResponse


class PublicDreamResponse(BaseModel):
    id: int
    user_id: str
    content: str
    is_public: bool
    likes: int
    hashtags: Optional[list[HashtagResponse]]
    created_at: datetime
    updated_at: datetime

    @field_serializer("created_at")
    def serialize_created_at(self, created_at: datetime) -> str:
        return created_at.isoformat()

    @field_serializer("updated_at")
    def serialize_updated_at(self, updated_at: datetime) -> str:
        return updated_at.isoformat()
