# Plan de tests fonctionnels

Ce document détaille les scénarios de tests à réaliser pour valider le bon fonctionnement du site web avec les contenus réels intégrés.

## 1. Tests du module Tableau de bord

### Scénario 1.1 : Affichage des statistiques
- **Objectif** : Vérifier que les statistiques s'affichent correctement
- **Actions** :
  1. Se connecter au site
  2. Accéder au tableau de bord
- **Résultat attendu** : Les statistiques (appels d'offres, produits, documents, réponses) sont affichées avec les bonnes valeurs

### Scénario 1.2 : Accès aux éléments récents
- **Objectif** : Vérifier l'accès aux éléments récents depuis le tableau de bord
- **Actions** :
  1. Cliquer sur un appel d'offres récent
  2. Revenir au tableau de bord
  3. Cliquer sur un document récent
- **Résultat attendu** : Navigation correcte vers les détails de l'élément sélectionné

## 2. Tests du module Catalogue

### Scénario 2.1 : Recherche de produits
- **Objectif** : Vérifier le fonctionnement de la recherche
- **Actions** :
  1. Accéder au catalogue
  2. Saisir "routeur" dans le champ de recherche
- **Résultat attendu** : Affichage des produits contenant "routeur" dans leur nom ou description

### Scénario 2.2 : Filtrage par catégorie
- **Objectif** : Vérifier le filtrage par catégorie
- **Actions** :
  1. Accéder au catalogue
  2. Cliquer sur la catégorie "Réseau"
- **Résultat attendu** : Affichage uniquement des produits de la catégorie "Réseau"

### Scénario 2.3 : Consultation d'une fiche produit
- **Objectif** : Vérifier l'affichage des détails d'un produit
- **Actions** :
  1. Accéder au catalogue
  2. Cliquer sur un produit
- **Résultat attendu** : Affichage de la fiche détaillée avec toutes les informations (description, spécifications, documents associés)

## 3. Tests du module Appels d'offres

### Scénario 3.1 : Création d'un nouvel appel d'offres
- **Objectif** : Vérifier la création d'un appel d'offres
- **Actions** :
  1. Accéder à la liste des appels d'offres
  2. Cliquer sur "Nouvel appel d'offres"
  3. Remplir le formulaire
  4. Valider
- **Résultat attendu** : Création et affichage du nouvel appel d'offres dans la liste

### Scénario 3.2 : Consultation d'un appel d'offres
- **Objectif** : Vérifier l'affichage des détails d'un appel d'offres
- **Actions** :
  1. Accéder à la liste des appels d'offres
  2. Cliquer sur un appel d'offres
- **Résultat attendu** : Affichage des détails avec toutes les informations (client, dates, documents, réponses)

### Scénario 3.3 : Filtrage des appels d'offres
- **Objectif** : Vérifier le filtrage par statut
- **Actions** :
  1. Accéder à la liste des appels d'offres
  2. Cliquer sur l'onglet "En cours"
- **Résultat attendu** : Affichage uniquement des appels d'offres avec le statut "En cours"

## 4. Tests du module Générateur de réponses

### Scénario 4.1 : Création d'une nouvelle réponse
- **Objectif** : Vérifier la création d'une réponse à un appel d'offres
- **Actions** :
  1. Accéder à un appel d'offres
  2. Cliquer sur "Nouvelle réponse"
  3. Remplir les informations générales
  4. Passer à l'étape suivante
- **Résultat attendu** : Création d'une nouvelle réponse avec les informations saisies

### Scénario 4.2 : Sélection de produits pour une réponse
- **Objectif** : Vérifier la sélection de produits du catalogue
- **Actions** :
  1. Dans le générateur de réponses, aller à l'étape "Sélection des produits"
  2. Sélectionner plusieurs produits
  3. Passer à l'étape suivante
- **Résultat attendu** : Les produits sélectionnés sont bien enregistrés dans la réponse

### Scénario 4.3 : Génération du document final
- **Objectif** : Vérifier la génération du document de réponse
- **Actions** :
  1. Compléter toutes les étapes du générateur
  2. Cliquer sur "Générer le document final"
- **Résultat attendu** : Génération d'un document PDF ou DOCX contenant toutes les informations saisies et les produits sélectionnés

## 5. Tests du module Documents

### Scénario 5.1 : Recherche de documents
- **Objectif** : Vérifier la recherche dans la base documentaire
- **Actions** :
  1. Accéder à la base documentaire
  2. Saisir "technique" dans le champ de recherche
- **Résultat attendu** : Affichage des documents contenant "technique" dans leur titre ou mots-clés

### Scénario 5.2 : Filtrage des documents
- **Objectif** : Vérifier le filtrage par catégorie
- **Actions** :
  1. Accéder à la base documentaire
  2. Sélectionner la catégorie "Documentation technique"
- **Résultat attendu** : Affichage uniquement des documents de cette catégorie

### Scénario 5.3 : Import d'un nouveau document
- **Objectif** : Vérifier l'ajout d'un document
- **Actions** :
  1. Accéder à la base documentaire
  2. Cliquer sur "Importer un document"
  3. Remplir le formulaire et sélectionner un fichier
  4. Valider
- **Résultat attendu** : Le document est ajouté à la base documentaire avec les métadonnées saisies

## 6. Tests du module Lexique

### Scénario 6.1 : Recherche de termes
- **Objectif** : Vérifier la recherche dans le lexique
- **Actions** :
  1. Accéder au lexique
  2. Saisir "VPN" dans le champ de recherche
- **Résultat attendu** : Affichage du terme "VPN" avec sa définition

### Scénario 6.2 : Filtrage par catégorie
- **Objectif** : Vérifier le filtrage par domaine
- **Actions** :
  1. Accéder au lexique
  2. Cliquer sur l'onglet "Réseau"
- **Résultat attendu** : Affichage uniquement des termes de la catégorie "Réseau"

### Scénario 6.3 : Ajout d'un nouveau terme
- **Objectif** : Vérifier l'ajout d'un terme au lexique
- **Actions** :
  1. Accéder au lexique
  2. Cliquer sur "Ajouter un terme"
  3. Remplir le formulaire
  4. Valider
- **Résultat attendu** : Le terme est ajouté au lexique avec sa définition et sa catégorie

## 7. Tests transversaux

### Scénario 7.1 : Navigation entre les modules
- **Objectif** : Vérifier la navigation entre les différentes sections
- **Actions** :
  1. Naviguer entre tous les modules via le menu latéral
- **Résultat attendu** : Navigation fluide sans erreurs ni temps de chargement excessifs

### Scénario 7.2 : Responsive design
- **Objectif** : Vérifier l'adaptation à différentes tailles d'écran
- **Actions** :
  1. Tester le site sur desktop, tablette et mobile
- **Résultat attendu** : Interface adaptée à chaque format d'écran, fonctionnalités accessibles sur tous les appareils

### Scénario 7.3 : Performance
- **Objectif** : Vérifier les temps de chargement
- **Actions** :
  1. Accéder à chaque module et mesurer le temps de chargement
- **Résultat attendu** : Temps de chargement inférieurs à 3 secondes pour chaque page

## Matrice de tests

| ID | Scénario | Priorité | Statut | Commentaires |
|----|----------|----------|--------|-------------|
| 1.1 | Affichage des statistiques | Haute | À tester | |
| 1.2 | Accès aux éléments récents | Moyenne | À tester | |
| 2.1 | Recherche de produits | Haute | À tester | |
| 2.2 | Filtrage par catégorie | Haute | À tester | |
| 2.3 | Consultation d'une fiche produit | Haute | À tester | |
| 3.1 | Création d'un nouvel appel d'offres | Haute | À tester | |
| 3.2 | Consultation d'un appel d'offres | Haute | À tester | |
| 3.3 | Filtrage des appels d'offres | Moyenne | À tester | |
| 4.1 | Création d'une nouvelle réponse | Haute | À tester | |
| 4.2 | Sélection de produits pour une réponse | Haute | À tester | |
| 4.3 | Génération du document final | Haute | À tester | |
| 5.1 | Recherche de documents | Haute | À tester | |
| 5.2 | Filtrage des documents | Moyenne | À tester | |
| 5.3 | Import d'un nouveau document | Haute | À tester | |
| 6.1 | Recherche de termes | Haute | À tester | |
| 6.2 | Filtrage par catégorie | Moyenne | À tester | |
| 6.3 | Ajout d'un nouveau terme | Haute | À tester | |
| 7.1 | Navigation entre les modules | Haute | À tester | |
| 7.2 | Responsive design | Haute | À tester | |
| 7.3 | Performance | Moyenne | À tester | |
