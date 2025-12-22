// Configuration Gist PUBLIC (sans token - pour GitHub Pages)
// Ce fichier peut être commité en toute sécurité

const GIST_PUBLIC_CONFIG = {
    // ID du Gist public (sera mis à jour après la première publication)
    // Vous devez publier UNE FOIS depuis votre PC en local avec le vrai token
    // puis copier l'ID ici
    gistId: '', // Format: abc123def456 (32 caractères alphanumériques)
    
    // Nom du fichier dans le Gist
    gistFilename: 'kingdom-of-nile-map.json'
};

// Fonction pour charger depuis un Gist PUBLIC (pas besoin de token)
async function loadFromPublicGist(gistId = null) {
    const id = gistId || GIST_PUBLIC_CONFIG.gistId;
    
    if (!id) {
        console.log('ℹ️ Aucun Gist configuré, utilisation du localStorage');
        return null;
    }
    
    try {
        console.log('📥 Chargement depuis Gist public:', id);
        
        // Pas besoin d'authentification pour les Gists publics
        const response = await fetch(`https://api.github.com/gists/${id}`);
        
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement: ${response.status}`);
        }
        
        const gist = await response.json();
        const file = gist.files?.[GIST_PUBLIC_CONFIG.gistFilename];
        
        if (!file) {
            throw new Error('Fichier non trouvé dans le Gist');
        }
        
        // Préférer raw_url pour éviter les soucis d'encoding
        if (file.raw_url) {
            const rawResp = await fetch(file.raw_url);
            if (!rawResp.ok) throw new Error(`Erreur chargement raw: ${rawResp.status}`);
            const rawText = await rawResp.text();
            const mapData = JSON.parse(rawText);
            console.log('✅ Carte chargée depuis Gist public');
            return mapData;
        }
        
        // Fallback sur content inclus
        if (file.content) {
            const mapData = JSON.parse(file.content);
            console.log('✅ Carte chargée depuis Gist public');
            return mapData;
        }
        
        throw new Error('Aucun contenu utilisable dans le Gist');
    } catch (error) {
        console.error('❌ Erreur lors du chargement depuis Gist:', error);
        console.log('ℹ️ Utilisation du localStorage à la place');
        return null;
    }
}

// Fonction pour obtenir l'URL publique du Gist
function getPublicGistUrl() {
    if (!GIST_PUBLIC_CONFIG.gistId) return null;
    return `https://gist.github.com/${GIST_PUBLIC_CONFIG.gistId}`;
}

console.log('✅ gist-public-config.js chargé');
console.log('Gist ID configuré:', GIST_PUBLIC_CONFIG.gistId || 'Aucun');
