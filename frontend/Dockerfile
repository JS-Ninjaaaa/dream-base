# ベースイメージ
FROM node:23 AS base
WORKDIR /frontend

# package.json と pnpm-lock.yaml をコピー
COPY package.json pnpm-lock.yaml ./

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# アプリケーションコードをコピー
COPY . .

# buildステージ
FROM base AS build
RUN pnpm run build

# プロダクション用の依存関係だけをインストール
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

# distをコピー
FROM base
COPY --from=build /frontend/dist /frontend/dist

CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0"]
