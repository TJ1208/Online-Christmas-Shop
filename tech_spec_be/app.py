import os

from resources.db import db, bcrypt, jwt
from flask import Flask
from models import *
from flask_smorest import Api
from resources.user import blp as UserBlueprint
from resources.role import blp as RoleBlueprint
from resources.category import blp as CategoryBlueprint
from resources.image import blp as ImageBlueprint
from resources.order import blp as OrderBlueprint
from resources.order_product import blp as OrderProductBlueprint
from resources.order_history import blp as OrderHistoryBlueprint
from resources.order_history_product import blp as OrderHistoryProductBlueprint
from resources.product import blp as ProductBlueprint
from resources.product_image import blp as ProductImageBlueprint
from resources.jwt_token import blp as JwtTokenBlueprint

from flask_cors import CORS
cors = CORS() 


def create_app(db_url=None):
    app = Flask(__name__)
    # CORS(app, origins=["http://localhost:3000"])
    # Exceptions in an extension of flask are propagated
    app.config["PROPAGATE_EXCEPTIONS"] = True
    # Title / Version of documentation
    app.config["API_TITLE"] = "Tech Spec Rest API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URI_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URI"] = "https://github.com/swagger-api/swagger-ui/dist"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or os.getenv("DATABASE_URL"
                                                                , "mysql+pymysql://tjcoding:WakeID12!!@techspecdatabase.mysql.database.azure.com/tech_spec")
    app.config["JWT_SECRET_KEY"] = "Tech-Spec-JWT-Token"
    app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
    app.config["JWT_COOKIE_SECURE"] = False
    app.config['CORS_SUPPORTS_CREDENTIALS'] = True

    api = Api(app)

    api.register_blueprint(UserBlueprint)
    api.register_blueprint(RoleBlueprint)
    api.register_blueprint(CategoryBlueprint)
    api.register_blueprint(ImageBlueprint)
    api.register_blueprint(OrderBlueprint)
    api.register_blueprint(OrderProductBlueprint)
    api.register_blueprint(OrderHistoryBlueprint)
    api.register_blueprint(OrderHistoryProductBlueprint)
    api.register_blueprint(ProductBlueprint)
    api.register_blueprint(ProductImageBlueprint)
    api.register_blueprint(JwtTokenBlueprint)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    app = app
    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    create_app()