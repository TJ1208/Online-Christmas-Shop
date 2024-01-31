from resources.db import db


class UserModel(db.Model):
    __tablename__ = "user"

    user_id = db.Column(db.BigInteger, primary_key=True)
    role_id = db.Column(db.BigInteger, db.ForeignKey("role.role_id", ondelete="CASCADE"), unique=False, nullable=False, default=1)
    first_name = db.Column(db.String(55), nullable=False)
    last_name = db.Column(db.String(55), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    create_time = db.Column(db.Date, nullable=False)
    age = db.Column(db.SmallInteger)
    phone_number = db.Column(db.String(10), nullable=False)
