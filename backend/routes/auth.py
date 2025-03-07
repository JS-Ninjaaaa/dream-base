from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models.user import User

auth_bp = Blueprint("auth", __name__)


# ログイン機能
@auth_bp.route("/login", methods=["POST"])
def login():
    # データ取得
    credentials = request.get_json()
    email = credentials["email"]
    password = credentials["password"]
    # ユーザー情報を取得
    user = User.get_user_by_email(email)
    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        # ユーザー情報を返す
        response_data = {
            "id": "{}".format(user.id),
            "email": "{}".format(user.email),
        }
        response = jsonify(response_data)
        # header に JWT を仕込む
        response.headers["Authorization"] = "Bearer {}".format(access_token)
        return response
    else:
        return "", 401  # failed
