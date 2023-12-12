from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.product import ProductModel
from resources.db import db
from schemas import PlainProductSchema, UpdateProductSchema, ProductSchema

blp = Blueprint("ProductModel", __name__, description="Operations on product")


@blp.route("/product")
class Product(MethodView):

    @blp.response(200, ProductSchema(many=True))
    def get(self):
        return ProductModel.query.all()

    @blp.arguments(PlainProductSchema)
    @blp.response(201, PlainProductSchema)
    def post(self, product_data):
        product = ProductModel(**product_data)

        try:
            db.session.add(product)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message=f"An error occurred while adding product.")

        return product


@blp.route("/product/<int:product_id>")
class ProductExt(MethodView):

    @blp.response(200, ProductSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id,
                                                description=f"No product exists with the id: {product_id}")
        return product

    @blp.arguments(UpdateProductSchema)
    @blp.response(201, ProductSchema)
    def put(self, product_data, product_id):

        product = ProductModel.query.get_or_404(product_id,
                                                description=f"No product exists with the id: {product_id}")
        product.name = product_data["name"]
        product.price = product_data["price"]
        product.sale_price = product_data["sale_price"]
        product.description = product_data["description"]
        product.category_id = product_data["category_id"]

        db.session.add(product)
        db.session.commit()

        return product

    @blp.response(200)
    def delete(self, product_id):
        product = ProductModel.query.get_or_404(product_id,
                                                description=f"No product exists with the id: {product_id}")
        db.session.delete(product)
        db.session.commit()
        return f"product with the id, {product_id}, has been removed."
