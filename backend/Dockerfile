# ベースイメージ（軽量版のPython 3.9）
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# ポート5000を公開
EXPOSE 5000

# 環境変数の設定（本番環境）
ENV FLASK_ENV=production

# GunicornでFlaskアプリを起動
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
