let isJakeJuniorActive = false;

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

// --- Page Logic ---
let currentPage = 0;
const totalPages = 8;

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

    document.getElementById('recommendation-modal').classList.add('active');
    document.getElementById('theme-menu').classList.remove('active');
    document.getElementById('settings-menu').classList.remove('active');
    document.getElementById('credits-modal').classList.remove('active');
}

function toggleRecommendationModal() {
    document.getElementById('recommendation-modal').classList.toggle('active');
}
function toggleThemeMenu() {
    const menu = document.getElementById('theme-menu');
    menu.classList.toggle('active');
    document.getElementById('settings-menu').classList.remove('active');
    document.getElementById('recommendation-modal').classList.remove('active');
    document.getElementById('credits-modal').classList.remove('active');
}
function toggleSettingsMenu() {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('active');
    document.getElementById('theme-menu').classList.remove('active');
    document.getElementById('recommendation-modal').classList.remove('active');
    document.getElementById('credits-modal').classList.remove('active');
}
function toggleCreditsModal() {
    const menu = document.getElementById('credits-modal');
    menu.classList.toggle('active');
    document.getElementById('theme-menu').classList.remove('active');
    document.getElementById('settings-menu').classList.remove('active');
    document.getElementById('recommendation-modal').classList.remove('active');
}

// --- Game Player Functions ---
let timeFcukPlayerInterval;

function openGamePlayer(url, title = 'Game Player') {
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

document.addEventListener('click', function (e) {
    const channel = e.target.closest('.channel');
    if (channel && channel.hasAttribute('href')) {
        e.preventDefault();
        const img = channel.querySelector('img');
        const title = isJakeJuniorActive ? 'Jake junior' : (img ? img.alt : 'Game Player');
        openGamePlayer(channel.getAttribute('href'), title);
    }
});

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
    'miku': { bg: '#e0f7f6', channel: '#ffffff', accent: '#39c5bb', barBg: '#b2ece7', barGrad: 'linear-gradient(to bottom, #b2ece7, #80dfd7)', dark: false, mascotImg: '/assets/IMG_0155.png' },
    'teto': { bg: '#fde8ee', channel: '#ffffff', accent: '#e6005c', barBg: '#f9c2d1', barGrad: 'linear-gradient(to bottom, #f9c2d1, #f498b2)', dark: false, mascotImg: '/assets/IMG_0156.png' },
    'rin':  { bg: '#fffbe6', channel: '#ffffff', accent: '#ffb700', barBg: '#fff3b3', barGrad: 'linear-gradient(to bottom, #fff3b3, #ffe066)', dark: false, mascotImg: '/assets/IMG_0154.png' },
    'gumi': { bg: '#f0f0f4', channel: '#ffffff', accent: '#76c800', barBg: '#d9f2c2', barGrad: 'linear-gradient(to bottom, #d9f2c2, #b5e68d)', dark: false, mascotImg: '/assets/IMG_0158.webp' },
    
    // Windows 7 Theme (Nanami Madobe)
    'img0121': { bg: '#1a1a24', bgImg: '/assets/IMG_0121.png', channel: 'rgba(255, 255, 255, 0.85)', accent: '#3b82f6', barBg: 'transparent', barGrad: 'none', dark: true },
    
    'img0122': { bg: '#181825', bgImg: '/assets/IMG_0122.gif', channel: 'rgba(255, 255, 255, 0.85)', accent: '#cba6f7', barBg: '#1e1e2e', barGrad: 'linear-gradient(to bottom, #1e1e2e, #11111b)', dark: true },
    'jakejunior': { bg: '#111111', bgImg: '/assets/IMG_0430.webp', channel: 'rgba(255, 255, 255, 0.85)', accent: '#5ce1e6', barBg: '#f5f5f5', barGrad: 'linear-gradient(to bottom, #f5f5f5, #d0d0d0)', dark: false },
    'halloween': { bg: '#170a1c', channel: 'rgba(43, 20, 8, 0.85)', accent: '#ff7300', barBg: '#1c0d22', barGrad: 'linear-gradient(to bottom, #2b1133, #000000)', dark: true },
    
    // Animated Anime Themes
    'christmas': { bg: '#0b2033', channel: 'rgba(255, 255, 255, 0.65)', accent: '#d42426', barBg: '#0f4024', barGrad: 'linear-gradient(to bottom, #0f4024, #051a0e)', dark: true },
    'bleach': { bg: '#050505', channel: 'rgba(30, 10, 10, 0.8)', accent: '#ff0000', barBg: '#111111', barGrad: 'linear-gradient(to bottom, #260000, #000000)', dark: true, mascotImg: '/assets/IMG_0521.webp' },
    'blueexorcist': { bg: '#02040a', channel: 'rgba(10, 20, 40, 0.8)', accent: '#00d4ff', barBg: '#040b17', barGrad: 'linear-gradient(to bottom, #001f3f, #000000)', dark: true, mascotImg: '/assets/IMG_0522.webp' },
    'assassination': { bg: '#1b3322', channel: 'rgba(20, 20, 20, 0.6)', accent: '#ffe600', barBg: '#382414', barGrad: 'linear-gradient(to bottom, #382414, #1c1109)', dark: true, mascotImg: '/assets/IMG_0523.webp' }
};

