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

    // 1-3 projects: normal grid
    if (count <= 3) {
        container.innerHTML = items.map(renderProject).join('');
    } 
    // 4+ projects: carousel
    else {
        renderCarousel(container, items, renderProject);
    }
}


function renderProject(p, i) {
    return `
        <div class="portfolio-item reveal${i > 0 ? ' delay-' + (i % 3 + 1) : ''}">
            <img src="${p.image}" 
                 alt="${p.title}" 
                 class="portfolio-image"
                 onerror="this.src='https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'; this.onerror=null;">

            <div class="portfolio-content">
                <h3 class="portfolio-title">${p.title}</h3>

                <p class="portfolio-description">
                    ${p.description}
                </p>

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

    // 1-3 models: normal grid
    if (count <= 3) {
        container.innerHTML = items.map(renderModel).join('');
    } 
    // 4+ models: carousel
    else {
        renderCarousel(container, items, renderModel);
    }
}


function renderModel(m, i) {
    return `
        <div class="model-card reveal${i > 0 ? ' delay-' + (i % 3 + 1) : ''}">

            <h3>${m.title}</h3>

            <p class="model-description">
                ${m.description}
            </p>

            <div class="model-viewer-container">
                <model-viewer
                    src="${m.file}"
                    alt="${m.title}"
                    ar
                    ar-modes="scene-viewer quick-look"
                    camera-controls
                    enable-pan
                    ${m.poster ? `poster="${m.poster}"` : ''}>
                    
                    ${!m.isSample 
                        ? '<div class="model-fallback"><p>Add .glb file</p></div>' 
                        : ''}
                </model-viewer>
            </div>

            <div class="model-info">
                <strong>Format:</strong> GLB
                ${m.isSample ? ' | <strong>Sample</strong>' : ''}
            </div>

        </div>
    `;
}



// ============================================
// CAROUSEL
// Used ONLY when more than 3 items exist
// ============================================

function renderCarousel(container, items, renderFn) {

    const visibleSlides = 3;

    container.innerHTML = `
        <div class="carousel">

            <div class="carousel-track-wrapper">

                <div class="carousel-track">
                    ${items.map(renderFn).join('')}
                </div>

            </div>


            <button class="carousel-btn prev">
                ←
            </button>

            <button class="carousel-btn next">
                →
            </button>

        </div>
    `;


    const track = container.querySelector('.carousel-track');

    const slides = container.querySelectorAll(
        '.portfolio-item, .model-card'
    );

    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');


    let currentIndex = 0;


    function updateCarousel() {

        const slide = slides[0];

        if (!slide) return;


        const slideWidth = slide.getBoundingClientRect().width;


        const gap = parseFloat(
            getComputedStyle(track).gap
        ) || 0;


        const move = currentIndex * (slideWidth + gap);


        track.style.transform =
            `translateX(-${move}px)`;


        prevBtn.disabled = currentIndex === 0;

        nextBtn.disabled =
            currentIndex >= slides.length - visibleSlides;
    }



    prevBtn.addEventListener('click', () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();
        }

    });



    nextBtn.addEventListener('click', () => {

        if (currentIndex < slides.length - visibleSlides) {

            currentIndex++;

            updateCarousel();
        }

    });



    window.addEventListener('resize', updateCarousel);


    updateCarousel();
}




// ============================================
// CONFIG POPULATION
// ============================================

function populateConfig() {

    const cfg = window.CFG;


    const replacements = [

        {
            selector: '.cfg-name',
            value: cfg.name
        },

        {
            selector: '.cfg-email',
            value: cfg.email
        },

        {
            selector: '.cfg-phone',
            value: cfg.phone
        },

        {
            selector: '.cfg-year',
            value: cfg.year
        }

    ];



    replacements.forEach(({selector, value}) => {

        document.querySelectorAll(selector)
            .forEach(el => {

                el.textContent = value;

            });

    });



    const linkReplacements = [

        {
            selector:'[data-email]',
            attr:'href',
            value:cfg.emailUrl
        },

        {
            selector:'[data-github]',
            attr:'href',
            value:cfg.githubUrl
        },

        {
            selector:'[data-linkedin]',
            attr:'href',
            value:cfg.linkedinUrl
        }

    ];



    linkReplacements.forEach(({selector, attr, value}) => {

        document.querySelectorAll(selector)
            .forEach(el => {

                el.setAttribute(attr, value);

            });

    });

}



// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {


    populateConfig();



    document.querySelector(
        'meta[name="description"]'
    ).content =
        `Mechanical Engineering Portfolio - ${CFG.name}`;



    document.title =
        `${CFG.name} | Mechanical Engineer | 3D Portfolio`;



    renderPortfolio();

    renderModels();




    window.toggleMobileMenu = () => {

        const nav = document.querySelector('nav ul');

        if(nav){

            nav.style.display =
                nav.style.display === 'flex'
                ? 'none'
                : 'flex';

        }

    };




    const revealElements =
        document.querySelectorAll(
            '.reveal, .reveal.delay-1, .reveal.delay-2, .reveal.delay-3'
        );



    const revealOnScroll = () => {

        revealElements.forEach(element => {

            if(
                element.getBoundingClientRect().top <
                window.innerHeight - 100
            ){

                element.classList.add('revealed');

            }

        });

    };



    window.addEventListener(
        'load',
        revealOnScroll
    );


    window.addEventListener(
        'scroll',
        revealOnScroll
    );


    revealOnScroll();




    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {


        anchor.addEventListener(
            'click',
            function(e){


                if(this.getAttribute('href') === '#')
                    return;



                e.preventDefault();



                const target =
                    document.querySelector(
                        this.getAttribute('href')
                    );



                if(target){

                    const offset =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        80;


                    window.scrollTo({

                        top: offset,

                        behavior:'smooth'

                    });

                }



                const nav =
                    document.querySelector('nav ul');


                if(nav && nav.style.display === 'flex'){

                    nav.style.display = 'none';

                }


            }
        );


    });




    const sections =
        document.querySelectorAll(
            'section[id]'
        );


    const navLinks =
        document.querySelectorAll(
            'nav a[href^="#"]'
        );



    window.addEventListener(
        'scroll',
        () => {


            let current = '';



            sections.forEach(section => {


                if(
                    window.pageYOffset >=
                    section.offsetTop - 100
                ){

                    current =
                        section.getAttribute('id');

                }


            });



            navLinks.forEach(link => {


                link.classList.toggle(

                    'active',

                    link.getAttribute('href') ===
                    `#${current}`

                );


            });


        }
    );

});
