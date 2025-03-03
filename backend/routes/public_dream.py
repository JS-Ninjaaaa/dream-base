from flask import Blueprint, jsonify
from models.dream import Dream

public_dream_bp = Blueprint('public_dream', __name__)

# 公開されるドリーム取得
@public_dream_bp.route('/dreams/public', methods=['GET'])
def view_public_dream():
    public_dreams = Dream.get_all_public_dreams() # 該当データを集める
    return jsonify([dream.__dict__ for dream in public_dreams]), 200


# いいねのインクリメントを行うAPI
@public_dream_bp.route('/dreams/public/<int:dream_id>',methods=['POST'])
def increment_like_count(dream_id):
    dream = Dream.get_by_id(dream_id) # 該当のデータ抽出
    dream_count = dream.likes + 1
    # インクリメントした「いいね数」に更新
    if dream.update_likes(dream_id=dream_id,likes=dream_count):
        return jsonify(dream.__dict__), 200 # 更新されたデータだけ返す

