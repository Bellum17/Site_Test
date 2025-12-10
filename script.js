// --- 1. Initialisation de la carte ---
// On cible la div avec l'id 'maCarte'
// Coordonnées approximatives du centre de l'Égypte [Latitude, Longitude] et niveau de zoom (6)
var map = L.map('maCarte').setView([26.8206, 30.8025], 6);


// --- 2. Ajout du fond de carte (Tiles) ---
// Nous utilisons OpenStreetMap (gratuit)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// --- 3. Ajout d'éléments variés ---

// ELEMENT A : Un marqueur classique (Le Caire)
var caireMarker = L.marker([30.0444, 31.2357]).addTo(map);
// On ajoute une popup qui s'ouvre au clic
caireMarker.bindPopup("<b>Le Caire</b><br>Capitale de l'Égypte.");


// ELEMENT B : Un cercle (Zone des Pyramides de Gizeh)
// Le cercle est défini par son centre, son rayon en mètres, et sa couleur
var gizaCircle = L.circle([29.9792, 31.1342], {
    color: '#d4af37', // Couleur or pour le contour
    fillColor: '#d4af37', // Couleur de remplissage
    fillOpacity: 0.5,     // Transparence
    radius: 5000          // Rayon de 5km autour des pyramides
}).addTo(map);
gizaCircle.bindPopup("<b>Nécropole de Gizeh</b><br>Zone des grandes pyramides.");


// ELEMENT C : Un polygone (Le Delta du Nil - forme approximative)
// Un polygone est une série de points reliés entre eux
var deltaPolygon = L.polygon([
    [31.25, 29.9], // Point Nord-Ouest (Alexandrie approx)
    [31.3, 32.3],  // Point Nord-Est (Port-Saïd approx)
    [30.1, 31.2]   // Point Sud (Pointe du delta près du Caire)
], {
    color: 'green',
    fillColor: '#aaddaa',
    fillOpacity: 0.4
}).addTo(map);
deltaPolygon.bindPopup("<b>Delta du Nil</b><br>Zone agricole fertile.");


// ELEMENT D : Un marqueur circulaire (Vallée des Rois / Louxor)
// Similaire à un cercle, mais sa taille reste fixe quel que soit le zoom
var luxorMarker = L.circleMarker([25.7402, 32.6014], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.8,
    radius: 10 // Taille fixe en pixels
}).addTo(map);
luxorMarker.bindPopup("<b>Louxor & Vallée des Rois</b><br>Haut lieu archéologique.");