// ========== SMOOTH SCROLL & NAVBAR INTERACTION ==========
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Hide menu on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ========== STATS ANIMATION ==========
    const statsSection = document.querySelector('.stats');
    let statsAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, observerOptions);

    observer.observe(statsSection);

    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // ========== FORM VALIDATION & SUBMISSION ==========
    setupFormHandlers();

    function setupFormHandlers() {
        // Empresa Form
        const formEmpresa = document.getElementById('formEmpresa');
        if (formEmpresa) {
            formEmpresa.addEventListener('submit', handleFormSubmit);
        }

        // Dev Form
        const formDev = document.getElementById('formDev');
        if (formDev) {
            formDev.addEventListener('submit', handleFormSubmit);
        }

        // Contato Form
        const formContato = document.getElementById('formContato');
        if (formContato) {
            formContato.addEventListener('submit', handleFormSubmit);
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        // Validate form
        const formData = new FormData(this);
        const isValid = validateForm(this);

        if (isValid) {
            // Show success notification
            showNotification('Formulário enviado com sucesso! Entraremos em contato em breve.', 'success');

            // Reset form
            this.reset();

            // Simulate sending data (in production, this would be an API call)
            console.log('Form Data:', Object.fromEntries(formData));

            // You can uncomment to make an actual API call:
            // sendFormData(this);
        }
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                highlightField(input);
                isValid = false;
            } else {
                removeHighlight(input);
            }

            // Validate email
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    highlightField(input);
                    isValid = false;
                } else {
                    removeHighlight(input);
                }
            }

            // Validate URL
            if (input.type === 'url' && input.value.trim()) {
                try {
                    new URL(input.value);
                    removeHighlight(input);
                } catch {
                    highlightField(input);
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    function highlightField(field) {
        field.style.borderColor = '#ff4444';
        field.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
    }

    function removeHighlight(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification show';

        // Add type-specific styling
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #00b359, #00e699)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ff4444, #ff6666)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #0066ff, #1e90ff)';
        }

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // ========== PARALLAX EFFECT ==========
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (hero && scrollPosition < window.innerHeight) {
            hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
        }
    });

    // ========== CARD HOVER EFFECT ==========
    const cards = document.querySelectorAll('.card-feature, .servico-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '0px');
            card.style.setProperty('--mouse-y', '0px');
        });
    });

    // ========== ACTIVE LINK HIGHLIGHTING ==========
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = '#0066ff';
            } else {
                link.style.color = '';
            }
        });
    });

    // ========== TYPING ANIMATION ==========
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;

        function typeText() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }

        // Start typing animation when page loads
        setTimeout(typeText, 300);
    }

    // ========== INTERSECTION OBSERVER FOR FADE IN ==========
    const fadeInElements = document.querySelectorAll('.card-feature, .servico-card, .stat-box');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // ========== GLASSMORPHISM EFFECT ==========
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        document.documentElement.style.setProperty('--mouse-x', `${mouseX * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY * 100}%`);
    });

    // ========== DARK MODE TOGGLE (Optional) ==========
    // Uncomment to add dark mode functionality
    /*
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('light-mode'));
        });

        // Restore preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('light-mode');
        }
    }
    */

    // ========== SMOOTH SCROLL ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== DYNAMIC GRADIENT BACKGROUND ==========
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        document.documentElement.style.setProperty('--bg-angle', `${angle}deg`);
    }, 100);

    // ========== FORM INPUT VALIDATION IN REAL TIME ==========
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (input.value && !emailRegex.test(input.value)) {
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '';
                }
            }

            if (input.type === 'url') {
                if (input.value) {
                    try {
                        new URL(input.value);
                        input.style.borderColor = '';
                    } catch {
                        input.style.borderColor = '#ff4444';
                    }
                }
            }
        });

        input.addEventListener('focus', () => {
            removeHighlight(input);
        });
    });

    // ========== PERFORMANCE OPTIMIZATION - LAZY LOADING ==========
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========== BACKGROUND ANIMATION ==========
    const createFloatingElement = () => {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = element.style.width;
        element.style.background = `rgba(0, 102, 255, ${Math.random() * 0.1 + 0.02})`;
        element.style.borderRadius = '50%';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.zIndex = '-1';
        element.style.pointerEvents = 'none';
        element.style.animation = `float ${Math.random() * 20 + 10}s infinite`;

        document.body.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, (Math.random() * 20 + 10) * 1000);
    };

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Uncomment to enable floating elements
    // setInterval(createFloatingElement, 5000);

    // ========== ACCESSIBILITY IMPROVEMENTS ==========
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
        }

        // Add accessibility for form submission
        if (e.key === 'Enter' && e.target.tagName === 'FORM') {
            e.target.dispatchEvent(new Event('submit'));
        }
    });

    console.log('TechConnect - Site carregado com sucesso! 🚀');
});

// ========== ANALYTICS (Optional) ==========
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // You can integrate with Google Analytics or other services here
}

// ========== API INTEGRATION EXAMPLE ==========
async function IngestaoCNPJ(form) {
    try {
        const formData = new FormData(form);
        const response = await fetch('https://api.opencnpj.org/{CNPJ}', {
            method: 'GET',
            body: formData
        });

        if (response.ok) {
            showNotification('Dados carregados com sucesso!', 'success');
        } else {
            showNotification('Erro ao carregar dados. Tente novamente.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Erro de conexão. Tente novamente.', 'error');
    }
}
