// --- Theme Database ---[cite: 1]
const themes = {
    'default': { bg: '#e4e7eb' },
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

// --- Complete Game Library Array ---[cite: 2]
const games = [
    { title: '60 Seconds! Reatomized', url: '/games/60 Seconds! Reatomized.html', img: '/assets/IMG_9887.gif' },
    { title: 'Bad Piggies', url: '/games/Bad Piggies.html', img: '/assets/IMG_9888.gif' },
    { title: 'Balatro', url: '/games/Balatro.html', img: '/assets/IMG_9889.gif' },
    { title: 'BeatBlock', url: '/games/BeatBlock.html', img: '/assets/IMG_9890.gif' },
    { title: 'FISH', url: '/games/FISH.html', img: '/assets/IMG_9891.gif' },
    { title: 'Grand Theft Auto 3', url: '/games/Grand Theft Auto 3.html', img: '/assets/IMG_9892.gif' },
    { title: 'GTA Vice City', url: '/games/Grand Theft Auto_ Vice City.html', img: '/assets/IMG_9893.gif' },
    { title: 'Hollow Knight', url: '/games/Hollow Knight.html', img: '/assets/IMG_9894.gif' },
    { title: 'Hollow Knight Silksong', url: '/games/Hollow Knight_ Silksong.html', img: '/assets/IMG_9895.gif' },
    { title: 'In Stars and Time', url: '/games/In Stars and Time.html', img: '/assets/IMG_9896.jpeg' },
    { title: 'Kirby Soft & Wet', url: '/games/Kirby ~ Soft & Wet.html', img: '/assets/IMG_9897.png' },
    { title: 'OMORI', url: '/games/OMORI.html', img: '/assets/IMG_9898.gif' },
    { title: 'Off', url: '/games/Off.html', img: '/assets/IMG_9899.gif' },
    { title: 'One Shot World Machine', url: '/games/One Shot_ World Machine edition.html', img: '/assets/IMG_9900.gif' },
    { title: 'PikuNiku', url: '/games/PikuNiku.html', img: '/assets/IMG_9901.gif' },
    { title: 'PvZ', url: '/games/PvZ.html', img: '/assets/IMG_9902.gif' },
    { title: 'Stardew Valley', url: '/games/Stardew Valley.html', img: '/assets/IMG_9903.gif' },
    { title: 'Terraria', url: '/games/Terraria.html', img: '/assets/IMG_9904.gif' },
    { title: 'WebFishing', url: '/games/WebFishing.html', img: '/assets/IMG_9905.gif' },
    { title: 'Binding of Isaac', url: '/games/clbindingofisaccsheeptime.html', img: '/assets/IMG_9906.gif' },
    { title: 'Cave Story', url: '/games/clcavestory.html', img: '/assets/IMG_9907.gif' },
    { title: 'Metal Slug', url: '/games/clmetalslug.html', img: '/assets/IMG_9908.gif' },
    { title: 'Metal Slug 2', url: '/games/clmetalslug2.html', img: '/assets/IMG_9909.gif' },
    { title: 'Solatorobo', url: '/games/clsolatrobo.html', img: '/assets/IMG_9911.webp' },
    { title: 'Undertale', url: '/games/clundertale.html', img: '/assets/IMG_9912.gif' },
    { title: 'FNAF 1', url: '/games/clFNAF.html', img: '/assets/IMG_9945.jpeg' },
    { title: 'FNAF 2', url: '/games/clFNAF2.html', img: '/assets/IMG_9946.jpeg' },
    { title: 'FNAF 3', url: '/games/clFNAF3.html', img: '/assets/IMG_9947.jpeg' },
    { title: 'FNAF 4', url: '/games/clFNAF4.html', img: '/assets/IMG_9948.jpeg' },
    { title: 'FNAF Sister Location', url: '/games/clfnafsl.html', img: '/assets/IMG_9949.jpeg' },
    { title: 'FNAF Pizzeria Simulator', url: '/games/clfnafps.html', img: '/assets/IMG_9950.jpeg' },
    { title: 'Mortal Kombat', url: '/games/clmortalkombata.html', img: '/assets/IMG_9951.jpeg' },
    { title: 'Mortal Kombat 2', url: '/games/clmortalkombat2a.html', img: '/assets/IMG_9952.jpeg' },
    { title: 'Run', url: '/games/clrun.html', img: '/assets/IMG_0329.jpeg' },
    { title: 'Run 2', url: '/games/clrun-2.html', img: '/assets/IMG_0330.jpeg' },
    { title: 'Doom DOS', url: '/games/cldoomdos.html', img: '/assets/IMG_9955.jpeg' },
    { title: 'Doom 2 DOS', url: '/games/cldoom2dos.html', img: '/assets/IMG_9956.jpeg' },
    { title: 'Spelunky', url: '/games/clspelunky.html', img: '/assets/IMG_9957.png' },
    { title: 'Five Nights at Frickbear\'s 3', url: '/games/clfivenightsatfrickbears3.html', img: '/assets/IMG_9958.jpeg' },
    { title: 'Scratch Options', url: '/games/clscratchoptions.html', img: '/assets/IMG_9959.png' },
    { title: 'Endacopia', url: '/games/Endacopia.html', img: '/assets/IMG_9964.jpeg' },
    { title: 'ULTRAKILL', url: '/games/ULTRAKILL.html', img: '/assets/IMG_9965.jpeg' },
    { title: 'Klonoa', url: '/games/clklonoachd.html', img: '/assets/IMG_0117.jpeg' },
    { title: 'Bendy and the Ink Machine', url: '/games/Bendy and the Ink Machine_ ALL CHAPTERS.html', img: '/assets/IMG_0255.jpeg' },
    { title: 'Vib-Ribbon', url: '/games/Vib-Ribbon.html', img: '/assets/IMG_0256.jpeg' },
    { title: 'Clover Pit', url: '/games/Clover Pit.html', img: '/assets/IMG_0257.jpeg' },
    { title: 'Just Shapes & Beats', url: '/games/Just Shapes & Beats.html', img: '/assets/IMG_0262.jpeg' },
    { title: 'I Have No Mouth', url: '/games/I Have No Mouth, and I Must Scream.html', img: '/assets/IMG_0259.jpeg' },
    { title: 'Plague Inc', url: '/games/Plague Inc.html', img: '/assets/IMG_0260.webp' },
    { title: 'PEAK', url: '/games/PEAK.html', img: '/assets/IMG_0261.jpeg' },
    { title: 'Big Money', url: '/games/BigMoney.html', img: '/assets/IMG_0273.png' },
    { title: 'Get to the top', url: '/games/GTTTATINT.html', img: '/assets/IMG_0274.png' },
    { title: 'TIME FCUK', url: '/games/TimeFcuk.html', img: '/assets/IMG_0275.jpeg' },
    { title: 'Mother 1', url: '/games/clearthboundbeginnings.html', img: '/assets/IMG_0390.jpeg' },
    { title: 'Mother 2', url: '/games/clearthboundsnes.html', img: '/assets/IMG_0391.jpeg' },
    { title: 'Mother 3', url: '/games/clearthbound3.html', img: '/assets/IMG_0392.jpeg' },
    { title: 'Fez', url: '/games/fez.html', img: '/assets/IMG_0393.jpeg' },
    { title: 'Team Fortress 2', url: '/games/Team Fortress 2.html', img: '/assets/IMG_0399.jpeg' },
    { title: 'Geometry Dash', url: '/games/Geometry Dash.html', img: '/assets/IMG_0400.jpeg' },
    { title: 'JoJo\'s Bizarre Adventure', url: '/games/JoJo\'s Bizarre Adventure_ Heritage for the Future.html', img: '/assets/IMG_0401.jpeg' },
    { title: 'Lethal Company', url: '/games/Lethal Company.html', img: '/assets/IMG_0402.jpeg' },
    { title: 'TABS', url: '/games/Totally Accurate Battle Simulator (TABS).html', img: '/assets/IMG_0403.jpeg' },
    { title: 'YOMI HUSTLE', url: '/games/Your Only Move Is HUSTLE.html', img: '/assets/IMG_0404.jpeg' },
    { title: 'Baldi\'s Basics Plus', url: '/games/Baldi\'s Basics Plus.html', img: '/assets/IMG_0425.jpeg' },
    { title: 'Sonic the Hedgehog', url: '/games/clsonicthehedgehog.html', img: '/assets/IMG_0458.jpeg' },
    { title: 'Sonic the Hedgehog 2', url: '/games/clsonicthehedgehog2.html', img: '/assets/IMG_0459.jpeg' },
    { title: 'Sonic the Hedgehog 3', url: '/games/clsonicthehedgehog3.html', img: '/assets/IMG_0460.png' },
    { title: 'Sonic and Knuckles', url: '/games/clsonicandknuckles.html', img: '/assets/IMG_0461.jpeg' },
    { title: 'Good Boy Galaxy', url: '/games/clgoodboygalaxy.html', img: '/assets/IMG_0462.jpeg' },
    { title: 'Rimworld', url: '/games/rimworld.html', img: '/assets/IMG_0463.jpeg' },
    { title: 'Cuphead', url: '/games/cuphead.html', img: '/assets/IMG_0467.png' },
    { title: 'SCP: Containment Breach', url: '/games/scp.html', img: '/assets/IMG_0468.jpeg' },
    { title: 'Mega Man', url: '/games/clmegaman.html', img: '/assets/IMG_0480.jpeg' },
    { title: 'Mega Man 2', url: '/games/clmegaman2.html', img: '/assets/IMG_0481.jpeg' },
    { title: 'Mega Man 3', url: '/games/clmegaman3.html', img: '/assets/IMG_0482.jpeg' },
    { title: 'Mega Man 4', url: '/games/clmegaman4.html', img: '/assets/IMG_0483.jpeg' },
    { title: 'Mega Man 5', url: '/games/clmegaman5.html', img: '/assets/IMG_0484.jpeg' },
    { title: 'Mega Man 6', url: '/games/clmegaman6.html', img: '/assets/IMG_0485.jpeg' },
    { title: 'Mega Man 7', url: '/games/clmegaman7.html', img: '/assets/IMG_0486.jpeg' },
    { title: 'Mega Man 8', url: '/games/clmegaman8.html', img: '/assets/IMG_0487.webp' },
    { title: 'Kirby Canvas Curse', url: '/games/clkirbycanvascurse.html', img: '/assets/IMG_0493.jpeg' },
    { title: 'Kirby Squeak Squad', url: '/games/clkirbysqueaksquad.html', img: '/assets/IMG_0489.png' },
    { title: 'Kirby Super Star Ultra', url: '/games/clkirbysuperstarultra.html', img: '/assets/IMG_0495.jpeg' },
    { title: 'Kirby Mass Attack', url: '/games/clkirbymassattack.html', img: '/assets/IMG_0496.jpeg' },
    { title: 'Ristar', url: '/games/clristar.html', img: '/assets/IMG_0497.jpeg' },
    { title: 'Dynamite Headdy', url: '/games/cldynamiteheaddy.html', img: '/assets/IMG_0498.jpeg' },
    { title: 'Sonic R', url: '/games/clsonicr.html', img: '/assets/IMG_0499.jpeg' },
    { title: 'Yume Nikki', url: '/games/clyumenikki.html', img: '/assets/IMG_0500.jpeg' },
    { title: 'Super Mario Bros.', url: '/games/clsupermario.html', img: '/assets/IMG_0503.jpeg' },
    { title: 'Super Mario Bros 2 JP', url: '/games/clmariolostlevels.html', img: '/assets/IMG_0504.webp' },
    { title: 'Super Mario Bros 2 US', url: '/games/clsupermariobros2us.html', img: '/assets/IMG_0505.jpeg' },
    { title: 'Super Mario Bros 3', url: '/games/clmario3.html', img: '/assets/IMG_0506.jpeg' }
];

let currentPage = 0;
const itemsPerPage = 12; // 4 columns wide by 3 rows high = 12 games per page
let filteredGames = [...games];

// --- Render Channels & Page Dots ---
function renderChannels() {
    const grid = document.getElementById('channelGrid');
    grid.innerHTML = '';
    
    const totalPages = Math.ceil(filteredGames.length / itemsPerPage) || 1;
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    if (currentPage < 0) currentPage = 0;

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageGames = filteredGames.slice(start, end);

    for (let i = 0; i < itemsPerPage; i++) {
        const card = document.createElement('div');
        card.className = 'wii-channel-card';
        
        if (pageGames[i]) {
            const g = pageGames[i];
            card.onclick = () => playGame(g.url, g.title);
            card.innerHTML = `<img src="${g.img}" alt="${g.title}" title="${g.title}">`;
        } else {
            card.style.opacity = '0.2';
            card.style.cursor = 'default';
        }
        grid.appendChild(card);
    }
    
    renderDots(totalPages);
}

function renderDots(totalPages) {
    const dotsContainer = document.getElementById('dotsIndicator');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const span = document.createElement('span');
        span.className = `dot-dash ${i === currentPage ? 'active' : ''}`;
        span.innerText = '-';
        dotsContainer.appendChild(span);
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredGames.length / itemsPerPage) || 1;
    currentPage += direction;
    if (currentPage < 0) currentPage = totalPages - 1;
    if (currentPage >= totalPages) currentPage = 0;
    renderChannels();
}

