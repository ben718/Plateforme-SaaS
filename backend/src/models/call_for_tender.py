from src.main import db
from datetime import datetime

class CallForTender(db.Model):
    __tablename__ = 'calls_for_tender'
    
    id = db.Column(db.Integer, primary_key=True)
    reference = db.Column(db.String(100), nullable=False)
    client = db.Column(db.String(255), nullable=False)
    date_reception = db.Column(db.DateTime, nullable=False)
    date_limite_reponse = db.Column(db.DateTime, nullable=False)
    secteur_activite = db.Column(db.String(100), nullable=True)
    contact_principal = db.Column(db.JSON, nullable=True)
    description = db.Column(db.Text, nullable=True)
    cctp_url = db.Column(db.String(255), nullable=True)
    statut = db.Column(db.String(20), default='en_cours')
    responsable_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)
    date_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relations
    responsable = db.relationship('User', backref='appels_offres')
    responses = db.relationship('Response', backref='appel_offre', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'reference': self.reference,
            'client': self.client,
            'date_reception': self.date_reception.isoformat() if self.date_reception else None,
            'date_limite_reponse': self.date_limite_reponse.isoformat() if self.date_limite_reponse else None,
            'secteur_activite': self.secteur_activite,
            'contact_principal': self.contact_principal,
            'description': self.description,
            'cctp_url': self.cctp_url,
            'statut': self.statut,
            'responsable_id': self.responsable_id,
            'responsable': f"{self.responsable.prenom} {self.responsable.nom}" if self.responsable else None,
            'date_creation': self.date_creation.isoformat() if self.date_creation else None,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'responses': [response.to_dict_simple() for response in self.responses]
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'reference': self.reference,
            'client': self.client,
            'date_limite_reponse': self.date_limite_reponse.isoformat() if self.date_limite_reponse else None,
            'statut': self.statut,
            'responsable': f"{self.responsable.prenom} {self.responsable.nom}" if self.responsable else None
        }


class Response(db.Model):
    __tablename__ = 'responses'
    
    id = db.Column(db.Integer, primary_key=True)
    appel_offre_id = db.Column(db.Integer, db.ForeignKey('calls_for_tender.id'), nullable=False)
    titre = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    produits_selectionnes = db.Column(db.JSON, nullable=True)
    documents_associes = db.Column(db.JSON, nullable=True)
    contenu = db.Column(db.JSON, nullable=True)
    modele_utilise = db.Column(db.String(100), nullable=True)
    createur_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date_creation = db.Column(db.DateTime, default=datetime.utcnow)
    date_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    statut = db.Column(db.String(20), default='brouillon')
    commentaires = db.Column(db.Text, nullable=True)
    
    # Relations
    createur = db.relationship('User', backref='responses')
    
    def to_dict(self):
        return {
            'id': self.id,
            'appel_offre_id': self.appel_offre_id,
            'titre': self.titre,
            'description': self.description,
            'produits_selectionnes': self.produits_selectionnes,
            'documents_associes': self.documents_associes,
            'contenu': self.contenu,
            'modele_utilise': self.modele_utilise,
            'createur_id': self.createur_id,
            'createur': f"{self.createur.prenom} {self.createur.nom}" if self.createur else None,
            'date_creation': self.date_creation.isoformat() if self.date_creation else None,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'statut': self.statut,
            'commentaires': self.commentaires
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'titre': self.titre,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None,
            'statut': self.statut,
            'createur': f"{self.createur.prenom} {self.createur.nom}" if self.createur else None
        }
