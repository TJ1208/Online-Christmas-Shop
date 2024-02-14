from flask import jsonify, request
from flask.views import MethodView
from flask_mail import Message
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.user import UserModel
from resources.db import db, bcrypt, mail
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
                user.authenticated = user_data["authenticated"]
                user.reset_code = user_data["reset_code"]

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


@blp.route("/user/reset-password/<string:email>")
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
                user.reset_code = user_data["reset_code"]

            db.session.add(user)
            db.session.commit()

            msg = Message(
                subject=f"TJTechShop Password Reset",
                sender="mailtrap@tcjcoding.com",
                recipients=[user.email],
                html=f"""<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Document</title>
</head>

<body style='font-family:sans-serif; overflow-x: clip;'>
    <table cellspacing='0' cellpadding='0' width='100%' border='0'>
        <tbody>
            <tr width="100%" style="display: flex; justify-content: center; align-items: center;">
                <td>&nbsp;</td>
                <td width='720'></td>
                <table cellspacing='0' cellpadding='0' width='100%' border='0'>
                    <tbody>
                        <tr>
                            <td style='font-weight: bolder; font-size: x-large; opacity: 0.8; text-align: center;'>
                                <img src="https://tjcoding.sirv.com/website-images/tjtech-shop-image.png"
                                    alt="Shop Logo"
                                    style="object-fit: cover; height: 5em; background-color: black; border-radius: 5px; border-style: solid;">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <hr width='100%' size='1'>
                            </td>
                        </tr>
                        <tr>
                            <td style='padding-left: 60px; padding-right: 60px;'>
                                <table cellspacing='0' cellpadding='0' width='100%'>
                                    <tbody>
                                        <tr>
                                            <td style='text-align: center;'>
                                                <h2>Password Reset</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;">
                                                Use the reset code below to reset your password.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr width='100%' size='1'>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                style='font-size: xx-large; letter-spacing: 5px; display: flex; align-items: center; justify-content: center;'>
                                                <div style="border-style: groove; border-radius: 5px; display: flex; gap: 1em; align-items: center; justify-content: center; width: fit-content; padding-left: 1em; padding-right: 1em;">
                                                    <h2>{user.reset_code[0:3]}</h2>
                                                    <h2>{user.reset_code[3:len(user_data["reset_code"])]}</h2>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <hr width='100%' size='1'>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style='text-align: center;'>
                                                <h5 style='text-align: center;'>Connect With Us!</h5>
                                                <a href='https://m.facebook.com/taylor.joostema.7/'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-facebook.svg'
                                                        alt='Facebook Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                                <a href='https://twitter.com/TJoostema71515'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-twitterx.svg'
                                                        alt='Twitter Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                                <a href='https://www.linkedin.com/in/taylor-joostema-26ba66244/'>
                                                    <img src='https://tjcoding.sirv.com/website-images/icons8-linkedin.svg'
                                                        alt='LinkedIn Icon'
                                                        style='height: 2.5em; width: 2.5em; object-fit: contain; padding: 0.1em;'>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Questions or Concerns?</h5>
                                                <h5>Please reach out to the team at <span
                                                        style='color: rgb(96 165 250);'>TaylorJ1208@yahoo.com</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tr>
        </tbody>
    </table>
</body>

</html>""")
            mail.send(msg)
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