/* ========================================
   SOUTH INDIAN ENGAGEMENT - MAIN SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initPreloader();
    initCustomCursor();
    initNavigation();
    initCountdown();
    initFloatingElements();
    initScrollAnimations();
    initLightbox();
    initRSVPForm();
    initMusicPlayer();
    initParallax();
});

/* ========================================
   ENVELOPE OPENING ANIMATION
   ======================================== */
function initEnvelope() {
    const intro = document.getElementById('envelope-intro');
    const envelope = intro.querySelector('.envelope');

    intro.addEventListener('click', () => {
        if (envelope.classList.contains('opened')) return;

        // Step 1: Open the flap
        envelope.classList.add('opened');

        // Step 2: Letter expands after rising
        setTimeout(() => {
            envelope.classList.add('expanding');
        }, 2200);

        // Step 3: Hide envelope intro, reveal site
        setTimeout(() => {
            intro.classList.add('hidden');
            setTimeout(() => intro.remove(), 1000);
        }, 3000);
    });
}

/* ========================================
   PRELOADER
   ======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    // Wait for envelope to finish before starting preloader countdown
    const checkEnvelope = setInterval(() => {
        const envelope = document.getElementById('envelope-intro');
        if (!envelope || envelope.classList.contains('hidden')) {
            clearInterval(checkEnvelope);
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.style.display = 'none', 800);
            }, 1500);
        }
    }, 200);

    // Fallback: force hide after 10s
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 800);
        }
    }, 10000);
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 5 + 'px';
        cursor.style.top = mouseY - 5 + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX - 17.5 + 'px';
        follower.style.top = followerY - 17.5 + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .gallery-item, .flip-card-3d').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.width = '50px';
            follower.style.height = '50px';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.width = '35px';
            follower.style.height = '35px';
        });
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ========================================
   COUNTDOWN TIMER
   ======================================== */
function initCountdown() {
    // CHANGE THIS DATE to your engagement date
    const engagementDate = new Date('December 14, 2026 06:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = engagementDate - now;

        if (distance < 0) {
            document.querySelector('.countdown-timer').innerHTML =
                '<h2 style="font-family: var(--font-script); color: var(--temple-gold); font-size: 2.5rem;">🪔 Shubham! We are Engaged! 💍</h2>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        animateNumber(document.getElementById('days'), days);
        animateNumber(document.getElementById('hours'), hours);
        animateNumber(document.getElementById('minutes'), minutes);
        animateNumber(document.getElementById('seconds'), seconds);
    }

    function animateNumber(el, value) {
        if (!el) return;
        const formatted = String(value).padStart(2, '0');
        if (el.textContent !== formatted) {
            el.style.transform = 'rotateX(90deg)';
            el.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                el.textContent = formatted;
                el.style.transform = 'rotateX(0)';
            }, 150);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ========================================
   FLOATING ELEMENTS - South Indian themed
   ======================================== */
function initFloatingElements() {
    const container = document.getElementById('floating-elements');
    const emojis = ['🪔', '🌺', '🥥', '🍌', '🪷', '✨', '🌿', '💛', '🌸', '⭐', '🙏', '💍'];
    const count = window.innerWidth <= 768 ? 8 : 20;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--duration', (10 + Math.random() * 15) + 's');
        particle.style.setProperty('--delay', (Math.random() * 12) + 's');
        particle.style.fontSize = (0.8 + Math.random() * (window.innerWidth <= 768 ? 0.5 : 1)) + 'rem';
        container.appendChild(particle);
    }
}

/* ========================================
   SCROLL-TRIGGERED ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.gallery-item, .person-card, .family-card, .event-card, .schedule-item').forEach(item => {
        observer.observe(item);
    });

    // Section titles fade in
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease';
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        sectionObserver.observe(el);
    });

    // Flip cards - tap/click support for mobile (hover doesn't work on touch)
    document.querySelectorAll('.flip-card-3d').forEach(card => {
        card.addEventListener('click', () => {
            // Toggle flipped state
            const inner = card.querySelector('.flip-card-inner');
            card.classList.toggle('flipped');
            if (card.classList.contains('flipped')) {
                inner.style.transform = 'rotateY(180deg)';
            } else {
                inner.style.transform = '';
            }
        });
    });
}

/* ========================================
   LIGHTBOX
   ======================================== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
        if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left - next
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                // Swipe right - prev
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            lightboxImg.src = images[currentIndex];
        }
    }, { passive: true });
}

/* ========================================
   RSVP FORM + CONFETTI
   ======================================== */
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Save to localStorage
        const rsvps = JSON.parse(localStorage.getItem('engagement_rsvps') || '[]');
        rsvps.push({ ...data, timestamp: new Date().toISOString() });
        localStorage.setItem('engagement_rsvps', JSON.stringify(rsvps));

        showSuccessModal(data.name);
        launchConfetti();
        form.reset();
    });
}

function showSuccessModal(name) {
    let modal = document.querySelector('.success-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-content">
                <div class="success-emoji">🪔💍🙏</div>
                <h3>Thank You!</h3>
                <p>Dear <strong>${name}</strong>, your blessings have been received! We look forward to your gracious presence at the ceremony.</p>
                <button class="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    } else {
        modal.querySelector('p').innerHTML = `Dear <strong>${name}</strong>, your blessings have been received! We look forward to your gracious presence at the ceremony.`;
    }
    setTimeout(() => modal.classList.add('active'), 100);
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#d4af37', '#c41e3a', '#f9a825', '#2e7d32', '#f0d68a', '#cd7f32', '#ff6f00', '#ffd700'];

    for (let i = 0; i < 200; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20 - 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            gravity: 0.15 + Math.random() * 0.1,
            opacity: 1,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            p.vy += p.gravity; p.rotation += p.rotationSpeed;
            p.opacity -= 0.005; p.vx *= 0.99;
            if (p.opacity > 0) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
                ctx.restore();
            }
        });
        if (alive) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

/* ========================================
   MUSIC PLAYER
   ======================================== */
function initMusicPlayer() {
    const audio = document.getElementById('background-music');
    const btn = document.getElementById('music-toggle');
    let isPlaying = false;
    audio.volume = 0.3;

    btn.addEventListener('click', () => {
        if (isPlaying) { audio.pause(); btn.classList.remove('playing'); }
        else { audio.play().catch(() => {}); btn.classList.add('playing'); }
        isPlaying = !isPlaying;
    });

    // Auto-play on first interaction
    document.addEventListener('click', () => {
        audio.play().then(() => { isPlaying = true; btn.classList.add('playing'); }).catch(() => {});
    }, { once: true });
}

/* ========================================
   PARALLAX
   ======================================== */
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-text');
        if (hero) {
            const heroSection = document.querySelector('.hero');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (scrolled < heroBottom) {
                hero.style.opacity = 1 - (scrolled / heroBottom) * 1.5;
                hero.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        }
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
