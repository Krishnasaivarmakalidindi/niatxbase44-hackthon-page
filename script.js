// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scrolling down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scrolling up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .highlight-card, .theme-card, .prize-card, .rule-card').forEach(el => {
    observer.observe(el);
});

// Registration button click handler
const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const registrationURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdRKYE8JmLRfm6UmIOAmdcFSmBziQ8_japtvRzBUa0ttFbRyg/viewform';
        window.open(registrationURL, '_blank');
    });
}

// WhatsApp button click handler
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace this URL with your actual WhatsApp group invite link
        const whatsappURL = 'https://chat.whatsapp.com/your-group-invite-link';
        window.open(whatsappURL, '_blank');
    });
}

// Countdown timer (optional feature)
function updateCountdown() {
    const eventDate = new Date('November 27, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    const countdownEl = document.getElementById('countdown-timer');
    if (!countdownEl) return;
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownEl.innerHTML = `
            <span class="countdown-days" aria-label="Days">${days}d</span>
            <span class="countdown-hours" aria-label="Hours">${hours}h</span>
            <span class="countdown-minutes" aria-label="Minutes">${minutes}m</span>
            <span class="countdown-seconds" aria-label="Seconds">${seconds}s</span>
            <span class="countdown-label">until hackathon starts!</span>
        `;
    } else {
        countdownEl.innerHTML = "<span class='countdown-label'>Hackathon is live!</span>";
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();
// Animated particle network background for hero
function particleNetwork() {
    const canvas = document.getElementById('particle-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = document.querySelector('.hero').offsetHeight;
    canvas.width = w;
    canvas.height = h;
    let particles = [];
    let num = Math.floor(w / 40);
    for (let i = 0; i < num; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2
        });
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < num; i++) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.globalAlpha = 0.7;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
        for (let i = 0; i < num; i++) {
            for (let j = i + 1; j < num; j++) {
                let p1 = particles[i];
                let p2 = particles[j];
                let dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = '#8b5cf6';
                    ctx.globalAlpha = 0.25;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', () => {
        w = window.innerWidth;
        h = document.querySelector('.hero').offsetHeight;
        canvas.width = w;
        canvas.height = h;
    });
}
window.addEventListener('DOMContentLoaded', particleNetwork);

// Handle image loading errors
// QR pulse effect
document.querySelectorAll('.qr-pulse').forEach(qr => {
    qr.classList.add('pulse-anim');
});

// Theme card expand/collapse
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', function () {
        this.classList.toggle('expanded');
    });
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.classList.toggle('expanded');
        }
    });
});
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        // Fallback for missing images
        if (this.alt.includes('Logo')) {
            this.style.display = 'none';
        } else if (this.alt.includes('QR')) {
            this.parentElement.innerHTML = '<div style="padding: 40px; text-align: center; color: #666;">QR Code will be added here</div>';
        }
    });
});

// Active navigation highlight
// Current time indicator for schedule
function updateCurrentTimeIndicator() {
    const indicator = document.getElementById('currentTimeIndicator');
    if (!indicator) return;
    const now = new Date();
    const times = [
        { start: '09:00', end: '09:30' },
        { start: '09:30', end: '10:00' },
        { start: '10:00', end: '13:00' },
        { start: '13:00', end: '14:00' },
        { start: '14:00', end: '15:30' },
        { start: '15:30', end: '16:00' }
    ];
    let found = false;
    times.forEach((slot, idx) => {
        const start = new Date(now);
        const end = new Date(now);
        const [sh, sm] = slot.start.split(':');
        const [eh, em] = slot.end.split(':');
        start.setHours(parseInt(sh), parseInt(sm), 0, 0);
        end.setHours(parseInt(eh), parseInt(em), 0, 0);
        if (now >= start && now < end) {
            indicator.style.display = 'block';
            indicator.style.top = `${idx * 60 + 100}px`;
            indicator.innerHTML = '<span class="glow-line"></span>';
            found = true;
        }
    });
    if (!found) indicator.style.display = 'none';
}
setInterval(updateCurrentTimeIndicator, 60000);
updateCurrentTimeIndicator();
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images (modern browsers)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Form validation helper (if you add a form directly to the page)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Print page functionality (optional)
function printSchedule() {
    window.print();
}

// Share functionality (Web Share API)
async function shareEvent() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'NIAT × Base44 Hackathon 2025',
                text: 'Join us for a no-code innovation challenge on 27 November!',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

// Add smooth reveal animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideUp 0.6s ease-out forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scroll-down {
        transform: translateY(-100%);
    }
    
    .navbar.scroll-up {
        transform: translateY(0);
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
    
    .nav-links a.active {
        color: var(--niat-blue);
        font-weight: 600;
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            gap: 16px;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

console.log('NIAT × Base44 Hackathon website loaded successfully!');
