# lib
import os
from datetime import timedelta
from dotenv import load_dotenv
# flask lib
from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from logging_setup import setup_logger
# blueprint
from routes.auth import auth_bp
from routes.dream.mine import my_dream_bp
from routes.dream.public import public_dream_bp
from routes.user import user_bp

load_dotenv()

app = Flask(__name__)
setup_logger(app)
# CORSのセットアップ
CORS(
    app,
    resources={r"/*": {"origins": os.getenv("FRONTEND_URL")}},
    # クライアントが設置できるヘッダー
    allow_headers=["Content-Type", "Authorization"],
    # クライアントが取得できるヘッダー
    expose_headers=["Content-Type", "Authorization"],
    # クライアントが送信できるメソッド
    methods=["HEAD", "GET", "POST", "PATCH", "DELETE", "OPTIONS"],
)

# JWTの設定
app.config["JWT_SECRET_KEY"] = "my-jwt-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config["JWT_COOKIE_SAMESITE"] = "Strict"
app.config["JWT_COOKIE_SECURE"] = not app.debug

jwt = JWTManager(app)  # init_app(app) は不要

# Blueprintの登録
app.register_blueprint(auth_bp)
app.register_blueprint(my_dream_bp)
app.register_blueprint(public_dream_bp)
app.register_blueprint(user_bp)


@app.route("/test", methods=["HEAD", "GET"])
def test():  # 生存確認API
    if request.method == "HEAD":
        return "", 200
    elif request.method == "GET":
        return "Hello", 200


if __name__ == "__main__":
    app.run(port=5001, debug=True)
