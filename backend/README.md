## 環境構築

### 仮想環境

```sh
python -m venv .
pip install -r requirements.txt
```

### データベース

Supabase の SQL Editor で以下の SQL 文を実行する．

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dreams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
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
