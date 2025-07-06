-- =================================================================
-- REQUETES DE DEMONSTRATION POUR L'ORAL CCP 2
-- Projet: Publify - Plateforme de gestion multi-réseaux sociaux
-- Auteur: Mathéo Beuve
-- Date: 2025-01-05
-- Objectif: Requêtes de démonstration des compétences CCP 2
-- =================================================================

-- IMPORTANT: Ces requêtes sont à présenter lors de l'oral
-- Elles démontrent la maîtrise des compétences du CCP 2

\c publify_ccp2;

\echo '==============================================='
\echo 'REQUETES DE DEMONSTRATION CCP 2'
\echo 'Concevoir et développer la persistance des données'
\echo '==============================================='

-- =================================================================
-- 1. REQUETES DE BASE DE DONNEES AVANCEES
-- =================================================================

\echo '1. DEMONSTRATION DES REQUETES COMPLEXES'
\echo '----------------------------------------'

-- Requête 1: Jointures multiples avec agrégation
\echo 'Requête 1: Top 3 des utilisateurs les plus actifs avec leurs performances'
SELECT 
    u.prenom || ' ' || u.nom as utilisateur,
    u.email,
    u.plan_abonnement,
    COUNT(p.id) as total_publications,
    COUNT(CASE WHEN p.statut = 'publie' THEN 1 END) as publiees,
    COALESCE(SUM(mp.vues), 0) as total_vues,
    COALESCE(SUM(mp.likes), 0) as total_likes,
    COALESCE(AVG(mp.taux_engagement), 0)::DECIMAL(5,2) as engagement_moyen,
    COUNT(DISTINCT cr.reseau_id) as reseaux_connectes
FROM utilisateurs u
LEFT JOIN publications p ON u.id = p.utilisateur_id
LEFT JOIN metriques_performance mp ON p.id = mp.publication_id
LEFT JOIN connexions_reseaux cr ON u.id = cr.utilisateur_id AND cr.statut = 'actif'
WHERE u.statut = 'actif'
GROUP BY u.id, u.prenom, u.nom, u.email, u.plan_abonnement
ORDER BY total_publications DESC, total_vues DESC
LIMIT 3;

-- Requête 2: Sous-requête corrélée avec window function
\echo 'Requête 2: Publications avec classement par performance dans chaque réseau'
SELECT 
    p.titre,
    rs.nom as reseau,
    mp.vues,
    mp.likes,
    mp.taux_engagement,
    RANK() OVER (PARTITION BY rs.nom ORDER BY mp.taux_engagement DESC) as rang_engagement,
    PERCENT_RANK() OVER (PARTITION BY rs.nom ORDER BY mp.vues DESC) as percentile_vues
FROM publications p
JOIN metriques_performance mp ON p.id = mp.publication_id
JOIN reseaux_sociaux rs ON mp.reseau_id = rs.id
WHERE p.statut = 'publie'
ORDER BY rs.nom, rang_engagement;

-- Requête 3: CTE (Common Table Expression) avec analyse temporelle
\echo 'Requête 3: Évolution des performances par mois'
WITH performances_mensuelles AS (
    SELECT 
        DATE_TRUNC('month', p.date_publication_reelle) as mois,
        COUNT(p.id) as nb_publications,
        SUM(mp.vues) as total_vues,
        SUM(mp.likes) as total_likes,
        AVG(mp.taux_engagement) as engagement_moyen
    FROM publications p
    JOIN metriques_performance mp ON p.id = mp.publication_id
    WHERE p.statut = 'publie' 
    AND p.date_publication_reelle >= CURRENT_DATE - INTERVAL '6 months'
    GROUP BY DATE_TRUNC('month', p.date_publication_reelle)
)
SELECT 
    TO_CHAR(mois, 'YYYY-MM') as periode,
    nb_publications,
    total_vues,
    total_likes,
    ROUND(engagement_moyen::NUMERIC, 2) as engagement_moyen,
    LAG(total_vues) OVER (ORDER BY mois) as vues_mois_precedent,
    CASE 
        WHEN LAG(total_vues) OVER (ORDER BY mois) > 0 THEN
            ROUND(((total_vues - LAG(total_vues) OVER (ORDER BY mois))::DECIMAL / 
                   LAG(total_vues) OVER (ORDER BY mois) * 100), 2)
        ELSE NULL
    END as evolution_vues_percent
FROM performances_mensuelles
ORDER BY mois;

-- =================================================================
-- 2. DEMONSTRATION DES PROCEDURES STOCKEES
-- =================================================================

\echo '2. DEMONSTRATION DES PROCEDURES STOCKEES'
\echo '-----------------------------------------'

-- Test de la procédure de hachage
\echo 'Test de la procédure de hachage sécurisé:'
SELECT 
    'TestPassword123!' as mot_de_passe_original,
    hash_mot_de_passe('TestPassword123!') as mot_de_passe_hash,
    verifier_mot_de_passe('TestPassword123!', hash_mot_de_passe('TestPassword123!')) as verification_reussie;

