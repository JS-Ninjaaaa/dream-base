from __future__ import annotations

from models.db import get_supabase_client
from supabase import Client
from werkzeug.security import check_password_hash, generate_password_hash


class User:
    def __init__(
        self,
        id: int,
        email: str,
        password_hash: str,
        created_at: str,
        updated_at: str,
    ):
        self.id = id
        self.email = email
        self.password_hash = password_hash
        self.created_at = created_at
        self.updated_at = updated_at

    @classmethod
    def get_user_by_email(cls, email: str) -> User | None:
        supabase: Client = get_supabase_client()
        response = (
            supabase.table("users")
            .select("*")
            .eq("email", email)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    @classmethod
    def get_user_by_id(cls, user_id: int) -> User | None:
        supabase: Client = get_supabase_client()
        response = supabase.table("users").select("*").eq("id", user_id).execute()
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create_user(cls, email: str, password: str) -> User:
        password_hash = generate_password_hash(password)

        supabase: Client = get_supabase_client()
        response = (
            supabase.table("users")
            .insert({"email": email, "password_hash": password_hash})
            .execute()
        )  # fmt: skip
        return cls(**response.data[0])
