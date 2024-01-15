
from resources.db import db


class JwtRevokedModel(db.Model):
    __tablename__ = "jwt_revoked"

    jwt_id = db.Column(db.BigInteger, primary_key=True)
    revoked_token = db.Column(db.String(500), nullable=False)
