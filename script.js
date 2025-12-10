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


// --- 3.5. Délimitations des régions d'Égypte ---

// Style des frontières régionales
var regionStyle = {
    color: '#0f0',
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.05,
    fillColor: '#0f0'
};

// Région 39 - Basse-Égypte / Delta du Nil (PETIT triangle au nord)
var region39 = L.polygon([
    [31.35, 30.30],  // Nord-Ouest (Alexandrie)
    [31.25, 31.80],  // Nord-Est (Damiette)
    [30.50, 31.60],  // Est (Mansoura)
    [30.05, 31.25],  // Sud-Est (Le Caire)
    [30.20, 30.60]   // Sud-Ouest (Gizeh-ouest)
], regionStyle).addTo(map);
region39.bindPopup("<b>Région 39</b><br>Basse-Égypte / Delta du Nil");

// Région 38 - Béheira (bande côtière OUEST, à gauche du delta)
var region38 = L.polygon([
    [31.50, 28.90],  // Nord (côte ouest)
    [31.35, 30.30],  // Est (frontière avec 39 - Alexandrie)
    [30.20, 30.60],  // Sud-Est
    [30.20, 29.00]   // Sud-Ouest
], regionStyle).addTo(map);
region38.bindPopup("<b>Région 38</b><br>Béheira");

// Région 42 - El Fayoum (petite POCHE à l'ouest, isolée)
var region42 = L.polygon([
    [29.50, 29.80],  // Nord
    [29.70, 30.70],  // Est
    [29.30, 31.00],  // Sud-Est
    [29.00, 30.50]   // Sud-Ouest
], regionStyle).addTo(map);
region42.bindPopup("<b>Région 42</b><br>El Fayoum");

// Région 37 - Moyenne-Égypte (GRANDE zone centrale)
var region37 = L.polygon([
    [30.20, 30.60],  // Nord-Ouest (sous delta)
    [30.05, 31.25],  // Nord-Est (Le Caire)
    [29.80, 31.40],  // Est (Beni Suef)
    [27.30, 31.15],  // Sud-Est (Assiout)
    [27.00, 30.70],  // Sud
    [27.20, 29.90],  // Sud-Ouest
    [29.00, 30.50],  // Ouest (frontière Fayoum)
    [29.50, 29.80],  // Nord-Ouest (Fayoum nord)
    [30.20, 29.00]   // Nord-Ouest côte
], regionStyle).addTo(map);
region37.bindPopup("<b>Région 37</b><br>Moyenne-Égypte");

// Région 35 - Désert Oriental (bande EST entre Nil et Mer Rouge)
var region35 = L.polygon([
    [30.05, 31.25],  // Nord-Ouest (Le Caire)
    [30.50, 31.60],  // Nord (delta est)
    [30.00, 32.55],  // Nord-Est (Suez)
    [28.45, 33.35],  // Est
    [26.80, 33.25],  // Sud-Est
    [26.10, 32.80],  // Sud (Qena)
    [27.00, 30.70],  // Sud-Ouest
    [27.30, 31.15],  // Ouest (Assiout)
    [29.80, 31.40]   // Nord-Ouest (Beni Suef)
], regionStyle).addTo(map);
region35.bindPopup("<b>Région 35</b><br>Désert Oriental");

// Région 40 - Suez (PETITE zone canal, entre 39 et Sinaï)
var region40 = L.polygon([
    [30.50, 31.60],  // Ouest (delta est)
    [31.25, 31.80],  // Nord (Damiette/Port-Saïd)
    [31.00, 32.35],  // Nord-Est (Ismaïlia)
    [30.00, 32.55]   // Sud (Suez ville)
], regionStyle).addTo(map);
region40.bindPopup("<b>Région 40</b><br>Suez");

// Région 41 - Nord Sinaï (triangle au nord du Sinaï)
var region41 = L.polygon([
    [31.25, 31.80],  // Ouest (Port-Saïd)
    [31.10, 34.20],  // Est (frontière)
    [30.85, 34.00],  // Sud-Est
    [31.00, 32.35]   // Sud-Ouest (Ismaïlia)
], regionStyle).addTo(map);
region41.bindPopup("<b>Région 41</b><br>Nord Sinaï");

// Région 43 - Sud Sinaï (grande partie sud de la péninsule)
var region43 = L.polygon([
    [31.00, 32.35],  // Nord-Ouest (Ismaïlia)
    [30.85, 34.00],  // Nord
    [29.50, 34.90],  // Nord-Est
    [28.00, 34.50],  // Est (Sharm)
    [27.90, 33.85],  // Sud
    [28.45, 33.35],  // Sud-Ouest
    [30.00, 32.55]   // Ouest (Suez)
], regionStyle).addTo(map);
region43.bindPopup("<b>Région 43</b><br>Sud Sinaï");

// Région 36 - Haute-Égypte (sud le long du Nil, de Sohag à Assouan)
var region36 = L.polygon([
    [27.00, 30.70],  // Nord
    [26.10, 32.80],  // Nord-Est (Qena)
    [25.70, 32.65],  // Est (Louxor)
    [24.10, 32.90],  // Sud-Est (Assouan)
    [24.05, 32.35],  // Sud
    [25.50, 31.50],  // Sud-Ouest
    [26.50, 30.30],  // Ouest
    [27.20, 29.90]   // Nord-Ouest
], regionStyle).addTo(map);
region36.bindPopup("<b>Région 36</b><br>Haute-Égypte");

// Région 44 - Mer Rouge (bande côtière est le long de la Mer Rouge)
var region44 = L.polygon([
    [26.80, 33.25],  // Nord
    [28.45, 33.35],  // Nord-Est
    [27.90, 33.85],  // Est
    [28.00, 34.50],  // Est (Sharm)
    [25.50, 35.25],  // Sud-Est
    [24.70, 35.05],  // Sud
    [24.05, 32.35],  // Sud-Ouest
    [24.10, 32.90],  // Ouest
    [25.70, 32.65],  // Ouest
    [26.10, 32.80]   // Ouest nord
], regionStyle).addTo(map);
region44.bindPopup("<b>Région 44</b><br>Mer Rouge");


// --- 4. Légende de la carte ---
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<h4>Légende</h4>';
    div.innerHTML += '<div class="legend-item"><span class="legend-color" style="background-color: #80e0ff;"></span> Symboles Gouvernementaux</div>';
    return div;
};

legend.addTo(map);


// --- 5. Menu Burger et Filtres ---
const burgerBtn = document.getElementById('burgerBtn');
const menuContent = document.getElementById('menuContent');
const filterGouvernement = document.getElementById('filterGouvernement');

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