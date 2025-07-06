-- =================================================================
-- SCRIPT D'INSERTION DE DONNEES REELLES
-- Projet: Publify - Plateforme de gestion multi-réseaux sociaux
-- Auteur: Mathéo Beuve
-- Date: 2025-01-05
-- Objectif: Données réelles pour démonstration CCP 2
-- =================================================================

-- Connexion à la base
\c publify_ccp2;

-- =================================================================
-- INSERTION DES RESEAUX SOCIAUX
-- =================================================================

INSERT INTO reseaux_sociaux (nom, api_endpoint, limite_caracteres, formats_media, actif) VALUES
('LinkedIn', 'https://api.linkedin.com/v2/', 3000, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE),
('Twitter', 'https://api.twitter.com/2/', 280, ARRAY['image/jpeg', 'image/png', 'image/gif', 'video/mp4'], TRUE),
('Facebook', 'https://graph.facebook.com/v18.0/', 63206, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE),
('Instagram', 'https://graph.instagram.com/v18.0/', 2200, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE),
('TikTok', 'https://open-api.tiktok.com/platform/v1/', 150, ARRAY['video/mp4'], FALSE);

-- =================================================================
-- INSERTION DES UTILISATEURS AVEC MOTS DE PASSE REELS
-- =================================================================

INSERT INTO utilisateurs (email, mot_de_passe_hash, nom, prenom, avatar_url, plan_abonnement, statut) VALUES
-- Mot de passe hashé avec bcrypt coût 12: "Password123!"
('matheo.beuve@prepavenir.com', '$2b$12$LQv3c1yqBwLFaFX.rHKZNOczTBdMvDmHcIRJmcNJhRlc8EhgWK3bO', 'Beuve', 'Mathéo', 'https://publify.site/avatars/matheo.jpg', 'entreprise', 'actif'),
-- Mot de passe: "MarketingPro2024!"
('sarah.martin@entreprise.com', '$2b$12$5v8dLPmZUJjDpQ3c.VqkzOKJpx6NmLDOvNqzKmYCbJdS0.g5PwK3K', 'Martin', 'Sarah', 'https://publify.site/avatars/sarah.jpg', 'pro', 'actif'),
-- Mot de passe: "Content123"
('pierre.dubois@startup.fr', '$2b$12$8KzJpVUGFhXXrZqBvYTsf.eKmKmJzPwXvBqRzHdNdTgS8uZgI5F9G', 'Dubois', 'Pierre', 'https://publify.site/avatars/pierre.jpg', 'gratuit', 'actif'),
-- Mot de passe: "TeamLead2024"
('julie.bernard@agence.com', '$2b$12$3CjGpQhKxVz5rZtBnOqU8.aKmKmJzPwXvBqRzHdNdTgS8uZgI5F9G', 'Bernard', 'Julie', 'https://publify.site/avatars/julie.jpg', 'pro', 'actif'),
-- Mot de passe: "Freelance2024"
('alex.rousseau@freelance.com', '$2b$12$9FjHpXVGFhXXrZqBvYTsf.eKmKmJzPwXvBqRzHdNdTgS8uZgI5F9G', 'Rousseau', 'Alex', 'https://publify.site/avatars/alex.jpg', 'gratuit', 'actif'),
-- Utilisateur suspendu
('spam.user@example.com', '$2b$12$1AjGpQhKxVz5rZtBnOqU8.aKmKmJzPwXvBqRzHdNdTgS8uZgI5F9G', 'Spam', 'User', NULL, 'gratuit', 'suspendu');

-- =================================================================
-- INSERTION DES CONNEXIONS RESEAUX SOCIAUX
-- =================================================================

INSERT INTO connexions_reseaux (utilisateur_id, reseau_id, access_token, refresh_token, token_expire_le, nom_profil, id_profil_externe, statut) VALUES
-- Mathéo - LinkedIn + Twitter
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 1, 'linkedin_access_token_matheo_encrypted', 'linkedin_refresh_token_matheo', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Mathéo Beuve - Développeur CDA', 'matheo-beuve-dev', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 2, 'twitter_access_token_matheo_encrypted', 'twitter_refresh_token_matheo', CURRENT_TIMESTAMP + INTERVAL '30 days', '@matheo_dev', 'matheo_dev_twitter', 'actif'),