function setTheme(themeName) {
    const t = themes[themeName] || themes['default'];
    
    document.documentElement.style.setProperty('--main-bg', t.bg);
    document.documentElement.style.setProperty('--channel-bg', t.channel);
    document.documentElement.style.setProperty('--accent-color', t.accent);
    document.documentElement.style.setProperty('--bottom-bar-bg', t.barBg);
    document.documentElement.style.setProperty('--bottom-bar-gradient', t.barGrad);
    
    // Tag the body for dynamic CSS injection features
    document.body.setAttribute('data-theme', themeName);

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

    const mascot = document.getElementById('vocaloid-mascot');
    if (t.mascotImg) {
        mascot.src = t.mascotImg;
        mascot.style.display = 'block';
    } else {
        mascot.style.display = 'none';
        mascot.src = '';
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
// --- INJECT ADVANCED THEME ANIMATIONS ---
// ==========================================
function injectAdvancedThemeStyles() {
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        /* Bleach - Getsuga Hover Aura */
        @keyframes getsuga-pulse {
            0% { box-shadow: 0 0 10px #ff0000, inset 0 0 5px #cc0000; }
            50% { box-shadow: 0 0 35px #ff0000, inset 0 0 20px #cc0000; border-color: #ff3333; }
            100% { box-shadow: 0 0 10px #ff0000, inset 0 0 5px #cc0000; }
        }
        body[data-theme="bleach"] .channel:hover {
            animation: getsuga-pulse 0.8s infinite alternate !important;
            border: 2px solid #ff0000 !important;
            transform: scale(1.05);
        }

        /* Blue Exorcist - Flickering Flames */
        @keyframes blue-flame {
            0% { box-shadow: 0 5px 15px #00a8ff; transform: translateY(0px) scale(1.03); }
            50% { box-shadow: 0 20px 40px #00d4ff, 0 -5px 15px rgba(0, 212, 255, 0.6); transform: translateY(-4px) scale(1.05); }
            100% { box-shadow: 0 5px 15px #00a8ff; transform: translateY(0px) scale(1.03); }
        }
        body[data-theme="blueexorcist"] .channel:hover {
            animation: blue-flame 0.7s infinite alternate !important;
            border: 2px solid #00d4ff !important;
        }

        /* Assassination Classroom - Mach 20 Speed & Color Shifting */
        @keyframes mach-20 {
            0% { transform: translateX(0) scale(1.05); border-color: #ffe600; box-shadow: 0 0 15px #ffe600; }
            25% { transform: translateX(-3px) scale(1.05); border-color: #ff0000; box-shadow: 0 0 15px #ff0000; } /* Angry */
            50% { transform: translateX(3px) scale(1.05); border-color: #ffb700; box-shadow: 0 0 15px #ffb700; }
            75% { transform: translateX(-3px) scale(1.05); border-color: #ff71cd; box-shadow: 0 0 15px #ff71cd; } /* Relaxed */
            100% { transform: translateX(0) scale(1.05); border-color: #ffe600; box-shadow: 0 0 15px #ffe600; }
        }
        body[data-theme="assassination"] .channel:hover {
            animation: mach-20 0.3s infinite !important;
            border-width: 3px !important;
        }

        /* =======================================
           WINDOWS 7 AERO UI (Nanami Madobe)
           ======================================= */
        body[data-theme="img0121"] {
            font-family: "Segoe UI", Tahoma, sans-serif !important;
        }
        /* Windows 7 Channels (Icons) */
        body[data-theme="img0121"] .channel {
            background: rgba(255, 255, 255, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            border-radius: 4px !important;
            box-shadow: inset 0 0 10px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4) !important;
            backdrop-filter: blur(5px) !important;
            transition: all 0.2s;
        }
        body[data-theme="img0121"] .channel:hover {
            background: rgba(255, 255, 255, 0.3) !important;
            box-shadow: inset 0 0 15px rgba(255,255,255,0.6), 0 6px 12px rgba(0,0,0,0.5) !important;
            border: 1px solid rgba(255, 255, 255, 0.8) !important;
            transform: scale(1.02);
        }
        /* Windows 7 Taskbar (Bottom Bar) */
        body[data-theme="img0121"] .bottom-bar {
            background: linear-gradient(to bottom, rgba(122,176,218,0.85) 0%, rgba(85,152,203,0.85) 45%, rgba(13,101,165,0.85) 50%, rgba(55,142,200,0.85) 100%) !important;
            border-top: 1px solid rgba(255,255,255,0.6) !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 -2px 10px rgba(0,0,0,0.5) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 0 !important;
            height: 48px !important;
        }
        /* Windows 7 Window Frame (Top Bar) */
        body[data-theme="img0121"] .top-bar {
            background: linear-gradient(to bottom, rgba(122,176,218,0.75), rgba(13,101,165,0.75)) !important;
            border-bottom: 1px solid rgba(255,255,255,0.5) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 0 0 8px 8px !important;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
        }
        /* Windows 7 Modals */
        body[data-theme="img0121"] .theme-menu, body[data-theme="img0121"] .player-modal {
            background: rgba(15, 25, 40, 0.6) !important;
            border: 1px solid rgba(255, 255, 255, 0.5) !important;
            border-radius: 8px !important;
            box-shadow: inset 0 0 8px rgba(255,255,255,0.4), 0 15px 30px rgba(0,0,0,0.6) !important;
            backdrop-filter: blur(15px) !important;
        }
        /* Windows 7 Buttons */
        body[data-theme="img0121"] button, body[data-theme="img0121"] .round-btn {
            background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2)) !important;
            border: 1px solid rgba(255,255,255,0.5) !important;
            border-radius: 4px !important;
            color: #fff !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
            box-shadow: inset 0 1px 2px rgba(255,255,255,0.4) !important;
        }
        body[data-theme="img0121"] button:hover, body[data-theme="img0121"] .round-btn:hover {
            background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1)) !important;
            box-shadow: inset 0 0 10px rgba(59, 130, 246, 0.8) !important;
            border-color: #3b82f6 !important;
        }
    `;
    document.head.appendChild(styleBlock);
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
    'reset': { title: 'Webstring', icon: '/assets/vnznaj.svg' }
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
    injectAdvancedThemeStyles(); // Initialize Dynamic Styles Once
    
    renderDots();
    updatePaginationUI();
    initSpeechBubbles();

    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('default');
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
}// ==========================================
// --- INJECT ADVANCED THEME ANIMATIONS ---
// ==========================================
function injectAdvancedThemeStyles() {
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        /* Bleach - Getsuga Hover Aura */
        @keyframes getsuga-pulse {
            0% { box-shadow: 0 0 10px #ff0000, inset 0 0 5px #cc0000; }
            50% { box-shadow: 0 0 35px #ff0000, inset 0 0 20px #cc0000; border-color: #ff3333; }
            100% { box-shadow: 0 0 10px #ff0000, inset 0 0 5px #cc0000; }
        }
        body[data-theme="bleach"] .channel:hover {
            animation: getsuga-pulse 0.8s infinite alternate !important;
            border: 2px solid #ff0000 !important;
            transform: scale(1.05);
        }

        /* Blue Exorcist - Flickering Flames */
        @keyframes blue-flame {
            0% { box-shadow: 0 5px 15px #00a8ff; transform: translateY(0px) scale(1.03); }
            50% { box-shadow: 0 20px 40px #00d4ff, 0 -5px 15px rgba(0, 212, 255, 0.6); transform: translateY(-4px) scale(1.05); }
            100% { box-shadow: 0 5px 15px #00a8ff; transform: translateY(0px) scale(1.03); }
        }
        body[data-theme="blueexorcist"] .channel:hover {
            animation: blue-flame 0.7s infinite alternate !important;
            border: 2px solid #00d4ff !important;
        }

        /* Assassination Classroom - Mach 20 Speed & Color Shifting */
        @keyframes mach-20 {
            0% { transform: translateX(0) scale(1.05); border-color: #ffe600; box-shadow: 0 0 15px #ffe600; }
            25% { transform: translateX(-3px) scale(1.05); border-color: #ff0000; box-shadow: 0 0 15px #ff0000; }
            50% { transform: translateX(3px) scale(1.05); border-color: #ffb700; box-shadow: 0 0 15px #ffb700; }
            75% { transform: translateX(-3px) scale(1.05); border-color: #ff71cd; box-shadow: 0 0 15px #ff71cd; }
            100% { transform: translateX(0) scale(1.05); border-color: #ffe600; box-shadow: 0 0 15px #ffe600; }
        }
        body[data-theme="assassination"] .channel:hover {
            animation: mach-20 0.3s infinite !important;
            border-width: 3px !important;
        }

        /* Assassination Classroom - Mascot Visibility Fix */
        body[data-theme="assassination"] #vocaloid-mascot {
            height: auto !important;
            max-height: 65vh !important;
            bottom: 70px !important;
            right: 3% !important;
            object-fit: contain !important;
            z-index: 10 !important;
        }

        /* ================================================= */
        /* VOCALOID BACKGROUND AUDIO VISUALIZER (CSS ONLY)   */
        /* ================================================= */

        /* Define Theme Colors for the Visualizer */
        body[data-theme="miku"] { --eq-color: #39c5bb; }
        body[data-theme="teto"] { --eq-color: #e6005c; }
        body[data-theme="rin"]  { --eq-color: #ffb700; }
        body[data-theme="gumi"] { --eq-color: #76c800; }

        /* The Equalizer Keyframes */
        @keyframes vocaloid-eq {
            0%, 100% { background-size: 3% 10%, 3% 25%, 3% 15%, 3% 40%, 3% 20%, 3% 30%, 3% 10%, 3% 35%, 3% 20%, 3% 15%; }
            20%      { background-size: 3% 30%, 3% 10%, 3% 35%, 3% 20%, 3% 40%, 3% 15%, 3% 25%, 3% 10%, 3% 45%, 3% 20%; }
            40%      { background-size: 3% 15%, 3% 40%, 3% 20%, 3% 30%, 3% 10%, 3% 45%, 3% 15%, 3% 25%, 3% 10%, 3% 35%; }
            60%      { background-size: 3% 40%, 3% 15%, 3% 30%, 3% 10%, 3% 45%, 3% 20%, 3% 35%, 3% 15%, 3% 25%, 3% 10%; }
            80%      { background-size: 3% 20%, 3% 35%, 3% 10%, 3% 45%, 3% 25%, 3% 10%, 3% 40%, 3% 20%, 3% 15%, 3% 30%; }
        }

        /* Attach the Visualizer to Vocaloid Themes */
        body[data-theme="miku"]::before,
        body[data-theme="teto"]::before,
        body[data-theme="rin"]::before,
        body[data-theme="gumi"]::before {
            content: "";
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1; 
            opacity: 0.15; /* Subtle enough not to make text unreadable */
            pointer-events: none; /* Let clicks pass through to the page */
            filter: drop-shadow(0 0 10px var(--eq-color)); /* Adds a digital glow */
            background-image:
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color)),
                linear-gradient(var(--eq-color), var(--eq-color));
            background-position:
                5% 100%, 15% 100%, 25% 100%, 35% 100%, 45% 100%,
                55% 100%, 65% 100%, 75% 100%, 85% 100%, 95% 100%;
            background-repeat: no-repeat;
            animation: vocaloid-eq 0.75s infinite ease-in-out;
        }

        /* Hatsune Miku - Hover Animation */
        @keyframes miku-pulse {
            0% { box-shadow: 0 0 10px #39c5bb, 0 0 20px rgba(57, 197, 187, 0.4); transform: scale(1.02) translateY(0); }
            50% { box-shadow: 0 0 25px #39c5bb, 0 0 40px rgba(57, 197, 187, 0.6); transform: scale(1.06) translateY(-4px); border-color: #55ebd8; }
            100% { box-shadow: 0 0 10px #39c5bb, 0 0 20px rgba(57, 197, 187, 0.4); transform: scale(1.02) translateY(0); }
        }
        body[data-theme="miku"] .channel:hover {
            animation: miku-pulse 0.6s infinite ease-in-out !important;
            border: 2px solid #39c5bb !important;
        }

        /* Kasane Teto - Hover Animation */
        @keyframes teto-drill {
            0% { transform: scale(1.05) rotate(0deg); box-shadow: 0 5px 15px #e6005c; }
            25% { transform: scale(1.05) rotate(-3deg); box-shadow: -5px 5px 20px #e6005c; border-color: #ff3385; }
            75% { transform: scale(1.05) rotate(3deg); box-shadow: 5px 5px 20px #e6005c; border-color: #ff3385; }
            100% { transform: scale(1.05) rotate(0deg); box-shadow: 0 5px 15px #e6005c; }
        }
        body[data-theme="teto"] .channel:hover {
            animation: teto-drill 0.35s infinite linear !important;
            border: 2px solid #e6005c !important;
        }

        /* Kagamine Rin - Hover Animation */
        @keyframes rin-spark {
            0% { box-shadow: 0 0 0 0 rgba(255, 183, 0, 0.8); transform: scale(1.03); }
            50% { box-shadow: 0 0 0 12px rgba(255, 183, 0, 0); transform: scale(1.07); border-color: #ffcc00; }
            100% { box-shadow: 0 0 0 0 rgba(255, 183, 0, 0); transform: scale(1.03); }
        }
        body[data-theme="rin"] .channel:hover {
            animation: rin-spark 0.6s infinite ease-out !important;
            border: 2px solid #ffb700 !important;
        }

        /* GUMI - Hover Animation */
        @keyframes gumi-synth {
            0% { box-shadow: 0 0 5px #76c800; border-color: #76c800; transform: skewX(0deg) scale(1.03); }
            20% { box-shadow: -4px 0 15px #76c800; border-color: #99ff00; transform: skewX(-2deg) scale(1.04); }
            40% { box-shadow: 4px 0 15px #76c800; border-color: #76c800; transform: skewX(2deg) scale(1.04); }
            60% { box-shadow: -2px 0 10px #76c800; border-color: #99ff00; transform: skewX(-1deg) scale(1.04); }
            80% { box-shadow: 2px 0 10px #76c800; border-color: #76c800; transform: skewX(1deg) scale(1.04); }
            100% { box-shadow: 0 0 5px #76c800; border-color: #76c800; transform: skewX(0deg) scale(1.03); }
        }
        body[data-theme="gumi"] .channel:hover {
            animation: gumi-synth 0.4s infinite !important;
            border: 2px solid #76c800 !important;
        }

        /* Windows 7 Base Adjustments */
        body[data-theme="img0121"] { font-family: "Segoe UI", Tahoma, sans-serif !important; }
        body[data-theme="img0121"] .channel { background: rgba(255, 255, 255, 0.15) !important; border: 1px solid rgba(255, 255, 255, 0.5) !important; border-radius: 4px !important; box-shadow: inset 0 0 10px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4) !important; backdrop-filter: blur(5px) !important; transition: all 0.2s; }
        body[data-theme="img0121"] .channel:hover { background: rgba(255, 255, 255, 0.3) !important; box-shadow: inset 0 0 15px rgba(255,255,255,0.6), 0 6px 12px rgba(0,0,0,0.5) !important; border: 1px solid rgba(255, 255, 255, 0.8) !important; transform: scale(1.02); }
        body[data-theme="img0121"] .bottom-bar { background: linear-gradient(to bottom, rgba(122,176,218,0.85) 0%, rgba(85,152,203,0.85) 45%, rgba(13,101,165,0.85) 50%, rgba(55,142,200,0.85) 100%) !important; border-top: 1px solid rgba(255,255,255,0.6) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), 0 -2px 10px rgba(0,0,0,0.5) !important; backdrop-filter: blur(10px) !important; border-radius: 0 !important; height: 48px !important; }
        body[data-theme="img0121"] .top-bar { background: linear-gradient(to bottom, rgba(122,176,218,0.75), rgba(13,101,165,0.75)) !important; border-bottom: 1px solid rgba(255,255,255,0.5) !important; backdrop-filter: blur(10px) !important; border-radius: 0 0 8px 8px !important; box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important; }
        body[data-theme="img0121"] .theme-menu, body[data-theme="img0121"] .player-modal { background: rgba(15, 25, 40, 0.6) !important; border: 1px solid rgba(255, 255, 255, 0.5) !important; border-radius: 8px !important; box-shadow: inset 0 0 8px rgba(255,255,255,0.4), 0 15px 30px rgba(0,0,0,0.6) !important; backdrop-filter: blur(15px) !important; }
        body[data-theme="img0121"] button, body[data-theme="img0121"] .round-btn { background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(0,0,0,0.2)) !important; border: 1px solid rgba(255,255,255,0.5) !important; border-radius: 4px !important; color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.8); box-shadow: inset 0 1px 2px rgba(255,255,255,0.4) !important; }
        body[data-theme="img0121"] button:hover, body[data-theme="img0121"] .round-btn:hover { background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1)) !important; box-shadow: inset 0 0 10px rgba(59, 130, 246, 0.8) !important; border-color: #3b82f6 !important; }
    `;
    document.head.appendChild(styleBlock);
}

// Ensure the styles are injected when the window loads
window.addEventListener('DOMContentLoaded', () => {
    injectAdvancedThemeStyles();
});
loadSavedData();
