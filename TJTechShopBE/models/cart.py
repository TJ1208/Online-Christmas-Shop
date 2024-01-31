from resources.db import db


class CartModel(db.Model):
    __tablename__ = "cart"

    cart_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey("user.user_id", ondelete="CASCADE"), unique=True, nullable=False)
    products = db.relationship("ProductModel", secondary="cart_product", back_populates="carts")
