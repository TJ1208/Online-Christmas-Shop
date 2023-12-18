from resources.db import db


class CategoryModel(db.Model):
    __tablename__ = "category"

    category_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    image_id = db.Column(db.BigInteger, db.ForeignKey("image.image_id"), unique=False, nullable=False)
    image = db.relationship("ImageModel", backref="category")

