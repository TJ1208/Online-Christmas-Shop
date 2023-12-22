from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.image import ImageModel
from resources.db import db
from schemas import PlainImageSchema, UpdateImageSchema, ImageSchema

blp = Blueprint("ImageSchema", __name__, description="Operations on image")


@blp.route("/image")
class Image(MethodView):

    @blp.response(200, ImageSchema(many=True))
    def get(self):
        return ImageModel.query.all()

    @blp.arguments(PlainImageSchema)
    @blp.response(201, PlainImageSchema)
    def post(self, image_data):
        image = ImageModel(**image_data)

        try:
            db.session.add(image)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while adding image.")

        return image


@blp.route("/image/<int:image_id>")
class ImageExt(MethodView):

    @blp.response(200, ImageSchema)
    def get(self, image_id):
        image = ImageModel.query.get_or_404(image_id)
        return image

    @blp.arguments(UpdateImageSchema)
    @blp.response(201, ImageSchema)
    def put(self, image_data, image_id):

        image = ImageModel.query.get_or_404(image_id,
                                            description=f"No image exists with the id: {image_id}")
        image.url = image_data["url"]

        db.session.add(image)
        db.session.commit()

        return image

    @blp.response(200)
    def delete(self, image_id):
        image = ImageModel.query.get_or_404(image_id,
                                            description=f"No image exists with the id: {image_id}")
        db.session.delete(image)
        db.session.commit()
        return f"Image with the id, {image_id}, has been removed."
