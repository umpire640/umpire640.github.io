// Set current year - wrap in DOMContentLoaded for modules
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    // Rest of your code here...
    
    // Mobile menu
    function toggleMobileMenu() {
        const nav = document.querySelector('nav ul');
        if (nav) nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    }
    window.toggleMobileMenu = toggleMobileMenu;
    
    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
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
