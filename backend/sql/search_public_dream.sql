CREATE OR REPLACE FUNCTION search_public_dreams(keyword TEXT)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN (
        -- サブクエリの結果全体を JSON 配列に集約する
        SELECT COALESCE(jsonb_agg(result_json ORDER BY score DESC), '[]'::jsonb)
        FROM (
            SELECT
                json_build_object(
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
                ) AS result_json, -- 各夢のJSONオブジェクトにエイリアスを付ける
                -- 並び替えのためのスコア計算
                (
                    pgroonga_score(d.tableoid, d.ctid)
                    + COALESCE((
                        SELECT max(pgroonga_score(h.tableoid, h.ctid))
                        FROM dream_hashtags dh
                        JOIN hashtags h
                            ON dh.hashtag_id = h.id
                        WHERE dh.dream_id = d.id AND h.name &@~ keyword
                    ), 0.0)
                ) AS score -- スコアにエイリアスを付ける
            FROM dreams d
            WHERE
                d.is_public = TRUE
                AND (
                    d.content &@~ keyword
                    OR
                    EXISTS (
                        SELECT 1
                        FROM dream_hashtags dh
                        JOIN hashtags h
                            ON dh.hashtag_id = h.id
                        WHERE dh.dream_id = d.id AND h.name &@~ keyword
                    )
                )
        ) AS results -- サブクエリにエイリアスを付ける
    );
END;
$$;
