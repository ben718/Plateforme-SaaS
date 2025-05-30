from src.main import db
from datetime import datetime

class LexiconTerm(db.Model):
    __tablename__ = 'lexicon_terms'
    
    id = db.Column(db.Integer, primary_key=True)
    terme = db.Column(db.String(100), nullable=False)
    definition = db.Column(db.Text, nullable=False)
    categorie = db.Column(db.String(50), nullable=False)
    acronyme = db.Column(db.String(20), nullable=True)
    synonymes = db.Column(db.JSON, nullable=True)
    contexte_utilisation = db.Column(db.Text, nullable=True)
    source = db.Column(db.String(255), nullable=True)
    date_ajout = db.Column(db.DateTime, default=datetime.utcnow)
    date_modification = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'terme': self.terme,
            'definition': self.definition,
            'categorie': self.categorie,
            'acronyme': self.acronyme,
            'synonymes': self.synonymes,
            'contexte_utilisation': self.contexte_utilisation,
            'source': self.source,
            'date_ajout': self.date_ajout.isoformat() if self.date_ajout else None,
            'date_modification': self.date_modification.isoformat() if self.date_modification else None
        }
    
    def to_dict_simple(self):
        return {
            'id': self.id,
            'terme': self.terme,
            'categorie': self.categorie,
            'acronyme': self.acronyme
        }
