/* =========================================
   1. TRANSLATION DATA (NGO Context)
   ========================================= */
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About Us",
        nav_work: "Our Work",
        nav_resources: "Resources",
        nav_contact: "Contact",
        nav_donate: "Donate Now ❤",
        hero_badge: "NON-PROFIT ORGANIZATION",
        hero_desc: "Bridging the gap between potential and opportunity. We provide infrastructure, digital education, and teacher training to transform government schools.",
        btn_volunteer: "Become a Volunteer",
        btn_explore: "Explore Our Work →",
        stat_schools: "Schools Adopted",
        stat_students: "Students Impacted",
        stat_teachers: "Teachers Trained",
        prog_title_1: "OUR",
        prog_title_2: "INITIATIVES",
        prog_1_title: "School Adoption",
        prog_1_desc: "Complete transformation of adopted schools including painting, repairs, and sanitation.",
        prog_2_title: "Digital Classrooms",
        prog_2_desc: "Setting up computer labs and smart classes to bridge the digital divide.",
        prog_3_title: "Teacher Training",
        prog_3_desc: "Upskilling teachers with modern pedagogical methods and resources.",
        prog_4_title: "Student Welfare",
        prog_4_desc: "Providing uniforms, books, scholarships, and nutritional support.",
        stories_title_1: "IMPACT",
        stories_title_2: "STORIES",
        join_title: "Join the Movement",
        join_desc: "Whether you are a donor, volunteer, or partner organization, your contribution shapes the future of India.",
        btn_donate_large: "Donate Now",
        btn_contact: "Partner With Us",
        partner_text: "TRUSTED BY",
        footer_desc: "Transforming lives through education.",
        footer_contact: "Contact Us"
    },
    te: {
        nav_home: "హోమ్",
        nav_about: "మా గురించి",
        nav_work: "మా పనులు",
        nav_resources: "వనరులు",
        nav_contact: "సంప్రదించండి",
        nav_donate: "విరాళం ఇవ్వండి ❤",
        hero_badge: "లాభాపేక్ష లేని సంస్థ",
        hero_desc: "ప్రభుత్వ పాఠశాలలను మార్చడానికి మేము మౌలిక సదుపాయాలు, డిజిటల్ విద్య మరియు ఉపాధ్యాయ శిక్షణను అందిస్తాము.",
        btn_volunteer: "వాలంటీర్ అవ్వండి",
        btn_explore: "మా పనులను చూడండి →",
        stat_schools: "దత్తత తీసుకున్న పాఠశాలలు",
        stat_students: "ప్రభావిత విద్యార్థులు",
        stat_teachers: "శిక్షణ పొందిన ఉపాధ్యాయులు",
        prog_title_1: "మా",
        prog_title_2: "కార్యక్రమాలు",
        prog_1_title: "పాఠశాల దత్తత",
        prog_1_desc: "దత్తత తీసుకున్న పాఠశాలల పూర్తి మార్పు - పెయింటింగ్, మరమ్మతులు మరియు పారిశుధ్యం.",
        prog_2_title: "డిజిటల్ తరగతులు",
        prog_2_desc: "కంప్యూటర్ ల్యాబ్‌లు మరియు స్మార్ట్ క్లాసుల ఏర్పాటు.",
        prog_3_title: "ఉపాధ్యాయ శిక్షణ",
        prog_3_desc: "ఆధునిక బోధనా పద్ధతులతో ఉపాధ్యాయుల నైపుణ్యాలను పెంచడం.",
        prog_4_title: "విద్యార్థి సంక్షేమం",
        prog_4_desc: "యూనిఫారాలు, పుస్తకాలు, స్కాలర్‌షిప్‌లు మరియు పోషకాహారం అందించడం.",
        stories_title_1: "విజయ",
        stories_title_2: "గాథలు",
        join_title: "ఉద్యమంలో చేరండి",
        join_desc: "మీరు దాత అయినా, వాలంటీర్ అయినా, మీ సహకారం భారతదేశ భవిష్యత్తును తీర్చిదిద్దుతుంది.",
        btn_donate_large: "ఇప్పుడే విరాళం ఇవ్వండి",
        btn_contact: "మాతో చేరండి",
        partner_text: "భాగస్వాములు",
        footer_desc: "విద్య ద్వారా జీవితాలను మార్చడం.",
        footer_contact: "చిరునామా"
    }
};

/* =========================================
   2. VIDEO LOADER (Resources/Success Stories)
   ========================================= */
const playlistID = "PLjhbIx8ceybW4uFMBc9ikx4fgO9-vrudp"; // Your Playlist ID
const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistID}`;
const converterUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

const renderVideos = async () => {
    const videosSection = document.getElementById('video-grid');
    if (!videosSection) return; 

    try {
        const response = await fetch(converterUrl);
        const data = await response.json();

        if (data.status === 'ok') {
            videosSection.innerHTML = data.items.map((item, index) => {
                const videoId = item.guid.split(':')[2];
                const delay = index * 0.1; 
                return `
                <div class="video-card" style="transition-delay: ${delay}s">
                    <div class="thumbnail">
                        <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="${item.title}">
                        <div class="play-overlay"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="card-info">
                        <div class="card-tag">SUCCESS STORY</div>
                        <h3>${item.title}</h3>
                        <p>${item.description.substring(0, 80)}...</p>
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="watch-link">Watch Story &rarr;</a>
                    </div>
                </div>
                `;
            }).join('');
            
            observeCards();
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
   3. LANGUAGE & THEME
   ========================================= */
let currentLang = 'en';
const langBtn = document.getElementById('lang-toggle');
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

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

        // HTML Content Updates with Hardcoded Static Path for Logo
        const heroTitle = document.getElementById('hero-title');
        // NOTE: We use the hardcoded static path here because JS runs in browser
        const inlineLogo = '<img src="/static/website/logo.png" class="hero-logo-inline" alt="NaaBadi">';
        
        if(heroTitle) {
            if(currentLang === 'te') {
                heroTitle.innerHTML = `ప్రభుత్వ పాఠశాలలకు ${inlineLogo}<br><span class="glitch-text">సాధికారత.</span>`;
            } else {
                heroTitle.innerHTML = `EMPOWERING ${inlineLogo}<br><span class="glitch-text">GOVT SCHOOLS.</span>`;
            }
        }
    });
}

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
   4. INIT & ANIMATIONS
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

// Initialize
observeHiddenElements();
initTilt();
renderVideos();

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

// Canvas Particles
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if(this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if(this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            const isDark = body.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
        }
    }
    const initParticles = () => {
        particlesArray = [];
        for(let i=0; i<50; i++) particlesArray.push(new Particle());
    }
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0; i<particlesArray.length; i++) {
            particlesArray[i].update(); particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles(); animateParticles();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });
}