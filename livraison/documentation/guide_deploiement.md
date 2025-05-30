# Guide de déploiement

Ce document détaille les étapes pour déployer le site web de gestion des appels d'offres.

## Prérequis

### Environnement serveur
- Serveur Linux (Ubuntu 20.04 LTS ou supérieur recommandé)
- Python 3.8 ou supérieur
- Node.js 14 ou supérieur
- MySQL 8.0 ou supérieur
- Serveur web (Nginx recommandé)

### Outils nécessaires
- Git
- pip (gestionnaire de paquets Python)
- npm (gestionnaire de paquets Node.js)
- virtualenv (environnement virtuel Python)

## Étapes de déploiement

### 1. Préparation de l'environnement

#### Installation des dépendances système
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm mysql-server nginx
```

#### Configuration de la base de données
```bash
sudo mysql_secure_installation
sudo mysql -u root -p
```

Dans le shell MySQL :
```sql
CREATE DATABASE paritel_ao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'paritel_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe_securise';
GRANT ALL PRIVILEGES ON paritel_ao_db.* TO 'paritel_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Déploiement du backend

#### Clonage du dépôt
```bash
git clone https://github.com/votre-organisation/paritel-ao-platform.git
cd paritel-ao-platform/backend
```

#### Configuration de l'environnement virtuel Python
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Configuration des variables d'environnement
Créez un fichier `.env` à la racine du dossier backend :
```
DB_USERNAME=paritel_user
DB_PASSWORD=votre_mot_de_passe_securise
DB_HOST=localhost
DB_PORT=3306
DB_NAME=paritel_ao_db
SECRET_KEY=votre_cle_secrete_tres_longue_et_aleatoire
```

#### Initialisation de la base de données
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

#### Chargement des données initiales
```bash
python manage.py load_initial_data
```

### 3. Déploiement du frontend

#### Installation des dépendances
```bash
cd ../frontend
npm install
```

#### Configuration de l'environnement
Créez un fichier `.env` à la racine du dossier frontend :
```
REACT_APP_API_URL=http://votre-domaine.com/api
```

#### Construction du build de production
```bash
npm run build
```

### 4. Configuration du serveur web

#### Configuration de Nginx
Créez un fichier de configuration pour votre site :
```bash
sudo nano /etc/nginx/sites-available/paritel-ao
```

Contenu du fichier :
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    # Frontend
    location / {
        root /chemin/vers/paritel-ao-platform/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activez la configuration et redémarrez Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/paritel-ao /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Configuration du service backend

Créez un fichier de service systemd :
```bash
sudo nano /etc/systemd/system/paritel-ao-backend.service
```

Contenu du fichier :
```ini
[Unit]
Description=Paritel AO Platform Backend
After=network.target

[Service]
User=www-data
WorkingDirectory=/chemin/vers/paritel-ao-platform/backend
Environment="PATH=/chemin/vers/paritel-ao-platform/backend/venv/bin"
ExecStart=/chemin/vers/paritel-ao-platform/backend/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 src.main:app

[Install]
WantedBy=multi-user.target
```

Activez et démarrez le service :
```bash
sudo systemctl enable paritel-ao-backend
sudo systemctl start paritel-ao-backend
```

### 6. Sécurisation

#### Configuration HTTPS
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

#### Pare-feu
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## Vérification du déploiement

### Vérification du backend
```bash
curl http://localhost:5000/api/health
```

### Vérification du frontend
Accédez à `https://votre-domaine.com` dans un navigateur web.

## Maintenance

### Sauvegarde de la base de données
```bash
mysqldump -u paritel_user -p paritel_ao_db > backup_$(date +%Y%m%d).sql
```

### Mise à jour de l'application
```bash
cd /chemin/vers/paritel-ao-platform
git pull
cd backend
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
sudo systemctl restart paritel-ao-backend
cd ../frontend
npm install
npm run build
```

## Résolution des problèmes courants

### Problèmes de connexion à la base de données
- Vérifiez les identifiants dans le fichier `.env`
- Vérifiez que le service MySQL est en cours d'exécution : `sudo systemctl status mysql`

### Problèmes d'accès au site
- Vérifiez la configuration Nginx : `sudo nginx -t`
- Vérifiez les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
- Vérifiez le statut du service backend : `sudo systemctl status paritel-ao-backend`

### Problèmes de performance
- Augmentez le nombre de workers dans le fichier de service backend
- Optimisez la configuration MySQL
- Mettez en place un système de cache (Redis recommandé)

## Contact support

En cas de problème lors du déploiement, contactez l'équipe technique :
- Email : support-technique@paritel.fr
- Téléphone : 01 XX XX XX XX
