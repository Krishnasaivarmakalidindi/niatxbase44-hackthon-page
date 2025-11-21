/* ========================================
   ADVANCED THEMES SECTION - JAVASCRIPT
   Production-Ready with Error Handling & Performance Optimization
   ======================================== */

// Theme Data Structure
const themes = [
    {
        id: 1,
        icon: "🏫",
        title: "Smart Campus",
        description: "Innovative solutions to improve campus life and infrastructure",
        color: "#3b82f6",
        difficulty: "Medium",
        popularity: 85,
        tags: ["IoT", "Infrastructure", "Campus Life"]
    },
    {
        id: 2,
        icon: "📚",
        title: "Student Productivity",
        description: "Tools and systems to enhance learning and time management",
        color: "#8b5cf6",
        difficulty: "Easy",
        popularity: 92,
        tags: ["Productivity", "Learning", "Tools"]
    },
    {
        id: 3,
        icon: "💚",
        title: "Health & Wellness",
        description: "Promoting physical and mental well-being for students",
        color: "#10b981",
        difficulty: "Medium",
        popularity: 78,
        tags: ["Health", "Mental Health", "Fitness"]
    },
    {
        id: 4,
        icon: "🌍",
        title: "Community Impact",
        description: "Solutions addressing social and environmental challenges",
        color: "#06b6d4",
        difficulty: "Hard",
        popularity: 65,
        tags: ["Social Impact", "Environment", "Community"]
    },
    {
        id: 5,
        icon: "📱",
        title: "No-Code Apps",
        description: "Build powerful applications without traditional coding",
        color: "#f59e0b",
        difficulty: "Easy",
        popularity: 88,
        tags: ["No-Code", "Apps", "Beginner-Friendly"]
    },
    {
        id: 6,
        icon: "⚙️",
        title: "Workflow/Automation",
        description: "Streamline processes and boost efficiency",
        color: "#6366f1",
        difficulty: "Medium",
        popularity: 73,
        tags: ["Automation", "Efficiency", "Workflow"]
    }
];

// Global State Management
let selectedThemes = new Set();
let isLibrariesLoaded = false;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Initializing Advanced Themes Section...');

    try {
        // Check if required libraries are loaded
        checkLibraries();

        // Initialize particles background
        initializeParticles();

        // Render theme cards
        renderThemeCards();

        // Initialize GSAP animations
        initializeGSAPAnimations();

        // Setup intersection observer for scroll animations
        setupScrollAnimations();

        // Initialize keyboard navigation
        setupKeyboardNavigation();

        console.log('✅ Themes section initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing themes section:', error);
        showFallbackContent();
    }
});

// ========================================
// LIBRARY LOADING CHECK
// ========================================

function checkLibraries() {
    const libraries = {
        'tsParticles': typeof tsParticles !== 'undefined',
        'GSAP': typeof gsap !== 'undefined',
        'VanillaTilt': typeof VanillaTilt !== 'undefined'
    };

    Object.entries(libraries).forEach(([name, loaded]) => {
        if (loaded) {
            console.log(`✓ ${name} loaded successfully`);
        } else {
            console.warn(`⚠ ${name} not loaded - some features may be limited`);
        }
    });

    isLibrariesLoaded = libraries.tsParticles && libraries.GSAP && libraries.VanillaTilt;
}

// ========================================
// TSPARTICLES INITIALIZATION
// ========================================

function initializeParticles() {
    if (typeof tsParticles === 'undefined') {
        console.warn('tsParticles not available, skipping particle background');
        return;
    }

    try {
        tsParticles.load("themesParticles", {
            background: {
                color: {
                    value: "transparent"
                }
            },
            fpsLimit: 60,
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: {
                    value: ["#00d4ff", "#8b5cf6", "#ec4899"]
                },
                shape: {
                    type: ["circle", "triangle", "square"]
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: { min: 2, max: 6 },
                    random: true
                },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "bounce"
                    }
                }
            },
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            detectRetina: true
        });

        console.log('✓ Particles initialized');
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

// ========================================
// RENDER THEME CARDS
// ========================================

function renderThemeCards() {
    const themesGrid = document.getElementById('themesGrid');

    if (!themesGrid) {
        console.error('Themes grid container not found');
        return;
    }

    // Clear existing content
    themesGrid.innerHTML = '';

    // Render each theme card
    themes.forEach((theme, index) => {
        const card = createThemeCard(theme, index);
        themesGrid.appendChild(card);
    });

    // Initialize 3D tilt effect
    initializeTiltEffect();

    console.log(`✓ Rendered ${themes.length} theme cards`);
}

// ========================================
// CREATE THEME CARD ELEMENT
// ========================================

