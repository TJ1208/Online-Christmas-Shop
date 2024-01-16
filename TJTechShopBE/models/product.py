from resources.db import db


class ProductModel(db.Model):
    __tablename__ = "product"

    product_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float(precision=2), nullable=False)
    sale_price = db.Column(db.Float(precision=2))
    description = db.Column(db.String(255), nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    category_id = db.Column(db.BigInteger, db.ForeignKey("sub_category.category_id", ondelete="CASCADE"), unique=False, nullable=False)
    orders = db.relationship("OrderModel", secondary="order_product", back_populates="products")
    images = db.relationship("ImageModel", secondary="product_image", back_populates="products")
    order_history = db.relationship("OrderHistoryModel", secondary="order_history_product", back_populates="products")
    brand_id = db.Column(db.BigInteger, db.ForeignKey("brand.brand_id", ondelete="CASCADE"), nullable=False, default=0)
