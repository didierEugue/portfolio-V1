# Portfolio — Projets Web & API
> Développeur Full-Stack spécialisé Symfony / PHP Backend · React · Next.js · TypeScript · Node.js

---

## SOX — Logiciel de Gestion pour Cabinets Comptables
**Entreprise :** Devphantom
**Site :** sofyx.io
**Période :** Mai 2025 – Août 2025

### Présentation
SOX (Sofyx) est un logiciel SaaS destiné aux cabinets d'expertise comptable. Il centralise la gestion des clients, le suivi des missions (bilans, déclarations fiscales), la planification des échéances réglementaires, la facturation et les communications automatisées. La plateforme est conçue pour être utilisée par les différents profils d'un cabinet : comptables, gestionnaires sociaux et fiscalistes.

**Objectif métier :** Digitaliser et automatiser les processus d'un cabinet comptable, de la collecte des documents clients jusqu'à la télédéclaration, en passant par le suivi des délais légaux et la synchronisation avec les outils comptables du marché.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 7.2 · PHP 8.2 |
| Frontend | Next.js 15 · React 18 · TypeScript |
| Base de données | MariaDB (prod) · SQLite (tests) · Doctrine ORM |
| Authentification | JWT (Lexik Bundle) |
| File d'attente | Symfony Messenger (traitements asynchrones) |
| Email | Mailgun · Templates dynamiques |
| Paiement | Stripe |
| Signature électronique | DocuSeal |
| Comptabilité externe | Pennylane · MyUnisoft |
| Messagerie / Calendar | Gmail API · Microsoft Graph (Outlook/OneDrive) |
| Téléphonie | AirCall API |
| Email | Mailgun (Symfony Mailer) |
| Documentation API | OpenAPI 3.0 auto-générée |
| DevOps | Docker · Docker Compose |

### Architecture

Organisation en services métier spécialisés (85+ services), avec séparation claire entre les données de chaque cabinet (multi-tenant) et des traitements lourds exécutés en arrière-plan.

```
api/src/
├── Controller/         # Points d'entrée de l'API
├── Entity/             # 50+ modèles de données
├── Service/            # Logique métier (85+ services)
├── MessageHandler/     # Traitements asynchrones (imports, sync, envois)
├── Security/           # Contrôle des accès par rôle
└── Command/            # Automatisations planifiables (18+ commandes)
```

- Chaque cabinet dispose de ses données isolées (multi-tenant par cabinet)
- Les profils métier (comptable, social, juridique, commercial, informatique, support) définissent ce que chaque collaborateur peut voir et faire
- Les traitements lourds (synchronisations, envois massifs) sont déportés en arrière-plan pour ne pas bloquer l'interface
- Les erreurs sont gérées de façon centralisée avec des codes explicites

### Données principales

- **Cabinet comptable** — Espace de données isolé pour chaque cabinet client, regroupant ses collaborateurs, ses clients et ses missions
- **Client / Entreprise** — Personnes physiques ou morales suivies par le cabinet, avec leurs contacts et leurs documents
- **Bilan et déclaration fiscale** — Les missions comptables (bilan annuel, TVA, IS, CFE, IRPP) avec leur état d'avancement et leurs pièces justificatives
- **Échéance** — Date limite réglementaire planifiée automatiquement, avec alertes avant dépassement
- **Scénario d'automatisation** — Séquence d'actions configurée par le cabinet (relances, notifications, rappels) déclenchée selon les événements du dossier
- **Pipeline commercial** — Suivi des affaires en cours avec leurs étapes (nouveau contact, rendez-vous planifié, contrat envoyé, gagné ou perdu)
- **Ticket de support** — Demande client classée par type (email, appel, autre), priorité et état d'avancement, assignable à un collaborateur
- **Document signé** — Fichier envoyé pour signature électronique via DocuSeal, avec suivi de son état (en attente, complété, refusé, expiré)
- **Suivi du temps** — Saisie des heures par collaborateur et par mission, pour le calcul des honoraires facturables

### Fonctionnalités implémentées

- **Gestion des missions comptables** : suivi des bilans par exercice, déclarations fiscales (TVA, IS, CFE, CVAE, IRPP), calcul des acomptes, planification automatique des échéances avec alertes, commentaires collaboratifs et génération PDF
- **Automatisation des communications** : scénarios d'envoi paramétrables (18 types d'actions : email, rappel, notification, création de tâche…), déclenchés par les événements du dossier, avec templates d'emails personnalisables
- **Connexions aux outils tiers** : synchronisation avec Pennylane et MyUnisoft (comptabilité), Gmail et Outlook (messagerie et calendrier), AirCall (appels téléphoniques), enrichissement des données légales via INPI
- **Signature électronique et documents** : envoi de documents à signer via DocuSeal, suivi de leur état et archivage une fois signés
- **Suivi du temps, facturation et CRM** : saisie des heures par mission et collaborateur, paiements en ligne (Stripe), pipeline commercial et tickets de support
- **Formalités annuelles** : module dédié aux obligations légales récurrentes des clients (ClientLegal)

### Réalisations techniques notables

- **Traitements asynchrones** (Symfony Messenger) : les synchronisations et envois massifs s'exécutent en arrière-plan, sans impact sur la réactivité de l'interface
- **Moteur de scénarios** (SequenceService) : 18 types d'actions configurables permettant de construire des automatisations complexes sans toucher au code
- **Création en lot des échéances** (EcheanceBatchService) : génération de toutes les dates réglementaires d'un exercice fiscal en une seule opération
- **Format de réponse unifié** sur toute l'API, avec codes d'erreur explicites (validation, non trouvé, accès refusé…)

---

## Octogone ERP — Système de Gestion pour Réseaux de Distribution Retail
**Entreprise :** DepannPC
**Période :** Janvier 2025 – Mai 2025

### Présentation
Octogone est un ERP complet pour la gestion de réseaux de distribution multi-sites (magasins et dépôts). Il couvre l'ensemble des activités : gestion des produits, des stocks, des achats, des ventes, de la caisse enregistreuse et du reporting financier. L'application est accessible depuis un navigateur et peut s'installer sur mobile et desktop.

**Objectif métier :** Centraliser la gestion opérationnelle de réseaux de distribution (type épicerie ou mini-marché), avec traçabilité complète des transactions de caisse et archives sécurisées pour contrôle fiscal.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Node.js 18 · Express.js 4.18 |
| Frontend | React 18 · Vite 6 · Zustand · Tailwind CSS · DaisyUI |
| Base de données | MongoDB (driver natif + Mongoose) |
| Authentification | JWT · bcrypt |
| PDF | jsPDF · @react-pdf/renderer · pdf-lib |
| Email | Nodemailer · MJML (templates HTML) |
| Export | ExcelJS |
| QR Scanner | @yudiel/react-qr-scanner |
| Graphiques | Composants SVG custom |
| PWA | Workbox · IndexedDB (cache offline) |
| Conformité caisse | Chaîne de traçabilité des transactions · archives sécurisées |
| DevOps | Docker · Nginx |

### Architecture

Le backend expose 42 modules de routes couverts par 43 contrôleurs. La base de données MongoDB est accédée directement (sans ORM) via un utilitaire maison pour optimiser les performances sur les collections à fort volume.

```
Backend (Express)
├── middleware/     # Authentification, droits d'accès, upload
├── routes/         # 42 modules de routes
├── controllers/    # 43 contrôleurs métier
├── services/       # Génération PDF, envoi email, calculs stock, conformité fiscale
└── utils/          # Accès MongoDB générique (CRUD + timestamps automatiques)

Frontend (React)
├── pages/          # 13+ modules fonctionnels
├── components/     # Composants réutilisables
├── services/       # Couche d'appels API centralisée
├── store/          # Gestion de l'état (thème, notifications)
└── contexts/       # Authentification et droits
```

