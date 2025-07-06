-- =================================================================
-- SCRIPT D'INITIALISATION COMPLETE DE LA BASE PUBLIFY_CCP2
-- Projet: Publify - Plateforme de gestion multi-réseaux sociaux
-- Auteur: Mathéo Beuve
-- Date: 2025-01-05
-- Objectif: Initialisation complète pour démonstration CCP 2
-- =================================================================

-- Instructions d'exécution:
-- 1. Ouvrir pgAdmin ou psql
-- 2. Se connecter à PostgreSQL en tant que superuser
-- 3. Exécuter ce script complet
-- 4. Vérifier les résultats avec les requêtes de test

\echo '==============================================='
\echo 'INITIALISATION DE LA BASE PUBLIFY_CCP2'
\echo 'CCP 2 - Concevoir et développer la persistance'
\echo '==============================================='

-- Suppression de la base si elle existe déjà
DROP DATABASE IF EXISTS publify_ccp2;

-- Création de la base de données
CREATE DATABASE publify_ccp2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8'
    LC_CTYPE = 'fr_FR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\echo 'Base de données publify_ccp2 créée'

-- Connexion à la nouvelle base
\c publify_ccp2;

\echo 'Connexion à publify_ccp2 établie'

-- Création des extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\echo 'Extensions PostgreSQL activées'

-- =================================================================
-- CREATION DES TABLES
-- =================================================================

\echo 'Création des tables...'

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    avatar_url VARCHAR(500),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_derniere_connexion TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    plan_abonnement VARCHAR(20) DEFAULT 'gratuit' CHECK (plan_abonnement IN ('gratuit', 'pro', 'entreprise')),
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Table des réseaux sociaux
CREATE TABLE reseaux_sociaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE NOT NULL,
    api_endpoint VARCHAR(255),
    limite_caracteres INTEGER,
    formats_media VARCHAR(100)[],
    actif BOOLEAN DEFAULT TRUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des connexions utilisateur-réseau
CREATE TABLE connexions_reseaux (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    reseau_id INTEGER NOT NULL REFERENCES reseaux_sociaux(id),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expire_le TIMESTAMP,
    nom_profil VARCHAR(100),
    id_profil_externe VARCHAR(100),
    date_connexion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'actif' CHECK (statut IN ('actif', 'expire', 'erreur')),
    UNIQUE(utilisateur_id, reseau_id)
);

-- Table des publications
CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    utilisateur_id UUID NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    titre VARCHAR(255),
    contenu TEXT NOT NULL,
    urls_media TEXT[],
    reseaux_cibles INTEGER[] NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_publication_prevue TIMESTAMP,
    date_publication_reelle TIMESTAMP,
    statut VARCHAR(20) DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'programme', 'publie', 'echec', 'annule')),
    nombre_vues INTEGER DEFAULT 0,
    nombre_likes INTEGER DEFAULT 0,
    nombre_partages INTEGER DEFAULT 0,
    nombre_commentaires INTEGER DEFAULT 0,
    CONSTRAINT contenu_non_vide CHECK (LENGTH(TRIM(contenu)) > 0),
    CONSTRAINT reseaux_non_vides CHECK (array_length(reseaux_cibles, 1) > 0)
);

-- Table des logs d'audit
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    utilisateur_id UUID,
    anciennes_donnees JSONB,
    nouvelles_donnees JSONB,
    adresse_ip INET,
    user_agent TEXT,
    timestamp_operation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des métriques de performance
CREATE TABLE metriques_performance (
    id SERIAL PRIMARY KEY,
    publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
    reseau_id INTEGER REFERENCES reseaux_sociaux(id),
    date_mesure TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vues INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    partages INTEGER DEFAULT 0,
    commentaires INTEGER DEFAULT 0,
    taux_engagement DECIMAL(5,2) DEFAULT 0.00,
    portee_organique INTEGER DEFAULT 0,
    portee_payante INTEGER DEFAULT 0
);

\echo 'Tables créées avec succès'

-- =================================================================
-- CREATION DES INDEX
-- =================================================================

\echo 'Création des index d''optimisation...'

-- Index sur les utilisateurs
CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);
CREATE INDEX idx_utilisateurs_statut ON utilisateurs(statut);
CREATE INDEX idx_utilisateurs_plan ON utilisateurs(plan_abonnement);

