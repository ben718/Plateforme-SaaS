from src.main import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    reference = db.Column(db.String(50), unique=True, nullable=False)
    nom = db.Column(db.String(100), nullable=False)
    description_courte = db.Column(db.String(255), nullable=False)
    description_complete = db.Column(db.Text, nullable=True)
    image_principale = db.Column(db.String(255), nullable=True)
    images_supplementaires = db.Column(db.JSON, nullable=True)
    specifications_techniques = db.Column(db.JSON, nullable=True)
    avantages = db.Column(db.JSON, nullable=True)
    cas_usage = db.Column(db.JSON, nullable=True)
    mots_cles = db.Column(db.JSON, nullable=True)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)
    date_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    statut = db.Column(db.String(20), default='actif')
    produits_complementaires = db.Column(db.JSON, nullable=True)
    
    # Relations
    categories = db.relationship('Category', secondary='product_categories', back_populates='products')
    
    def to_dict(self):
        return {
            'id': self.id,
            'reference': self.reference,
            'nom': self.nom,
            'description_courte': self.description_courte,
            'description_complete': self.description_complete,
            'image_principale': self.image_principale,
            'images_supplementaires': self.images_supplementaires,
            'specifications_techniques': self.specifications_techniques,
            'avantages': self.avantages,
            'cas_usage': self.cas_usage,
            'mots_cles': self.mots_cles,
            'date_creation': self.date_creation.isoformat() if self.date_creation else None,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'statut': self.statut,
            'produits_complementaires': self.produits_complementaires,
            'categories': [category.to_dict_simple() for category in self.categories]
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'reference': self.reference,
            'nom': self.nom,
            'description_courte': self.description_courte,
            'image_principale': self.image_principale,
            'statut': self.statut
        }


class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    niveau = db.Column(db.Integer, default=1)
    icone = db.Column(db.String(255), nullable=True)
    ordre = db.Column(db.Integer, default=0)
    statut = db.Column(db.String(20), default='actif')
    
    # Relations
    parent = db.relationship('Category', remote_side=[id], backref=db.backref('enfants', lazy='dynamic'))
    products = db.relationship('Product', secondary='product_categories', back_populates='categories')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nom': self.nom,
            'description': self.description,
            'parent_id': self.parent_id,
            'niveau': self.niveau,
            'icone': self.icone,
            'ordre': self.ordre,
            'statut': self.statut,
            'enfants': [enfant.to_dict_simple() for enfant in self.enfants],
            'produits': [product.to_dict_simple() for product in self.products]
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'nom': self.nom,
            'description': self.description,
            'niveau': self.niveau,
            'icone': self.icone,
            'statut': self.statut
        }


class ProductCategory(db.Model):
    __tablename__ = 'product_categories'
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), primary_key=True)
    principal = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        return {
            'product_id': self.product_id,
            'category_id': self.category_id,
            'principal': self.principal
        }
