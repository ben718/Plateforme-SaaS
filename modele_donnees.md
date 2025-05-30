# Modèle de données pour le site web fonctionnel

## 1. Entités principales

### 1.1 Utilisateur
- id: identifiant unique
- nom: nom de l'utilisateur
- prenom: prénom de l'utilisateur
- email: adresse email (identifiant de connexion)
- mot_de_passe: mot de passe hashé
- role: rôle dans le système (admin, commercial, technique, etc.)
- date_creation: date de création du compte
- derniere_connexion: date de dernière connexion
- preferences: préférences utilisateur (JSON)

### 1.2 Produit
- id: identifiant unique
- reference: référence interne du produit
- nom: nom du produit
- description_courte: description brève
- description_complete: description détaillée (HTML)
- categorie_id: référence à la catégorie principale
- sous_categorie_id: référence à la sous-catégorie
- image_principale: URL de l'image principale
- images_supplementaires: liste d'URLs d'images (JSON)
- specifications_techniques: spécifications techniques (JSON)
- avantages: liste des avantages (JSON)
- cas_usage: cas d'utilisation recommandés (JSON)
- mots_cles: liste de mots-clés pour la recherche
- date_creation: date d'ajout au catalogue
- date_modification: date de dernière modification
- statut: statut du produit (actif, inactif, archive)
- produits_complementaires: liste d'IDs de produits complémentaires

### 1.3 Categorie
- id: identifiant unique
- nom: nom de la catégorie
- description: description de la catégorie
- parent_id: référence à la catégorie parente (pour sous-catégories)
- niveau: niveau dans la hiérarchie
- icone: icône représentative
- ordre: ordre d'affichage
- statut: statut (actif, inactif)

### 1.4 Document
- id: identifiant unique
- titre: titre du document
- description: description du document
- type: type de document (fiche technique, manuel, schéma, etc.)
- categorie_id: référence à la catégorie documentaire
- fichier_url: URL du fichier
- format: format du fichier (PDF, DOCX, etc.)
- taille: taille du fichier en octets
- produits_associes: liste d'IDs de produits associés
- mots_cles: liste de mots-clés pour la recherche
- auteur_id: référence à l'utilisateur créateur
- date_creation: date de création
- date_modification: date de dernière modification
- version: numéro de version
- statut: statut du document (actif, archive)

### 1.5 AppelOffre
- id: identifiant unique
- reference: référence de l'AO
- client: nom du client
- date_reception: date de réception de l'AO
- date_limite_reponse: date limite de réponse
- secteur_activite: secteur d'activité du client
- contact_principal: informations de contact principal
- description: description de l'AO
- cctp_url: URL du CCTP
- statut: statut de l'AO (en cours, répondu, gagné, perdu)
- responsable_id: référence à l'utilisateur responsable
- date_creation: date de création
- date_modification: date de dernière modification

### 1.6 ReponseAO
- id: identifiant unique
- appel_offre_id: référence à l'AO
- titre: titre de la réponse
- description: description de la réponse
- produits_selectionnes: liste d'IDs de produits inclus (JSON)
- documents_associes: liste d'IDs de documents inclus (JSON)
- contenu: contenu de la réponse (JSON/HTML)
- modele_utilise: modèle de document utilisé
- createur_id: référence à l'utilisateur créateur
- date_creation: date de création
- date_modification: date de dernière modification
- statut: statut de la réponse (brouillon, finalisée, envoyée)
- commentaires: commentaires internes

