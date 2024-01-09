from flask import jsonify, request
from flask.views import MethodView
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, set_access_cookies, create_refresh_token, \
    get_jwt_identity, set_refresh_cookies
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.user import UserModel
from resources.db import db, bcrypt
from schemas import PlainUserSchema, UpdateUserSchema

blp = Blueprint("UserModel", __name__, description="Operations on user")


@blp.route("/user")
class User(MethodView):

    @blp.response(200, PlainUserSchema(many=True))
    def get(self):
        """

        :return list(users):
        """
        return UserModel.query.all()

    @blp.arguments(PlainUserSchema)
    @blp.response(201, PlainUserSchema)
    def post(self, user_data):
        """

        :param user_data:
        :return user:
        """
        user = UserModel(**user_data)
        user.password = bcrypt.generate_password_hash(user.password).decode('utf-8')

        try:
            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message=f"An account already exists under: {user.email}.")

        return user


@blp.route("/user/<string:email>")
class UserExt(MethodView):

    @blp.response(200, PlainUserSchema)
    def get(self, email):
        """

        :param email:
        :return user:
        """
        user = UserModel.query.filter(UserModel.email == email).first()
        if not user:
            abort(404,
                  message=f'No account exists with the email: {email}')
        else:
            return user

    @blp.arguments(UpdateUserSchema)
    @blp.response(201, PlainUserSchema)
    def put(self, user_data, email):
        """

        :param user_data:
        :param email:
        :return user:
        """
        try:
            user = UserModel.query.filter(UserModel.email == email).first()
            if not user:
                # user = UserModel(**user_data)
                abort(404,
                      message=f"No account exists with the email {email}")
            else:
                user.first_name = user_data["first_name"]
                user.last_name = user_data["last_name"]
                user.email = user_data["email"]
                user.password = bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
                user.create_time = user.create_time
                user.age = user_data["age"]
                user.role_id = user_data["role_id"]
                user.phone_number = user_data["phone_number"]

            db.session.add(user)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"An account already exists with the email: {user_data['email']}")

        return user

    @blp.response(200)
    def delete(self, email):
        """

        :param email:
        :return string:
        """
        user = UserModel.query.filter(UserModel.email == email).first()
        if not user:
            abort(404,
                  message=f"No account exists with the email: {email}")
        else:
            db.session.delete(user)
            db.session.commit()
            return f"Account registered with the email, {email}, has been removed."
