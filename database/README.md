# 🗄️ Base de données Publify CCP 2

Démonstration des compétences CCP 2 pour le titre professionnel Concepteur Développeur d'Applications.

## 📁 Structure des fichiers

### Scripts principaux
- **`00_setup_complete.sql`** - Installation complète en un seul script
- **`01_create_database.sql`** - Création de la structure (tables, contraintes, index)
- **`02_insert_data.sql`** - Insertion des données réelles de test
- **`03_triggers_procedures.sql`** - Procédures stockées et triggers
- **`04_requetes_demonstration.sql`** - Requêtes de démonstration pour l'oral

## 🚀 Installation rapide

### Prérequis
- PostgreSQL 14+
- Accès superuser à PostgreSQL

### Installation en une commande
```sql
-- Dans psql ou pgAdmin
\i database/00_setup_complete.sql
```

### Vérification
```sql
\c publify_ccp2;
SELECT COUNT(*) FROM utilisateurs; -- Doit retourner 3
SELECT COUNT(*) FROM publications; -- Doit retourner plusieurs
```

## 🎯 Compétences démontrées

### 1. Concevoir une base de données
- ✅ Modèle entité-association (Merise)
- ✅ Contraintes d'intégrité
- ✅ Règles de gestion métier
- ✅ Normalisation 3NF

### 2. Mettre en place une base de données
- ✅ Script de création complet
- ✅ Index d'optimisation
- ✅ Données de test réalistes
- ✅ Configuration sécurisée

### 3. Développer des composants
- ✅ 4 procédures stockées fonctionnelles
- ✅ 3 triggers automatiques
- ✅ Gestion des transactions
- ✅ Fonctions de sécurité

## 🔐 Sécurité implémentée

### Authentification
- Hachage sécurisé des mots de passe
- Validation des formats (email, etc.)
- Isolation des données par utilisateur

### Audit
- Traçabilité complète des modifications
- Logs automatiques sur toutes les tables sensibles
- Horodatage précis des opérations

### Performance
- Index optimisés sur les requêtes fréquentes
- Requêtes complexes avec window functions
- Analyse des performances avec EXPLAIN

## 📊 Données de test

### Utilisateurs (3)
- Mathéo Beuve (Plan entreprise)
- Sarah Martin (Plan pro) 
- Pierre Dubois (Plan gratuit)

### Publications (5+)
- Contenu réaliste multi-réseaux
- Métriques de performance authentiques
- Statuts variés (brouillon, publié, programmé)

### Réseaux sociaux (3)
- LinkedIn (API complète)
- Twitter (API basique)
- Facebook (Configuration)

## 🖥️ Démonstrations pour l'oral

### Test des procédures
```sql
-- Hachage sécurisé
SELECT hash_mot_de_passe('TestOral2025!');

-- Statistiques utilisateur
SELECT * FROM get_stats_utilisateur('uuid-utilisateur');

-- Calcul de métriques
SELECT calculer_taux_engagement('uuid-publication', 1);
```

### Test des triggers
```sql
-- Audit automatique
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles) 
VALUES ((SELECT id FROM utilisateurs LIMIT 1), 'Test audit', 'Contenu', ARRAY[1]);

-- Vérification du log
SELECT * FROM audit_log ORDER BY timestamp_operation DESC LIMIT 1;
```

### Requêtes complexes
```sql
-- Performance par utilisateur
SELECT * FROM vue_utilisateurs_actifs;

-- Analyse temporelle avec CTE
-- Voir database/04_requetes_demonstration.sql
```

## 📈 Métriques et monitoring

### Tables d'audit
- `audit_log` : Journal complet des modifications
- `metriques_performance` : KPIs des publications

### Vues de synthèse
- `vue_utilisateurs_actifs` : Dashboard utilisateurs
- Requêtes d'analyse métier prêtes à l'emploi

## 🔧 Maintenance

### Nettoyage automatique
```sql
-- Fonction de nettoyage des tokens expirés
SELECT nettoyer_tokens_expires();
```

### Sauvegarde recommandée
```bash
pg_dump publify_ccp2 > backup_publify_ccp2.sql
```

## 📝 Notes pour l'oral

### Points forts à présenter
1. **SQL pur** - Pas de code généré, tout écrit à la main
2. **Sécurité** - Hachage, audit, validation
3. **Performance** - Index optimisés, requêtes efficaces
4. **Métier** - Données réalistes, règles de gestion

### Fichiers clés à montrer
- Structure : `01_create_database.sql`
- Composants : `03_triggers_procedures.sql`
- Démonstrations : `04_requetes_demonstration.sql`

### Tests en direct
- Installation complète en 2 minutes
- Démonstration des triggers
- Test des procédures de sécurité
- Requêtes d'analyse métier

---

🎯 **Cette base de données démontre une maîtrise complète des compétences CCP 2 avec des preuves techniques concrètes et fonctionnelles.**