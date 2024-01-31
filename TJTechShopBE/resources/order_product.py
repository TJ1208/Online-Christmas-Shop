from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.order_product import OrderProductModel
from resources.db import db
from schemas import PlainOrderProductSchema, UpdateOrderProductSchema, OrderProductSchema

blp = Blueprint("OrderProductSchema", __name__, description="Operations on order_product")


@blp.route("/order_product")
class OrderProduct(MethodView):

    @blp.response(200, OrderProductSchema(many=True))
    def get(self):
        return OrderProductModel.query.all()

    @blp.arguments(PlainOrderProductSchema)
    @blp.response(201, OrderProductSchema)
    def post(self, order_product_data):
        order_product = OrderProductModel(**order_product_data)

        try:
            db.session.add(order_product)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding product to order.")

        return order_product


@blp.route("/order_product/<int:order_id>/<int:product_id>")
class OrderProductExt(MethodView):

    @blp.response(200, OrderProductSchema)
    def get(self, order_id, product_id):
        order_product = OrderProductModel.query.filter(OrderProductModel.order_id == order_id and
                                                       OrderProductModel.product_id == product_id).first()
        if not order_product:
            abort(404,
                  message=f"No order exists with the id: {order_id}, and product id: {product_id}")
        else:
            return order_product

    @blp.arguments(UpdateOrderProductSchema)
    @blp.response(201, PlainOrderProductSchema)
    def put(self, order_product_data, order_id, product_id):

        order_product = OrderProductModel.query.filter(OrderProductModel.order_id == order_id and
                                                       OrderProductModel.product_id == product_id).first()
        if not order_product:
            abort(404,
                  message=f"No order exists with the id: {order_id}, and product id: {product_id}")
        else:
            order_product.order_id = order_product_data["order_id"]
            order_product.product_id = order_product_data["product_id"]
            order_product.quantity = order_product_data["quantity"]

        db.session.add(order_product)
        db.session.commit()

        return order_product

    @blp.response(200)
    def delete(self, order_id, product_id):

        order_product = OrderProductModel.query.filter(OrderProductModel.order_id == order_id and
                                                       OrderProductModel.product_id == product_id).first()
        if not order_product:
            abort(404,
                  message=f"No order exists with the id: {order_id}, and product id: {product_id}")
        else:
            db.session.delete(order_product)
            db.session.commit()

        return f"Order with the id: {order_id}, and product id: {product_id}, has been deleted."
