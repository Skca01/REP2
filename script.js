/**
 * Kent Carlo B. Amante Portfolio - Scripts
 * 
 * @author: Kent Carlo B. Amante
 * @email: carloamante125@gmail.com
 * @github: https://github.com/Skca01
 * @description: Main JavaScript functionality for personal portfolio website
 * @copyright: © 2025 Kent Carlo B. Amante. All rights reserved.
 */

// Smooth Scrolling
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

// Navbar Scroll Effects
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Reveal for Sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
});

// Typewriter Effect
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}

// Particle Network Animation (Disabled on Mobile)
const isMobile = window.innerWidth <= 768;
const canvas = document.getElementById('particle-network');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--primary)';
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
    }

    if (!isMobile) {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${1 - distance / 100})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            drawLines();
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animateParticles();
    }
}

// Particle Animation (Existing)
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: particleFloat 3s linear infinite;
    `;
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    document.querySelector('.hero').appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 3000);
};
if (!isMobile) {
    setInterval(createParticle, 300);
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
if (mobileMenu && navLinksContainer) {
    mobileMenu.addEventListener('click', () => {
        const isActive = navLinksContainer.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', isActive);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !mobileMenu.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (!isMobile) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill Item Animation
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.transform = 'scale(1.05)';
                entry.target.style.background = 'var(--primary)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.background = 'var(--bg-secondary)';
                }, 200);
            }, index * 50);
        }
    });
}, { threshold: 0.5 });
skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Project Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(filter) {
    projectCards.forEach(card => {
        // Get all technology tags from the card
        const techTags = card.querySelectorAll('.tech-tag');
        const techList = Array.from(techTags).map(tag => tag.textContent.toLowerCase());
        
        // Get project title for ESP32 check
        const projectTitle = card.querySelector('.project-title').textContent.toLowerCase();
        
        // Show all projects if filter is 'all'
        if (filter === 'all') {
            card.style.display = 'block';
            return;
        }

        // Special handling for ESP32 filter
        if (filter === 'esp32' && projectTitle.includes('esp32')) {
            card.style.display = 'block';
            return;
        }

        // Check if any of the tech tags match the filter
        const matchesFilter = techList.some(tech => tech.toLowerCase().includes(filter.toLowerCase()));
        card.style.display = matchesFilter ? 'block' : 'none';
    });
}

// Add click event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Get filter value and apply filtering
        const filter = button.getAttribute('data-filter').toLowerCase();
        filterProjects(filter);
        
        // Trigger layout animations
        projectCards.forEach(card => {
            if (card.style.display !== 'none') {
                card.classList.add('fade-in');
                setTimeout(() => card.classList.remove('fade-in'), 500);
            }
        });
    });
});

// Initialize with 'all' filter
filterProjects('all');

// Project Card Entrance Animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const isLight = document.documentElement.classList.contains('light');
        themeToggle.innerHTML = `<i class="fas fa-${isLight ? 'sun' : 'moon'}"></i>`;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Contact Form Handler
const contactForm = document.querySelector('form.contact-form');

// Function to get the correct base URL
function getBaseUrl() {
    // Check if we're on GitHub Pages
    if (window.location.hostname === 'skca01.github.io') {
        return '/Kent-Portfolio/';
    }
    // Local environment
    return '/';
}

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    const validateInput = (input) => {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(input.id) {
            case 'name':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Name is required';
                } else if (!/^[A-Za-z .'-]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Name must contain only letters, spaces, or basic punctuation';
                }
                break;
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Subject is required';
                }
                break;
            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Message is required';
                }
                break;
        }

        const errorElement = input.parentElement.querySelector('.error-message') || 
            (() => {
                const el = document.createElement('span');
                el.className = 'error-message';
                input.parentElement.appendChild(el);
                return el;
            })();

        if (!isValid) {
            input.classList.add('invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            input.classList.remove('invalid');
            errorElement.style.display = 'none';
        }

        return isValid;
    };

    // Real-time validation
    formInputs.forEach(input => {
        if (input.type !== 'hidden' && input.type !== 'checkbox') {
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        formInputs.forEach(input => {
            if (input.type !== 'hidden') {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            }
        });

        if (!isFormValid) {
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Submit the form
        this.submit();
    });
}

// Ripple Effect for Social Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const ripple = this.querySelector('.ripple');
        ripple.style.left = `${e.offsetX}px`;
        ripple.style.top = `${e.offsetY}px`;
        ripple.style.animation = 'none';
        ripple.offsetHeight;
        ripple.style.animation = 'ripple 0.6s linear';
    });
});

// Keyboard Accessibility for Mobile Menu
if (mobileMenu) {
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isActive = navLinksContainer.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', isActive);
            if (isActive) {
                navLinksContainer.querySelector('a').focus();
            }
        }
    });
}

// Visitor Counter Fallback
const visitorCounterImg = document.getElementById('visitor-counter');
if (visitorCounterImg) {
    visitorCounterImg.addEventListener('error', () => {
        visitorCounterImg.parentElement.parentElement.textContent = 'Visitors: N/A';
    });
}

// Resume Download Handler
const resumeButton = document.querySelector('a[href="resume.pdf"]');
if (resumeButton) {
    resumeButton.addEventListener('click', function(e) {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Cookie Consent Handler
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

const COOKIE_CONSENT_KEY = 'cookie-consent-status';

// Check if user has already made a choice
const cookieChoice = localStorage.getItem(COOKIE_CONSENT_KEY);
if (!cookieChoice) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    cookieConsent.classList.remove('show');
    // Enable analytics or other cookie-dependent features here
});

declineCookies.addEventListener('click', () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    cookieConsent.classList.remove('show');
    // Disable analytics or other cookie-dependent features here
});
