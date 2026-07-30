// ============================================
// RENDER FUNCTIONS
// ============================================

// Render portfolio projects
function renderPortfolio() {
    const container = document.querySelector('.portfolio-grid');
    if (!container) return;

    container.innerHTML = CFG.projects.map((p, i) => `
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
    `).join('');
}

// Render 3D models
function renderModels() {
    const container = document.querySelector('.model-showcase');
    if (!container) return;

    container.innerHTML = CFG.models.map((m, i) => `
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
    `).join('');
}

// Populate static config values
function populateConfig() {
    const cfg = window.CFG;

    // Text content
    document.querySelectorAll('.cfg-name').forEach(el => el.textContent = cfg.name);
    document.querySelectorAll('.cfg-email').forEach(el => el.textContent = cfg.email);
    document.querySelectorAll('.cfg-phone').forEach(el => el.textContent = cfg.phone);

    // URL spans
    document.querySelectorAll('.cfg-email-url').forEach(el => el.textContent = cfg.email);
    document.querySelectorAll('.cfg-github-url').forEach(el => el.textContent = cfg.githubUrl);
    document.querySelectorAll('.cfg-linkedin-url').forEach(el => el.textContent = cfg.linkedinUrl);
    document.querySelectorAll('.cfg-year').forEach(el => el.textContent = cfg.year);
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Populate static values
    populateConfig();

    // Render dynamic content
    renderPortfolio();
    renderModels();

    // Mobile menu
    window.toggleMobileMenu = () => {
        const nav = document.querySelector('nav ul');
        if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    };

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal.delay-1, .reveal.delay-2, .reveal.delay-3');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 100) {
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
            const nav = document.querySelector('nav ul');
            if (nav && nav.style.display === 'flex') nav.style.display = 'none';
        });
    });

    // Active navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 100) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
});
