export interface Project {
  id: string;
  title: string;
  category: 'Industrial IoT' | 'Embedded & Edge' | 'Full-Stack Software';
  period: string;
  featured: boolean;
  tech: string[];
  description: string;
  highlights: string[];
  points: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: 'HackerRank' | 'Infosys Springboard';
  category: 'Problem Solving' | 'Database' | 'Programming' | 'Agile & DevOps';
  year: string;
  badge: string;
  color: string;
  credentialUrl?: string;
  description: string;
}

export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: string;
  tag: string;
}

export interface ResumeData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  resumePdf: string;
  photo: string;
  summary: string;
  metrics: { value: string; label: string; sublabel: string }[];
  education: { degree: string; institution: string; location: string; period: string; grade: string; icon: string; coursework?: string[] }[];
  skills: { category: string; icon: string; description: string; items: string[] }[];
  experience: { company: string; role: string; location: string; period: string; type: string; color: string; description: string; points: string[]; skillsUsed: string[] }[];
  projects: Project[];
  certifications: Certificate[];
  achievements: Achievement[];
}

export const resume: ResumeData = {
  name: "Shiva Kumar Hazari",
  title: "Field IoT Engineer",
  subtitle: "Industrial IoT & Edge Systems Engineer",
  location: "Medak, Hyderabad, Telangana – 502113",
  phone: "+91 6300655864",
  email: "shivakumarhazari0@gmail.com",
  github: "https://github.com/Shiva-code-code",
  linkedin: "https://www.linkedin.com/in/shivakumarhazari/",
  whatsapp: "https://wa.me/916300655864",
  resumePdf: "/resume.pdf",
  photo: "/shiva.jpeg",

  summary:
    "Industrial IoT & Edge Systems Engineer with hands-on experience architecting and deploying end-to-end telemetry pipelines across Amazon GRE F logistics sites. Experienced in bridging physical instrumentation (RS-485 Modbus, LoRaWAN IN865, Pulse Meters) with enterprise cloud platforms (AWS IoT Core, X.509 mTLS). Proven track record of engineering full-stack Python automation tools that slashed gateway commissioning time by 95% (15 min → 4 min) while maintaining 99%+ data reliability. Google open-source contributor with a strong foundation in embedded C/C++, Linux edge gateways, and real-time SCADA HMI systems.",

  metrics: [
    { value: "95%", label: "Provisioning Speedup", sublabel: "15 min down to 45s per gateway" },
    { value: "99%+", label: "Telemetry Reliability", sublabel: "Industrial grade QoS 1 & mTLS" },
    { value: "<50ms", label: "Edge Latency", sublabel: "Sub-50ms SCADA streaming" },
    { value: "33+", label: "GitHub Repositories", sublabel: "IoT & Full-stack projects" },
  ],

  education: [
    {
      degree: "Bachelor of Technology – IoT",
      institution: "Malla Reddy College of Engineering and Technology",
      location: "Hyderabad, Telangana, India",
      period: "Oct 2022 – Apr 2025",
      grade: "CGPA: 7.2 / 10",
      icon: "🎓",
      coursework: ["Microcontrollers & Embedded C", "Industrial IoT Protocols", "Cloud Computing & AWS", "Wireless Sensor Networks", "Data Structures"],
    },
    {
      degree: "Diploma – Electronics & Communication Engineering",
      institution: "ST. Mary's Engineering College",
      location: "Hyderabad, Telangana, India",
      period: "Jun 2018 – May 2021",
      grade: "CGPA: 6.98 / 10",
      icon: "📐",
      coursework: ["Digital Electronics", "Microprocessor 8085/8086", "Electronic Devices & Circuits", "Network Theory", "Analog Communication"],
    },
    {
      degree: "Secondary School Certificate (10th)",
      institution: "Z.P.H.S Haveli Ghanapur",
      location: "Medak, Telangana, India",
      period: "Jun 2017 – May 2018",
      grade: "GPA: 8.2 / 10",
      icon: "📚",
      coursework: ["Science & Mathematics", "Foundations of Physical Sciences"],
    },
  ],

  skills: [
    {
      category: "Embedded & Edge Hardware",
      icon: "🔌",
      description: "Hardware microcontrollers, industrial gateways & physical instrumentation",
      items: [
        "ESP32 (Tensilica Xtensa)",
        "Raspberry Pi 3 / 4 / 5",
        "MultiTech LoRaWAN Gateways (MTCAP3)",
        "RS-485 Modbus Transceivers",
        "Milesight Pulse Counters",
        "Utility Meters (Water / Power)",
        "Sensors (DHT22, PZEM-004T, Current Transformers)",
        "Circuit Analysis & Hardware Debugging",
      ],
    },
    {
      category: "IoT & Industrial Protocols",
      icon: "📡",
      description: "Field buses, wireless telemetry, and enterprise transport",
      items: [
        "MQTT & MQTT over WebSockets",
        "LoRaWAN (IN865 / Basic Station / CUPS)",
        "RS-485 Modbus RTU / ASCII",
        "CoAP (Constrained Application Protocol)",
        "TCP / IP Sockets & Network Probing",
        "HTTP / RESTful APIs",
        "4G LTE Cellular Backhaul",
        "Wi-Fi (802.11 b/g/n) State Machines",
      ],
    },
    {
      category: "Cloud & Edge Security",
      icon: "☁️",
      description: "Enterprise IoT broker integration and cryptographic trust chains",
      items: [
        "AWS IoT Core (ATS Endpoints)",
        "Device Shadows & Rules Engine",
        "Mutual TLS (mTLS / X.509 PKI Certs)",
        "Mosquitto MQTT Broker (Dual-broker setup)",
        "AWS IAM & IoT Policy Management",
        "Zero-Touch Automated Provisioning",
      ],
    },
    {
      category: "Programming & Scripting",
      icon: "💻",
      description: "High performance systems, automation, and real-time frontend",
      items: [
        "C & Embedded C++ (ArduinoJson, PubSubClient)",
        "Python 3 (Asyncio, Paho-MQTT, FastAPI, Selenium)",
        "ES6+ JavaScript & TypeScript",
        "HTML5 Canvas 2D & WebSockets",
        "Java (Core, OOP, Collections)",
        "SQL (PostgreSQL, MySQL, SQLite)",
        "Bash & Linux Shell Scripting",
      ],
    },
    {
      category: "Dev, Automation & QA",
      icon: "⚙️",
      description: "CI/CD pipelines, automated testing, and developer toolchains",
      items: [
        "Git & GitHub Workflows",
        "GitHub Actions (CI / CD)",
        "Maven Build Tool",
        "JUnit 5 & JUnit 4 (Google OSS Contributor)",
        "Selenium WebDriver Automation",
        "Postman API Testing",
        "Raspberry Pi OS & Debian Linux",
        "PlatformIO & VS Code",
      ],
    },
    {
      category: "Architecture & Methodologies",
      icon: "🏗️",
      description: "Edge-to-cloud paradigms, industrial workflows, and site engineering",
      items: [
        "3-Tier Edge-to-Cloud Architecture",
        "Industrial SCADA & Web HMI Systems",
        "Agile / Scrum Sprint Methodologies",
        "Hardware Reverse Engineering",
        "RF & LoRaWAN Signal Interference Analysis",
        "Failover & Reconnection State Machines",
      ],
    },
  ],

  experience: [
    {
      company: "Milvian Group",
      role: "Field IoT Engineer",
      location: "Hyderabad / Pan-India",
      period: "Jan 2026 – Present",
      type: "Full-time",
      color: "#2563eb",
      description: "Spearheading on-site industrial IoT infrastructure, gateway automation, and real-time utility telemetry across large-scale logistics operations.",
      points: [
        "Engineered Python automation scripts to streamline MultiTech Gateway provisioning and configuration, reducing manual setup time from 15 minutes down to 3–4 minutes per unit across large-scale deployments.",
        "Researched and analyzed legacy utility meters on-site, reverse-engineering technical specifications to extract pulse outputs and successfully integrate non-smart hardware into modern IoT tracking systems.",
        "Integrated electrical meters via RS-485 (Modbus RTU) and deployed Milesight Pulse Counters for high-precision utility monitoring across Amazon GRE F logistics sites.",
        "Architected and deployed robust telemetry data pipelines using LoRaWAN (IN865) and 4G LTE backhaul to ensure seamless data flow from edge sensors to cloud platforms.",
        "Conducted site-specific RF signal analysis and LoRaWAN antenna tuning to mitigate severe structural interference in steel-frame warehouse environments.",
      ],
      skillsUsed: ["MultiTech Gateways", "Python Automation", "LoRaWAN IN865", "RS-485 Modbus", "Milesight", "LTE Backhaul"],
    },
    {
      company: "Google",
      role: "Open Source Contributor – JUnit 5 Migration",
      location: "Remote",
      period: "Apr 2025 – Present",
      type: "Open Source",
      color: "#4285F4",
      description: "Selected contributor for Google's enterprise healthcare data pipeline repository (fhir-data-pipes) on GitHub under Issue #1103.",
      points: [
        "Selected to contribute to Google’s high-impact fhir-data-pipes open-source project on GitHub under Issue #1103.",
        "Migrated legacy unit test modules from JUnit 4 to JUnit 5, ensuring modern Java testing standards, parameterized tests, and backward compatibility.",
        "Actively collaborating with Google engineers through modular pull requests, code reviews, and strict style guidelines.",
        "Participating in bi-weekly developer syncs to align with Google’s core architecture team and milestone timelines.",
        "Utilized Maven build scripts and GitHub Actions CI pipelines to validate zero regressions across hundreds of automated test cases.",
      ],
      skillsUsed: ["Java", "JUnit 5", "Maven", "GitHub Actions CI", "Google fhir-data-pipes"],
    },
  ],

  projects: [
    {
      id: "nexus-core",
      title: "Nexus Core: Industrial IoT Edge-to-Cloud Platform",
      category: "Industrial IoT",
      period: "Jun 2026 – Aug 2026",
      featured: true,
      githubUrl: "https://github.com/Shiva-code-code",
      tech: ["AWS IoT Core", "Raspberry Pi", "ESP32 (C++)", "Python", "MQTT", "X.509 mTLS", "JavaScript", "HTML5 Canvas"],
      description: "End-to-end 3-tier industrial IoT ecosystem streaming sub-50ms machine telemetrics with local edge gateway buffering, mutual TLS cryptographic trust, and a custom retina SCADA web dashboard.",
      highlights: ["Sub-50ms live stream", "Dual-broker edge architecture", "mTLS X.509 security", "Zero-dep Canvas charting"],
      points: [
        "Architected an End-to-End 3-Tier Industrial IoT Ecosystem: ESP32 edge nodes → Raspberry Pi gateway → AWS IoT Core → Real-time Web SCADA dashboard.",
        "Engineered C++ embedded firmware on ESP32 sampling 8+ parameters (Active Power, Voltage, Current, Flow Rate, Line Pressure, Cumulative kWh) with static 512-byte payload buffers and eFuse MAC-derived client IDs.",
        "Developed a high-performance Python Edge Gateway on Linux/Raspberry Pi using AWS IoT SDK v2 & Paho-MQTT in a dual-broker architecture with QoS 1 reliability and local disk caching during network outages.",
        "Constructed 'Nexus Core' real-time Web HMI with direct MQTT-over-WebSockets, zero-dependency HTML5 Canvas rendering for retina displays, and an alert lifecycle manager (OPTIMAL → CRITICAL → RESOLVED).",
      ],
    },
    {
      id: "lorawan-provisioning",
      title: "Automated LoRaWAN Gateway Provisioning & Telemetry Platform",
      category: "Industrial IoT",
      period: "Jul 2026 – Aug 2026",
      featured: true,
      githubUrl: "https://github.com/Shiva-code-code",
      tech: ["Python", "FastAPI", "LoRaWAN IN865", "Selenium", "REST APIs", "Server-Sent Events", "Network Sockets"],
      description: "Full-stack IoT commissioning platform automating MultiTech LoRaWAN gateway configuration from 15 minutes down to 45 seconds (95% efficiency gain) with automated cloud certificate injection.",
      highlights: ["95% commissioning speedup", "11-stage hardware orchestrator", "Automated TLS injection", "ARP & port 443 auto-discovery"],
      points: [
        "Architected a full-stack IoT commissioning platform cutting manual gateway setup time from 15 minutes to ~45 seconds per unit across MultiTech MTCAP3-LEU7 units.",
        "Engineered an asynchronous 11-stage hardware orchestration engine configuring LoRaWAN IN865 channel plans, 4G LTE cellular APNs, SNTP clock sync, and scheduled reboot routines.",
        "Implemented automated cloud-to-edge TLS certificate injection using Selenium WebDriver to automate AWS Atria device registration and inject .trust, .crt, and .key pairs into CUPS Basic Station.",
        "Built real-time telemetry streaming over Server-Sent Events (SSE) with thread-safe queue dispatchers to render live terminal execution logs directly on a web interface.",
        "Designed zero-config network discovery via socket probing (TCP 443) and ARP table parsing to dynamically discover device MAC addresses and IP leases.",
      ],
    },
    {
      id: "student-community",
      title: "Student Community & Collaborative Hub",
      category: "Full-Stack Software",
      period: "2024",
      featured: false,
      githubUrl: "https://github.com/Shiva-code-code/shiva-portfolio",
      tech: ["React.js", "Node.js", "Express", "MongoDB", "REST APIs", "Tailwind CSS"],
      description: "Collaborative campus platform connecting engineering students for peer code reviews, resource sharing, hackathon team formation, and real-time technical forum discussions.",
      highlights: ["Peer code review forum", "Resource sharing repository", "Hackathon team finder"],
      points: [
        "Developed full-stack web application for college peers to discover projects, form hackathon squads, and share verified technical notes.",
        "Designed authenticated REST APIs with JWT authentication, role-based access for mentors, and granular search filters.",
        "Integrated dynamic tags for IoT, Web Development, and Competitive Programming to facilitate cross-department collaboration.",
      ],
    },
    {
      id: "crypto-pulse",
      title: "CryptoPulse: Real-Time Currency Analytics",
      category: "Full-Stack Software",
      period: "2024",
      featured: false,
      githubUrl: "https://github.com/Shiva-code-code/shiva-portfolio",
      tech: ["React.js", "REST APIs", "Chart.js", "WebSockets", "CSS Modules"],
      description: "Interactive real-time cryptocurrency telemetry tracker featuring dynamic sparklines, candlestick charts, portfolio profit/loss calculators, and custom price change alerts.",
      highlights: ["Live streaming ticker", "Interactive multi-range charts", "Zero lag price calculations"],
      points: [
        "Constructed responsive market analytics dashboard ingesting live public market feeds via REST & WebSocket streams.",
        "Built custom time-series line and bar charts supporting 24h, 7d, and 1y timeframe filters with smooth hover tooltips.",
        "Engineered lightweight client-side state caching with zero redundant network requests.",
      ],
    },
    {
      id: "campus-lms",
      title: "Campus LMS: Learning & Assessment Engine",
      category: "Full-Stack Software",
      period: "2023 – 2024",
      featured: false,
      githubUrl: "https://github.com/Shiva-code-code/shiva-portfolio",
      tech: ["Python", "SQL", "HTML5 / CSS3", "Bootstrap", "Git"],
      description: "Course delivery and assessment management platform enabling automated quiz grading, assignment submissions, attendance tracking, and student performance metrics.",
      highlights: ["Automated grading logic", "Relational database schema", "Role-based dashboards"],
      points: [
        "Designed relational database schema in SQL normalizing student records, course enrollments, test results, and attendance.",
        "Built role-based dashboard views for Students, Faculty, and Admin with distinct submission and evaluation privileges.",
        "Automated instant score calculation and exportable progress summaries in CSV format.",
      ],
    },
    {
      id: "railway-sys",
      title: "ExpressRail: Railway Reservation System",
      category: "Embedded & Edge",
      period: "2023",
      featured: false,
      githubUrl: "https://github.com/Shiva-code-code/shiva-portfolio",
      tech: ["Java (OOP)", "SQL Database", "JDBC", "Data Structures"],
      description: "Robust desktop booking system implementing concurrency-safe ticket reservations, waitlist queuing with FIFO data structures, and SQL transaction rollbacks.",
      highlights: ["ACID transaction management", "Waitlist priority queue", "Seat allocation algorithms"],
      points: [
        "Implemented seat inventory management system using Java OOP and JDBC database connectivity.",
        "Created concurrency-safe booking routines preventing double-booking race conditions during simultaneous inquiries.",
        "Utilized priority queue data structures to handle cancellations and dynamic passenger ticket upgrades.",
      ],
    },
  ],

  certifications: [
    {
      id: "cert-hr-ps-inter",
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      category: "Problem Solving",
      year: "2023",
      badge: "⭐ Intermediate",
      color: "#16a34a",
      credentialUrl: "https://www.hackerrank.com/certificates/iframe/8b4078ae64fb",
      description: "Assessed on advanced algorithmic logic, data structures, graph traversals, and dynamic programming.",
    },
    {
      id: "cert-hr-ps-basic",
      name: "Problem Solving (Basic)",
      issuer: "HackerRank",
      category: "Problem Solving",
      year: "2023",
      badge: "⭐ Basic",
      color: "#16a34a",
      credentialUrl: "https://www.hackerrank.com/certificates/iframe/6ad0c577d38d",
      description: "Validated algorithmic reasoning, array manipulation, string handling, and conditional workflows.",
    },
    {
      id: "cert-hr-py",
      name: "Python (Basic)",
      issuer: "HackerRank",
      category: "Programming",
      year: "2023",
      badge: "🐍 Python",
      color: "#ca8a04",
      credentialUrl: "https://www.hackerrank.com/certificates/iframe/5725d14acc32",
      description: "Covers Python 3 syntax, list comprehensions, OOP principles, closures, and file I/O operations.",
    },
    {
      id: "cert-hr-sql",
      name: "SQL (Basic)",
      issuer: "HackerRank",
      category: "Database",
      year: "2024",
      badge: "🗄️ SQL",
      color: "#0891b2",
      credentialUrl: "https://www.hackerrank.com/certificates/iframe/sql_basic",
      description: "Database queries, joins, aggregates, filtering, subqueries, and table normalization.",
    },
    {
      id: "cert-info-db",
      name: "Database Management System",
      issuer: "Infosys Springboard",
      category: "Database",
      year: "2024",
      badge: "📜 Infosys",
      color: "#2563eb",
      description: "Comprehensive relational database architecture, relational algebra, SQL DDL/DML, and indexing.",
    },
    {
      id: "cert-info-java",
      name: "Programming Using Java",
      issuer: "Infosys Springboard",
      category: "Programming",
      year: "2024",
      badge: "☕ Java",
      color: "#ea580c",
      description: "Core Java, Object-Oriented Design, Exception Handling, Collections Framework, and Multithreading.",
    },
    {
      id: "cert-info-dsa",
      name: "Data Structures & Algorithms using Java",
      issuer: "Infosys Springboard",
      category: "Problem Solving",
      year: "2024",
      badge: "🌳 DSA",
      color: "#7c3aed",
      description: "Trees, linked lists, hash tables, sorting algorithms, search complexity analysis (Big-O).",
    },
    {
      id: "cert-info-scrum",
      name: "Agile Scrum in Practice",
      issuer: "Infosys Springboard",
      category: "Agile & DevOps",
      year: "2024",
      badge: "🏃 Scrum",
      color: "#059669",
      description: "Agile delivery lifecycle, sprint ceremonies, user stories, backlog grooming, and velocity metrics.",
    },
    {
      id: "cert-info-git",
      name: "Git & GitHub Version Control",
      issuer: "Infosys Springboard",
      category: "Agile & DevOps",
      year: "2024",
      badge: "🐙 Git",
      color: "#374151",
      description: "Distributed version control, branching strategies, rebase workflows, and collaboration hygiene.",
    },
  ],

  achievements: [
    {
      title: "National-Level Hackathon Participant",
      organization: "IIT Bhilai",
      year: "2024",
      description: "Competed in high-stakes national hackathon developing IoT-enabled smart monitoring prototypes under intense time constraints.",
      icon: "🏛️",
      tag: "National Competition",
    },
    {
      title: "Top 20 Ranking on GeeksforGeeks",
      organization: "College Level (MRCET)",
      year: "2024",
      description: "Secured top-20 institutional ranking through consistent daily problem solving, algorithms, and data structure contest performance.",
      icon: "🥇",
      tag: "Competitive Coding",
    },
    {
      title: "HackerRank Gold Badge – Top 3.4%",
      organization: "HackerRank Global",
      year: "2024",
      description: "Earned prestigious Gold Badge in Java solving complex problem-solving challenges, placing in the top 3.4% of 2.2 million global developers.",
      icon: "🏅",
      tag: "Global Rank",
    },
    {
      title: "Ideation Day & Innowiz Innovator",
      organization: "MRCET Technical Fests",
      year: "2023 – 2024",
      description: "Showcased embedded sensor telemetry and rapid hardware prototyping prototypes across Innowiz, TeckFiesta, and college Ideation Day exhibits.",
      icon: "💡",
      tag: "Hardware Innovation",
    },
  ],
};
