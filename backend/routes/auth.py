from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models.db import get_supabase_client
from supabase import Client

auth_bp = Blueprint("auth", __name__)


# ログイン機能
@auth_bp.route("/login", methods=["POST"])
def login():
    # データ取得
    credentials = request.get_json()
    email = credentials["email"]
    password = credentials["password"]

    supabase: Client = get_supabase_client()
    # supabaseの情報で認証
    response = supabase.auth.sign_in_with_password(
        {"email": email, "password": password}
    )
    user = response.user
    # userを取得できなかった場合
    if user is None:
        return "Credentials are incorrect", 401

    # ユーザーID から JWT を生成
    access_token = create_access_token(identity=user.id)
    response_data = {
        "id": user.id,
        "email": user.email,
    }
    response = jsonify(response_data)
    # header に JWT を仕込む
    response.headers["Authorization"] = f"Bearer {access_token}"
    return response
