from resources.db import db


class OrderHistoryModel(db.Model):
    __tablename__ = "order_history"

    order_history_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.user_id", ondelete="CASCADE"))
    create_time = db.Column(db.Date, nullable=False)
    products = db.relationship("ProductModel", secondary="order_history_product", back_populates="order_history")
