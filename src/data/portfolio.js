export const profile = {
  name: "Zena Rossane",
  role: "Embedded Systems & Software Developer",
  updatedAt: "2026",
  location: "Indonesia",
  email: "224443048@mhs.polman-bandung.ac.id",
  github: "https://github.com/Anuga8Arsha",
  tagline:
    "A portfolio for embedded systems, software development, simulation, and interface design.",
  description:
    "I build and explore low-level systems, microcontroller projects, web interfaces, and simulation-based software. This portfolio is structured as a technical archive so visitors can quickly understand what I build, how I think, and how to contact me.",
};

export const navItems = [
  { label: "HOME", target: 0 },
  { label: "PROFILE", target: 1 },
  { label: "SKILLS", target: 2 },
  { label: "PROJECTS", target: 3 },
  { label: "CONTACT", target: 4 },
];

export const skills = [
  {
    group: "Embedded System",
    items: ["STM32", "RP2040", "ESP32", "UART", "SPI", "I2C", "GPIO", "Debugging"],
  },
  {
    group: "Software",
    items: ["React", "Vite", "JavaScript", "Tailwind", "Unity", "C#", "Git", "UI Logic"],
  },
  {
    group: "System Thinking",
    items: ["Architecture", "Signal Flow", "Simulation", "Documentation", "Prototyping"],
  },
];

export const projects = [
  {
    id: "PRJ-001",
    title: "Embedded Interface Board",
    category: "Embedded",
    status: "Prototype",
    year: "2026",
    stack: ["STM32", "UART", "GPIO"],
    summary:
      "A hardware interface concept for experimenting with low-level control, signal routing, and debugging workflow.",
    detail:
      "The goal is to create a modular embedded testing layer that can be reused for experiments involving microcontrollers, communication buses, and board-level diagnostics.",
  },
  {
    id: "PRJ-002",
    title: "Simulation Client",
    category: "Software",
    status: "Development",
    year: "2026",
    stack: ["Unity", "C#", "XR"],
    summary:
      "An interactive simulation concept for visualizing technical systems and interface behavior.",
    detail:
      "This project focuses on interaction design, state management, spatial input, and how technical concepts can be represented visually.",
  },
  {
    id: "PRJ-003",
    title: "Horizontal Portfolio System",
    category: "Web",
    status: "Online",
    year: "2026",
    stack: ["React", "Vite", "Tailwind"],
    summary:
      "A dark-mode horizontal portfolio with space minimalism, boot loading, animated transitions, and structured project information.",
    detail:
      "This website is designed around WebQual principles: usability, clear information architecture, and accessible communication with the owner.",
  },
];