### 1.7 TermeLexique
- id: identifiant unique
- terme: terme du lexique
- definition: définition du terme
- categorie: catégorie du terme (publication, appel d'offres, candidature, etc.)
- acronyme: acronyme si applicable
- synonymes: synonymes éventuels
- contexte_utilisation: contexte d'utilisation recommandé
- source: source de la définition
- date_ajout: date d'ajout au lexique
- date_modification: date de dernière modification

### 1.8 Client
- id: identifiant unique
- nom: nom du client
- type: type de client (public, privé)
- secteur_activite: secteur d'activité
- adresse: adresse complète
- contact_principal: informations de contact principal
- contacts_supplementaires: autres contacts (JSON)
- historique: historique des interactions (JSON)
- date_creation: date de création
- date_modification: date de dernière modification
- statut: statut du client (prospect, actif, inactif)

## 2. Relations entre entités

### 2.1 ProduitCategorie
- produit_id: référence au produit
- categorie_id: référence à la catégorie
- principal: booléen indiquant si c'est la catégorie principale

### 2.2 ProduitDocument
- produit_id: référence au produit
- document_id: référence au document
- type_association: type d'association (fiche technique, manuel, etc.)

### 2.3 ProduitCompatibilite
- produit_id: référence au produit
- produit_compatible_id: référence au produit compatible
- type_compatibilite: type de compatibilité (complémentaire, alternatif, etc.)
- notes: notes sur la compatibilité

### 2.4 AOProduit
- appel_offre_id: référence à l'AO
- produit_id: référence au produit
- quantite: quantité requise
- notes: notes spécifiques

### 2.5 AODocument
- appel_offre_id: référence à l'AO
- document_id: référence au document
- type_association: type d'association

### 2.6 HistoriqueModification
- id: identifiant unique
- entite_type: type d'entité modifiée (produit, document, etc.)
- entite_id: ID de l'entité modifiée
- utilisateur_id: référence à l'utilisateur ayant effectué la modification
- date_modification: date de la modification
- description_modification: description des modifications effectuées
- valeurs_precedentes: valeurs avant modification (JSON)
- valeurs_nouvelles: nouvelles valeurs (JSON)

## 3. Entités spécifiques aux fonctionnalités avancées

### 3.1 ModeleDocument
- id: identifiant unique
- nom: nom du modèle
- description: description du modèle
- type: type de modèle (AO, proposition commerciale, etc.)
- contenu_template: contenu du template (HTML/JSON)
- variables: variables disponibles dans le template (JSON)
- sections: sections du modèle (JSON)
- createur_id: référence à l'utilisateur créateur
- date_creation: date de création
- date_modification: date de dernière modification
- statut: statut du modèle (actif, inactif)

### 3.2 AnalyseCCTP
- id: identifiant unique
- appel_offre_id: référence à l'AO
- contenu_cctp: contenu extrait du CCTP
- exigences_identifiees: exigences identifiées (JSON)
- produits_suggeres: produits suggérés (JSON)
- termes_lexique_identifies: termes du lexique identifiés (JSON)
- date_analyse: date de l'analyse
- statut: statut de l'analyse (en cours, terminée)

### 3.3 Notification
- id: identifiant unique
- utilisateur_id: référence à l'utilisateur destinataire
- titre: titre de la notification
- message: contenu de la notification
- type: type de notification (info, alerte, erreur)
- entite_type: type d'entité concernée (produit, AO, etc.)
- entite_id: ID de l'entité concernée
- date_creation: date de création
- date_lecture: date de lecture (null si non lue)
- statut: statut de la notification (non lue, lue, archivée)

### 3.4 Workflow
- id: identifiant unique
- nom: nom du workflow
- description: description du workflow
- type: type de workflow (AO, validation document, etc.)
- etapes: définition des étapes (JSON)
- roles_impliques: rôles impliqués dans le workflow (JSON)
- createur_id: référence à l'utilisateur créateur
- date_creation: date de création
- date_modification: date de dernière modification
- statut: statut du workflow (actif, inactif)

### 3.5 InstanceWorkflow
- id: identifiant unique
- workflow_id: référence au workflow
- entite_type: type d'entité concernée (AO, document, etc.)
- entite_id: ID de l'entité concernée
- etape_courante: étape courante du workflow
- historique_etapes: historique des étapes (JSON)
- date_debut: date de début du workflow
- date_fin: date de fin du workflow (null si en cours)
- statut: statut de l'instance (en cours, terminée, annulée)

### 3.6 Statistique
- id: identifiant unique
- type: type de statistique (produit, AO, utilisateur, etc.)
- entite_id: ID de l'entité concernée (si applicable)
- periode: période concernée (jour, semaine, mois, année)
- date_debut: date de début de la période
- date_fin: date de fin de la période
- donnees: données statistiques (JSON)
- date_calcul: date du calcul des statistiques
