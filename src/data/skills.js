export const skillCategories = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    code: 'SYSTEM_01',
    description: 'Modern front-to-back application engineering with reactive interfaces, scalable APIs, and structured data persistence.',
    badge: 'CORE ENGINEERING',
    groups: [
      {
        subTitle: 'Frontend Technologies',
        skills: [
          { name: 'React', level: 'Framework', icon: 'Code2', highlight: true },
          { name: 'Vite', level: 'Build Tool', icon: 'Zap' },
          { name: 'Tailwind CSS', level: 'Styling', icon: 'Palette', highlight: true },
          { name: 'JavaScript (ES6+)', level: 'Language', icon: 'FileCode' },
          { name: 'HTML5', level: 'Markup', icon: 'Layout' },
          { name: 'CSS3', level: 'Stylesheets', icon: 'Layers' },
        ]
      },
      {
        subTitle: 'Backend Architecture',
        skills: [
          { name: 'Node.js', level: 'Runtime', icon: 'Server', highlight: true },
          { name: 'Express.js', level: 'API Framework', icon: 'Cpu' },
          { name: 'Python', level: 'Language', icon: 'Terminal', highlight: true },
          { name: 'Flask', level: 'Microframework', icon: 'Activity' },
          { name: 'REST APIs', level: 'Architecture', icon: 'Network' },
          { name: 'WebSockets', level: 'Real-Time State', icon: 'Radio' },
        ]
      },
      {
        subTitle: 'Databases & Storage',
        skills: [
          { name: 'MongoDB', level: 'NoSQL Document Store', icon: 'Database', highlight: true },
          { name: 'MongoDB Atlas', level: 'Cloud Database', icon: 'Cloud' },
          { name: 'MySQL', level: 'Relational Database', icon: 'Database' },
        ]
      }
    ]
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    code: 'SYSTEM_02',
    description: 'Exploring computer vision inference, deep learning architectures, multimodal LLMs, and local edge AI execution.',
    badge: 'INTELLIGENCE MODULE',
    groups: [
      {
        subTitle: 'Deep Learning & Vision',
        skills: [
          { name: 'PyTorch', level: 'Deep Learning', icon: 'Flame', highlight: true },
          { name: 'MobileNetV3', level: 'Edge Vision CNN', icon: 'Cpu', highlight: true },
          { name: 'Image Classification', level: 'Computer Vision', icon: 'Eye' },
          { name: 'MediaPipe', level: 'Hand & Pose Tracking', icon: 'ScanFace', highlight: true },
        ]
      },
      {
        subTitle: 'LLMs & Modern AI Services',
        skills: [
          { name: 'Google Gemini API', level: 'Generative Multimodal', icon: 'Sparkles', highlight: true },
          { name: 'Ollama', level: 'Local LLM Inference', icon: 'Box' },
          { name: 'Python AI Stack', level: 'NumPy / OpenCV', icon: 'Binary' },
        ]
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Utilities',
    code: 'SYSTEM_03',
    description: 'Development, debugging, version control, and terminal operating environments utilized daily.',
    badge: 'OPERATIONAL TOOLKIT',
    groups: [
      {
        subTitle: 'Software Development & Versioning',
        skills: [
          { name: 'Git', level: 'Distributed VCS', icon: 'GitBranch', highlight: true },
          { name: 'GitHub', level: 'Collaboration & Repos', icon: 'Github' },
          { name: 'Postman', level: 'REST API Testing', icon: 'Send', highlight: true },
          { name: 'VS Code', level: 'Code Editor', icon: 'Code' },
        ]
      },
      {
        subTitle: 'Operating Environments & Shells',
        skills: [
          { name: 'Linux Terminal', level: 'Bash Shell Environment', icon: 'Terminal', highlight: true },
          { name: 'Windows CMD', level: 'Command Shell & Batch', icon: 'Monitor' },
          { name: 'PuTTY', level: 'Remote Console', icon: 'Terminal' },
        ]
      }
    ]
  }
];