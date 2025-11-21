/* ========================================
   VENUE SECTION - INTERACTIVE ENHANCEMENTS
   Map Controls • Animations • Location Pins
   ======================================== */

class VenueEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.createLocationPins();
        this.enhanceMapInteractions();
        this.addMapLoadingHandler();
        this.animateTransportCards();
    }

    // Create Floating Location Pins
    createLocationPins() {
        const venueSection = document.querySelector('.venue');
        const particlesContainer = document.querySelector('.venue-particles');

        if (!venueSection || !particlesContainer) return;

        const pins = ['📍', '🗺️', '🧭', '📌'];
        const positions = [
            { left: '10%', top: '20%', delay: 0 },
            { left: '85%', top: '15%', delay: 2 },
            { left: '15%', top: '75%', delay: 4 },
            { left: '80%', top: '80%', delay: 6 }
        ];

        positions.forEach((pos, index) => {
            const pin = document.createElement('div');
            pin.className = 'location-pin';
            pin.textContent = pins[index % pins.length];
            pin.style.left = pos.left;
            pin.style.top = pos.top;
            pin.style.animationDelay = pos.delay + 's';
            particlesContainer.appendChild(pin);
        });
    }

    // Enhance Map Interactions
    enhanceMapInteractions() {
        const mapContainer = document.querySelector('.venue-map-container');
        const iframe = mapContainer?.querySelector('iframe');

        if (!mapContainer || !iframe) return;

        // Add hover effect
        mapContainer.addEventListener('mouseenter', () => {
            mapContainer.style.transform = 'scale(1.01)';
            mapContainer.style.transition = 'transform 0.3s ease';
        });

        mapContainer.addEventListener('mouseleave', () => {
            mapContainer.style.transform = 'scale(1)';
        });

        // Track map interactions
        let hasInteracted = false;
        mapContainer.addEventListener('click', () => {
            if (!hasInteracted) {
                hasInteracted = true;
                console.log('🗺️ User interacted with venue map');
                this.showMapTooltip();
            }
        });
    }

    // Show helpful tooltip on first interaction
    showMapTooltip() {
        const mapContainer = document.querySelector('.venue-map-container');
        if (!mapContainer) return;

        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(37, 99, 235, 0.95);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 100;
            animation: fadeInOut 3s ease-in-out;
            pointer-events: none;
        `;
        tooltip.textContent = '🗺️ Click controls for directions!';

        mapContainer.appendChild(tooltip);

        setTimeout(() => tooltip.remove(), 3000);
    }

    // Handle Map Loading
    addMapLoadingHandler() {
        const iframe = document.querySelector('.venue-map-container iframe');
        const loading = document.querySelector('.map-loading');

        if (!iframe || !loading) return;

        iframe.addEventListener('load', () => {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => loading.remove(), 300);
            }, 500);
        });
    }

    // Animate Transport Cards on Scroll
    animateTransportCards() {
        const cards = document.querySelectorAll('.transport-card');
        const busRoutes = document.querySelector('.bus-routes');
        const locations = document.querySelector('.key-locations');

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease-out';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach((card, index) => {
            setTimeout(() => observer.observe(card), index * 100);
        });

        if (busRoutes) observer.observe(busRoutes);
        if (locations) observer.observe(locations);
    }

    // Add keyboard shortcuts for map controls
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only if venue section is in view
            const venueSection = document.querySelector('.venue');
            if (!venueSection) return;

            const rect = venueSection.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isInView) return;

            // Press 'D' for Directions
            if (e.key === 'd' || e.key === 'D') {
                const directionsBtn = document.querySelector('.btn-directions');
                if (directionsBtn) {
                    directionsBtn.click();
                    console.log('🧭 Directions opened via keyboard');
                }
            }

            // Press 'M' for Map
            if (e.key === 'm' || e.key === 'M') {
                const mapControls = document.querySelectorAll('.map-control-btn');
                if (mapControls[0]) {
                    mapControls[0].click();
                    console.log('🗺️ Map opened via keyboard');
                }
            }
        });
    }
}

// ========================================
// ADDITIONAL MAP UTILITIES
// ========================================

// Calculate distance (placeholder - would need geolocation API)
function showDistanceFromUser() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const venueLat = 17.548285698151023;
                const venueLon = 78.42885717463045;

                const distance = calculateDistance(userLat, userLon, venueLat, venueLon);

                console.log(`📍 You are ${distance.toFixed(1)} km from the venue`);

                // Could display this in the UI
                const mapBadge = document.querySelector('.map-info-badge span');
                if (mapBadge && distance < 50) {
                    mapBadge.textContent = `${distance.toFixed(1)} km away`;
                }
            },
            (error) => {
                console.log('Location access denied or unavailable');
            }
        );
    }
}

// Haversine formula for distance calculation
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Add animation for fadeInOut tooltip
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZE VENUE ENHANCEMENTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🗺️ Initializing venue enhancements...');

    try {
        const venueEnhancements = new VenueEnhancements();

        // Optional: Show distance from user (requires permission)
        // showDistanceFromUser();

        console.log('✅ Venue enhancements loaded');
    } catch (e) {
        console.error('❌ Venue enhancements error:', e);
    }
});

// Export for debugging
window.venueEnhancements = {
    VenueEnhancements,
    showDistanceFromUser,
    calculateDistance
};

console.log('💡 Venue enhancements available: window.venueEnhancements');