// --- Search Filtering ---
function filterGames() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    filteredGames = games.filter(g => g.title.toLowerCase().includes(query));
    currentPage = 0;
    renderChannels();
}

// --- Recommend Random Game ---
function recommendGame() {
    if (games.length === 0) return;
    const randomGame = games[Math.floor(Math.random() * games.length)];
    playGame(randomGame.url, randomGame.title);
}

// --- Hide Games Toggle ---
let gamesHidden = false;
function toggleHideGames() {
    gamesHidden = !gamesHidden;
    const grid = document.getElementById('channelGrid');
    grid.style.visibility = gamesHidden ? 'hidden' : 'visible';
}

// --- Populate Theme Window Dynamically ---[cite: 1]
const themeListContainer = document.getElementById('theme-list');
for (const [key, theme] of Object.entries(themes)) {
    const row = document.createElement('div');
    row.className = 'theme-row';
    row.innerHTML = `
        <input type="radio" id="theme-${key}" name="theme" value="${key}" onclick="setLegacyTheme('${key}')">
        <label for="theme-${key}" style="cursor: pointer; width: 100%;">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
    `;
    themeListContainer.appendChild(row);
}

// --- Apply Theme Logic ---[cite: 1]
function setLegacyTheme(themeName) {
    const t = themes[themeName];
    if (t.bgImg) {
        document.body.style.backgroundImage = `url('${t.bgImg}')`;
        document.body.style.backgroundColor = t.bg || '#000';
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = t.bg;
    }

    const mascot = document.getElementById('desktop-mascot');
    if (t.mascotImg) {
        mascot.src = t.mascotImg;
        mascot.style.display = 'block';
    } else {
        mascot.style.display = 'none';
        mascot.src = '';
    }

    localStorage.setItem('wii_webstring_theme', themeName);
}

// --- Modal & Game Player Management ---
function openThemeModal() {
  document.getElementById('themeModal').style.display = 'flex';
}
function closeThemeModal() {
  document.getElementById('themeModal').style.display = 'none';
}

function playGame(url, title) {
  document.getElementById('gameTitle').innerText = title;
  document.getElementById('gameFrame').src = url;
  document.getElementById('gamePlayerModal').style.display = 'flex';
}

function closeGame() {
  document.getElementById('gameFrame').src = ''; 
  document.getElementById('gamePlayerModal').style.display = 'none';
}

let isMaximized = false;
function maximizeGame() {
  const modalWin = document.querySelector('.player-window');
  if (isMaximized) {
    modalWin.style.width = '85vw';
    modalWin.style.height = '85vh';
    isMaximized = false;
  } else {
    modalWin.style.width = '100vw';
    modalWin.style.height = '100vh';
    modalWin.style.borderRadius = '0';
    isMaximized = true;
  }
}

// --- Initialization ---[cite: 1]
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('wii_webstring_theme') || 'default';
    setLegacyTheme(savedTheme);
    
    const themeRadio = document.getElementById(`theme-${savedTheme}`);
    if (themeRadio) {
        themeRadio.checked = true;
    }
    
    renderChannels();
});
