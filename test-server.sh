#!/bin/bash

# Script de test local pour vérifier les URLs sans .html

echo "🚀 Démarrage du serveur de test local..."
echo ""
echo "📍 URLs disponibles :"
echo "   - http://localhost:8000/accueil"
echo "   - http://localhost:8000/carte"
echo "   - http://localhost:8000/editeur"
echo "   - http://localhost:8000/panel"
echo ""
echo "⚠️  Note : Les URLs sans .html ne fonctionneront qu'une fois déployé sur GitHub Pages"
echo "    En local, utilisez : http://localhost:8000/accueil.html"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

python3 -m http.server 8000
