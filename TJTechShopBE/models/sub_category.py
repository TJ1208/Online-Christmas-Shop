from resources.db import db


class SubCategoryModel(db.Model):
    __tablename__ = "sub_category"

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    category_id = db.Column(db.BigInteger, db.ForeignKey("category.category_id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    category = db.relationship("CategoryModel", backref="category", lazy=True)

