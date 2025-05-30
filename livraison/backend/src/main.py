import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta
import os

# Initialisation de l'application Flask
app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USERNAME', 'root')}:{os.getenv('DB_PASSWORD', 'password')}@{os.getenv('DB_HOST', 'localhost')}:{os.getenv('DB_PORT', '3306')}/{os.getenv('DB_NAME', 'paritel_db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'dev-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Initialisation des extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
api = Api(app)

# Import des modèles pour les migrations
from src.models.user import User
from src.models.product import Product, Category, ProductCategory
from src.models.document import Document
from src.models.call_for_tender import CallForTender, Response
from src.models.lexicon import LexiconTerm

# Import des ressources API
from src.api.v1.resources.user import UserResource, UserListResource, UserLoginResource
from src.api.v1.resources.product import ProductResource, ProductListResource, CategoryResource, CategoryListResource
from src.api.v1.resources.document import DocumentResource, DocumentListResource
from src.api.v1.resources.call_for_tender import CallForTenderResource, CallForTenderListResource, ResponseResource
from src.api.v1.resources.lexicon import LexiconTermResource, LexiconTermListResource

# Enregistrement des routes API
api.add_resource(UserListResource, '/api/v1/users')
api.add_resource(UserResource, '/api/v1/users/<int:user_id>')
api.add_resource(UserLoginResource, '/api/v1/auth/login')

api.add_resource(ProductListResource, '/api/v1/products')
api.add_resource(ProductResource, '/api/v1/products/<int:product_id>')
api.add_resource(CategoryListResource, '/api/v1/categories')
api.add_resource(CategoryResource, '/api/v1/categories/<int:category_id>')

api.add_resource(DocumentListResource, '/api/v1/documents')
api.add_resource(DocumentResource, '/api/v1/documents/<int:document_id>')

api.add_resource(CallForTenderListResource, '/api/v1/calls')
api.add_resource(CallForTenderResource, '/api/v1/calls/<int:call_id>')
api.add_resource(ResponseResource, '/api/v1/calls/<int:call_id>/responses')

api.add_resource(LexiconTermListResource, '/api/v1/lexicon')
api.add_resource(LexiconTermResource, '/api/v1/lexicon/<int:term_id>')

# Gestion des erreurs JWT
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({
        'status': 401,
        'sub_status': 42,
        'message': 'Le token a expiré'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'status': 401,
        'sub_status': 43,
        'message': 'Token invalide'
    }), 401

@app.route('/')
def index():
    return jsonify({
        'message': 'Bienvenue sur l\'API du système de gestion Paritel',
        'version': 'v1',
        'status': 'online'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
