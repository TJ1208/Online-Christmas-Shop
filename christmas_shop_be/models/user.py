from resources.db import db


class UserModel(db.Model):
    __tablename__ = "user"

    user_id = db.Column(db.BigInteger, primary_key=True)
    role_id = db.Column(db.BigInteger, db.ForeignKey("role.role_id", ondelete="CASCADE"), unique=True, nullable=False, default=1)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    age = db.Column(db.SmallInteger)

    # used to share relation with another table
    # store_id = db.Column(db.Integer, db.ForeignKey("stores.id"), unique=False, nullable=False)
    # store = db.relationship("StoreModel", back_populates="items")
