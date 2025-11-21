// ========================================
// INTERACTIVE ABOUT SECTION - JAVASCRIPT
// ========================================

(function () {
    'use strict';

    // Split text into letters
    function splitText() {
        const title = document.querySelector('[data-split]');
        if (!title) return;

        const text = title.textContent;
        title.innerHTML = '';

        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.05}s`;
            title.appendChild(span);
        });
    }

    // Parallax effect
    function initParallax() {
        const section = document.querySelector('[data-parallax]');
        const bg = document.querySelector('.about-parallax-bg');

        if (!section || !bg) return;

        window.addEventListener('scroll', () => {
            const rect = section.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const offset = (scrolled - sectionTop) * 0.3;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bg.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    // Scroll animation observer
    function initScrollAnimations() {
        const cards = document.querySelectorAll('.interactive-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // 3D tilt effect
    function init3DTilt() {
        const cards = document.querySelectorAll('.interactive-card');

        cards.forEach(card => {
            const cardFront = card.querySelector('.card-front');

            card.addEventListener('mousemove', (e) => {
                if (card.classList.contains('flipped')) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;

                cardFront.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

                // Update glow position
                const glowEffect = card.querySelector('.glow-effect');
                if (glowEffect) {
                    const xPercent = (x / rect.width) * 100;
                    const yPercent = (y / rect.height) * 100;
                    glowEffect.style.setProperty('--mouse-x', `${xPercent}%`);
                    glowEffect.style.setProperty('--mouse-y', `${yPercent}%`);
                }
            });

            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('flipped')) return;
                cardFront.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // Magnetic cursor effect
    function initMagneticEffect() {
        const cards = document.querySelectorAll('.interactive-card');
        const magneticRadius = 200;

        document.addEventListener('mousemove', (e) => {
            cards.forEach(card => {
                if (card.classList.contains('flipped')) return;

                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const distanceX = e.clientX - cardCenterX;
                const distanceY = e.clientY - cardCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distance < magneticRadius) {
                    const strength = (magneticRadius - distance) / magneticRadius;
                    const moveX = (distanceX / distance) * strength * 15;
                    const moveY = (distanceY / distance) * strength * 15;

                    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    card.classList.add('magnetic');
                } else {
                    card.style.transform = 'translate(0, 0)';
                }
            });
        });
    }

    // Ripple effect
    function createRipple(card, e) {
        const rippleContainer = card.querySelector('.ripple-container');
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        rippleContainer.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Confetti burst
    function createConfetti(card) {
        const rect = card.getBoundingClientRect();
        const colors = ['#00d4ff', '#8b5cf6', '#10b981', '#f59e0b'];

        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${rect.left + rect.width / 2}px`;
            confetti.style.top = `${rect.top + rect.height / 2}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.random() * 360) * (Math.PI / 180);
            const velocity = Math.random() * 200 + 100;
            const xVel = Math.cos(angle) * velocity;
            const yVel = Math.sin(angle) * velocity;

            confetti.style.setProperty('--x', `${xVel}px`);
            confetti.style.setProperty('--y', `${yVel}px`);

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    }

    // Card flip interaction
    function initCardFlip() {
        const cards = document.querySelectorAll('.interactive-card');
        const overlay = document.getElementById('modalOverlay');

        cards.forEach(card => {
            const cardFront = card.querySelector('.card-front');
            const backBtn = card.querySelector('.back-btn');

            // Click on front to flip
            cardFront.addEventListener('click', (e) => {
                e.stopPropagation();

                // Create ripple
                createRipple(card, e);

                // Flip card
                setTimeout(() => {
                    card.classList.add('flipped');
                    overlay.classList.add('active');

                    // Confetti burst
                    createConfetti(card);
                }, 100);
            });

            // Click back button to flip back
            backBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('flipped');
                overlay.classList.remove('active');
            });
        });

        // Click overlay to close all
        overlay.addEventListener('click', () => {
            cards.forEach(card => card.classList.remove('flipped'));
            overlay.classList.remove('active');
        });
    }

    // Initialize all effects
    function init() {
        splitText();
        initParallax();
        initScrollAnimations();
        init3DTilt();
        initMagneticEffect();
        initCardFlip();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
