import time
from datetime import UTC, datetime

import pytest
from models.db import get_supabase_client
from supabase import Client

supabase: Client = get_supabase_client()

# testuser1 の user_id（Supabaseで確認して値を設定）
TEST_USER_ID = "d7fc2a83-3046-48f1-94e7-bfd9a6b9ba3e"


@pytest.mark.skipif(supabase is None, reason="Supabase client not initialized")
def test_updated_at_and_sorting_behavior():
    # --- 0. テスト用レコードを作成 ---
    unique_content = f"pytest content {datetime.now(UTC).isoformat()}"
    insert_res = (
        supabase.table("dreams")
        .insert({"user_id": TEST_USER_ID, "content": unique_content, "is_public": True})
        .execute()
    )

    assert insert_res.data, "❌ レコードの作成に失敗"
    dream_id = insert_res.data[0]["id"]

    try:
        # --- 1. 更新前の updated_at を取得 ---
        before_res = (
            supabase.table("dreams").select("updated_at").eq("id", dream_id).execute()
        )
        assert before_res.data, "❌ レコードが存在しません"
        before_time = datetime.fromisoformat(before_res.data[0]["updated_at"])

        # --- 2. スリープ ---
        time.sleep(1)

        # --- 3. content をユニークな文字列に更新 ---
        new_content = f"pytest content {datetime.now(UTC).isoformat()}"
        update_res = (
            supabase.table("dreams")
            .update({"content": new_content})
            .eq("id", dream_id)
            .execute()
        )
        assert update_res.data, "❌ レコードの変更に失敗"

        # --- 4. updated_at が更新されているか確認 ---
        after_res = (
            supabase.table("dreams").select("updated_at").eq("id", dream_id).execute()
        )
        after_time = datetime.fromisoformat(after_res.data[0]["updated_at"])

        assert after_time > before_time, (
            f"❌ updated_at が更新されていません: {before_time} vs {after_time}"
        )

        # --- 5. updated_at による降順ソートの確認 ---
        sorted_res = (
            supabase.table("dreams")
            .select("id, updated_at")
            .order("updated_at", desc=True)
            .execute()
        )
        sorted_ids = [record["id"] for record in sorted_res.data]

        assert dream_id == sorted_ids[0], f"❌ ソート順が正しくない: {sorted_ids}"
        print(f"✅ updated_at ソート順 OK, 最新ID = {sorted_ids[0]}")

        # --- 6. likes によるソートの検証（降順） ---
        like_sorted_res = (
            supabase.table("dreams")
            .select("id, likes")
            .order("likes", desc=True)
            .execute()
        )
        like_counts = [record["likes"] for record in like_sorted_res.data]

        assert like_counts == sorted(like_counts, reverse=True), (
            f"❌ likes の降順ソートが正しくありません: {like_counts}"
        )
        print(f"✅ likes ソート順 OK: {like_counts}")

    finally:
        # --- 後始末（テストデータ削除） ---
        supabase.table("dreams").delete().eq("id", dream_id).execute()
        print("✅ テストデータの削除完了")
