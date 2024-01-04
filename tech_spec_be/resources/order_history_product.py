from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.order_history_product import OrderHistoryProductModel
from resources.db import db
from schemas import PlainOrderHistoryProductSchema, UpdateOrderHistoryProductSchema

blp = Blueprint("OrderHistoryProductSchema", __name__, description="Operations on order_history_product")


@blp.route("/order_history_product")
class OrderHistoryProduct(MethodView):

    @blp.response(200, PlainOrderHistoryProductSchema(many=True))
    def get(self):
        return OrderHistoryProductModel.query.all()

    @blp.arguments(PlainOrderHistoryProductSchema)
    @blp.response(201, PlainOrderHistoryProductSchema)
    def post(self, order_history_product_data):
        order_history_product = OrderHistoryProductModel(**order_history_product_data)

        try:
            db.session.add(order_history_product)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding product to order history.")

        return order_history_product


@blp.route("/order_history_product/<int:order_history_id>/<int:product_id>")
class OrderHistoryProductExt(MethodView):

    @blp.response(200, PlainOrderHistoryProductSchema)
    def get(self, order_history_id, product_id):
        order_history_product = OrderHistoryProductModel.query.filter(OrderHistoryProductModel.order_history_id == order_history_id and
                                                                      OrderHistoryProductModel.product_id == product_id).first()
        if not order_history_product:
            abort(404,
                  message=f"No order history exists with the id: {order_history_id}, and product id: {order_history_id}")
        else:
            return order_history_product

    @blp.arguments(UpdateOrderHistoryProductSchema)
    @blp.response(201, PlainOrderHistoryProductSchema)
    def put(self, order_history_product_data, order_history_id, product_id):

        order_history_product = OrderHistoryProductModel.query.filter(OrderHistoryProductModel.order_history_id == order_history_id and
                                                                      OrderHistoryProductModel.product_id == product_id).first()
        if not order_history_product:
            abort(404,
                  message=f"No product exists with the id: {order_history_id}, and image id: {product_id}")
        else:
            order_history_product.order_history_id = order_history_product_data["order_history_id"]
            order_history_product.product_id = order_history_product_data["product_id"]

        db.session.add(order_history_product)
        db.session.commit()

        return order_history_product

    @blp.response(200)
    def delete(self, order_history_id, product_id):

        order_history_product = OrderHistoryProductModel.query.filter(OrderHistoryProductModel.order_history_id == order_history_id and
                                                                      OrderHistoryProductModel.product_id == product_id).first()
        if not order_history_product:
            abort(404,
                  message=f"No product exists with the id: {order_history_id}, and image id: {product_id}")
        else:
            db.session.delete(order_history_product)
            db.session.commit()

        return f"product with the id: {order_history_id}, and image id: {product_id}, has been deleted."