-- Test de la procédure de calcul de métriques
\echo 'Test du calcul automatique de métriques:'
SELECT 
    p.titre,
    mp.vues,
    mp.likes + mp.partages + mp.commentaires as interactions,
    mp.taux_engagement as ancien_taux,
    calculer_taux_engagement(p.id, mp.reseau_id) as nouveau_taux_calcule
FROM publications p
JOIN metriques_performance mp ON p.id = mp.publication_id
WHERE p.statut = 'publie'
LIMIT 3;

-- Test de la procédure de statistiques utilisateur
\echo 'Test des statistiques utilisateur détaillées:'
SELECT 
    u.prenom || ' ' || u.nom as utilisateur,
    s.*
FROM utilisateurs u
CROSS JOIN LATERAL get_stats_utilisateur(u.id) s
WHERE u.statut = 'actif'
ORDER BY s.total_publications DESC;

-- =================================================================
-- 3. DEMONSTRATION DES TRIGGERS
-- =================================================================

\echo '3. DEMONSTRATION DES TRIGGERS'
\echo '------------------------------'

-- Insertion pour tester le trigger d'audit
\echo 'Test du trigger d''audit - Insertion d''une nouvelle publication:'
INSERT INTO publications (
    utilisateur_id, 
    titre, 
    contenu, 
    reseaux_cibles
) VALUES (
    (SELECT id FROM utilisateurs WHERE email = 'matheo.beuve@prepavenir.com'),
    'Publication test trigger',
    'Contenu de test pour démontrer le fonctionnement du trigger d''audit automatique.',
    ARRAY[1, 2]
) RETURNING id, titre, 'Inséré avec succès' as statut;

-- Vérification de l'audit généré
\echo 'Vérification du log d''audit généré:'
SELECT 
    al.table_name,
    al.operation,
    al.timestamp_operation,
    al.nouvelles_donnees->>'titre' as titre_publication,
    al.nouvelles_donnees->>'statut' as statut_publication
FROM audit_log al
WHERE al.table_name = 'publications'
ORDER BY al.timestamp_operation DESC
LIMIT 1;

-- Test du trigger de mise à jour
\echo 'Test du trigger de mise à jour automatique des timestamps:'
UPDATE publications 
SET contenu = contenu || ' [MODIFIÉ]'
WHERE titre = 'Publication test trigger'
RETURNING titre, date_creation, date_modification, 'Timestamp mis à jour' as statut;

-- =================================================================
-- 4. REQUETES DE SECURITE ET PERFORMANCE
-- =================================================================

\echo '4. DEMONSTRATION DE LA SECURITE'
\echo '--------------------------------'

-- Requête sécurisée avec isolation par utilisateur
\echo 'Requête sécurisée - Publications d''un utilisateur spécifique:'
CREATE OR REPLACE FUNCTION get_publications_utilisateur_securise(p_email TEXT)
RETURNS TABLE(
    id UUID,
    titre VARCHAR(255),
    contenu TEXT,
    statut VARCHAR(20),
    date_creation TIMESTAMP,
    total_vues BIGINT
) SECURITY DEFINER AS $$
BEGIN
    -- Vérification de l'existence de l'utilisateur
    IF NOT EXISTS (SELECT 1 FROM utilisateurs WHERE email = p_email AND statut = 'actif') THEN
        RAISE EXCEPTION 'Utilisateur non trouvé ou inactif';
    END IF;
    
    -- Retour des publications avec isolation de sécurité
    RETURN QUERY
    SELECT 
        p.id,
        p.titre,
        p.contenu,
        p.statut,
        p.date_creation,
        COALESCE(SUM(mp.vues), 0) as total_vues
    FROM publications p
    LEFT JOIN metriques_performance mp ON p.id = mp.publication_id
    WHERE p.utilisateur_id = (SELECT u.id FROM utilisateurs u WHERE u.email = p_email)
    GROUP BY p.id, p.titre, p.contenu, p.statut, p.date_creation
    ORDER BY p.date_creation DESC;
END;
$$ LANGUAGE plpgsql;

-- Test de la fonction sécurisée
SELECT * FROM get_publications_utilisateur_securise('matheo.beuve@prepavenir.com');

-- =================================================================
-- 5. REQUETES D'ANALYSE METIER
-- =================================================================

\echo '5. REQUETES D''ANALYSE METIER'
\echo '-----------------------------'

-- Analyse des performances par réseau social
\echo 'Analyse des performances par réseau social:'
SELECT 
    rs.nom as reseau_social,
    COUNT(DISTINCT cr.utilisateur_id) as utilisateurs_connectes,
    COUNT(DISTINCT p.id) as total_publications,
    COALESCE(AVG(mp.vues), 0)::INTEGER as vues_moyennes,
    COALESCE(AVG(mp.taux_engagement), 0)::DECIMAL(5,2) as engagement_moyen,
    CASE 
        WHEN COUNT(DISTINCT p.id) > 0 THEN
            ROUND((COUNT(CASE WHEN p.statut = 'publie' THEN 1 END)::DECIMAL / 
                   COUNT(DISTINCT p.id) * 100), 2)
        ELSE 0
    END as taux_reussite_publication
