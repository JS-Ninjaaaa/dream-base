# ベースイメージ（軽量版のPython 3.9）
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /backend

# 依存関係をコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# ポート5000を公開
EXPOSE 5000

# 環境変数の設定  dev -> 1, pd -> 0
ENV FLASK_DEBUG=1

# GunicornでFlaskアプリを起動
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
