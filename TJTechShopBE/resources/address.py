from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.address import AddressModel
from resources.db import db
from schemas import PlainAddressSchema, AddressSchema

blp = Blueprint("AddressModel", __name__, description="Operations on address")


@blp.route("/address")
class Address(MethodView):

    @blp.response(200, AddressSchema(many=True))
    def get(self):
        return AddressModel.query.all()

    @blp.arguments(PlainAddressSchema)
    @blp.response(201, AddressSchema)
    def post(self, address_data):
        address = AddressModel(**address_data)
        try:
            db.session.add(address)
            db.session.commit()
        except SQLAlchemyError as e:
            return e

        return address


@blp.route("/address/<int:user_id>")
class AddressExt(MethodView):

    @blp.response(200, AddressSchema(many=True))
    def get(self, user_id):
        return AddressModel.query.filter(AddressModel.user_id == user_id)


@blp.route("/address/id/<int:address_id>")
class AddressId(MethodView):

    @blp.response(200, AddressSchema)
    def get(self, address_id):
        address = AddressModel.query.get_or_404(address_id,
                                                description=f"No address exists with the id: {address_id}")
        return address

    @blp.arguments(PlainAddressSchema)
    @blp.response(201, AddressSchema)
    def put(self, address_data, address_id):
        try:
            address = AddressModel.query.get_or_404(address_id)
            if not address:
                abort(404,
                      message=f"No address exists with the id: {address_id}")
            else:
                address.street = address_data["street"]
                address.apt = address_data["apt"]
                address.city = address_data["city"]
                address.country = address_data["country"]
                address.state = address_data["state"]
                address.zipcode = address_data["zipcode"]
                address.active = address_data["active"]

            db.session.add(address)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"An error occurred while updating Address with id, {address_id}")

        return address

    @blp.response(200)
    def delete(self, address_id):
        address = AddressModel.query.get_or_404(address_id)
        if not address:
            abort(404,
                  message=f"No address exists with the id: {address_id}")
        else:
            db.session.delete(address)
            db.session.commit()
            return {"message": f"Address with id, {address_id}, been deleted.", "status": 200}
