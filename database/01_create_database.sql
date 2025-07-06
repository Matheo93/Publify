-- =================================================================
-- SCRIPT DE CREATION DE LA BASE DE DONNEES PUBLIFY_CCP2
-- Projet: Publify - Plateforme de gestion multi-réseaux sociaux
-- Auteur: Mathéo Beuve
-- Date: 2025-01-05
-- Objectif: Démonstration CCP 2 - Conception et développement BDD
-- =================================================================

-- Création de la base de données
CREATE DATABASE publify_ccp2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8'
    LC_CTYPE = 'fr_FR.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Connexion à la base
\c publify_ccp2;

-- Création des extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =================================================================
-- CREATION DES TABLES PRINCIPALES
-- =================================================================

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

-- Table des publications (brouillons et publiées)
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

-- =================================================================
-- CREATION DES INDEX POUR L'OPTIMISATION
-- =================================================================

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
CREATE INDEX idx_audit_utilisateur ON audit_log(utilisateur_id);

-- =================================================================
-- COMMENTAIRES POUR LA DOCUMENTATION
-- =================================================================

COMMENT ON DATABASE publify_ccp2 IS 'Base de données du projet Publify pour démonstration CCP 2';

COMMENT ON TABLE utilisateurs IS 'Table principale des utilisateurs de la plateforme';
COMMENT ON COLUMN utilisateurs.mot_de_passe_hash IS 'Mot de passe hashé avec bcrypt (coût 12)';
COMMENT ON COLUMN utilisateurs.plan_abonnement IS 'Plan tarifaire: gratuit, pro, entreprise';

COMMENT ON TABLE reseaux_sociaux IS 'Référentiel des réseaux sociaux supportés';
COMMENT ON COLUMN reseaux_sociaux.limite_caracteres IS 'Limite de caractères par plateforme';

COMMENT ON TABLE publications IS 'Table des publications (brouillons et publiées)';
COMMENT ON COLUMN publications.reseaux_cibles IS 'Array des IDs des réseaux sociaux ciblés';

COMMENT ON TABLE audit_log IS 'Journal d\'audit de toutes les opérations sensibles';
COMMENT ON TABLE metriques_performance IS 'Métriques de performance des publications';

-- =================================================================
-- AFFICHAGE DES TABLES CREEES
-- =================================================================

SELECT 
    schemaname,
    tablename,
    tableowner,
    tablespace
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Affichage des contraintes
SELECT 
    tc.constraint_name,
    tc.table_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- Message de confirmation
SELECT 'Base de données publify_ccp2 créée avec succès!' as message;