from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token

from models.db import get_supabase_client
from models.user import User
from supabase import Client

auth_bp = Blueprint("auth", __name__)


# ログイン機能
@auth_bp.route("/login", methods=["POST"])
def login():
    # データ取得
    credentials = request.get_json()
    email = credentials["email"]
    password = credentials["password"]
    # supabase
    supabase: Client = get_supabase_client()

    try:
        # supabaseの情報で認証
        response = supabase.auth.sign_in_with_password(email=email, password=password)
        # userを取得できた場合
        if response.get("user"):
            # user id(UUID)をトークンに挿入
            access_token = create_access_token(identity=str(response["user"]["id"]))
            response_data = {
                "id": str(response["user"]["id"]),
                "email": response["user"]["email"],
            }
            response = jsonify(response_data)
            # header に JWT を仕込む
            response.headers["Authorization"] = f"Bearer {access_token}"
            return response
        else:
            return "", 401  # ログイン失敗
    except Exception as e:
        # 予期せぬエラー
        return jsonify({"error": str(e)}), 500

