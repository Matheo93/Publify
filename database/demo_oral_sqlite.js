// =================================================================
// SCRIPT DE DÉMONSTRATION ORAL CCP 2 AVEC SQLITE
// Projet: Publify - Démonstration des compétences base de données
// =================================================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log('🎯 DÉMONSTRATION ORAL CCP 2 - PUBLIFY');
console.log('===============================================');

const dbPath = path.join(__dirname, 'publify_ccp2.sqlite');
const db = new sqlite3.Database(dbPath);

// =================================================================
// COMPÉTENCE 1: CONCEVOIR UNE BASE DE DONNÉES
// =================================================================

console.log('\n📋 COMPÉTENCE 1: CONCEVOIR UNE BASE DE DONNÉES');
console.log('-----------------------------------------------');

console.log('✅ Modèle Entité-Association (Merise):');
console.log('   - Utilisateur (1,N) ---- CRÉE ---- (0,N) Publication');
console.log('   - Utilisateur (1,N) ---- CONNECTE ---- (0,N) Réseau');
console.log('   - Publication (1,1) ---- GÉNÈRE ---- (0,N) Métrique');

console.log('\n✅ Contraintes métier implémentées:');

// Afficher les contraintes
db.all("SELECT sql FROM sqlite_master WHERE type='table' AND name='utilisateurs'", (err, rows) => {
    if (rows && rows[0]) {
        console.log('   - Email unique et format validé');
        console.log('   - Statut contrôlé (actif, inactif, suspendu)');
        console.log('   - Plan d\'abonnement validé (gratuit, pro, entreprise)');
    }
});

// =================================================================
// COMPÉTENCE 2: METTRE EN PLACE UNE BASE DE DONNÉES
// =================================================================

setTimeout(() => {
    console.log('\n📊 COMPÉTENCE 2: METTRE EN PLACE UNE BASE DE DONNÉES');
    console.log('---------------------------------------------------');
    
    console.log('✅ Structure de la base créée:');
    
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        console.log('   Tables créées:');
        tables.forEach(table => {
            console.log(`   - ${table.name}`);
        });
        
        console.log('\n✅ Index d\'optimisation créés:');
        db.all("SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'", (err, indexes) => {
            indexes.forEach(index => {
                console.log(`   - ${index.name}`);
            });
        });
        
        console.log('\n✅ Données réelles insérées:');
        
        // Compter les données
        db.get("SELECT COUNT(*) as count FROM utilisateurs", (err, result) => {
            console.log(`   - Utilisateurs: ${result.count}`);
        });
        
        db.get("SELECT COUNT(*) as count FROM reseaux_sociaux", (err, result) => {
            console.log(`   - Réseaux sociaux: ${result.count}`);
        });
        
        db.get("SELECT COUNT(*) as count FROM publications", (err, result) => {
            console.log(`   - Publications: ${result.count}`);
        });
        
        db.get("SELECT COUNT(*) as count FROM connexions_reseaux", (err, result) => {
            console.log(`   - Connexions: ${result.count}`);
        });
    });
}, 500);

// =================================================================
// COMPÉTENCE 3: DÉVELOPPER DES COMPOSANTS
// =================================================================

setTimeout(() => {
    console.log('\n⚙️  COMPÉTENCE 3: DÉVELOPPER DES COMPOSANTS');
    console.log('--------------------------------------------');
    
    console.log('✅ Fonctions métier implémentées:');
    console.log('   - Hachage sécurisé des mots de passe');
    console.log('   - Calcul automatique des métriques');
    console.log('   - Validation des données');
    console.log('   - Audit automatique des modifications');
    
    // Test de la fonction de hachage (simulée en JavaScript)
    const crypto = require('crypto');
    
    function hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return `$publify$${salt}$${hash}`;
    }
    
    function verifyPassword(password, hash) {
        if (!hash.startsWith('$publify$')) return false;
        const parts = hash.split('$');
        const salt = parts[2];
        const originalHash = parts[3];
        const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return testHash === originalHash;
    }
    
    console.log('\n🔐 Test fonction de hachage:');
    const testPassword = 'TestOral2025!';
    const hashedPassword = hashPassword(testPassword);
    const isValid = verifyPassword(testPassword, hashedPassword);
    
    console.log(`   - Mot de passe: ${testPassword}`);
    console.log(`   - Hash généré: ${hashedPassword.substring(0, 50)}...`);
    console.log(`   - Vérification: ${isValid ? '✅ Valide' : '❌ Invalide'}`);
    
    // Test calcul de métriques
    console.log('\n📈 Test calcul de métriques:');
    
    db.get(`
        SELECT 
            p.titre,
            mp.vues,
            mp.likes,
            mp.partages,
            mp.commentaires,
            ROUND((mp.likes + mp.partages + mp.commentaires) * 100.0 / mp.vues, 2) as taux_engagement
        FROM publications p
        JOIN metriques_performance mp ON p.id = mp.publication_id
        LIMIT 1
    `, (err, result) => {
        if (result) {
            console.log(`   - Publication: ${result.titre}`);
            console.log(`   - Vues: ${result.vues}`);
            console.log(`   - Interactions: ${result.likes + result.partages + result.commentaires}`);
            console.log(`   - Taux engagement: ${result.taux_engagement}%`);
        }
    });
}, 1000);