FROM reseaux_sociaux rs
LEFT JOIN connexions_reseaux cr ON rs.id = cr.reseau_id AND cr.statut = 'actif'
LEFT JOIN publications p ON rs.id = ANY(p.reseaux_cibles)
LEFT JOIN metriques_performance mp ON p.id = mp.publication_id AND rs.id = mp.reseau_id
WHERE rs.actif = TRUE
GROUP BY rs.id, rs.nom
ORDER BY engagement_moyen DESC;

-- Analyse de la rétention utilisateur
\echo 'Analyse de la rétention et activité utilisateur:'
SELECT 
    u.plan_abonnement,
    COUNT(*) as nombre_utilisateurs,
    COUNT(CASE WHEN u.date_derniere_connexion >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as actifs_7j,
    COUNT(CASE WHEN u.date_derniere_connexion >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as actifs_30j,
    ROUND(
        COUNT(CASE WHEN u.date_derniere_connexion >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END)::DECIMAL / 
        COUNT(*)::DECIMAL * 100, 2
    ) as taux_retention_7j,
    AVG(
        EXTRACT(DAY FROM CURRENT_TIMESTAMP - u.date_derniere_connexion)
    )::INTEGER as jours_moyenne_inactivite
FROM utilisateurs u
WHERE u.statut = 'actif'
GROUP BY u.plan_abonnement
ORDER BY taux_retention_7j DESC;

-- =================================================================
-- 6. REQUETES DE MONITORING ET AUDIT
-- =================================================================

\echo '6. MONITORING ET AUDIT'
\echo '----------------------'

-- Analyse des logs d'audit
\echo 'Analyse des activités dans les logs d''audit:'
SELECT 
    table_name,
    operation,
    COUNT(*) as nombre_operations,
    MIN(timestamp_operation) as premiere_operation,
    MAX(timestamp_operation) as derniere_operation
FROM audit_log
WHERE timestamp_operation >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY table_name, operation
ORDER BY table_name, operation;

-- Détection d'anomalies dans l'utilisation
\echo 'Détection d''anomalies dans l''utilisation:'
WITH stats_utilisateurs AS (
    SELECT 
        u.id,
        u.email,
        u.plan_abonnement,
        COUNT(p.id) as nb_publications_total,
        COUNT(CASE WHEN p.date_creation >= CURRENT_DATE - INTERVAL '24 hours' THEN 1 END) as publications_24h,
        COUNT(al.id) as activites_audit_24h
    FROM utilisateurs u
    LEFT JOIN publications p ON u.id = p.utilisateur_id
    LEFT JOIN audit_log al ON u.id = al.utilisateur_id 
        AND al.timestamp_operation >= CURRENT_DATE - INTERVAL '24 hours'
    WHERE u.statut = 'actif'
    GROUP BY u.id, u.email, u.plan_abonnement
)
SELECT 
    email,
    plan_abonnement,
    publications_24h,
    activites_audit_24h,
    CASE 
        WHEN plan_abonnement = 'gratuit' AND publications_24h > 5 THEN 'Dépassement limite gratuit'
        WHEN activites_audit_24h > 100 THEN 'Activité suspecte'
        WHEN publications_24h = 0 AND activites_audit_24h = 0 THEN 'Utilisateur inactif'
        ELSE 'Normal'
    END as statut_anomalie
FROM stats_utilisateurs
WHERE (plan_abonnement = 'gratuit' AND publications_24h > 5)
   OR activites_audit_24h > 100
   OR (publications_24h = 0 AND activites_audit_24h = 0)
ORDER BY activites_audit_24h DESC;

-- =================================================================
-- 7. TESTS DE PERFORMANCE
-- =================================================================

\echo '7. TESTS DE PERFORMANCE'
\echo '-----------------------'

-- Test de performance avec EXPLAIN ANALYZE
\echo 'Analyse de performance - Requête complexe avec jointures:'
EXPLAIN (ANALYZE, BUFFERS) 
SELECT 
    u.email,
    COUNT(p.id) as publications,
    SUM(mp.vues) as total_vues
FROM utilisateurs u
JOIN publications p ON u.id = p.utilisateur_id
JOIN metriques_performance mp ON p.id = mp.publication_id
WHERE u.statut = 'actif' 
AND p.statut = 'publie'
GROUP BY u.id, u.email
ORDER BY total_vues DESC;

-- Statistiques de la base de données
\echo 'Statistiques de la base de données:'
SELECT 
    schemaname,
    tablename,
    n_tup_ins as insertions,
    n_tup_upd as mises_a_jour,
    n_tup_del as suppressions,
    n_live_tup as lignes_actives,
    n_dead_tup as lignes_mortes,
    last_vacuum,
    last_analyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

\echo '==============================================='
\echo 'DEMONSTRATION TERMINEE'
\echo '==============================================='
\echo 'Compétences CCP 2 démontrées:'
\echo '✓ Conception de base de données (MCD, contraintes)'
\echo '✓ Mise en place de base de données (tables, index, données)'
\echo '✓ Développement de composants (procédures, triggers, fonctions)'
\echo '✓ Sécurité intégrée (hachage, audit, isolation)'
\echo '✓ Performance optimisée (index, requêtes complexes)'
\echo '==============================================='