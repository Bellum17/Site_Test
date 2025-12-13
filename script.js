// --- 1. Initialisation de la carte ---
// Carte centrée sur la région 39 (Nord de l'Égypte - Delta du Nil)
// Définition des limites pour toute l'Égypte
var southWest = L.latLng(22.0, 25.0);  // Coin sud-ouest (frontière soudanaise)
var northEast = L.latLng(31.8, 35.0);  // Coin nord-est (Sinaï)
var bounds = L.latLngBounds(southWest, northEast);

// Initialisation de la carte avec restrictions
var map = L.map('maCarte', {
    center: [30.5, 31.2],
    zoom: 9,
    minZoom: 6,
    maxZoom: 14,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0  // Empêche de sortir des limites
}).setView([30.5, 31.2], 9);


// --- 2. Ajout du fond de carte (Tiles) ---
// Nous utilisons OpenStreetMap (gratuit)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// --- 3. Icônes personnalisées ---

// Icône de gouvernement (GOV)
var govIcon = L.icon({
    iconUrl: 'images/icon_gov_rdn.png',
    iconSize: [60, 50],        // Taille de l'icône (largeur x hauteur) - format rectangulaire
    iconAnchor: [30, 50],      // Point d'ancrage (centré en bas)
    popupAnchor: [0, -50]      // Position de la popup
});

// Groupe de calques pour les symboles gouvernementaux
var gouvernementLayer = L.layerGroup();

// Placement au Caire
var caireGov = L.marker([30.0444, 31.2357], {icon: govIcon});
caireGov.bindPopup("<b>Le Caire</b><br>Capitale du Royaume du Nil<br><span style='color:#87CEEB'>● Gouvernement</span>");
gouvernementLayer.addLayer(caireGov);

// Ajouter le groupe à la carte par défaut
gouvernementLayer.addTo(map);


// --- 4. Légende de la carte ---
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<h4>Légende</h4>';
    div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: #80e0ff;"></span> Symboles Gouvernementaux</div>';
    return div;
};

legend.addTo(map);


// --- 5. Système de placement d'unités militaires ---
var militaryUnitsLayer = L.layerGroup().addTo(map);
var selectedUnit = null;
var placedUnits = [];

// Fonction pour créer une icône d'unité militaire
function createMilitaryIcon(symbol, unitType) {
    var iconHtml = `
        <div style="
            background-color: #000;
            border: 3px solid #0f0;
            border-radius: 5px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #0f0;
            font-weight: bold;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
            cursor: pointer;
        ">
            ${symbol}
        </div>
    `;
    
    return L.divIcon({
        html: iconHtml,
        className: 'military-unit-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

// Sélection d'une unité
const unitButtons = document.querySelectorAll('.unit-btn');
unitButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Désélectionner toutes les autres unités
        unitButtons.forEach(b => b.classList.remove('selected'));
        
        // Sélectionner cette unité
        this.classList.add('selected');
        selectedUnit = {
            type: this.dataset.unit,
            symbol: this.dataset.symbol,
            name: this.textContent.trim()
        };
        
        // Changer le curseur de la carte
        document.getElementById('maCarte').style.cursor = 'crosshair';
    });
});

// Placement d'unité sur la carte au clic
map.on('click', function(e) {
    if (selectedUnit) {
        var unitIcon = createMilitaryIcon(selectedUnit.symbol, selectedUnit.type);
        var marker = L.marker(e.latlng, {
            icon: unitIcon,
            draggable: true
        });
        
        // Popup avec informations
        marker.bindPopup(`
            <div style="text-align: center;">
                <b style="color: #0f0;">${selectedUnit.name}</b><br>
                <small>Position: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</small><br>
                <button onclick="removeUnit(${placedUnits.length})" style="
                    background: #ff0000;
                    color: #fff;
                    border: none;
                    padding: 5px 10px;
                    margin-top: 5px;
                    cursor: pointer;
                    border-radius: 3px;
                ">Supprimer</button>
            </div>
        `);
        
        marker.addTo(militaryUnitsLayer);
        placedUnits.push({
            marker: marker,
            type: selectedUnit.type,
            name: selectedUnit.name
        });
        
        // Réinitialiser la sélection
        unitButtons.forEach(b => b.classList.remove('selected'));
        selectedUnit = null;
        document.getElementById('maCarte').style.cursor = '';
    }
});

// Fonction pour supprimer une unité spécifique
window.removeUnit = function(index) {
    if (placedUnits[index]) {
        militaryUnitsLayer.removeLayer(placedUnits[index].marker);
        placedUnits.splice(index, 1);
    }
};

// Bouton pour effacer toutes les unités
document.getElementById('clearUnits').addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les unités ?')) {
        militaryUnitsLayer.clearLayers();
        placedUnits = [];
    }
});


// --- 6. Menu Burger et Filtres ---
const burgerBtn = document.getElementById('burgerBtn');
const menuContent = document.getElementById('menuContent');
const filterGouvernement = document.getElementById('filterGouvernement');
const filterArmees = document.getElementById('filterArmees');

// Toggle du menu burger
burgerBtn.addEventListener('click', function() {
    menuContent.classList.toggle('menu-hidden');
});

// Filtre pour les symboles gouvernementaux
filterGouvernement.addEventListener('change', function() {
    if (this.checked) {
        gouvernementLayer.addTo(map);
    } else {
        map.removeLayer(gouvernementLayer);
    }
});

// Filtre pour les unités militaires
filterArmees.addEventListener('change', function() {
    if (this.checked) {
        militaryUnitsLayer.addTo(map);
    } else {
        map.removeLayer(militaryUnitsLayer);
    }
});