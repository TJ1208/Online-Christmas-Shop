from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError

from models.brand import BrandModel
from resources.db import db
from schemas import PlainBrandSchema, UpdateBrandSchema

blp = Blueprint("BrandModel", __name__, description="Operations on brand")


@blp.route("/brand")
class Brand(MethodView):

    @blp.response(200, PlainBrandSchema(many=True))
    def get(self):
        return BrandModel.query.all()

    @blp.arguments(PlainBrandSchema)
    @blp.response(201, PlainBrandSchema)
    def post(self, brand_data):
        brand = BrandModel(**brand_data)
        try:
            db.session.add(brand)
            db.session.commit()
        except SQLAlchemyError as e:
            return e

        return brand


@blp.route("/brand/<string:name>")
class BrandExt(MethodView):

    @blp.response(200, PlainBrandSchema)
    def get(self, name):
        brand = BrandModel.query.filter(BrandModel.name == name).first()
        if not brand:
            abort(404,
                  message=f"No brand found with the name: {name}")
        else:
            return brand

    @blp.arguments(PlainBrandSchema)
    @blp.response(201, UpdateBrandSchema)
    def put(self, brand_data, name):
        try:
            brand = BrandModel.query.filter(BrandModel.name == name).first()
            if not brand:
                abort(404,
                      message=f"No brand exists with the name: {name}")
            else:
                brand.name = brand_data["name"]
            db.session.add(brand)
            db.session.commit()
        except SQLAlchemyError:
            abort(500,
                  message=f"Brand name, {brand_data['name']}, already exists")

        return brand

    @blp.response(200)
    def delete(self, name):
        brand = BrandModel.query.filter(BrandModel.name == name).first()
        if not brand:
            abort(404,
                  message=f"No brand exists with the name: {name}")
        else:
            db.session.delete(brand)
            db.session.commit()
            return {"message": f"{name} brand has been deleted.", "status": 200}
