-- =================================================================
-- PROCEDURES STOCKEES ET TRIGGERS AVANCES
-- Projet: Publify - Plateforme de gestion multi-réseaux sociaux
-- Auteur: Mathéo Beuve
-- Date: 2025-01-05
-- Objectif: Démonstration CCP 2 - Composants base de données
-- =================================================================

-- Connexion à la base
\c publify_ccp2;

-- =================================================================
-- PROCEDURES STOCKEES
-- =================================================================

-- 1. PROCEDURE DE HACHAGE SECURISE DES MOTS DE PASSE
CREATE OR REPLACE FUNCTION hash_mot_de_passe(
    mot_de_passe_clair TEXT
) RETURNS TEXT AS $$
DECLARE
    salt TEXT;
    mot_de_passe_hash TEXT;
BEGIN
    -- Génération d'un salt aléatoire
    salt := encode(gen_random_bytes(16), 'hex');
    
    -- Hachage avec salt (simulation bcrypt)
    mot_de_passe_hash := encode(
        digest(mot_de_passe_clair || salt, 'sha256'), 
        'hex'
    );
    
    -- Retour du hash avec le salt
    RETURN '$publify$' || salt || '$' || mot_de_passe_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Test de la fonction
SELECT hash_mot_de_passe('TestPassword123!') as exemple_hash;