-- Index sur les publications
CREATE INDEX idx_publications_utilisateur ON publications(utilisateur_id);
CREATE INDEX idx_publications_statut ON publications(statut);
CREATE INDEX idx_publications_date_creation ON publications(date_creation);
CREATE INDEX idx_publications_date_publication ON publications(date_publication_prevue);
CREATE INDEX idx_publications_reseaux ON publications USING GIN(reseaux_cibles);

-- Index sur les connexions
CREATE INDEX idx_connexions_utilisateur ON connexions_reseaux(utilisateur_id);
CREATE INDEX idx_connexions_statut ON connexions_reseaux(statut);

-- Index sur l'audit
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp_operation);

\echo 'Index créés avec succès'

-- =================================================================
-- PROCEDURES STOCKEES
-- =================================================================

\echo 'Création des procédures stockées...'

-- Fonction de hachage sécurisé
CREATE OR REPLACE FUNCTION hash_mot_de_passe(mot_de_passe_clair TEXT) 
RETURNS TEXT AS $$
DECLARE
    salt TEXT;
    mot_de_passe_hash TEXT;
BEGIN
    salt := encode(gen_random_bytes(16), 'hex');
    mot_de_passe_hash := encode(digest(mot_de_passe_clair || salt, 'sha256'), 'hex');
    RETURN '$publify$' || salt || '$' || mot_de_passe_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction de vérification des mots de passe
CREATE OR REPLACE FUNCTION verifier_mot_de_passe(mot_de_passe_clair TEXT, mot_de_passe_hash TEXT) 
RETURNS BOOLEAN AS $$
DECLARE
    salt TEXT;
    hash_attendu TEXT;
    hash_calcule TEXT;
BEGIN
    IF NOT mot_de_passe_hash LIKE '$publify$%' THEN
        RETURN FALSE;
    END IF;
    
    salt := split_part(substring(mot_de_passe_hash from 10), '$', 1);
    hash_attendu := split_part(substring(mot_de_passe_hash from 10), '$', 2);
    hash_calcule := encode(digest(mot_de_passe_clair || salt, 'sha256'), 'hex');
    
    RETURN hash_calcule = hash_attendu;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction de calcul du taux d'engagement
CREATE OR REPLACE FUNCTION calculer_taux_engagement(p_publication_id UUID, p_reseau_id INTEGER) 
RETURNS DECIMAL(5,2) AS $$
DECLARE
    total_interactions INTEGER;
    total_vues INTEGER;
    taux_engagement DECIMAL(5,2);
BEGIN
    SELECT 
        COALESCE(vues, 0),
        COALESCE(likes + partages + commentaires, 0)
    INTO total_vues, total_interactions
    FROM metriques_performance 
    WHERE publication_id = p_publication_id AND reseau_id = p_reseau_id;
    
    IF total_vues > 0 THEN
        taux_engagement := ROUND((total_interactions::DECIMAL / total_vues::DECIMAL) * 100, 2);
    ELSE
        taux_engagement := 0.00;
    END IF;
    
    UPDATE metriques_performance 
    SET taux_engagement = calculer_taux_engagement.taux_engagement
    WHERE publication_id = p_publication_id AND reseau_id = p_reseau_id;
    
    RETURN taux_engagement;
END;
$$ LANGUAGE plpgsql;

-- Fonction de statistiques utilisateur
CREATE OR REPLACE FUNCTION get_stats_utilisateur(p_utilisateur_id UUID) 
RETURNS TABLE(
    total_publications INTEGER,
    publications_publiees INTEGER,
    publications_brouillons INTEGER,
    total_vues INTEGER,
    total_likes INTEGER,
    taux_engagement_moyen DECIMAL(5,2),
    derniere_publication TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(p.id)::INTEGER,
        COUNT(CASE WHEN p.statut = 'publie' THEN 1 END)::INTEGER,
        COUNT(CASE WHEN p.statut = 'brouillon' THEN 1 END)::INTEGER,
        COALESCE(SUM(m.vues), 0)::INTEGER,
        COALESCE(SUM(m.likes), 0)::INTEGER,
        COALESCE(AVG(m.taux_engagement), 0.00)::DECIMAL(5,2),
        MAX(p.date_publication_reelle)
    FROM publications p
    LEFT JOIN metriques_performance m ON p.id = m.publication_id
    WHERE p.utilisateur_id = p_utilisateur_id;
END;
$$ LANGUAGE plpgsql;

\echo 'Procédures stockées créées'

-- =================================================================
-- TRIGGERS
-- =================================================================

\echo 'Création des triggers...'

-- Fonction de trigger pour l'audit
CREATE OR REPLACE FUNCTION audit_trigger_fonction() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, utilisateur_id, nouvelles_donnees, timestamp_operation) 
        VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.utilisateur_id, NULL), row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, utilisateur_id, anciennes_donnees, nouvelles_donnees, timestamp_operation) 
        VALUES (TG_TABLE_NAME, TG_OP, COALESCE(NEW.utilisateur_id, OLD.utilisateur_id), row_to_json(OLD), row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, utilisateur_id, anciennes_donnees, timestamp_operation) 
        VALUES (TG_TABLE_NAME, TG_OP, COALESCE(OLD.utilisateur_id, NULL), row_to_json(OLD), CURRENT_TIMESTAMP);
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Application des triggers d'audit
CREATE TRIGGER audit_utilisateurs_trigger
    AFTER INSERT OR UPDATE OR DELETE ON utilisateurs
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();

