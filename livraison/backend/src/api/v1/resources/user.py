from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from src.models.user import User
from src.main import db
from datetime import datetime

class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict())
    
    @jwt_required()
    def put(self, user_id):
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        if 'nom' in data:
            user.nom = data['nom']
        if 'prenom' in data:
            user.prenom = data['prenom']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'preferences' in data:
            user.preferences = data['preferences']
        if 'password' in data:
            user.password_hash = generate_password_hash(data['password'])
        
        db.session.commit()
        return jsonify(user.to_dict())
    
    @jwt_required()
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return '', 204

class UserListResource(Resource):
    @jwt_required()
    def get(self):
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        # Validation des données
        if not all(k in data for k in ('nom', 'prenom', 'email', 'password')):
            return {'message': 'Données manquantes'}, 400
        
        # Vérification si l'email existe déjà
        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Cet email est déjà utilisé'}, 400
        
        # Création de l'utilisateur
        user = User(
            nom=data['nom'],
            prenom=data['prenom'],
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'user'),
            preferences=data.get('preferences', {})
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify(user.to_dict()), 201

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        
        if not all(k in data for k in ('email', 'password')):
            return {'message': 'Email et mot de passe requis'}, 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return {'message': 'Email ou mot de passe incorrect'}, 401
        
        # Mise à jour de la dernière connexion
        user.derniere_connexion = datetime.utcnow()
        db.session.commit()
        
        # Génération des tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return {
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }, 200
