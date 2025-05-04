document.addEventListener("DOMContentLoaded", () => {
    // Initialize loading sequence
    initLoading();

    // Initialize particles with increased size and count
    const particlesContainer = document.getElementById('particlesContainer');
    createParticles(particlesContainer, 80);

    // Initialize scroll-based background instead of the timer-based one
    initScrollBasedBackground();

    // Initialize all other components
    initToggleSections();
    initNavigationButtons();
    initVideoModal();

    // Initialize custom cursor (using the improved FortniteCursor module)
    FortniteCursor.init();
});

// Add scroll-based background color change
function initScrollBasedBackground() {
    // Create background element if it doesn't exist
    let bgElement = document.querySelector('.dynamic-background');
    if (!bgElement) {
        bgElement = document.createElement('div');
        bgElement.className = 'dynamic-background';
        bgElement.style.position = 'fixed';
        bgElement.style.top = '0';
        bgElement.style.left = '0';
        bgElement.style.width = '100%';
        bgElement.style.height = '100%';
        bgElement.style.zIndex = '-10';
        bgElement.style.transition = 'background-color 0.8s ease';
        document.body.prepend(bgElement);
    }

    // Define bright, vibrant colors for background
    const brightColors = [
        '#FF6B6B', // Bright red
        '#4ECDC4', // Bright teal
        '#FFD166', // Bright yellow
        '#06D6A0', // Bright green
        '#118AB2', // Bright blue
        '#9D4EDD', // Bright purple
        '#FF9F1C'  // Bright orange
    ];

    // Track scroll position and document height to calculate progress
    let lastScrollPosition = 0;
    let documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    // Update the viewport height on resize
    window.addEventListener('resize', () => {
        documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
    });

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        // Get current scroll position
        const scrollPosition = window.scrollY;

        // Calculate scroll percentage (0 to 1)
        const scrollPercentage = Math.min(scrollPosition / (documentHeight - window.innerHeight), 1);

        // Only update color if we've scrolled enough (prevents too frequent changes)
        if (Math.abs(scrollPosition - lastScrollPosition) > 50) {
            lastScrollPosition = scrollPosition;

            // Calculate color index based on scroll percentage
            const colorIndex = Math.floor(scrollPercentage * brightColors.length);
            const nextColorIndex = (colorIndex + 1) % brightColors.length;

            // Calculate interpolation factor between the two colors
            const factor = (scrollPercentage * brightColors.length) - colorIndex;

            // Create a gradient between the two colors
            bgElement.style.background = `linear-gradient(135deg,
                ${brightColors[colorIndex]},
                ${brightColors[nextColorIndex]})`;

            // Add a bright glow effect that changes with scroll
            bgElement.style.boxShadow = `inset 0 0 100px rgba(255, 255, 255, ${0.1 + (scrollPercentage * 0.2)})`;
        }
    });

    // Initial color set
    bgElement.style.background = `linear-gradient(135deg, ${brightColors[0]}, ${brightColors[1]})`;

    // Add a style element for extra effects
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .dynamic-background::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 70%);
            pointer-events: none;
        }

        /* Additional style for particles to make them more visible */
        .particle {
            box-shadow: 0 0 15px 5px currentColor;
            opacity: 0.8 !important;
        }
    `;
    document.head.appendChild(styleElement);
}

// ===== LOADING FUNCTIONALITY =====
function initLoading() {
    const loader = document.getElementById('loader');
    const loaderProgress = document.querySelector('.loader-progress');

    // Ensure loader is visible
    loader.style.display = 'flex';

    // Manually animate progress bar in case CSS animation doesn't work
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        if (loaderProgress) {
            loaderProgress.style.width = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(progressInterval);

            // Once progress reaches 100%, wait a bit then fade out
            setTimeout(() => {
                loader.classList.add('loader-fade');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 30); // Complete in ~3 seconds
}

// ===== BACKGROUND PARTICLES FUNCTIONALITY =====
// Create enhanced floating particles
function createParticles(container, count) {
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Much larger particles for high visibility
        const size = Math.random() * 12 + 8; // 8-20px (much bigger)
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight + window.innerHeight;

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        // Random delay to stagger animations
        const delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;

        // Random duration to create varied movement
        const duration = (Math.random() * 10) + 15; // 15-25 seconds
        particle.style.animationDuration = `${duration}s`;

        // Ultra-bright particle colors
        const brightColor = getRandomNeonColor();
        particle.style.backgroundColor = brightColor;
        particle.style.boxShadow = `0 0 ${size * 2}px ${size}px ${brightColor}`;
        particle.style.opacity = `${Math.random() * 0.3 + 0.7}`; // Between 0.7 and 1.0

        container.appendChild(particle);
    }

    // Add CSS animation for particles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: floatUp linear infinite;
            pointer-events: none;
            filter: blur(1px);
        }

        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) scale(1);
            }
            33% {
                transform: translateY(-33vh) translateX(calc(var(--rand-x) * 150px)) scale(1.3);
            }
            66% {
                transform: translateY(-66vh) translateX(calc(var(--rand-x) * 100px)) scale(1.1);
            }
            100% {
                transform: translateY(-100vh) translateX(calc(var(--rand-x) * 200px)) scale(0.9);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);

    // Add random horizontal movement to each particle
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
        const randomX = (Math.random() * 2 - 1); // Random value between -1 and 1
        p.style.setProperty('--rand-x', randomX);
    });
}

// Generate extremely bright neon colors
function getRandomNeonColor() {
    const neonColors = [
        '#FF00FF', // Magenta
        '#00FFFF', // Cyan
        '#FF00CC', // Pink
        '#00FF00', // Green
        '#FFF700', // Yellow
        '#FF9E00', // Orange
        '#FF3131', // Red
        '#39FF14'  // Neon green
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// ===== ORIGINAL FUNCTIONALITY =====
// Video Modal
function initVideoModal() {
    // Add click handlers to any video links
    const videoLinks = document.querySelectorAll('[data-video-url]');
    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('data-video-url');
            openVideo(url);
        });
    });

    // Add click handler to close button if it exists
    const closeButton = document.querySelector('.video-modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeVideo);
    }
}

function openVideo(url) {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");
    if (modal && frame) {
        frame.src = url;
        modal.style.display = "flex";
    }
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const frame = document.getElementById("videoFrame");
    if (modal && frame) {
        modal.style.display = "none";
        frame.src = ""; // Stop video
    }
}

// Toggle Sections
function initToggleSections() {
    const toggleSections = document.querySelectorAll(".toggle-section");

    toggleSections.forEach(section => {
        const btn = section.querySelector(".toggle-btn");
        const content = section.nextElementSibling;

        if (btn && content) {
            btn.addEventListener("click", () => {
                content.classList.toggle("active");
                section.classList.toggle("open");

                // Optional: animate max-height
                if (content.classList.contains("active")) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        }
    });
}

// Navigation Buttons (Week Switch)
function initNavigationButtons() {
    const buttons = document.querySelectorAll(".week-nav-button");
    const sections = document.querySelectorAll(".collapsible-content");

    if (buttons.length > 0 && sections.length > 0) {
        buttons.forEach((btn, index) => {
            if (index < sections.length) {
                btn.addEventListener("click", () => {
                    buttons.forEach(b => b.classList.remove("active"));
                    sections.forEach(s => s.classList.remove("active"));

                    btn.classList.add("active");
                    sections[index].classList.add("active");

                    // Animate open height
                    sections.forEach(s => s.style.maxHeight = null); // Reset
                    const activeSection = sections[index];
                    activeSection.style.maxHeight = activeSection.scrollHeight + "px";
                });
            }
        });
    }
}

// ===== FORTNITE CURSOR FUNCTIONALITY =====
// Create cursor JS module to make it portable across websites
const FortniteCursor = {
    init: function () {
        // Create necessary elements if they don't exist
        this.createElements();

        this.cursor = document.querySelector('.cursor');
        this.cursorContainer = document.querySelector('.cursor-container');
        this.fortniteTarget = document.querySelector('.fortnite-target');
        this.colorOptions = document.querySelectorAll('.cursor-settings .color-option');

        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.trailElements = [];
        this.maxTrailElements = 15;
        this.colorTheme = {
            primary: '#5ac8fa',
            secondary: '#0091ff',
            gradient: 'linear-gradient(45deg, #5ac8fa, #0091ff)'
        };

        // Setup event listeners
        this.setupEventListeners();

        // Initialize components
        this.createCursorTrails();
        this.updateCursorPosition();
        this.updateCursorColors();

        // Show cursor settings after a short delay
        setTimeout(() => {
            const settings = document.querySelector('.cursor-settings');
            if (settings) {
                settings.style.display = 'flex';
            }
        }, 4000);
    },

    createElements: function () {
        // All the element creation code is handled by your HTML structure,
        // so we don't need to recreate them here
    },

    setupEventListeners: function () {
        const self = this;

        // Mouse move event
        document.addEventListener('mousemove', function (e) {
            self.mouseX = e.clientX;
            self.mouseY = e.clientY;
            self.updateTrails();

            // Show target on movement
            if (self.fortniteTarget) {
                self.fortniteTarget.style.left = (e.clientX - 30) + 'px';
                self.fortniteTarget.style.top = (e.clientY - 30) + 'px';
                self.fortniteTarget.style.opacity = '1';

                // Hide target after 2 seconds of no movement
                clearTimeout(window.targetTimeout);
                window.targetTimeout = setTimeout(() => {
                    self.fortniteTarget.style.opacity = '0';
                }, 2000);
            }
        });

        // Click effects
        document.addEventListener('mousedown', function (e) {
            // Scale cursor on click
            if (self.cursor) {
                self.cursor.style.transform = 'scale(0.6)';
            }

            // Create click ripple effect
            self.createClickRipple(e.clientX, e.clientY);

            // Create particle explosion
            self.createParticles(e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', function () {
            if (self.cursor) {
                self.cursor.style.transform = 'scale(0.8)';
            }
        });

        // Add hover effects for buttons and inputs
        document.querySelectorAll('button, a, input, select, .clickable, [role="button"]').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (self.cursor) {
                    self.cursor.style.transform = 'scale(1.2)';
                    self.cursor.style.animation = 'glowAnimation 0.8s infinite';
                }
            });

            element.addEventListener('mouseleave', () => {
                if (self.cursor) {
                    self.cursor.style.transform = 'scale(0.8)';
                    self.cursor.style.animation = 'none';
                }
            });
        });

        // Color theme changes
        if (this.colorOptions) {
            this.colorOptions.forEach(option => {
                option.addEventListener('click', function () {
                    // Remove active class from all options
                    self.colorOptions.forEach(opt => opt.classList.remove('active'));
                    // Add active class to clicked option
                    this.classList.add('active');

                    const themeColor = this.getAttribute('data-color');

                    // Update color theme based on selection
                    switch (themeColor) {
                        case 'blue':
                            self.colorTheme = {
                                primary: '#5ac8fa',
                                secondary: '#0091ff',
                                gradient: 'linear-gradient(45deg, #5ac8fa, #0091ff)'
                            };
                            break;
                        case 'purple':
                            self.colorTheme = {
                                primary: '#bf5af2',
                                secondary: '#8a2be2',
                                gradient: 'linear-gradient(45deg, #bf5af2, #8a2be2)'
                            };
                            break;
                        case 'green':
                            self.colorTheme = {
                                primary: '#32d74b',
                                secondary: '#00b300',
                                gradient: 'linear-gradient(45deg, #32d74b, #00b300)'
                            };
                            break;
                        case 'orange':
                            self.colorTheme = {
                                primary: '#ff9500',
                                secondary: '#ff5e3a',
                                gradient: 'linear-gradient(45deg, #ff9500, #ff5e3a)'
                            };
                            break;
                    }

                    // Update cursor colors
                    self.updateCursorColors();
                });
            });
        }
    },

    updateCursorPosition: function () {
        const self = this;

        if (!this.cursorContainer) return;

        const dx = this.mouseX - this.cursorX;
        const dy = this.mouseY - this.cursorY;

        this.cursorX += dx * 0.2;
        this.cursorY += dy * 0.2;

        this.cursorContainer.style.left = this.cursorX + 'px';
        this.cursorContainer.style.top = this.cursorY + 'px';

        requestAnimationFrame(() => self.updateCursorPosition());
    },

    createCursorTrails: function () {
        // Remove any existing trails first
        this.trailElements.forEach(trail => {
            if (trail.element && trail.element.parentNode) {
                trail.element.parentNode.removeChild(trail.element);
            }
        });
        this.trailElements = [];

        for (let i = 0; i < this.maxTrailElements; i++) {
            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            // Enhanced trails with better visibility
            trail.style.opacity = (1 - i / this.maxTrailElements) * 0.8; // Increased from 0.5 to 0.8
            trail.style.width = '16px'; // Increased size
            trail.style.height = '16px';
            document.body.appendChild(trail);
            this.trailElements.push({
                element: trail,
                x: 0,
                y: 0
            });
        }
    },

    updateTrails: function () {
        const self = this;
        this.trailElements.forEach((trail, index) => {
            // The higher the index, the further back in the trail
            const delay = index * 3;
            const targetX = this.mouseX;
            const targetY = this.mouseY;

            setTimeout(() => {
                trail.x = targetX;
                trail.y = targetY;
                trail.element.style.left = (targetX - trail.element.offsetWidth / 2) + 'px';
                trail.element.style.top = (targetY - trail.element.offsetHeight / 2) + 'px';
            }, delay);
        });
    },

    createClickRipple: function (x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = (x - 50) + 'px';
        ripple.style.top = (y - 50) + 'px';
        // Enhanced ripple effect
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.background = this.colorTheme.gradient;
        document.body.appendChild(ripple);

        // Remove ripple after animation completes
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    },

    createParticles: function (x, y) {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles');
        document.body.appendChild(particlesContainer);

        // Increased number of particles from 20 to 30
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Larger particles: size between 5px and 12px
            const size = Math.random() * 7 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Alternate colors with increased visibility
            particle.style.backgroundColor = i % 2 === 0 ? this.colorTheme.primary : this.colorTheme.secondary;
            particle.style.boxShadow = `0 0 ${size}px ${size / 2}px ${particle.style.backgroundColor}`;

            // Initial position at click location
            particle.style.left = '0px';
            particle.style.top = '0px';

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50; // Increased speed
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            particlesContainer.appendChild(particle);
            // Animate particle
            const startTime = Date.now();
            const animate = () => {
                const elapsed = (Date.now() - startTime) / 1000; // seconds
                const opacity = Math.max(0, 1 - elapsed * 2);

                // Position with gravity effect
                const posX = vx * elapsed;
                const posY = vy * elapsed + 50 * elapsed * elapsed; // Add gravity

                particle.style.transform = `translate(${posX}px, ${posY}px)`;
                particle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    // Remove container if empty
                    if (particlesContainer.children.length === 0) {
                        if (particlesContainer.parentNode) {
                            particlesContainer.parentNode.removeChild(particlesContainer);
                        }
                    }
                }
            };

            requestAnimationFrame(animate);
        }

        // Position the container at the click point
        particlesContainer.style.left = x + 'px';
        particlesContainer.style.top = y + 'px';
    },

    updateCursorColors: function () {
        if (!this.cursor) return;

        // Update cursor
        this.cursor.style.background = this.colorTheme.gradient;
        this.cursor.style.boxShadow = `0 0 10px ${this.colorTheme.primary}, 0 0 20px ${this.colorTheme.secondary}`;

        // Update fortnite target
        if (this.fortniteTarget) {
            const rings = this.fortniteTarget.querySelectorAll('.ring');
            if (rings) {
                rings.forEach(ring => {
                    ring.style.borderColor = this.colorTheme.secondary;
                });
            }

            const crosshair = this.fortniteTarget.querySelector('.crosshair');
            if (crosshair) {
                crosshair.style.color = this.colorTheme.secondary;
            }
        }

        // Update trail colors
        this.trailElements.forEach(trail => {
            trail.element.style.backgroundColor = this.colorTheme.primary;
            trail.element.style.boxShadow = `0 0 15px 5px ${this.colorTheme.primary}80`; // 80 = 50% opacity
        });
    }
};

// Function to handle window resize events - recreate particles
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particlesContainer');
    if (particlesContainer) {
        createParticles(particlesContainer, 50);
    }
});

// Add animation to background lines
function animateBackgroundLines() {
    const lines = document.querySelectorAll('.bg-line');

    lines.forEach((line, index) => {
        // Random starting position
        const startPos = Math.random() * 100;
        line.style.animation = `moveLine ${10 + index * 5}s infinite ease-in-out`;
        line.style.animationDelay = `-${Math.random() * 5}s`;
    });
}

// Call on load
window.addEventListener('load', animateBackgroundLines);