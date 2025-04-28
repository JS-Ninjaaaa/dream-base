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

- Supabase の SQL Editor で `sql` ディレクトリ以下の SQL を実行する．
- `seeds` 以下のスクリプトを実行してサンプルデータを追加する．
- `.env.sample` をコピーして `.env` を作成し，内容を記述する

```sh
cp .env.sample .env
```

## 起動方法

```sh
python app.py
```
