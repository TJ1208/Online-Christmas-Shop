from flask import jsonify, request, abort
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity, create_access_token, create_refresh_token, \
    set_access_cookies, set_refresh_cookies
from flask_smorest import Blueprint

from models.user import UserModel
from resources.db import bcrypt

blp = Blueprint("JwtToken", __name__, description="Operations on user token")


@blp.get("/token")
@jwt_required()
def token():
    claims = get_jwt()
    return jsonify(claims)


@blp.get("/refresh")
@jwt_required(refresh=True)
def refresh_access():
    identity = get_jwt_identity()

    new_access_token = create_access_token(identity=identity)

    return jsonify({"access_token": new_access_token})


@blp.post("/login")
def login_user():

    data = UserModel(**request.get_json())
    user = UserModel.query.filter(UserModel.email == data.email).first()

    if not user:
        abort(404,
              message=f"No account exists for: {data.email}")
    elif bcrypt.check_password_hash(user.password, data.password):
        additional_claims = {"username": user.username, "role": user.role_id}
        access_token = create_access_token(identity=user.username, additional_claims=additional_claims)
        refresh_token = create_refresh_token(identity=user.username)
        response = jsonify(access_token=access_token, refresh_token=refresh_token)
        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        return jsonify(
            {
                "message": "Logged In",
                "tokens": {
                    "access": access_token,
                    "refresh": refresh_token
                }
            }
        ), 200
    else:
        abort(400,
              message=f"Password entered was incorrect.")
