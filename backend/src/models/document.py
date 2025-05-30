from src.main import db
from datetime import datetime

class Document(db.Model):
    __tablename__ = 'documents'
    
    id = db.Column(db.Integer, primary_key=True)
    titre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(50), nullable=False)
    categorie_id = db.Column(db.Integer, nullable=True)
    fichier_url = db.Column(db.String(255), nullable=False)
    format = db.Column(db.String(20), nullable=False)
    taille = db.Column(db.Integer, nullable=True)
    produits_associes = db.Column(db.JSON, nullable=True)
    mots_cles = db.Column(db.JSON, nullable=True)
    auteur_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)
    date_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    version = db.Column(db.String(20), nullable=True)
    statut = db.Column(db.String(20), default='actif')
    
    # Relations
    auteur = db.relationship('User', backref='documents')
    
    def to_dict(self):
        return {
            'id': self.id,
            'titre': self.titre,
            'description': self.description,
            'type': self.type,
            'categorie_id': self.categorie_id,
            'fichier_url': self.fichier_url,
            'format': self.format,
            'taille': self.taille,
            'produits_associes': self.produits_associes,
            'mots_cles': self.mots_cles,
            'auteur_id': self.auteur_id,
            'auteur': f"{self.auteur.prenom} {self.auteur.nom}" if self.auteur else None,
            'date_creation': self.date_creation.isoformat() if self.date_creation else None,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'version': self.version,
            'statut': self.statut
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'titre': self.titre,
            'type': self.type,
            'format': self.format,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'statut': self.statut
        }
