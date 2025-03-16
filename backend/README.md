## 環境構築

### 仮想環境

```sh
# 仮想環境を作成
python -m venv .

# 仮想環境を有効化
source ./bin/activate

# 必要なパッケージをインストール
pip install -r requirements.txt
```

### データベース

Supabase の SQL Editor で以下の SQL 文を実行する．

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NULL,
  created_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE TABLE dreams (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dream_hashtags (
    id SERIAL PRIMARY KEY,
    dream_id INTEGER NOT NULL,
    hashtag_id INTEGER NOT NULL,
    FOREIGN KEY (dream_id) REFERENCES dreams(id) ON DELETE CASCADE,
    FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE,
    UNIQUE (dream_id, hashtag_id)
);

-- 夢とハッシュタグをトランザクション内で追加する関数
CREATE OR REPLACE FUNCTION create_dream_with_hashtags(
    user_id UUID,
    content TEXT,
    is_public BOOLEAN,
    hashtag_names TEXT[]
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
BEGIN
  -- 夢をテーブルに追加
  INSERT INTO dreams (user_id, content, is_public)
  VALUES (user_id, content, is_public)
  RETURNING id, user_id, content, is_public, likes, created_at, updated_at
  INTO dream_id, dream_user_id, dream_content, dream_is_public, dream_likes, dream_created_at, dream_updated_at;

  -- ハッシュタグが存在しない場合は追加
  INSERT INTO hashtags (name)
  SELECT DISTINCT name
  -- unnestで配列を展開
  FROM unnest(hashtag_names) AS hn(name)
  ON CONFLICT (name)
      DO NOTHING;

  -- 中間テーブルに関連を追加
  INSERT INTO dream_hashtags (dream_id, hashtag_id)
  SELECT dream_id, h.id
  FROM dreams
      CROSS JOIN unnest(hashtag_names) AS hn(name)
      INNER JOIN hashtags h
          ON hn.name = h.name
  WHERE dreams.id = dream_id
  ON CONFLICT (dream_id, hashtag_id)
      DO NOTHING;

  -- ハッシュタグをJSONで取得
  SELECT jsonb_agg(row_to_json(hashtag_rows))
  INTO hashtags
  FROM (
    SELECT h.id, h.name
    FROM hashtags h
      INNER JOIN dream_hashtags dh
        ON h.id = dh.hashtag_id
    WHERE
      dh.dream_id = dream_id
  ) AS hashtag_rows;

  -- 作成した夢とハッシュタグを返す
  RETURN QUERY SELECT
    dream_id, 
    dream_user_id, 
    dream_content, 
    dream_is_public, 
    dream_likes, 
    dream_created_at, 
    dream_updated_at,
    hashtags;

  EXCEPTION WHEN OTHERS THEN
    ROLLBACK;
    RAISE;
END;
$$;

--- Function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.sync_auth_users_to_public_users()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.users (id, email, created_at, updated_at)
    VALUES (NEW.id, NEW.email, NEW.created_at, NEW.updated_at);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.users
    SET email = NEW.email,
        updated_at = NEW.updated_at
    WHERE id = OLD.id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    DELETE FROM public.users
    WHERE id = OLD.id;
    RETURN OLD;
  END IF;
END;
$$;

-- Trigger to call the above function
CCREATE TRIGGER sync_auth_users
  AFTER INSERT OR UPDATE OR DELETE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.sync_auth_users_to_public_users();
```

`seeds` 以下のスクリプトを実行してサンプルデータを追加する．

`.env.sample` をコピーして `.env` を作成し，内容を記述する

```sh
cp .env.sample .env
```

## 起動方法

```sh
python app.py
```
