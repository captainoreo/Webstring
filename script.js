let isJakeJuniorActive = false;

// --- Inject Custom Persona Fonts Dynamically ---
const customFontStyles = document.createElement('style');
customFontStyles.innerHTML = `
    @font-face {
        font-family: 'Persona5Font';
        src: url('/assets/Persona5MenuFontPrototype-Regular.ttf') format('truetype');
    }
    @font-face {
        font-family: 'P5HattyFont';
        src: url('/assets/p5hatty-1.ttf') format('truetype');
    }

    /* Apply p5hatty-1.ttf across the site when any Persona theme is active */
    body.theme-persona5, body.theme-persona4, body.theme-persona3,
    body.theme-persona5 button, body.theme-persona4 button, body.theme-persona3 button, 
    body.theme-persona5 input, body.theme-persona4 input, body.theme-persona3 input, 
    body.theme-persona5 select, body.theme-persona4 select, body.theme-persona3 select,
    body.theme-persona5 .theme-menu, body.theme-persona4 .theme-menu, body.theme-persona3 .theme-menu,
    body.theme-persona5 .player-bar, body.theme-persona4 .player-bar, body.theme-persona3 .player-bar {
        font-family: 'P5HattyFont', sans-serif !important;
    }

    /* Specifically change only the clock font to Persona5MenuFontPrototype-Regular.ttf for Persona themes */
    body.theme-persona5 .time-date .time, body.theme-persona4 .time-date .time, body.theme-persona3 .time-date .time,
    body.theme-persona5 .time-date .date, body.theme-persona4 .time-date .date, body.theme-persona3 .time-date .date {
        font-family: 'Persona5Font', sans-serif !important;
    }
`;
document.head.appendChild(customFontStyles);

// --- Live Clock Functionality ---
function updateClock() {
    if (isJakeJuniorActive) {
        document.getElementById('clock-time').innerHTML = 'Jake junior';
        document.getElementById('clock-date').innerText = 'Jake junior';
        return;
    }

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[now.getDay()];
    const month = now.getMonth() + 1; 
    const date = now.getDate();
    
    document.getElementById('clock-time').innerHTML = `${hours} ${minutes} <span class="am">${ampm}</span>`;
    document.getElementById('clock-date').innerText = `${dayName} ${month}/${date}`;
}

updateClock();
setInterval(updateClock, 1000);

// --- Speech Bubble Functionality ---
function initSpeechBubbles() {
    document.querySelectorAll('.channel').forEach(ch => {
        if (isJakeJuniorActive) {
            let bubble = ch.querySelector('.speech-bubble');
            if (!bubble) {
                bubble = document.createElement('div');
                bubble.className = 'speech-bubble';
                ch.appendChild(bubble);
            }
            bubble.textContent = 'Jake junior';
            return;
        }

        if (!ch.classList.contains('empty') && !ch.querySelector('.speech-bubble')) {
            const img = ch.querySelector('img');
            const title = img ? img.alt : '';
            if (title) {
                const bubble = document.createElement('div');
                bubble.className = 'speech-bubble';
                bubble.textContent = title;
                ch.appendChild(bubble);

                if (title === 'TIME FCUK') {
                    setInterval(() => {
                        const chars = ['F', 'C', 'U', 'K'];
                        let scrambledFcuk = 'Fcuk'.split('').map(char => {
                            const randomChar = chars[Math.floor(Math.random() * chars.length)];
                            return char === char.toUpperCase() ? randomChar.toUpperCase() : randomChar;
                        }).join('');
                        bubble.textContent = 'Time ' + scrambledFcuk;
                    }, 80);
                }
            }
        }
    });
}

// --- Page Logic (4x3 Grid - 10 Pages Total) ---
let currentPage = 0;
const totalPages = 10;

function renderDots() {
    const dotsContainer = document.getElementById('page-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === currentPage ? 'active' : ''}`;
        dot.onclick = () => goToPage(i);
        dotsContainer.appendChild(dot);
    }
}

function updatePaginationUI() {
    document.querySelectorAll('.pages-container .grid').forEach((grid, idx) => {
        grid.classList.toggle('active', idx === currentPage);
    });

    document.getElementById('prev-btn').style.display = currentPage === 0 ? 'none' : 'block';
    document.getElementById('next-btn').style.display = currentPage === totalPages - 1 ? 'none' : 'block';

    document.querySelectorAll('.page-dots .dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentPage);
    });

    // Re-trigger active physics modifiers when changing pages
    if (activeModifiers.gravity) {
        stopGravityEngine();
        startGravityEngine();
    } else if (activeModifiers.tetris) {
        stopTetrisEngine();
        startTetrisEngine();
    } else if (activeModifiers.bubbles) {
        stopBubblesEngine();
        startBubblesEngine();
    }
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 0 && newPage < totalPages) {
        currentPage = newPage;
        updatePaginationUI();
    }
}

function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
        currentPage = pageIndex;
        updatePaginationUI();
    }
}

