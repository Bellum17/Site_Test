// --- 1. Initialisation de la carte ---
// Carte centrée sur la région 39 (Nord de l'Égypte - Delta du Nil)
// Définition des limites pour toute l'Égypte
var southWest = L.latLng(22.0, 25.0);  // Coin sud-ouest (frontière soudanaise)
var northEast = L.latLng(31.8, 35.0);  // Coin nord-est (Sinaï)
var bounds = L.latLngBounds(southWest, northEast);

// Initialisation de la carte avec restrictions
var map = L.map('maCarte', {
    center: [30.5, 31.2],
    zoom: 7,
    minZoom: 6,
    maxZoom: 14,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0  // Empêche de sortir des limites
}).setView([30.5, 31.2], 7);


// --- 2. Ajout du fond de carte (Tiles) ---
// Nous utilisons OpenStreetMap (gratuit)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// --- 3. Icônes personnalisées ---

// Groupe de calques pour les unités
var unitsLayer = L.layerGroup();

// Définition des icônes d'unités (format rectangulaire)
const unitIcons = {
    'infanterie-motorisee': L.icon({
        iconUrl: 'images/Infanterie motorisee.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'cavalerie': L.icon({
        iconUrl: 'images/Cavalerie.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'infanterie-legere': L.icon({
        iconUrl: 'images/Infanterie legere.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'garde-royale': L.icon({
        iconUrl: 'images/Garde Royale.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'genie': L.icon({
        iconUrl: 'images/Genie.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'cdfa': L.icon({
        iconUrl: 'images/CDFA.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'commandement': L.icon({
        iconUrl: 'images/Commandement.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    }),
    'reserve': L.icon({
        iconUrl: 'images/Reserve.png',
        iconSize: [50, 35],
        iconAnchor: [25, 35],
        popupAnchor: [0, -35]
    })
};

const unitNames = {
    'infanterie-motorisee': 'Infanterie motorisée',
    'cavalerie': 'Cavalerie',
    'infanterie-legere': 'Infanterie légère',
    'garde-royale': 'Garde Royale',
    'genie': 'Unité du Génie',
    'cdfa': 'Commandement des Forces Armées',
    'commandement': 'Commandement',
    'reserve': 'Réserve d\'hommes'
};

// Charger la carte publiée si elle existe
const publishedMap = localStorage.getItem('published_map');
if (publishedMap) {
    try {
        const mapData = JSON.parse(publishedMap);
        
        // Restaurer la position de la carte
        if (mapData.center && mapData.zoom) {
            map.setView([mapData.center.lat, mapData.center.lng], mapData.zoom);
        }
        
        // Restaurer les unités
        if (mapData.units && mapData.units.length > 0) {
            mapData.units.forEach(function(unitData) {
                if (unitData.type === 'unit' && unitData.unitType) {
                    const unitIcon = unitIcons[unitData.unitType];
                    const unitName = unitNames[unitData.unitType];
                    
                    if (unitIcon) {
                        var marker = L.marker([unitData.latlng.lat, unitData.latlng.lng], {icon: unitIcon});
                        marker.bindPopup(`<b>${unitName}</b>`);
                        unitsLayer.addLayer(marker);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Erreur lors du chargement de la carte publiée:', error);
    }
}

// Ajouter les unités à la carte
unitsLayer.addTo(map);