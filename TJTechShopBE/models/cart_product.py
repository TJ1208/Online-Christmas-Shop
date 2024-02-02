from resources.db import db


class CartProductModel(db.Model):
    __tablename__ = "cart_product"

    cart_id = db.Column(db.BigInteger, db.ForeignKey("cart.cart_id", ondelete="CASCADE"), primary_key=True)
    product_id = db.Column(db.BigInteger, db.ForeignKey("product.product_id", ondelete="CASCADE"), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    cart = db.relationship("CartModel", backref="cart", lazy=True)
    product = db.relationship("ProductModel", backref="products", lazy=True)

    __table_args_ = (
        db.UniqueConstraint("cart_id", "product_id"),
    )
