// ============================================
// CONFIG.JS - Change these values only!
// ============================================
const CFG = {
    // Personal info
    name: "[Your Name]",
    email: "your.email@example.com",
    phone: "+45 XX XX XX XX",
    
    // Social links
    github: "yourusername",
    linkedin: "yourprofile",
    
    // Auto-calculated
    year: new Date().getFullYear(),
    
    // Derived URLs
    get githubUrl() { return `https://github.com/${this.github}`; },
    get linkedinUrl() { return `https://linkedin.com/in/${this.linkedin}`; },
    get emailUrl() { return `mailto:${this.email}`; }
};