-- Sarah - LinkedIn + Facebook + Instagram
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 1, 'linkedin_access_token_sarah_encrypted', 'linkedin_refresh_token_sarah', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Sarah Martin - Marketing Manager', 'sarah-martin-marketing', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 3, 'facebook_access_token_sarah_encrypted', 'facebook_refresh_token_sarah', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Sarah Martin Marketing', 'sarah.martin.marketing', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 4, 'instagram_access_token_sarah_encrypted', 'instagram_refresh_token_sarah', CURRENT_TIMESTAMP + INTERVAL '60 days', '@sarah_marketing_pro', 'sarah_marketing_pro', 'actif'),

-- Pierre - LinkedIn seulement
((SELECT id FROM utilisateurs WHERE email = 'pierre.dubois@startup.fr'), 1, 'linkedin_access_token_pierre_encrypted', 'linkedin_refresh_token_pierre', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Pierre Dubois - Entrepreneur', 'pierre-dubois-entrepreneur', 'actif'),

-- Julie - LinkedIn + Twitter
((SELECT id FROM utilisateurs WHERE email = 'julie.bernard@agence.com'), 1, 'linkedin_access_token_julie_encrypted', 'linkedin_refresh_token_julie', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Julie Bernard - Team Lead', 'julie-bernard-teamlead', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'julie.bernard@agence.com'), 2, 'twitter_access_token_julie_encrypted', 'twitter_refresh_token_julie', CURRENT_TIMESTAMP + INTERVAL '30 days', '@julie_teamlead', 'julie_teamlead_twitter', 'actif'),

-- Alex - LinkedIn + Twitter (token expiré)
((SELECT id FROM utilisateurs WHERE email = 'alex.rousseau@freelance.com'), 1, 'linkedin_access_token_alex_encrypted', 'linkedin_refresh_token_alex', CURRENT_TIMESTAMP - INTERVAL '10 days', 'Alex Rousseau - Freelance', 'alex-rousseau-freelance', 'expire'),
((SELECT id FROM utilisateurs WHERE email = 'alex.rousseau@freelance.com'), 2, 'twitter_access_token_alex_encrypted', 'twitter_refresh_token_alex', CURRENT_TIMESTAMP + INTERVAL '30 days', '@alex_freelance', 'alex_freelance_twitter', 'actif');

-- =================================================================
-- INSERTION DES PUBLICATIONS REELLES
-- =================================================================

INSERT INTO publications (utilisateur_id, titre, contenu, urls_media, reseaux_cibles, date_creation, date_modification, date_publication_prevue, date_publication_reelle, statut, nombre_vues, nombre_likes, nombre_partages, nombre_commentaires) VALUES

-- Publications de Mathéo (développeur)
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 
 'Retour d''expérience sur Next.js 15', 
 'Après 6 mois d''utilisation de Next.js 15 sur notre projet Publify, voici mon retour d''expérience 🚀\n\n✅ App Router: Une révolution pour la structure des projets\n✅ Server Components: Performance drastiquement améliorée\n✅ TypeScript: Intégration native parfaite\n\n#NextJS #React #TypeScript #WebDev #Publify', 
 ARRAY['https://publify.site/media/nextjs-experience.jpg'], 
 ARRAY[1, 2], 
 CURRENT_TIMESTAMP - INTERVAL '5 days', 
 CURRENT_TIMESTAMP - INTERVAL '5 days', 
 CURRENT_TIMESTAMP - INTERVAL '5 days', 
 CURRENT_TIMESTAMP - INTERVAL '5 days', 
 'publie', 
 1245, 67, 23, 12),

-- Publication programmée de Mathéo
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 
 'Lancement officiel de Publify', 
 '🎉 Fier de vous annoncer le lancement officiel de Publify !\n\nUne plateforme complète pour gérer vos réseaux sociaux :\n• Publication multi-plateformes\n• Planification intelligente\n• Analytics détaillés\n• Sécurité renforcée\n\nTentez l''expérience gratuite sur publify.site\n\n#Publify #SocialMedia #Startup #Innovation', 
 ARRAY['https://publify.site/media/launch-announcement.mp4'], 
 ARRAY[1, 2, 3], 
 CURRENT_TIMESTAMP - INTERVAL '2 days', 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 CURRENT_TIMESTAMP + INTERVAL '1 day', 
 NULL, 
 'programme', 
 0, 0, 0, 0),

