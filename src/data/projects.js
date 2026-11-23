export const projects = [
  {
    id: 'smart-city-ai',
    code: 'PROJECT 001',
    title: 'Smart City AI',
    badge: 'AI / COMPUTER VISION',
    headline: 'AI-Powered Civic Complaint Classification & Triage System',
    description: 'An intelligent civic infrastructure platform that classifies citizen grievance reports automatically using deep learning vision models, routing issues to municipal departments.',
    problem: 'Municipal corporations receive thousands of unclassified civic complaints daily (e.g., potholes, broken street lights, overflowing sewage, contaminated water). Manual triage leads to severe response delays, human routing errors, and lack of accountability.',
    solution: 'Engineered an end-to-end civic grievance pipeline where citizens capture or upload photos of civic issues. A lightweight PyTorch microservice classifies images across six civic categories with high confidence and dispatches them to appropriate city wards.',
    architecture: 'Microservice Architecture: React SPA frontend communicates with an Express/Node.js API gateway. Image processing requests are delegated to a dedicated Python/Flask inference engine running a fine-tuned MobileNetV3 model with MongoDB handling grievance records and status updates.',
    modelDetails: {
      name: 'MobileNetV3-Small-Civic',
      version: 'v1.0.0',
      backbone: 'MobileNetV3-Small (Quantized)',
      inputSize: '224x224 RGB',
      inferenceLatency: '~45ms CPU / ~12ms GPU'
    },
    categories: [
      { name: 'Drainage', icon: 'Waves', color: '#65C7FF' },
      { name: 'Roads / Potholes', icon: 'Car', color: '#B7FF6B' },
      { name: 'Street Light', icon: 'Lightbulb', color: '#FFD166' },
      { name: 'Waste Management', icon: 'Trash2', color: '#06D6A0' },
      { name: 'Water Supply', icon: 'Droplets', color: '#4CC9F0' },
      { name: 'Other', icon: 'HelpCircle', color: '#B5838D' }
    ],
    technologies: ['React', 'Node.js', 'Flask', 'Python', 'PyTorch', 'MobileNetV3', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    features: [
      'Citizen grievance submission with GPS geolocation tagging',
      'Live camera capture and gallery photo upload',
      'Real-time AI visual inference on civic defect images',
      'Role-based administrative triage portal for municipal engineers',
      'Automated status tracking with SLA breach alarms',
      'Decoupled Python inference microservice via RESTful contracts'
    ],
    challenges: [
      'Optimizing deep learning model size for low-latency inference on modest server hardware without costly cloud GPU instances.',
      'Handling poor lighting conditions, angles, and noisy citizen photos through data augmentation during fine-tuning.',
      'Designing graceful fallbacks for ambiguous predictions with automated human verification queue.'
    ],
    metrics: [
      { label: 'Classification Accuracy', value: '92.4%' },
      { label: 'Inference Latency', value: '<50ms' },
      { label: 'Civic Categories', value: '6 Classes' }
    ],
    github: 'https://github.com/atisht080604/smart-city',
    demo: 'https://smart-city-ashy.vercel.app/'
  },
  {
    id: 'wavesync',
    code: 'PROJECT 002',
    title: 'WaveSync',
    badge: 'REAL-TIME SYSTEMS',
    headline: 'Sub-Millisecond Real-Time Media Synchronization Engine',
    description: 'A synchronized collaborative media watching and streaming application that maintains state parity across multi-client browser sessions using WebSockets.',
    problem: 'Synchronous group media consumption over variable latency internet connections suffers from drift, buffering desynchronization, and jarring state reconciliations.',
    solution: 'Built a WebSocket-driven synchronization engine with time-drift calculation, centralized room authority, and ping-based latency compensation algorithms to keep participants frame-accurate.',
    architecture: 'Full-duplex bidirectional architecture using Socket.IO atop Node.js event loops, broadcasting timecode ticks and client state changes to room channels with React state listeners.',
    technologies: ['React', 'Node.js', 'Express', 'Socket.IO', 'Tailwind CSS', 'Vite', 'WebSockets'],
    features: [
      'Zero-lag room creation with invite code generation',
      'Synchronized play, pause, seek, and buffer events',
      'Adaptive clock-drift compensation to counteract network jitter',
      'Integrated live low-latency chat with typing indicators',
      'Multi-source media player integration (video/audio)'
    ],
    challenges: [
      'Mitigating cumulative clock drift when clients have disparate RTT (Round Trip Time) latencies.',
      'Handling packet loss and transient disconnections through optimistic updates and state rehydration.'
    ],
    metrics: [
      { label: 'Drift Threshold', value: '<120ms' },
      { label: 'Latency Overhead', value: '~15ms' },
      { label: 'Channel Protocol', value: 'WebSockets' }
    ],
    github: 'https://github.com/atisht080604/WaveSync',
    demo: 'https://wave-sync-steel.vercel.app/'
  },
  {
    id: 'sticker-store',
    code: 'PROJECT 003',
    title: 'Stickomania (Sticker Store)',
    badge: 'FULL-STACK E-COMMERCE',
    headline: 'Modern Cyber-Themed Developer Merch & Sticker Marketplace',
    description: 'A full-stack, responsive e-commerce web application with product cataloging, cart state persistence, image asset optimization, and order management.',
    problem: 'Developer communities lack high-quality, specialized sticker stores that offer lightning-fast browsing, instant filtering, and responsive dark-mode interfaces tailored to programmer aesthetics.',
    solution: 'Developed a high-performance web app leveraging Vite + React for instantaneous client routing, Express.js backend for transaction security, MongoDB Atlas for storage, and Cloudinary for edge image delivery.',
    architecture: 'RESTful three-tier architecture: React client consuming structured JSON API endpoints; Node/Express backend applying rate limiting, schema validation (Joi/Zod), and secure MongoDB Atlas indexing; Cloudinary CDN for responsive WebP asset transformation.',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'JWT'],
    features: [
      'Dynamic product catalog with instant client-side tag filtering and fuzzy search',
      'Persistent cart state using localized storage with server-side validation',
      'Cloudinary dynamic image optimization, caching, and auto-WebP conversion',
      'Secure mock payment gateway flow with order invoice generation',
      'Admin dashboard for real-time inventory management and stock updates'
    ],
    challenges: [
      'Maintaining cart synchronization and preventing race conditions during concurrent item checkout.',
      'Achieving high Google Lighthouse performance scores while displaying high-res sticker graphics.'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Asset Delivery', value: 'CDN Cached' },
      { label: 'Database', value: 'MongoDB Atlas' }
    ],
    github: 'https://github.com/strixze/StickMania',
    demo: 'https://stick-mania-3s48.vercel.app/'
  },
  {
    id: 'ai-student-assistant',
    code: 'PROJECT 004',
    title: 'AI-Powered Student Assistant Chatbot',
    badge: 'AI & ACADEMIC NLP',
    headline: 'Intelligent Academic Advisor & Student Operations Portal',
    description: 'An AI-powered academic assistant platform that provides students with instant answers regarding attendance, academic fee dues, timetable schedules, and coursework queries.',
    problem: 'University students frequently face bureaucratic bottlenecks querying administrative databases for routine information like fee schedules, lecture halls, and subject syllabus updates.',
    solution: 'Created an intelligent hybrid assistant combining SQL database records with large language model generation (Google Gemini API and local Ollama) to answer institutional queries naturally and accurately.',
    architecture: 'Python Flask backend with SQLAlchemy ORM over MySQL for structured academic records (students, attendance, fees, schedules), orchestrated with prompt templates and LLM API bridges.',
    technologies: ['Python', 'Flask', 'MySQL', 'SQLAlchemy', 'Google Gemini API', 'Ollama', 'HTML5/Tailwind', 'REST APIs'],
    features: [
      'Context-aware conversational chatbot answering academic queries',
      'Automated student attendance percentage tracking and shortfall warnings',
      'Fee transaction ledger, dues breakdown, and receipt history',
      'Dynamic daily and weekly timetable schedule generation',
      'Administrator dashboard for broadcasting circulars and managing student records',
      'Hybrid fallback to Ollama for offline/private local inference'
    ],
    challenges: [
      'Preventing LLM hallucinations when answering student fee and grade queries by strictly grounding answers in verified SQL query results.',
      'Structuring flexible prompt pipelines that switch between online Gemini API and local Ollama offline endpoints.'
    ],
    metrics: [
      { label: 'LLM Orchestration', value: 'Gemini + Ollama' },
      { label: 'Query Accuracy', value: 'Grounding via SQL' },
      { label: 'Backend ORM', value: 'SQLAlchemy' }
    ],
    github: 'https://github.com/atisht080604/Ai-powered-student-assistant-chatbot',
    demo: null
  }
];