CREATE TRIGGER audit_publications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON publications
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();

-- Trigger de mise à jour des timestamps
CREATE OR REPLACE FUNCTION update_timestamp_trigger() RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER publications_update_timestamp
    BEFORE UPDATE ON publications
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_trigger();

\echo 'Triggers créés'

-- =================================================================
-- VUES
-- =================================================================

\echo 'Création des vues...'

-- Vue des utilisateurs actifs avec leurs statistiques
CREATE OR REPLACE VIEW vue_utilisateurs_actifs AS
SELECT 
    u.id, u.email, u.nom, u.prenom, u.plan_abonnement,
    u.date_creation, u.date_derniere_connexion,
    COUNT(p.id) as total_publications,
    COUNT(CASE WHEN p.statut = 'publie' THEN 1 END) as publications_publiees,
    COUNT(cr.id) as reseaux_connectes,
    COALESCE(SUM(mp.vues), 0) as total_vues,
    COALESCE(SUM(mp.likes), 0) as total_likes,
    COALESCE(AVG(mp.taux_engagement), 0) as taux_engagement_moyen
FROM utilisateurs u
LEFT JOIN publications p ON u.id = p.utilisateur_id
LEFT JOIN connexions_reseaux cr ON u.id = cr.utilisateur_id AND cr.statut = 'actif'
LEFT JOIN metriques_performance mp ON p.id = mp.publication_id
WHERE u.statut = 'actif'
GROUP BY u.id, u.email, u.nom, u.prenom, u.plan_abonnement, u.date_creation, u.date_derniere_connexion;

\echo 'Vues créées'

-- =================================================================
-- INSERTION DES DONNEES
-- =================================================================

\echo 'Insertion des données de test...'

-- Réseaux sociaux
INSERT INTO reseaux_sociaux (nom, api_endpoint, limite_caracteres, formats_media, actif) VALUES
('LinkedIn', 'https://api.linkedin.com/v2/', 3000, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE),
('Twitter', 'https://api.twitter.com/2/', 280, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE),
('Facebook', 'https://graph.facebook.com/v18.0/', 63206, ARRAY['image/jpeg', 'image/png', 'video/mp4'], TRUE);

-- Utilisateurs avec mots de passe hashés réels
INSERT INTO utilisateurs (email, mot_de_passe_hash, nom, prenom, plan_abonnement, statut) VALUES
('matheo.beuve@prepavenir.com', hash_mot_de_passe('Password123!'), 'Beuve', 'Mathéo', 'entreprise', 'actif'),
('sarah.martin@entreprise.com', hash_mot_de_passe('MarketingPro2024!'), 'Martin', 'Sarah', 'pro', 'actif'),
('pierre.dubois@startup.fr', hash_mot_de_passe('Content123'), 'Dubois', 'Pierre', 'gratuit', 'actif');

-- Connexions réseaux
INSERT INTO connexions_reseaux (utilisateur_id, reseau_id, access_token, refresh_token, token_expire_le, nom_profil, id_profil_externe, statut) VALUES
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 1, 'linkedin_token_matheo', 'refresh_token', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Mathéo Beuve - Développeur', 'matheo-beuve-dev', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 1, 'linkedin_token_sarah', 'refresh_token', CURRENT_TIMESTAMP + INTERVAL '60 days', 'Sarah Martin - Marketing', 'sarah-martin-marketing', 'actif'),
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 2, 'twitter_token_sarah', 'refresh_token', CURRENT_TIMESTAMP + INTERVAL '30 days', '@sarah_marketing', 'sarah_marketing', 'actif');

