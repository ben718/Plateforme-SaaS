from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from src.models.product import Product, Category, ProductCategory
from src.main import db

class ProductResource(Resource):
    @jwt_required()
    def get(self, product_id):
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict())
    
    @jwt_required()
    def put(self, product_id):
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Mise à jour des champs simples
        for field in ['reference', 'nom', 'description_courte', 'description_complete', 
                     'image_principale', 'statut']:
            if field in data:
                setattr(product, field, data[field])
        
        # Mise à jour des champs JSON
        for field in ['images_supplementaires', 'specifications_techniques', 'avantages', 
                     'cas_usage', 'mots_cles', 'produits_complementaires']:
            if field in data:
                setattr(product, field, data[field])
        
        # Mise à jour des catégories si fournies
        if 'categories' in data:
            # Supprimer les associations existantes
            ProductCategory.query.filter_by(product_id=product.id).delete()
            
            # Ajouter les nouvelles associations
            for cat_data in data['categories']:
                category = Category.query.get(cat_data['id'])
                if category:
                    pc = ProductCategory(
                        product_id=product.id,
                        category_id=category.id,
                        principal=cat_data.get('principal', False)
                    )
                    db.session.add(pc)
        
        db.session.commit()
        return jsonify(product.to_dict())
    
    @jwt_required()
    def delete(self, product_id):
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        return '', 204

class ProductListResource(Resource):
    @jwt_required()
    def get(self):
        # Gestion des filtres
        category_id = request.args.get('category_id', type=int)
        status = request.args.get('status')
        search = request.args.get('search')
        
        query = Product.query
        
        if category_id:
            query = query.join(ProductCategory).filter(ProductCategory.category_id == category_id)
        
        if status:
            query = query.filter(Product.statut == status)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                db.or_(
                    Product.nom.ilike(search_term),
                    Product.description_courte.ilike(search_term),
                    Product.reference.ilike(search_term)
                )
            )
        
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        pagination = query.paginate(page=page, per_page=per_page)
        
        return {
            'items': [product.to_dict() for product in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'page': page,
            'per_page': per_page
        }
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        # Validation des données
        if not all(k in data for k in ('reference', 'nom', 'description_courte')):
            return {'message': 'Données manquantes'}, 400
        
        # Vérification si la référence existe déjà
        if Product.query.filter_by(reference=data['reference']).first():
            return {'message': 'Cette référence produit existe déjà'}, 400
        
        # Création du produit
        product = Product(
            reference=data['reference'],
            nom=data['nom'],
            description_courte=data['description_courte'],
            description_complete=data.get('description_complete'),
            image_principale=data.get('image_principale'),
            images_supplementaires=data.get('images_supplementaires'),
            specifications_techniques=data.get('specifications_techniques'),
            avantages=data.get('avantages'),
            cas_usage=data.get('cas_usage'),
            mots_cles=data.get('mots_cles'),
            statut=data.get('statut', 'actif'),
            produits_complementaires=data.get('produits_complementaires')
        )
        
        db.session.add(product)
        db.session.flush()  # Pour obtenir l'ID du produit
        
        # Ajout des catégories si fournies
        if 'categories' in data:
            for cat_data in data['categories']:
                category = Category.query.get(cat_data['id'])
                if category:
                    pc = ProductCategory(
                        product_id=product.id,
                        category_id=category.id,
                        principal=cat_data.get('principal', False)
                    )
                    db.session.add(pc)
        
        db.session.commit()
        
        return jsonify(product.to_dict()), 201

class CategoryResource(Resource):
    @jwt_required()
    def get(self, category_id):
        category = Category.query.get_or_404(category_id)
        return jsonify(category.to_dict())
    
    @jwt_required()
    def put(self, category_id):
        category = Category.query.get_or_404(category_id)
        data = request.get_json()
        
        for field in ['nom', 'description', 'parent_id', 'niveau', 'icone', 'ordre', 'statut']:
            if field in data:
                setattr(category, field, data[field])
        
        db.session.commit()
        return jsonify(category.to_dict())
    
    @jwt_required()
    def delete(self, category_id):
        category = Category.query.get_or_404(category_id)
        
        # Vérifier si la catégorie a des enfants
        if category.enfants.count() > 0:
            return {'message': 'Impossible de supprimer une catégorie qui contient des sous-catégories'}, 400
        
        # Vérifier si la catégorie est associée à des produits
        if ProductCategory.query.filter_by(category_id=category_id).count() > 0:
            return {'message': 'Impossible de supprimer une catégorie associée à des produits'}, 400
        
        db.session.delete(category)
        db.session.commit()
        return '', 204

class CategoryListResource(Resource):
    @jwt_required()
    def get(self):
        # Option pour récupérer uniquement les catégories racines
        root_only = request.args.get('root_only', 'false').lower() == 'true'
        
        if root_only:
            categories = Category.query.filter_by(parent_id=None).all()
        else:
            categories = Category.query.all()
        
        return jsonify([category.to_dict() for category in categories])
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        # Validation des données
        if 'nom' not in data:
            return {'message': 'Le nom de la catégorie est requis'}, 400
        
        # Création de la catégorie
        category = Category(
            nom=data['nom'],
            description=data.get('description'),
            parent_id=data.get('parent_id'),
            niveau=data.get('niveau', 1),
            icone=data.get('icone'),
            ordre=data.get('ordre', 0),
            statut=data.get('statut', 'actif')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify(category.to_dict()), 201
