from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.call_for_tender import CallForTender, Response
from src.models.user import User
from src.main import db
from datetime import datetime

class CallForTenderResource(Resource):
    @jwt_required()
    def get(self, call_id):
        call = CallForTender.query.get_or_404(call_id)
        return jsonify(call.to_dict())
    
    @jwt_required()
    def put(self, call_id):
        call = CallForTender.query.get_or_404(call_id)
        data = request.get_json()
        
        # Mise à jour des champs simples
        for field in ['reference', 'client', 'date_reception', 'date_limite_reponse', 
                     'secteur_activite', 'description', 'cctp_url', 'statut']:
            if field in data:
                setattr(call, field, data[field])
        
        # Mise à jour des champs JSON
        if 'contact_principal' in data:
            call.contact_principal = data['contact_principal']
        
        # Mise à jour du responsable si nécessaire
        if 'responsable_id' in data:
            # Vérifier que l'utilisateur existe
            user = User.query.get(data['responsable_id'])
            if user:
                call.responsable_id = data['responsable_id']
        
        db.session.commit()
        return jsonify(call.to_dict())
    
    @jwt_required()
    def delete(self, call_id):
        call = CallForTender.query.get_or_404(call_id)
        
        # Vérifier si l'utilisateur est le responsable ou un administrateur
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        if call.responsable_id != current_user_id and current_user.role != 'admin':
            return {'message': 'Vous n\'êtes pas autorisé à supprimer cet appel d\'offres'}, 403
        
        db.session.delete(call)
        db.session.commit()
        return '', 204

class CallForTenderListResource(Resource):
    @jwt_required()
    def get(self):
        # Gestion des filtres
        statut = request.args.get('statut')
        client = request.args.get('client')
        responsable_id = request.args.get('responsable_id', type=int)
        search = request.args.get('search')
        
        query = CallForTender.query
        
        if statut:
            query = query.filter(CallForTender.statut == statut)
        
        if client:
            query = query.filter(CallForTender.client.ilike(f"%{client}%"))
        
        if responsable_id:
            query = query.filter(CallForTender.responsable_id == responsable_id)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    CallForTender.reference.ilike(search_term),
                    CallForTender.client.ilike(search_term),
                    CallForTender.description.ilike(search_term)
                )
            )
        
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        pagination = query.paginate(page=page, per_page=per_page)
        
        return {
            'items': [call.to_dict_simple() for call in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': page,
            'per_page': per_page
        }
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        # Validation des données
        if not all(k in data for k in ('reference', 'client', 'date_reception', 'date_limite_reponse')):
            return {'message': 'Données manquantes'}, 400
        
        # Récupération de l'utilisateur courant
        current_user_id = get_jwt_identity()
        
        # Conversion des dates si elles sont fournies en string
        date_reception = data['date_reception']
        if isinstance(date_reception, str):
            date_reception = datetime.fromisoformat(date_reception)
            
        date_limite_reponse = data['date_limite_reponse']
        if isinstance(date_limite_reponse, str):
            date_limite_reponse = datetime.fromisoformat(date_limite_reponse)
        
        # Création de l'appel d'offres
        call = CallForTender(
            reference=data['reference'],
            client=data['client'],
            date_reception=date_reception,
            date_limite_reponse=date_limite_reponse,
            secteur_activite=data.get('secteur_activite'),
            contact_principal=data.get('contact_principal'),
            description=data.get('description'),
            cctp_url=data.get('cctp_url'),
            statut=data.get('statut', 'en_cours'),
            responsable_id=data.get('responsable_id', current_user_id)
        )
        
        db.session.add(call)
        db.session.commit()
        
        return jsonify(call.to_dict()), 201

class ResponseResource(Resource):
    @jwt_required()
    def get(self, call_id):
        # Récupérer toutes les réponses pour un appel d'offres spécifique
        responses = Response.query.filter_by(appel_offre_id=call_id).all()
        return jsonify([response.to_dict() for response in responses])
    
    @jwt_required()
    def post(self, call_id):
        # Vérifier que l'appel d'offres existe
        call = CallForTender.query.get_or_404(call_id)
        
        data = request.get_json()
        
        # Validation des données
        if 'titre' not in data:
            return {'message': 'Le titre de la réponse est requis'}, 400
        
        # Récupération de l'utilisateur courant
        current_user_id = get_jwt_identity()
        
        # Création de la réponse
        response = Response(
            appel_offre_id=call_id,
            titre=data['titre'],
            description=data.get('description'),
            produits_selectionnes=data.get('produits_selectionnes'),
            documents_associes=data.get('documents_associes'),
            contenu=data.get('contenu'),
            modele_utilise=data.get('modele_utilise'),
            createur_id=current_user_id,
            statut=data.get('statut', 'brouillon'),
            commentaires=data.get('commentaires')
        )
        
        db.session.add(response)
        db.session.commit()
        
        return jsonify(response.to_dict()), 201