-- Publications
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles, date_creation, date_publication_reelle, statut, nombre_vues, nombre_likes) VALUES
((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'), 
 'Lancement de Publify', 
 'Fier de présenter Publify, une plateforme complète de gestion des réseaux sociaux ! 🚀\n\n✅ Publication multi-plateformes\n✅ Planification intelligente\n✅ Analytics détaillés\n\n#Publify #SocialMedia #Innovation',
 ARRAY[1, 2], 
 CURRENT_TIMESTAMP - INTERVAL '2 days', 
 CURRENT_TIMESTAMP - INTERVAL '2 days', 
 'publie', 
 1250, 
 87),
((SELECT id FROM utilisateurs WHERE email = 'sarah.martin@entreprise.com'), 
 'Stratégie marketing 2024', 
 'Les 5 tendances marketing incontournables en 2024 💡\n\n1️⃣ Personnalisation\n2️⃣ Video marketing\n3️⃣ Social selling\n4️⃣ Marketing automation\n5️⃣ IA générative\n\n#Marketing #Strategy #2024',
 ARRAY[1], 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 
 'publie', 
 2300, 
 156);

-- Métriques de performance
INSERT INTO metriques_performance (publication_id, reseau_id, vues, likes, partages, commentaires, portee_organique) VALUES
((SELECT id FROM publications WHERE titre = 'Lancement de Publify'), 1, 1000, 67, 23, 12, 1000),
((SELECT id FROM publications WHERE titre = 'Lancement de Publify'), 2, 250, 20, 8, 4, 250),
((SELECT id FROM publications WHERE titre = 'Stratégie marketing 2024'), 1, 2300, 156, 45, 28, 2300);

\echo 'Données insérées avec succès'

-- =================================================================
-- TESTS ET VERIFICATION
-- =================================================================

\echo '==============================================='
\echo 'VERIFICATION DE L''INSTALLATION'
\echo '==============================================='

-- Test 1: Vérification des tables
\echo 'Test 1: Tables créées'
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Test 2: Vérification des données
\echo 'Test 2: Nombre d''enregistrements par table'
SELECT 
    'utilisateurs' as table_name, COUNT(*) as nombre_lignes FROM utilisateurs
UNION ALL SELECT 
    'reseaux_sociaux' as table_name, COUNT(*) as nombre_lignes FROM reseaux_sociaux
UNION ALL SELECT 
    'publications' as table_name, COUNT(*) as nombre_lignes FROM publications
UNION ALL SELECT 
    'metriques_performance' as table_name, COUNT(*) as nombre_lignes FROM metriques_performance;

-- Test 3: Test des procédures stockées
\echo 'Test 3: Test de la fonction de hachage'
SELECT 'Test hash' as test, verifier_mot_de_passe('Password123!', hash_mot_de_passe('Password123!')) as resultat;

-- Test 4: Test du calcul de métriques
\echo 'Test 4: Calcul automatique des métriques'
SELECT calculer_taux_engagement(
    (SELECT id FROM publications LIMIT 1),
    1
) as taux_engagement_calcule;

-- Test 5: Test des vues
\echo 'Test 5: Vue des utilisateurs actifs'
SELECT email, total_publications, publications_publiees, total_vues 
FROM vue_utilisateurs_actifs;

-- Test 6: Vérification de l'audit
\echo 'Test 6: Logs d''audit générés'
SELECT COUNT(*) as nombre_logs_audit FROM audit_log;

-- Test 7: Test d'une insertion avec trigger
\echo 'Test 7: Test du trigger d''audit'
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles) VALUES 
((SELECT id FROM utilisateurs LIMIT 1), 'Test Audit', 'Contenu test pour vérifier audit', ARRAY[1]);

SELECT 'Audit après insertion:' as info, COUNT(*) as logs_audit FROM audit_log WHERE table_name = 'publications';

-- Test 8: Statistiques utilisateur
\echo 'Test 8: Statistiques utilisateur'
SELECT * FROM get_stats_utilisateur((SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'));

\echo '==============================================='
\echo 'INSTALLATION TERMINEE AVEC SUCCES !'
\echo '==============================================='
\echo 'Base de données: publify_ccp2'
\echo 'Tables créées: 6'
\echo 'Procédures stockées: 4'
\echo 'Triggers: 3'
\echo 'Vues: 1'
\echo 'Données de test: Insérées'
\echo '==============================================='