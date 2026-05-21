root@srv1438351:~/proj_nexi# cat /etc/os-release
PRETTY_NAME="Ubuntu 24.04.4 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04.4 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=noble
LOGO=ubuntu-logo
root@srv1438351:~/proj_nexi# docker --version
Docker version 29.2.1, build a5c7197
root@srv1438351:~/proj_nexi# docker compose version
Docker Compose version v5.1.0
root@srv1438351:~/proj_nexi# docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED        STATUS       PORTS                                                                          NAMES
712f39991448   portfolio_mika-app    "/docker-entrypoint.…"   5 weeks ago    Up 3 weeks   80/tcp                                                                         portfolio-mika-app
ad63f341acb9   portfolio_mika-api    "docker-entrypoint.s…"   5 weeks ago    Up 3 weeks   3000/tcp                                                                       portfolio-mika-api
8c78a1d9fa77   portf_ldj-app         "/usr/local/bin/dock…"   2 months ago   Up 3 weeks   127.0.0.1:3000->3000/tcp                                                       portf-ldj-app
a0faaaff9b1f   mongo:7               "docker-entrypoint.s…"   2 months ago   Up 3 weeks   27017/tcp                                                                      portf-ldj-mongo
2377f177c328   nginx:stable-alpine   "/docker-entrypoint.…"   2 months ago   Up 3 weeks   0.0.0.0:80->80/tcp, [::]:80->80/tcp, 0.0.0.0:443->443/tcp, [::]:443->443/tcp   portf-ldj-nginx
root@srv1438351:~/proj_nexi# cat dep.md
# Architectures de déploiement (explication complète)

Ce document explique **comment sont déployés** les projets dans `/root/proj_nexi`.

---

## 1) Les projets présents

Dans ce dossier, on a principalement 2 applications web :

- `portf_ldj` (site de Joel)
- `portfolio_mika` (site de Michael, maintenant séparé en :
  - `portfolio_mika/pwa` = frontend (site visible)
  - `portfolio_mika/api` = backend API de contact)

---

## 2) Rappel des notions de base (très important)

### Qu'est-ce qu'un conteneur Docker ?

Un conteneur, c'est comme une mini-boite isolée qui contient :
- une application,
- ses dépendances,
- sa configuration d'exécution.

Avantage : l'application tourne pareil partout (serveur, local, etc.).

### Qu'est-ce qu'un port ?

Un serveur écoute des "portes réseau" (ports) :
- `80` = HTTP (non chiffré),
- `443` = HTTPS (chiffré TLS/SSL).

### Pourquoi il y a des conflits de ports ?

Sur une machine, **un seul service** peut écouter un port donné en même temps.
Exemple : si un Nginx écoute déjà `443`, un deuxième ne peut pas aussi écouter `443`.

### Qu'est-ce qu'un reverse proxy (Nginx) ?

C'est un "agent d'accueil":
- le navigateur contacte Nginx en `80/443`,
- Nginx regarde le nom de domaine demandé,
- puis redirige vers le bon conteneur interne.

Exemple :
- `joel.nexilimits.com` -> conteneur Joel
- `michael.nexilimits.com` -> conteneur Mika

---

## 3) Architecture globale actuelle

## Vue simplifiée

1. L'utilisateur tape une URL HTTPS dans son navigateur.
2. Le DNS pointe vers le serveur.
3. Nginx "gateway" (dans `portf_ldj`) reçoit la requête sur `443`.
4. Selon le domaine :
   - `joel.nexilimits.com` -> app `portf_ldj`
   - `michael.nexilimits.com` -> app `portfolio-mika-app`
5. Si la route est `/api/...` côté Mika, l'app `portfolio-mika-app` reverse-proxy vers `portfolio-mika-api`.

---

## 4) Déploiement de `portf_ldj`

Fichier clé : `portf_ldj/docker-compose.yml`

Services :

- `app` : application Next.js (port interne `3000`)
- `mongo` : base MongoDB
- `nginx` : passerelle publique (`80` et `443`)
- `certbot` : gestion des certificats Let's Encrypt

Points importants :

- `portf_ldj/nginx` expose vraiment les ports machine :
  - `80:80`
  - `443:443`
- Les certificats sont montés en volumes Docker :
  - `/etc/letsencrypt`
  - `/var/www/certbot`

Conclusion : `portf_ldj` joue le rôle de **gateway HTTPS principale**.

---

## 5) Déploiement de `portfolio_mika` (nouvelle architecture)

Fichier clé : `portfolio_mika/docker-compose.yml`

Services actifs :

- `app` (`portfolio-mika-app`)
  - image Nginx statique qui sert la PWA buildée
  - contient le frontend de `pwa/`
  - expose seulement le port interne `80` (pas de port machine)
- `api` (`portfolio-mika-api`)
  - application Next.js API (`api/`)
  - expose seulement le port interne `3000` (pas de port machine)

Réseaux :

- réseau local de la stack Mika (`web`)
- réseau partagé `portf_ldj_web` (`edge`) pour permettre à Nginx gateway de joindre `portfolio-mika-app`

Très important :

- `portfolio_mika` **n'expose pas** `80/443` directement sur la machine.
- Donc **pas de conflit de ports** avec `portf_ldj`.

---

## 6) Rôle des Dockerfiles dans `portfolio_mika`

### `portfolio_mika/Dockerfile` (frontend PWA)

Étapes :

