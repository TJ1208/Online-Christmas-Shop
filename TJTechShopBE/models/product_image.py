from resources.db import db


class ProductImageModel(db.Model):
    __tablename__ = "product_image"

    product_image_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey("product.product_id"))
    image_id = db.Column(db.BigInteger, db.ForeignKey("image.image_id"))

    __table_args_ = (
        db.UniqueConstraint("product_id", "image_id"),
    )