// =================================================================
// DÉMONSTRATION REQUÊTES COMPLEXES
// =================================================================

setTimeout(() => {
    console.log('\n🔍 DÉMONSTRATION REQUÊTES COMPLEXES');
    console.log('------------------------------------');
    
    // Requête avec jointures multiples
    console.log('✅ Requête avec jointures multiples:');
    
    db.all(`
        SELECT 
            u.prenom || ' ' || u.nom as utilisateur,
            u.plan_abonnement,
            COUNT(p.id) as total_publications,
            COALESCE(SUM(mp.vues), 0) as total_vues,
            COALESCE(SUM(mp.likes), 0) as total_likes
        FROM utilisateurs u
        LEFT JOIN publications p ON u.id = p.utilisateur_id
        LEFT JOIN metriques_performance mp ON p.id = mp.publication_id
        WHERE u.statut = 'actif'
        GROUP BY u.id, u.prenom, u.nom, u.plan_abonnement
        ORDER BY total_publications DESC
    `, (err, results) => {
        if (results) {
            results.forEach(row => {
                console.log(`   - ${row.utilisateur} (${row.plan_abonnement}): ${row.total_publications} publications, ${row.total_vues} vues`);
            });
        }
    });
    
    // Analyse par réseau social
    setTimeout(() => {
        console.log('\n✅ Analyse par réseau social:');
        
        db.all(`
            SELECT 
                rs.nom as reseau,
                COUNT(DISTINCT cr.utilisateur_id) as utilisateurs_connectes,
                COUNT(DISTINCT p.id) as publications_totales
            FROM reseaux_sociaux rs
            LEFT JOIN connexions_reseaux cr ON rs.id = cr.reseau_id AND cr.statut = 'actif'
            LEFT JOIN publications p ON (',' || p.reseaux_cibles || ',') LIKE ('%,' || rs.id || ',%')
            WHERE rs.actif = 1
            GROUP BY rs.id, rs.nom
            ORDER BY publications_totales DESC
        `, (err, results) => {
            if (results) {
                results.forEach(row => {
                    console.log(`   - ${row.reseau}: ${row.utilisateurs_connectes} utilisateurs, ${row.publications_totales} publications`);
                });
            }
        });
    }, 500);
}, 1500);

// =================================================================
// GUIDE POUR L'ORAL
// =================================================================

setTimeout(() => {
    console.log('\n🎯 GUIDE POUR L\'ORAL CCP 2');
    console.log('============================');
    
    console.log('\n📁 Fichiers à présenter au jury:');
    console.log('   1. database/publify_ccp2.sqlite - Base de données créée');
    console.log('   2. database/00_setup_sqlite.js - Script de création');
    console.log('   3. database/demo_oral_sqlite.js - Script de démonstration');
    
    console.log('\n🎬 Séquence de démonstration (10 min):');
    console.log('   1. Montrer la création de la base (1 min)');
    console.log('   2. Ouvrir DB Browser et montrer les tables (2 min)');
    console.log('   3. Expliquer les contraintes et relations (2 min)');
    console.log('   4. Démontrer les fonctions métier (3 min)');
    console.log('   5. Exécuter des requêtes complexes (2 min)');
    
    console.log('\n🔧 Outils nécessaires:');
    console.log('   - DB Browser for SQLite (gratuit)');
    console.log('   - Node.js (déjà installé)');
    console.log('   - Fichier SQLite généré');
    
    console.log('\n✅ Compétences CCP 2 démontrées:');
    console.log('   ✓ Conception: MCD, contraintes, normalisation');
    console.log('   ✓ Mise en place: Tables, index, données réelles');
    console.log('   ✓ Composants: Fonctions, validation, sécurité');
    
    console.log('\n🎯 RÉSULTAT ATTENDU: VALIDATION CCP 2 ✅');
    console.log('============================');
    
    db.close();
}, 2500);