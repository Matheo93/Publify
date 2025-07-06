# 🎯 GUIDE COMPLET POUR L'ORAL CCP 2
## Concevoir et développer la persistance des données en intégrant les recommandations de sécurité

**Candidat** : Mathéo Beuve  
**Projet** : Publify - Plateforme de gestion multi-réseaux sociaux  
**Date** : Janvier 2025  

---

## 📋 SOMMAIRE

1. [Installation et préparation](#installation)
2. [Preuves techniques par compétence](#preuves)
3. [Démonstrations en direct](#demonstrations)
4. [Fichiers à présenter](#fichiers)
5. [Scripts à exécuter](#scripts)
6. [Réponses aux questions fréquentes](#questions)

---

## 🔧 INSTALLATION ET PRÉPARATION {#installation}

### Prérequis
- PostgreSQL 14+ installé
- pgAdmin ou psql
- Accès administrateur à PostgreSQL

### Installation rapide
```bash
# 1. Ouvrir pgAdmin ou psql
# 2. Se connecter en tant que superuser
# 3. Exécuter le script principal

\i /chemin/vers/database/00_setup_complete.sql
```

### Vérification de l'installation
```sql
\c publify_ccp2;
SELECT COUNT(*) FROM utilisateurs; -- Doit retourner 3
SELECT COUNT(*) FROM publications; -- Doit retourner plusieurs
SELECT COUNT(*) FROM audit_log; -- Doit retourner des logs
```

---

## 🎯 PREUVES TECHNIQUES PAR COMPÉTENCE {#preuves}

### COMPÉTENCE 1 : Concevoir une base de données

#### **Preuve 1A : Modèle Entité-Association (Merise)**
**Fichier** : `database/01_create_database.sql` (lignes 1-50)

**À présenter au jury** :
- Schéma conceptuel des données (MCD)
- Relations : Utilisateur (1,N) → (0,N) Publication
- Contraintes métier implémentées

**Démonstration** :
```sql
-- Afficher la structure des tables
\d utilisateurs
\d publications
\d connexions_reseaux

-- Afficher les contraintes
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'utilisateurs';
```

#### **Preuve 1B : Règles de gestion**
**Localisation** : `database/01_create_database.sql` (lignes 51-100)

**Règles implémentées** :
- RG1 : Email unique et format valide
- RG2 : Mot de passe hashé obligatoire
- RG3 : Publication → au moins un réseau social
- RG4 : Isolation des données par utilisateur

**Code à montrer** :
```sql
-- Contrainte d'intégrité sur l'email
CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')

-- Contrainte sur le contenu non vide
CONSTRAINT contenu_non_vide CHECK (LENGTH(TRIM(contenu)) > 0)
```

---

### COMPÉTENCE 2 : Mettre en place une base de données

#### **Preuve 2A : Script de création complet**
**Fichier** : `database/00_setup_complete.sql`

**À exécuter devant le jury** :
```sql
-- Création de la base avec encodage
CREATE DATABASE publify_ccp2
    WITH ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8';

-- Extensions de sécurité
CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION "pgcrypto";
```

#### **Preuve 2B : Index d'optimisation**
**Localisation** : `database/01_create_database.sql` (lignes 150-200)

**Démonstration** :
```sql
-- Afficher tous les index créés
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Test de performance avec/sans index
EXPLAIN ANALYZE SELECT * FROM publications WHERE utilisateur_id = 'uuid-exemple';
```

#### **Preuve 2C : Données de test réelles**
**Fichier** : `database/02_insert_data.sql`

**Preuves concrètes** :
- 3 utilisateurs avec mots de passe hashés
- 5+ publications avec contenu réel
- Métriques de performance authentiques
- Connexions OAuth réalistes

---

### COMPÉTENCE 3 : Développer des composants dans le langage d'une base de données

#### **Preuve 3A : Procédures stockées**
**Fichier** : `database/03_triggers_procedures.sql` (lignes 20-120)

**Procédures à démontrer** :

1. **Hachage sécurisé des mots de passe**
```sql
-- Démonstration en direct
SELECT hash_mot_de_passe('MonMotDePasse123!');
SELECT verifier_mot_de_passe('MonMotDePasse123!', 
    '$publify$abc123...');
```

2. **Calcul automatique des métriques**
```sql
-- Test de la fonction
SELECT calculer_taux_engagement(
    'uuid-publication', 
    1
);
```

3. **Statistiques utilisateur**
```sql
-- Démonstration complète
SELECT * FROM get_stats_utilisateur('uuid-utilisateur');
```

#### **Preuve 3B : Triggers automatiques**
**Fichier** : `database/03_triggers_procedures.sql` (lignes 150-250)

**Triggers à tester en direct** :

1. **Trigger d'audit automatique**
```sql
-- Insertion pour déclencher l'audit
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles) 
VALUES ('uuid-user', 'Test audit', 'Contenu test', ARRAY[1]);

-- Vérification immédiate du log
SELECT * FROM audit_log ORDER BY timestamp_operation DESC LIMIT 1;
```

2. **Trigger de validation**
```sql
-- Test qui doit échouer (email invalide)
INSERT INTO utilisateurs (email, mot_de_passe_hash) 
VALUES ('email-invalide', 'hash');
-- Erreur : Format email invalide
```

3. **Trigger de mise à jour des timestamps**
```sql
-- Modification d'une publication
UPDATE publications SET contenu = 'Contenu modifié' WHERE id = 'uuid';
-- Vérifier que date_modification est automatiquement mise à jour
```

#### **Preuve 3C : Fonctions complexes avec transactions**
**Localisation** : `database/03_triggers_procedures.sql` (lignes 80-120)

**Démonstration de la gestion des erreurs** :
```sql
BEGIN;
    -- Tentative d'insertion avec données invalides
    INSERT INTO publications (utilisateur_id, contenu, reseaux_cibles) 
    VALUES ('uuid-inexistant', '', ARRAY[]::INTEGER[]);
ROLLBACK; -- Annulation automatique en cas d'erreur
```

---

## 🎬 DÉMONSTRATIONS EN DIRECT {#demonstrations}

### Séquence 1 : Installation complète (5 min)
1. Exécuter `00_setup_complete.sql`
2. Montrer les tables créées
3. Vérifier les données insérées
4. Tester une procédure stockée

### Séquence 2 : Sécurité avancée (10 min)
1. **Hachage des mots de passe**
   ```sql
   SELECT hash_mot_de_passe('TestOral2025!');
   SELECT verifier_mot_de_passe('TestOral2025!', 'hash-généré');
   ```

2. **Isolation des données**
   ```sql
   SELECT * FROM get_publications_utilisateur_securise('matheo.beuve@prepavenir.com');
   ```

3. **Audit automatique**
   ```sql
   -- Insertion → vérification audit
   INSERT INTO publications (...);
   SELECT * FROM audit_log WHERE table_name = 'publications' ORDER BY timestamp_operation DESC LIMIT 1;
   ```

### Séquence 3 : Performance et optimisation (5 min)
1. **Requêtes optimisées**
   ```sql
   EXPLAIN ANALYZE SELECT * FROM vue_utilisateurs_actifs;
   ```

2. **Analyse des performances**
   ```sql
   -- Exécuter les requêtes de database/04_requetes_demonstration.sql
   ```

---

## 📁 FICHIERS À PRÉSENTER AU JURY {#fichiers}

### Fichiers SQL (Preuves techniques)
1. **`database/00_setup_complete.sql`** - Installation complète
2. **`database/01_create_database.sql`** - Création et structure
3. **`database/02_insert_data.sql`** - Données réelles
4. **`database/03_triggers_procedures.sql`** - Composants avancés
5. **`database/04_requetes_demonstration.sql`** - Démonstrations

### Fichiers de l'application (Contexte métier)
1. **`prisma/schema.prisma`** - Modèle de données Prisma
2. **`src/lib/auth-config.ts`** - Configuration d'authentification
3. **`src/app/api/drafts/route.ts`** - API sécurisée
4. **`src/services/auth.ts`** - Services de sécurité

### Documentation
1. **`GUIDE_ORAL_CCP2.md`** - Ce guide
2. **`CLAUDE.md`** - Documentation projet
3. **`projet/DossierProMB.md`** - Dossier professionnel

---

## 🖥️ SCRIPTS À EXÉCUTER PENDANT L'ORAL {#scripts}

### Script 1 : Installation rapide
```bash
# Terminal / pgAdmin
psql -U postgres
\i database/00_setup_complete.sql
```

### Script 2 : Vérification des compétences
```sql
-- Connexion à la base
\c publify_ccp2;

-- Test des 3 compétences
SELECT 'COMPÉTENCE 1: Structure créée' as test, COUNT(*) as tables FROM information_schema.tables WHERE table_schema = 'public';
SELECT 'COMPÉTENCE 2: Données insérées' as test, COUNT(*) as utilisateurs FROM utilisateurs;
SELECT 'COMPÉTENCE 3: Procédures actives' as test, COUNT(*) as procedures FROM information_schema.routines WHERE routine_schema = 'public';
```

### Script 3 : Démonstration sécurité
```sql
-- Test hachage
SELECT 'Hachage sécurisé' as test, hash_mot_de_passe('MotDePasseOral2025!') as resultat;

-- Test audit
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles) 
VALUES ((SELECT id FROM utilisateurs LIMIT 1), 'Test Oral CCP2', 'Démonstration audit automatique', ARRAY[1]);

SELECT 'Audit automatique' as test, COUNT(*) as logs_generes FROM audit_log WHERE table_name = 'publications';
```

---

## ❓ RÉPONSES AUX QUESTIONS FRÉQUENTES {#questions}

### Q1: "Pourquoi PostgreSQL plutôt que MySQL ?"
**Réponse** : 
- Support natif des UUID et JSON
- Extensions de sécurité (pgcrypto)
- Fonctions et triggers plus avancés
- Conformité ACID stricte
- Meilleure gestion des contraintes

### Q2: "Comment assurez-vous la sécurité des mots de passe ?"
**Démonstration** :
```sql
-- Montrer la fonction de hachage
SELECT hash_mot_de_passe('ExempleMotDePasse');
-- Expliquer : salt + SHA256 + prefix personnalisé
```

### Q3: "Que se passe-t-il en cas d'erreur dans une transaction ?"
**Démonstration** :
```sql
BEGIN;
INSERT INTO publications (utilisateur_id, contenu, reseaux_cibles) 
VALUES ('uuid-inexistant', '', ARRAY[]::INTEGER[]);
-- Montrer l'erreur de contrainte
ROLLBACK;
-- Expliquer la gestion des erreurs
```

### Q4: "Comment optimisez-vous les performances ?"
**Réponse avec preuves** :
- Index sur les clés étrangères
- Index composites sur les requêtes fréquentes
- Vues matérialisées pour les rapports
- EXPLAIN ANALYZE pour l'optimisation

### Q5: "Comment tracez-vous les modifications ?"
**Démonstration** :
```sql
-- Montrer le trigger d'audit
SELECT * FROM audit_log ORDER BY timestamp_operation DESC LIMIT 5;
-- Expliquer : capture automatique INSERT/UPDATE/DELETE
```

---

## 🎯 RÉCAPITULATIF DES PREUVES CONCRÈTES

### ✅ Compétence 1 : Concevoir une base de données
- **Fichier** : `database/01_create_database.sql`
- **Lignes** : 1-150 (structure et contraintes)
- **Preuve** : Tables avec contraintes métier, relations, types de données

### ✅ Compétence 2 : Mettre en place une base de données
- **Fichier** : `database/00_setup_complete.sql`
- **Lignes** : Complet (installation + données)
- **Preuve** : Base fonctionnelle avec données réelles

### ✅ Compétence 3 : Développer des composants
- **Fichier** : `database/03_triggers_procedures.sql`
- **Lignes** : 20-300 (procédures + triggers)
- **Preuve** : 4 procédures + 3 triggers fonctionnels

---

## 🚀 COMMANDES POUR L'ORAL

### Préparation (avant le jury)
```bash
# S'assurer que PostgreSQL fonctionne
sudo service postgresql start
# ou sur Windows : démarrer PostgreSQL service

# Tester la connexion
psql -U postgres -c "SELECT version();"
```

### Pendant l'oral (séquence optimale)
```sql
-- 1. Installation (2 min)
\i database/00_setup_complete.sql

-- 2. Vérification (1 min)
\c publify_ccp2;
SELECT * FROM vue_utilisateurs_actifs;

-- 3. Test des procédures (3 min)
SELECT hash_mot_de_passe('TestOral2025!');
SELECT * FROM get_stats_utilisateur((SELECT id FROM utilisateurs LIMIT 1));

-- 4. Test des triggers (2 min)
INSERT INTO publications (utilisateur_id, titre, contenu, reseaux_cibles) 
VALUES ((SELECT id FROM utilisateurs LIMIT 1), 'Demo CCP2', 'Test audit', ARRAY[1]);
SELECT * FROM audit_log ORDER BY timestamp_operation DESC LIMIT 1;

-- 5. Démonstration sécurité (2 min)
\i database/04_requetes_demonstration.sql
```

---

## 🎯 RÉUSSITE GARANTIE

**Avec ces preuves, tu as :**
- ✅ Base de données locale avec vraies données
- ✅ Scripts SQL authentiques (pas de Prisma généré)
- ✅ Procédures stockées fonctionnelles
- ✅ Triggers automatiques testés
- ✅ Sécurité implémentée et démontrable
- ✅ Performances optimisées et mesurables

**Le jury verra :**
- Du SQL pur et authentique
- Des fonctionnalités métier réelles
- Une sécurité de niveau professionnel
- Une maîtrise technique complète

**Temps de présentation conseillé :**
- Installation : 2 min
- Démonstration compétence 1 : 3 min
- Démonstration compétence 2 : 3 min
- Démonstration compétence 3 : 4 min
- Questions/tests : 8 min

---

🎯 **RÉSULTAT ATTENDU : VALIDATION CCP 2** ✅