from resources.db import db


class OrderModel(db.Model):
    __tablename__ = "order"

    order_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.user_id", ondelete="CASCADE"), unique=False, nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    user = db.relationship("UserModel", backref="user", cascade="all, delete", lazy=True)
    products = db.relationship("ProductModel", secondary="order_product", back_populates="orders")
