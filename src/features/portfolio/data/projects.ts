import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "dfs-web-chain",
    title: "DFS Chain",
    period: { start: "2024" },
    link: "https://difines.org",
    skills: [
      "Next.js",
      "TypeScript",
      "Blockchain",
      "Web3",
      "DeFi",
      "PostgreSQL",
      "Supabase",
      "Tailwind",
      "DApp Architecture",
      "Token Economy",
    ],
    description: `Architected and developed a blockchain ecosystem supporting DeFi applications, token economies, and enterprise-grade Web3 integrations.
- Designed DFS Chain infrastructure to support scalable decentralized applications and token utilities
- Built staking, token issuance, and payment infrastructure for ecosystem participants
- Developed developer tooling and APIs enabling faster Web3 product integration`,
    logo: "/images/projects/dfs-simuchain.webp",
    isExpanded: true,
  },

  {
    id: "dfs-scan",
    title: "DFS Scan",
    period: { start: "2024" },
    link: "https://dfsscan.com",
    skills: [
      "Next.js",
      "TypeScript",
      "Blockchain Explorer",
      "Web3",
      "PostgreSQL",
      "Supabase",
      "Data Visualization",
      "API Integration",
    ],
    description: `Developed a full-featured blockchain explorer providing transparency into DFS Chain transactions and network activity.
- Implemented transaction indexing and block parsing services
- Built wallet tracking and smart contract interaction monitoring
- Created real-time analytics dashboards for blockchain data visualization`,
    logo: "/images/projects/dfsscan.webp",
    isExpanded: false,
  },

  {
    id: "metaface-wallet",
    title: "MetaFace – DFS Wallet",
    period: { start: "2024" },
    link: "http://metaface.dfsscan.com",
    skills: [
      "Next.js",
      "TypeScript",
      "Web3",
      "Wallet Development",
      "Blockchain",
      "PostgreSQL",
      "Supabase",
      "Crypto Payments",
    ],
    description: `Built a secure Web3 wallet enabling token transfers and asset management within the DFS ecosystem.
- Implemented secure transaction signing and wallet management workflows
- Integrated blockchain data services for real-time portfolio tracking
- Developed authentication and transaction history systems for improved user experience`,
    logo: "/images/projects/dfs_wallet.webp",
    isExpanded: false,
  },

  {
    id: "wex-swap",
    title: "WEX Swap",
    period: { start: "2024" },
    link: "https://wexswap.com",
    skills: [
      "Next.js",
      "TypeScript",
      "DEX",
      "Web3",
      "Liquidity Pools",
      "Token Swap",
      "DeFi",
      "Tailwind",
    ],
    description: `Engineered a decentralized exchange enabling token swaps and liquidity participation within the DFS ecosystem.
- Implemented AMM-based swap functionality and liquidity pool mechanics
- Built reward distribution logic for liquidity providers
- Integrated staking and farming features to improve ecosystem engagement`,
    logo: "/images/projects/wex.webp",
    isExpanded: false,
  },

  {
    id: "xmr-casino",
    title: "XMR.gg | Casino Platform",
    period: { start: "2023" },
    link: "https://xmr.gg",
    skills: [
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "High Concurrency",
      "Crypto Payments",
      "Gaming Systems",
      "Fraud Prevention",
      "REST API",
    ],
    description: `Led backend development for a large-scale platform, building microservices, APIs, data models, and infrastructure required to support complex business operations.
- Architected and implemented a scalable microservices backend supporting high-volume transaction processing with strong availability and fault tolerance.
- Built secure crypto payment and wallet integration services alongside traditional transaction processing features
- Designed real-time communication systems including socket-based chat, live activity feeds, and reward distribution features such as chat rain and cashback programs
- Implemented a robust JWT-based authentication and authorization system with advanced security controls and AI-driven fraud/anomaly detection
- Improved platform performance and reliability through distributed caching, query optimization, and database tuning
- Developed internal financial logic including balance management, transaction tracking, and reward calculation services`,
    logo: "/images/projects/casino.webp",
    isExpanded: false,
  },

  {
    id: "ai-dating",
    title: "AI Dating Assistant App",
    period: { start: "2025" },
    link: "#",
    skills: [
      "React Native",
      "TypeScript",
      "OpenAI",
      "LLM",
      "Mobile Development",
      "AI Integration",
      "Expo",
      "iOS",
      "Android",
    ],
    description: `Developed an AI-powered mobile assistant that enhances user communication through contextual response generation.
- Integrated LLM APIs for intelligent message recommendations
- Built context analysis features using conversation history and sentiment signals
- Designed cross-platform mobile architecture using React Native and Expo`,
    logo: "/images/projects/ai-reactnative.webp",
    isExpanded: false,
  },

  {
    id: "verge3d-model",
    title: "Verge3D | Interactive 3D Model Viewer",
    period: { start: "2023" },
    link: "https://interactive-model-verge3d.vercel.app",
    skills: [
      "React",
      "Three.js",
      "WebGL",
      "Verge3D",
      "3D Visualization",
      "JavaScript",
      "Interactive UI",
    ],
    description: `Built an interactive browser-based 3D visualization platform for real-time model rendering and interaction.
- Developed modular scene architecture supporting dynamic model loading
- Optimized rendering performance across browsers and devices
- Implemented interactive controls for object manipulation and scene navigation`,
    logo: "/images/projects/interfactive-model-verge3d.webp",
    isExpanded: false,
  },

  {
    id: "clinical-chart",
    title: "Clinical Chart",
    period: { start: "2022" },
    link: "#",
    skills: [
      "React",
      "Node.js",
      "Healthcare",
      "PostgreSQL",
      "Cloud Systems",
      "REST API",
      "Data Systems",
    ],
    description: `Contributed to a cloud-based clinical records platform used in critical healthcare environments.
- Developed medical dashboards for patient monitoring and reporting
- Built secure healthcare data processing workflows
- Implemented analytics tools supporting clinical decision making`,
    logo: "/images/projects/clinical.webp",
    isExpanded: false,
  },

  {
    id: "edtech-myhomework",
    title: "EdTech | MyHomework App",
    period: { start: "2022" },
    link: "https://info.myhomeworkapp.com",
    skills: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "RLS",
      "Education Platform",
      "AWS",
      "RBAC",
      "Analytics",
    ],
    description: `Developed a full-stack education platform supporting students, teachers, and parents.
- Implemented role-based access control and data isolation policies
- Built assignment management and grading automation tools
- Developed analytics dashboards to track student performance`,
    logo: "/images/projects/edtech-myhomework.webp",
    isExpanded: false,
  },

  {
    id: "decent-reviews",
    title: "Decent Reviews",
    period: { start: "2021" },
    link: "https://linkedin.com/company/decentreviews",
    skills: [
      "Node.js",
      "Solidity",
      "Web3",
      "MongoDB",
      "Express",
      "Smart Contracts",
      "CI/CD",
      "API Design",
    ],
    description: `Developed backend services and smart contract integrations for a decentralized review aggregation platform.
- Built automated review ingestion and scoring systems
- Integrated blockchain verification for review authenticity
- Developed scalable REST APIs and CI/CD deployment workflows`,
    logo: "/images/projects/decent-reviews.webp",
    isExpanded: false,
  },

  {
    id: "ai-video-generator",
    title: "AI Play – Video Generator",
    period: { start: "2024" },
    link: "https://ai-play.netlify.app",
    skills: [
      "React",
      "AI",
      "D-ID API",
      "Video Generation",
      "API Integration",
      "Animation",
    ],
    description: `Built an AI media generation platform enabling video creation from static images and voice input.
- Integrated D-ID AI video generation APIs
- Developed media processing workflows and UI pipelines
- Implemented voice configuration and animation controls`,
    logo: "/images/projects/ai-video-generator.webp",
    isExpanded: false,
  },

  {
    id: "aifx",
    title: "AIFX Platform",
    period: { start: "2024" },
    link: "https://aifx.pepesushi.vip",
    skills: [
      "React",
      "AI",
      "Trading Systems",
      "Web3",
      "Solidity",
      "Crypto Payments",
      "Binance Smart Chain",
    ],
    description: `Developed an AI-assisted trading platform integrating financial data with crypto payment systems.
- Built real-time trading dashboards and signal processing features
- Integrated blockchain payment support for subscriptions
- Developed AI-based trading assistance workflows`,
    logo: "/images/projects/aifx.webp",
    isExpanded: false,
  },

  {
    id: "fuji-chat",
    title: "Web3 Chat Platform – Fuji Chat",
    period: { start: "2023" },
    link: "https://fujichat.vercel.app",
    skills: [
      "React",
      "Web3",
      "Firebase",
      "Wallet Integration",
      "Messaging Systems",
      "Token Transfer",
    ],
    description: `Developed a decentralized messaging platform using wallet identity as authentication.
- Built wallet-based login and messaging infrastructure
- Implemented token transfers within chat workflows
- Developed group messaging and community governance features`,
    logo: "/images/projects/chatfi.webp",
    isExpanded: false,
  },

  {
    id: "pepe-sushi",
    title: "PEPE Sushi",
    period: { start: "2023" },
    link: "https://pepe-sushi.vercel.app",
    skills: [
      "React",
      "Solidity",
      "Web3",
      "DEX",
      "Token Systems",
      "Binance Smart Chain",
    ],
    description: `Contributed to a meme token ecosystem providing DeFi utilities and token interaction features.
- Developed token interaction interfaces and wallet integrations
- Implemented burn mechanics and ecosystem utilities
- Supported DeFi transaction workflows`,
    logo: "/images/projects/pepe-sushi.webp",
    isExpanded: false,
  },

  {
    id: "genogram",
    title: "Genogram",
    period: { start: "2021" },
    link: "https://genogram-gojs.netlify.app",
    skills: [
      "React",
      "GoJS",
      "Data Visualization",
      "JavaScript",
      "UI Engineering",
    ],
    description: `Built an interactive data visualization tool for modeling complex family relationships.
- Developed dynamic diagram rendering using GoJS
- Implemented drag-and-edit relationship management
- Built structured data visualization workflows`,
    logo: "/images/projects/genogram.webp",
    isExpanded: false,
  },

  {
    id: "album-app",
    title: "Album App",
    period: { start: "2020" },
    link: "#",
    skills: [
      "Ionic",
      "Angular",
      "Node.js",
      "PostgreSQL",
      "Mobile Development",
      "Social Platform",
    ],
    description: `Developed a mobile social platform for photo sharing and user interaction.
- Implemented OTP authentication and user onboarding
- Built image upload and social interaction features
- Developed backend services supporting mobile clients`,
    logo: "/images/projects/app.webp",
    isExpanded: false,
  },

  {
    id: "dior-virtual-shop",
    title: "DIOR Virtual Shop | Immersive 3D Commerce Experience",
    period: { start: "2023" },
    link: "https://dior-vrshop.vercel.app",
    skills: [
      "Three.js",
      "WebGL",
      "JavaScript",
      "Panolens",
      "3D Commerce",
      "E-commerce",
      "Interactive UI",
      "Performance Optimization",
      "CMS Integration",
    ],
    description: `Developed an immersive browser-based 3D commerce experience enabling users to explore a virtual showroom with interactive product discovery.
- Engineered modular 3D scene architecture supporting dynamic loading of panoramic environments and product assets
- Built content management workflows allowing administrators to upload and manage 3D models and product metadata
- Optimized rendering performance through asset compression and efficient scene management
- Integrated interactive product navigation and commerce flows bridging immersive UX with real purchasing functionality`,
    logo: "/images/projects/dior.webp",
    isExpanded: false,
  },

  {
    id: "sato-pump",
    title: "Sato Pump | Meme Token DEX Platform",
    period: { start: "2023" },
    link: "https://satopump.vercel.app",
    skills: [
      "React",
      "TypeScript",
      "Solidity",
      "Ethers.js",
      "Web3",
      "DEX",
      "Tokenomics",
      "Hardhat",
      "Binance Smart Chain",
      "WalletConnect",
    ],
    description: `Built a decentralized trading platform focused on meme tokens with advanced token lifecycle mechanics.
- Developed DEX interaction flows including wallet connection and token swaps
- Implemented bonding curve token pricing logic and referral reward mechanisms
- Built smart contract integrations supporting token management and trading features
- Designed scalable frontend architecture for DeFi interaction workflows`,
    logo: "/images/projects/sato-pump.webp",
    isExpanded: false,
  },

  {
    id: "roppongi-ai",
    title: "Roppongi AI | AI Business Website",
    period: { start: "2022" },
    link: "https://roppongi-ai.netlify.app/",
    skills: [
      "WordPress",
      "Elementor",
      "JavaScript",
      "HTML",
      "CSS",
      "AI Integration",
      "SEO",
      "Responsive Design",
    ],
    description: `Developed a business website focused on presenting AI solutions and services.
- Built custom WordPress theme with Elementor based layout system
- Implemented responsive UI optimized for business lead generation
- Integrated AI product presentation workflows and marketing content structure
- Improved performance and SEO structure for better discoverability`,
    logo: "/images/projects/roppongi-ai.webp",
    isExpanded: false,
  },

  {
    id: "speaking-girl-ai",
    title: "Speaking Girl AI | AI Avatar Interaction Platform",
    period: { start: "2024" },
    link: "https://speakingai.difines.io",
    skills: [
      "React",
      "TypeScript",
      "OpenAI",
      "Azure TTS",
      "AI Integration",
      "Conversational AI",
      "Frontend Architecture",
    ],
    description: `Developed an AI avatar interaction platform combining conversational AI with real-time voice synthesis.
- Integrated OpenAI models for conversational response generation
- Implemented Azure Text-to-Speech pipelines for natural voice output
- Built interactive UI for AI conversation workflows
- Designed scalable frontend architecture for AI-driven user interaction`,
    logo: "/images/projects/ai-speaking-girl.webp",
    isExpanded: false,
  },

  {
    id: "dentist-website",
    title: "Dentist Website | Healthcare Business Platform",
    period: { start: "2021" },
    link: "#",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "SCSS",
      "CSS3",
      "Responsive Design",
      "UI Development",
    ],
    description: `Developed a modern healthcare website focused on patient engagement and service presentation.
- Built responsive UI components for service listings and appointment information
- Designed clean user experience focused on accessibility and trust
- Implemented reusable frontend components for healthcare content management`,
    logo: "/images/projects/dentist.webp",
    isExpanded: false,
  },

  {
    id: "fashion-website",
    title: "Fashion Website | E-commerce UI Platform",
    period: { start: "2021" },
    link: "https://aura-fashion-theme.netlify.app/",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "SCSS",
      "CSS3",
      "E-commerce UI",
      "Frontend Architecture",
    ],
    description: `Developed a modern fashion e-commerce frontend focused on product presentation and brand experience.
- Built responsive product catalog and landing page components
- Designed UI optimized for product discovery and conversion
- Implemented reusable design components for scalable storefront development`,
    logo: "/images/projects/fashion.webp",
    isExpanded: false,
  },

  {
    id: "crypto-website",
    title: "Crypto Website | Digital Asset Platform UI",
    period: { start: "2021" },
    link: "https://crypto-aura-theme.netlify.app/",
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "SCSS",
      "CSS3",
      "Crypto UI",
      "Landing Pages",
    ],
    description: `Developed a cryptocurrency platform interface focused on product marketing and ecosystem presentation.
- Built landing pages for token ecosystem promotion
- Designed UI sections for roadmap, tokenomics, and ecosystem features
- Implemented responsive layouts optimized for Web3 product presentation`,
    logo: "/images/projects/crypto.webp",
    isExpanded: false,
  },
]

export function getAllProjects() {
  return PROJECTS
}
