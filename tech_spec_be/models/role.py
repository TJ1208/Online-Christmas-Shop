from resources.db import db

class RoleModel(db.Model):
    __tablename__ = "role"

    role_id = db.Column(db.BigInteger, primary_key=True)
    type = db.Column(db.String(50), nullable=False, unique=True)