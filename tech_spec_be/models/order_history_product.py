from sqlalchemy import ForeignKeyConstraint

from resources.db import db


class OrderHistoryProductModel(db.Model):
    __tablename__ = "order_history_product"

    # order_history_product_id = db.Column(db.BigInteger, primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey("product.product_id", ondelete="CASCADE"), primary_key=True)
    order_history_id = db.Column(db.BigInteger, db.ForeignKey("order_history.order_history_id", ondelete="CASCADE"), primary_key=True)

    __table_args__ = (
        db.UniqueConstraint("product_id", "order_history_id"),
    )
