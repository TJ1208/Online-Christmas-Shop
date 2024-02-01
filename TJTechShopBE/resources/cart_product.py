from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.cart_product import CartProductModel
from resources.db import db
from schemas import PlainCartProductSchema, UpdateCartProductSchema, CartProductSchema

blp = Blueprint("CartProductSchema", __name__, description="Operations on cart_product")


@blp.route("/cart_product/<int:cart_id>")
class CartProduct(MethodView):

    @blp.response(200, CartProductSchema(many=True))
    def get(self, cart_id):
        return CartProductModel.query.filter(CartProductModel.cart_id == cart_id)

    @blp.arguments(PlainCartProductSchema)
    @blp.response(201, CartProductSchema)
    def post(self, cart_product_data, cart_id):
        cart_product = CartProductModel(**cart_product_data)

        try:
            db.session.add(cart_product)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding product to cart.")

        return cart_product


@blp.route("/cart_product/<int:cart_id>/<int:product_id>")
class CartProductExt(MethodView):

    @blp.response(200, CartProductSchema)
    def get(self, cart_id, product_id):
        cart_product = CartProductModel.query.filter(CartProductModel.cart_id == cart_id or CartProductModel.product_id == product_id).first()
        if not cart_product:
            abort(404,
                  message=f"No cart exists with the id: {cart_id}, and product id: {product_id}")
        else:
            return cart_product

    @blp.arguments(PlainCartProductSchema)
    @blp.response(201, PlainCartProductSchema)
    def put(self, cart_product_data, cart_id, product_id):
        print(cart_id, product_id)
        cart_product = CartProductModel.query.filter(CartProductModel.cart_id == cart_id or CartProductModel.product_id == product_id).first()
        print(cart_product.cart_id, cart_product.product_id)
        if not cart_product:
            abort(404,
                  message=f"No cart exists with the id: {cart_id}, and product id: {product_id}")
        else:
            cart_product.quantity = cart_product_data["quantity"]

        db.session.add(cart_product)
        db.session.commit()

        return cart_product

    @blp.response(200)
    def delete(self, cart_id, product_id):

        cart_product = CartProductModel.query.filter(CartProductModel.cart_id == cart_id or CartProductModel.product_id == product_id).first()
        if not cart_product:
            abort(404,
                  message=f"No cart exists with the id: {cart_id}, and product id: {product_id}")
        else:
            db.session.delete(cart_product)
            db.session.commit()

        return f"Cart with the id: {cart_id}, and product id: {product_id}, has been deleted."
