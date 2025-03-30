from flask import Blueprint, jsonify, request, current_app
from models.user import User
from pydantic import ValidationError
from schemas.user import CreateUserBody, UserResponse

user_bp = Blueprint("user", __name__)


@user_bp.route("/users", methods=["POST"])
def create_user():
    body = request.get_json()
    try:
        body = CreateUserBody(**body)
    except ValidationError:
        current_app.logger.error("Validation Error")
        return "Invalid request body", 400

    user = User.get_user_by_email(body.email)
    if user is not None:
        current_app.logger.error("Validation Error")
        return "Email is already taken", 409

    new_user = User.create_user(body.email, body.password)
    if new_user is None:
        current_app.logger.error("Validation Error")
        return "Failed to create user", 500

    try:
        new_user = UserResponse(**new_user.__dict__)
    except ValidationError:
        current_app.logger.error("Response Validation Error")
        return "Response Validation Error", 500

    return jsonify(new_user.model_dump()), 201
