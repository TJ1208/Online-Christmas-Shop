from resources.db import db


class OrderProductModel(db.Model):
    __tablename__ = "order_product"

    # order_product_id = db.Column(db.BigInteger, primary_key=True)
    order_id = db.Column(db.BigInteger, db.ForeignKey("order.order_id", ondelete="CASCADE"), primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey("product.product_id", ondelete="CASCADE"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)

    __table_args_ = (
        db.UniqueConstraint("order_id", "product_id"),
    )
