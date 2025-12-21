// Authentification Discord pour map.html
const DISCORD_CLIENT_ID = '1452413073326346321';
const DISCORD_REDIRECT_URI = 'https://bellum17.github.io/kingdomofnile/carte';
const DISCORD_OAUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=token&scope=identify`;

// Éléments DOM
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');

// Vérifier si l'utilisateur est déjà connecté
function checkAuth() {
    const token = localStorage.getItem('discord_token');
    const userData = localStorage.getItem('current_user');
    if (token && userData) {
        const user = JSON.parse(userData);
        displayUser(user);
    } else if (token) {
        fetchUserInfo(token);
    }
}

// Récupérer les informations de l'utilisateur
async function fetchUserInfo(token) {
    try {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('current_user', JSON.stringify(user));
            displayUser(user);
            ADMIN_CONFIG.logConnection(user);
        } else {
            localStorage.removeItem('discord_token');
            localStorage.removeItem('current_user');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        localStorage.removeItem('discord_token');
    }
}

// Afficher les informations de l'utilisateur
function displayUser(user) {
    const avatarUrl = user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';
    
    userAvatar.src = avatarUrl;
    userName.textContent = user.username;
    
    loginBtn.style.display = 'none';
    userInfo.classList.remove('hidden');
}

// Connexion
loginBtn.addEventListener('click', () => {
    window.location.href = DISCORD_OAUTH_URL;
});

// Déconnexion
logoutBtn.addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    if (currentUser) {
        ADMIN_CONFIG.logAction(currentUser.id, currentUser.username, 'logout');
    }
    localStorage.removeItem('discord_token');
    localStorage.removeItem('current_user');
    loginBtn.style.display = 'flex';
    userInfo.classList.add('hidden');
});

// Gérer le retour OAuth2
function handleOAuthCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
        localStorage.setItem('discord_token', token);
        window.location.hash = '';
        fetchUserInfo(token);
    }
}

// Initialisation
handleOAuthCallback();
checkAuth();
