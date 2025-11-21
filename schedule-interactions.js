/* ====================================
   EVENT SCHEDULE INTERACTIONS
   ==================================== */

// Schedule Data
const scheduleData = [
    {
        id: 1,
        time: '9:00–9:30 AM',
        startTime: '09:00',
        endTime: '09:30',
        activity: 'Registration & Team Setup',
        icon: '📝',
        description: 'Check-in, badge collection, and team formation. Get to know your teammates and start planning your strategy!',
        details: [
            'Welcome desk opens at 9:00 AM sharp',
            'Collect your participant badge and swag kit',
            'Form teams or join existing ones',
            'Access to event resources and WiFi'
        ]
    },
    {
        id: 2,
        time: '9:30–10:00 AM',
        startTime: '09:30',
        endTime: '10:00',
        activity: 'Opening Ceremony & Briefing',
        icon: '🎤',
        description: 'Official hackathon kickoff with welcome speeches, rules overview, and theme announcement.',
        details: [
            'Welcome address by NIAT & Base44 leadership',
            'Hackathon rules and judging criteria explained',
            'Theme and challenge tracks revealed',
            'Q&A session with organizers'
        ]
    },
    {
        id: 3,
        time: '10:00 AM–1:00 PM',
        startTime: '10:00',
        endTime: '13:00',
        activity: 'Hack / Build Session – Phase 1',
        icon: '💻',
        description: 'Start building your innovative solutions! Mentors available for guidance and technical support.',
        details: [
            'Begin coding your project',
            'Mentor support available',
            'Access to APIs and development tools',
            'Collaboration and brainstorming time'
        ]
    },
    {
        id: 4,
        time: '1:00–2:00 PM',
        startTime: '13:00',
        endTime: '14:00',
        activity: 'Lunch & Networking',
        icon: '🍽️',
        description: 'Take a break, refuel, and network with fellow participants, mentors, and sponsors.',
        details: [
            'Complimentary lunch provided',
            'Network with industry professionals',
            'Discuss ideas with other teams',
            'Relax and recharge for Phase 2'
        ]
    },
    {
        id: 5,
        time: '2:00–3:30 PM',
        startTime: '14:00',
        endTime: '15:30',
        activity: 'Hack / Build Session – Phase 2',
        icon: '⚡',
        description: 'Final push to complete your project. Finalize features, test, and prepare your presentation.',
        details: [
            'Complete core features',
            'Testing and debugging',
            'Prepare demo and presentation',
            'Last-minute mentor consultations'
        ]
    },
    {
        id: 6,
        time: '3:30–4:00 PM',
        startTime: '15:30',
        endTime: '16:00',
        activity: 'Project Submission & Closing',
        icon: '🏆',
        description: 'Submit your projects, present to judges, and celebrate your hard work! Awards ceremony to follow.',
        details: [
            'Final project submission deadline',
            'Team presentations to judges',
            'Winner announcement and awards',
            'Closing remarks and group photo'
        ]
    }
];

// Particles.js Configuration
const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#2563EB', '#00d4ff', '#8b5cf6']
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.4,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#2563EB',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// Initialize Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('scheduleParticles', particlesConfig);
    }
}

// Get Current Time Status
function getScheduleStatus(startTime, endTime) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    if (currentTime < start) {
        return 'upcoming';
    } else if (currentTime >= start && currentTime < end) {
        return 'current';
    } else {
        return 'completed';
    }
}

// Calculate Time Until Event
function getTimeUntil(startTime) {
    const now = new Date();
    const [hours, minutes] = startTime.split(':').map(Number);

    const eventTime = new Date();
    eventTime.setHours(hours, minutes, 0, 0);

    const diff = eventTime - now;

    if (diff <= 0) return null;

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours: hrs, minutes: mins, seconds: secs };
}

// Render Schedule Items
function renderSchedule() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    if (!scheduleGrid) return;

    scheduleGrid.innerHTML = scheduleData.map((item, index) => {
        const status = getScheduleStatus(item.startTime, item.endTime);

        return `
            <div class="schedule-item ${status}" data-id="${item.id}">
                <div class="schedule-header">
                    <div class="schedule-icon">${item.icon}</div>
                    <div class="schedule-time">${item.time}</div>
                    <div class="schedule-activity">${item.activity}</div>
                    <div class="schedule-status-group">
                        ${status === 'current' ? '<span class="live-indicator">🔴 LIVE</span>' : ''}
                        <span class="expand-icon">▼</span>
                    </div>
                </div>
                <div class="schedule-details">
                    <p>${item.description}</p>
                    <ul>
                        ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    attachClickHandlers();
}// Attach Click Handlers for Expandable Cards
function attachClickHandlers() {
    const scheduleItems = document.querySelectorAll('.schedule-item');

    scheduleItems.forEach(item => {
        item.addEventListener('click', function () {
            // Toggle active state
            const wasActive = this.classList.contains('active');

            // Close all items
            scheduleItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't already active
            if (!wasActive) {
                this.classList.add('active');
            }
        });
    });
}

// Update Timeline Progress
function updateTimelineProgress() {
    const progressLine = document.getElementById('progressLine');
    const progressIndicator = document.getElementById('progressIndicator');

    if (!progressLine || !progressIndicator) return;

    // Find current or last completed item
    let completedCount = 0;
    scheduleData.forEach(item => {
        const status = getScheduleStatus(item.startTime, item.endTime);
        if (status === 'completed') completedCount++;
        if (status === 'current') completedCount += 0.5; // Half progress for current item
    });

    const progressPercent = (completedCount / scheduleData.length) * 100;

    progressLine.style.height = `${progressPercent}%`;
    progressIndicator.style.top = `${progressPercent}%`;
}

// Mouse Spotlight Effect
function initSpotlight() {
    const spotlight = document.getElementById('spotlight');
    const scheduleSection = document.querySelector('.schedule');

    if (!spotlight || !scheduleSection) return;

    scheduleSection.addEventListener('mousemove', (e) => {
        const rect = scheduleSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlight.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    });
}

// Parallax Effect
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const scheduleSection = document.querySelector('.schedule');

        if (!scheduleSection) return;

        const rect = scheduleSection.getBoundingClientRect();
        const sectionTop = rect.top + scrolled;
        const sectionHeight = rect.height;

        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const relativeScroll = scrolled - sectionTop;

            parallaxLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.3;
                const yPos = -(relativeScroll * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }
    });
}

// Intersection Observer for Scroll Animations
function initScrollAnimations() {
    const scheduleItems = document.querySelectorAll('.schedule-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    scheduleItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
}

// Update Countdowns Every Second
function startCountdownUpdates() {
    setInterval(() => {
        updateTimelineProgress();
    }, 5000); // Update every 5 seconds instead of 1
}

// Initialize All Schedule Features
function initSchedule() {
    // Render schedule
    renderSchedule();

    // Initialize particles
    initParticles();

    // Update timeline
    updateTimelineProgress();

    // Initialize spotlight
    initSpotlight();

    // Initialize parallax
    initParallax();

    // Initialize scroll animations
    initScrollAnimations();

    // Start countdown updates
    startCountdownUpdates();
}

// Run on DOM Content Loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchedule);
} else {
    initSchedule();
}

// Export for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSchedule, scheduleData };
}
