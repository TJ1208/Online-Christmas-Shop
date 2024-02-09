from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.shipping_method import ShippingMethodModel
from resources.db import db
from schemas import PlainShippingMethodSchema

blp = Blueprint("ShippingMethodModel", __name__, description="Operations on shipping_method")


@blp.route("/shipping_method")
class ShippingMethod(MethodView):

    @blp.response(200, PlainShippingMethodSchema(many=True))
    def get(self):
        return ShippingMethodModel.query.all()

    @blp.arguments(PlainShippingMethodSchema)
    @blp.response(201, PlainShippingMethodSchema)
    def post(self, shipping_method_data):
        shipping_method = ShippingMethodModel(**shipping_method_data)
        try:
            db.session.add(shipping_method)
            db.session.commit()
        except SQLAlchemyError as e:
            return e

        return shipping_method


@blp.route("/shipping_method/<string:name>")
class ShippingMethodExt(MethodView):

    @blp.response(200, PlainShippingMethodSchema)
    def get(self, name):
        shipping_method = ShippingMethodModel.query.filter(ShippingMethodModel.name == name).first()
        if not shipping_method:
            abort(404,
                  message=f"No shipping_method found with the name: {name}")
        else:
            return shipping_method

    @blp.arguments(PlainShippingMethodSchema)
    @blp.response(201, PlainShippingMethodSchema)
    def put(self, shipping_method_data, name):
        try:
            shipping_method = ShippingMethodModel.query.filter(ShippingMethodModel.name == name).first()
            if not shipping_method:
                abort(404,
                      message=f"No shipping_method exists with the name: {name}")
            else:
                shipping_method.name = shipping_method_data["name"]
                shipping_method.rate = shipping_method_data["rate"]
                shipping_method.early_arrival = shipping_method_data["early_arrival"]
                shipping_method.late_arrival = shipping_method_data["late_arrival"]

            db.session.add(shipping_method)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"Shipping Method, {shipping_method_data['name']}, already exists")

        return shipping_method

    @blp.response(200)
    def delete(self, name):
        shipping_method = ShippingMethodModel.query.filter(ShippingMethodModel.name == name).first()
        if not shipping_method:
            abort(404,
                  message=f"No shipping_method exists with the name: {name}")
        else:
            db.session.delete(shipping_method)
            db.session.commit()
            return {"message": f"{name} shipping_method has been deleted.", "status": 200}


@blp.route("/shipping_method/id/<int:shipping_id>")
class ShippingMethodId(MethodView):

    @blp.response(200, PlainShippingMethodSchema)
    def get(self, shipping_id):
        shipping_method = ShippingMethodModel.query.get_or_404(shipping_id,
                                                  description=f"No shipping method exists with the id: {shipping_id}")
        return shipping_method
