from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.order import OrderModel
from resources.db import db
from schemas import PlainOrderSchema, UpdateOrderSchema, OrderSchema

blp = Blueprint("OrderSchema", __name__, description="Operations on order")


@blp.route("/order")
class Order(MethodView):

    @blp.response(200, OrderSchema(many=True))
    def get(self):
        return OrderModel.query.all()

    @blp.arguments(OrderSchema)
    @blp.response(201, OrderSchema)
    def post(self, order_data):
        order = OrderModel(**order_data)

        try:
            db.session.add(order)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while placing order.")

        return order


@blp.route("/order/<int:order_id>")
class OrderExt(MethodView):

    @blp.response(200, OrderSchema)
    def get(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        return order

    @blp.arguments(UpdateOrderSchema)
    @blp.response(201, OrderSchema)
    def put(self, order_data, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        order.user_id = order_data["user_id"]
        order.address_id = order_data["address_id"]
        db.session.add(order)
        db.session.commit()

        return order

    @blp.response(200)
    def delete(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        db.session.delete(order)
        db.session.commit()
        return f"Order with the id, {order_id}, has been removed."
