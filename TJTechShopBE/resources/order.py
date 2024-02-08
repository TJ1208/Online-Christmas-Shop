from flask.views import MethodView
from flask_mail import Message
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from models.order import OrderModel
from resources.db import db, mail
from schemas import PlainOrderSchema, UpdateOrderSchema, OrderSchema

blp = Blueprint("OrderSchema", __name__, description="Operations on order")


@blp.route("/order")
class Order(MethodView):

    @blp.response(200, OrderSchema(many=True))
    def get(self):
        return OrderModel.query.all()

    @blp.arguments(PlainOrderSchema)
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

    @blp.response(200)
    def post(self, order_id):
        order = OrderModel.query.get_or_404(order_id,
                                            description=f"No order exists with the id: {order_id}")
        print(order)
        try:
            msg = Message(
                subject="TJTechShop Order#12345",
                sender="mailtrap@tcjcoding.com",
                recipients=[order.user.email],
                body="Thank you for your purchase!")
            mail.send(msg)
            # mail = mt.Mail(
            #     sender=mt.Address(email="TaylorJ1208@yahoo.com"),
            #     to=[mt.Address(email=order.user.email)],
            #     subject="TJTechShop Order#12345",
            #     text="Thank you for your purchase!",
            #     category="Integration Test"
            # )
            # client = mt.MailtrapClient(token="4909bbe4e80053f7457f598819de759d")
            # client.send(mail)
        except Exception as e:
            print(e)
        # for product in order.products:
        #     print(product)
