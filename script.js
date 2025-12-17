/* =========================================
   1. TRANSLATION DATA (English / Telugu)
   ========================================= */
const translations = {
    en: {
        // Nav & Home
        nav_home: "Home",
        nav_videos: "Latest Drops",
        nav_mission: "Mission",
        nav_join: "Join Squad",
        hero_desc: "The elite platform for student motivation. Turn your stress into strength and your dreams into reality.",
        btn_watch: "Start Watching",
        btn_youtube: "Visit YouTube →",
        stat_students: "Students Inspired",
        stat_videos: "Videos Uploaded",
        stat_success: "Success Stories",
        sec_latest: "LATEST",
        sec_drops: "DROPS",
        card_watch: "Watch Now →",
        
        // Mission Page
        msn_badge: "OUR PURPOSE",
        msn_prob_title: "The Problem",
        msn_prob_desc: "Students today are drowning in pressure. The system tells you to memorize, but the world expects you to innovate. Anxiety is high, and motivation is low.",
        msn_word_pressure: "Pressure",
        msn_sol_title: "The Solution",
        msn_sol_desc: "NaaBadi is the anti-boring platform. We cut the fluff and deliver raw, high-energy motivation and strategy. We turn your study sessions into power hours.",
        msn_word_power: "Power",
        msn_core: "CORE",
        msn_values: "VALUES",
        val_1_title: "Mindset First",
        val_1_desc: "Skills are cheap. Mentality is priceless.",
        val_2_title: "Relentless Grind",
        val_2_desc: "We don't stop when we're tired. We stop when we're done.",
        val_3_title: "Squad Goals",
        val_3_desc: "You become the average of the 5 people around you. Choose wisely.",
        msn_quote: "Education is not just about filling a bucket, but lighting a fire."
    },
    te: {
        // Nav & Home
        nav_home: "హోమ్",
        nav_videos: "తాజా వీడియోలు",
        nav_mission: "లక్ష్యం",
        nav_join: "జాయిన్ అవ్వండి",
        hero_desc: "విద్యార్థుల ప్రేరణ కోసం ఒక ఎలైట్ ప్లాట్‌ఫారమ్. మీ ఒత్తిడిని బలంగా మార్చుకోండి, మీ కలలను నిజం చేసుకోండి.",
        btn_watch: "వీడియోలు చూడండి",
        btn_youtube: "యూట్యూబ్ చూడండి →",
        stat_students: "ప్రేరణ పొందిన విద్యార్థులు",
        stat_videos: "అప్‌లోడ్ చేసిన వీడియోలు",
        stat_success: "విజయ కథలు",
        sec_latest: "తాజా",
        sec_drops: "విడుదలలు",
        card_watch: "ఇప్పుడే చూడండి →",

        // Mission Page
        msn_badge: "మా ఉద్దేశ్యం",
        msn_prob_title: "సమస్య",
        msn_prob_desc: "నేటి విద్యార్థులు ఒత్తిడిలో మునిగిపోతున్నారు. వ్యవస్థ మిమ్మల్ని బట్టీ కొట్టమని చెబుతుంది, కానీ ప్రపంచం మీరు ఆవిష్కరించాలని కోరుకుంటుంది.",
        msn_word_pressure: "ఒత్తిడి",
        msn_sol_title: "పరిష్కారం",
        msn_sol_desc: "NaaBadi అనేది విద్యార్థుల శక్తిని పెంచే ప్లాట్‌ఫారమ్. మేము మీ చదువును బోరింగ్ నుండి పవర్‌ఫుల్ గా మారుస్తాము.",
        msn_word_power: "శక్తి",
        msn_core: "ప్రధాన",
        msn_values: "విలువలు",
        val_1_title: "మైండ్‌సెట్ ముఖ్యం",
        val_1_desc: "నైపుణ్యాలు ఎవరైనా నేర్చుకోవచ్చు. కానీ గెలిచే మనస్తత్వం వెలకట్టలేనిది.",
        val_2_title: "నిరంతర కృషి",
        val_2_desc: "మేము అలసిపోయినప్పుడు ఆగము. పని పూర్తయినప్పుడే ఆగుతాము.",
        val_3_title: "స్క్వాడ్ గోల్స్",
        val_3_desc: "మీ చుట్టూ ఉన్న 5 మంది వ్యక్తుల సగటు మీరు. వారిని తెలివిగా ఎంచుకోండి.",
        msn_quote: "విద్య అంటే బకెట్‌ను నింపడం కాదు, నిప్పును రగిలించడం."
    }
};

