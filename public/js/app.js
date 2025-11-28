// MAXI SERVICIOS ABA - Main JavaScript

// API Base URL
const API_URL = window.location.origin + '/api';

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);

    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Initialize Swiper
    initializeSwiper();

    // Load fuel prices
    loadFuelPrices();

    // Load promotions
    loadPromotions();

    // Initialize contact form
    initializeContactForm();

    // Initialize navigation
    initializeNavigation();

    // Track page view
    trackStatistic('page_view');

    // Initialize WhatsApp button tracking
    initializeWhatsAppTracking();
});

// Initialize Swiper Slider
function initializeSwiper() {
    new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// Load Fuel Prices
async function loadFuelPrices() {
    const container = document.getElementById('precios-container');
    const lastUpdateEl = document.getElementById('last-update');

    try {
        const response = await fetch(`${API_URL}/fuel-prices`);
        const data = await response.json();

        if (data.success && data.data) {
            const prices = data.data;
            const fuelTypes = {
                'magna': { name: 'Magna', color: 'success', icon: 'fuel-pump', bgColor: '#198754' },
                'premium': { name: 'Premium', color: 'danger', icon: 'fuel-pump-fill', bgColor: '#E31E24' },
                'diesel': { name: 'Diésel', color: 'dark', icon: 'truck', bgColor: '#212529' }
            };

            container.innerHTML = '';

            prices.forEach((price, index) => {
                const fuel = fuelTypes[price.fuel_type];
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', index * 100);

                card.innerHTML = `
                    <div class="precio-card card shadow-sm position-relative">
                        <i class="bi bi-${fuel.icon} fuel-icon"></i>
                        <div class="card-header bg-${fuel.color} text-white text-center">
                            <i class="bi bi-${fuel.icon} me-2"></i>${fuel.name}
                        </div>
                        <div class="card-body text-center py-4">
                            <div class="precio-value">$${parseFloat(price.price).toFixed(2)}</div>
                            <p class="text-muted mb-0">por litro</p>
                        </div>
                    </div>
                `;

                // Add tooltip
                const cardElement = card.querySelector('.precio-card');
                cardElement.setAttribute('data-bs-toggle', 'tooltip');
                cardElement.setAttribute('data-bs-placement', 'top');
                cardElement.setAttribute('title', `Precio de ${fuel.name}`);

                container.appendChild(card);
            });

            // Initialize tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(el => new bootstrap.Tooltip(el));

            // Update last update time
            if (prices.length > 0 && prices[0].updated_at) {
                const date = new Date(prices[0].updated_at);
                lastUpdateEl.textContent = date.toLocaleString('es-MX');
            }

            // Track price view
            trackStatistic('price_view');
        }
    } catch (error) {
        console.error('Error loading prices:', error);
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    No se pudieron cargar los precios. Por favor intenta más tarde.
                </div>
            </div>
        `;
    }
}

// Load Promotions
async function loadPromotions() {
    const container = document.getElementById('promociones-container');

    try {
        const response = await fetch(`${API_URL}/promotions`);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
            const promotions = data.data;
            container.innerHTML = '';

            promotions.forEach((promo, index) => {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4';
                card.setAttribute('data-aos', 'zoom-in');
                card.setAttribute('data-aos-delay', index * 100);

                const validFrom = new Date(promo.valid_from).toLocaleDateString('es-MX');
                const validUntil = new Date(promo.valid_until).toLocaleDateString('es-MX');

                card.innerHTML = `
                    <div class="promocion-card card shadow-sm h-100">
                        <span class="badge bg-success badge-active">Activa</span>
                        ${promo.image_url ? `<img src="${promo.image_url}" class="card-img-top" alt="${promo.title}">` : ''}
                        <div class="card-body">
                            <h5 class="card-title">${promo.title}</h5>
                            <p class="card-text">${promo.description}</p>
                            <p class="text-muted small mb-0">
                                <i class="bi bi-calendar-event me-1"></i>
                                Válida del ${validFrom} al ${validUntil}
                            </p>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });
        } else {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        <i class="bi bi-info-circle me-2"></i>
                        No hay promociones activas en este momento.
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading promotions:', error);
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    No se pudieron cargar las promociones. Por favor intenta más tarde.
                </div>
            </div>
        `;
    }
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // Email validation
    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        } else if (emailInput.value) {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        } else {
            emailInput.classList.remove('is-valid', 'is-invalid');
        }
    });

    // Character count
    messageInput.addEventListener('input', () => {
        charCount.textContent = messageInput.value.length;
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate form
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || null,
            message: document.getElementById('message').value,
            privacy_consent: document.getElementById('privacy-consent').checked,
            marketing_consent: document.getElementById('marketing-consent').checked
        };

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            const messageDiv = document.getElementById('form-message');

            if (data.success) {
                messageDiv.innerHTML = `
                    <div class="alert alert-success">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                    </div>
                `;
                form.reset();
                form.classList.remove('was-validated');
                emailInput.classList.remove('is-valid');
                charCount.textContent = '0';
            } else {
                messageDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="bi bi-exclamation-circle-fill me-2"></i>
                        ${data.error?.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.'}
                    </div>
                `;
            }

            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Clear message after 5 seconds
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            document.getElementById('form-message').innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-circle-fill me-2"></i>
                    Error de conexión. Por favor intenta de nuevo.
                </div>
            `;
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

// Initialize Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect - simple and clean
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Close mobile menu
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    }
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Track Statistics
async function trackStatistic(metricName) {
    try {
        await fetch(`${API_URL}/statistics/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ metric_name: metricName })
        });
    } catch (error) {
        console.error('Error tracking statistic:', error);
    }
}

// Initialize WhatsApp Tracking
function initializeWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], .btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackStatistic('whatsapp_click');
        });
    });
}

console.log('✅ MAXI SERVICIOS ABA - Website loaded successfully');
