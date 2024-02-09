from resources.db import db


class ShippingMethodModel(db.Model):
    __tablename__ = "shipping_method"

    shipping_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    rate = db.Column(db.Float(precision=2), nullable=False)
    early_arrival = db.Column(db.Integer, nullable=False)
    late_arrival = db.Column(db.Integer, nullable=False)