// --- Search Bar Functionality ---
function handleSearch() {
    const query = document.getElementById('game-search').value.toLowerCase().trim();
    const searchGrid = document.getElementById('search-results-grid');
    const pageGrids = document.querySelectorAll('.pages-container .grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageDots = document.getElementById('page-dots');

    if (query === '' || isJakeJuniorActive) {
        searchGrid.style.display = 'none';
        searchGrid.innerHTML = '';
        pageGrids.forEach((g, idx) => {
            g.classList.toggle('active', idx === currentPage);
        });
        pageDots.style.display = 'flex';
        updatePaginationUI();
        return;
    }

    pageGrids.forEach(g => g.classList.remove('active'));
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    pageDots.style.display = 'none';

    searchGrid.innerHTML = '';
    searchGrid.style.display = 'grid';

    const allChannels = document.querySelectorAll('.pages-container .channel:not(.empty)');
    let matchCount = 0;

    allChannels.forEach(ch => {
        const img = ch.querySelector('img');
        const title = img ? img.alt.toLowerCase() : '';
        if (title.includes(query)) {
            const clone = ch.cloneNode(true);
            clone.style.transform = '';
            clone.style.position = '';
            clone.style.left = '';
            clone.style.top = '';
            searchGrid.appendChild(clone);
            matchCount++;
        }
    });

    if (matchCount === 0) {
        searchGrid.innerHTML = '<div style="grid-column: 1 / -1; color: #777; font-size: 1.2rem; margin-top: 30px; text-align: center;">No games found.</div>';
    } else {
        initSpeechBubbles();
    }
}

// --- Toggle Hide Games Mode ---
function toggleHideGameScreen() {
    const screen = document.querySelector('.screen');
    const btn = document.getElementById('hide-game-btn');
    
    screen.classList.toggle('games-hidden');

    if (screen.classList.contains('games-hidden')) {
        btn.innerHTML = isJakeJuniorActive ? 'Jake junior' : '👁️ Show Games';
    } else {
        btn.innerHTML = isJakeJuniorActive ? 'Jake junior' : '🙈 Hide Games';
    }
}

// --- Modal Toggles ---
function closeAllModals(exceptId) {
    const modals = ['theme-menu', 'settings-menu', 'recommendation-modal', 'credits-modal', 'music-menu', 'modifiers-menu'];
    modals.forEach(id => {
        if (id !== exceptId) {
            const el = document.getElementById(id);
            if (el) el.classList.remove('active');
        }
    });
}

function recommendGame() {
    const allChannels = Array.from(document.querySelectorAll('.pages-container .channel:not(.empty)'));
    if (allChannels.length === 0) return;

    const randomGame = allChannels[Math.floor(Math.random() * allChannels.length)];
    const img = randomGame.querySelector('img');
    const title = isJakeJuniorActive ? 'Jake junior' : (img ? img.alt : 'Random Game');
    const imgSrc = isJakeJuniorActive ? '/assets/IMG_0430.webp' : (img ? img.src : '');
    const href = randomGame.getAttribute('href');

    const card = document.getElementById('recommendation-card');
    const escapedTitle = title.replace(/'/g, "\\'");
    card.innerHTML = `
        <img src="${imgSrc}" alt="${title}">
        <h4 style="font-size: 1.2rem; color: #333; border: none; text-align: center;">${title}</h4>
        <button class="play-btn" onclick="openGamePlayer('${href}', '${escapedTitle}'); toggleRecommendationModal();">${isJakeJuniorActive ? 'Jake junior' : 'Play Now'}</button>
    `;

    closeAllModals('recommendation-modal');
    document.getElementById('recommendation-modal').classList.add('active');
}

function toggleRecommendationModal() {
    document.getElementById('recommendation-modal').classList.toggle('active');
}

function toggleThemeMenu() {
    closeAllModals('theme-menu');
    document.getElementById('theme-menu').classList.toggle('active');
}

function toggleSettingsMenu() {
    closeAllModals('settings-menu');
    document.getElementById('settings-menu').classList.toggle('active');
}

function toggleCreditsModal() {
    closeAllModals('credits-modal');
    document.getElementById('credits-modal').classList.toggle('active');
}

function toggleMusicMenu() {
    closeAllModals('music-menu');
    document.getElementById('music-menu').classList.toggle('active');
}

function toggleModifiersMenu() {
    closeAllModals('modifiers-menu');
    document.getElementById('modifiers-menu').classList.toggle('active');
}

// ==========================================
// --- FUN MODIFIERS SYSTEM ---
// ==========================================
const activeModifiers = {
    gravity: false,
    tetris: false,
    bubbles: false,
    mirror: false
};

let gravityAnimId = null;
let tetrisAnimId = null;
let bubblesAnimId = null;
let physicsItems = [];
let draggedPhysicsItem = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let dragVelX = 0;
let dragVelY = 0;

// Inject Modifiers UI & Effect Styles
const modifiersStyles = document.createElement('style');
modifiersStyles.innerHTML = `
    .modifiers-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        margin-top: 10px;
        text-align: left;
    }

    .modifier-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: rgba(0, 0, 0, 0.04);
        border: 2px solid #ddd;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;
    }

    .modifier-card:hover {
        border-color: var(--accent-color, #5ce1e6);
        transform: translateY(-2px);
    }

    .modifier-card.active {
        background: rgba(92, 225, 230, 0.15);
        border-color: var(--accent-color, #5ce1e6);
        box-shadow: 0 4px 12px rgba(92, 225, 230, 0.25);
    }

    body.theme-dark .modifier-card {
        background: rgba(255, 255, 255, 0.06);
        border-color: #444;
    }

    body.theme-dark .modifier-card.active {
        background: rgba(92, 225, 230, 0.2);
        border-color: var(--accent-color, #5ce1e6);
    }

    .mod-icon {
        font-size: 1.8rem;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    body.theme-dark .mod-icon {
        background: #222;
    }

    .mod-info {
        flex: 1;
    }

    .mod-title {
        font-weight: bold;
        font-size: 1rem;
        color: #222;
    }

    body.theme-dark .mod-title {
        color: #f0f0f0;
    }

    .mod-desc {
        font-size: 0.78rem;
        color: #666;
        margin-top: 2px;
    }

    body.theme-dark .mod-desc {
        color: #aaa;
    }

    .mod-status {
        font-size: 0.75rem;
        font-weight: bold;
        padding: 4px 10px;
        border-radius: 20px;
        background: #ccc;
        color: #333;
    }

    .modifier-card.active .mod-status {
        background: var(--accent-color, #5ce1e6);
        color: #000;
    }

    /* Mirror Modifier */
    body.mod-mirror .screen {
        transform: scaleX(-1);
    }

    /* Bubbles Modifier */
    body.mod-bubbles .channel {
        border-radius: 50% !important;
        aspect-ratio: 1 / 1;
        box-shadow: inset -6px -6px 15px rgba(0, 0, 0, 0.2),
                    inset 6px 6px 15px rgba(255, 255, 255, 0.8),
                    0 8px 20px rgba(92, 225, 230, 0.35) !important;
        border: 2px solid rgba(255, 255, 255, 0.75) !important;
        overflow: hidden;
    }

    body.mod-bubbles .channel img {
        border-radius: 50% !important;
        opacity: 0.9;
    }

    /* Tetris Row Flash Animation */
    @keyframes tetrisFlash {
        0% { filter: brightness(2.5) contrast(1.5); }
        100% { filter: brightness(1) contrast(1); }
    }
    .tetris-locked {
        animation: tetrisFlash 0.35s ease-out;
    }
`;
document.head.appendChild(modifiersStyles);

function getActiveChannels() {
    const searchGrid = document.getElementById('search-results-grid');
    if (searchGrid && searchGrid.style.display === 'grid') {
        return Array.from(searchGrid.querySelectorAll('.channel:not(.empty)'));
    }
    const activePage = document.querySelector('.pages-container .grid.active');
    return activePage ? Array.from(activePage.querySelectorAll('.channel:not(.empty)')) : [];
}

function updateModifierCardsUI() {
    Object.keys(activeModifiers).forEach(mod => {
        const isOn = activeModifiers[mod];
        const card = document.getElementById(`mod-card-${mod}`);
        const status = document.getElementById(`mod-status-${mod}`);
        if (card) card.classList.toggle('active', isOn);
        if (status) status.innerText = isOn ? 'ON' : 'OFF';
    });
}

function toggleModifier(modName) {
    const newState = !activeModifiers[modName];

    // Physics-based modes (gravity, tetris, bubbles) are mutually exclusive so they don't fight each other
    if (newState && ['gravity', 'tetris', 'bubbles'].includes(modName)) {
        if (activeModifiers.gravity) { activeModifiers.gravity = false; stopGravityEngine(); }
        if (activeModifiers.tetris) { activeModifiers.tetris = false; stopTetrisEngine(); }
        if (activeModifiers.bubbles) { activeModifiers.bubbles = false; stopBubblesEngine(); }
    }

    activeModifiers[modName] = newState;

    if (modName === 'mirror') {
        document.body.classList.toggle('mod-mirror', newState);
    } else if (modName === 'gravity') {
        if (newState) startGravityEngine();
        else stopGravityEngine();
    } else if (modName === 'tetris') {
        if (newState) startTetrisEngine();
        else stopTetrisEngine();
    } else if (modName === 'bubbles') {
        if (newState) startBubblesEngine();
        else stopBubblesEngine();
    }

    updateModifierCardsUI();
}

function resetAllModifiers() {
    activeModifiers.gravity = false;
    activeModifiers.tetris = false;
    activeModifiers.bubbles = false;
    activeModifiers.mirror = false;

    stopGravityEngine();
    stopTetrisEngine();
    stopBubblesEngine();
    document.body.classList.remove('mod-mirror', 'mod-bubbles');

    updateModifierCardsUI();
}

function clearPhysicsStyles() {
    document.querySelectorAll('.channel').forEach(ch => {
        ch.style.transform = '';
        ch.style.zIndex = '';
        ch.style.cursor = '';
        ch.classList.remove('tetris-locked');
    });
    physicsItems = [];
    draggedPhysicsItem = null;
}

// --- 1. GRAVITY ENGINE (Bounce + Click & Drag Toss) ---
function startGravityEngine() {
    clearPhysicsStyles();
    const channels = getActiveChannels();
    const screen = document.querySelector('.screen');
    const bottomBar = document.querySelector('.bottom-bar');
    const floorY = screen.clientHeight - (bottomBar ? bottomBar.offsetHeight : 90) - 10;

    physicsItems = channels.map(el => {
        const rect = el.getBoundingClientRect();
        const screenRect = screen.getBoundingClientRect();
        return {
            el,
            origLeft: rect.left - screenRect.left,
            origTop: rect.top - screenRect.top,
            width: rect.width,
            height: rect.height,
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 4,
            rot: 0,
            vRot: (Math.random() - 0.5) * 4,
            isDragging: false,
            wasDragged: false
        };
    });

    physicsItems.forEach(item => {
        item.el.style.zIndex = '50';
        item.el.style.cursor = 'grab';
        item.el.onmousedown = (e) => {
            e.preventDefault();
            draggedPhysicsItem = item;
            item.isDragging = true;
            item.wasDragged = false;
            item.el.style.cursor = 'grabbing';
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            dragOffsetX = e.clientX - item.x;
            dragOffsetY = e.clientY - item.y;
        };
    });

    function step() {
        if (!activeModifiers.gravity) return;
        const maxWidth = screen.clientWidth;

        physicsItems.forEach(item => {
            if (item.isDragging) return;

            item.vy += 0.65; // Gravity acceleration
            item.vx *= 0.99; // Air friction
            item.x += item.vx;
            item.y += item.vy;
            item.rot += item.vRot;

            const currentBottom = item.origTop + item.y + item.height;
            const currentLeft = item.origLeft + item.x;
            const currentRight = currentLeft + item.width;

            // Floor bounce
            if (currentBottom > floorY) {
                item.y = floorY - item.origTop - item.height;
                item.vy *= -0.62;
                item.vx *= 0.88;
                item.vRot = item.vx * 0.6;
                if (Math.abs(item.vy) < 1.2) item.vy = 0;
                if (Math.abs(item.vx) < 0.2) item.vRot = 0;
            }

            // Wall bounces
            if (currentLeft < 10) {
                item.x = 10 - item.origLeft;
                item.vx *= -0.7;
            } else if (currentRight > maxWidth - 10) {
                item.x = maxWidth - 10 - item.origLeft - item.width;
                item.vx *= -0.7;
            }

            item.el.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg)`;
        });

        gravityAnimId = requestAnimationFrame(step);
    }

    gravityAnimId = requestAnimationFrame(step);
}

function stopGravityEngine() {
    if (gravityAnimId) cancelAnimationFrame(gravityAnimId);
    gravityAnimId = null;
    physicsItems.forEach(item => {
        if (item.el) item.el.onmousedown = null;
    });
    clearPhysicsStyles();
}

// Global mouse handlers for throwing tiles in Gravity Mode
window.addEventListener('mousemove', (e) => {
    if (!draggedPhysicsItem) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        draggedPhysicsItem.wasDragged = true;
    }
    // Invert horizontal drag delta if Mirror mode is also active
    const mirrorSign = activeModifiers.mirror ? -1 : 1;
    dragVelX = dx * mirrorSign;
    dragVelY = dy;
    draggedPhysicsItem.x += dx * mirrorSign;
    draggedPhysicsItem.y += dy;
    draggedPhysicsItem.el.style.transform = `translate(${draggedPhysicsItem.x}px, ${draggedPhysicsItem.y}px) rotate(${draggedPhysicsItem.rot}deg)`;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

window.addEventListener('mouseup', () => {
    if (!draggedPhysicsItem) return;
    draggedPhysicsItem.isDragging = false;
    draggedPhysicsItem.el.style.cursor = 'grab';
    draggedPhysicsItem.vx = dragVelX * 0.8;
    draggedPhysicsItem.vy = dragVelY * 0.8;
    const releasedItem = draggedPhysicsItem;
    draggedPhysicsItem = null;
    setTimeout(() => { releasedItem.wasDragged = false; }, 50);
});

// --- 2. TETRIS DROP ENGINE ---
function startTetrisEngine() {
    clearPhysicsStyles();
    const channels = getActiveChannels();
    const screen = document.querySelector('.screen');
    const screenRect = screen.getBoundingClientRect();
    const bottomBar = document.querySelector('.bottom-bar');
    const floorY = screen.clientHeight - (bottomBar ? bottomBar.offsetHeight : 90) - 12;

    // Sort channels from bottom-most to top-most so bottom rows land first and stack cleanly
    const mapped = channels.map((el, index) => {
        const rect = el.getBoundingClientRect();
        return {
            el,
            origTop: rect.top - screenRect.top,
            height: rect.height,
            rowIndex: Math.floor(index / 4) // 4 columns per row
        };
    });

    // Calculate target Y so rows stack snugly at the bottom of the screen
    const maxRow = Math.max(...mapped.map(m => m.rowIndex), 0);
    physicsItems = mapped.map((item, idx) => {
        const rowsFromBottom = maxRow - item.rowIndex;
        const targetAbsTop = floorY - ((rowsFromBottom + 1) * (item.height + 8));
        const targetOffsetY = targetAbsTop - item.origTop;
        const startOffsetY = -item.origTop - item.height - (rowsFromBottom * 160) - ((idx % 4) * 55);

        item.el.style.transform = `translateY(${startOffsetY}px)`;
        return {
            el: item.el,
            currentY: startOffsetY,
            targetY: targetOffsetY,
            speed: 9 + (rowsFromBottom * 1.5),
            locked: false
        };
    });

    function step() {
        if (!activeModifiers.tetris) return;
        let allLocked = true;

        physicsItems.forEach(item => {
            if (!item.locked) {
                allLocked = false;
                item.currentY += item.speed;
                if (item.currentY >= item.targetY) {
                    item.currentY = item.targetY;
                    item.locked = true;
                    item.el.classList.add('tetris-locked');
                }
                item.el.style.transform = `translateY(${item.currentY}px)`;
            }
        });

        if (!allLocked) {
            tetrisAnimId = requestAnimationFrame(step);
        }
    }

    tetrisAnimId = requestAnimationFrame(step);
}

function stopTetrisEngine() {
    if (tetrisAnimId) cancelAnimationFrame(tetrisAnimId);
    tetrisAnimId = null;
    clearPhysicsStyles();
}

// --- 3. BUBBLES ENGINE ---
function startBubblesEngine() {
    clearPhysicsStyles();
    document.body.classList.add('mod-bubbles');
    const channels = getActiveChannels();
    const screen = document.querySelector('.screen');
    const screenHeight = screen.clientHeight;

    physicsItems = channels.map((el, i) => ({
        el,
        yOffset: 0,
        floatSpeed: 0.6 + Math.random() * 0.9,
        wobblePhase: i * 0.9 + Math.random() * 2,
        wobbleSpeed: 0.03 + Math.random() * 0.02,
        wobbleAmp: 12 + Math.random() * 14,
        scalePhase: Math.random() * Math.PI * 2
    }));

    function step() {
        if (!activeModifiers.bubbles) return;

        physicsItems.forEach(item => {
            item.yOffset -= item.floatSpeed;
            item.wobblePhase += item.wobbleSpeed;
            item.scalePhase += 0.04;

            // Wrap seamlessly from top back to bottom
            if (item.yOffset < -screenHeight * 0.75) {
                item.yOffset = screenHeight * 0.45;
            }

            const swayX = Math.sin(item.wobblePhase) * item.wobbleAmp;
            const scaleX = 1 + Math.sin(item.scalePhase) * 0.04;
            const scaleY = 1 + Math.cos(item.scalePhase) * 0.04;

            item.el.style.transform = `translate(${swayX}px, ${item.yOffset}px) scale(${scaleX}, ${scaleY})`;
        });

        bubblesAnimId = requestAnimationFrame(step);
    }

    bubblesAnimId = requestAnimationFrame(step);
}

function stopBubblesEngine() {
    if (bubblesAnimId) cancelAnimationFrame(bubblesAnimId);
    bubblesAnimId = null;
    document.body.classList.remove('mod-bubbles');
    clearPhysicsStyles();
}

// --- Music Player Playlist Configuration ---
const musicPlaylist = [
    { title: "Safe Haven", artist: "Garoad", src: "/Music/Garoad - Safe Haven.mp3", cover: "/assets/IMG_0703.webp" },
    { title: "Beneath the Mask (Instrumental)", artist: "Lyn", src: "/Music/Beneath the Mask -instrumental version- - Lyn.mp3", cover: "/assets/IMG_0703.webp" },
    { title: "Little Man Legends", artist: "Sleepville", src: "/Music/Sleepville - Little Man Legends.mp3", cover: "/assets/IMG_0703.webp" },
    { title: "Camera (Album)", artist: "Nintendo DSi Music", src: "/Music/Nintendo DSi Music - Camera (Album) - GeralbD1985.mp3", cover: "/assets/IMG_0703.webp" },
    { title: "Training Day", artist: "MTraining", src: "/Music/MTraining Day.mp3", cover: "/assets/IMG_0703.webp" },
    { title: "On Melancholy Hill", artist: "Gorillaz", src: "/Music/On Melancholy Hill - Gorillaz.mp3", cover: "/assets/IMG_0703.webp" }
];

let currentTrackIndex = 0;

function initMusicPlayer() {
    const playlistContainer = document.getElementById('playlist-tracks');
    const audioPlayer = document.getElementById('bg-music');
    if (!playlistContainer || !audioPlayer) return;

    playlistContainer.innerHTML = '';

    musicPlaylist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentTrackIndex ? 'active-track' : ''}`;
        item.style.cssText = 'padding: 8px 10px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s;';
        item.innerHTML = `<span>🎵 ${track.title}</span> <span style="font-size: 0.75rem; color: #888;">${track.artist}</span>`;
        
        item.onmouseover = () => item.style.background = '#f5f5f5';
        item.onmouseout = () => item.style.background = index === currentTrackIndex ? '#e2f0d9' : '#fff';
        
        item.onclick = () => {
            playTrack(index);
        };
        playlistContainer.appendChild(item);
    });

    if (musicPlaylist.length > 0 && !audioPlayer.src) {
        loadTrack(0, false);
    }

    audioPlayer.onended = () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
        playTrack(currentTrackIndex);
    };
}

function loadTrack(index, autoPlay = true) {
    currentTrackIndex = index;
    const track = musicPlaylist[index];
    const audioPlayer = document.getElementById('bg-music');
    const titleEl = document.getElementById('music-track-title');
    const artistEl = document.getElementById('music-track-artist');
    const coverEl = document.getElementById('music-album-art');

    if (audioPlayer) audioPlayer.src = track.src;
    if (titleEl) titleEl.innerText = track.title;
    if (artistEl) artistEl.innerText = track.artist;
    if (coverEl) coverEl.src = track.cover;

    const items = document.querySelectorAll('.playlist-item');
    items.forEach((it, idx) => {
        it.style.background = idx === currentTrackIndex ? '#e2f0d9' : '#fff';
    });

    if (autoPlay && audioPlayer) {
        audioPlayer.play().catch(e => console.log("Autoplay prevented:", e));
    }
}

function playTrack(index) {
    loadTrack(index, true);
}

// --- Game Player Functions with WS-99 Loading Screen ---
let timeFcukPlayerInterval;

function openGamePlayer(url, title = 'Game Player') {
    const loadingOverlay = document.getElementById('wii-loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }

    setTimeout(() => {
        if (loadingOverlay) {
            loadingOverlay.classList.remove('active');
        }

        const modal = document.getElementById('player-modal');
        const iframe = document.getElementById('game-iframe');
        const titleEl = document.getElementById('player-title-text');
        const screen = document.querySelector('.screen');

        iframe.src = url;
        
        if (timeFcukPlayerInterval) clearInterval(timeFcukPlayerInterval);

        if (titleEl) {
            if (isJakeJuniorActive) {
                titleEl.innerText = 'Jake junior';
            } else if (title === 'TIME FCUK') {
                timeFcukPlayerInterval = setInterval(() => {
                    const chars = ['F', 'C', 'U', 'K'];
                    let scrambledFcuk = 'FCUK'.split('').map(char => {
                        const randomChar = chars[Math.floor(Math.random() * chars.length)];
                        return char === char.toUpperCase() ? randomChar.toUpperCase() : randomChar;
                    }).join('');
                    titleEl.innerText = `🎮 TIME ${scrambledFcuk}`;
                }, 80);
            } else {
                titleEl.innerText = `🎮 ${title}`;
            }
        }
        
        modal.classList.add('active');
        if (screen) screen.classList.add('iframe-active');
    }, 800);
}

function closeGamePlayer() {
    const modal = document.getElementById('player-modal');
    const iframe = document.getElementById('game-iframe');
    const screen = document.querySelector('.screen');

    if (timeFcukPlayerInterval) clearInterval(timeFcukPlayerInterval);

    iframe.src = '';
    modal.classList.remove('active');
    if (screen) screen.classList.remove('iframe-active');

    if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
    }
}

function reloadGameIframe() {
    const iframe = document.getElementById('game-iframe');
    if (iframe.src) {
        iframe.src = iframe.src;
    }
}

function toggleIframeFullscreen() {
    const wrapper = document.getElementById('player-iframe-wrapper');
    if (!document.fullscreenElement) {
        if (wrapper.requestFullscreen) {
            wrapper.requestFullscreen();
        } else if (wrapper.webkitRequestFullscreen) {
            wrapper.webkitRequestFullscreen();
        } else if (wrapper.msRequestFullscreen) {
            wrapper.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Click Event Listener for Channel Tiles (ignores drags in Gravity Mode)
document.addEventListener('click', function (e) {
    const channel = e.target.closest('.channel');
    if (channel && channel.hasAttribute('href')) {
        e.preventDefault();
        const physItem = physicsItems.find(p => p.el === channel);
        if (physItem && physItem.wasDragged) return;

        const img = channel.querySelector('img');
        const title = isJakeJuniorActive ? 'Jake junior' : (img ? img.alt : 'Game Player');
        openGamePlayer(channel.getAttribute('href'), title);
    }
});

// --- Special Effects Handler ---
function handleThemeEffects(effectType) {
    const existingContainer = document.getElementById('theme-effects-container');
    if (existingContainer) existingContainer.remove();

    if (!effectType) return;

    const container = document.createElement('div');
    container.id = 'theme-effects-container';
    container.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: hidden; z-index: 5;';
    document.querySelector('.screen').appendChild(container);

    if (effectType === 'christmas') {
        for (let i = 0; i < 40; i++) {
            const snowflake = document.createElement('div');
            snowflake.innerHTML = '❄';
            snowflake.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                color: rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3});
                font-size: ${Math.random() * 12 + 10}px;
                animation: fallSnow ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(snowflake);
        }
    } else if (effectType === 'halloween') {
        const symbols = ['🦇', '👻', '🎃', '✨'];
        for (let i = 0; i < 20; i++) {
            const spooky = document.createElement('div');
            spooky.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
            spooky.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100}%;
                left: -20px;
                font-size: ${Math.random() * 16 + 12}px;
                animation: floatSpooky ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(spooky);
        }
    }
}

// --- Theme Database ---
const themes = {
    'default': { bg: '#e8e8e8', channel: '#f0f0f0', accent: '#5ce1e6', barBg: '#f5f5f5', barGrad: 'linear-gradient(to bottom, #f5f5f5, #d0d0d0)', dark: false },
    'dark': { bg: '#2a2a2a', channel: '#444444', accent: '#5ce1e6', barBg: '#333333', barGrad: 'linear-gradient(to bottom, #333333, #1a1a1a)', dark: true },
    'neon': { bg: '#0f0c1b', channel: '#1d1838', accent: '#ff007f', barBg: '#130f26', barGrad: 'linear-gradient(to bottom, #130f26, #080612)', dark: true },
    'sage': { bg: '#e8f0e6', channel: '#f2f7f0', accent: '#78ab78', barBg: '#dce8d8', barGrad: 'linear-gradient(to bottom, #dce8d8, #b8ceb4)', dark: false },
    'sunset': { bg: '#fdeed9', channel: '#fff7ed', accent: '#ff7e5f', barBg: '#fbdcb9', barGrad: 'linear-gradient(to bottom, #fbdcb9, #f7c393)', dark: false },
    'ocean': { bg: '#e0f2fe', channel: '#f0f9ff', accent: '#0284c7', barBg: '#bae6fd', barGrad: 'linear-gradient(to bottom, #bae6fd, #7dd3fc)', dark: false },
    'midnight': { bg: '#18181b', channel: '#27272a', accent: '#eab308', barBg: '#1c1917', barGrad: 'linear-gradient(to bottom, #1c1917, #0c0a09)', dark: true },
    'berry': { bg: '#fce7f3', channel: '#fdf2f8', accent: '#ec4899', barBg: '#fbcfe8', barGrad: 'linear-gradient(to bottom, #fbcfe8, #f472b6)', dark: false },
    'evil': { bg: '#1a0000', channel: '#330000', accent: '#ff1a1a', barBg: '#2b0000', barGrad: 'linear-gradient(to bottom, #2b0000, #100000)', dark: true },
    'kind': { bg: '#f0fdf4', channel: '#ffffff', accent: '#4ade80', barBg: '#dcfce7', barGrad: 'linear-gradient(to bottom, #dcfce7, #bbf7d0)', dark: false },
    'allred': { bg: '#7f1d1d', channel: '#991b1b', accent: '#f87171', barBg: '#881337', barGrad: 'linear-gradient(to bottom, #881337, #450a0a)', dark: true },
    'allblue': { bg: '#0c4a6e', channel: '#075985', accent: '#38bdf8', barBg: '#0369a1', barGrad: 'linear-gradient(to bottom, #0369a1, #082f49)', dark: true },
    
    // Seasonal Special Effects Themes
    'halloween': { bg: '#0c0513', channel: '#1f102e', accent: '#ff7518', barBg: '#150a21', barGrad: 'linear-gradient(to bottom, #150a21, #08030d)', dark: true, effect: 'halloween' },
    'christmas': { bg: '#0f172a', channel: '#1e293b', accent: '#ef4444', barBg: '#1e293b', barGrad: 'linear-gradient(to bottom, #1e293b, #0f172a)', dark: true, effect: 'christmas' },

    // Vocaloid Mascots (with Custom Wallpapers)
    'miku': { bg: '#1a1a24', bgImg: '/assets/IMG_0697.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#39c5bb', barBg: '#b2ece7', barGrad: 'linear-gradient(to bottom, #b2ece7, #80dfd7)', dark: true, mascotImg: '/assets/IMG_0155.png' },
    'teto': { bg: '#1a1a24', bgImg: '/assets/IMG_0698.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#e6005c', barBg: '#f9c2d1', barGrad: 'linear-gradient(to bottom, #f9c2d1, #f498b2)', dark: true, mascotImg: '/assets/IMG_0156.png' },
    'rin':  { bg: '#1a1a24', bgImg: '/assets/IMG_0699.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#ffb700', barBg: '#fff3b3', barGrad: 'linear-gradient(to bottom, #fff3b3, #ffe066)', dark: true, mascotImg: '/assets/IMG_0154.png' },
    'gumi': { bg: '#1a1a24', bgImg: '/assets/IMG_0700.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#76c800', barBg: '#d9f2c2', barGrad: 'linear-gradient(to bottom, #d9f2c2, #b5e68d)', dark: true, mascotImg: '/assets/IMG_0158.webp' },
    
    // Anime & Game Mascots
    'bleach': { bg: '#050505', channel: '#222222', accent: '#ffffff', barBg: '#111111', barGrad: 'linear-gradient(to bottom, #111111, #000000)', dark: true, mascotImg: '/assets/IMG_0521.webp' },
    'blue exorcist': { bg: '#02040a', channel: '#0b1329', accent: '#3b82f6', barBg: '#050a14', barGrad: 'linear-gradient(to bottom, #050a14, #010205)', dark: true, mascotImg: '/assets/IMG_0522.webp' },
    'assassination classroom': { bg: '#1b3322', channel: '#2d4f37', accent: '#facc15', barBg: '#15281a', barGrad: 'linear-gradient(to bottom, #15281a, #0b140e)', dark: true, mascotImg: '/assets/IMG_0523.webp' },
    
    // Persona Themes
    'persona5': { bg: '#1a0000', bgImg: '/assets/IMG_0702.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#ff0033', barBg: '#2b0000', barGrad: 'linear-gradient(to bottom, #2b0000, #100000)', dark: true, mascotImg: '/assets/IMG_0703.webp', themeClass: 'theme-persona5' },
    'persona4': { bg: '#003366', bgImg: '/assets/IMG_0710.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#ffcc00', barBg: '#002244', barGrad: 'linear-gradient(to bottom, #002244, #001122)', dark: false, mascotImg: '/assets/IMG_0712.png', themeClass: 'theme-persona4' },
    'persona3': { bg: '#001a33', bgImg: '/assets/IMG_0709.jpeg', channel: 'rgba(255, 255, 255, 0.85)', accent: '#00ccff', barBg: '#001122', barGrad: 'linear-gradient(to bottom, #001122, #00050f)', dark: true, mascotImg: '/assets/IMG_0713.webp', themeClass: 'theme-persona3' },
    
    // Custom Background Themes
    'img0121': { bg: '#1a1a24', bgImg: '/assets/IMG_0121.png', channel: 'rgba(255, 255, 255, 0.85)', accent: '#3b82f6', barBg: '#1e1e2d', barGrad: 'linear-gradient(to bottom, #1e1e2d, #11111b)', dark: true },
    'img0122': { bg: '#181825', bgImg: '/assets/IMG_0122.gif', channel: 'rgba(255, 255, 255, 0.85)', accent: '#cba6f7', barBg: '#1e1e2e', barGrad: 'linear-gradient(to bottom, #1e1e2e, #11111b)', dark: true },
    'jakejunior': { bg: '#111111', bgImg: '/assets/IMG_0430.webp', channel: 'rgba(255, 255, 255, 0.85)', accent: '#5ce1e6', barBg: '#f5f5f5', barGrad: 'linear-gradient(to bottom, #f5f5f5, #d0d0d0)', dark: false }
};

function setTheme(themeName) {
    const t = themes[themeName] || themes['default'];
    
    document.documentElement.style.setProperty('--main-bg', t.bg);
    document.documentElement.style.setProperty('--channel-bg', t.channel);
    document.documentElement.style.setProperty('--accent-color', t.accent);
    document.documentElement.style.setProperty('--bottom-bar-bg', t.barBg);
    document.documentElement.style.setProperty('--bottom-bar-gradient', t.barGrad);
    
    const screen = document.querySelector('.screen');
    if (screen) {
        if (t.bgImg) {
            screen.style.backgroundImage = `url('${t.bgImg}'), repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)`;
            screen.style.backgroundSize = 'cover';
            screen.style.backgroundPosition = 'center';
        } else {
            screen.style.backgroundImage = 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)';
            screen.style.backgroundSize = 'auto';
            screen.style.backgroundPosition = 'initial';
        }
    }

    handleThemeEffects(t.effect);

    const mascot = document.getElementById('vocaloid-mascot');
    if (t.mascotImg) {
        mascot.src = t.mascotImg;
        mascot.style.display = 'block';
    } else {
        mascot.style.display = 'none';
        mascot.src = '';
    }

    document.body.classList.remove('theme-persona5', 'theme-persona4', 'theme-persona3');
    if (t.themeClass) {
        document.body.classList.add(t.themeClass);
    }

    if (t.dark) {
        document.body.classList.add('theme-dark');
    } else {
        document.body.classList.remove('theme-dark');
    }
    
    // --- JAKE JUNIOR OVERRIDE LOGIC ---
    if (themeName.toLowerCase() === 'jakejunior') {
        isJakeJuniorActive = true;
        localStorage.setItem('selectedTheme', 'default');

        document.querySelectorAll('.channel').forEach(ch => {
            ch.classList.remove('empty');
            ch.innerHTML = '';
            const img = document.createElement('img');
            img.src = '/assets/IMG_0430.webp';
            img.alt = 'Jake junior';
            ch.appendChild(img);

            const bubble = document.createElement('div');
            bubble.className = 'speech-bubble';
            bubble.textContent = 'Jake junior';
            ch.appendChild(bubble);
        });

        document.querySelectorAll('img').forEach(img => {
            img.src = '/assets/IMG_0430.webp'; 
            img.srcset = ''; 
            img.alt = 'Jake junior';
        });

        document.querySelectorAll('button, .round-btn, .recommend-btn, .hide-game-btn, .player-btn').forEach(btn => {
            btn.textContent = 'Jake junior';
            btn.style.fontSize = '0.7rem';
        });

        document.getElementById('clock-time').innerHTML = 'Jake junior';
        document.getElementById('clock-date').innerText = 'Jake junior';

        function replaceTextNodes(node) {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    if (child.nodeValue.trim() !== '') {
                        child.nodeValue = 'Jake junior';
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
                        replaceTextNodes(child);
                    }
                }
            });
        }
        replaceTextNodes(document.body);

        document.querySelectorAll('input').forEach(input => {
            input.placeholder = 'Jake junior';
            if (input.type === 'text') input.value = 'Jake junior';
        });

        document.querySelectorAll('option').forEach(opt => {
            opt.textContent = 'Jake junior';
        });

        setTabIdentity('Jake junior', '/assets/IMG_0430.webp');

        setTimeout(() => {
            alert("Disclaimer: To get rid of this theme and restore the original page, you will have to refresh the page.");
        }, 100);
    } else {
        isJakeJuniorActive = false;
        localStorage.setItem('selectedTheme', themeName);
    }
}