/* =========================================
   2. CLEAN GRID VIDEO LOADER
   ========================================= */
const playlistID = "__MY_YOUTUBE_PLAYLIST_ID__";
const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistID}`;
const converterUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

const renderVideos = async () => {
    const videosSection = document.getElementById('videos');
    if (!videosSection) return; 

    try {
        const response = await fetch(converterUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            const gridContainer = document.createElement('div');
            gridContainer.className = 'video-grid';
            gridContainer.id = 'video-grid';
            
            const oldContent = document.getElementById('video-grid');
            if(oldContent) oldContent.remove();
            
            gridContainer.innerHTML = data.items.map((item, index) => {
                const videoId = item.guid.split(':')[2];
                const delay = index * 0.1; 
                
                return `
                <div class="video-card" style="transition-delay: ${delay}s">
                    <div class="thumbnail">
                        <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="${item.title}">
                        <div class="play-overlay"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="card-info">
                        <div class="card-tag">NEW DROP</div>
                        <h3>${item.title}</h3>
                        <p>${item.description.substring(0, 80)}...</p>
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="watch-link" data-key="card_watch">Watch Now &rarr;</a>
                    </div>
                </div>
                `;
            }).join('');

            videosSection.appendChild(gridContainer);
            observeCards();

        } else {
            console.error("Failed to fetch playlist");
        }
    } catch (error) {
        console.error("Error connecting to YouTube:", error);
    }
};

const observeCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.video-card').forEach((el) => observer.observe(el));
};

/* =========================================
   3. LANGUAGE & THEME TOGGLES (Fixed)
   ========================================= */
let currentLang = 'en';
const langBtn = document.getElementById('lang-toggle');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Language Toggle (With Null Check)
if (langBtn) {
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'te' : 'en';
        langBtn.innerText = currentLang === 'en' ? 'TE' : 'EN';
        
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[currentLang][key]) {
                el.innerText = translations[currentLang][key];
            }
        });

        // Hero Title Translation (Home)
        const heroTitle = document.getElementById('hero-title');
        // We define the logo HTML here so we can reuse it easily
        const inlineLogo = '<img src="logo.png" class="hero-logo-inline" alt="NaaBadi">';
        
        if(heroTitle) {
            if(currentLang === 'te') {
                // Telugu version with logo included
                heroTitle.innerHTML = `కేవలం చదవద్దు. ${inlineLogo}<br><span class="glitch-text">సాధించు.</span>`;
            } else {
                // English version with logo included
                heroTitle.innerHTML = `DON'T JUST STUDY. ${inlineLogo}<br><span class="glitch-text">DOMINATE.</span>`;
            }
        }
        
        // Mission Title Translation (Mission Page)
        const missionTitle = document.getElementById('mission-title');
        if(missionTitle) {
            if(currentLang === 'te') {
                missionTitle.innerHTML = `మేము విద్యార్థులను నిర్మించము.<br><span class="glitch-text">లెజెండ్స్‌ని నిర్మిస్తాము.</span>`;
            } else {
                missionTitle.innerHTML = `WE DON'T BUILD STUDENTS.<br><span class="glitch-text">WE BUILD LEGENDS.</span>`;
            }
        }
    });
}

// Theme Toggle (With Null Check)
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if(isDark) {
            body.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

/* =========================================
   4. PARTICLE ANIMATION
   ========================================= */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if(this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            const isDark = body.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for(let i=0; i<numberOfParticles; i++){
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<particlesArray.length; i++){
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();
}

/* =========================================
   5. STANDARD ANIMATIONS & INIT
   ========================================= */
const observeHiddenElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    });
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
};

const initTilt = () => {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${y * -0.05}deg) rotateY(${x * 0.05}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
};

const cursor = document.querySelector('.cursor-glow');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Stats Counter
const counters = document.querySelectorAll('.counter');
const speed = 200; 

const runCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20); 
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

/* --- INITIALIZATION --- */
observeHiddenElements();
initTilt();
observeCards(); // Reveal static cards instantly
renderVideos(); // Reveal YouTube videos when loaded

const statsSection = document.querySelector('.stats-container');
if(statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            runCounter();
            statsObserver.disconnect();
        }
    });
    statsObserver.observe(statsSection);
}