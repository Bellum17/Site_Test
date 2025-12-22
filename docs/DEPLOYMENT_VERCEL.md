# 🚀 Déploiement Vercel - Royaume du Nil

## 📋 Prérequis

1. Compte Vercel (gratuit) : https://vercel.com
2. Token GitHub avec permission "gist"

## 🔧 Installation

### 1. Créer un token GitHub

1. Allez sur https://github.com/settings/tokens
2. "Generate new token (classic)"
3. Nom : `Kingdom of Nile - Vercel`
4. Cochez **uniquement** : `gist`
5. Generate token
6. **Copiez le token** (format: `ghp_...`)

### 2. Déployer sur Vercel

#### Option A : Via le site web (Recommandé)

1. Allez sur https://vercel.com
2. "Import Project"
3. Sélectionnez votre repo GitHub `kingdomofnile`
4. Dans "Environment Variables", ajoutez :
   - `GITHUB_TOKEN` = votre token copié
   - `GIST_ID` = (laissez vide)
5. Deploy !

#### Option B : Via la CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd /Users/bejnamin/Desktop/Site_Test
vercel

# Ajouter les variables d'environnement
vercel env add GITHUB_TOKEN
# Collez votre token quand demandé

vercel env add GIST_ID
# Laissez vide (appuyez sur Entrée)

# Redéployer avec les variables
vercel --prod
```

## 🎯 Utilisation

### Première publication

1. Ouvrez l'éditeur sur Vercel : `https://votre-projet.vercel.app/editeur`
2. Connectez-vous avec Discord
3. Placez des unités
4. Publiez → Un Gist est créé automatiquement
5. Copiez le **Gist ID** affiché dans la console (F12)
6. Ajoutez-le dans Vercel :
   ```bash
   vercel env add GIST_ID
   # Collez l'ID
   vercel --prod
   ```

### Publications suivantes

1. Ouvrez l'éditeur : `https://votre-projet.vercel.app/editeur`
2. Modifiez la carte
3. Publiez → Le même Gist est mis à jour automatiquement

### Visiteurs

- URL publique : `https://votre-projet.vercel.app/carte`
- La carte se charge automatiquement depuis le Gist
- Mise à jour en temps réel après chaque publication

## 🔍 Architecture

```
Frontend (carte.html, editeur.html)
    ↓ API calls
API Vercel (/api/publish, /api/load)
    ↓ GitHub API
GitHub Gist (stockage public)
```

### Endpoints API

- **POST /api/publish** : Publie la carte sur Gist
  - Body : `{ mapData: {...} }`
  - Retour : `{ success: true, gistId, url, rawUrl }`

- **GET /api/load** : Charge la carte depuis Gist
  - Retour : `{ success: true, mapData: {...} }`

## 🛡️ Sécurité

✅ Token GitHub stocké dans les variables d'environnement Vercel (sécurisé)
✅ Pas de token dans le code source
✅ Gist public = lecture pour tout le monde, écriture = admin uniquement
✅ CORS activé pour votre domaine

## 📊 Monitoring

Dans Vercel Dashboard :
- Logs des API calls : `/api/publish` et `/api/load`
- Erreurs en temps réel
- Usage quotidien

## ⚡ Performance

- API serverless : temps de réponse < 500ms
- Cache GitHub : les visiteurs chargent instantanément
- Pas de limite de visiteurs (Vercel gratuit)

## 🆘 Dépannage

### Erreur "GitHub token not configured"
→ Ajoutez `GITHUB_TOKEN` dans les variables d'environnement Vercel

### Erreur "Failed to publish"
→ Vérifiez que le token a bien la permission `gist`

### Carte ne se charge pas
→ Ouvrez F12 → Console → Regardez les erreurs
→ Vérifiez que `GIST_ID` est bien configuré après la première publication

### API timeout
→ Vercel free tier : timeout de 10s max
→ Si dépassé, contactez le support Vercel

## 📚 Ressources

- Documentation Vercel : https://vercel.com/docs
- API GitHub Gists : https://docs.github.com/en/rest/gists
- Vercel Environment Variables : https://vercel.com/docs/environment-variables

---

**Bon déploiement ! 🎉**
