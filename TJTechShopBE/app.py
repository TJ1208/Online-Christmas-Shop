import os

from resources.db import db, bcrypt, jwt
from flask import Flask
from flask_smorest import Api
from resources.user import blp as user_blueprint
from resources.role import blp as role_blueprint
from resources.category import blp as category_blueprint
from resources.image import blp as image_blueprint
from resources.order import blp as order_blueprint
from resources.order_product import blp as order_product_blueprint
from resources.order_history import blp as order_history_blueprint
from resources.order_history_product import blp as order_history_product_blueprint
from resources.product import blp as product_blueprint
from resources.product_image import blp as product_image_blueprint
from resources.jwt_token import blp as jwt_token_blueprint

from flask_cors import CORS

cors = CORS()

app = Flask(__name__)
# Exceptions in an extension of flask are propagated
app.config["PROPAGATE_EXCEPTIONS"] = True
# Title / Version of documentation
app.config["API_TITLE"] = "TJTechShop Rest APIs"
app.config["API_VERSION"] = "v1"
app.config["OPENAPI_VERSION"] = "3.0.3"
app.config["OPENAPI_URI_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URI"] = "https://github.com/swagger-api/swagger-ui/dist"

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL",
                                                  "mysql+pymysql://tjcoding:WakeID12!!@techspecdatabase.mysql.database.azure.com/tech_shop")
# mysql+pymysql://tjcoding:WakeID12!!@techspecdatabase.mysql.database.azure.com/tech_shop
# mysql+pymysql://root:WakeID12!!@localhost:3306/tech_shop
app.config["JWT_SECRET_KEY"] = "Tech-Spec-JWT-Token"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
app.config["JWT_COOKIE_SECURE"] = True
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_DOMAIN"] = ".azurewebsites.net"
api = Api(app)

api.register_blueprint(user_blueprint)
api.register_blueprint(role_blueprint)
api.register_blueprint(category_blueprint)
api.register_blueprint(image_blueprint)
api.register_blueprint(order_blueprint)
api.register_blueprint(order_product_blueprint)
api.register_blueprint(order_history_blueprint)
api.register_blueprint(order_history_product_blueprint)
api.register_blueprint(product_blueprint)
api.register_blueprint(product_image_blueprint)
api.register_blueprint(jwt_token_blueprint)

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app, origins=["https://techspec.azurewebsites.net", "http://localhost:3000"], supports_credentials=True)
app = app
with app.app_context():
    db.create_all()