1. Prend une image Node (`node:20-alpine`) pour builder.
2. Copie `pwa/package*.json`.
3. Installe dépendances (`npm ci`).
4. Copie le code `pwa/`.
5. Fait `npm run build` (génère `dist/`).
6. Prend une image Nginx légère (`nginx:stable-alpine`).
7. Copie la conf `docker/nginx/mika.conf`.
8. Copie `dist/` dans `/usr/share/nginx/html`.

Résultat : un conteneur très simple et rapide pour servir le frontend.

### `portfolio_mika/api/Dockerfile` (backend API)

Étapes multi-stage :

1. `deps` : installe dépendances (`npm ci`).
2. `builder` : copie code et lance `npm run build` Next.js.
3. `runner` : image finale production avec :
   - `.next`
   - `public`
   - `node_modules`
   - `package.json`
4. démarre avec `npm run start` sur port `3000`.

Résultat : API Next.js prête production.

---

## 7) Chemin réel d'une requête `michael.nexilimits.com`

Exemple 1 : page d'accueil

1. Navigateur -> `https://michael.nexilimits.com/`
2. Nginx gateway (`portf_ldj`) reçoit la requête.
3. Vhost `michael.nexilimits.com` sélectionné.
4. Proxy vers `http://portfolio-mika-app:80`
5. `portfolio-mika-app` renvoie `index.html` + assets de la PWA.

Exemple 2 : formulaire de contact (`/api/contact`)

1. Frontend appelle `/api/contact` (URL relative).
2. Requête arrive sur `portfolio-mika-app` (Nginx interne).
3. Sa conf `mika.conf` route `/api/` vers `http://api:3000/api/`.
4. `portfolio-mika-api` traite la route Next `api/contact`.
5. API envoie l'email via Resend et répond JSON.

---

## 8) Variables d'environnement (.env)

### `portfolio_mika/pwa/.env`

- `VITE_CONTACT_API_URL=/api/contact`

Pourquoi c'est bien :
- URL relative, donc fonctionne derrière le domaine réel sans hardcoder localhost.

### `portfolio_mika/api/.env`

- `RESEND_API_KEY=...`
- `CONTACT_TO_EMAIL=...`
- `CONTACT_FROM_EMAIL=...`
- `FRONTEND_ORIGIN=https://michael.nexilimits.com`

Rôle :
- clé API pour envoi mail,
- destination des mails,
- adresse expéditeur,
- origine CORS autorisée.

Note sécurité :
- ne jamais versionner publiquement les secrets (`RESEND_API_KEY`).

---

## 9) HTTPS / Certificat Let's Encrypt

Le HTTPS public est géré par la gateway Nginx de `portf_ldj` :

- terminaison TLS sur port `443`
- certificats stockés dans `/etc/letsencrypt` (volume Docker)
- renouvellement automatique via conteneur `certbot`

Le domaine `michael.nexilimits.com` est certifié et servi via ce point d'entrée.

---

## 10) Pourquoi cette architecture est robuste

1. **Pas de conflit de ports**
   - un seul Nginx public écoute `80/443`.
2. **Isolation claire**
   - Mika a ses propres conteneurs (`app`, `api`).
3. **Évolutive**
   - on peut ajouter d'autres domaines en ajoutant des vhosts.
4. **Sécurité**
   - TLS centralisé,
   - CORS explicite côté API.
5. **Maintenabilité**
   - séparation frontend/backend nette.

---

## 11) Ce qui a été retiré (nettoyage)

Dans `portfolio_mika`, les anciens éléments racine hérités ont été supprimés :

- ancien `src/`, `public/`, configs TS/Vite/Tailwind racine, ancien script de déploiement, anciennes confs Nginx `conf.d`, etc.

Il reste la structure utile :

- `portfolio_mika/pwa`
- `portfolio_mika/api`
- `portfolio_mika/docker`
- `portfolio_mika/docker-compose.yml`
- `portfolio_mika/Dockerfile`

---

## 12) Schéma ASCII final (simple)

```text
Internet User
    |
    | HTTPS :443
    v
portf_ldj-nginx (gateway public)
    |-- host=joel.nexilimits.com ----> portf_ldj-app:3000
    |
    |-- host=michael.nexilimits.com -> portfolio-mika-app:80
                                         |
                                         |-- "/" -> fichiers PWA statiques
                                         |
                                         \-- "/api/*" -> portfolio-mika-api:3000
                                                         |
                                                         \-- Resend API (emails)
```

---

## 13) Checklist de fonctionnement (pratique)

Pour valider rapidement :

1. `docker compose ps` dans `portf_ldj` : nginx/app/mongo/certbot up.
2. `docker compose ps` dans `portfolio_mika` : app/api up.
3. Test HTTPS :
   - `https://joel.nexilimits.com` OK
   - `https://michael.nexilimits.com` OK
4. Test API contact :
   - `OPTIONS /api/contact` retourne CORS attendu.
   - `POST /api/contact` retourne 200/JSON quand payload valide.

---

## 14) Résumé ultra-court

- `portf_ldj` fournit la porte d'entrée publique (`80/443`) + certificats.
- `portfolio_mika` fournit le contenu (PWA + API) sans exposer de ports hôte.
- Nginx route par nom de domaine.
- Architecture sans conflit de ports et prête production.

root@srv1438351:~/proj_nexi# cat portfolio_mika/docker/nginx/mika.conf
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location /api/ {
    proxy_pass http://api:3000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(?:css|js|mjs|json|jpg|jpeg|gif|png|svg|ico|webp|woff2?)$ {
    expires 7d;
    add_header Cache-Control "public, max-age=604800, immutable";
    try_files $uri =404;
  }
}