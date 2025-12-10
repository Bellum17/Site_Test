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

// Région 39 - Basse-Égypte / Delta du Nil (au nord, petit triangle)
var region39 = L.polygon([
    [31.45, 31.35],  // Damiette (Nord-Est)
    [31.50, 29.95],  // Alexandrie (Nord-Ouest)
    [30.85, 30.15],  // Tanta (Centre)
    [30.05, 31.25],  // Le Caire (Sud-Est)
    [30.00, 30.85]   // Gizeh (Sud-Ouest)
], regionStyle).addTo(map);
region39.bindPopup("<b>Région 39</b><br>Basse-Égypte / Delta du Nil");

// Région 38 - À l'ouest de la région 39 (petite zone ouest du delta)
var region38 = L.polygon([
    [31.50, 29.95],  // Nord (côte)
    [31.20, 28.80],  // Ouest
    [30.50, 29.00],  // Sud-Ouest
    [30.00, 30.85],  // Sud-Est (frontière avec 39)
    [30.85, 30.15]   // Est
], regionStyle).addTo(map);
region38.bindPopup("<b>Région 38</b><br>Gouvernorat de Béheira");

// Région 37 - Grande zone centrale (Moyenne-Égypte, de Gizeh à Assiout)
var region37 = L.polygon([
    [30.05, 31.25],  // Nord-Est (Le Caire)
    [30.00, 30.85],  // Nord-Ouest (Gizeh)
    [30.50, 29.00],  // Ouest
    [28.50, 29.50],  // Sud-Ouest
    [27.20, 31.10],  // Sud-Est (Assiout)
    [29.85, 31.35]   // Est (Beni Suef)
], regionStyle).addTo(map);
region37.bindPopup("<b>Région 37</b><br>Moyenne-Égypte");

// Région 36 - Haute-Égypte (de Sohag à Assouan, grande zone sud centrale)
var region36 = L.polygon([
    [27.20, 31.10],  // Nord (Assiout)
    [28.50, 29.50],  // Nord-Ouest
    [26.00, 29.80],  // Ouest
    [24.10, 32.30],  // Sud (Assouan)
    [26.20, 32.70]   // Sud-Est (Louxor)
], regionStyle).addTo(map);
region36.bindPopup("<b>Région 36</b><br>Haute-Égypte");

// Région 42 - Centre-Ouest (petite zone entre 37 et 39, au sud immédiat du Caire)
var region42 = L.polygon([
    [30.05, 31.25],  // Nord (Le Caire)
    [29.85, 31.35],  // Est
    [29.50, 31.80],  // Sud-Est
    [29.00, 31.50],  // Sud
    [29.20, 30.95]   // Ouest
], regionStyle).addTo(map);
region42.bindPopup("<b>Région 42</b><br>Gouvernorat du Fayoum");

// Région 35 - Désert Oriental (longue bande est, le long de la Mer Rouge nord)
var region35 = L.polygon([
    [30.05, 31.25],  // Nord-Ouest (Le Caire)
    [31.45, 31.35],  // Nord (Damiette)
    [30.60, 32.35],  // Nord-Est (Ismaïlia)
    [29.50, 32.55],  // Suez
    [27.50, 33.25],  // Centre-Est
    [26.20, 32.70],  // Sud (Louxor)
    [27.20, 31.10],  // Sud-Ouest (Assiout)
    [29.85, 31.35]   // Ouest
], regionStyle).addTo(map);
region35.bindPopup("<b>Région 35</b><br>Désert Oriental");

// Région 41 - Nord Sinaï (au nord de la péninsule du Sinaï)
var region41 = L.polygon([
    [31.30, 32.20],  // Ouest (Port-Saïd)
    [31.10, 34.25],  // Est (frontière)
    [30.85, 34.20],  // Sud-Est
    [30.60, 32.35]   // Sud-Ouest (Ismaïlia)
], regionStyle).addTo(map);
region41.bindPopup("<b>Région 41</b><br>Nord Sinaï");

// Région 40 - Suez (petite zone autour du canal de Suez)
var region40 = L.polygon([
    [30.60, 32.35],  // Nord (Ismaïlia)
    [31.30, 32.20],  // Nord-Ouest (Port-Saïd)
    [31.45, 31.35],  // Ouest (côte)
    [30.05, 31.25],  // Sud-Ouest (Le Caire)
    [29.50, 32.55]   // Sud (Suez)
], regionStyle).addTo(map);
region40.bindPopup("<b>Région 40</b><br>Gouvernorat de Suez");

// Région 43 - Sud Sinaï (pointe sud de la péninsule)
var region43 = L.polygon([
    [30.60, 32.35],  // Nord-Ouest (Ismaïlia)
    [30.85, 34.20],  // Nord-Est
    [29.50, 34.95],  // Est (Sharm el-Sheikh)
    [28.20, 34.50],  // Sud-Est (pointe)
    [28.00, 33.80],  // Sud
    [29.50, 32.55]   // Ouest (Suez)
], regionStyle).addTo(map);
region43.bindPopup("<b>Région 43</b><br>Sud Sinaï");

// Région 44 - Mer Rouge (longue bande côtière est, au sud)
var region44 = L.polygon([
    [27.50, 33.25],  // Nord
    [28.00, 33.80],  // Nord-Est
    [28.20, 34.50],  // Est (pointe Sinaï)
    [26.00, 34.85],  // Sud-Est (Marsa Alam)
    [24.70, 35.00],  // Sud (frontière soudanaise)
    [24.10, 32.30],  // Sud-Ouest (Assouan)
    [26.20, 32.70]   // Ouest (Louxor)
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