// ==========================================
// --- ADVANCED TAB CLOAKING SYSTEM ---
// ==========================================
const cloakPresets = {
    'drive': { title: 'Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
    'classroom': { title: 'Classes', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
    'docs': { title: 'Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
    'canvas': { title: 'Dashboard', icon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico' },
    'wikipedia': { title: 'Wikipedia, the free encyclopedia', icon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico' },
    'desmos': { title: 'Desmos | Graphing Calculator', icon: 'https://www.desmos.com/favicon.ico' },
    'clever': { title: 'Clever | Portal', icon: 'https://assets.clever.com/assets/p-clever-favicon.ico' },
    'reset': { title: 'Webstring', icon: '' }
};

let currentActiveTitle = document.title;
let currentActiveIcon = '';

function setTabIdentity(title, iconUrl) {
    if (title) {
        document.title = title;
        currentActiveTitle = title;
    }
    if (iconUrl !== undefined) {
        currentActiveIcon = iconUrl;
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'shortcut icon';
            document.head.appendChild(link);
        }
        link.href = iconUrl || '';
    }
}

function applyPresetCloak(presetKey) {
    if (!presetKey) return;
    const preset = cloakPresets[presetKey];
    if (preset) {
        setTabIdentity(preset.title, preset.icon);
        document.getElementById('cloak-title').value = preset.title;
        document.getElementById('cloak-icon').value = preset.icon;
        
        localStorage.setItem('cloakTitle', preset.title);
        localStorage.setItem('cloakIcon', preset.icon);
    }
}

function applyCustomCloak() {
    const title = document.getElementById('cloak-title').value;
    const iconUrl = document.getElementById('cloak-icon').value;
    setTabIdentity(title, iconUrl);

    localStorage.setItem('cloakTitle', title);
    localStorage.setItem('cloakIcon', iconUrl);
}

let panicKeySetting = '';
let panicUrlSetting = '';

function savePanicSettings() {
    panicKeySetting = document.getElementById('panic-key').value.trim();
    panicUrlSetting = document.getElementById('panic-url').value.trim();

    localStorage.setItem('panicKey', panicKeySetting);
    localStorage.setItem('panicUrl', panicUrlSetting);
    alert('Panic Key settings saved!');
}

document.addEventListener('keydown', function (e) {
    if (!panicKeySetting) return;

    if (e.key.toLowerCase() === panicKeySetting.toLowerCase() || e.code.toLowerCase() === panicKeySetting.toLowerCase()) {
        let targetUrl = panicUrlSetting || 'https://www.google.com';
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
        }
        window.location.href = targetUrl;
    }
});

let isAutoBlurActive = false;

function toggleAutoBlurCloak(enabled) {
    isAutoBlurActive = enabled;
    localStorage.setItem('autoBlurCloak', enabled);
}

window.addEventListener('blur', () => {
    if (isAutoBlurActive) {
        document.title = 'Google Drive';
        let link = document.querySelector("link[rel*='icon']");
        if (link) link.href = cloakPresets['drive'].icon;
    }
});

window.addEventListener('focus', () => {
    if (isAutoBlurActive) {
        document.title = currentActiveTitle;
        let link = document.querySelector("link[rel*='icon']");
        if (link) link.href = currentActiveIcon;
    }
});

function openAboutBlank() {
    const newWindow = window.open('about:blank', '_blank');
    if (!newWindow) {
        alert('Pop-up blocked! Please allow pop-ups to launch in about:blank.');
        return;
    }

    const doc = newWindow.document;
    const iframe = doc.createElement('iframe');
    
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.src = window.location.href;

    doc.body.style.margin = '0';
    doc.body.style.height = '100vh';
    doc.body.appendChild(iframe);

    window.location.replace('https://www.google.com');
}

// --- Load Saved Data ---
function loadSavedData() {
    renderDots();
    updatePaginationUI();
    initSpeechBubbles();
    initMusicPlayer();

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }

    const savedTitle = localStorage.getItem('cloakTitle');
    const savedIcon = localStorage.getItem('cloakIcon');
    if (savedTitle) {
        document.getElementById('cloak-title').value = savedTitle;
        setTabIdentity(savedTitle, savedIcon || '');
    }
    if (savedIcon) {
        document.getElementById('cloak-icon').value = savedIcon;
    }

    const savedPanicKey = localStorage.getItem('panicKey');
    const savedPanicUrl = localStorage.getItem('panicUrl');
    if (savedPanicKey) {
        panicKeySetting = savedPanicKey;
        document.getElementById('panic-key').value = savedPanicKey;
    }
    if (savedPanicUrl) {
        panicUrlSetting = savedPanicUrl;
        document.getElementById('panic-url').value = savedPanicUrl;
    }

    const savedAutoBlur = localStorage.getItem('autoBlurCloak') === 'true';
    isAutoBlurActive = savedAutoBlur;
    document.getElementById('auto-blur-cloak').checked = savedAutoBlur;
}

loadSavedData();

// --- Save and Load Data (Backup & Restore) Functions ---
function exportDataJSON() {
    const backupData = {
        selectedTheme: localStorage.getItem('selectedTheme'),
        cloakTitle: localStorage.getItem('cloakTitle'),
        cloakIcon: localStorage.getItem('cloakIcon'),
        panicKey: localStorage.getItem('panicKey'),
        panicUrl: localStorage.getItem('panicUrl'),
        autoBlurCloak: localStorage.getItem('autoBlurCloak')
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "webstring_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importDataJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            if (importedData.selectedTheme !== undefined && importedData.selectedTheme !== null) {
                localStorage.setItem('selectedTheme', importedData.selectedTheme);
            }
            if (importedData.cloakTitle !== undefined && importedData.cloakTitle !== null) {
                localStorage.setItem('cloakTitle', importedData.cloakTitle);
            }
            if (importedData.cloakIcon !== undefined && importedData.cloakIcon !== null) {
                localStorage.setItem('cloakIcon', importedData.cloakIcon);
            }
            if (importedData.panicKey !== undefined && importedData.panicKey !== null) {
                localStorage.setItem('panicKey', importedData.panicKey);
            }
            if (importedData.panicUrl !== undefined && importedData.panicUrl !== null) {
                localStorage.setItem('panicUrl', importedData.panicUrl);
            }
            if (importedData.autoBlurCloak !== undefined && importedData.autoBlurCloak !== null) {
                localStorage.setItem('autoBlurCloak', importedData.autoBlurCloak);
            }

            alert('Data successfully loaded! Applying settings...');
            loadSavedData();
        } catch (error) {
            alert('Error parsing JSON file. Please make sure it is a valid Webstring backup file.');
            console.error(error);
        }
        event.target.value = '';
    };
    reader.readAsText(file);
}

// --- Inject WS-99 Loading Screen Styles ---
const wiiLoadingStyles = document.createElement('style');
wiiLoadingStyles.innerHTML = `
    .wii-loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
    }

    .wii-loading-overlay.active {
        opacity: 1;
        pointer-events: auto;
    }

    .wii-loading-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 15px;
        width: 80%;
        max-width: 700px;
        height: 60%;
        max-height: 400px;
    }

    .wii-loading-box {
        background: #2a2a2a;
        border: 3px solid #3a3a3a;
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: sans-serif;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        animation: wiiPulse 1.2s infinite alternate;
    }

    @keyframes wiiPulse {
        0% { background: #222; color: #555; }
        100% { background: #333; color: #777; }
    }
`;
document.head.appendChild(wiiLoadingStyles);
