from flask import Blueprint, jsonify, request
from models.user import User

user_bp = Blueprint("user", __name__)


@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email is None:
        return "Email is required", 400

    if password is None:
        return "Password is required", 400

    user = User.get_user_by_email(email)
    if user is not None:
        return "Email is already taken", 409

    new_user = User.create_user(email, password)
    return jsonify({"id": new_user.id, "email": new_user.email}), 201
