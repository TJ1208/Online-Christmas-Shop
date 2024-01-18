from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from models.sub_category import SubCategoryModel
from resources.db import db
from schemas import PlainSubCategorySchema, SubCategorySchema

blp = Blueprint("SubCategoryModel", __name__, description="Operations on sub_category")


@blp.route("/sub/category")
class Category(MethodView):

    @blp.response(200, SubCategorySchema(many=True))
    def get(self):
        return SubCategoryModel.query.all()

    @blp.arguments(PlainSubCategorySchema)
    @blp.response(201, SubCategorySchema)
    def post(self, category_data):
        category = SubCategoryModel(**category_data)
        try:
            db.session.add(category)
            db.session.commit()
        except SQLAlchemyError as e:
            return e

        return category


@blp.route("/sub/category/<string:name>")
class CategoryExt(MethodView):

    @blp.response(200, PlainSubCategorySchema)
    def get(self, name):
        category = SubCategoryModel.query.filter(SubCategoryModel.name == name).first()
        if not category:
            abort(404,
                  message=f"No category found with the name: {name}")
        else:
            return category

    @blp.arguments(PlainSubCategorySchema)
    @blp.response(201, SubCategorySchema)
    def put(self, category_data, name):
        try:
            category = SubCategoryModel.query.filter(SubCategoryModel.name == name).first()
            if not category:
                abort(404,
                      message=f"No category exists with the name: {name}")
            else:
                category.name = category_data["name"]
                category.category_id = category_data["category_id"]
            db.session.add(category)
            db.session.commit()
        except SQLAlchemyError as e:
            print(e)
            abort(500,
                  message=f"Category name, {category_data['name']}, already exists")

        return category

    @blp.response(200)
    def delete(self, name):
        category = SubCategoryModel.query.filter(SubCategoryModel.name == name).first()
        if not category:
            abort(404,
                  message=f"No category exists with the name: {name}")
        else:
            db.session.delete(category)
            db.session.commit()
            return {"message": f"{name} category has been deleted.", "status": 200}
