from resources.db import db


class OrderModel(db.Model):
    __tablename__ = "order"

    order_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.user_id"), unique=False, nullable=False)
    address_id = db.Column(db.BigInteger, db.ForeignKey("address.address_id"), unique=False, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    user = db.relationship("UserModel", backref="user", lazy=True)
    address = db.relationship("AddressModel", backref="AddressModel", lazy=True)
    products = db.relationship("ProductModel", secondary="order_product", back_populates="orders")
