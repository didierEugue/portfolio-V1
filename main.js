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
            title: 'SaaS Éducation en ligne',
            context: 'Plateforme SaaS d\'éducation en ligne — Projet confidentiel',
            period: 'Novembre 2025 – Janvier 2026 (2 mois)',
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
            period: 'Août 2025 – Octobre 2025 (2 mois)',
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
        'finance-fianarantsoa': {
            title: 'Finance Fianarantsoa SRRP',
            context: 'Suivi et évaluation des activités — Arato, Fianarantsoa',
            period: 'Août 2022 – Octobre 2022 (2 mois)',
            image: 'images/iasa.png',
            images: ['images/iasa.png'],
            tag: 'Symfony 6 · React',
            description: '<p>Conception et réalisation d\'une application web de suivi et d\'évaluation des activités au sein de la Finance Fianarantsoa SRRP.</p><ul><li>Création et sécurisation des API utilisant API Platform</li><li>Intégration d\'une fonctionnalité d\'envoi de SMS en utilisant Ozeki SMS Gateway</li><li>Envoi de mail automatique en utilisant MailJet</li><li>Gestion des événements : synchronisation de l\'envoi de mail et de SMS</li><li>Importation de données depuis un fichier Excel vers la base de données</li></ul>',
            technologies: ['Symfony 6', 'React', 'Ozeki SMS', 'MailJet', 'API Platform', 'PostgreSQL', 'Postman', 'Git/Github']
        },
        'infinitia': {
            title: 'Concessions auto & prise de RDV',
            context: 'Plateforme de gestion de concessions automobiles — Projet confidentiel',
            period: '',
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
            period: '',
            tag: 'Symfony · API · IA',
            confidential: true,
            description: '<p>API pour plateforme d\'apprentissage connectant étudiants, ambassadeurs et organismes partenaires.</p><ul><li>Utilisateurs, rôles, portefeuille numérique (Wallet)</li><li>Academy, modules et parcours pédagogiques</li><li>Feed social, marketplace (deals), chatbot IA</li><li>Intégrations WhatsApp, Google Drive / Maps</li></ul>',
            technologies: ['Symfony', 'PHP', 'MySQL', 'Mistral AI', 'WhatsApp Business API', 'Google Drive', 'Google Maps API', 'Git/Github'],
            images: [],
            features: [
                { title: 'Utilisateurs et apprentissage', items: ['Rôles multiples, Wallet, Academy et modules', 'Progression, ambassadeurs et parrainage'] },
                { title: 'Communauté et IA', items: ['Feed, commentaires, deals', 'Chatbot Mistral, WhatsApp, intégrations Google'] }
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
})();
