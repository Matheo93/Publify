// =================================================================
// SCRIPT D'INSTALLATION SQLITE POUR CCP 2
// Alternative rapide à PostgreSQL pour démonstration
// =================================================================

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

console.log('===============================================');
console.log('CRÉATION BASE DE DONNÉES SQLITE POUR CCP 2');
console.log('===============================================');

// Créer la base de données SQLite
const dbPath = path.join(__dirname, 'publify_ccp2.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('📁 Base de données créée :', dbPath);

// Script SQL adapté pour SQLite
const createTables = `
-- =================================================================
-- CRÉATION DES TABLES POUR DÉMONSTRATION CCP 2
-- =================================================================

-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
    email TEXT UNIQUE NOT NULL,
    mot_de_passe_hash TEXT NOT NULL,
    nom TEXT,
    prenom TEXT,
    avatar_url TEXT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_derniere_connexion DATETIME,
    statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    plan_abonnement TEXT DEFAULT 'gratuit' CHECK (plan_abonnement IN ('gratuit', 'pro', 'entreprise'))
);

-- Table des réseaux sociaux
CREATE TABLE reseaux_sociaux (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT UNIQUE NOT NULL,
    api_endpoint TEXT,
    limite_caracteres INTEGER,
    formats_media TEXT,
    actif BOOLEAN DEFAULT TRUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des connexions utilisateur-réseau
CREATE TABLE connexions_reseaux (
    id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
    utilisateur_id TEXT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    reseau_id INTEGER NOT NULL REFERENCES reseaux_sociaux(id),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expire_le DATETIME,
    nom_profil TEXT,
    id_profil_externe TEXT,
    date_connexion DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'expire', 'erreur')),
    UNIQUE(utilisateur_id, reseau_id)
);

-- Table des publications
CREATE TABLE publications (
    id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
    utilisateur_id TEXT NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
    titre TEXT,
    contenu TEXT NOT NULL,
    urls_media TEXT,
    reseaux_cibles TEXT NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_publication_prevue DATETIME,
    date_publication_reelle DATETIME,
    statut TEXT DEFAULT 'brouillon' CHECK (statut IN ('brouillon', 'programme', 'publie', 'echec', 'annule')),
    nombre_vues INTEGER DEFAULT 0,
    nombre_likes INTEGER DEFAULT 0,
    nombre_partages INTEGER DEFAULT 0,
    nombre_commentaires INTEGER DEFAULT 0
);

-- Table des logs d'audit
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    utilisateur_id TEXT,
    anciennes_donnees TEXT,
    nouvelles_donnees TEXT,
    adresse_ip TEXT,
    user_agent TEXT,
    timestamp_operation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des métriques de performance
CREATE TABLE metriques_performance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    publication_id TEXT REFERENCES publications(id) ON DELETE CASCADE,
    reseau_id INTEGER REFERENCES reseaux_sociaux(id),
    date_mesure DATETIME DEFAULT CURRENT_TIMESTAMP,
    vues INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    partages INTEGER DEFAULT 0,
    commentaires INTEGER DEFAULT 0,
    taux_engagement REAL DEFAULT 0.00,
    portee_organique INTEGER DEFAULT 0,
    portee_payante INTEGER DEFAULT 0
);

-- =================================================================
-- INDEX D'OPTIMISATION
-- =================================================================

CREATE INDEX idx_utilisateurs_email ON utilisateurs(email);
CREATE INDEX idx_utilisateurs_statut ON utilisateurs(statut);
CREATE INDEX idx_publications_utilisateur ON publications(utilisateur_id);
CREATE INDEX idx_publications_statut ON publications(statut);
CREATE INDEX idx_connexions_utilisateur ON connexions_reseaux(utilisateur_id);
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp_operation);
`;

// Fonction de hachage simple pour démonstration
function hashPassword(password) {
    const crypto = require('crypto');
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `$publify$${salt}$${hash}`;
}

// Exécuter la création des tables
db.serialize(() => {
    console.log('🔧 Création des tables...');
    
    db.exec(createTables, (err) => {
        if (err) {
            console.error('❌ Erreur création tables:', err);
            return;
        }
        console.log('✅ Tables créées avec succès');
        
        // Insertion des données de test
        console.log('📝 Insertion des données de test...');
        
        // Réseaux sociaux
        const insertReseaux = `
        INSERT INTO reseaux_sociaux (nom, api_endpoint, limite_caracteres, formats_media, actif) VALUES
        ('LinkedIn', 'https://api.linkedin.com/v2/', 3000, 'image/jpeg,image/png,video/mp4', 1),
        ('Twitter', 'https://api.twitter.com/2/', 280, 'image/jpeg,image/png,video/mp4', 1),
        ('Facebook', 'https://graph.facebook.com/v18.0/', 63206, 'image/jpeg,image/png,video/mp4', 1);
        `;
        
        db.exec(insertReseaux);
        
        // Utilisateurs avec mots de passe hashés
        const users = [
            {
                email: 'matheo.beuve@prepavenir.com',
                password: hashPassword('Password123!'),
                nom: 'Beuve',
                prenom: 'Mathéo',
                plan: 'entreprise'
            },
            {
                email: 'sarah.martin@entreprise.com',
                password: hashPassword('MarketingPro2024!'),
                nom: 'Martin',
                prenom: 'Sarah',
                plan: 'pro'
            },
            {
                email: 'pierre.dubois@startup.fr',
                password: hashPassword('Content123'),
                nom: 'Dubois',
                prenom: 'Pierre',
                plan: 'gratuit'
            }
        ];
        
        users.forEach((user, index) => {
            const userId = `user-${index + 1}-${Date.now()}`;
            db.run(`
                INSERT INTO utilisateurs (id, email, mot_de_passe_hash, nom, prenom, plan_abonnement, statut) 
                VALUES (?, ?, ?, ?, ?, ?, 'actif')
            `, [userId, user.email, user.password, user.nom, user.prenom, user.plan]);
            
            // Connexions réseaux pour cet utilisateur
            db.run(`
                INSERT INTO connexions_reseaux (utilisateur_id, reseau_id, access_token, nom_profil, statut) 
                VALUES (?, 1, 'linkedin_token_${index}', '${user.prenom} ${user.nom} - LinkedIn', 'actif')
            `, [userId]);
            
            if (index < 2) { // Premiers utilisateurs ont aussi Twitter
                db.run(`
                    INSERT INTO connexions_reseaux (utilisateur_id, reseau_id, access_token, nom_profil, statut) 
                    VALUES (?, 2, 'twitter_token_${index}', '@${user.prenom.toLowerCase()}_${user.nom.toLowerCase()}', 'actif')
                `, [userId]);
            }
        });
        
        // Publications de test
        setTimeout(() => {
            db.get('SELECT id FROM utilisateurs WHERE email = ?', ['matheo.beuve@prepavenir.com'], (err, user) => {
                if (user) {
                    const pubId = `pub-1-${Date.now()}`;
                    db.run(`
                        INSERT INTO publications (id, utilisateur_id, titre, contenu, reseaux_cibles, statut, nombre_vues, nombre_likes) 
                        VALUES (?, ?, 'Lancement de Publify', 'Fier de présenter Publify, une plateforme complète de gestion des réseaux sociaux ! 🚀\\n\\n✅ Publication multi-plateformes\\n✅ Planification intelligente\\n✅ Analytics détaillés\\n\\n#Publify #SocialMedia #Innovation', '[1,2]', 'publie', 1250, 87)
                    `, [pubId, user.id]);
                    
                    // Métriques pour cette publication
                    db.run(`
                        INSERT INTO metriques_performance (publication_id, reseau_id, vues, likes, partages, commentaires, taux_engagement) 
                        VALUES (?, 1, 1000, 67, 23, 12, 10.2)
                    `, [pubId]);
                }
            });
        }, 100);
        
        console.log('✅ Données de test insérées');
        console.log('===============================================');
        console.log('BASE DE DONNÉES SQLITE CRÉÉE AVEC SUCCÈS !');
        console.log('===============================================');
        console.log('📍 Fichier:', dbPath);
        console.log('👤 Utilisateurs: 3');
        console.log('📱 Réseaux sociaux: 3');
        console.log('📝 Publications: Exemples insérés');
        console.log('===============================================');
        console.log('🎯 Pour l\'oral CCP 2:');
        console.log('1. Ouvrir un visualiseur SQLite (DB Browser for SQLite)');
        console.log('2. Charger le fichier:', dbPath);
        console.log('3. Démontrer les tables, données et requêtes');
        console.log('===============================================');
        
        db.close();
    });
});