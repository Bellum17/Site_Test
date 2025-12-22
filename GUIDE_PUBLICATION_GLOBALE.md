# 🎯 Solution de Publication Globale - Guide Complet

## 🔑 Principe

- **Vous (Admin)** : Publiez **en local** avec le token → Le Gist est PUBLIC
- **Tout le monde** : Lit le Gist PUBLIC **sans token** depuis GitHub Pages

## 📝 Étapes de Configuration (Une seule fois)

### 1️⃣ Publier la carte en local (ADMIN uniquement)

1. Ouvrez **en local** : `file:///Users/bejnamin/Desktop/Site_Test/editeur.html`
2. Connectez-vous avec Discord
3. Placez des unités sur la carte
4. Cliquez sur **"📤 Publier la carte"**
5. ✅ La publication réussit → **Copiez le Gist ID** affiché dans le message

Exemple de message :
```
✅ Carte publiée avec succès !

🌐 Publié sur GitHub Gist
ID: abc123def456789...
URL: https://gist.github.com/Bellum17/abc123def456789...

📋 IMPORTANT: Copiez cet ID et ajoutez-le dans gist-public-config.js:
gistId: 'abc123def456789...'
```

### 2️⃣ Configurer le Gist ID public

1. Ouvrez `gist-public-config.js`
2. À la ligne 7, remplacez :
```javascript
gistId: '',  // ❌ Vide
```
Par :
```javascript
gistId: 'abc123def456789...',  // ✅ Votre ID copié
```
3. Sauvegardez

### 3️⃣ Pousser sur GitHub

```bash
cd /Users/bejnamin/Desktop/Site_Test
git add gist-public-config.js
git commit -m "Ajout du Gist ID public"
git push
```

## ✅ Résultat Final

### En local (Vous - Admin)
- Ouvrez `editeur.html` en local
- Token disponible → Vous pouvez **publier**
- Le Gist est mis à jour

### Sur GitHub Pages (Tout le monde)
- `https://bellum17.github.io/kingdomofnile/carte`
- Charge le Gist PUBLIC (pas besoin de token)
- Tout le monde voit votre dernière carte publiée ✅

## 🔄 Workflow de Publication

```
┌─────────────────────────────────────────┐
│  VOUS (Admin sur votre PC)              │
│  1. Ouvrez editeur.html en local        │
│  2. Modifiez la carte                   │
│  3. Publiez → Gist mis à jour           │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  GitHub Gist  │
         │   (PUBLIC)    │
         └───────┬───────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  VISITEURS (GitHub Pages)               │
│  https://bellum17.github.io/.../carte   │
│  → Chargement automatique depuis Gist   │
│  → Voient votre dernière carte          │
└─────────────────────────────────────────┘
```

## 🛡️ Sécurité

✅ **Token jamais exposé**
- `gist-config.js` (avec token) → `.gitignore` → Jamais sur GitHub
- `gist-public-config.js` (sans token) → GitHub → OK

✅ **Lecture publique**
- Les Gists publics sont lisibles par tout le monde sans authentification
- Seule la modification nécessite le token (que seul vous avez)

## 🔧 Maintenance

### Publier une nouvelle version
1. Ouvrez `editeur.html` **en local**
2. Modifiez
3. Publiez
4. ✅ Le Gist ID reste le même
5. Les visiteurs voient instantanément les changements

### Changer de Gist
Si vous créez un nouveau Gist :
1. Publiez en local
2. Copiez le nouvel ID
3. Mettez à jour `gist-public-config.js`
4. Push sur GitHub

## ❓ Dépannage

### "Carte non chargée" sur GitHub Pages
→ Vérifiez que le Gist ID est bien dans `gist-public-config.js`
→ Vérifiez que le fichier est bien pusné sur GitHub

### "Impossible de publier" en local
→ Vérifiez le token dans `gist-config.js`
→ Ouvrez la console (F12) pour voir les erreurs

### Visiteurs voient ancienne version
→ Ils doivent rafraîchir (F5 ou Cmd+R)
→ Le Gist est mis en cache pendant ~5 minutes par GitHub

## 📊 Fichiers Importants

| Fichier | Usage | Où ? | Commité ? |
|---------|-------|------|-----------|
| `gist-config.js` | Publication (token) | Local uniquement | ❌ NON (.gitignore) |
| `gist-public-config.js` | Lecture (pas de token) | Partout | ✅ OUI |
| `editeur.html` | Interface admin | Local pour publish | ✅ OUI |
| `carte.html` | Carte publique | GitHub Pages | ✅ OUI |

---

**C'est tout ! Système sécurisé et fonctionnel ! 🎉**
