from flask import Blueprint, jsonify, request
from models.dream import Dream
from flask_jwt_extended import jwt_required,get_jwt_identity

dream_bp = Blueprint('dream', __name__)

# ドリーム取得 自分の作成したもの全て
@dream_bp.route('/dreams/mine', methods=['GET'])
@jwt_required()
def get_dreams():
    user_id = get_jwt_identity()
    dreams = Dream.get_all_by_user(user_id)  # トークンのuser idに当たるものを参照
    return jsonify([dream.__dict__ for dream in dreams]), 200

# ドリーム新規作成
@dream_bp.route('/dreams/mine', methods=['POST'])
@jwt_required()
def create_dream():
    data = request.get_json()
    content = data.get('content')
    is_public = data.get('is_public')
    user_id = get_jwt_identity() # JWTトークンのヘッダからuser_idを取得

    if content:  # 内容があれば
        # ドリームを作成してSQL保存
        created_dream = Dream.create(user_id, content, is_public)
        # 作成した夢を返す
        return jsonify(created_dream.__dict__), 201
    else:
        return "",400

# ドリーム削除
@dream_bp.route('/dreams/mine/<int:dream_id>', methods=['DELETE'])
@jwt_required()
def delete_dream(dream_id):  # ドリームIDに基づいて削除
    user_id = get_jwt_identity() # get jwt
    if user_id: # 認証
        if Dream.delete(dream_id):
            return "",204 # 成功
