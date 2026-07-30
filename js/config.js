// ============================================
// CONFIG.JS - Edit only this file!
// ============================================
const CFG = {
    // Personal info
    name: "Your Name",
    email: "your.email@example.com",
    phone: "+45 XX XX XX XX",

    // Social
    github: "umpire640",
    linkedin: "yourprofile",

    // Auto
    year: new Date().getFullYear(),

    // ===== PROJECTS =====
    projects: [
        {
            title: "Gear Assembly System",
            description: "Precision gear assembly designed for high-torque applications. Features modular components and optimized tooth profiles.",
            tags: ["CAD Design", "Mechanical", "Prototyping"],
            image: "assets/images/project-1.jpg"
        },
        {
            title: "Industrial Robotic Arm",
            description: "6-axis robotic arm with servo-controlled joints. Designed for pick-and-place operations with 0.1mm precision.",
            tags: ["Robotics", "Automation", "Servo Control"],
            image: "assets/images/project-2.jpg"
        }
        // Add more projects here - they'll auto-layout
    ],

    // ===== 3D MODELS =====
    models: [
        {
            title: "Sample Model",
            description: "Free sample from Google. Replace with your own .glb file.",
            file: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            poster: "https://modelviewer.dev/shared-assets/models/Astronaut.webp",
            isSample: true
        },
        {
            title: "Your Model",
            description: "Add your own 3D model.",
            file: "assets/models/telescope.glb",
            isSample: false
        }
        // Add more models here
    ],

    // URLs
    get githubUrl() { return `https://github.com/${this.github}`; },
    get linkedinUrl() { return `https://linkedin.com/in/${this.linkedin}`; },
    get emailUrl() { return `mailto:${this.email}`; }
};

// Expose globally
window.CFG = CFG;