-- Publications de Sarah (marketing)
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 
 'Stratégie marketing B2B 2024', 
 'Les 5 tendances marketing B2B incontournables en 2024 💡\n\n1️⃣ Personnalisation à grande échelle\n2️⃣ Video marketing interactif\n3️⃣ Social selling sur LinkedIn\n4️⃣ Marketing automation intelligent\n5️⃣ Contenu généré par l''IA\n\nQuelle est votre stratégie prioritaire ? 👇\n\n#MarketingB2B #Strategy #LinkedIn #SocialSelling', 
 ARRAY['https://publify.site/media/marketing-trends-2024.jpg'], 
 ARRAY[1, 3], 
 CURRENT_TIMESTAMP - INTERVAL '3 days', 
 CURRENT_TIMESTAMP - INTERVAL '3 days', 
 CURRENT_TIMESTAMP - INTERVAL '3 days', 
 CURRENT_TIMESTAMP - INTERVAL '3 days', 
 'publie', 
 2156, 134, 67, 28),

-- Brouillon de Sarah
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 
 'Campagne Black Friday', 
 'Préparez-vous pour la campagne Black Friday ! 🛍️\n\nNotre équipe marketing a préparé une stratégie complète...\n\n[BROUILLON - À FINALISER]', 
 ARRAY[], 
 ARRAY[1, 3, 4], 
 CURRENT_TIMESTAMP - INTERVAL '1 hour', 
 CURRENT_TIMESTAMP - INTERVAL '30 minutes', 
 NULL, 
 NULL, 
 'brouillon', 
 0, 0, 0, 0),

-- Publications de Pierre (entrepreneur)
((SELECT id FROM utilisateurs WHERE email = 'pierre.dubois@startup.fr'), 
 'Levée de fonds réussie', 
 'Excellente nouvelle ! 🎊\n\nNotre startup vient de boucler sa seed round de 2M€ avec des investisseurs de renom.\n\nCette levée va nous permettre d''accélérer notre développement et d''étoffer notre équipe.\n\nUn grand merci à tous ceux qui nous ont soutenus ! 🙏\n\n#Startup #LevéeDeFonds #Entrepreneuriat #Innovation', 
 ARRAY['https://publify.site/media/funding-announcement.jpg'], 
 ARRAY[1], 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 'publie', 
 856, 45, 12, 8),

-- Publication échouée de Julie
((SELECT id FROM utilisateurs WHERE email = 'julie.bernard@agence.com'), 
 'Retour conférence tech', 
 'Retour sur la conférence TechCrunch Disrupt 2024 ! 🔥\n\nLes sujets qui ont marqué l''événement...\n\n[Publication échouée à cause d''un problème d''API]', 
 ARRAY['https://publify.site/media/techcrunch-2024.jpg'], 
 ARRAY[1, 2], 
 CURRENT_TIMESTAMP - INTERVAL '6 hours', 
 CURRENT_TIMESTAMP - INTERVAL '6 hours', 
 CURRENT_TIMESTAMP - INTERVAL '6 hours', 
 NULL, 
 'echec', 
 0, 0, 0, 0);

-- =================================================================
-- INSERTION DES METRIQUES DE PERFORMANCE
-- =================================================================

INSERT INTO metriques_performance (publication_id, reseau_id, date_mesure, vues, likes, partages, commentaires, taux_engagement, portee_organique, portee_payante) VALUES

