from __future__ import annotations

from models.db import get_supabase_client
from supabase import Client


class User:
    def __init__(
        self,
        id: str,
        email: str,
        created_at: str = None,
        updated_at: str = None,
    ):
        self.id = id
        self.email = email
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
        if len(response.data) == 0:  # データが空なら None を返す
            return None

        return cls(**response.data[0])  # ユーザー情報をクラスにマッピング

    @classmethod
    def get_user_by_id(cls, user_id: str) -> User | None:
        supabase: Client = get_supabase_client()
        response = (
            supabase.table("users")
            .select("*")
            .eq("id", user_id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        return cls(**response.data[0])

    @classmethod
    def create_user(cls, email: str, password: str) -> User | None:
        supabase: Client = get_supabase_client()
        response = supabase.auth.sign_up(
            {
                "email": email,
                "password": password,
            }
        )
        new_user = response.user
        if new_user is None:
            return None

        return cls(
            id=new_user.id,
            email=new_user.email,
            created_at=new_user.created_at,
            updated_at=new_user.updated_at,
        )