La gestion des droits repose sur une matrice rôle + section + action (lecture/création/modification/suppression) stockée en base de données.

### Données principales

- **Magasin / Dépôt** — Site physique du réseau avec son propre stock, ses utilisateurs et ses paramètres
- **Article** — Produit du catalogue avec code-barres, famille, taux de TVA et grille de prix multi-niveaux
- **Stock** — Niveau disponible par article et par localisation, mis à jour en temps réel avec alertes de rupture
- **Commande et facture** — Documents du cycle commercial (devis, commande, livraison, facture, avoir) côté ventes et côté achats
- **Session de caisse** — Période d'ouverture d'une caisse avec ses tickets, ses règlements et sa clôture journalière
- **Piste d'audit** — Enregistrement immuable de toutes les opérations de caisse, signé numériquement, requis par la législation française

### Fonctionnalités implémentées

- **Gestion multi-sites** : visibilité filtrée par magasin ou dépôt selon l'utilisateur connecté, stocks et transferts inter-sites, inventaires physiques
- **Catalogue produits** : fiche article complète (code-barres, famille, TVA, prix de revient avec taux de change), structure tarifaire multi-niveaux, photos, import depuis l'ancien système
- **Circuit achats et ventes** : flux complets de bout en bout — devis fournisseur jusqu'à la facture côté achats, devis client jusqu'à l'avoir côté ventes, avec suivi des règlements
- **Caisse enregistreuse** : sessions journalières, scan QR/code-barres, rapports d'ouverture (X) et de clôture (Z), traçabilité des transactions, archives pour contrôle fiscal
- **Reporting** : tableau de bord avec indicateurs clés, graphiques SVG animés, journal des ventes, rapports par famille ou rayon, export Excel
- **Support client (SAV)** : système de tickets complet avec portail client, SLA, pièces jointes, base de connaissances et rapports
- **Personnalisation** : thèmes dynamiques par utilisateur avec customizer visuel
- **PWA** : installable sur mobile et desktop, consultable partiellement sans connexion internet, thème personnalisable

### Réalisations techniques notables

- **Conformité caisse** : chaîne de traçabilité des transactions, rapports X/Z, archives sécurisées pour contrôle fiscal
- **Accès MongoDB optimisé** : utilitaire d'abstraction sans ORM, conçu pour les agrégations complexes de stock à fort volume
- **Précision financière** : calculs monétaires en Decimal128 (format haute précision de MongoDB), avec conversion automatique côté client
- **Couche API centralisée** (2500+ lignes) : organisée par domaine fonctionnel avec conversion Decimal128 automatique en intercepteur

---

## ODRN — Plateforme de Gestion d'Interventions Diagnostics Immobiliers
**Entreprise :** Devphantom (pour Actif Diagnostic)
**Site :** actifdiagnostic.fr
**Période :** Août 2025 – Septembre 2025

### Présentation
ODRN est la plateforme opérationnelle d'Actif Diagnostic, société spécialisée dans les diagnostics immobiliers (DPE, amiante, plomb, électricité…). Elle gère le cycle complet de chaque mission : prise en charge client, affectation du technicien, production du rapport, signature électronique et facturation.

**Objectif métier :** Digitaliser les flux d'une société de diagnostics, de la commande client jusqu'à la remise du rapport signé, avec planification optimisée des techniciens par zone géographique.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 7.4 · PHP 8.2 |
| Frontend | Next.js 16 · React 19 · TypeScript |
| Base de données | MySQL 8.0 · Doctrine ORM |
| Authentification | JWT (Lexik Bundle) |
| Paiement | Payplug API |
| Signature électronique | DocuSeal API |
| Comptabilité | Pennylane API (devis/factures) |
| Géolocalisation | Google Maps API |
| Email | Mailgun (Symfony Mailer) |
| Documentation API | OpenAPI 3.0 auto-générée |
| DevOps | Docker · Docker Compose |

### Architecture

API REST Symfony avec isolation des données par société (multi-tenant), système de filtrage avancé déclaré directement dans le code source, et gestion des droits par entité.

```
api/
├── Controller/         # Contrôleurs avec BaseApiController commun
├── Entity/             # Modèles de données avec appartenance tenant automatique
├── Service/            # Logique métier et services partenaires
├── Attribute/          # Déclaration des champs filtrables (#[Filterable])
├── Filter/             # Traduction des filtres HTTP en requêtes base de données
├── EventListener/      # Gestion centralisée des erreurs
└── Security/           # Contrôle d'accès fin par ressource (Voters)
```

Le système de filtrage avancé permet de déclarer directement sur chaque modèle quels champs sont filtrables et selon quels critères. Les paramètres de l'URL sont automatiquement traduits en requêtes base de données (opérateurs : égalité, plage, contient, commence par, etc.).

### Données principales

- **Ordre d'intervention** — Dossier central de la plateforme, regroupant le client, les diagnostics demandés, le technicien affecté, les documents produits et le suivi financier
- **Prestation / Diagnostic** — Type de contrôle proposé (DPE, amiante, électricité…) avec son tarif variable selon la zone géographique
- **Technicien** — Expert de terrain avec ses disponibilités et son périmètre géographique d'intervention
- **Rapport et accès client** — Document produit à l'issue de la mission, signé électroniquement et partageable via lien temporaire sécurisé
- **Client / Contact** — Donneurs d'ordre (particuliers ou professionnels) avec leurs biens à diagnostiquer et leurs coordonnées

### Fonctionnalités implémentées

- **Cycle de vie des missions** : de la commande à l'archivage en passant par la planification, l'intervention et la facturation — avec numérotation automatique et historique de chaque changement d'état
- **Planification des techniciens** : gestion des créneaux de disponibilité, affectation par zone géographique, nettoyage automatique des créneaux expirés
- **Tarification dynamique** : grilles de prix multi-dimensions (zone + type de prestation) avec calcul automatique du montant à la création de la commande
- **Partage de rapports** : lien d'accès temporaire envoyé au client, sans nécessité de créer un compte, avec gestion de l'expiration automatique
- **Intégrations** : paiement en ligne (Payplug), signature électronique (DocuSeal), génération de devis et factures (Pennylane), validation d'adresses (Google Maps)
- **Recherche et filtrage** : 11 critères de recherche disponibles sur toutes les listes, avec tri multi-colonnes et pagination configurable

### Réalisations techniques notables

- **Filtrage déclaratif** : le code de recherche est défini une seule fois au niveau du modèle de données — pas de duplication dans chaque contrôleur, extensible et auto-documenté
- **Lien de partage sécurisé** (OrderAccessToken) : consultation d'un rapport sans compte utilisateur, avec expiration automatique
- **Service de liste générique** : réutilisé sur toutes les listes de l'application (pagination, filtrage, tri) sans répétition de code
- **Environnements distincts** : configurations Docker séparées pour le développement, la pré-production et la production

---

## INFINITIA — SaaS Multi-Tenant de Gestion de Concessions Automobiles
**Entreprise :** Devphantom
**Période :** Décembre 2025 – Janvier 2026

### Présentation
INFINITIA est une plateforme SaaS destinée aux réseaux de concessions automobiles. Elle centralise la gestion du catalogue véhicules, les relations clients (CRM), les rendez-vous d'essai, les contrats de vente avec signature électronique et la comptabilité. Chaque concessionnaire dispose de son espace de données isolé.

