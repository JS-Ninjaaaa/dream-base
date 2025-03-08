from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.dream import Dream
my_dream_bp = Blueprint("my_dream", __name__)


# 自分が作成した夢を取得
@my_dream_bp.route("/dreams/mine", methods=["GET"])
@jwt_required()
def get_my_dreams():
    user_id = get_jwt_identity()
    dreams = Dream.get_all_by_user(user_id)
    return jsonify([dream.__dict__ for dream in dreams]), 200


# 夢を新規作成
@my_dream_bp.route("/dreams/mine", methods=["POST"])
@jwt_required()
def create_my_dream():
    data = request.get_json()
    content = data.get("content")
    is_public = data.get("is_public")
    user_id = get_jwt_identity()  # JWTのヘッダからユーザーIDを取得

    if content:  # 内容があれば
        # 夢を作成して
        created_dream = Dream.create(user_id, content, is_public)
        # 作成した夢を返す
        return jsonify(created_dream.__dict__), 201
    else:
        return "Content is required", 400


@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["PATCH"])
def toggle_visibility(dream_id: int):
    updated_dream = Dream.toggle_visibility(dream_id)
    if updated_dream is None:
        return "", 404

    return jsonify(updated_dream.__dict__), 200


# 夢を削除
@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["DELETE"])
@jwt_required()
def delete_my_dream(dream_id: int):
    if Dream.delete(dream_id):
        return "", 204  # 削除成功
    else:
        return "", 404  # 夢が存在しない
