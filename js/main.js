// ============================================
// RENDER FUNCTIONS
// ============================================

// Render portfolio projects
function renderPortfolio() {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;

    const items = CFG.projects;
    const count = items.length;

    container.className = `portfolio-grid count-${count}`;

    if (count <= 3) {
        container.innerHTML = items.map(renderProject).join('');
    } else {
        renderCarousel(container, items, renderProject);
    }
}

function renderProject(p, i) {
    return `
        <div class="portfolio-item reveal${i > 0 ? ' delay-' + (i % 3 + 1) : ''}">
            <img src="${p.image}" alt="${p.title}" class="portfolio-image"
                 onerror="this.src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'; this.onerror=null;">
            <div class="portfolio-content">
                <h3 class="portfolio-title">${p.title}</h3>
                <p class="portfolio-description">${p.description}</p>
                <div class="portfolio-tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

// Render 3D models
function renderModels() {
    const container = document.querySelector('.model-showcase');
    if (!container) return;

    const items = CFG.models;
    const count = items.length;

    container.className = `model-showcase count-${count}`;

    if (count <= 3) {
        container.innerHTML = items.map(renderModel).join('');
    } else {
        renderCarousel(container, items, renderModel);
    }
}

function renderModel(m, i) {
    return `
        <div class="model-card reveal${i > 0 ? ' delay-' + (i % 3 + 1) : ''}">
            <h3>${m.title}</h3>
            <p class="model-description">${m.description}</p>
            <div class="model-viewer-container">
                <model-viewer
                    src="${m.file}"
                    alt="${m.title}"
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    enable-pan
                    ${m.poster ? `poster="${m.poster}"` : ''}>
                    ${!m.isSample ? '<div class="model-fallback"><p>Add .glb file</p></div>' : ''}
                </model-viewer>
            </div>
            <div class="model-info">
                <strong>Format:</strong> GLB${m.isSample ? ' | <strong>Sample</strong>' : ''}
            </div>
        </div>
    `;
}

// ============================================
// CAROUSEL
// ============================================

function renderCarousel(container, items, renderFn) {

    const visibleSlides = 3;

    container.innerHTML = `
        <div class="carousel">
            <div class="carousel-track">
                ${items.map(renderFn).join('')}
            </div>

            <button class="carousel-btn prev">←</button>
            <button class="carousel-btn next">→</button>
        </div>
    `;

    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    let currentIndex = 0;
    const maxIndex = items.length - visibleSlides;

    function updateCarousel() {
        const translate = currentIndex * (100 / visibleSlides);
        track.style.transform = `translateX(-${translate}%)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();
}

// ============================================
// POPULATE CONFIG
// ============================================

function populateConfig() {
    const cfg = window.CFG;

    // Direct text replacements
    const replacements = [
        { selector: '.cfg-name', value: cfg.name },
        { selector: '.cfg-email', value: cfg.email },
        { selector: '.cfg-phone', value: cfg.phone },
        { selector: '.cfg-year', value: cfg.year }
    ];

    replacements.forEach(({ selector, value }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.textContent = value;
        });
    });

    // Link replacements
    const linkReplacements = [
        { selector: '[data-email]', attr: 'href', value: cfg.emailUrl },
        { selector: '[data-github]', attr: 'href', value: cfg.githubUrl },
        { selector: '[data-linkedin]', attr: 'href', value: cfg.linkedinUrl }
    ];

    linkReplacements.forEach(({ selector, attr, value }) => {
        document.querySelectorAll(selector).forEach(el => {
            el.setAttribute(attr, value);
        });
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // Populate static values
    populateConfig();

    // Update meta description and title
    document.querySelector('meta[name="description"]').content =
        `Mechanical Engineering Portfolio - ${CFG.name}`;

    document.title =
        `${CFG.name} | Mechanical Engineer | 3D Portfolio`;

    // Render dynamic content
    renderPortfolio();
    renderModels();

    // Mobile menu
    window.toggleMobileMenu = () => {
        const nav = document.querySelector('nav ul');
        if (nav) {
            nav.style.display =
                nav.style.display === 'flex' ? 'none' : 'flex';
        }
    };

    // Scroll reveal
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal.delay-1, .reveal.delay-2, .reveal.delay-3'
    );

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            if (
                element.getBoundingClientRect().top <
                window.innerHeight - 100
            ) {
                element.classList.add('revealed');
            }
        });
    };

    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);

    revealOnScroll();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {

            if (this.getAttribute('href') === '#') return;

            e.preventDefault();

            const target =
                document.querySelector(this.getAttribute('href'));

            if (target) {

                const offset =
                    target.getBoundingClientRect().top +
                    window.pageYOffset - 80;

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }

            const nav = document.querySelector('nav ul');

            if (nav && nav.style.display === 'flex') {
                nav.style.display = 'none';
            }
        });
    });

    // Active navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {

        let current = '';

        sections.forEach(section => {

            if (window.pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {

            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    });
});
