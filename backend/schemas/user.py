from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_serializer


class UserResponse(BaseModel):
    id: str
    email: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    @field_serializer("created_at")
    def serialize_created_at(self, create_at: datetime) -> str:
        return create_at.isoformat()

    @field_serializer("updated_at")
    def serialize_updated_at(self, updated_at: datetime) -> str:
        return updated_at.isoformat()


class CreateUserBody(BaseModel):
    email: str
    password: str
