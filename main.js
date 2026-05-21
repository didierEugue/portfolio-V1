(function () {
    'use strict';

    var HEADER_OFFSET = 100;
    var menuToggle = document.getElementById('menu-toggle');
    var navMobile = document.getElementById('nav-mobile');
    var navLinks = document.querySelectorAll('.nav-link');
    var header = document.querySelector('.header');

    function closeMobileMenu() {
        if (navMobile) navMobile.classList.remove('is-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (navMobile) navMobile.setAttribute('aria-hidden', 'true');
    }

    // Menu mobile
    if (menuToggle && navMobile) {
        var navOverlay = document.getElementById('nav-overlay');

        menuToggle.addEventListener('click', function () {
            var isOpen = navMobile.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            navMobile.setAttribute('aria-hidden', !isOpen);
        });

        document.querySelectorAll('.nav-mobile-link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMobile.classList.contains('is-open')) closeMobileMenu();
        });

        if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Scroll: header shadow + active nav link
    function onScroll() {
        if (header) {
            header.classList.toggle('is-scrolled', window.scrollY > 50);
        }

        var scrollY = window.scrollY;
        var sections = document.querySelectorAll('section[id]');

        sections.forEach(function (section) {
            var id = section.getAttribute('id');
            if (!id) return;
            var top = section.offsetTop - HEADER_OFFSET;
            var height = section.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    var href = link.getAttribute('href');
                    if (href === '#' + id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Typed.js
    if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Développeur Symfony', 'Développeur API REST', 'Architecte SaaS', 'Développeur Full-Stack'],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }

    // Modal projet
    var PROJECTS = {
        'sekologia': {
            title: 'Sekologia — Plateforme de gestion scolaire',
            context: 'Système de gestion multi-établissements pour écoles de Madagascar — Projet personnel',
            period: 'Avril 2026 à ce jour',
            image: 'images/sekologia_1.png',
            tag: 'React · TypeScript',
            description: '<p>Plateforme numérique destinée aux établissements scolaires malgaches, couvrant tous les besoins de gestion : inscriptions des élèves, emplois du temps, cours en ligne, quiz, notes, suivi des présences et communications. Chaque profil dispose de son propre espace et de ses accès.</p><ul><li>Gestion des inscriptions, classes et emplois du temps</li><li>Cours, quiz, cartes mémoire et suivi de progression</li><li>Notes, présences et bulletins par élève</li><li>9 profils utilisateurs avec accès personnalisés (admin, enseignant, élève, parent, finance...)</li><li>Interface disponible en français et en malgache</li></ul>',
            technologies: ['React 19', 'TypeScript', 'Vite 7', 'Zustand', 'TanStack Query', 'Tailwind CSS 4', 'Radix UI', 'Framer Motion', 'React Hook Form', 'Zod'],
            images: ['images/sekologia_1.png', 'images/sekologia_2.png', 'images/sekologia_3.png'],
            features: [
                { title: 'Pour les élèves et parents', items: ['Accès aux cours, quiz et notes personnels', 'Suivi de la progression et des absences', 'Interface en français et en malgache'] },
                { title: 'Pour l\'établissement', items: ['Gestion des inscriptions, emplois du temps et classes', '9 profils utilisateurs avec accès personnalisés', 'Module financier et de paiement des frais scolaires'] }
            ]
        },
        'athena-oi': {
            title: 'Athéna OI',
            context: 'Refonte et migration d\'Athena v5 — ERP PWA pour prestataire immobilier — DepannPC',
            period: 'Janvier 2026 – Avril 2026 (3 mois)',
            image: 'images/athena_new_1.png',
            images: ['images/athena_new_1.png', 'images/athena_new_2.png', 'images/athena_new_3.png', 'images/athena_new_4.png', 'images/athena_new_5.png'],
            tag: 'Symfony 7 · React',
            description: '<p>Refonte complète d\'Athena v5 (Node.js / MongoDB) vers une nouvelle architecture (Symfony 7 / React / MySQL) pour un prestataire immobilier. L\'objectif était de moderniser la base technique et d\'étendre les fonctionnalités à la gestion immobilière.</p><ul><li>Accès sécurisés par rôle avec menus et permissions personnalisables</li><li>Messagerie interne type Messenger entre collaborateurs</li><li>Agenda dédié à la gestion des événements et rendez-vous</li><li>Base de données optimisée (procédures stockées, vues, triggers)</li></ul>',
            technologies: ['Symfony 7', 'API Platform', 'React', 'Vite', 'TypeScript', 'MySQL', 'Postman', 'Git/Github']
        },
        'infinitia': {
            title: 'Concessions auto & prise de RDV',
            context: 'Plateforme de gestion de concessions automobiles — Projet confidentiel',
            period: 'Décembre 2025 – Janvier 2026 (2 mois)',
            tag: 'Symfony · API',
            confidential: true,
            description: '<p>API pour la gestion de concessions avec inventaire, rendez-vous clients et synchronisation de calendriers.</p><ul><li>Inventaire véhicules (données, médias, statuts)</li><li>Réservation de RDV et synchronisation Google Calendar</li><li>Devis, facturation et signatures électroniques</li><li>Multi-locale, OAuth Google, portail public</li></ul>',
            technologies: ['Symfony', 'PHP', 'MySQL', 'Google APIs', 'OAuth2', 'Pennylane API', 'DocuSeal API', 'Git/Github'],
            images: [],
            features: [
                { title: 'Inventaire et RDV', items: ['Inventaire avec filtres et statuts', 'RDV clients, créneaux, sync Google Calendar'] },
                { title: 'Vente et sécurité', items: ['Devis, factures, DocuSeal', 'Multi-tenant, OTP, portail public'] }
            ]
        },
        'smth': {
            title: 'Academy & réseau communautaire',
            context: 'Plateforme d\'apprentissage communautaire et réseautage — Projet confidentiel',
            period: 'Novembre 2025 – Décembre 2025 (2 mois)',
            tag: 'Symfony · API · IA',
            confidential: true,
            description: '<p>API pour plateforme d\'apprentissage connectant étudiants, ambassadeurs et organismes partenaires.</p><ul><li>Utilisateurs, rôles, portefeuille numérique (Wallet)</li><li>Academy, modules et parcours pédagogiques</li><li>Feed social, marketplace (deals), chatbot IA</li><li>Intégrations WhatsApp, Google Drive / Maps</li></ul>',
            technologies: ['Symfony', 'PHP', 'MySQL', 'Mistral AI', 'WhatsApp Business API', 'Google Drive', 'Google Maps API', 'Git/Github'],
            images: [],
            features: [
                { title: 'Utilisateurs et apprentissage', items: ['Rôles multiples, Wallet, Academy et modules', 'Progression, ambassadeurs et parrainage'] },
                { title: 'Communauté et IA', items: ['Feed, commentaires, deals', 'Chatbot Mistral, WhatsApp, intégrations Google'] }
            ]
        },
        'be-prof': {
            title: 'SaaS Éducation en ligne',
            context: 'Plateforme SaaS d\'éducation en ligne — Projet confidentiel',
            period: 'Septembre 2025 – Novembre 2025 (3 mois)',
            tag: 'Symfony 7',
            confidential: true,
            description: '<p>Plateforme SaaS connectant enseignants et étudiants pour la création et la vente de contenu éducatif.</p><ul><li>Programmes et contenus hiérarchiques (dossiers, cartes, QCM, flashcards, vidéos)</li><li>Souscription et paiements en ligne (abonnements, essais, multi-devises)</li><li>Suivi de progression et tableaux de bord</li><li>Certifications et partage de cours</li></ul>',
            technologies: ['Symfony 7', 'PHP 8.2+', 'MySQL', 'NelmioApiDocBundle', 'Stripe API', 'Mailgun', 'Vich Uploader', 'PHPUnit', 'Git/Github'],
            images: [],
            features: [
                { title: 'Contenu et programmes', items: ['Structure hiérarchique programmes / dossiers / contenus', 'QCM, flashcards, vidéos pédagogiques', 'Publication et versioning'] },
                { title: 'Monétisation et accès', items: ['Abonnements, intégration paiements', 'Suivi de progression et certifications'] }
            ]
        },
        'actif-diag': {
            title: 'API Diagnostics & interventions',
            context: 'API REST — Interventions techniques et diagnostics immobiliers — Projet confidentiel',
            period: 'Août 2025 – Septembre 2025 (2 mois)',
            tag: 'Symfony 7.3',
            confidential: true,
            description: '<p>API pour la gestion des interventions techniques, des diagnostics et des prestations pour des cabinets spécialisés.</p><ul><li>Commandes et suivi de statut en temps réel</li><li>Planification et assignation aux techniciens (zones, créneaux)</li><li>Portail techniciens (planning, validation, upload rapports)</li><li>Intégrations facturation et documents à signer</li></ul>',
            technologies: ['Symfony 7.3', 'PHP 8.2+', 'MySQL/MariaDB', 'NelmioApiDocBundle', 'Vich Uploader', 'Mailgun', 'Pennylane API', 'Payplug API', 'DocuSeal API', 'Google Maps API', 'Git/Github'],
            images: [],
            features: [
                { title: 'Gestion des commandes et interventions', items: ['Commandes internes et externes, historique de statut', 'Planification, créneaux, géolocalisation'] },
                { title: 'Portail et intégrations', items: ['Portail techniciens, documents sécurisés', 'Pennylane, Payplug, DocuSeal, JWT multi-rôles'] }
            ]
        },
        'sofyx': {
            title: 'Gestion comptable & juridique',
            context: 'API gestion comptable et juridique — Cabinet d\'expertise — Projet confidentiel',
            period: 'Mai 2025 – Août 2025 (3 mois)',
            tag: 'Symfony 7',
            confidential: true,
            description: '<p>Plateforme de gestion comptable, fiscale et juridique pour cabinets d\'expertise avec automatisation.</p><ul><li>Portefeuille clients, données légales et INPI</li><li>Échéances fiscales, TVA, déclarations</li><li>Automatisation d\'emails et gestion documentaire</li><li>Synchronisation comptable et intégration emails / appels</li></ul>',
            technologies: ['Symfony 7', 'Google APIs', 'Microsoft Graph', 'MySQL', 'Git/Github'],
            images: [],
            features: [
                { title: 'Clients et fiscalité', items: ['Gestion clients, liaison INPI', 'TVA, échéances fiscales, calendrier et alertes'] },
                { title: 'Documents et intégrations', items: ['Documents centralisés, rappels', 'Pennylane, MyUnisoft, Gmail, Microsoft Graph, AirCall'] }
            ]
        },
        'gexp': {
            title: 'Gestion des dossiers d\'expertise technique',
            context: 'Application de gestion des missions pour experts techniques — Devphantom',
            period: 'Avril 2025 – Mai 2025 (2 mois)',
            tag: 'Symfony 6 · Next.js',
            description: '<p>Application permettant à des experts techniques de gérer leurs dossiers du début à la fin : création du dossier, envoi du devis pour signature, planification de l\'intervention, rédaction du rapport, facturation et suivi des paiements. Des emails automatiques sont envoyés aux clients à chaque étape d\'avancement.</p><ul><li>Cycle complet en 7 étapes (brouillon → devis signé → intervention → clôturé)</li><li>Devis en PDF envoyé au client pour signature électronique</li><li>Facturation automatique après validation de l\'intervention</li><li>Emails automatiques à chaque étape du dossier</li><li>Formulaires de diagnostic adaptables selon le type d\'expertise</li></ul>',
            technologies: ['Symfony 6.4', 'PHP 8.2', 'MySQL', 'Next.js 15', 'React 19', 'TypeScript', 'DocuSeal API', 'Mailgun', 'Google Maps', 'Dompdf', 'JWT', 'Docker'],
            features: [
                { title: 'Gestion des dossiers', items: ['Cycle complet en 7 étapes (brouillon → clôturé)', 'Devis en PDF envoyé pour signature électronique', 'Facturation automatique après validation de l\'intervention'] },
                { title: 'Notifications et outils', items: ['Emails automatiques à chaque étape du dossier', 'Formulaires de diagnostic adaptables par type d\'expertise', 'Suivi des paiements et rapports financiers'] }
            ]
        },
        'bourbon-palto': {
            title: 'Boutique en ligne — Mode réunionnaise',
            context: 'Refonte du site e-commerce et migration des données — Bourbon Palto, La Réunion',
            period: 'Juillet 2025 – Septembre 2025 (3 mois)',
            tag: 'React · E-Commerce',
            description: '<p>Refonte complète du site e-commerce de Bourbon Palto, boutique de mode réunionnaise avec deux magasins physiques à Saint-Denis et Saint-Pierre. Le nouveau site remplace l\'ancienne version avec un design moderne et une gestion des variantes produits (taille, couleur, stock). Les 8 ans d\'historique de données clients et commandes ont été entièrement préservés.</p><ul><li>Catalogue avec filtres combinés (catégorie, taille, couleur, plage de prix)</li><li>Fiche produit avec galerie d\'images et sélecteur de variantes</li><li>Panier persistant et suivi de commande</li><li>Migration de 8 538 clients et 45 000+ commandes depuis l\'ancien système</li><li>Chargement -60% plus rapide sur les pages catalogue</li></ul>',
            technologies: ['React 18', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MySQL', 'Scripts de migration'],
            images: ['images/boubon_palto_1.png', 'images/boubon_palto_2.png', 'images/boubon_palto_3.png', 'images/boubon_palto_4.png', 'images/boubon_palto_5.png', 'images/boubon_palto_6.png'],
            features: [
                { title: 'Site e-commerce', items: ['Catalogue avec filtres combinés (catégorie, taille, couleur, prix)', 'Fiche produit avec galerie d\'images et sélecteur de variantes', 'Panier persistant et suivi de commande'] },
                { title: 'Migration et performance', items: ['Migration de 8 538 clients, 45 000+ commandes depuis l\'ancien système', 'Localisation des deux boutiques physiques avec horaires', 'Chargement -60% plus rapide sur le catalogue'] }
            ]
        },
        'lina-market': {
            title: 'ERP multi-sites pour réseau de magasins',
            context: 'Système de gestion adapté au réseau Lina Market — DepannPC',
            period: 'Mai 2025 – Juillet 2025 (3 mois)',
            tag: 'Node.js · MongoDB',
            description: '<p>Adaptation du logiciel ERP Octogone aux besoins spécifiques du réseau Lina Market, avec migration complète de l\'ancien système vers une solution moderne. Le logiciel gère les magasins et dépôts, les stocks, les achats, les ventes, la caisse et la trésorerie, avec installation possible sur mobile.</p><ul><li>Magasins, dépôts, transferts inter-sites et inventaires physiques</li><li>Catalogue de produits importé depuis l\'ancien système Lina</li><li>Circuit achats et ventes complet (devis, commande, livraison, facture)</li><li>Sessions journalières de caisse et rapports</li><li>Suivi des paiements clients et remises en banque</li></ul>',
            technologies: ['Node.js 18', 'Express.js', 'MongoDB 8', 'React 18', 'Vite', 'Tailwind CSS', 'DaisyUI', 'JWT', 'Docker'],
            images: ['images/lina_market_1.png', 'images/lina_market_2.png', 'images/lina_market_3.png', 'images/lina_market_4.png', 'images/lina_market_5.png', 'images/lina_market_6.png'],
            features: [
                { title: 'Gestion multi-sites', items: ['Magasins, dépôts, transferts inter-sites et inventaires', 'Catalogue de produits importé depuis l\'ancien système', 'Circuit achats et ventes complet'] },
                { title: 'Caisse et trésorerie', items: ['Sessions journalières de caisse et rapports', 'Suivi des paiements clients et remises en banque', 'Application installable sur mobile (PWA)'] }
            ]
        },
        'backoffice-supreme': {
            title: 'Créateur de sites vitrines pour professionnels',
            context: 'Plateforme SaaS de création et gestion de sites vitrines — DepannPC',
            period: 'Février 2025 – Mai 2025 (4 mois)',
            tag: 'Symfony 7 · Next.js',
            description: '<p>Plateforme permettant à DepannPC de proposer des sites vitrines clé en main à ses clients professionnels. Chaque client accède à son propre espace pour modifier ses pages, ses textes, ses images, ses menus et les couleurs de son site, sans avoir besoin de compétences techniques. Le site public est généré automatiquement.</p><ul><li>15 types de blocs de contenu (bannière, galerie, FAQ, tarifs, équipe, témoignages...)</li><li>Personnalisation des couleurs, polices et style du site sans toucher au code</li><li>Réorganisation des blocs par glisser-déposer</li><li>Gestion des images, menus et pages (brouillon, publié, archivé)</li><li>Formulaires de contact avec suivi des messages reçus</li><li>Référencement paramétrable par page (titre, description, image de partage)</li></ul>',
            technologies: ['Symfony 7.4', 'PHP 8.2', 'MariaDB', 'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'JWT', 'Docker', 'Nginx'],
            images: ['images/site_vitrine_1.png', 'images/site_vitrine_2.png', 'images/site_vitrine_3.png', 'images/site_vitrine_4.png', 'images/site_vitrine_5.png', 'images/site_vitrine_6.png', 'images/site_vitrine_7.png'],
            features: [
                { title: 'Pour les clients', items: ['Gestion des pages et blocs de contenu (15 types, variantes visuelles)', 'Personnalisation des couleurs, polices et style du site', 'Gestion des images, menus et formulaires de contact'] },
                { title: 'Pour l\'équipe DepannPC', items: ['Création et administration de tous les espaces clients', 'Activation/désactivation et domaines personnalisés par client', 'Contrôle d\'accès à 3 niveaux (consulter / modifier / gérer)'] }
            ]
        },
        'octogone': {
            title: 'ERP pour réseaux de magasins et de distribution',
            context: 'Logiciel complet de gestion pour réseaux de distribution multi-sites — DepannPC',
            period: 'Janvier 2025 – Mai 2025 (5 mois)',
            tag: 'Node.js · React · MongoDB',
            description: '<p>Logiciel complet de gestion pour les réseaux de magasins et dépôts (épiceries, mini-marchés). Il couvre la gestion des produits et des stocks en temps réel, les achats fournisseurs, les ventes clients, la caisse enregistreuse certifiée conforme à la loi française, et les rapports financiers. L\'application peut s\'installer sur mobile et ordinateur.</p><ul><li>Catalogue produits avec codes-barres, prix multi-niveaux et alertes de rupture de stock</li><li>Stocks par magasin mis à jour en temps réel</li><li>Circuit complet achats et ventes : devis, commande, livraison, facture, avoir</li><li>Caisse enregistreuse certifiée conforme à la loi française (norme LNE) avec rapports journaliers</li><li>Tableau de bord, exports Excel et application installable sur mobile (PWA)</li></ul>',
            technologies: ['Node.js 18', 'Express.js', 'MongoDB', 'React 18', 'Vite 6', 'Zustand', 'Tailwind CSS', 'DaisyUI', 'JWT', 'jsPDF', 'ExcelJS', 'Chart.js', 'Docker'],
            images: ['images/sox0.png', 'images/sox1.png', 'images/sox2.png'],
            features: [
                { title: 'Gestion du stock et des ventes', items: ['Catalogue de produits avec codes-barres et QR', 'Stocks par magasin mis à jour en temps réel', 'Circuit complet achats et ventes (devis, commande, livraison, facture)'] },
                { title: 'Caisse et rapports', items: ['Caisse certifiée conforme à la loi française (norme LNE)', 'Rapports d\'ouverture et clôture journalière', 'Tableau de bord, exports Excel, application installable sur mobile'] }
            ]
        },
        'athena-v5': {
            title: 'Athena v5 — Gestion de production et de chantiers',
            context: 'Version originale d\'Athéna — migrée et refaite en Athéna OI — DepannPC',
            period: 'Décembre 2024 – Avril 2025 (4 mois)',
            tag: 'Node.js · React · PWA',
            description: '<p>Application interne de DepannPC pour centraliser la gestion des chantiers, des ordres de fabrication, des consignes aux collaborateurs et des rapports terrain. Remplace les échanges téléphoniques et papier par une plateforme numérique accessible depuis le bureau ou le terrain, installable sur mobile et ordinateur. Cette version a ensuite été entièrement refaite et migrée vers Athéna OI (Symfony 7 / React).</p><ul><li>Gestion des chantiers avec budget détaillé (matériaux, main-d\'œuvre)</li><li>Ordres de fabrication liés aux chantiers avec suivi d\'avancement</li><li>Consignes aux collaborateurs avec notifications instantanées</li><li>Rapports d\'activité terrain (visite, qualité, technique) avec pièces jointes</li><li>Notifications push sur mobile (iOS/Android) et navigateur</li><li>Prise de cotes terrain (fenêtres, portes, dimensions)</li></ul>',
            technologies: ['Node.js 18', 'Express.js', 'MongoDB 7', 'React 18', 'Vite', 'Tailwind CSS', 'Socket.io', 'JWT', 'Web Push', 'Expo SDK', 'FullCalendar', 'Docker'],
            features: [
                { title: 'Gestion de production', items: ['Chantiers avec budget détaillé (matériaux, main-d\'œuvre)', 'Ordres de fabrication avec tâches et avancement', 'Prise de cotes terrain (fenêtres, portes, dimensions)'] },
                { title: 'Communication et suivi', items: ['Consignes aux collaborateurs avec notifications instantanées', 'Rapports d\'activité avec pièces jointes et validation', 'Notifications push sur mobile iOS/Android et navigateur'] }
            ]
        },
        'finance-fianarantsoa': {
            title: 'Finance Fianarantsoa SRRP',
            context: 'Suivi et évaluation des activités — Arato, Fianarantsoa',
            period: 'Août 2022 – Octobre 2022 (2 mois)',
            image: 'images/iasa.png',
            images: ['images/iasa.png'],
            tag: 'Symfony 6 · React',
            description: '<p>Conception et réalisation d\'une application web de suivi et d\'évaluation des activités au sein de la Finance Fianarantsoa SRRP.</p><ul><li>Création et sécurisation des API utilisant API Platform</li><li>Intégration d\'une fonctionnalité d\'envoi de SMS en utilisant Ozeki SMS Gateway</li><li>Envoi de mail automatique en utilisant MailJet</li><li>Gestion des événements : synchronisation de l\'envoi de mail et de SMS</li><li>Importation de données depuis un fichier Excel vers la base de données</li></ul>',
            technologies: ['Symfony 6', 'React', 'Ozeki SMS', 'MailJet', 'API Platform', 'PostgreSQL', 'Postman', 'Git/Github']
        }
    };

    var modal = document.getElementById('project-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalContext = document.getElementById('modal-context');
    var modalCarouselTrack = document.getElementById('modal-carousel-track');
    var modalCarouselPrev = document.getElementById('modal-carousel-prev');
    var modalCarouselNext = document.getElementById('modal-carousel-next');
    var modalCarouselDots = document.getElementById('modal-carousel-dots');
    var modalTag = document.getElementById('modal-tag');
    var modalPeriod = document.getElementById('modal-period');
    var modalDescription = document.getElementById('modal-description');
    var modalFeaturesWrap = document.getElementById('modal-features-wrap');
    var modalFeatures = document.getElementById('modal-features');
    var modalTech = document.getElementById('modal-tech');
    var modalMissions = document.getElementById('modal-missions');

    var modalCarouselIndex = 0;
    var modalCarouselTotal = 0;

    function updateModalCarousel(index) {
        if (!modalCarouselTrack || modalCarouselTotal <= 0) return;
        modalCarouselIndex = (index + modalCarouselTotal) % modalCarouselTotal;
        modalCarouselTrack.style.transform = 'translateX(-' + (modalCarouselIndex * 100) + '%)';
        if (modalCarouselDots) {
            var dots = modalCarouselDots.querySelectorAll('.modal-carousel-dot');
            dots.forEach(function (d, i) { d.classList.toggle('is-active', i === modalCarouselIndex); });
        }
        if (modalCarouselPrev) modalCarouselPrev.style.display = modalCarouselTotal > 1 ? 'flex' : 'none';
        if (modalCarouselNext) modalCarouselNext.style.display = modalCarouselTotal > 1 ? 'flex' : 'none';
    }

    function openProjectModal(projectId) {
        var project = PROJECTS[projectId];
        if (!project || !modal) return;

        var images = project.confidential ? [] : (project.images && project.images.length ? project.images : (project.image ? [project.image] : []));

        modalTitle.textContent = project.title;
        modalContext.textContent = project.context;
        modalTag.textContent = project.tag;
        if (modalPeriod) {
            modalPeriod.textContent = project.period || '';
            modalPeriod.style.display = project.period ? '' : 'none';
        }
        modalDescription.innerHTML = project.description;
        if (modalFeaturesWrap && modalFeatures) {
            if (project.features && project.features.length > 0) {
                modalFeaturesWrap.style.display = 'block';
                modalFeatures.innerHTML = project.features.map(function (f) {
                    var itemsHtml = (f.items && f.items.length) ? '<ul class="modal-feature-list">' + f.items.map(function (it) { return '<li>' + it + '</li>'; }).join('') + '</ul>' : '';
                    return '<div class="modal-feature-item"><h4 class="modal-feature-title">' + f.title + '</h4>' + itemsHtml + '</div>';
                }).join('');
            } else {
                modalFeaturesWrap.style.display = 'none';
            }
        }
        modalTech.innerHTML = project.technologies.map(function (t) { return '<li>' + t + '</li>'; }).join('');
        modalMissions.innerHTML = '';

        if (modalCarouselTrack) {
            modalCarouselTrack.innerHTML = '';
            if (project.confidential || images.length === 0) {
                var confidentialSlide = document.createElement('div');
                confidentialSlide.className = 'modal-carousel-slide modal-carousel-slide--confidential';
                confidentialSlide.setAttribute('aria-roledescription', 'slide');
                var confidentialLabel = document.createElement('div');
                confidentialLabel.className = 'modal-carousel-confidential';
                confidentialLabel.textContent = 'Projet confidentiel';
                confidentialSlide.appendChild(confidentialLabel);
                modalCarouselTrack.appendChild(confidentialSlide);
                modalCarouselTotal = 1;
            } else {
                images.forEach(function (src, i) {
                    var slide = document.createElement('div');
                    slide.className = 'modal-carousel-slide';
                    slide.setAttribute('aria-roledescription', 'slide');
                    var img = document.createElement('img');
                    img.src = src;
                    img.alt = project.title + ' — image ' + (i + 1);
                    img.classList.add('modal-carousel-slide-img');
                    slide.appendChild(img);
                    img.addEventListener('click', function (e) {
                        e.stopPropagation();
                        openImageLightbox(src, img.alt);
                    });
                    modalCarouselTrack.appendChild(slide);
                });
                modalCarouselTotal = images.length;
            }
        } else {
            modalCarouselTotal = 0;
        }
        modalCarouselIndex = 0;
        updateModalCarousel(0);

        if (modalCarouselDots) {
            modalCarouselDots.innerHTML = '';
            if (images.length > 1) {
                for (var d = 0; d < images.length; d++) {
                    var dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'modal-carousel-dot' + (d === 0 ? ' is-active' : '');
                    dot.setAttribute('aria-label', 'Image ' + (d + 1));
                    (function (idx) {
                        dot.addEventListener('click', function () { updateModalCarousel(idx); });
                    })(d);
                    modalCarouselDots.appendChild(dot);
                }
            }
        }

        if (modalCarouselPrev) {
            modalCarouselPrev.onclick = function (e) { e.stopPropagation(); updateModalCarousel(modalCarouselIndex - 1); };
        }
        if (modalCarouselNext) {
            modalCarouselNext.onclick = function (e) { e.stopPropagation(); updateModalCarousel(modalCarouselIndex + 1); };
        }

        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        modal.querySelector('.modal-close').focus();
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.project-link-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var id = btn.getAttribute('data-project-id');
            if (id) openProjectModal(id);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach(function (el) {
        el.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
            closeProjectModal();
        }
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            closeProjectModal();
        }
    });

    var lightbox = document.getElementById('image-lightbox');
    var lightboxImage = document.getElementById('lightbox-image');

    function openImageLightbox(src, alt) {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = src;
        lightboxImage.alt = alt || '';
        lightbox.setAttribute('aria-hidden', 'false');
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        lightbox.querySelector('.lightbox-close').focus();
    }

    function closeImageLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = (modal && modal.classList.contains('is-open')) ? 'hidden' : '';
    }

    if (lightboxImage) {
        lightboxImage.addEventListener('click', function (e) { e.stopPropagation(); });
    }
    document.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
        el.addEventListener('click', closeImageLightbox);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
            closeImageLightbox();
        }
    });
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
                closeImageLightbox();
            }
        });
    }

    /* ══════════════════════════════════════════════
       CONTACT FORM — EmailJS
       ─────────────────────────────────────────────
       Sur emailjs.com → Add Service → Gmail (didiereugene789@gmail.com)
       → créer un template avec {{from_name}}, {{from_email}},
         {{subject}}, {{message}}
       → remplacer les 3 constantes ci-dessous
    ══════════════════════════════════════════════ */
    var EJS_PUBLIC_KEY  = 'ydSmQg3etfc4qkT3A';   // Account → Public Key
    var EJS_SERVICE_ID  = 'service_nq0ocgp';   // Email Services → Service ID
    var EJS_TEMPLATE_ID = 'template_kt86qc9';  // Email Templates → Template ID

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EJS_PUBLIC_KEY });
    }

    var contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var btn     = contactForm.querySelector('[type="submit"]');
            var btnText = btn.textContent;

            var name    = contactForm.querySelector('[name="name"]').value.trim();
            var email   = contactForm.querySelector('[name="email"]').value.trim();
            var subject = contactForm.querySelector('[name="subject"]') ? contactForm.querySelector('[name="subject"]').value.trim() : '(Sans objet)';
            var message = contactForm.querySelector('[name="message"]').value.trim();

            if (!name || !email || !message) { return; }

            if (typeof emailjs === 'undefined') {
                alert('EmailJS non chargé. Vérifiez votre connexion internet.');
                return;
            }

            btn.disabled    = true;
            btn.textContent = 'Envoi en cours…';

            emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
                from_name:  name,
                from_email: email,
                subject:    subject || '(Sans objet)',
                message:    message
            })
            .then(function () {
                btn.textContent = '✓ Message envoyé !';
                btn.style.background = '#059669';
                contactForm.reset();
                setTimeout(function () {
                    btn.textContent      = btnText;
                    btn.style.background = '';
                    btn.disabled         = false;
                }, 4000);
            })
            .catch(function () {
                btn.textContent      = '✗ Échec — réessayez';
                btn.style.background = '#dc2626';
                btn.disabled         = false;
                setTimeout(function () {
                    btn.textContent      = btnText;
                    btn.style.background = '';
                }, 4000);
            });
        });
    }

})();
