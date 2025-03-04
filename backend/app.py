from datetime import timedelta

from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.auth import auth_bp
from routes.my_dream import my_dream_bp
from routes.public_dream import public_dream_bp

app = Flask(__name__)

# CORSのセットアップ
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:5173"}},
    # クライアントが設置できるヘッダー
    allow_headers=["Content-Type", "Authorization"],
    # クライアントが取得できるヘッダー
    expose_headers=["Content-Type", "Authorization"],
    # クライアントが送信できるメソッド
    methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
)

# JWTの設定
app.config["JWT_SECRET_KEY"] = "my-jwt-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=10)
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_TYPE"] = "Bearer"
app.config["JWT_COOKIE_SAMESITE"] = "Strict"
app.config["JWT_COOKIE_SECURE"] = False  # ローカル環境ではFalse

jwt = JWTManager(app)  # init_app(app) は不要

# Blueprintの登録
app.register_blueprint(auth_bp)
app.register_blueprint(my_dream_bp)
app.register_blueprint(public_dream_bp)


@app.route("/test", methods=["GET"])
def test():  # 生存確認API
    if request.method == "GET":
        return "Hello", 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
