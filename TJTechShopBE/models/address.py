from resources.db import db


class AddressModel(db.Model):
    __tablename__ = "address"

    address_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.user_id", ondelete="CASCADE"), unique=False, nullable=False)
    user = db.relationship("UserModel", backref="UserModel", lazy=True)
    street = db.Column(db.String(255), nullable=False)
    apt = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.String(5), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=False)