-- Métriques pour la publication Next.js de Mathéo
((SELECT id FROM publications WHERE titre = 'Retour d''expérience sur Next.js 15'), 1, CURRENT_TIMESTAMP - INTERVAL '4 days', 1045, 52, 18, 8, 7.42, 1045, 0),
((SELECT id FROM publications WHERE titre = 'Retour d''expérience sur Next.js 15'), 2, CURRENT_TIMESTAMP - INTERVAL '4 days', 200, 15, 5, 4, 12.00, 200, 0),

-- Métriques pour la publication marketing de Sarah
((SELECT id FROM publications WHERE titre = 'Stratégie marketing B2B 2024'), 1, CURRENT_TIMESTAMP - INTERVAL '2 days', 1856, 98, 45, 19, 8.73, 1856, 300),
((SELECT id FROM publications WHERE titre = 'Stratégie marketing B2B 2024'), 3, CURRENT_TIMESTAMP - INTERVAL '2 days', 300, 36, 22, 9, 22.33, 300, 0),

-- Métriques pour la publication startup de Pierre
((SELECT id FROM publications WHERE titre = 'Levée de fonds réussie'), 1, CURRENT_TIMESTAMP - INTERVAL '12 hours', 856, 45, 12, 8, 7.59, 856, 0);

-- =================================================================
-- MISE A JOUR DES DERNIERES CONNEXIONS
-- =================================================================

UPDATE utilisateurs SET 
    date_derniere_connexion = CURRENT_TIMESTAMP - INTERVAL '30 minutes'
WHERE email = 'matheo.beuve@prepavenir.com';

UPDATE utilisateurs SET 
    date_derniere_connexion = CURRENT_TIMESTAMP - INTERVAL '2 hours'
WHERE email = 'sarah.martin@entreprise.com';

UPDATE utilisateurs SET 
    date_derniere_connexion = CURRENT_TIMESTAMP - INTERVAL '1 day'
WHERE email = 'pierre.dubois@startup.fr';

UPDATE utilisateurs SET 
    date_derniere_connexion = CURRENT_TIMESTAMP - INTERVAL '3 hours'
WHERE email = 'julie.bernard@agence.com';

UPDATE utilisateurs SET 
    date_derniere_connexion = CURRENT_TIMESTAMP - INTERVAL '1 week'
WHERE email = 'alex.rousseau@freelance.com';

-- =================================================================
-- VERIFICATION DES DONNEES INSEREES
-- =================================================================

-- Récapitulatif des insertions
SELECT 'Récapitulatif des données insérées :' as titre;

SELECT 
    'Utilisateurs' as table_name,
    COUNT(*) as nombre_lignes,
    COUNT(CASE WHEN statut = 'actif' THEN 1 END) as actifs,
    COUNT(CASE WHEN statut = 'suspendu' THEN 1 END) as suspendus
FROM utilisateurs
UNION ALL
SELECT 
    'Réseaux sociaux' as table_name,
    COUNT(*) as nombre_lignes,
    COUNT(CASE WHEN actif = TRUE THEN 1 END) as actifs,
    COUNT(CASE WHEN actif = FALSE THEN 1 END) as inactifs
FROM reseaux_sociaux
UNION ALL
SELECT 
    'Connexions réseaux' as table_name,
    COUNT(*) as nombre_lignes,
    COUNT(CASE WHEN statut = 'actif' THEN 1 END) as actifs,
    COUNT(CASE WHEN statut = 'expire' THEN 1 END) as expires
FROM connexions_reseaux
UNION ALL
SELECT 
    'Publications' as table_name,
    COUNT(*) as nombre_lignes,
    COUNT(CASE WHEN statut = 'publie' THEN 1 END) as publiees,
    COUNT(CASE WHEN statut = 'brouillon' THEN 1 END) as brouillons
FROM publications
UNION ALL
SELECT 
    'Métriques' as table_name,
    COUNT(*) as nombre_lignes,
    SUM(vues) as total_vues,
    SUM(likes) as total_likes
FROM metriques_performance;

-- Message de confirmation
SELECT 'Données réelles insérées avec succès dans publify_ccp2!' as message;