from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.dream import Dream
from pydantic import ValidationError
from schemas.dream.mine import CreateMyDreamRequest, GetMyDreamsParams, MyDreamResponse

my_dream_bp = Blueprint("my_dream", __name__)


@my_dream_bp.route("/dreams/mine", methods=["GET"])
@jwt_required()
def get_my_dreams():
    user_id = get_jwt_identity()

    try:
        params = GetMyDreamsParams(**request.args)
    except ValidationError as e:
        current_app.logger.error("Invalid query parameters", exc_info=e)
        return "Invalid query parameter", 400

    dreams = Dream.get_all_by_user(user_id, params.sort_by)

    try:
        dreams = [MyDreamResponse(**dream.__dict__) for dream in dreams]
    except ValidationError as e:
        current_app.logger.error("Response validation failed", exc_info=e)
        return "Response Validation Error", 500

    return jsonify([dream.model_dump() for dream in dreams]), 200


@my_dream_bp.route("/dreams/mine", methods=["POST"])
@jwt_required()
def create_my_dream():

    body = request.get_json()

    try:
        body = CreateMyDreamRequest(**body)
    except ValidationError as e:
        current_app.logger.error("Invalid request body", exc_info=e)
        return "Invalid request body", 400

    user_id = get_jwt_identity()
    try:
        created_dream = Dream.create_with_hashtags(user_id, body)
    except Exception as e:
        current_app.logger.exception("Failed to create dream")
        return "Internal server error", 500

    try:
        created_dream = MyDreamResponse(**created_dream.__dict__)
    except ValidationError as e:
        current_app.logger.error("Response validation error", exc_info=e)
        return "Response Validation Error", 500

    return jsonify(created_dream.model_dump()), 201


@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["PATCH"])
@jwt_required()
def toggle_visibility(dream_id: int):
    try:
        updated_dream = Dream.toggle_visibility(dream_id)
    except Exception as e:
        current_app.logger.error.exception(f"Failed to toggle visibility for dream_id={dream_id}")
        return "Internal Server Error", 500

    if updated_dream is None:
        current_app.logger.warning(f"Dream with id {dream_id} not found for visibility toggle")
        return "", 404

    try:
        updated_dream = MyDreamResponse(**updated_dream.__dict__)
    except ValidationError as e:
        current_app.logger.error("Response validation error", exc_info=e)
        return "Response Validation Error", 500

    return jsonify(updated_dream.model_dump()), 200


@my_dream_bp.route("/dreams/mine/<int:dream_id>", methods=["DELETE"])
@jwt_required()
def delete_my_dream(dream_id: int):
    try:
        if Dream.delete(dream_id):
            current_app.logger.info(f"Deleted dream {dream_id}")
            return "", 204
        else:
            current_app.logger.warning(f"Attempted to delete non-existing dream {dream_id}")
            return "", 404
    except Exception as e:
        current_app.logger.exception("Failed to delete dream")
        return "Internal Server Error", 500
