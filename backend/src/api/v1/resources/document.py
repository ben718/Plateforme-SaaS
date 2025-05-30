from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.document import Document
from src.models.user import User
from src.main import db
import os

class DocumentResource(Resource):
    @jwt_required()
    def get(self, document_id):
        document = Document.query.get_or_404(document_id)
        return jsonify(document.to_dict())
    
    @jwt_required()
    def put(self, document_id):
        document = Document.query.get_or_404(document_id)
        data = request.get_json()
        
        # Mise à jour des champs simples
        for field in ['titre', 'description', 'type', 'categorie_id', 'fichier_url', 
                     'format', 'taille', 'version', 'statut']:
            if field in data:
                setattr(document, field, data[field])
        
        # Mise à jour des champs JSON
        for field in ['produits_associes', 'mots_cles']:
            if field in data:
                setattr(document, field, data[field])
        
        db.session.commit()
        return jsonify(document.to_dict())
    
    @jwt_required()
    def delete(self, document_id):
        document = Document.query.get_or_404(document_id)
        
        # Vérifier si l'utilisateur est l'auteur ou un administrateur
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if document.auteur_id != current_user_id and current_user.role != 'admin':
            return {'message': 'Vous n\'êtes pas autorisé à supprimer ce document'}, 403
        
        # Supprimer le fichier physique si nécessaire
        # Note: Dans une implémentation réelle, il faudrait gérer la suppression du fichier
        
        db.session.delete(document)
        db.session.commit()
        return '', 204

class DocumentListResource(Resource):
    @jwt_required()
    def get(self):
        # Gestion des filtres
        type_doc = request.args.get('type')
        categorie_id = request.args.get('categorie_id', type=int)
        product_id = request.args.get('product_id', type=int)
        search = request.args.get('search')
        
        query = Document.query
        
        if type_doc:
            query = query.filter(Document.type == type_doc)
        
        if categorie_id:
            query = query.filter(Document.categorie_id == categorie_id)
        
        if product_id:
            # Recherche dans le champ JSON produits_associes
            query = query.filter(Document.produits_associes.contains([product_id]))
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    Document.titre.ilike(search_term),
                    Document.description.ilike(search_term)
                )
            )
        
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        pagination = query.paginate(page=page, per_page=per_page)
        
        return {
            'items': [document.to_dict() for document in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': page,
            'per_page': per_page
        }
    
    @jwt_required()
    def post(self):
        # Pour un upload de fichier, on utiliserait form-data
        # Mais pour simplifier, on suppose que le fichier est déjà uploadé et on reçoit l'URL
        data = request.get_json()
        
        # Validation des données
        if not all(k in data for k in ('titre', 'type', 'fichier_url', 'format')):
            return {'message': 'Données manquantes'}, 400
        
        # Récupération de l'utilisateur courant
        current_user_id = get_jwt_identity()
        
        # Création du document
        document = Document(
            titre=data['titre'],
            description=data.get('description'),
            type=data['type'],
            categorie_id=data.get('categorie_id'),
            fichier_url=data['fichier_url'],
            format=data['format'],
            taille=data.get('taille'),
            produits_associes=data.get('produits_associes'),
            mots_cles=data.get('mots_cles'),
            auteur_id=current_user_id,
            version=data.get('version', '1.0'),
            statut=data.get('statut', 'actif')
        )
        
        db.session.add(document)
        db.session.commit()
        
        return jsonify(document.to_dict()), 201
