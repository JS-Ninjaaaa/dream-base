from flask import Blueprint, jsonify, request
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
        return "Email and password are required", 400

    user = User.get_user_by_email(body.email)
    if user is not None:
        return "Email is already taken", 409

    new_user = User.create_user(body.email, body.password)
    if new_user is None:
        return "Failed to create user", 500

    try:
        new_user = UserResponse(**new_user.__dict__)
    except ValidationError:
        return "Response Validation Error", 500

    return jsonify(new_user.model_dump()), 201