**Objectif métier :** Fournir aux concessions automobiles un outil complet pour digitaliser leur activité commerciale, du catalogue en ligne jusqu'à la signature du contrat et la synchronisation comptable.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 7.3 · PHP 8.2 |
| Frontend | Next.js 16 · React 19 · TypeScript |
| Base de données | MySQL/MariaDB · Doctrine ORM |
| Authentification | JWT · Vérification par code email (reset password) |
| Paiement | Stripe API |
| Signature électronique | DocuSeal API |
| Comptabilité | Pennylane API |
| Agenda | Google Calendar API (création d'événements) |
| Enrichissement véhicule | API Plaque Immatriculation (France) |
| Email | Mailgun (Symfony Mailer) |
| Documentation API | OpenAPI 3.0 auto-générée |
| DevOps | Docker (MariaDB uniquement) |

### Architecture

Multi-tenant avec isolation automatique des données par concessionnaire, sans modification des requêtes existantes. L'intégration Google Calendar est gérée par un service dédié avec gestion des tokens OAuth.

- **Isolation des données** : filtre SQL automatique activé sur toutes les requêtes — chaque concessionnaire ne voit que ses propres données
- **Désactivation ponctuelle** : le super administrateur peut accéder à tous les espaces en désactivant le filtre pour ses propres requêtes
- **Filtre multi-tenant transparent** : filtre SQL Doctrine automatique sur toutes les entités, activable/désactivable selon le contexte
- **Vérification par code email** : les opérations critiques (changement d'email, transactions financières) demandent une confirmation par code reçu par email

### Données principales

- **Concession** — Espace de données propre à chaque concessionnaire client, isolé de tous les autres
- **Véhicule** — Voiture du parc avec son statut commercial (disponible, réservé, vendu), ses photos, ses options et sa fiche technique
- **Client** — Acheteur ou prospect suivi par la concession, avec l'historique des contacts
- **Rendez-vous d'essai** — Créneau planifié pour la visite ou l'essai d'un véhicule, synchronisé automatiquement avec l'agenda Google du commercial
- **Contrat de vente** — Document de cession généré, envoyé à la signature électronique et archivé avec suivi du paiement

### Fonctionnalités implémentées

- **Catalogue véhicules** : cycle de vie commercial complet (mise en stock → mise en vente → réservation → vendu), gestion des photos et options, enrichissement automatique de la fiche depuis la plaque d'immatriculation, catalogue public accessible sans connexion
- **CRM et rendez-vous** : suivi des clients et prospects, réservation de créneaux d'essai avec création automatique d'événements Google Calendar
- **Vente et contractualisation** : génération des documents de vente, signature électronique via DocuSeal, paiements en ligne Stripe, synchronisation des factures avec Pennylane
- **Statistiques** : tableau de bord de vente par période, indicateurs de chiffre d'affaires et de conversion

### Réalisations techniques notables

- **Isolation multi-tenant transparente** : le filtre SQL s'applique automatiquement sans modification des requêtes, activable/désactivable programmatiquement selon le profil
- **Intégration Google Calendar** : gestion des tokens OAuth, création automatique d'événements lors des prises de rendez-vous, mémorisation des identifiants Google
- **API Plaque Immatriculation** : récupération automatique de la marque, du modèle, de la motorisation et du millésime depuis l'API officielle d'immatriculation française


---

## GEXP — Plateforme de Gestion d'Experts Techniques
**Entreprise :** Devphantom
**Période :** Avril 2025 – Mai 2025

### Présentation
GEXP est une application de gestion de dossiers pour experts techniques. Elle couvre le cycle complet d'une mission : création du dossier, envoi et signature du devis, planification de l'intervention, rapport d'activité, suivi des paiements et génération de la facture.

**Objectif métier :** Dématérialiser la gestion des dossiers d'expertise, réduire la saisie manuelle, donner une visibilité en temps réel sur l'état de chaque dossier et automatiser la facturation.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 6.4 · PHP 8.2 |
| Frontend | Next.js 15 · React 18 · TypeScript |
| Base de données | MariaDB 10.2 · Doctrine ORM |
| Authentification | JWT (Lexik Bundle) |
| Signature électronique | DocuSeal API |
| PDF | Dompdf · KnpSnappy (wkhtmltopdf) · FPDF/FPDI · Ghostscript |
| Email | Mailgun (Symfony Mailer) |
| Géolocalisation | Google Maps |
| Documentation API | OpenAPI 3.0 auto-générée |
| DevOps | Docker |

### Architecture

Approche par héritage de contrôleurs et de services pour factoriser la logique commune (réponses HTTP, CRUD). Formulaires de sélection de prestations configurables sans modification du code.

- **Contrôleur et service de base** : logique HTTP et CRUD commune héritée par tous les modules, sans répétition
- **Horodatage automatique** : dates de création et de modification tracées automatiquement sur chaque enregistrement
- **Formulaires dynamiques** : questionnaires de sélection de prestations configurables, adaptés au type d'expertise sans toucher au code
- **Signatures** : capture manuscrite via canvas pour les rapports terrain, signature électronique DocuSeal pour les devis et documents commerciaux

### Données principales

- **Dossier d'intervention** — Élément central du logiciel, regroupant le client, les prestations réalisées, les documents produits et le suivi financier
- **Devis et facture** — Documents commerciaux générés en PDF, avec le devis envoyé à la signature électronique avant le démarrage de l'intervention
- **Intervention** — Planification de la visite terrain affectée à un technicien, avec statut et commentaires
- **Formulaire de prestations** — Questionnaire configurable permettant d'adapter la sélection des services selon le type d'expertise, sans recompilation
- **Règlement** — Suivi des paiements reçus par dossier (espèces ou chèque), avec récapitulatif financier

### Fonctionnalités implémentées

- **Cycle de vie du dossier** : de la création à la clôture en 7 étapes (brouillon → devis envoyé → signé → intervention planifiée → terminée → en attente de paiement → clôturé), avec historique horodaté
- **Devis et signature électronique** : génération PDF, envoi au client via DocuSeal pour signature électronique
- **Facturation et paiements** : facture automatique à la validation de l'intervention, suivi des règlements, rapports financiers par dossier
- **Notifications email** : messages automatiques à chaque étape clé (devis envoyé, intervention planifiée, facture disponible)
- **Formulaires configurables** : questionnaires de diagnostic adaptables par type d'expertise, valeurs stockées de façon flexible

### Réalisations techniques notables

- **Formulaires génériques** (DynamicForm) : évite la création de nouvelles tables pour chaque type d'expertise — un seul système configurable couvre tous les cas
- **Génération de rapports techniques** : formulaires dynamiques remplis sur le terrain (photos, signatures manuscrites) transformés en PDF via wkhtmltopdf/DomPDF, avec assemblage de documents via Ghostscript
- **Traçabilité automatique** : dates de création et modification sur chaque enregistrement, sans annotation individuelle

---

## Athena v5 — Application de Gestion de Production (PWA)
**Entreprise :** DepannPC
**Période :** Décembre 2024 – Avril 2025

### Présentation
Athena v5 est l'application opérationnelle de DepannPC, une entreprise de second œuvre du bâtiment. Elle centralise la gestion des chantiers (affaires), des ordres de fabrication, des consignes aux collaborateurs, des rapports d'activité terrain et du suivi de production. L'application est installable sur mobile et desktop.

**Objectif métier :** Remplacer les échanges informels (téléphone, papier) par une plateforme digitale centralisée, permettant au bureau d'études, aux chefs de projet et aux opérateurs terrain de collaborer en temps réel.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Node.js 18 · Express.js 4.21 |
| Frontend | React 18 · Vite 7 · Tailwind CSS 3 |
| Base de données | MongoDB 7 (Mongoose 8) |
| Temps réel | Socket.io 4.8 (WebSocket) |
| Authentification | JWT · bcryptjs |
| Notifications push | Web Push (VAPID) · Expo Server SDK (iOS/Android) |
| Upload | Multer |
| Export | XLSX |
| Graphiques | Recharts |
| Agenda | FullCalendar |
| PDF | jsPDF |
| Formulaires | React Hook Form |
| PWA | Workbox |
| DevOps | Docker Compose (3 services) |

### Architecture

```
Backend (Node.js)
├── controllers/    # 17 contrôleurs métier
├── routes/         # 23 modules (100+ endpoints)
├── schemas/        # 39 modèles de données MongoDB
├── middlewares/    # Authentification JWT + droits d'accès
└── services/       # Notifications push, WebSocket, fichiers

Frontend (React)
├── pages/          # 7 pages principales
├── components/     # 70+ composants organisés par domaine
└── context/        # Authentification · Notifications
```

Les notifications en temps réel passent par des canaux dédiés par utilisateur (WebSocket) : chaque collaborateur reçoit uniquement ses propres notifications, sans diffusion générale.

### Données principales

- **Affaire** — Contrat ou chantier suivi, avec son budget détaillé (matériaux, main-d'œuvre, suppléments) et ses documents associés
- **Ordre de fabrication (OF)** — Mission de production liée à une affaire, avec ses tâches, son avancement et ses documents
- **Consigne** — Instruction ou tâche envoyée à un collaborateur, avec suivi de lecture, commentaires et notifications instantanées
- **Rapport d'activité** — Compte rendu terrain (visite, qualité, technique, atelier) avec pièces jointes et cycle de validation
- **Prise de cotes** — Relevé de mesures sur le terrain (fenêtres, portes, dimensions), lié aux ordres de fabrication

### Fonctionnalités implémentées

- **Gestion des affaires et OFs** : suivi des contrats avec décomposition des coûts, ordres de fabrication liés, documents (plans, fiches techniques) et archivage
- **Consignes et tâches** : attribution aux collaborateurs avec statut (nouveau, en cours, terminé), commentaires, vues filtrées (envoyées, reçues, archivées), notification temps réel à la réception
- **Rapports d'activité** : cinq types de comptes rendus terrain, cycle de validation (brouillon → enregistré → envoyé → archivé), pièces jointes, opérations en lot
- **Notifications push multi-appareils** : navigateurs (Web Push), iOS et Android (Expo SDK), sans application à installer sur mobile
- **Métrés terrain** : module de saisie des mesures par élément (fenêtres, portes…), types configurables, lié aux ordres de fabrication
- **PWA** : installable sur tous les appareils, mode hors-ligne partiel, thème dynamique

### Réalisations techniques notables

- **Notifications unifiées** : Web Push et mobile (Expo SDK) gérés dans un service unique, avec gestion gracieuse des abonnements manquants
- **Canaux WebSocket par utilisateur** : notifications ciblées sans diffusion globale — chaque utilisateur reçoit uniquement ce qui lui est destiné
- **39 modèles de données** : couverture complète d'un domaine métier complexe (construction, production, reporting terrain)
- **Vérification de santé Docker** : MongoDB doit être opérationnel avant le démarrage de l'API (healthcheck automatique)

---

## Backoffice Supreme — Plateforme SaaS de Création de Sites Vitrines
**Entreprise :** DepannPC
**Période :** Février 2025 – Mai 2025

### Présentation
Backoffice Supreme est une plateforme SaaS de type constructeur de sites vitrines. Chaque client dispose d'un espace d'administration isolé pour gérer son site : pages, sections de contenu, navigation, médias, thème graphique et paramètres SEO. Un moteur de rendu génère dynamiquement les pages publiques à partir des données configurées.

**Objectif métier :** Permettre à DepannPC de proposer des sites vitrines clé en main à ses clients professionnels, gérables via un backoffice moderne, sans compétences techniques côté client.

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 7.4 · PHP 8.2 |
| Interface d'administration | Next.js 16 · React 19 · TypeScript 5 |
| Site public (frontoffice) | Next.js 16 · React 19 · TypeScript 5 |
| Base de données | MariaDB 10.11 · Doctrine ORM |
| Authentification | JWT (Lexik Bundle) |
| UI | Tailwind CSS 4 · Radix UI · shadcn/ui · glisser-déposer (dnd-kit) · Sonner (toasts) · next-themes |
| Formulaires (backoffice) | React Hook Form · Zod · @hookform/resolvers |
| Animations (frontoffice) | Framer Motion |
| Proxy | Nginx |
| DevOps | Docker · Docker Compose |

### Architecture

```
Backend (Symfony)
├── Controller/
│   ├── Admin/      # Auth, Pages, Sections, Médias, Navigation, Thème, Tenants
│   └── Public/     # Pages, Config, Navigation (sans authentification)
├── Entity/         # 10 entités (Tenant, User, Page, Section, Media…)
└── Security/
    ├── TenantVoter         # Droits selon rôle et appartenance au tenant
    ├── UserChecker         # Vérification que l'utilisateur et son espace sont actifs
    └── JwtCreatedListener  # Enrichissement du token avec les données du profil
```

- 16 contrôleurs API (11 Admin + 5 Public) avec format de réponse unifié
- Chaque espace client est identifié par un identifiant unique dans l'URL
- Le contrôle d'accès vérifie automatiquement que l'utilisateur appartient bien à l'espace qu'il tente d'accéder
- Le super administrateur peut accéder à tous les espaces clients
- Les pages publiques sont servies avec mise en cache pour les performances
- SEO dynamique : sitemap.xml et robots.txt générés automatiquement par tenant
- Google Analytics configurable par tenant

### Données principales

- **Espace client (Tenant)** — Site vitrine d'un client avec son identifiant, son éventuel domaine personnalisé et son statut (actif, maintenance, désactivé)
- **Page** — Page du site avec son contenu, son statut (brouillon, publié, archivé) et ses paramètres de référencement
- **Section** — Bloc de contenu d'une page (bannière, galerie, FAQ, tarifs…) avec sa mise en page choisie et ses données propres
- **Média** — Fichier image ou vidéo uploadé, avec ses informations descriptives, ses étiquettes et son classement par dossier
- **Thème** — Ensemble des paramètres graphiques du site (couleurs, polices, style des boutons, espacement, animations)

### Fonctionnalités implémentées

- **Gestion multi-tenant** : création et administration des espaces clients (activation, désactivation, domaines personnalisés), avec création optionnelle de l'administrateur à la volée
- **Constructeur de pages** : 14 types de sections (bannière, texte, services, galerie, témoignages, équipe, FAQ, appel à l'action, contact, statistiques, tarifs, carte, chronologie, partenaires), 3 à 6 variantes visuelles par type, données stockées de façon flexible, réorganisation par glisser-déposer, visibilité mobile/desktop configurable
- **Gestion des pages** : 6 mises en page disponibles, statuts (brouillon/publié/archivé), désignation de la page d'accueil, référencement complet par page (titre, description, image de partage, URL canonique)
- **Médias** : upload avec détection automatique des dimensions, informations descriptives, classement par dossier et étiquettes
- **Navigation** : 4 emplacements de menu (en-tête, pied de page, barre latérale, barre supérieure), éléments hiérarchiques, liens vers pages internes ou URLs externes
- **Thème graphique** : 13 propriétés de couleur, 3 polices, styles de boutons, bordures, ombres et animations — tout configurable sans toucher au code
- **Formulaires de contact** : capture des soumissions avec suivi du statut (nouveau, lu, répondu, archivé, spam)

### Réalisations techniques notables

- **Contrôle d'accès multi-tenant** : 3 niveaux de permission (consulter / modifier / gérer les utilisateurs) extensibles sans modifier les contrôleurs
- **Token enrichi** : le token de connexion contient déjà les informations du profil (rôle, prénom, espace client) — évite un appel supplémentaire au démarrage
- **Blocage anticipé** : si un utilisateur ou son espace client est désactivé, l'accès est refusé dès le début de la connexion
- **Sections en données flexibles** : les nouveaux types de blocs peuvent être ajoutés sans modifier la structure de la base de données
- **Format de réponse unifié** sur toute l'API (succès, liste paginée, erreur, non trouvé, accès refusé, erreur de validation)

---

## Plateforme Éducative — LMS Multi-Tenant (Projet Personnel)
**Contexte :** Projet personnel
**Période :** Avril 2026 – En cours

### Présentation
La Plateforme Éducative est un système de gestion scolaire multi-établissements destiné aux écoles de Madagascar. Elle couvre l'ensemble des besoins : inscriptions, emplois du temps, cours, quiz, notes, présences, bulletins, communications et paiements. Chaque établissement dispose d'une base de données isolée et d'un backoffice dédié, géré par un super administrateur.

**Objectif métier :** Offrir aux établissements scolaires malgaches un outil de gestion numérique complet, accessible sur tous les appareils, adapté au contexte local (langue française, fuseau horaire Madagascar, format de téléphone local).

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Symfony 7.3 · PHP 8.2 |
| Base de données (principale) | MariaDB 10.4 — Doctrine ORM |
| Base de données (tenants) | MariaDB — DBAL dynamique (une base par établissement) |
| Authentification | JWT (Lexik Bundle) · 2FA par email |
| API | REST + OpenAPI (Nelmio ApiDoc) |
| Frontend | React 19 · TypeScript 5 (mode strict) · Vite 6 |
| Navigation | React Router DOM 7 |
| Génération API client | Orval 8 (OpenAPI → TypeScript/fetch) |
| Formulaires | React Hook Form 7 · Zod 4 · @hookform/resolvers |
| Composants UI | Radix UI · Tailwind CSS 4 · CVA · Lucide React |
| Éditeurs riches | TipTap 3 (leçons, quiz) · KaTeX (formules mathématiques et chimie) |
| Scanner QR | @zxing/browser (présences en classe) |
| PDF | DomPDF 3 (bulletins scolaires) |
| Notifications push | Web Push (minishlink/web-push) |
| SMS | SMS Gate API (absences, impayés) |
| Email | Symfony Mailer · templates Twig |
| Tests | PHPUnit 11 · Zenstruck Foundry · Faker · DAMA Test Bundle |
| DevOps | Docker Compose (PostgreSQL par défaut, MariaDB en production) |

### Architecture

Architecture multi-tenant par base de données isolée. Le backend Symfony gère une base principale (tenants, utilisateurs super admin) et crée dynamiquement une base dédiée par établissement.

```
API (Symfony)
├── Controller/
│   ├── AuthController.php          # Inscription, connexion, 2FA, reset mot de passe
│   ├── TenantController.php        # CRUD établissements (super admin)
│   ├── UserController.php          # Gestion utilisateurs globaux
│   └── Tenant/                     # 34 contrôleurs tenant (dashboard, présences, notes, quiz…)
├── Entity/                         # 3 entités principales (Tenant, User, PendingVerification)
├── DTO/                            # 154 DTOs (request/response par domaine)
├── Service/
│   ├── AuthService.php             # Authentification + vérification email
│   ├── TwoFactorAuthService.php    # 2FA par code email
│   ├── MailService.php             # Emails templatés (Twig)
│   ├── SmsService.php              # SMS via gateway externe
│   ├── WebPushService.php          # Notifications navigateur
│   └── Tenant/                     # 38 services métier (connexion dynamique, provisioning, migrations)
├── Security/
│   ├── TenantAwareUserProvider.php # Résolution utilisateur cross-base
│   └── Voter/UserVoter.php         # Permissions (VIEW / EDIT / DELETE)
├── Migrations/Tenant/              # 12 migrations versionnées (V001–V012)
└── EventListener/
    └── TenantRequestListener.php   # Résolution tenant depuis header X-Tenant-Slug

Frontend (React + Vite)
├── pages/                          # 60+ pages (lazy loading)
│   ├── auth/                       # Login, forgot/reset password
│   ├── superadmin/                 # Dashboard, tenants, settings, 2FA
│   └── tenant/                     # Dashboards par rôle, gestion scolaire complète
├── components/ui/                  # 19 composants UI (Radix + Tailwind + CVA)
├── components/quiz/                # Éditeurs de quiz (formules, canvas physique)
├── api/generated/                  # Clients API auto-générés par Orval
├── layouts/                        # TenantLayout, SuperadminLayout
└── lib/
    ├── tenant-auth.ts              # JWT client-side (localStorage)
    ├── tenant-api.ts               # Fetch wrapper avec headers tenant
    ├── user-role.ts                # Mapping rôles Symfony → rôles frontend
    └── orval-mutator.ts            # Injecteur token/slug pour Orval
```

- **38 contrôleurs API** (4 globaux + 34 tenant) · **255 routes** (218 avec méthodes HTTP explicites)
- **46 services** (8 globaux + 38 tenant) · **154 DTOs** avec validation Symfony Validator
- **Format de réponse unifié** sur toute l'API (succès, erreur, validation, non trouvé, non autorisé)
- **Filtres génériques** via attributs PHP personnalisés (`#[Filterable]`, `#[FilterableField]`)

### Architecture multi-tenant

Chaque établissement (tenant) dispose de sa propre base MariaDB (`tenant_{slug}`), créée et migrée automatiquement à la provisioning :

1. Le super admin crée un tenant → la base `tenant_{slug}` est créée
2. Toutes les migrations V001–V012 sont appliquées (schéma + données de seed)
3. L'administrateur de l'établissement est créé avec un mot de passe temporaire
4. Les requêtes API tenant utilisent le header `X-Tenant-Slug` pour router vers la bonne base

**12 migrations tenant (V001–V012) :** rôles, utilisateurs, permissions, structure scolaire, élèves, présences, programmes, leçons, emploi du temps, matières, quiz, notes, bulletins, notifications, configuration homepage, flashcards, paiements.

### Profils utilisateurs (8 rôles)

| Rôle | Accès |
|---|---|
| Super administrateur | Gestion de tous les établissements, création de tenants |
| Administrateur | Gestion complète d'un établissement (utilisateurs, rôles, paramètres) |
| Directeur | Tableau de bord direction, validation des programmes |
| Enseignant | Cours, quiz, notes, présences, bulletins |
| Surveillant | Présences, gestion disciplinaire |
| Élève | Consultation des cours, quiz, notes personnelles |
| Parent | Suivi du parcours de ses enfants |
| Inconnu | Fallback (en attente d'assignation de rôle) |

La session JWT est stockée dans le localStorage et persistée après rechargement. La déconnexion est automatique sur expiration du token ou réponse 401. Le onboarding guide l'administrateur à la première connexion.

### Fonctionnalités implémentées

- **Authentification** : inscription avec vérification email, connexion JWT, 2FA par code email pour le super admin, reset mot de passe par email
- **Gestion multi-tenant** : création d'établissements avec provisioning automatique de la base de données, plans (basic/standard/premium), statuts (actif/suspendu), domaines personnalisés
- **Tableaux de bord par rôle** : 5 dashboards spécialisés (admin, directeur, enseignant, élève, parent) avec données agrégées depuis la base tenant
- **Structure scolaire** : années scolaires, niveaux, classes, salles, matières, coefficients
- **Gestion des utilisateurs** : création, rôles personnalisables avec permissions granulaires (9 modules × 3 actions), assignation par classe
- **Élèves et inscriptions** : fiches élèves, inscriptions avec scolarité calculée, inscriptions publiques (formulaire sans authentification)
- **Présences** : séances de présences, marquage par QR code (scanner @zxing), billets d'entrée
- **Cours et leçons** : éditeur riche TipTap avec formules mathématiques (KaTeX), tableaux, images, alignement, surlignage
- **Quiz** : création avec éditeur de formules, questions QCU/QCM/réponse libre, scènes physiques interactives (canvas), passages, statistiques, résultats
- **Notes et bulletins** : saisie des notes par matière/classe, calcul des moyennes pondérées, génération PDF des bulletins (DomPDF)
- **Examens** : sessions d'examen, programmation, suivi
- **Paiements** : frais de scolarité configurables, paiements (espèce inclus), suivi des impayés
- **Mémentos** : fiches de révision par catégorie avec mode révision
- **Homepage éditoriale** : configuration du site public de l'établissement
- **Emploi du temps** : création et visualisation des plannings
- **Communications** : avis/annonces, messagerie interne, notifications push navigateur, notifications par SMS
- **Inscription publique** : formulaire d'inscription accessible sans compte, avec configuration par tenant (type, devise)

### Composants UI

Design glassmorphisme avec dégradés modernes et variables CSS pour les thèmes clair/sombre.

- **Bouton** — 5 styles (principal, secondaire, contour, fantôme, danger), 3 tailles, état de chargement intégré
- **Carte** — 3 niveaux d'effet verre, composants composés (en-tête, titre, contenu, pied de page)
- **Champ de saisie** — Label, message d'erreur, texte d'aide, icônes gauche/droite, état d'erreur visuel
- **Badge** — 6 couleurs sémantiques (succès, avertissement, erreur, info, neutre, principal)
- **Modale** — 5 tailles, fond animé, ouverture/fermeture fluide
- **Dialogue de confirmation** — Provider global avec hook `useConfirmDialog`
- **Tableau** — Composant réutilisable avec tri, pagination, sélection
- **Skeleton** — États de chargement pour toutes les pages

### Réalisations techniques notables

- **Architecture multi-tenant par base de données isolée** : chaque établissement a sa propre base MariaDB, créée et migrée automatiquement — isolation totale des données, scalabilité horizontale
- **Connexion dynamique DBAL** : le `TenantConnectionManager` résout et met en cache les connexions aux bases tenant à la volée, sans configuration statique
- **Système de migrations tenant versionnées** : 12 migrations PHP taggées (V001–V012), appliquées idempotemment avec table de tracking par base — permet les mises à jour schéma sans downtime
- **Génération de code API** : le backend expose une spec OpenAPI (Nelmio ApiDoc) → Orval génère automatiquement les clients TypeScript, les types et les validateurs Zod — zero drift entre API et frontend
- **2FA par email** : le super admin reçoit un code à usage unique par email à chaque connexion, stocké temporairement avec expiration
- **Notifications multi-canaux** : Web Push (navigateur), SMS (absences/impayés), email (vérification, 2FA, bulletins) — toutes gérées par des commandes Symfony schedulables
- **Éditeur de quiz scientifique** : TipTap enrichi avec KaTeX pour les formules mathématiques et chimie, éditeur canvas pour les scènes physiques interactives (forces, trajectoires)
- **Scanner QR pour les présences** : intégration @zxing/browser pour le marquage rapide des présences en classe via code QR
- **Génération PDF des bulletins** : DomPDF avec templates Twig, calcul automatique des moyennes pondérées par coefficient
- **Tests transactionnels** : PHPUnit + DAMA Test Bundle pour des tests d'intégration rapides avec rollback automatique après chaque test

---

## DepannPC — Site Vitrine Corporate (Next.js)
**Entreprise :** DepannPC
**Site :** depannpc.com
**Période :** 2024 – 2025

### Présentation
Site vitrine corporate de DepannPC, entreprise d'expertise informatique à La Réunion (dépannage, infogérance, télécom, monétique, développement logiciel). Le site présente l'ensemble des services, les deux agences (Saint-Denis et Saint-Pierre), les témoignages clients et intègre un chatbot FAQ intelligent entièrement client-side.

**Objectif métier :** Moderniser la présence en ligne de DepannPC, améliorer le référencement local sur La Réunion, convertir les visiteurs en leads via un formulaire de contact optimisé et un chatbot de qualification automatique.

### Stack technique

| Couche | Technologies |
|---|---|
| Framework | Next.js 15 · React 19 · TypeScript 5 |
| Rendu | App Router · SSR/SSG par page · output standalone |
| Styling | Tailwind CSS 3 · CSS variables · thème clair/sombre |
| Animations | Framer Motion 11 · IntersectionObserver · CSS custom |
| Icons | Heroicons React 2 · Lucide React 1.7 |
| Charts | Recharts 2 (statistiques internes) |
| Email | Nodemailer 8 · Office365 SMTP · API route `/api/contact` |
| Chatbot | Moteur de retrieval classique (BM25 + TF-IDF + char n-grams) — 100% client-side |
| PWA | Manifest webmanifest · Service Worker · page offline |
| SEO | Metadata Next.js · Schema.org JSON-LD · OpenGraph · canonical URLs |
| DevOps | Dockerfile multi-stage · Bun · port 4028 |

### Architecture

```
src/
├── app/                          # App Router (17 routes)
│   ├── page.tsx                  # Accueil
│   ├── layout.tsx                # Root layout (font, metadata, providers)
│   ├── a-propos/                 # Histoire, valeurs, équipe
│   ├── services/                 # Tous les services
│   ├── atelier/
│   │   ├── particulier/          # Dépannage PC particuliers
│   │   └── professionnel/        # Dépannage PC pros
│   ├── infogerance/              # Gestion IT externalisée
│   ├── telecom/                  # VoIP / téléphonie IP
│   ├── monetique/                # TPE / SAV monétique
│   ├── octogone/                 # Développement logiciel / SaaS
│   ├── outsourcing/              # Externalisation service client
│   ├── support-client/           # Support technique
│   ├── contact/                  # Formulaire + agences + FAQ
│   ├── depannage-saint-denis/    # Landing page SEO local
│   ├── depannage-saint-pierre/   # Landing page SEO local
│   ├── mentions-legales/         # Mentions légales
│   ├── politique-de-confidentialite/
│   ├── offline/                  # Page PWA hors connexion
│   └── api/contact/              # API route email (POST)
├── components/
│   ├── Header.tsx                # Navigation responsive + mega-menu
│   ├── Footer.tsx                # Liens services, entreprise, légal
│   ├── ThemeProvider.tsx         # Context dark/light mode
│   ├── CookieConsent.tsx         # Bannière RGPD
│   ├── PwaRegister.tsx           # Enregistrement SW
│   ├── ChatbotFAQ.tsx            # Widget chatbot flottant
│   ├── CursorPC.tsx              # Curseur personnalisé (desktop)
│   ├── FAQAccordion.tsx          # Accordéon réutilisable
│   └── ui/                       # AppIcon, AppImage, AppLogo
├── app/components/               # Sections homepage
│   ├── HeroSection.tsx           # Carousel hero + stats latérales
│   ├── ServicesGrid.tsx          # Bento grid services
│   ├── WhyUsSection.tsx          # Pourquoi nous choisir
│   ├── StatsSection.tsx          # Compteurs animés (IntersectionObserver)
│   ├── TestimonialsSection.tsx   # Témoignages clients
│   ├── PartnersSection.tsx       # Partenaires + certifications
│   └── CTASection.tsx            # Appel à l'action final
├── lib/
│   ├── chatbot/                  # Moteur de retrieval
│   │   ├── dialogEngine.ts       # BM25 + TF-IDF + n-grams + intents
│   │   ├── bm25.ts               # Index et scoring BM25
│   │   ├── tfidf.ts              # Modèle TF-IDF + cosine
│   │   ├── charNgram.ts          # Similarité par n-grams de caractères
│   │   ├── intentPatterns.ts     # Détection d'intentions (14 intents)
│   │   ├── responseComposer.ts   # Composition des réponses
│   │   ├── textNormalize.ts      # Normalisation texte français
│   │   ├── tokenize.ts           # Tokenisation française
│   │   └── stopwordsFr.ts        # Stopwords français
│   └── browserStorage.ts         # localStorage / sessionStorage / cookieStore
├── data/
│   └── faq.ts                    # 24 entrées FAQ avec tags et keywords
├── styles/
│   └── tailwind.css              # Variables CSS thème + utilitaires
└── public/
    ├── manifest.webmanifest        # PWA manifest
    ├── sw.js                       # Service Worker
    └── assets/images/              # 37 images (hero, services, logos)
```

### Pages et SEO

Chaque page dispose de metadata complète (title, description, keywords, OpenGraph) et certaines intègrent du Schema.org JSON-LD :

| Page | Focus SEO |
|---|---|
| Accueil | Marque + services globaux |
| Atelier Particulier | "dépannage pc particulier réunion" |
| Atelier Professionnel | "réparation ordinateur entreprise réunion" |
| Infogérance | "infogérance réunion", "maintenance proactive entreprise" |
| Télécom | "téléphonie ip réunion", "voip réunion" |
| Monétique | "tpe réunion", "maintenance tpe réunion" |
| Octogone | "développement logiciel réunion", "saas réunion" |
| Contact | "contact depannpc", LocalBusiness schema (2 agences) |
| Saint-Denis / Saint-Pierre | Landing pages géolocalisées |

### Chatbot FAQ intelligent

Le chatbot est un **moteur de retrieval classique 100% client-side** (aucun appel API externe, aucune dépendance LLM) :

- **24 entrées FAQ** couvrant : urgences, devis, domicile/atelier, zones couvertes, horaires, contrats entreprises, tarifs, virus, récupération données, réseau, WiFi, etc.
- **14 intents détectés** : greeting, thanks, farewell, phone, address, hours, services, identity, emergency, price, payment, mobile, help, faq
- **Algorithme de scoring hybride** :
  - BM25 lexical (38%)
  - TF-IDF cosine (30%)
  - Char n-grams (17%) — robustesse aux fautes de frappe
  - Intent overlap boost (9%)
  - Lexical overlap boost (6%)
- **Quick replies** : 8 suggestions rapides (urgence, devis, horaires, zones, PC lent, récupération données, tarifs, réseau)
- **Fallback intelligent** : si aucune correspondance > seuil, proposition de contacter par téléphone ou formulaire

### Fonctionnalités implémentées

- **Hero animé** : carousel d'images (3 slides, 5s d'intervalle), stats latérales animées, grille de lignes décorative
- **Bento grid services** : 6 services présentés en grille asymétrique avec images, icônes et liens
- **Compteurs animés** : statistiques (10 ans, 2000+ clients, 98% réussite, 2 agences) déclenchés par IntersectionObserver
- **Témoignages clients** : 3 avis avec notes, animations d'entrée au scroll
- **Partenaires et certifications** : Malwarebytes, Nakivo, Microsoft, Cisco
- **Formulaire de contact** : validation côté client + API route Nodemailer vers Office365, protection XSS (escapeHtml), clamp des champs
- **Navigation responsive** : mega-menu desktop, menu mobile, thème clair/sombre persistant (localStorage)
- **PWA** : installable, page offline fonctionnelle, cache des assets statiques
- **Cookie consent** : bannière RGPD avec acceptation/refus persistant
- **Curseur personnalisé** : flèche SVG animée (desktop uniquement, respecte `prefers-reduced-motion` et `pointer: coarse`)

### Réalisations techniques notables

- **Chatbot sans LLM** : moteur de retrieval classique (BM25 + TF-IDF) offrant des réponses instantanées sans coût API ni dépendance externe — plug-in point pour futur reranking neural (Transformers.js)
- **SEO local optimisé** : landing pages dédiées Saint-Denis et Saint-Pierre avec Schema.org LocalBusiness complet (adresse, téléphone, horaires d'ouverture)
- **Performance** : tree-shaking explicite des packages lourds (lucide-react, heroicons, framer-motion, recharts), images optimisées via next/image, output standalone pour Docker
- **Accessibilité** : curseur personnalisé désactivé sur touch devices et pour les utilisateurs préférant les animations réduites, aria-expanded sur l'accordéon
- **Docker multi-stage** : build optimisé (deps → builder → runner), image légère node:22-bookworm-slim, port 4028

---

## SMTH — Plateforme Communautaire d'Apprentissage
**Entreprise :** Devphantom
**Période :** Novembre 2025 – Décembre 2025

### Présentation
SMTH est une plateforme de réseautage professionnel et d'apprentissage collaboratif. Elle connecte ambassadeurs, étudiants et organisations autour de contenus éducatifs, de portfolios numériques et d'opportunités (deals/marketplace).

### Stack technique
Symfony 7.2 · PHP 8.2 · MariaDB · Next.js 16 · React 19 · TypeScript · JWT · Mistral AI · Google Places API · Mailgun · DomPDF

### Architecture et fonctionnalités
Organisation multi-rôles avec modules d'apprentissage pour les démarches administratives, portefeuille numérique de documents avec workflow de demande d'accès, fil d'actualité communautaire (posts), marketplace d'opportunités et structure d'académie pour les parcours éducatifs. Enrichissement des rapports par intelligence artificielle (Mistral AI) et chatbot avec fallback IA.

---

## BPF — Plateforme E-Learning pour Enseignants et Étudiants (Be prof)
**Entreprise :** Devphantom
**Période :** Septembre 2025 – Novembre 2025

### Présentation
BPF (Be Prof) est un SaaS éducatif connectant enseignants et étudiants via des contenus d'apprentissage structurés et un système d'abonnement.

### Stack technique
Symfony 7.3 · PHP 8.2 · MySQL 8.0 · Doctrine ORM · Next.js 16 · React 19 · TypeScript · Stripe (webhooks) · Mailgun · JWT · React Native (Expo)

### Architecture et fonctionnalités
Hiérarchie de contenus (dossiers → fiches → flashcards / QCM / vidéos), abonnements enseignants et étudiants avec gestion du cycle de vie via les événements Stripe, suivi de la progression des apprenants, partage de cours entre utilisateurs, recherche interne par MySQL LIKE, tableau de bord enseignant avec indicateurs d'engagement et gestion des certifications. Application mobile React Native (Expo) pour les apprenants.

---

## Bourbon Palto — Refonte E-Commerce et Migration depuis PrestaShop 1.7
**Entreprise :** DepannPC (pour Bourbon Palto)
**Site :** bourbonpalto.com
**Période :** Juillet 2025 – Septembre 2025

### Présentation
Bourbon Palto est une boutique de mode réunionnaise (vêtements, accessoires scolaires) possédant deux points de vente physiques à Saint-Denis et Saint-Pierre. Le projet couvre la refonte complète du site e-commerce — migré depuis PrestaShop 1.7 — avec développement d'un nouveau frontoffice React moderne et migration de l'intégralité des données historiques. Le backoffice de gestion des produits et commandes est assuré par Octogone ERP.

**Objectif métier :** Moderniser l'expérience d'achat en ligne (design, performances, gestion des variantes produits), tout en préservant l'historique complet des 8 ans de données clients et commandes de l'ancien système PrestaShop.

### Stack technique

| Couche | Technologies |
|---|---|
| Frontend (site public) | React 18 · Vite · Redux Toolkit · Tailwind CSS 3 · Framer Motion · React Router v6 · Axios |
| Backoffice ERP | Node.js · Express · MongoDB · Mongoose |
| Base de données | MongoDB (erp_commerce_bp0) — migré depuis PrestaShop/Kerawen |
| Migration des données | Scripts Node.js de transformation et import |

### Architecture

Le frontoffice consomme l'API publique de l'ERP pour les produits, catégories et variantes. La migration des données PrestaShop vers MongoDB a été réalisée par scripts Node.js dédiés, avec transformation des structures relationnelles en documents et optimisation du schéma.

**Données exposées par l'API publique :**
- `GET /articles/public` — catalogue avec pagination et recherche
- `GET /articles/public/:id` — fiche produit complète
- `GET /articles/public/variantes/:code` — variantes disponibles (taille, couleur, stock)
- `GET /articles/public/filters` — données de filtrage combinées
- `GET /familles-articles/public` — catégories produits

### Données principales (migration PrestaShop)

- **Clients** — 8 538 comptes clients avec leurs adresses (6 021) migrés depuis PrestaShop
- **Commandes et ventes** — 45 315 commandes, 156 005 lignes de détail, 46 363 paiements
- **Données de caisse (Kerawen)** — 43 957 ventes caisse, flux de trésorerie, opérations et rapports
- **Catalogue** — 819 articles avec variantes (taille, couleur, stock), familles et catégories (46)
- **Configuration** — 2 186 paramètres système PrestaShop conservés

### Fonctionnalités frontoffice implémentées

- **Page d'accueil** : bannière hero, sélection de produits mis en avant, mise en avant des catégories, section témoignages, inscription newsletter
- **Catalogue produits** : filtres combinés (catégorie, taille, couleur, plage de prix, recherche textuelle), affichage grille/liste, 50 produits par page, cache localStorage 10 min pour les produits et 30 min pour les filtres
- **Fiche produit** : galerie d'images, sélecteur de variantes (taille/couleur), stock disponible par variante, instructions d'entretien, produits similaires
- **Panier** : gestion des quantités par variante, persistance localStorage, calcul TVA 20%, récapitulatif des économies
- **Suivi de commande** : formulaire de recherche par numéro de commande, timeline visuelle des étapes, récapitulatif de commande
- **Magasins** : localisation des deux boutiques physiques et des permanences scolaires avec horaires, coordonnées et informations d'accessibilité PMR

### Réalisations techniques notables

- **Migration complète** : données PrestaShop/Kerawen migrées vers MongoDB avec transformation des structures relationnelles en documents, index optimisés et schéma dénormalisé pour les performances
- **Gestion des variantes côté client** : normalisation des noms de couleurs vers codes hex (20+ correspondances), calcul du stock réel en agrégeant toutes les variantes, dédoublonnage produits
- **Cache produits côté client** : stratégie de cache localStorage à deux niveaux (filtres 30 min / produits 10 min) pour réduire les appels API sur le catalogue de 819 articles
- **ERP intégré** : backoffice complet (produits, stocks, commandes, caisse, trésorerie) partageant la même base MongoDB

---

## Lina Market — ERP de Gestion pour Réseau de Distribution
**Entreprise :** DepannPC
**Période :** Mai 2025 – Juillet 2025

### Présentation
Lina Market est un ERP de gestion pour réseaux de distribution multi-sites (magasins et dépôts), déployé à partir du même framework ERP qu'Octogone. Le projet couvre l'intégration des données du système legacy Lina Market existant et l'adaptation des modules aux besoins spécifiques du réseau Lina.

**Objectif métier :** Remplacer le système de gestion legacy Lina Market par une solution moderne, en conservant les données historiques et en adaptant les flux métier aux spécificités du réseau (structure des articles, format des prix, gestion des dépôts).

### Stack technique

| Couche | Technologies |
|---|---|
| Backend | Node.js · Express · MongoDB (driver natif) |
| Frontend | React 18 · Vite · Zustand · Tailwind CSS · DaisyUI |
| Authentification | JWT · bcrypt |
| PDF | jsPDF |
| PWA | Workbox (cache offline) |
| Migration données | Scripts Node.js (JSON legacy → MongoDB) |

### Architecture

Même architecture qu'Octogone (Express → contrôleurs → ModelAdapter MongoDB). L'accès à la base est géré par un ModelAdapter générique (CRUD + timestamps) sans ORM, avec validation des schémas via `$jsonSchema` au niveau des collections et utilisation de `Decimal128` pour les valeurs monétaires.

**38+ modules API couverts :**
Organisation, magasins, dépôts, rayons, articles, familles, stocks, transferts, inventaires, fournisseurs, circuit achats complet, clients, circuit ventes complet, caisse POS, trésorerie, utilisateurs, rôles, permissions.

### Données principales

- **Organisation** — Entreprise principale et affiliées, configuration des taux de TVA et des grilles tarifaires
- **Points de vente** — Magasins et dépôts avec leurs rayons, chacun avec son propre stock
- **Articles** — Catalogue produits avec familles, tarifs et variantes, importé depuis le système Lina legacy
- **Circuit commercial** — Devis, commandes, livraisons et factures côté fournisseurs et côté clients, avec suivi des règlements
- **Caisse POS** — Sessions journalières, tickets, rapports X/Z et terminaux de vente

### Fonctionnalités adaptées depuis Octogone

- **ERP multi-sites** : magasins, dépôts, transferts inter-sites, inventaires physiques — identique à Octogone
- **Circuit achats et ventes** : procure-to-pay et quote-to-cash complets avec gestion des livraisons et factures
- **Caisse POS** : sessions journalières, tickets, rapports d'ouverture (X) et de clôture (Z), terminaux de vente
- **Trésorerie** : suivi des paiements clients, remises en banque, bordereaux de remise
- **PWA** : installable sur mobile et desktop, mode offline partiel avec Workbox

### Réalisations techniques notables

- **Framework ERP partagé** : codebase commun avec Octogone (architecture, modules, patterns) — développement centré sur l'import des données legacy et les spécificités métier Lina
- **Import données legacy** : script de transformation des articles et familles Lina (JSON legacy → MongoDB) avec normalisation des prix au format français (virgule → point), gestion des codes articles et génération des identifiants MongoDB
- **Validation schéma MongoDB** : contraintes d'intégrité via `$jsonSchema` sur les collections et types `Decimal128` pour la précision monétaire