function createThemeCard(theme, index) {
    const card = document.createElement('div');
    card.className = 'theme-card';
    card.setAttribute('data-theme-id', theme.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Select ${theme.title} theme - ${theme.difficulty} difficulty, ${theme.popularity}% popularity`);

    card.innerHTML = `
        <div class="theme-icon">${theme.icon}</div>
        <div class="popularity-badge">
            <span class="popularity-icon">🔥</span>
            <span>${theme.popularity}%</span>
        </div>
        <div class="difficulty-indicator ${theme.difficulty.toLowerCase()}">
            ${theme.difficulty}
        </div>
        <h3>${theme.title}</h3>
        <p>${theme.description}</p>
        <div class="theme-tags">
            ${theme.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
        </div>
    `;

    // Add click event listener
    card.addEventListener('click', function (e) {
        handleCardClick(theme.id, card, e);
    });

    // Add keyboard event listener
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(theme.id, card, e);
        }
    });

    return card;
}

// ========================================
// HANDLE CARD SELECTION
// ========================================

function handleCardClick(themeId, cardElement, event) {
    // Create ripple effect
    createRippleEffect(cardElement, event);

    // Toggle selection
    if (selectedThemes.has(themeId)) {
        selectedThemes.delete(themeId);
        cardElement.classList.remove('selected');
        showToast(`Deselected ${getThemeById(themeId).title}`, 'info');
    } else {
        selectedThemes.add(themeId);
        cardElement.classList.add('selected');
        createParticleBurst(cardElement);
        showToast(`Selected ${getThemeById(themeId).title}!`, 'success');
    }

    // Update counter
    updateSelectedCounter();

    // Scroll to card
    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    console.log('Selected themes:', Array.from(selectedThemes));
}

// ========================================
// RIPPLE EFFECT
// ========================================

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ========================================
// PARTICLE BURST EFFECT (GSAP)
// ========================================

function createParticleBurst(element) {
    if (typeof gsap === 'undefined') return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = '#00d4ff';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 100 + Math.random() * 50;

        gsap.to(particle, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

// ========================================
// UPDATE SELECTED COUNTER
// ========================================

function updateSelectedCounter() {
    const counter = document.getElementById('selectedCounter');
    const counterText = counter.querySelector('.counter-text');

    const count = selectedThemes.size;
    counterText.textContent = `${count} theme${count !== 1 ? 's' : ''} selected`;

    if (count > 0) {
        counter.classList.add('visible');
    } else {
        counter.classList.remove('visible');
    }
}

// ========================================
// TOAST NOTIFICATION
// ========================================

let toastTimeout;

function showToast(message, type = 'success') {
    const toast = document.getElementById('themeToast');
    const toastMessage = toast.querySelector('.toast-message');

    toastMessage.textContent = message;

    // Clear existing timeout
    clearTimeout(toastTimeout);

    // Show toast
    toast.classList.add('show');

    // Hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ========================================
// GSAP ANIMATIONS
// ========================================

function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not available, using CSS animations only');
        return;
    }

    // Animate section title
    gsap.from('.themes .section-title', {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.themes',
            start: 'top 80%'
        }
    });

    // Animate subtitle
    gsap.from('.themes .section-subtitle', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.themes',
            start: 'top 80%'
        }
    });

    console.log('✓ GSAP animations initialized');
}

// ========================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ========================================

function setupScrollAnimations() {
    const cards = document.querySelectorAll('.theme-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));

    console.log('✓ Scroll animations initialized');
}

// ========================================
// 3D TILT EFFECT
// ========================================

function initializeTiltEffect() {
    if (typeof VanillaTilt === 'undefined') {
        console.warn('VanillaTilt not available, skipping 3D tilt effect');
        return;
    }

    try {
        VanillaTilt.init(document.querySelectorAll('.theme-card'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            scale: 1.02
        });

        console.log('✓ 3D tilt effect initialized');
    } catch (error) {
        console.error('Error initializing tilt effect:', error);
    }
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const cards = Array.from(document.querySelectorAll('.theme-card'));
        const activeElement = document.activeElement;
        const currentIndex = cards.indexOf(activeElement);

        if (currentIndex === -1) return;

        let nextIndex = currentIndex;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % cards.length;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + cards.length) % cards.length;
                break;
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = Math.min(currentIndex + 3, cards.length - 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                nextIndex = Math.max(currentIndex - 3, 0);
                break;
        }

        if (nextIndex !== currentIndex) {
            cards[nextIndex].focus();
        }
    });

    console.log('✓ Keyboard navigation initialized');
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function getThemeById(id) {
    return themes.find(theme => theme.id === id);
}

function showFallbackContent() {
    const themesGrid = document.getElementById('themesGrid');
    if (themesGrid) {
        themesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #fff;">
                <p style="font-size: 1.2rem; margin-bottom: 20px;">⚠️ Unable to load interactive features</p>
                <p style="color: #94a3b8;">Please refresh the page or check your internet connection.</p>
            </div>
        `;
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

if (window.PerformanceObserver) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`⏱️ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
            }
        });

        perfObserver.observe({ entryTypes: ['measure'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// ========================================
// EXPORT FOR DEBUGGING
// ========================================

window.themesDebug = {
    themes,
    selectedThemes,
    getThemeById,
    resetSelection: () => {
        selectedThemes.clear();
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('selected');
        });
        updateSelectedCounter();
    }
};

console.log('💡 Debug tools available: window.themesDebug');
