/* ========================================
   SECTION ANIMATIONS - INTERACTIVE JAVASCRIPT
   Registration • WhatsApp • Prizes
   ======================================== */

// ========================================
// REGISTRATION SECTION
// ========================================

class RegistrationAnimations {
    constructor() {
        this.qrContainer = document.querySelector('.registration-qr-glow');
        this.countdownDate = new Date('November 23, 2025 23:59:59').getTime();
        this.progressBar = null;

        this.init();
    }

    init() {
        this.create3DTilt();
        this.createFloatingHexagons();
        this.startCountdown();
        this.addButtonRipple();
    }

    // 3D Tilt Effect on QR Container
    create3DTilt() {
        if (!this.qrContainer) return;

        this.qrContainer.addEventListener('mousemove', (e) => {
            const rect = this.qrContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.qrContainer.style.setProperty('--tilt-x', `${rotateY}deg`);
            this.qrContainer.style.setProperty('--tilt-y', `${rotateX}deg`);
            this.qrContainer.classList.add('tilt-active');
        });

        this.qrContainer.addEventListener('mouseleave', () => {
            this.qrContainer.style.setProperty('--tilt-x', '0deg');
            this.qrContainer.style.setProperty('--tilt-y', '0deg');
            setTimeout(() => {
                this.qrContainer.classList.remove('tilt-active');
            }, 300);
        });
    }

    // Create Floating Hexagons
    createFloatingHexagons() {
        const section = document.querySelector('.registration');
        if (!section) return;

        const container = document.createElement('div');
        container.className = 'registration-particles';

        for (let i = 0; i < 8; i++) {
            const hexagon = document.createElement('div');
            hexagon.className = 'floating-hexagon';
            hexagon.style.top = `${Math.random() * 100}%`;
            hexagon.style.animationDelay = `${Math.random() * 5}s`;
            hexagon.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(hexagon);
        }

        section.insertBefore(container, section.firstChild);
    }

    // Countdown Timer with Flip Animation
    startCountdown() {
        const registration = document.querySelector('.registration-info');
        if (!registration) return;

        // Create countdown container
        const countdownHTML = `
            <div class="countdown-container">
                <h4>Registration Closes In</h4>
                <div class="countdown-timer">
                    <div class="countdown-item">
                        <div class="countdown-value" id="days">00</div>
                        <div class="countdown-label">Days</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value" id="hours">00</div>
                        <div class="countdown-label">Hours</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value" id="minutes">00</div>
                        <div class="countdown-label">Minutes</div>
                    </div>
                    <div class="countdown-item">
                        <div class="countdown-value" id="seconds">00</div>
                        <div class="countdown-label">Seconds</div>
                    </div>
                </div>
            </div>
        `;

        registration.insertAdjacentHTML('beforeend', countdownHTML);

        // Update countdown every second
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.updateCountdownValue('days', days);
            this.updateCountdownValue('hours', hours);
            this.updateCountdownValue('minutes', minutes);
            this.updateCountdownValue('seconds', seconds);

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.querySelector('.countdown-container').innerHTML = '<h4 style="color: #ef4444;">Registration Closed</h4>';
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    updateCountdownValue(id, value) {
        const element = document.getElementById(id);
        if (!element) return;

        const newValue = value.toString().padStart(2, '0');
        if (element.textContent !== newValue) {
            element.classList.add('flip');
            setTimeout(() => {
                element.textContent = newValue;
                element.classList.remove('flip');
            }, 300);
        }
    }

    // Button Ripple Effect
    addButtonRipple() {
        const button = document.getElementById('registerBtn');
        if (!button) return;

        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'button-ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// ========================================
// WHATSAPP SECTION
// ========================================

class WhatsAppAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createTypewriterEffect();
        this.createMessageBubbles();
        this.createNetworkLines();
        this.createSparkles();
        this.addButtonRipple();
        this.addScannerEffect();
    }

    // Typewriter Effect for Title
    createTypewriterEffect() {
        const title = document.querySelector('.whatsapp .section-title');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';

        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        title.appendChild(cursor);

        const typeInterval = setInterval(() => {
            if (i < text.length) {
                title.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }

    // Create Floating Message Bubbles
    createMessageBubbles() {
        const section = document.querySelector('.whatsapp');
        if (!section) return;

        const container = document.createElement('div');
        container.className = 'whatsapp-particles';

        for (let i = 0; i < 5; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            container.appendChild(bubble);
        }

        section.insertBefore(container, section.firstChild);
    }

    // Create Network Connection Lines
    createNetworkLines() {
        const section = document.querySelector('.whatsapp');
        if (!section) return;

        const container = document.createElement('div');
        container.className = 'network-lines';

        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'connection-line';
            container.appendChild(line);
        }

        section.insertBefore(container, section.firstChild);
    }

    // Create Sparkle Effects
    createSparkles() {
        const section = document.querySelector('.whatsapp');
        if (!section) return;

        const container = document.createElement('div');
        container.className = 'sparkle-container';

        setInterval(() => {
            if (container.children.length > 20) return;

            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 3000);
        }, 500);

        section.appendChild(container);
    }

    // Scanner Effect
    addScannerEffect() {
        const qrContainer = document.querySelector('.whatsapp-qr-animated');
        if (!qrContainer) return;

        // Add corner brackets dynamically
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(corner => {
            const bracket = document.createElement('div');
            bracket.className = `qr-corner ${corner}`;
            bracket.style.position = 'absolute';
            bracket.style.width = '30px';
            bracket.style.height = '30px';

            const [vertical, horizontal] = corner.split('-');
            bracket.style[vertical] = '15px';
            bracket.style[horizontal] = '15px';
            bracket.style[`border-${vertical}`] = '3px solid #25D366';
            bracket.style[`border-${horizontal}`] = '3px solid #25D366';
            bracket.style.opacity = '0.7';

            qrContainer.appendChild(bracket);
        });
    }

    // Button Ripple Effect
    addButtonRipple() {
        const button = document.querySelector('.btn-whatsapp');
        if (!button) return;

        button.addEventListener('click', function (e) {
            this.classList.add('ripple');
            setTimeout(() => this.classList.remove('ripple'), 600);
        });
    }
}

// ========================================
// PRIZES SECTION
// ========================================

class PrizesAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createConfetti();
        this.createStarTrails();
        this.addCardParallax();
        this.addCardModals();
        this.animateNumbers();
    }

