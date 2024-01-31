from resources.db import db


class OrderProductModel(db.Model):
    __tablename__ = "order_product"

    # order_product_id = db.Column(db.BigInteger, primary_key=True)
    order_id = db.Column(db.BigInteger, db.ForeignKey("order.order_id"), primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey("product.product_id"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    order = db.relationship("OrderModel", backref="order", cascade="all, delete", lazy=True)
    product = db.relationship("ProductModel", backref="product", cascade="all, delete", lazy=True)

    __table_args_ = (
        db.UniqueConstraint("order_id", "product_id"),
    )
