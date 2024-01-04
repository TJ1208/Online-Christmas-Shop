from resources.db import db
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from models.role import RoleModel
from schemas import PlainRoleSchema

blp = Blueprint("RoleModel", __name__, description="Operations on user")


@blp.route("/role")
class Role(MethodView):

    @blp.response(200, PlainRoleSchema(many=True))
    def get(self):
        return RoleModel.query.all()

    @blp.arguments(PlainRoleSchema)
    @blp.response(201, PlainRoleSchema)
    def post(self, role_data):
        role = RoleModel(**role_data)

        try:
            db.session.add(role)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message=f"{role.type} role already exists.")

        return role


@blp.route("/role/<string:role_id>")
class RoleExt(MethodView):

    @blp.response(200, PlainRoleSchema)
    def get(self, role_id):
        role = RoleModel.query.filter(RoleModel.role_id == role_id).first()
        if not role:
            abort(404,
                  message=f"No role exists with the id: {role_id}")
        else:
            return role

    @blp.arguments(PlainRoleSchema)
    @blp.response(201, PlainRoleSchema)
    def put(self, role_data, role_id):
        try:
            role = RoleModel.query.filter(RoleModel.role_id == role_id).first()
            if not role:
                # user = RoleModel(**user_data)
                abort(404,
                      message=f"No role exists with the id: {role_id}")
            else:
                role.type = role_data["type"]

            db.session.add(role)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"{role_data['type']} role already exists.")

        return role

    @blp.response(200)
    def delete(self, role_id):
        role = RoleModel.query.filter(RoleModel.role_id == role_id).first()
        if not role:
            abort(404,
                  message=f"No role exists with the id: {role_id}")
        else:
            db.session.delete(role)
            db.session.commit()
            return f"{role.type} role has been deleted."
