from flask import Flask
from flask_jwt_extended import JWTManager
from .models import db, bcrypt
from flask_migrate import Migrate
from flask_cors import CORS
# Initialize migrate

jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile('config.py', silent=True)
    CORS(app)

    jwt.init_app(app)
    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        db.create_all()  # Creates the tables if they don't exist

    return app
