from flask import Blueprint, jsonify
from models.dream import Dream

public_dream_bp = Blueprint("public_dream", __name__)


# 公開されている夢を取得
@public_dream_bp.route("/dreams/public", methods=["GET"])
def get_public_dreams():
    public_dreams = Dream.get_all_public_dreams()
    return jsonify([dream.__dict__ for dream in public_dreams]), 200


# いいね数をインクリメントする
@public_dream_bp.route("/dreams/public/<int:dream_id>", methods=["PATCH"])
def increment_like_count(dream_id):
    # 該当の夢を取得
    dream = Dream.get_by_id(dream_id)
    # インクリメントしたいいね数に更新
    likes_count = dream.likes + 1
    updated_dream = Dream.update_likes(dream_id=dream_id, likes=likes_count)
    if updated_dream is None:
        return "", 404

    return jsonify(updated_dream.__dict__), 200
