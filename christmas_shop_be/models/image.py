from resources.db import db


class ImageModel(db.Model):
    __tablename__ = "image"

    image_id = db.Column(db.BigInteger, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    products = db.relationship("ProductModel", secondary="product_image", back_populates="images")
