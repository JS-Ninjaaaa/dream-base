from __future__ import annotations

from models.db import get_supabase_client
from postgrest.exceptions import APIError
from schemas.dream.mine import CreateMyDreamRequest
from supabase import Client


class Dream:
    def __init__(
        self,
        id: int,
        user_id: str,
        content: str,
        is_public: bool,
        likes: int,
        created_at: str,
        updated_at: str,
        hashtags: list[dict] = [],
    ):
        self.id = id
        self.user_id = user_id
        self.content = content
        self.is_public = is_public
        self.likes = likes
        self.created_at = created_at
        self.updated_at = updated_at
        self.hashtags = hashtags

    # idに基づいて特定の夢を取得
    @classmethod
    def get_by_id(cls, id: int) -> Dream | None:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams").select("*, hashtags(*)").eq("id", id).execute()
        )
        if len(response.data) == 0:
            return None

        dream = response.data[0]
        return cls(**dream)

    # ユーザーの夢を全て取得
    @classmethod
    def get_all_by_user(cls, user_id: str, sort: str) -> list[Dream]:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .select("*, hashtags(*)")
            .eq("user_id", user_id)
            # ソート条件を受け取って適用
            .order(sort, desc=True)
            .execute()
        )

        my_dreams = [cls(**dream) for dream in response.data]
        return my_dreams

    # 新しい夢の作成
    @classmethod
    def create(cls, user_id: str, content: str, is_public=False) -> Dream:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .insert({"user_id": user_id, "content": content, "is_public": is_public})
            .execute()
        )

        created_dream = response.data[0]
        return cls(**created_dream)

    # 夢とハッシュタグの作成
    @classmethod
    def create_with_hashtags(
        cls,
        user_id: str,
        body: CreateMyDreamRequest,
    ) -> Dream:
        supabase: Client = get_supabase_client()

        response = supabase.rpc(
            "create_dream_with_hashtags",
            {
                "param_user_id": user_id,
                "param_content": body.content,
                "param_is_public": body.is_public,
                "param_hashtag_names": body.hashtags,
            },
        ).execute()

        dream_data = response.data[0]
        return cls(
            dream_data["dream_id"],
            dream_data["dream_user_id"],
            dream_data["dream_content"],
            dream_data["dream_is_public"],
            dream_data["dream_likes"],
            dream_data["dream_created_at"],
            dream_data["dream_updated_at"],
            dream_data["hashtags"],
        )

    # 夢を削除
    @classmethod
    def delete(cls, dream_id: int) -> bool:
        supabase: Client = get_supabase_client()
        try:
            supabase.table("dreams").delete().eq("id", dream_id).execute()
        except APIError:
            return False

        return True

    # 公開されている夢を全て取得
    @classmethod
    def get_all_public_dreams(cls) -> list[Dream]:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .select("*", "hashtags(*)")
            .eq("is_public", True)
            # id順で取得
            .order("id", desc=True)
            .execute()
        )

        public_dreams = [cls(**dream) for dream in response.data]
        return public_dreams

    # 夢の公開状態を切り替える
    @classmethod
    def toggle_visibility(cls, dream_id: int) -> Dream | None:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .select("*")
            .eq("id", dream_id)
            .execute()
        )  # fmt: skip
        if len(response.data) == 0:
            return None

        visibility = response.data[0]["is_public"]
        response = (
            supabase.table("dreams")
            .update({"is_public": not visibility})
            .eq("id", dream_id)
            .execute()
        )

        return cls(**response.data[0])

    # 夢のいいね数を更新
    @classmethod
    def update_likes(cls, dream_id: int, likes: int) -> Dream | None:
        supabase: Client = get_supabase_client()

        response = (
            supabase.table("dreams")
            .update({"likes": likes})
            .eq("id", dream_id)
            .execute()
        )
        if len(response.data) == 0:
            return None

        updated_dream = response.data[0]
        print(updated_dream)
        return cls(**updated_dream)
