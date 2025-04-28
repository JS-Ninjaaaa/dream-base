-- 夢とハッシュタグをトランザクション内で追加する関数
CREATE OR REPLACE FUNCTION create_dream_with_hashtags(
    param_user_id UUID,
    param_content TEXT,
    param_is_public BOOLEAN,
    param_hashtag_names TEXT[]
)
RETURNS TABLE (
    dream_id INTEGER,
    dream_user_id UUID,
    dream_content TEXT,
    dream_is_public BOOLEAN,
    dream_likes INTEGER,
    dream_created_at TIMESTAMP,
    dream_updated_at TIMESTAMP,
    hashtags JSONB
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
DECLARE
    local_dream_id INTEGER;
    local_dream_user_id UUID;
    local_dream_content TEXT;
    local_dream_is_public BOOLEAN;
    local_dream_likes INTEGER;
    local_dream_created_at TIMESTAMP;
    local_dream_updated_at TIMESTAMP;
    local_hashtags JSONB;
BEGIN
    -- 夢をテーブルに追加
    INSERT INTO dreams (user_id, content, is_public)
    VALUES (param_user_id, param_content, param_is_public)
    RETURNING
        id, user_id, content, is_public, likes, created_at, updated_at
    INTO
        local_dream_id,
        local_dream_user_id,
        local_dream_content,
        local_dream_is_public,
        local_dream_likes,
        local_dream_created_at,
        local_dream_updated_at;

    -- ハッシュタグをテーブルに存在しない場合のみ追加
    INSERT INTO hashtags (name)
    SELECT DISTINCT name
    -- 引数のハッシュタグ名の配列を展開
    FROM unnest(param_hashtag_names) AS hn(name)
    ON CONFLICT (name)
        DO NOTHING;

    -- 夢とハッシュタグの中間テーブルに関連を追加
    INSERT INTO dream_hashtags (dream_id, hashtag_id)
    SELECT
        -- 作成した夢のID
        local_dream_id,
        -- ハッシュタグのID
        h.id
    -- 引数のハッシュタグ名の配列を展開
    FROM unnest(param_hashtag_names) AS hn(name)
    -- ハッシュタグ名で hashtags テーブルと結合
    INNER JOIN hashtags h
        ON hn.name = h.name
    ON CONFLICT (dream_id, hashtag_id)
        DO NOTHING;

    -- 作成した夢に付けられたハッシュタグを JSON 形式で取得
    SELECT jsonb_agg(row_to_json(ht))
    INTO local_hashtags
    FROM (
        -- 作成した夢に付けられたハッシュタグを取得
        SELECT
            h.id,
            h.name
        FROM hashtags h
        INNER JOIN dream_hashtags AS dh
            ON h.id = dh.hashtag_id
        WHERE
            -- 作成した夢のIDでフィルタリング
            dh.dream_id = local_dream_id
    ) AS ht;

    -- 作成した夢とハッシュタグを返す
    RETURN QUERY SELECT
        local_dream_id,
        local_dream_user_id,
        local_dream_content,
        local_dream_is_public,
        local_dream_likes,
        local_dream_created_at,
        local_dream_updated_at,
        local_hashtags;

    EXCEPTION
        WHEN OTHERS THEN
            RAISE;
END;
$$;