    // Create Confetti Particles
    createConfetti() {
        const section = document.querySelector('.prizes');
        if (!section) return;

        const container = document.createElement('div');
        container.className = 'confetti-container';

        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            container.appendChild(confetti);
        }

        section.insertBefore(container, section.firstChild);
    }

    // Create Star Trails
    createStarTrails() {
        const section = document.querySelector('.prizes');
        if (!section) return;

        for (let i = 0; i < 3; i++) {
            const star = document.createElement('div');
            star.className = 'star-trail';
            section.appendChild(star);
        }
    }

    // Card Parallax Effect on Scroll
    addCardParallax() {
        const cards = document.querySelectorAll('.prize-card');

        window.addEventListener('scroll', () => {
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;

                if (scrollPercent > 0 && scrollPercent < 1) {
                    const translateY = (scrollPercent - 0.5) * -50;
                    const rotateY = (scrollPercent - 0.5) * 10;

                    card.style.setProperty('--parallax-y', `${translateY}px`);
                    card.style.setProperty('--parallax-rx', `${rotateY}deg`);
                    card.classList.add('parallax-active');
                }
            });
        });
    }

    // Card Modal Expansion
    addCardModals() {
        const cards = document.querySelectorAll('.prize-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const modal = this.createModal(card);
                document.body.appendChild(modal);

                setTimeout(() => modal.classList.add('active'), 10);
            });
        });
    }

    createModal(card) {
        const modal = document.createElement('div');
        modal.className = 'prize-modal';

        const icon = card.querySelector('.prize-icon').textContent;
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;

        modal.innerHTML = `
            <div class="prize-modal-content">
                <button class="prize-modal-close">&times;</button>
                <div class="prize-icon" style="font-size: 5rem; margin-bottom: 30px;">${icon}</div>
                <h2 style="color: #fff; margin-bottom: 20px; font-size: 2rem;">${title}</h2>
                <p style="color: #cbd5e1; font-size: 1.1rem; line-height: 1.8;">${description}</p>
                <p style="color: #94a3b8; margin-top: 30px; font-size: 0.95rem;">
                    All winners will be announced at the closing ceremony on November 27, 2025.
                </p>
            </div>
        `;

        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('prize-modal-close')) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 400);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 400);
                document.removeEventListener('keydown', escapeHandler);
            }
        });

        return modal;
    }

    // Animate Numbers (if prize amounts exist)
    animateNumbers() {
        const amounts = document.querySelectorAll('.prize-amount');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.countUpNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        amounts.forEach(amount => observer.observe(amount));
    }

    countUpNumber(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }
            element.textContent = Math.round(current).toLocaleString('en-IN');
            element.classList.add('counting');
            setTimeout(() => element.classList.remove('counting'), 300);
        }, 16);
    }
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing section animations...');

    try {
        new RegistrationAnimations();
        console.log('✅ Registration animations loaded');
    } catch (e) {
        console.error('❌ Registration animations error:', e);
    }

    try {
        new WhatsAppAnimations();
        console.log('✅ WhatsApp animations loaded');
    } catch (e) {
        console.error('❌ WhatsApp animations error:', e);
    }

    try {
        new PrizesAnimations();
        console.log('✅ Prizes animations loaded');
    } catch (e) {
        console.error('❌ Prizes animations error:', e);
    }
});

// Export for debugging
window.sectionAnimations = {
    RegistrationAnimations,
    WhatsAppAnimations,
    PrizesAnimations
};

console.log('💡 Section animations available: window.sectionAnimations');
