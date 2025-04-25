CREATE OR REPLACE FUNCTION search_public_dreams(keyword TEXT)
RETURNS TABLE (hit_dream json)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT json_build_object(
        'id', d.id::text,
        'user_id', d.user_id,
        'content', d.content,
        'is_public', d.is_public,
        'likes', d.likes,
        'hashtags', (
            SELECT COALESCE(
                json_agg(
                    json_build_object(
                        'id', h.id::text,
                        'name', h.name
                    ) ORDER BY h.name
                ),
                '[]'::json
            )
            FROM dream_hashtags dh
            JOIN hashtags h
                ON dh.hashtag_id = h.id
            WHERE dh.dream_id = d.id
        ),
        'created_at', d.created_at,
        'updated_at', d.updated_at
    )
    FROM dreams d
    WHERE
        d.is_public = TRUE
        AND (
            d.content &@~ keyword -- 夢の内容で検索
            OR
            EXISTS ( -- 関連するハッシュタグで検索
                SELECT 1
                FROM dream_hashtags dh
                JOIN hashtags h
                    ON dh.hashtag_id = h.id
                WHERE dh.dream_id = d.id AND h.name &@~ keyword -- ハッシュタグ名で検索
            )
        )
    -- 関連度の高い順に並び替え
    ORDER BY (
        pgroonga_score(d.tableoid, d.ctid)
        + COALESCE((
            SELECT max(pgroonga_score(h.tableoid, h.ctid))
            FROM dream_hashtags dh
            JOIN hashtags h
                ON dh.hashtag_id = h.id
            WHERE dh.dream_id = d.id AND h.name &@~ keyword
        ), 0.0)
    ) DESC;
END;
$$;
