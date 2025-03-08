from __future__ import annotations
from models.db import get_supabase_client
from supabase import Client

class User:
    def __init__(
        self,
        id: str,
        email: str,
        created_at: None,
        updated_at: None,
    ):
        self.id = id
        self.email = email
        self.created_at = created_at
        self.updated_at = updated_at

    @classmethod
    def get_user_by_email(cls, email: str) -> User | None:
        supabase: Client = get_supabase_client()
        response = (
            supabase.auth.api.list_users()
            .filter("email", "eq", email)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    @classmethod
    def get_user_by_id(cls, user_id: str) -> User | None:
        supabase: Client = get_supabase_client()
        response = (
            supabase.auth.api.get_user(user_id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    @classmethod
    def create_user(cls, email: str, password: str) -> User:
        supabase: Client = get_supabase_client()
        response = supabase.auth.api.create_user(
            email=email,
            password=password,
        )
        return cls(**response.data[0])