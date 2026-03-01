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
            strings: ['Développeur Symfony', 'Développeur API REST', 'Développeur Backend'],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }

    // Modal projet
    var PROJECTS = {
        'be-prof': {
            title: 'Be Prof',
            context: 'Plateforme SaaS d\'éducation en ligne — DepannPC',
            period: 'Novembre 2025 – Janvier 2026 (2 mois)',
            image: 'images/beprof1.png',
            images: ['images/beprof1.png', 'images/beprof2.png', 'images/beprof3.png'],
            tag: 'Symfony 7',
            description: '<p>Plateforme SaaS d\'éducation en ligne connectant professeurs et étudiants pour la création et la vente de contenu éducatif.</p>',
            technologies: ['Symfony 7', 'PHP 8.2+', 'MySQL', 'NelmioApiDocBundle', 'Stripe API', 'Mailgun', 'Vich Uploader', 'PHPUnit', 'Git/Github'],
            features: [
                { title: 'Gestion des programmes éducatifs complets', items: ['Structure hiérarchique : Programme → Dossier → Carte → Contenu', 'Création de programmes par enseignants, mise à jour et versioning', 'Publication/dépublication des programmes'] },
                { title: 'Organisation du contenu en dossiers imbriqués', items: ['Dossiers imbriqués pour structure hiérarchique', 'Ordonnancement, déplacement et réorganisation des contenus'] },
                { title: 'Quizzes et Questions à Choix Multiples (QCM)', items: ['Création de QCM avec questions variées, réponses uniques ou multiples', 'Import/export via CSV, randomisation des questions', 'Calcul automatique des scores, feedback immédiat'] },
                { title: 'Flashcards et fiches de révision', items: ['Sets de flashcards avec algorithme de répétition espacée', 'Fiches de révision en PDF, support markdown et rich text'] },
                { title: 'Vidéos pédagogiques', items: ['Upload et streaming optimisé', 'Suivi du temps de visionnage, sous-titres et transcriptions'] },
                { title: 'Système de souscription et paiements', items: ['Accès aux programmes via abonnement', 'Intégration Stripe : paiements, webhooks, remboursements, multi-devises', 'Plans d\'abonnement, essais gratuits, proration'] },
                { title: 'Suivi de la progression étudiant', items: ['Progression par module, taux de complétion', 'Sauvegarde des réponses aux QCM, historique de progression'] },
                { title: 'Tableaux de bord étudiant et enseignant', items: ['Vue des cours, progression, recommandations', 'Statistiques de ventes, engagement, revenus pour les enseignants'] },
                { title: 'Système de notation et certifications', items: ['Notation par enseignants, commentaires évaluatifs', 'Gestion des certifications, génération de certificats'] },
                { title: 'Partage de cours et profils enseignant', items: ['Partage de cours entre enseignants, collaboration', 'Profils publics avec bio, certifications, expérience professionnelle'] },
                { title: 'Recherche avancée et notifications', items: ['Recherche par titre, description, tags ; filtres et tri', 'Rappels de cours, notifications de commentaires et progression'] },
                { title: 'Statistiques et gestion des fichiers', items: ['Statistiques par programme (inscrits, complétion, scores)', 'Upload sécurisé multi-formats, miniatures, stockage optimisé'] }
            ]
        },
        'actif-diag': {
            title: 'Actif Diag',
            context: 'API REST interventions techniques & diagnostics immobiliers — DepannPC',
            period: 'Août 2025 – Octobre 2025 (2 mois)',
            image: 'images/odrn1.png',
            images: ['images/odrn1.png', 'images/odrn2.png', 'images/odrn3.png', 'images/odrn4.png'],
            tag: 'Symfony 7.3',
            description: '<p>API complète pour la gestion des interventions techniques, des diagnostics immobiliers et des prestations pour cabinets de diagnostic immobilier.</p>',
            technologies: ['Symfony 7.3', 'PHP 8.2+', 'MySQL/MariaDB', 'NelmioApiDocBundle', 'Vich Uploader', 'Mailgun', 'Pennylane API', 'Payplug API', 'DocuSeal API', 'Google Maps API', 'Git/Github'],
            features: [
                { title: 'Gestion complète des commandes de diagnostic', items: ['Commandes internes et externes, accès contrôlé aux rapports', 'Suivi du statut en temps réel avec historique', 'Génération d\'accès temporaires aux rapports, intégration Payplug dans le workflow'] },
                { title: 'Planification et gestion des interventions techniciennes', items: ['Planification manuelle avec assignation aux techniciens', 'Vérification des disponibilités par localisation géographique', 'Gestion des créneaux horaires selon zones de couverture', 'Annulation avec notifications automatiques'] },
                { title: 'Portail dédié pour les techniciens', items: ['Consultation du planning personnel', 'Validation démarrage/complétion des interventions sur le terrain', 'Upload sécurisé des rapports et photos via l\'app', 'Accès aux documents par intervention'] },
                { title: 'Gestion et filtrage avancé des clients', items: ['Clients particuliers et professionnels, association à des entreprises', 'Contacts multiples par client, filtrage générique (type, localisation, etc.)'] },
                { title: 'Catalogue de services (Prestations)', items: ['Catalogue des diagnostics (électricité, gaz, termites, etc.)', 'Sélection automatique selon les caractéristiques du bien', 'Tarifications et niveaux de prix par prestation'] },
                { title: 'Gestion documentaire sécurisée', items: ['Upload de documents d\'ordre (devis, contrats)', 'Rapports d\'intervention avec téléchargement sécurisé', 'Liens d\'accès temporaires avec expiration'] },
                { title: 'Système de commentaires collaboratifs', items: ['Commentaires sur les ordres (admin, techniciens, clients)', 'Notification des parties, historique des échanges par commande'] },
                { title: 'Départements et zones géographiques', items: ['Zones de couverture par agence/département', 'Localisation des techniciens, calcul de géolocalisation'] },
                { title: 'Grilles tarifaires et validation d\'adresses', items: ['Tarifs par prestation et zone, remises par client', 'Géocodage pour valider les adresses, auto-complétion'] },
                { title: 'Authentification multi-rôles et API JWT', items: ['Rôles : Admin, Manager, Collaborateur, Technicien, Utilisateur Pro', 'Contrôle granulaire d\'accès, JWT et refreshToken'] },
                { title: 'Intégrations Pennylane, DocuSeal, INPI', items: ['Synchronisation commandes/factures Pennylane', 'DocuSeal : documents à signer, suivi des signatures', 'Récupération données légales INPI pour enrichissement clients'] },
                { title: 'Emails, codes de vérification et maintenance', items: ['Emails personnalisés (confirmation, notifications, rappels)', 'Codes à 6 chiffres pour opérations sensibles', 'Voters et autorisations granulaires', 'Nettoyage automatique (créneaux expirés), documentation OpenAPI/Swagger'] }
            ]
        },
        'athena-oi': {
            title: 'Athéna OI',
            context: 'ERP PWA — Prestataire immobilier — DepannPC',
            period: 'Mai 2025 – Août 2025 (3 mois)',
            image: 'images/athena1.jpg',
            images: ['images/athena1.jpg', 'images/athena2.jpg', 'images/athena3.jpg'],
            tag: 'Symfony 7 · React',
            description: '<p>Développement d\'un ERP (PWA) pour fluidifier le flux de travail d\'une entreprise prestataire immobilier.</p><ul><li>Création et sécurisation des ressources API REST selon les rôles</li><li>Gestion d\'accès par défaut et personnalisés aux menus et fonctions selon le rôle</li><li>Optimisation de base de données en appliquant les procédures stockées, les vues et les triggers</li><li>Création d\'un système de messagerie professionnel type Messenger</li><li>Création d\'un agenda dédié à la gestion d\'événements spécifiques</li></ul>',
            technologies: ['Symfony 7', 'API Platform', 'React', 'Vite', 'TypeScript', 'MySQL', 'Postman', 'Git/Github']
        },
        'sofyx': {
            title: 'SOFYX',
            context: 'API gestion comptable et juridique — Cabinet d\'expertise — DepannPC',
            period: 'Mai 2025 – Août 2025 (3 mois)',
            image: 'images/sox0.png',
            images: ['images/sox0.png', 'images/sox1.png', 'images/sox2.png', 'images/sox3.png', 'images/sox4.png', 'images/sox5.png', 'images/sox6.png', 'images/sox7.png', 'images/sox8.png'],
            tag: 'Symfony 7',
            description: '<p>Plateforme de gestion comptable, fiscale et juridique pour cabinets d\'expertise-comptable avec automatisation massive.</p>',
            technologies: ['Symfony 7', 'Google APIs', 'Microsoft Graph', 'MySQL', 'Git/Github'],
            features: [
                { title: 'Gestion du portefeuille clients', items: ['Création et mise à jour des clients professionnels', 'Linkage automatique avec données INPI', 'Import en masse depuis fichiers', 'Assignation aux experts comptables'] },
                { title: 'Gestion des données légales et INPI', items: ['Récupération automatique INPI (statut légal, adresse siège)', 'Synchronisation des mises à jour', 'Alertes sur changements de statut légal'] },
                { title: 'Gestion de la TVA et autres taxes', items: ['TVA : régimes réel et simplifié, calcul et déclarations', 'CFE, CVAE, IFU, IRPP avec calculs automatisés'] },
                { title: 'Échéances fiscales', items: ['Création automatique des échéances', 'Calendrier fiscal par client', 'Alertes et rappels avant délais', 'Suivi du statut (à faire, en cours, complétée, dépassée)'] },
                { title: 'Déclarations comptables et suivi des temps', items: ['Génération des bilans et exports pour révision', 'Workflows de validation multi-étapes', 'Enregistrement des temps, validation des prestations, traçabilité'] },
                { title: 'Moteur d\'automatisation d\'emails', items: ['Séquences d\'emails déclenchées par événements', '18+ types d\'actions automatisables (rappels, mises à jour, etc.)', 'Templates dynamiques, variables, multi-langue'] },
                { title: 'Gestion des documents', items: ['Upload centralisé, organisation par type et date', 'Suivi des documents manquants, rappels automatiques', 'Téléchargement sécurisé'] },
                { title: 'Synchronisation Pennylane et MyUnisoft', items: ['Synchronisation bidirectionnelle, factures, écritures comptables', 'Import des écritures, export pour révision, plans comptables'] },
                { title: 'Emails et appels téléphoniques', items: ['Intégration Gmail et Microsoft Graph pour emails', 'Association des emails aux dossiers clients', 'Intégration AirCall : enregistrement des appels, statistiques'] },
                { title: 'Ticketing support et abonnements', items: ['Tickets de support, assignation aux experts', 'Commentaires collaboratifs, workflows de résolution', 'Abonnements clients, Stripe pour paiements'] },
                { title: 'Tableau de bord et normalisation', items: ['Vue d\'ensemble des dossiers, statistiques par activité', 'Métriques de performance, alertes sur dossiers en retard', 'Normalisation des données, traitement batch des échéances'] },
                { title: 'Processus asynchrones et multi-tenancy', items: ['Queues pour tâches lourdes, exécution en arrière-plan', 'Notifications en temps réel', 'Multi-tenancy : isolation des données entre agences'] }
            ]
        },
        'finance-fianarantsoa': {
            title: 'Finance Fianarantsoa SRRP',
            context: 'Suivi et évaluation des activités — Arato, Fianarantsoa',
            period: 'Août 2022 – Octobre 2022 (2 mois)',
            image: 'images/projet 2.png',
            images: ['images/projet 2.png', 'images/projet 3.png', 'images/img 3.png'],
            tag: 'Symfony 6 · React',
            description: '<p>Conception et réalisation d\'une application web de suivi et d\'évaluation des activités au sein de la Finance Fianarantsoa SRRP.</p><ul><li>Création et sécurisation des API utilisant API Platform</li><li>Intégration d\'une fonctionnalité d\'envoi de SMS en utilisant Ozeki SMS Gateway</li><li>Envoi de mail automatique en utilisant MailJet</li><li>Gestion des événements : synchronisation de l\'envoi de mail et de SMS</li><li>Importation de données depuis un fichier Excel vers la base de données</li></ul>',
            technologies: ['Symfony 6', 'React', 'Ozeki SMS', 'MailJet', 'API Platform', 'PostgreSQL', 'Postman', 'Git/Github']
        },
        'infinitia': {
            title: 'INFINITIA',
            context: 'Plateforme de gestion de concessions automobiles — DepannPC',
            period: '',
            image: 'images/infinitia1.png',
            images: ['images/infinitia1.png', 'images/infinitia2.png', 'images/infinitia3.png'],
            tag: 'Symfony · API',
            description: '<p>API complète pour la gestion de concessions automobiles avec planification de rendez-vous et synchronisation de calendriers (Google Calendar).</p>',
            technologies: ['Symfony', 'PHP', 'MySQL', 'Google APIs', 'OAuth2', 'Pennylane API', 'DocuSeal API', 'Git/Github'],
            features: [
                { title: 'Gestion de l\'inventaire automobile', items: ['Dépôt de véhicules via API plaques d\'immatriculation (auto-récupération des données)', 'Listing avec filtres avancés (prix, marque, modèle, état)', 'Gestion du statut (à vendre, réservé, vendu)'] },
                { title: 'Équipements et médias des véhicules', items: ['Dictionnaire d\'équipements, association par véhicule', 'Upload de photos et documents, ordre d\'affichage', 'Stockage sécurisé avec liens de téléchargement'] },
                { title: 'Rendez-vous clients (visites) et créneaux', items: ['Réservation de RDV pour visiter les véhicules', 'Synchronisation bidirectionnelle avec Google Calendar', 'Gestion des conflits de réservation', 'Configuration des créneaux récurrents par jour'] },
                { title: 'Consultation disponibilités Google Calendar', items: ['Intégration pour voir jours/heures libres', 'Détection des jours fermés, blocage des heures réservées', 'Suggestion de créneaux optimisés'] },
                { title: 'Devis, facturation et signatures', items: ['Génération de devis, factures via Pennylane', 'Suivi du statut des factures, export PDF', 'Signatures électroniques via DocuSeal, archivage des documents signés'] },
                { title: 'Authentification OTP et OAuth Google', items: ['Inscription avec OTP par email, réinitialisation mot de passe', 'Configuration OAuth pour Google, stockage des tokens', 'Accès Google Calendar, support multi-comptes par business'] },
                { title: 'Gestion multi-locale et profils clients', items: ['Chaque concession = tenant indépendant', 'Configuration par concession (horaires, équipements, tarifs)', 'Création de profils clients, historique des visites'] },
                { title: 'Portail public et sécurité', items: ['Listing public des véhicules à vendre, filtres', 'Chiffrement des données sensibles, conformité RGPD'] },
                { title: 'Statistiques, webhooks et plaques', items: ['Tableau de bord : ventes, taux de conversion, graphiques', 'Webhooks DocuSeal et Pennylane pour mise à jour automatique', 'Normalisation des plaques d\'immatriculation, API véhicule'] },
                { title: 'Notifications et rappels', items: ['Rappels de RDV planifiés', 'Emails de confirmation de réservation', 'Alertes sur événements importants'] }
            ]
        },
        'smth': {
            title: 'SMTH',
            context: 'Plateforme d\'apprentissage communautaire et réseautage professionnel — DepannPC',
            period: '',
            image: 'images/smth1.png',
            images: ['images/smth1.png'],
            tag: 'Symfony · API · IA',
            description: '<p>API pour plateforme d\'apprentissage connectant étudiants, ambassadeurs et organismes partenaires.</p>',
            technologies: ['Symfony', 'PHP', 'MySQL', 'Mistral AI', 'WhatsApp Business API', 'Google Drive', 'Google Maps API', 'Git/Github'],
            features: [
                { title: 'Gestion des utilisateurs et rôles multiples', items: ['Profils flexibles (étudiants, ambassadeurs, formateurs, admin)', 'Attribution de rôles multiples, permissions granulaires', 'Gestion des statuts (actif, suspendu, etc.)'] },
                { title: 'Portefeuille numérique (Wallet) pour les étudiants', items: ['Organisation hiérarchique des documents (dossiers/sous-dossiers)', 'Upload sécurisé de fichiers et certificats', 'Demandes d\'accès avec approbation, liens temporaires avec expiration'] },
                { title: 'Programme d\'ambassadeurs et parrainage', items: ['Enregistrement des ambassadeurs', 'Suivi des filleuls/références', 'Calcul automatique des commissions, gestion des paiements'] },
                { title: 'Espace d\'apprentissage (Academy) et modules', items: ['Création d\'academies, organisation hiérarchique des modules', 'Parcours pédagogiques, assignation aux étudiants', 'Suivi de la progression par module'] },
                { title: 'Espaces collaboratifs et organismes', items: ['Espaces pour organismes partenaires, sous-espaces et zones', 'Gestion des permissions par espace', 'Gestion des organismes, support multi-organisme'] },
                { title: 'Réseau social interne (Feed) et marketplace', items: ['Création et partage de posts par ambassadeurs', 'Commentaires, likes/réactions, feed personnalisé', 'Système de deals (offres commerciales), catégories, filtrage'] },
                { title: 'Chatbot support client avec IA (Mistral)', items: ['Catégories de questions pré-configurées', 'Réponses automatiques via Mistral AI', 'Escalade vers support humain, analytics du chatbot'] },
                { title: 'Notifications WhatsApp et intégrations', items: ['Intégration WhatsApp Business API', 'Google Drive : stockage, synchronisation, partage sécurisé', 'Google Maps : géolocalisation, zones desservies'] },
                { title: 'Enrichissement de contenu (Mistral AI) et sécurité', items: ['Génération de résumés, amélioration des descriptions', 'Suggestions de contenu, traduction multilingue', 'Codes OTP pour opérations sensibles'] },
                { title: 'Filtrage intelligent et tableau de bord', items: ['Recherche multi-critères, filtres sauvegardés', 'Statistiques d\'engagement, taux de complétion des modules', 'Performance des ambassadeurs, tendances des deals'] }
            ]
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

        var images = project.images && project.images.length ? project.images : (project.image ? [project.image] : []);

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
        }

        modalCarouselTotal = images.length;
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
})();
