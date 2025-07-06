# 🚀 PUBLIFY - Plateforme de Gestion Multi-Réseaux Sociaux

<div align="center">

![Publify Logo](https://via.placeholder.com/300x100/0077B5/FFFFFF?text=PUBLIFY)

**Solution SaaS moderne pour centraliser et optimiser votre présence sur les réseaux sociaux**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

[🌐 **Demo Live**](https://publify.site) · [📖 **Documentation**](./docs) · [🐛 **Signaler un Bug**](../../issues) · [💡 **Demander une Feature**](../../issues)

</div>

---

## 📋 **Table des Matières**

- [✨ Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation Rapide](#-installation-rapide)
- [🔧 Configuration](#-configuration)
- [📱 Utilisation](#-utilisation)
- [🔐 Sécurité](#-sécurité)
- [🧪 Tests](#-tests)
- [🚀 Déploiement](#-déploiement)
- [📊 Métriques](#-métriques)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## ✨ **Fonctionnalités**

### 🎯 **Publication Multi-Plateformes**
- ✅ **LinkedIn, Twitter, Facebook** - Publication simultanée
- ✅ **Contenu adaptatif** - Optimisation automatique par réseau
- ✅ **Planification avancée** - Programmation de posts
- ✅ **Prévisualisation** - Aperçu temps réel par plateforme

### 🔐 **Sécurité Renforcée**
- ✅ **OAuth 2.0** - Authentification sécurisée sans mots de passe
- ✅ **Tokens cryptés** - Chiffrement AES-256 des accès
- ✅ **Audit complet** - Traçabilité de toutes les actions
- ✅ **Isolation utilisateur** - Données cloisonnées par compte

### 📊 **Analytics Avancés**
- ✅ **Métriques temps réel** - Vues, likes, partages, commentaires
- ✅ **Taux d'engagement** - Calculs automatiques par réseau
- ✅ **Rapports détaillés** - Exportation CSV/Excel
- ✅ **Tendances** - Analyse de performance historique

### 🌍 **Expérience Utilisateur**
- ✅ **Interface moderne** - Design responsive et intuitif
- ✅ **Internationalisation** - Support français/anglais
- ✅ **Mode sombre** - Interface adaptative
- ✅ **PWA Ready** - Application web progressive

---

## 🏗️ **Architecture**

### **Stack Technologique**

```mermaid
graph TB
    A[🌐 Frontend - Next.js 15] --> B[⚙️ API Routes - Node.js]
    B --> C[🗄️ Base de Données - PostgreSQL]
    B --> D[☁️ Stockage - AWS S3]
    B --> E[🔐 Auth - NextAuth.js]
    
    F[🔵 LinkedIn API] --> B
    G[🐦 Twitter API] --> B
    H[📘 Facebook API] --> B
    
    I[🐳 Docker] --> J[☁️ AWS ECR]
    J --> K[🚀 Déploiement - AWS CodeDeploy]
```

### **Modèle de Données (Merise)**

```sql
-- Modèle conceptuel des données principales
UTILISATEUR (1,N) ---- CRÉE ---- (0,N) PUBLICATION
     |                                    |
     |                                    |
(1,N)|                                    |(1,N)
     |                                    |
 CONNECTE                             GÉNÈRE
     |                                    |
(0,N)|                                    |(0,N)
     |                                    |
RÉSEAU_SOCIAL (1,1) ---- MESURE ---- (0,N) MÉTRIQUE
```

### **Architecture de Sécurité**

```typescript
// Exemple de gestion sécurisée des tokens
interface SecureTokenManager {
  encryptToken(token: string, userId: string): Promise<string>;
  decryptToken(encryptedToken: string, userId: string): Promise<string>;
  refreshToken(provider: string, userId: string): Promise<void>;
  revokeAllTokens(userId: string): Promise<void>;
}
```

---

## 🚀 **Installation Rapide**

### **Prérequis**
- **Node.js** 18+ 
- **PostgreSQL** 14+
- **Git**
- **AWS Account** (pour la production)

### **Installation Locale**

```bash
# 📥 Cloner le repository
git clone https://github.com/matheobeuve/publify.git
cd publify

# 📦 Installer les dépendances
npm install

# 🗄️ Configurer la base de données
psql -U postgres -c "CREATE DATABASE publify_dev;"
psql -U postgres -d publify_dev -f database/00_setup_complete.sql

# 🔧 Configuration environnement
cp .env.example .env.local
# Éditer .env.local avec vos variables

# 🚀 Lancer en développement
npm run dev
```

### **Installation avec Docker**

```bash
# 🐳 Build et run avec Docker Compose
docker-compose up -d

# 🗄️ Initialiser la base de données
docker-compose exec app psql -U postgres -d publify -f database/00_setup_complete.sql
```

---

## 🔧 **Configuration**

### **Variables d'Environnement**

```bash
# 🗄️ Base de données
DATABASE_URL="postgresql://postgres:publify123@localhost:5432/publify_ccp2"

# 🔐 Authentification
NEXTAUTH_SECRET="your-super-secret-key-32-chars-min"
NEXTAUTH_URL="http://localhost:3000"

# 🔵 LinkedIn OAuth
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# 🐦 Twitter OAuth
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# 📘 Facebook OAuth
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# ☁️ AWS Configuration
AWS_REGION="eu-west-3"
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_BUCKET_NAME="publify-media-bucket"

# 🔐 AWS Cognito
COGNITO_USER_POOL_ID="eu-west-3_example"
COGNITO_CLIENT_ID="your-cognito-client-id"
```

### **Configuration OAuth**

#### **LinkedIn Developer Console**
1. Créer une application sur [LinkedIn Developers](https://developer.linkedin.com/)
2. Configurer les redirections : `http://localhost:3000/api/auth/callback/linkedin`
3. Permissions requises : `r_basicprofile`, `w_member_social`

#### **Twitter Developer Portal**
1. Créer une app sur [Twitter Developer Portal](https://developer.twitter.com/)
2. Activer OAuth 2.0 avec PKCE
3. Callback URL : `http://localhost:3000/api/auth/callback/twitter`

#### **Facebook for Developers**
1. Créer une app sur [Facebook Developers](https://developers.facebook.com/)
2. Configurer Facebook Login
3. Redirect URI : `http://localhost:3000/api/auth/callback/facebook`

---

## 📱 **Utilisation**

### **🎯 Créer votre première publication**

```typescript
// Exemple d'utilisation de l'API
const response = await fetch('/api/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: "🚀 Découvrez Publify, la solution pour gérer vos réseaux sociaux !",
    networks: ['linkedin', 'twitter'],
    scheduledFor: "2025-01-10T09:00:00Z", // Optionnel
    media: [
      {
        type: 'image',
        url: 'https://example.com/image.jpg'
      }
    ]
  })
});
```

### **📊 Récupérer les analytics**

```typescript
// Obtenir les métriques d'une publication
const analytics = await fetch(`/api/analytics/${publicationId}`);
const data = await analytics.json();

console.log(data);
// {
//   totalViews: 1250,
//   totalLikes: 87,
//   totalShares: 23,
//   totalComments: 12,
//   engagementRate: 9.76,
//   platformBreakdown: {
//     linkedin: { views: 1000, likes: 67, shares: 18 },
//     twitter: { views: 250, likes: 20, shares: 5 }
//   }
// }
```

---

## 🔐 **Sécurité**

### **🛡️ Mesures de Sécurité Implémentées**

- **🔒 Chiffrement bout-en-bout** des tokens OAuth
- **🔑 Hachage sécurisé** des mots de passe (fonction personnalisée)
- **📋 Audit automatique** de toutes les actions sensibles
- **🚫 Protection CSRF/XSS** intégrée
- **⚡ Rate limiting** sur les APIs critiques
- **🔍 Validation stricte** des données d'entrée

### **🔒 Exemple de Sécurisation**

```typescript
// Fonction de hachage sécurisé personnalisée (CCP 2)
export function hash_mot_de_passe(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `$publify$${salt}$${hash}`;
}

// Audit automatique des actions (Trigger PostgreSQL)
CREATE TRIGGER audit_publications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON publications
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_fonction();
```

### **🔍 Audit de Sécurité ZAP**

Les scans de sécurité sont effectués régulièrement sur l'application :
- ✅ **Tests d'intrusion** automatisés
- ✅ **Analyse des vulnérabilités** OWASP Top 10
- ✅ **Scan des dépendances** avec Snyk
- ✅ **Monitoring continu** des failles de sécurité

---

## 🧪 **Tests**

### **Suite de Tests Complète**

```bash
# 🧪 Tests unitaires
npm run test

# 📊 Couverture de code
npm run test:coverage

# 🔄 Tests d'intégration
npm run test:integration

# 🌐 Tests end-to-end
npm run test:e2e

# 🔐 Tests de sécurité
npm run test:security
```

### **Base de Données CCP 2**

```bash
# 🗄️ Créer la base de démonstration CCP 2
psql -U postgres -f database/00_setup_complete.sql

# 🧪 Tester les procédures stockées
psql -U postgres -d publify_ccp2 -f database/04_requetes_demonstration.sql

# 🔐 Vérifier les triggers de sécurité
psql -U postgres -d publify_ccp2 -c "SELECT * FROM audit_log ORDER BY timestamp_operation DESC LIMIT 5;"
```

---

## 🚀 **Déploiement**

### **🐳 Déploiement Docker**

```dockerfile
# Multi-stage build optimisé
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### **☁️ Déploiement AWS**

```bash
# 🚀 Build et push vers ECR
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin
docker build -t publify .
docker tag publify:latest your-ecr-url/publify:latest
docker push your-ecr-url/publify:latest

# 📦 Déploiement via CodeDeploy
aws deploy create-deployment --application-name publify-app --deployment-group-name production
```

### **🔄 CI/CD Pipeline**

Le pipeline automatique inclut :
- ✅ **Tests automatiques** sur chaque push
- ✅ **Analyse de sécurité** (Snyk, CodeQL)
- ✅ **Build Docker** optimisé
- ✅ **Tests PostgreSQL** avec base CCP 2
- ✅ **Déploiement automatique** staging/production
- ✅ **Tests post-déploiement** E2E

---

## 📊 **Base de Données CCP 2**

### **🗄️ Structure PostgreSQL**

```sql
-- 6 tables principales avec contraintes métier
Tables:
├── utilisateurs          # Gestion des comptes utilisateurs
├── reseaux_sociaux       # Configuration des plateformes
├── connexions_reseaux    # Tokens OAuth sécurisés
├── publications          # Contenu et planification
├── audit_log             # Traçabilité complète
└── metriques_performance # Analytics et KPIs
```

### **🔐 Sécurité Intégrée**

- **4 Procédures stockées** : Hachage, calculs, nettoyage, statistiques
- **3 Triggers automatiques** : Audit, validation, timestamps
- **Isolation stricte** : `WHERE utilisateur_id = ?` partout
- **Contraintes métier** : Email format, statuts validés
- **Index optimisés** : Performance sur les requêtes fréquentes

### **📊 Données de Démonstration**

```bash
# Installer la base CCP 2 complète
psql -U postgres -f database/00_setup_complete.sql

# Vérifier les données
psql -U postgres -d publify_ccp2 -c "SELECT COUNT(*) FROM utilisateurs;" # 3 utilisateurs
psql -U postgres -d publify_ccp2 -c "SELECT COUNT(*) FROM publications;" # Plusieurs publications
```

---

## 🎯 **CCP 2 - Démonstration**

Ce projet démontre les **3 compétences** du CCP 2 :

### **1️⃣ Concevoir une base de données**
- ✅ **Modèle Merise** : MCD avec entités et relations
- ✅ **Contraintes métier** : Validation email, statuts, etc.
- ✅ **Normalisation** : 3NF respectée

### **2️⃣ Mettre en place une base de données**
- ✅ **PostgreSQL** : Installation et configuration
- ✅ **Données réelles** : Utilisateurs et publications authentiques
- ✅ **Index optimisés** : Performance sur les requêtes

### **3️⃣ Développer des composants**
- ✅ **Procédures stockées** : PL/pgSQL authentique
- ✅ **Triggers automatiques** : Audit et sécurité
- ✅ **Sécurité intégrée** : Hachage, isolation, validation

---

## 🤝 **Contribution**

### **🎯 Comment Contribuer**

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** vos changements (`git commit -m 'Add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### **📋 Guidelines**

- ✅ **Tests** : Tous les nouveaux features doivent être testés
- ✅ **Documentation** : Documenter les nouvelles fonctionnalités
- ✅ **Code Style** : Respecter ESLint et Prettier
- ✅ **Sécurité** : Aucune donnée sensible dans le code
- ✅ **Base de données** : Maintenir la compatibilité PostgreSQL

---

## 👨‍💻 **Équipe**

<div align="center">

**Développé avec ❤️ par [Mathéo Beuve](https://github.com/matheobeuve)**

*Projet CCP 2 - Concepteur Développeur d'Applications*  
*PREPAVENIR Formation - 2025*

**Démonstration des compétences :**
- 🗄️ Conception et mise en place de base de données PostgreSQL
- 🔐 Développement de composants sécurisés (procédures, triggers)
- 🛡️ Intégration des recommandations de sécurité

</div>

---

## 📄 **Licence**

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🔗 **Liens Utiles**

- 🌐 **Demo Live** : [publify.site](https://publify.site)
- 📖 **Documentation CCP 2** : [Guide Oral](./GUIDE_ORAL_CCP2.md)
- 🗄️ **Base de Données** : [Scripts PostgreSQL](./database/)
- 🎨 **UML Diagrammes** : [Draw.io](./UML_Sequence_Publify_Drawio_Improved.xml)
- 💬 **Contact** : [matheo.beuve@prepavenir.com](mailto:matheo.beuve@prepavenir.com)

---

<div align="center">

**⭐ N'oubliez pas de mettre une étoile si ce projet vous plaît ! ⭐**

![Publify Banner](https://via.placeholder.com/800x200/0077B5/FFFFFF?text=PUBLIFY+-+CCP+2+-+PostgreSQL+%2B+Security)

*Made with Next.js 15, TypeScript, PostgreSQL and lots of ☕*

**🎯 Projet validé CCP 2 - Concevoir et développer la persistance des données**

</div>