import time
from datetime import datetime
from models.db import get_supabase_client
import pytest
from supabase import Client

supabase: Client = get_supabase_client()

@pytest.mark.skipif(supabase is None, reason="Supabase client not initialized")
def test_updated_at_and_sorting_behavior():
    dream_id = 97  # testuser1の「賞を取る！！！」を操作

    # --- 1. 更新前の updated_at を取得 ---
    before_res = supabase.table("dreams").select("updated_at").eq("id", dream_id).execute()
    assert before_res.data, "❌ レコードが存在しません"
    before_time = datetime.fromisoformat(before_res.data[0]["updated_at"])

    # --- 2. content をユニークな文字列に更新 ---
    supabase.table("dreams").update({
        "content": f"pytest test {time.time()}"
    }).eq("id", dream_id).execute()

    # --- 3. 反映を待つ ---
    time.sleep(1)

    # --- 4. updated_at が更新されているか確認 ---
    after_res = supabase.table("dreams").select("updated_at").eq("id", dream_id).execute()
    after_time = datetime.fromisoformat(after_res.data[0]["updated_at"])

    assert after_time > before_time, f"❌ updated_at が更新されていません: {before_time} vs {after_time}"

    # --- 5. updated_at による降順ソートの確認 ---
    sorted_res = supabase.table("dreams").select("id, updated_at").order("updated_at", desc=True).execute()
    sorted_ids = [record["id"] for record in sorted_res.data]

    assert dream_id == sorted_ids[0], f"❌ 更新時間順ソート順が正しくない（更新したIDが先頭にいない）: {sorted_ids}"

    print(f"✅ updated_at ソート順 OK, 最新ID = {sorted_ids[0]}")

    # --- 6. likes によるソートの検証（降順） ---
    like_sorted_res = supabase.table("dreams").select("id, likes").order("likes", desc=True).execute()
    like_counts = [record["likes"] for record in like_sorted_res.data]

    assert like_counts == sorted(like_counts, reverse=True), f"❌ likes の降順ソートが正しくありません: {like_counts}"

    print(f"✅ likes ソート順 OK: {like_counts}")
