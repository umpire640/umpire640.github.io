
const CFG = {
    // Personal info
    name: "My Name",
    email: "my.email@example.com",
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
            description: "Precision gear assembly designed for high-torque applications.",
            tags: ["CAD Design", "Mechanical"],
            image: "assets/images/project-1.jpg"
        },
        {
            title: "Industrial Robotic Arm",
            description: "6-axis robotic arm with servo-controlled joints.",
            tags: ["Robotics", "Automation"],
            image: "assets/images/project-2.jpg"
        }
    ],

    // ===== 3D MODELS =====
    models: [
        {
            title: "Sample Model",
            description: "Free sample from Google.",
            file: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
            poster: "https://modelviewer.dev/shared-assets/models/Astronaut.webp",
            isSample: true
        },
        {
            title: "Your Model",
            description: "Add your own .glb file.",
            file: "assets/models/telescope.glb",
            isSample: false
        }
    ],

    // URLs
    get githubUrl() { return `https://github.com/${this.github}`; },
    get linkedinUrl() { return `https://linkedin.com/in/${this.linkedin}`; },
    get emailUrl() { return `mailto:${this.email}`; }
};

window.CFG = CFG;
