// --- Theme Database ---
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

// --- Complete Game Library Array ---
const games = [
    // Page 1
    { title: '60 Seconds! Reatomized', url: '/games/60 Seconds! Reatomized.html', img: '/assets/IMG_9887.gif', exe: '60_Secs.exe' },
    { title: 'Bad Piggies', url: '/games/Bad Piggies.html', img: '/assets/IMG_9888.gif', exe: 'BadPiggies.exe' },
    { title: 'Balatro', url: '/games/Balatro.html', img: '/assets/IMG_9889.gif', exe: 'Balatro.exe' },
    { title: 'BeatBlock', url: '/games/BeatBlock.html', img: '/assets/IMG_9890.gif', exe: 'BeatBlock.exe' },
    { title: 'FISH', url: '/games/FISH.html', img: '/assets/IMG_9891.gif', exe: 'FISH.exe' },
    { title: 'Grand Theft Auto 3', url: '/games/Grand Theft Auto 3.html', img: '/assets/IMG_9892.gif', exe: 'GTA3.exe' },
    { title: 'GTA Vice City', url: '/games/Grand Theft Auto_ Vice City.html', img: '/assets/IMG_9893.gif', exe: 'GTAVC.exe' },
    { title: 'Hollow Knight', url: '/games/Hollow Knight.html', img: '/assets/IMG_9894.gif', exe: 'HKnight.exe' },
    { title: 'Hollow Knight Silksong', url: '/games/Hollow Knight_ Silksong.html', img: '/assets/IMG_9895.gif', exe: 'Silksong.exe' },
    { title: 'In Stars and Time', url: '/games/In Stars and Time.html', img: '/assets/IMG_9896.jpeg', exe: 'ISAT.exe' },
    { title: 'Kirby Soft & Wet', url: '/games/Kirby ~ Soft & Wet.html', img: '/assets/IMG_9897.png', exe: 'KirbySW.exe' },
    { title: 'OMORI', url: '/games/OMORI.html', img: '/assets/IMG_9898.gif', exe: 'OMORI.exe' },
    // Page 2
    { title: 'Off', url: '/games/Off.html', img: '/assets/IMG_9899.gif', exe: 'Off.exe' },
    { title: 'One Shot World Machine', url: '/games/One Shot_ World Machine edition.html', img: '/assets/IMG_9900.gif', exe: 'OneShot.exe' },
    { title: 'PikuNiku', url: '/games/PikuNiku.html', img: '/assets/IMG_9901.gif', exe: 'PikuNiku.exe' },
    { title: 'PvZ', url: '/games/PvZ.html', img: '/assets/IMG_9902.gif', exe: 'PvZ.exe' },
    { title: 'Stardew Valley', url: '/games/Stardew Valley.html', img: '/assets/IMG_9903.gif', exe: 'Stardew.exe' },
    { title: 'Terraria', url: '/games/Terraria.html', img: '/assets/IMG_9904.gif', exe: 'Terraria.exe' },
    { title: 'WebFishing', url: '/games/WebFishing.html', img: '/assets/IMG_9905.gif', exe: 'WebFish.exe' },
    { title: 'Binding of Isaac', url: '/games/clbindingofisaccsheeptime.html', img: '/assets/IMG_9906.gif', exe: 'Isaac.exe' },
    { title: 'Cave Story', url: '/games/clcavestory.html', img: '/assets/IMG_9907.gif', exe: 'CaveStory.exe' },
    { title: 'Metal Slug', url: '/games/clmetalslug.html', img: '/assets/IMG_9908.gif', exe: 'MSlug.exe' },
    { title: 'Metal Slug 2', url: '/games/clmetalslug2.html', img: '/assets/IMG_9909.gif', exe: 'MSlug2.exe' },
    { title: 'Solatorobo', url: '/games/clsolatrobo.html', img: '/assets/IMG_9911.webp', exe: 'Solatorobo.exe' },
    // Page 3
    { title: 'Undertale', url: '/games/clundertale.html', img: '/assets/IMG_9912.gif', exe: 'Undertale.exe' },
    { title: 'FNAF 1', url: '/games/clFNAF.html', img: '/assets/IMG_9945.jpeg', exe: 'FNAF1.exe' },
    { title: 'FNAF 2', url: '/games/clFNAF2.html', img: '/assets/IMG_9946.jpeg', exe: 'FNAF2.exe' },
    { title: 'FNAF 3', url: '/games/clFNAF3.html', img: '/assets/IMG_9947.jpeg', exe: 'FNAF3.exe' },
    { title: 'FNAF 4', url: '/games/clFNAF4.html', img: '/assets/IMG_9948.jpeg', exe: 'FNAF4.exe' },
    { title: 'FNAF Sister Location', url: '/games/clfnafsl.html', img: '/assets/IMG_9949.jpeg', exe: 'FNAF_SL.exe' },
    { title: 'FNAF Pizzeria Simulator', url: '/games/clfnafps.html', img: '/assets/IMG_9950.jpeg', exe: 'FNAF_PS.exe' },
    { title: 'Mortal Kombat', url: '/games/clmortalkombata.html', img: '/assets/IMG_9951.jpeg', exe: 'MK1.exe' },
    { title: 'Mortal Kombat 2', url: '/games/clmortalkombat2a.html', img: '/assets/IMG_9952.jpeg', exe: 'MK2.exe' },
    { title: 'Run', url: '/games/clrun.html', img: '/assets/IMG_0329.jpeg', exe: 'Run.exe' },
    { title: 'Run 2', url: '/games/clrun-2.html', img: '/assets/IMG_0330.jpeg', exe: 'Run2.exe' },
    { title: 'Doom DOS', url: '/games/cldoomdos.html', img: '/assets/IMG_9955.jpeg', exe: 'Doom.exe' },
    // Page 4
    { title: 'Doom 2 DOS', url: '/games/cldoom2dos.html', img: '/assets/IMG_9956.jpeg', exe: 'Doom2.exe' },
    { title: 'Spelunky', url: '/games/clspelunky.html', img: '/assets/IMG_9957.png', exe: 'Spelunky.exe' },
    { title: 'Five Nights at Frickbear\'s 3', url: '/games/clfivenightsatfrickbears3.html', img: '/assets/IMG_9958.jpeg', exe: 'FNaFric.exe' },
    { title: 'Scratch Options', url: '/games/clscratchoptions.html', img: '/assets/IMG_9959.png', exe: 'Scratch.exe' },
    { title: 'Endacopia', url: '/games/Endacopia.html', img: '/assets/IMG_9964.jpeg', exe: 'Endacopia.exe' },
    { title: 'ULTRAKILL', url: '/games/ULTRAKILL.html', img: '/assets/IMG_9965.jpeg', exe: 'Ultrakill.exe' },
    { title: 'Klonoa', url: '/games/clklonoachd.html', img: '/assets/IMG_0117.jpeg', exe: 'Klonoa.exe' },
    { title: 'Bendy and the Ink Machine', url: '/games/Bendy and the Ink Machine_ ALL CHAPTERS.html', img: '/assets/IMG_0255.jpeg', exe: 'Bendy.exe' },
    { title: 'Vib-Ribbon', url: '/games/Vib-Ribbon.html', img: '/assets/IMG_0256.jpeg', exe: 'VibRibbon.exe' },
    { title: 'Clover Pit', url: '/games/Clover Pit.html', img: '/assets/IMG_0257.jpeg', exe: 'CloverPit.exe' },
    { title: 'Just Shapes & Beats', url: '/games/Just Shapes & Beats.html', img: '/assets/IMG_0262.jpeg', exe: 'JSAB.exe' },
    { title: 'I Have No Mouth', url: '/games/I Have No Mouth, and I Must Scream.html', img: '/assets/IMG_0259.jpeg', exe: 'IHNM.exe' },
    // Page 5
    { title: 'Plague Inc', url: '/games/Plague Inc.html', img: '/assets/IMG_0260.webp', exe: 'PlagueInc.exe' },
    { title: 'PEAK', url: '/games/PEAK.html', img: '/assets/IMG_0261.jpeg', exe: 'PEAK.exe' },
    { title: 'Big Money', url: '/games/BigMoney.html', img: '/assets/IMG_0273.png', exe: 'BigMoney.exe' },
    { title: 'Get to the top', url: '/games/GTTTATINT.html', img: '/assets/IMG_0274.png', exe: 'GTTTATINT.exe' },
    { title: 'TIME FCUK', url: '/games/TimeFcuk.html', img: '/assets/IMG_0275.jpeg', exe: 'TimeFcuk.exe' },
    { title: 'Mother 1', url: '/games/clearthboundbeginnings.html', img: '/assets/IMG_0390.jpeg', exe: 'Mother1.exe' },
    { title: 'Mother 2', url: '/games/clearthboundsnes.html', img: '/assets/IMG_0391.jpeg', exe: 'Mother2.exe' },
    { title: 'Mother 3', url: '/games/clearthbound3.html', img: '/assets/IMG_0392.jpeg', exe: 'Mother3.exe' },
    { title: 'Fez', url: '/games/fez.html', img: '/assets/IMG_0393.jpeg', exe: 'Fez.exe' },
    { title: 'Team Fortress 2', url: '/games/Team Fortress 2.html', img: '/assets/IMG_0399.jpeg', exe: 'TF2.exe' },
    { title: 'Geometry Dash', url: '/games/Geometry Dash.html', img: '/assets/IMG_0400.jpeg', exe: 'GeoDash.exe' },
    { title: 'JoJo\'s Bizarre Adventure', url: '/games/JoJo\'s Bizarre Adventure_ Heritage for the Future.html', img: '/assets/IMG_0401.jpeg', exe: 'JoJo.exe' },
    // Page 6
    { title: 'Lethal Company', url: '/games/Lethal Company.html', img: '/assets/IMG_0402.jpeg', exe: 'LethalCo.exe' },
    { title: 'TABS', url: '/games/Totally Accurate Battle Simulator (TABS).html', img: '/assets/IMG_0403.jpeg', exe: 'TABS.exe' },
    { title: 'YOMI HUSTLE', url: '/games/Your Only Move Is HUSTLE.html', img: '/assets/IMG_0404.jpeg', exe: 'YOMI.exe' },
    { title: 'Baldi\'s Basics Plus', url: '/games/Baldi\'s Basics Plus.html', img: '/assets/IMG_0425.jpeg', exe: 'Baldi.exe' },
    { title: 'Sonic the Hedgehog', url: '/games/clsonicthehedgehog.html', img: '/assets/IMG_0458.jpeg', exe: 'Sonic1.exe' },
    { title: 'Sonic the Hedgehog 2', url: '/games/clsonicthehedgehog2.html', img: '/assets/IMG_0459.jpeg', exe: 'Sonic2.exe' },
    { title: 'Sonic the Hedgehog 3', url: '/games/clsonicthehedgehog3.html', img: '/assets/IMG_0460.png', exe: 'Sonic3.exe' },
    { title: 'Sonic and Knuckles', url: '/games/clsonicandknuckles.html', img: '/assets/IMG_0461.jpeg', exe: 'SonicKnux.exe' },
    { title: 'Good Boy Galaxy', url: '/games/clgoodboygalaxy.html', img: '/assets/IMG_0462.jpeg', exe: 'GoodBoy.exe' },
    { title: 'Rimworld', url: '/games/rimworld.html', img: '/assets/IMG_0463.jpeg', exe: 'Rimworld.exe' },
    { title: 'Cuphead', url: '/games/cuphead.html', img: '/assets/IMG_0467.png', exe: 'Cuphead.exe' },
    { title: 'SCP: Containment Breach', url: '/games/scp.html', img: '/assets/IMG_0468.jpeg', exe: 'SCP.exe' },
    // Page 7
    { title: 'Mega Man', url: '/games/clmegaman.html', img: '/assets/IMG_0480.jpeg', exe: 'MegaMan1.exe' },
    { title: 'Mega Man 2', url: '/games/clmegaman2.html', img: '/assets/IMG_0481.jpeg', exe: 'MegaMan2.exe' },
    { title: 'Mega Man 3', url: '/games/clmegaman3.html', img: '/assets/IMG_0482.jpeg', exe: 'MegaMan3.exe' },
    { title: 'Mega Man 4', url: '/games/clmegaman4.html', img: '/assets/IMG_0483.jpeg', exe: 'MegaMan4.exe' },
    { title: 'Mega Man 5', url: '/games/clmegaman5.html', img: '/assets/IMG_0484.jpeg', exe: 'MegaMan5.exe' },
    { title: 'Mega Man 6', url: '/games/clmegaman6.html', img: '/assets/IMG_0485.jpeg', exe: 'MegaMan6.exe' },
    { title: 'Mega Man 7', url: '/games/clmegaman7.html', img: '/assets/IMG_0486.jpeg', exe: 'MegaMan7.exe' },
    { title: 'Mega Man 8', url: '/games/clmegaman8.html', img: '/assets/IMG_0487.webp', exe: 'MegaMan8.exe' },
    { title: 'Kirby Canvas Curse', url: '/games/clkirbycanvascurse.html', img: '/assets/IMG_0493.jpeg', exe: 'KirbyCC.exe' },
    { title: 'Kirby Squeak Squad', url: '/games/clkirbysqueaksquad.html', img: '/assets/IMG_0489.png', exe: 'KirbySS.exe' },
    { title: 'Kirby Super Star Ultra', url: '/games/clkirbysuperstarultra.html', img: '/assets/IMG_0495.jpeg', exe: 'KirbySSU.exe' },
    { title: 'Kirby Mass Attack', url: '/games/clkirbymassattack.html', img: '/assets/IMG_0496.jpeg', exe: 'KirbyMA.exe' },
    // Page 8
    { title: 'Ristar', url: '/games/clristar.html', img: '/assets/IMG_0497.jpeg', exe: 'Ristar.exe' },
    { title: 'Dynamite Headdy', url: '/games/cldynamiteheaddy.html', img: '/assets/IMG_0498.jpeg', exe: 'DHeaddy.exe' },
    { title: 'Sonic R', url: '/games/clsonicr.html', img: '/assets/IMG_0499.jpeg', exe: 'SonicR.exe' },
    { title: 'Yume Nikki', url: '/games/clyumenikki.html', img: '/assets/IMG_0500.jpeg', exe: 'YumeNikki.exe' },
    { title: 'Super Mario Bros.', url: '/games/clsupermario.html', img: '/assets/IMG_0503.jpeg', exe: 'SMB1.exe' },
    { title: 'Super Mario Bros 2 JP', url: '/games/clmariolostlevels.html', img: '/assets/IMG_0504.webp', exe: 'SMB2_JP.exe' },
    { title: 'Super Mario Bros 2 US', url: '/games/clsupermariobros2us.html', img: '/assets/IMG_0505.jpeg', exe: 'SMB2_US.exe' },
    { title: 'Super Mario Bros 3', url: '/games/clmario3.html', img: '/assets/IMG_0506.jpeg', exe: 'SMB3.exe' }
];

