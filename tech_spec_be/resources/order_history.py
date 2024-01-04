from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.order_history import OrderHistoryModel
from resources.db import db
from schemas import PlainOrderHistorySchema, UpdateOrderHistorySchema, OrderHistorySchema

blp = Blueprint("OrderHistorySchema", __name__, description="Operations on order_history")


@blp.route("/order_history")
class OrderHistory(MethodView):

    @blp.response(200, OrderHistorySchema(many=True))
    def get(self):
        return OrderHistoryModel.query.all()

    @blp.arguments(PlainOrderHistorySchema)
    @blp.response(201, PlainOrderHistorySchema)
    def post(self, order_history_data):
        order_history = OrderHistoryModel(**order_history_data)

        try:
            db.session.add(order_history)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message=f"An error occurred while adding to users order_history.")

        return order_history


@blp.route("/order_history/<int:order_history_id>")
class OrderHistoryExt(MethodView):

    @blp.response(200, OrderHistorySchema)
    def get(self, order_history_id):
        order_history = OrderHistoryModel.query.get_or_404(order_history_id,
                                                           description=f"No order_history exists with the id: {order_history_id}")
        return order_history

    @blp.arguments(UpdateOrderHistorySchema)
    @blp.response(201, OrderHistorySchema)
    def put(self, order_history_data, order_history_id):

        order_history = OrderHistoryModel.query.get_or_404(order_history_id,
                                                           description=f"No order_history exists with the id: {order_history_id}")
        order_history.user_id = order_history_data["user_id"]

        db.session.add(order_history)
        db.session.commit()

        return order_history

    @blp.response(200)
    def delete(self, order_history_id):
        order_history = OrderHistoryModel.query.get_or_404(order_history_id,
                                                           description=f"No order_history exists with the id: {order_history_id}")
        db.session.delete(order_history)
        db.session.commit()
        return f"order_history with the id, {order_history_id}, has been removed."
