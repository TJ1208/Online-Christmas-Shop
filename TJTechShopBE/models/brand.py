from resources.db import db


class BrandModel(db.Model):
    __tablename__ = "brand"

    brand_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
