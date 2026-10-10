// --- Legacy Theme Database ---
const themes = {
    'default': { bg: '#e8e8e8' },
    'dark': { bg: '#2a2a2a' },
    'neon': { bg: '#0f0c1b' },
    'sage': { bg: '#e8f0e6' },
    'sunset': { bg: '#fdeed9' },
    'ocean': { bg: '#e0f2fe' },
    'midnight': { bg: '#18181b' },
    'berry': { bg: '#fce7f3' },
    'evil': { bg: '#1a0000' },
    'kind': { bg: '#f0fdf4' },
    'allred': { bg: '#7f1d1d' },
    'allblue': { bg: '#0c4a6e' },
    'miku': { bg: '#e0f7f6', mascotImg: '/assets/IMG_0155.png' },
    'teto': { bg: '#fde8ee', mascotImg: '/assets/IMG_0156.png' },
    'rin':  { bg: '#fffbe6', mascotImg: '/assets/IMG_0154.png' },
    'gumi': { bg: '#f0f0f4', mascotImg: '/assets/IMG_0158.webp' },
    'madobe': { bg: '#1a1a24', bgImg: '/assets/IMG_0121.png' },
    'dylan': { bg: '#181825', bgImg: '/assets/IMG_0122.gif' },
    'jakejunior': { bg: '#111111', bgImg: '/assets/IMG_0430.webp' },
    'halloween': { bg: '#170a1c' },
    'christmas': { bg: '#0b2033' },
    'bleach': { bg: '#050505', mascotImg: '/assets/IMG_0521.webp' },
    'blue exorcist': { bg: '#02040a', mascotImg: '/assets/IMG_0522.webp' },
    'assassination classroom': { bg: '#1b3322', mascotImg: '/assets/IMG_0523.webp' },
    'win98teal': { bg: '#008080' } 
};

// --- Populate Theme Window Dynamically ---
const themeListContainer = document.getElementById('theme-list');
for (const [key, theme] of Object.entries(themes)) {
    const row = document.createElement('div');
    row.className = 'field-row';
    row.innerHTML = `
        <input type="radio" id="theme-${key}" name="theme" value="${key}" onclick="setLegacyTheme('${key}')">
        <label for="theme-${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
    `;
    themeListContainer.appendChild(row);
}

// --- Apply Legacy Theme Logic ---
function setLegacyTheme(themeName) {
    const t = themes[themeName];
    
    // Handle background color and image
    if (t.bgImg) {
        document.body.style.backgroundImage = `url('${t.bgImg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundColor = t.bg || '#000';
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = t.bg;
    }

    // Handle mascots
    const mascot = document.getElementById('desktop-mascot');
    if (t.mascotImg) {
        mascot.src = t.mascotImg;
        mascot.style.display = 'block';
    } else {
        mascot.style.display = 'none';
        mascot.src = '';
    }

    // Save the selected theme to local storage
    localStorage.setItem('webstring_98_theme', themeName);
}

// --- Taskbar Clock ---
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);

// --- Window Management ---
let highestZ = 10;
function bringToFront(element) {
  highestZ++;
  element.style.zIndex = highestZ;
}

function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = 'block';
  bringToFront(win);
}

function closeWindow(id) {
  document.getElementById(id).style.display = 'none';
  if(id === 'gamePlayerWindow') {
    document.getElementById('gameFrame').src = ''; // Stops audio
  }
}

// --- Game Player Logic ---
function playGame(url, title) {
  document.getElementById('gameTitle').innerText = title + " - WebString 98";
  document.getElementById('gameFrame').src = url;
  openWindow('gamePlayerWindow');
}

let isMaximized = false;
let preMaxState = {};
function maximizeGame() {
  const win = document.getElementById('gamePlayerWindow');
  if(isMaximized) {
    win.style.width = preMaxState.width;
    win.style.height = preMaxState.height;
    win.style.top = preMaxState.top;
    win.style.left = preMaxState.left;
    isMaximized = false;
  } else {
    preMaxState = { width: win.style.width, height: win.style.height, top: win.style.top, left: win.style.left };
    win.style.width = '100vw';
    win.style.height = 'calc(100vh - 35px)';
    win.style.top = '0';
    win.style.left = '0';
    isMaximized = true;
  }
}

// --- Drag & Drop Mechanics ---
function makeDraggable(windowId, headerId) {
  const win = document.getElementById(windowId);
  const header = document.getElementById(headerId);
  let isDragging = false, startX, startY, initialX, initialY;

  header.onmousedown = (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = win.offsetLeft;
    initialY = win.offsetTop;
    bringToFront(win);
  };

  document.onmousemove = (e) => {
    if (!isDragging || (isMaximized && windowId === 'gamePlayerWindow')) return;
    win.style.left = initialX + (e.clientX - startX) + 'px';
    win.style.top = initialY + (e.clientY - startY) + 'px';
  };

  document.onmouseup = () => isDragging = false;
}

makeDraggable('gamesWindow', 'gamesWindowHeader');
makeDraggable('themesWindow', 'themesWindowHeader');
makeDraggable('gamePlayerWindow', 'gamePlayerWindowHeader');

// --- Initialization ---
openWindow('gamesWindow');

// Load saved theme or fallback to default
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('webstring_98_theme') || 'default';
    setLegacyTheme(savedTheme);
    
    // Check the radio button corresponding to the saved theme visually
    const themeRadio = document.getElementById(`theme-${savedTheme}`);
    if (themeRadio) {
        themeRadio.checked = true;
    }
});
