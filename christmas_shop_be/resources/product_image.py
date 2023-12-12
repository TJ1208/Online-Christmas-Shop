from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.product_image import ProductImageModel
from resources.db import db
from schemas import PlainProductImageSchema, UpdateProductImageSchema

blp = Blueprint("ProductImageSchema", __name__, description="Operations on product_image")


@blp.route("/product_image")
class ProductImage(MethodView):

    @blp.response(200, PlainProductImageSchema(many=True))
    def get(self):
        return ProductImageModel.query.all()

    @blp.arguments(PlainProductImageSchema)
    @blp.response(201, PlainProductImageSchema)
    def post(self, product_image_data):
        product_image = ProductImageModel(**product_image_data)

        try:
            db.session.add(product_image)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding image to product.")

        return product_image


@blp.route("/product_image/<int:product_id>/<int:image_id>")
class ProductImageExt(MethodView):

    @blp.response(200, PlainProductImageSchema)
    def get(self, product_id, image_id):
        product_image = ProductImageModel.query.filter(ProductImageModel.product_id == product_id and
                                                       ProductImageModel.image_id == image_id).first()
        if not product_image:
            abort(404,
                  message=f"No product exists with the id: {product_id}, and image id: {image_id}")
        else:
            return product_image

    @blp.arguments(UpdateProductImageSchema)
    @blp.response(201, PlainProductImageSchema)
    def put(self, product_image_data, product_id, image_id):

        product_image = ProductImageModel.query.filter(ProductImageModel.product_id == product_id and
                                                       ProductImageModel.image_id == image_id).first()
        if not product_image:
            abort(404,
                  message=f"No product exists with the id: {product_id}, and image id: {image_id}")
        else:
            product_image.product_id = product_image_data["product_id"]
            product_image.image_id = product_image_data["image_id"]

        db.session.add(product_image)
        db.session.commit()

        return product_image

    @blp.response(200)
    def delete(self, product_id, image_id):

        product_image = ProductImageModel.query.filter(ProductImageModel.product_id == product_id and
                                                       ProductImageModel.image_id == image_id).first()
        if not product_image:
            abort(404,
                  message=f"No product exists with the id: {product_id}, and image id: {image_id}")
        else:
            db.session.delete(product_image)
            db.session.commit()

        return f"product with the id: {product_id}, and image id: {image_id}, has been deleted."
