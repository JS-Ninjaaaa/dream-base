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
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dreams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Trigger function to update updated_at field
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER update_dream_updated_at
BEFORE UPDATE ON dreams
FOR EACH ROW
```

SQL Editor で `seeds` 以下の SQL文を実行してサンプルデータを追加する．

> [!important]
> ユーザーのパスワードは全て`password`

`.env.sample` をコピーして `.env` を作成し，
Supabase の Project URL と API Key を記述する．

```sh
cp .env.sample .env
```

## 起動方法

```sh
python app.py
```