let currentPage = 0;
const itemsPerPage = 12;
const totalPages = Math.ceil(games.length / itemsPerPage);

// --- Render Wii Channels for Current Page ---
function renderChannels() {
    const grid = document.getElementById('channelGrid');
    grid.innerHTML = '';
    
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageGames = games.slice(start, end);

    for (let i = 0; i < itemsPerPage; i++) {
        const card = document.createElement('div');
        card.className = 'wii-channel-card';
        
        if (pageGames[i]) {
            const g = pageGames[i];
            card.onclick = () => playGame(g.url, g.title);
            card.innerHTML = `
                <img src="${g.img}" alt="${g.title}">
                <span>${g.exe}</span>
            `;
        } else {
            // Empty Wii channel slot
            card.style.opacity = '0.3';
            card.style.cursor = 'default';
        }
        grid.appendChild(card);
    }
    
    document.getElementById('pageIndicator').innerText = `Page ${currentPage + 1} / ${totalPages}`;
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 0) currentPage = totalPages - 1;
    if (currentPage >= totalPages) currentPage = 0;
    renderChannels();
}

// --- Populate Theme Window Dynamically ---
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

// --- Apply Theme Logic ---
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

// --- Wii Clock & Date ---
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
  document.getElementById('dateDisplay').innerText = now.toLocaleDateString('en-US', options);
}, 1000);

// --- Modal & Game Player Management ---
function openThemeModal() {
  document.getElementById('themeModal').style.display = 'flex';
}
function closeThemeModal() {
  document.getElementById('themeModal').style.display = 'none';
}

function playGame(url, title) {
  document.getElementById('gameTitle').innerText = title + " - Internet Channel";
  document.getElementById('gameFrame').src = url;
  document.getElementById('gamePlayerModal').style.display = 'flex';
}

function closeGame() {
  document.getElementById('gameFrame').src = ''; // Stops audio/game process
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('wii_webstring_theme') || 'default';
    setLegacyTheme(savedTheme);
    
    const themeRadio = document.getElementById(`theme-${savedTheme}`);
    if (themeRadio) {
        themeRadio.checked = true;
    }
    
    renderChannels();
});
