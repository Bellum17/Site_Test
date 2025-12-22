// Configuration GitHub Gist - TEMPLATE
// ⚠️ COPIEZ ce fichier en "gist-config.js" et ajoutez votre token

const GIST_CONFIG = {
    // ÉTAPE 1 : Créez un token sur https://github.com/settings/tokens
    // Permission requise : "gist" uniquement
    // 
    // ÉTAPE 2 : Remplacez 'VOTRE_TOKEN_ICI' par votre token
    // Format : ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    githubToken: 'VOTRE_TOKEN_ICI',
    
    // Laissez vide, sera rempli automatiquement après la première publication
    gistId: '',
    
    // Nom du fichier dans le Gist (ne pas modifier)
    gistFilename: 'kingdom-of-nile-map.json',
    
    // Description du Gist sur GitHub
    gistDescription: 'Carte publiée du Royaume du Nil'
};

// ===== NE PAS MODIFIER EN DESSOUS DE CETTE LIGNE =====

function checkGistConfig() {
    if (!GIST_CONFIG.githubToken || GIST_CONFIG.githubToken === 'VOTRE_TOKEN_ICI') {
        console.warn('⚠️ Token GitHub non configuré');
        return false;
    }
    return true;
}

function saveGistId(gistId) {
    GIST_CONFIG.gistId = gistId;
    localStorage.setItem('gist_id', gistId);
    console.log('✅ Gist ID sauvegardé:', gistId);
}

function loadGistId() {
    const savedGistId = localStorage.getItem('gist_id');
    if (savedGistId && !GIST_CONFIG.gistId) {
        GIST_CONFIG.gistId = savedGistId;
        console.log('✅ Gist ID chargé:', savedGistId);
    }
    return GIST_CONFIG.gistId;
}

async function publishToGist(mapData) {
    if (!checkGistConfig()) {
        throw new Error('Token GitHub non configuré. Veuillez configurer GIST_CONFIG.githubToken dans gist-config.js');
    }
    
    const content = JSON.stringify(mapData, null, 2);
    const gistId = loadGistId();
    
    const gistData = {
        description: GIST_CONFIG.gistDescription,
        public: true,
        files: {
            [GIST_CONFIG.gistFilename]: {
                content: content
            }
        }
    };
    
    try {
        let response;
        
        if (gistId) {
            console.log('🔄 Mise à jour du Gist existant...');
            response = await fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `token ${GIST_CONFIG.githubToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify(gistData)
            });
        } else {
            console.log('✨ Création d\'un nouveau Gist...');
            response = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GIST_CONFIG.githubToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify(gistData)
            });
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erreur GitHub API: ${errorData.message}`);
        }
        
        const result = await response.json();
        
        if (result.id) {
            saveGistId(result.id);
        }
        
        return {
            success: true,
            gistId: result.id,
            url: result.html_url,
            rawUrl: result.files[GIST_CONFIG.gistFilename].raw_url
        };
    } catch (error) {
        console.error('❌ Erreur lors de la publication sur Gist:', error);
        throw error;
    }
}

async function loadFromGist(gistId = null) {
    const id = gistId || loadGistId();
    
    if (!id) {
        console.log('ℹ️ Aucun Gist configuré, utilisation du localStorage');
        return null;
    }
    
    try {
        console.log('📥 Chargement depuis Gist:', id);
        const response = await fetch(`https://api.github.com/gists/${id}`);
        
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement: ${response.status}`);
        }
        
        const gist = await response.json();
        const fileContent = gist.files[GIST_CONFIG.gistFilename]?.content;
        
        if (!fileContent) {
            throw new Error('Fichier non trouvé dans le Gist');
        }
        
        const mapData = JSON.parse(fileContent);
        console.log('✅ Carte chargée depuis Gist');
        return mapData;
    } catch (error) {
        console.error('❌ Erreur lors du chargement depuis Gist:', error);
        console.log('ℹ️ Utilisation du localStorage à la place');
        return null;
    }
}

function getGistPublicUrl() {
    const gistId = loadGistId();
    if (!gistId) return null;
    return `https://gist.github.com/${gistId}`;
}

loadGistId();
