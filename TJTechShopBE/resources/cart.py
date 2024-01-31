from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.cart import CartModel
from resources.db import db
from schemas import PlainCartSchema, CartSchema

blp = Blueprint("CartModel", __name__, description="Operations on cart")


@blp.route("/cart")
class Cart(MethodView):

    @blp.response(200, CartSchema(many=True))
    def get(self):
        return CartModel.query.all()

    @blp.arguments(PlainCartSchema)
    @blp.response(201, CartSchema)
    def post(self, cart_data):
        cart = CartModel(**cart_data)
        try:
            db.session.add(cart)
            db.session.commit()
        except SQLAlchemyError as e:
            return e

        return cart


@blp.route("/cart/<int:user_id>")
class CartExt(MethodView):

    @blp.response(200, CartSchema)
    def get(self, user_id):
        cart = CartModel.query.filter(CartModel.user_id == user_id).first()
        if not cart:
            abort(404,
                  message=f"No Cart found with the id: {user_id}")
        else:
            return cart

    @blp.arguments(PlainCartSchema)
    @blp.response(201, CartSchema)
    def put(self, cart_data, cart_id):
        try:
            cart = CartModel.query.filter(CartModel.cart_id == cart_id).first()
            if not cart:
                abort(404,
                      message=f"No cart exists with the id: {cart_id}")
            else:
                cart.user_id = cart_data["user_id"]
            db.session.add(cart)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"Updating cart with user id, {cart_data['user_id']}, ran into an issue.")

        return cart


@blp.route("/cart/delete/<int:cart_id>")
class CartExtDelete(MethodView):

    @blp.response(200)
    def delete(self, cart_id):
        cart = CartModel.query.get_or_404(cart_id)
        if not cart:
            abort(404,
                  message=f"No cart exists with the id: {cart_id}")
        else:
            db.session.delete(cart)
            db.session.commit()
            return {"message": f"Cart with id, {cart_id}, has been deleted.", "status": 200}