-- 2. PROCEDURE DE VERIFICATION DES MOTS DE PASSE
CREATE OR REPLACE FUNCTION verifier_mot_de_passe(
    mot_de_passe_clair TEXT,
    mot_de_passe_hash TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    salt TEXT;
    hash_attendu TEXT;
    hash_calcule TEXT;
BEGIN
    -- Extraction du salt et du hash
    IF NOT mot_de_passe_hash LIKE '$publify$%' THEN
        RETURN FALSE;
    END IF;
    
    salt := split_part(substring(mot_de_passe_hash from 10), '$', 1);
    hash_attendu := split_part(substring(mot_de_passe_hash from 10), '$', 2);
    
    -- Calcul du hash avec le salt
    hash_calcule := encode(
        digest(mot_de_passe_clair || salt, 'sha256'), 
        'hex'
    );
    
    -- Comparaison sécurisée
    RETURN hash_calcule = hash_attendu;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. PROCEDURE DE CALCUL DES METRIQUES D'ENGAGEMENT
CREATE OR REPLACE FUNCTION calculer_taux_engagement(
    p_publication_id UUID,
    p_reseau_id INTEGER
) RETURNS DECIMAL(5,2) AS $$
DECLARE
    total_interactions INTEGER;
    total_vues INTEGER;
    taux_engagement DECIMAL(5,2);
BEGIN
    -- Récupération des métriques
    SELECT 
        COALESCE(vues, 0),
        COALESCE(likes + partages + commentaires, 0)
    INTO total_vues, total_interactions
    FROM metriques_performance 
    WHERE publication_id = p_publication_id 
    AND reseau_id = p_reseau_id;
    
    -- Calcul du taux d'engagement
    IF total_vues > 0 THEN
        taux_engagement := ROUND((total_interactions::DECIMAL / total_vues::DECIMAL) * 100, 2);
    ELSE
        taux_engagement := 0.00;
    END IF;
    
    -- Mise à jour automatique
    UPDATE metriques_performance 
    SET taux_engagement = calculer_taux_engagement.taux_engagement
    WHERE publication_id = p_publication_id 
    AND reseau_id = p_reseau_id;
    
    RETURN taux_engagement;
END;
$$ LANGUAGE plpgsql;

-- 4. PROCEDURE DE NETTOYAGE DES TOKENS EXPIRES
CREATE OR REPLACE FUNCTION nettoyer_tokens_expires()
RETURNS INTEGER AS $$
DECLARE
    nb_tokens_nettoyes INTEGER;
BEGIN
    -- Mise à jour du statut des tokens expirés
    UPDATE connexions_reseaux 
    SET statut = 'expire'
    WHERE token_expire_le < CURRENT_TIMESTAMP 
    AND statut = 'actif';
    
    GET DIAGNOSTICS nb_tokens_nettoyes = ROW_COUNT;
    
    -- Log de l'opération
    INSERT INTO audit_log (
        table_name, 
        operation, 
        nouvelles_donnees, 
        timestamp_operation
    ) VALUES (
        'connexions_reseaux',
        'UPDATE',
        json_build_object(
            'tokens_expires', nb_tokens_nettoyes,
            'action', 'nettoyage_automatique'
        ),
        CURRENT_TIMESTAMP
    );
    
    RETURN nb_tokens_nettoyes;
END;
$$ LANGUAGE plpgsql;

-- 5. PROCEDURE DE STATISTIQUES UTILISATEUR
CREATE OR REPLACE FUNCTION get_stats_utilisateur(
    p_utilisateur_id UUID
) RETURNS TABLE(
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
        COUNT(p.id)::INTEGER as total_publications,
        COUNT(CASE WHEN p.statut = 'publie' THEN 1 END)::INTEGER as publications_publiees,
        COUNT(CASE WHEN p.statut = 'brouillon' THEN 1 END)::INTEGER as publications_brouillons,
        COALESCE(SUM(m.vues), 0)::INTEGER as total_vues,
        COALESCE(SUM(m.likes), 0)::INTEGER as total_likes,
        COALESCE(AVG(m.taux_engagement), 0.00)::DECIMAL(5,2) as taux_engagement_moyen,
        MAX(p.date_publication_reelle) as derniere_publication
    FROM publications p
    LEFT JOIN metriques_performance m ON p.id = m.publication_id
    WHERE p.utilisateur_id = p_utilisateur_id;
END;
$$ LANGUAGE plpgsql;

-- =================================================================
-- TRIGGERS DE SECURITE ET D'AUDIT
-- =================================================================

-- 1. TRIGGER POUR L'AUDIT DES MODIFICATIONS
CREATE OR REPLACE FUNCTION audit_trigger_fonction()
RETURNS TRIGGER AS $$
BEGIN
    -- Audit pour INSERT
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (
            table_name,
            operation,
            utilisateur_id,
            nouvelles_donnees,
            timestamp_operation
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            COALESCE(NEW.utilisateur_id, NULL),
            row_to_json(NEW),
            CURRENT_TIMESTAMP
        );
        RETURN NEW;
    END IF;
    
    -- Audit pour UPDATE
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (
            table_name,
            operation,
            utilisateur_id,
            anciennes_donnees,
            nouvelles_donnees,
            timestamp_operation
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            COALESCE(NEW.utilisateur_id, OLD.utilisateur_id),
            row_to_json(OLD),
            row_to_json(NEW),
            CURRENT_TIMESTAMP
        );
        RETURN NEW;
    END IF;
    
    -- Audit pour DELETE
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (
            table_name,
            operation,
            utilisateur_id,
            anciennes_donnees,
            timestamp_operation
        ) VALUES (
            TG_TABLE_NAME,
            TG_OP,
            COALESCE(OLD.utilisateur_id, NULL),
            row_to_json(OLD),
            CURRENT_TIMESTAMP
        );
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Application du trigger d'audit sur les tables sensibles
CREATE TRIGGER audit_utilisateurs_trigger
    AFTER INSERT OR UPDATE OR DELETE ON utilisateurs
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();

CREATE TRIGGER audit_publications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON publications
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();

CREATE TRIGGER audit_connexions_trigger
    AFTER INSERT OR UPDATE OR DELETE ON connexions_reseaux
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();

-- 2. TRIGGER DE MISE A JOUR AUTOMATIQUE DES TIMESTAMPS
CREATE OR REPLACE FUNCTION update_timestamp_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER publications_update_timestamp
    BEFORE UPDATE ON publications
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_trigger();

-- 3. TRIGGER DE VALIDATION DES DONNEES
CREATE OR REPLACE FUNCTION validation_donnees_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Validation pour les utilisateurs
    IF TG_TABLE_NAME = 'utilisateurs' THEN
        -- Vérification format email
        IF NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
            RAISE EXCEPTION 'Format email invalide: %', NEW.email;
        END IF;
        
        -- Vérification longueur mot de passe hashé
        IF LENGTH(NEW.mot_de_passe_hash) < 20 THEN
            RAISE EXCEPTION 'Mot de passe hash trop court';
        END IF;
    END IF;
    
    -- Validation pour les publications
    IF TG_TABLE_NAME = 'publications' THEN
        -- Vérification contenu non vide
        IF LENGTH(TRIM(NEW.contenu)) = 0 THEN
            RAISE EXCEPTION 'Le contenu de la publication ne peut pas être vide';
        END IF;
        
        -- Vérification au moins un réseau sélectionné
        IF array_length(NEW.reseaux_cibles, 1) IS NULL OR array_length(NEW.reseaux_cibles, 1) = 0 THEN
            RAISE EXCEPTION 'Au moins un réseau social doit être sélectionné';
        END IF;
        
        -- Vérification limite de caractères selon le réseau
        IF 2 = ANY(NEW.reseaux_cibles) AND LENGTH(NEW.contenu) > 280 THEN
            RAISE EXCEPTION 'Contenu trop long pour Twitter (max 280 caractères)';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validation_utilisateurs_trigger
    BEFORE INSERT OR UPDATE ON utilisateurs
    FOR EACH ROW EXECUTE FUNCTION validation_donnees_trigger();

CREATE TRIGGER validation_publications_trigger
    BEFORE INSERT OR UPDATE ON publications
    FOR EACH ROW EXECUTE FUNCTION validation_donnees_trigger();

-- 4. TRIGGER DE CALCUL AUTOMATIQUE DES METRIQUES
CREATE OR REPLACE FUNCTION calcul_automatique_metriques()
RETURNS TRIGGER AS $$
BEGIN
    -- Calcul automatique du taux d'engagement
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        NEW.taux_engagement := calculer_taux_engagement(NEW.publication_id, NEW.reseau_id);
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER metriques_calcul_trigger
    BEFORE INSERT OR UPDATE ON metriques_performance
    FOR EACH ROW EXECUTE FUNCTION calcul_automatique_metriques();

-- =================================================================
-- VUES COMPLEXES POUR LES RAPPORTS
-- =================================================================

-- 1. Vue des utilisateurs actifs avec leurs statistiques
CREATE OR REPLACE VIEW vue_utilisateurs_actifs AS
SELECT 
    u.id,
    u.email,
    u.nom,
    u.prenom,
    u.plan_abonnement,
    u.date_creation,
    u.date_derniere_connexion,
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
GROUP BY u.id, u.email, u.nom, u.prenom, u.plan_abonnement, u.date_creation, u.date_derniere_connexion
ORDER BY total_publications DESC;

-- 2. Vue des publications avec performance
CREATE OR REPLACE VIEW vue_publications_performance AS
SELECT 
    p.id,
    p.titre,
    p.contenu,
    u.nom || ' ' || u.prenom as auteur,
    u.email as email_auteur,
    p.statut,
    p.date_creation,
    p.date_publication_reelle,
    array_agg(rs.nom ORDER BY rs.nom) as reseaux_sociaux,
    COALESCE(SUM(mp.vues), 0) as total_vues,
    COALESCE(SUM(mp.likes), 0) as total_likes,
    COALESCE(SUM(mp.partages), 0) as total_partages,
    COALESCE(SUM(mp.commentaires), 0) as total_commentaires,
    COALESCE(AVG(mp.taux_engagement), 0) as taux_engagement_moyen
FROM publications p
JOIN utilisateurs u ON p.utilisateur_id = u.id
LEFT JOIN unnest(p.reseaux_cibles) as reseau_id ON true
LEFT JOIN reseaux_sociaux rs ON rs.id = reseau_id
LEFT JOIN metriques_performance mp ON p.id = mp.publication_id
GROUP BY p.id, p.titre, p.contenu, u.nom, u.prenom, u.email, p.statut, p.date_creation, p.date_publication_reelle
ORDER BY p.date_creation DESC;

-- 3. Vue de synthèse par réseau social
CREATE OR REPLACE VIEW vue_synthese_reseaux AS
SELECT 
    rs.nom as reseau_social,
    COUNT(DISTINCT cr.utilisateur_id) as utilisateurs_connectes,
    COUNT(DISTINCT p.id) as total_publications,
    COALESCE(SUM(mp.vues), 0) as total_vues,
    COALESCE(SUM(mp.likes), 0) as total_likes,
    COALESCE(AVG(mp.taux_engagement), 0) as taux_engagement_moyen,
    COUNT(CASE WHEN cr.statut = 'expire' THEN 1 END) as tokens_expires
FROM reseaux_sociaux rs
LEFT JOIN connexions_reseaux cr ON rs.id = cr.reseau_id
LEFT JOIN publications p ON rs.id = ANY(p.reseaux_cibles) AND p.statut = 'publie'
LEFT JOIN metriques_performance mp ON p.id = mp.publication_id AND rs.id = mp.reseau_id
WHERE rs.actif = TRUE
GROUP BY rs.id, rs.nom
ORDER BY total_publications DESC;

-- =================================================================
-- TESTS DES PROCEDURES ET TRIGGERS
-- =================================================================

-- Test de la procédure de hachage
SELECT 'Test de hachage de mot de passe:' as test;
SELECT verifier_mot_de_passe('TestPassword123!', hash_mot_de_passe('TestPassword123!')) as test_hash_verification;

-- Test de calcul des métriques
SELECT 'Test de calcul de métriques:' as test;
SELECT calculer_taux_engagement(
    (SELECT id FROM publications WHERE titre LIKE '%Next.js%' LIMIT 1),
    1
) as taux_engagement_calcule;

-- Test de nettoyage des tokens
SELECT 'Test de nettoyage des tokens:' as test;
SELECT nettoyer_tokens_expires() as tokens_nettoyes;

-- Test des statistiques utilisateur
SELECT 'Test des statistiques utilisateur:' as test;
SELECT * FROM get_stats_utilisateur(
    (SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com')
);

-- Test d'insertion avec trigger (doit générer un audit)
INSERT INTO publications (
    utilisateur_id, 
    titre, 
    contenu, 
    reseaux_cibles
) VALUES (
    (SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'),
    'Test trigger audit',
    'Contenu de test pour vérifier le déclenchement du trigger d''audit.',
    ARRAY[1]
);

-- Vérification de l'audit généré
SELECT 'Audit généré par le trigger:' as verification;
SELECT 
    table_name,
    operation,
    timestamp_operation,
    nouvelles_donnees->>'titre' as titre_publication
FROM audit_log 
WHERE table_name = 'publications' 
ORDER BY timestamp_operation DESC 
LIMIT 1;

-- =================================================================
-- AFFICHAGE DES VUES POUR VERIFICATION
-- =================================================================

SELECT 'Vue des utilisateurs actifs:' as titre;
SELECT * FROM vue_utilisateurs_actifs LIMIT 3;

SELECT 'Vue des publications avec performance:' as titre;
SELECT titre, auteur, statut, total_vues, taux_engagement_moyen 
FROM vue_publications_performance 
LIMIT 3;

SELECT 'Vue de synthèse par réseau:' as titre;
SELECT * FROM vue_synthese_reseaux;

-- Message de confirmation
SELECT 'Triggers et procédures stockées implémentés avec succès!' as message;