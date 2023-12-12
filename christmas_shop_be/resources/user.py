from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.user import UserModel
from resources.db import db
from schemas import PlainUserSchema, UpdateUserSchema

blp = Blueprint("UserModel", __name__, description="Operations on user")


@blp.route("/user")
class User(MethodView):

    @blp.response(200, PlainUserSchema(many=True))
    def get(self):
        return UserModel.query.all()

    @blp.arguments(PlainUserSchema)
    @blp.response(201, PlainUserSchema)
    def post(self, user_data):
        user = UserModel(**user_data)

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
        user = UserModel.query.filter(UserModel.email == email).first()
        if not user:
            abort(404,
                  message=f"No account exists with the email: {email}")
        else:
            return user

    @blp.arguments(UpdateUserSchema)
    @blp.response(201, PlainUserSchema)
    def put(self, user_data, email):

        user = UserModel.query.filter(UserModel.email == email).first()
        if not user:
            # user = UserModel(**user_data)
            abort(404,
                  message=f"No account exists with the email {email}")
        else:
            user.username = user_data["username"]
            user.email = user_data["email"]
            user.password = user_data["password"]
            user.create_time = user.create_time
            user.age = user_data["age"]

        db.session.add(user)
        db.session.commit()

        return user

    @blp.response(200)
    def delete(self, email):
        user = UserModel.query.filter(UserModel.email == email).first()
        if not user:
            abort(404,
                  message=f"No account exists with the email: {email}")
        else:
            db.session.delete(user)
            db.session.commit()
            return f"Account registered with the email, {email}, has been removed."


