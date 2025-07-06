# 📊 UML - Diagramme de séquence : Création et publication de post

## 🎯 **Processus complet de publication multi-réseaux avec tokens OAuth**

### **Acteurs :**
- **Utilisateur** : Créateur du contenu
- **Interface Publify** : Application web Next.js
- **API Publify** : Backend de l'application
- **Base de données** : PostgreSQL avec tokens
- **LinkedIn API** : Service externe LinkedIn
- **Twitter API** : Service externe Twitter
- **Facebook API** : Service externe Facebook

---

## 📋 **Pour Draw.io - Étapes du diagramme de séquence :**

### **Phase 1 : Authentification et vérification des tokens**
```
1. Utilisateur -> Interface Publify : "Créer nouvelle publication"
2. Interface Publify -> API Publify : "GET /api/user/connected-networks"
3. API Publify -> Base de données : "SELECT tokens FROM connexions_reseaux WHERE utilisateur_id = ? AND statut = 'actif'"
4. Base de données -> API Publify : "Retour liste des tokens actifs"
5. API Publify -> Interface Publify : "Réseaux disponibles avec statut tokens"
6. Interface Publify -> Utilisateur : "Affichage réseaux connectés"
```

### **Phase 2 : Création du contenu**
```
7. Utilisateur -> Interface Publify : "Saisie contenu + sélection réseaux + upload média"
8. Interface Publify -> API Publify : "POST /api/upload (si média)"
9. API Publify -> AWS S3 : "Upload fichier média"
10. AWS S3 -> API Publify : "URL média uploadé"
11. Interface Publify -> API Publify : "POST /api/drafts (sauvegarde brouillon)"
12. API Publify -> Base de données : "INSERT INTO publications (contenu, médias, réseaux_cibles)"
13. Base de données -> API Publify : "Confirmation sauvegarde"
```

### **Phase 3 : Publication multi-réseaux**
```
14. Utilisateur -> Interface Publify : "Clic 'Publier maintenant'"
15. Interface Publify -> API Publify : "POST /api/publish"

    -- Sous-séquence pour LinkedIn --
16. API Publify -> Base de données : "SELECT access_token FROM connexions_reseaux WHERE reseau_id = 1"
17. Base de données -> API Publify : "Token LinkedIn crypté"
18. API Publify -> LinkedIn API : "POST /v2/ugcPosts (avec Bearer token)"
19. LinkedIn API -> API Publify : "Réponse publication (succès/échec)"
20. API Publify -> Base de données : "UPDATE publications SET statut = 'publie' WHERE reseau = 'linkedin'"

    -- Sous-séquence pour Twitter --
21. API Publify -> Base de données : "SELECT access_token FROM connexions_reseaux WHERE reseau_id = 2"
22. Base de données -> API Publify : "Token Twitter crypté"
23. API Publify -> Twitter API : "POST /2/tweets (avec Bearer token)"
24. Twitter API -> API Publify : "Réponse publication (succès/échec)"
25. API Publify -> Base de données : "UPDATE publications SET statut = 'publie' WHERE reseau = 'twitter'"

    -- Sous-séquence pour Facebook --
26. API Publify -> Base de données : "SELECT access_token FROM connexions_reseaux WHERE reseau_id = 3"
27. Base de données -> API Publify : "Token Facebook crypté"
28. API Publify -> Facebook API : "POST /me/feed (avec access_token)"
29. Facebook API -> API Publify : "Réponse publication (succès/échec)"
30. API Publify -> Base de données : "UPDATE publications SET statut = 'publie' WHERE reseau = 'facebook'"
```

### **Phase 4 : Consolidation et retour**
```
31. API Publify -> Base de données : "INSERT INTO audit_log (action: 'publication_multi_reseaux')"
32. API Publify -> Interface Publify : "Statut global publication (succès/échecs par réseau)"
33. Interface Publify -> Utilisateur : "Notification résultats publication"
34. API Publify -> Base de données : "INSERT INTO metriques_performance (publication_id, réseau, statut)"
```

---

## 🔐 **Points clés pour ton oral CCP 2 :**

### **Sécurité des tokens :**
- ❌ **Pas de mots de passe** stockés pour les réseaux sociaux
- ✅ **Tokens OAuth** cryptés dans la base
- ✅ **Refresh automatique** des tokens expirés
- ✅ **Isolation** par utilisateur

### **Architecture :**
- **Séparation des responsabilités** : Interface / API / Services externes
- **Gestion d'erreurs** : Chaque réseau peut échouer indépendamment
- **Audit complet** : Traçabilité de toutes les actions
- **Performance** : Appels API en parallèle possible

---

## 📐 **Instructions pour Draw.io :**

### **1. Créer les acteurs (verticalement) :**
```
Utilisateur | Interface Publify | API Publify | Base de données | LinkedIn API | Twitter API | Facebook API
```

### **2. Flèches horizontales avec numéros :**
- **Flèches pleines** : Appels synchrones
- **Flèches pointillées** : Réponses
- **Rectangles** : Traitements longs
- **Notes** : Annotations sécurité

### **3. Groupes/Fragments :**
- **Fragment "opt"** : Vérification token
- **Fragment "loop"** : Pour chaque réseau sélectionné
- **Fragment "alt"** : Gestion succès/échec

### **4. Couleurs suggérées :**
- **Bleu** : Actions utilisateur
- **Vert** : Succès API
- **Rouge** : Gestion d'erreurs
- **Orange** : Sécurité/tokens

---

## 💡 **Messages clés pour le jury :**

1. **"Pas de stockage de mots de passe"** → Sécurité OAuth
2. **"Tokens cryptés en base"** → Protection des accès
3. **"Publication atomique par réseau"** → Résilience
4. **"Audit complet des actions"** → Traçabilité
5. **"Gestion d'erreurs granulaire"** → UX optimisée

---

## 🎯 **Code correspondant à présenter :**

### **Gestion des tokens (src/app/api/linkedin/post/route.ts) :**
```typescript
// Récupération token sécurisé
const session = await getServerSession(authOptions);
if (!session?.accessToken) {
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}

// Appel API avec token
const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
  headers: {
    Authorization: `Bearer ${session.accessToken}`,
    "Content-Type": "application/json"
  }
});
```

### **Sauvegarde sécurisée (src/app/api/drafts/route.ts) :**
```typescript
// Isolation par utilisateur
const userId = session.user.id;
const draft = await prisma.draft.create({
  data: {
    userId,        // Sécurité : isolation
    contenu,
    reseaux_cibles,
    statut: "draft"
  }
});
```

**Ce diagramme montre parfaitement la maîtrise de l'architecture sécurisée pour ton CCP 2 !** 🎯