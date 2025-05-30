from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from src.models.lexicon import LexiconTerm
from src.main import db

class LexiconTermResource(Resource):
    @jwt_required()
    def get(self, term_id):
        term = LexiconTerm.query.get_or_404(term_id)
        return jsonify(term.to_dict())
    
    @jwt_required()
    def put(self, term_id):
        term = LexiconTerm.query.get_or_404(term_id)
        data = request.get_json()
        
        # Mise à jour des champs simples
        for field in ['terme', 'definition', 'categorie', 'acronyme', 'contexte_utilisation', 'source']:
            if field in data:
                setattr(term, field, data[field])
        
        # Mise à jour des synonymes (champ JSON)
        if 'synonymes' in data:
            term.synonymes = data['synonymes']
        
        db.session.commit()
        return jsonify(term.to_dict())
    
    @jwt_required()
    def delete(self, term_id):
        term = LexiconTerm.query.get_or_404(term_id)
        db.session.delete(term)
        db.session.commit()
        return '', 204

class LexiconTermListResource(Resource):
    @jwt_required()
    def get(self):
        # Gestion des filtres
        categorie = request.args.get('categorie')
        search = request.args.get('search')
        
        query = LexiconTerm.query
        
        if categorie:
            query = query.filter(LexiconTerm.categorie == categorie)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    LexiconTerm.terme.ilike(search_term),
                    LexiconTerm.definition.ilike(search_term),
                    LexiconTerm.acronyme.ilike(search_term)
                )
            )
        
        # Tri par défaut
        query = query.order_by(LexiconTerm.terme)
        
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 50, type=int)
        
        pagination = query.paginate(page=page, per_page=per_page)
        
        return {
            'items': [term.to_dict() for term in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': page,
            'per_page': per_page
        }
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        # Validation des données
        if not all(k in data for k in ('terme', 'definition', 'categorie')):
            return {'message': 'Données manquantes'}, 400
        
        # Vérifier si le terme existe déjà
        existing_term = LexiconTerm.query.filter_by(terme=data['terme']).first()
        if existing_term:
            return {'message': 'Ce terme existe déjà dans le lexique'}, 400
        
        # Création du terme
        term = LexiconTerm(
            terme=data['terme'],
            definition=data['definition'],
            categorie=data['categorie'],
            acronyme=data.get('acronyme'),
            synonymes=data.get('synonymes'),
            contexte_utilisation=data.get('contexte_utilisation'),
            source=data.get('source')
        )
        
        db.session.add(term)
        db.session.commit()
        
        return jsonify(term.to_dict()), 201
