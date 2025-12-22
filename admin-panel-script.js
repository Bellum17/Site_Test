// Vérification de l'accès admin
const currentUser = JSON.parse(localStorage.getItem('current_user'));

if (!currentUser || !ADMIN_CONFIG.isAdmin(currentUser.id)) {
    alert('Vous n\'êtes pas autorisés à accéder au Panel du gouvernement nilien.');
    window.location.href = 'editor.html';
}

// Afficher les infos de l'admin
const adminInfo = document.getElementById('adminInfo');
const adminAvatar = document.getElementById('adminAvatar');
const adminName = document.getElementById('adminName');

if (currentUser) {
    const avatarUrl = currentUser.avatar 
        ? `https://cdn.discordapp.com/avatars/${currentUser.id}/${currentUser.avatar}.png`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
    
    adminAvatar.src = avatarUrl;
    adminName.textContent = currentUser.username;
    adminInfo.classList.remove('hidden');
}

// Charger et afficher les logs
function loadLogs() {
    const logs = ADMIN_CONFIG.getLogs();
    const container = document.getElementById('logsContainer');
    
    if (logs.length === 0) {
        container.innerHTML = '<p class="no-data">Aucun log disponible</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Trier par date décroissante
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    logs.forEach(log => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const avatarUrl = log.avatar 
            ? `https://cdn.discordapp.com/avatars/${log.userId}/${log.avatar}.png`
            : 'https://cdn.discordapp.com/embed/avatars/0.png';
        
        const actionText = {
            'login': '🔓 Connexion',
            'logout': '🔒 Déconnexion',
            'download_png': '📥 Téléchargement PNG',
            'download_json': '💾 Téléchargement JSON',
            'load_json': '📂 Chargement JSON',
            'publish_map': '🚀 Publication carte'
        };
        
        const details = log.details ? ` - ${JSON.stringify(log.details)}` : '';
        
        logEntry.innerHTML = `
            <img src="${avatarUrl}" alt="Avatar" class="log-avatar">
            <div class="log-info">
                <div class="log-username">${log.username}</div>
                <div class="log-action">${actionText[log.action] || log.action}${details}</div>
            </div>
            <div class="log-timestamp">${formatDate(log.timestamp)}</div>
        `;
        
        container.appendChild(logEntry);
    });
}

// Charger et afficher les versions
function loadVersions() {
    const versions = ADMIN_CONFIG.getMapVersions();
    const container = document.getElementById('versionsContainer');
    
    if (versions.length === 0) {
        container.innerHTML = '<p class="no-data">Aucune version sauvegardée</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Trier par date décroissante
    versions.sort((a, b) => b.id - a.id);
    
    versions.forEach(version => {
        const card = document.createElement('div');
        card.className = 'version-card';
        
        // Ajouter une classe spéciale pour les sauvegardes automatiques
        if (version.isAutoSaved) {
            card.classList.add('auto-saved');
        }
        
        const unitsCount = version.mapData.units ? version.mapData.units.length : 0;
        const autoSaveLabel = version.isAutoSaved ? '<span class="auto-save-badge">🤖 Auto</span>' : '';
        const noteLabel = version.note ? `<div class="version-note">${version.note}</div>` : '';
        
        card.innerHTML = `
            <div class="version-header">
                <span class="version-id">Version #${version.id} ${autoSaveLabel}</span>
                <span class="version-date">${formatDate(version.timestamp)}</span>
            </div>
            ${noteLabel}
            <div class="version-info">👤 Par: ${version.savedBy}</div>
            <div class="version-info">⚔️ Unités: ${unitsCount}</div>
            <div class="version-info">🔍 Zoom: ${version.mapData.zoom}</div>
            <div class="version-actions">
                <button class="version-btn" onclick="viewVersion(${version.id})">Voir</button>
                <button class="version-btn restore" onclick="restoreVersion(${version.id})">Restaurer</button>
                <button class="version-btn" onclick="downloadVersion(${version.id})">Télécharger</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Si moins d'une heure
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    
    // Si moins d'un jour
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    }
    
    // Sinon, afficher la date complète
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Voir une version
function viewVersion(versionId) {
    const mapData = ADMIN_CONFIG.restoreMapVersion(versionId);
    if (mapData) {
        const unitsCount = mapData.units ? mapData.units.length : 0;
        const info = `
Version #${versionId}
Publié par: ${mapData.publishedBy || 'Inconnu'}
Date: ${formatDate(mapData.timestamp)}
Unités: ${unitsCount}
Centre: ${mapData.center.lat.toFixed(4)}, ${mapData.center.lng.toFixed(4)}
Zoom: ${mapData.zoom}
        `;
        alert(info);
    }
}

// Restaurer une version
function restoreVersion(versionId) {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir restaurer cette version ?\n\nCela remplacera la carte actuelle sur le site.')) {
        return;
    }
    
    const mapData = ADMIN_CONFIG.restoreMapVersion(versionId);
    if (mapData) {
        // Sauvegarder comme carte publiée
        localStorage.setItem('published_map', JSON.stringify(mapData));
        
        // Logger l'action
        ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'restore_version', {
            versionId: versionId
        });
        
        alert('✅ Version restaurée avec succès !\n\nLa carte actuelle a été mise à jour.');
        loadLogs(); // Rafraîchir les logs
    }
}

// Télécharger une version
function downloadVersion(versionId) {
    const mapData = ADMIN_CONFIG.restoreMapVersion(versionId);
    if (mapData) {
        const jsonStr = JSON.stringify(mapData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carte-version-${versionId}.json`;
        link.click();
        URL.revokeObjectURL(url);
        
        // Logger l'action
        ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'download_version', {
            versionId: versionId
        });
        
        loadLogs(); // Rafraîchir les logs
    }
}

// Effacer tous les logs
document.getElementById('clearLogs').addEventListener('click', function() {
    if (!confirm('⚠️ Êtes-vous sûr de vouloir effacer TOUS les logs ?\n\nCette action est irréversible.')) {
        return;
    }
    
    localStorage.removeItem('connection_logs');
    ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'clear_logs');
    loadLogs();
    alert('✅ Tous les logs ont été effacés.');
});

// Exporter les logs
document.getElementById('exportLogs').addEventListener('click', function() {
    const logs = ADMIN_CONFIG.getLogs();
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `logs-${timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'export_logs');
    loadLogs();
});

// Exporter les versions
document.getElementById('exportVersions').addEventListener('click', function() {
    const versions = ADMIN_CONFIG.getMapVersions();
    const jsonStr = JSON.stringify(versions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `versions-${timestamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'export_versions');
    loadLogs();
});

// Charger les données au démarrage
loadLogs();
loadVersions();

// Rafraîchir toutes les 10 secondes
setInterval(() => {
    loadLogs();
    loadVersions();
}, 10000);
