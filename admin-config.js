// Configuration des administrateurs autorisés
// Remplacez ces IDs par les vrais IDs Discord des admins

const ADMIN_CONFIG = {
    // Liste des IDs Discord autorisés
    adminIds: [
        '772821169664426025', // Votre ID Discord
        // Ajoutez d'autres IDs ici
    ],
    
    // Vérifier si un utilisateur est admin
    isAdmin: function(userId) {
        return this.adminIds.includes(userId);
    },
    
    // Enregistrer un log de connexion
    logConnection: function(user) {
        const logs = this.getLogs();
        const logEntry = {
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            timestamp: new Date().toISOString(),
            action: 'login'
        };
        logs.push(logEntry);
        localStorage.setItem('connection_logs', JSON.stringify(logs));
    },
    
    // Récupérer tous les logs
    getLogs: function() {
        const logs = localStorage.getItem('connection_logs');
        return logs ? JSON.parse(logs) : [];
    },
    
    // Enregistrer une action
    logAction: function(userId, username, action, details = {}) {
        const logs = this.getLogs();
        const logEntry = {
            userId: userId,
            username: username,
            timestamp: new Date().toISOString(),
            action: action,
            details: details
        };
        logs.push(logEntry);
        localStorage.setItem('connection_logs', JSON.stringify(logs));
    },
    
    // Sauvegarder une version de la carte
    saveMapVersion: function(mapData, userId, username) {
        const versions = this.getMapVersions();
        const version = {
            id: Date.now(),
            mapData: mapData,
            savedBy: username,
            userId: userId,
            timestamp: new Date().toISOString()
        };
        versions.push(version);
        localStorage.setItem('map_versions', JSON.stringify(versions));
        return version.id;
    },
    
    // Récupérer toutes les versions
    getMapVersions: function() {
        const versions = localStorage.getItem('map_versions');
        return versions ? JSON.parse(versions) : [];
    },
    
    // Restaurer une version
    restoreMapVersion: function(versionId) {
        const versions = this.getMapVersions();
        const version = versions.find(v => v.id === versionId);
        return version ? version.mapData : null;
    }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN_CONFIG;
}
