import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "dfs-web-chain",
    title: "DFS Chain",
    period: { start: "2024" },
    link: "https://difines.org",
    skills: [
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Blockchain",
      "Web3",
      "DeFi",
      "Tailwind",
      "DApp Architecture",
      "Token Economy",
    ],
    businessDescription:
      "Blockchain infrastructure platform supporting DeFi applications and token ecosystems.",
    role: "Lead Full Stack Engineer",
    highlights: [
      "Built blockchain explorer and wallet-adjacent infrastructure",
      "Designed token launch, staking, and ecosystem service architecture",
      "Created integration APIs for partner teams and developers",
    ],
    impact:
      "Enabled scalable ecosystem infrastructure and faster developer integrations.",
    logo: "/images/projects/dfs-simuchain.webp",
    isExpanded: true,
  },

  {
    id: "dfs-scan",
    title: "DFS Scan",
    period: { start: "2024" },
    link: "https://dfsscan.com",
    skills: [
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Blockchain Explorer",
      "Web3",
      "Data Visualization",
      "API Integration",
    ],
    businessDescription:
      "Blockchain explorer for real-time transaction visibility and on-chain analytics.",
    role: "Full Stack Engineer",
    highlights: [
      "Implemented transaction indexing and block parsing pipelines",
      "Built wallet tracking and contract interaction monitoring",
      "Delivered analytics views for network health and activity",
    ],
    impact:
      "Improved ecosystem transparency and developer debugging capabilities.",
    logo: "/images/projects/dfsscan.webp",
    isExpanded: false,
  },

  {
    id: "metaface-wallet",
    title: "MetaFace – DFS Wallet",
    period: { start: "2024" },
    link: "http://metaface.dfsscan.com",
    skills: [
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Web3",
      "Wallet Development",
      "Blockchain",
      "Crypto Payments",
    ],
    businessDescription:
      "Web3 wallet product for secure transfers and portfolio management.",
    role: "Full Stack Engineer",
    highlights: [
      "Implemented secure signing and wallet management workflows",
      "Integrated chain data for real-time portfolio visibility",
      "Built authentication and transaction history services",
    ],
    impact:
      "Delivered reliable wallet operations and improved user confidence.",
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
    businessDescription:
      "Decentralized exchange for token swaps and liquidity participation.",
    role: "Frontend + Protocol Integration Engineer",
    highlights: [
      "Implemented AMM swap and liquidity pool mechanics",
      "Built reward distribution logic for liquidity providers",
      "Integrated staking and farming experiences",
    ],
    impact: "Increased ecosystem engagement through usable DeFi trading flows.",
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
    businessDescription:
      "High-traffic gaming and payments platform with complex financial operations.",
    role: "Senior Backend Engineer",
    highlights: [
      "Architected microservices for high-volume transaction processing",
      "Built wallet, crypto payment, and financial tracking services",
      "Improved reliability with Redis caching and database tuning",
    ],
    impact:
      "Supported production throughput at scale while improving platform stability.",
    logo: "/images/projects/casino.webp",
    isExpanded: false,
  },

  {
    id: "rakuearn",
    title: "Rakuearn Rewards Platform",
    period: { start: "2024" },
    link: "https://rakuearn.com/en",
    skills: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind",
      "AI Integration",
      "Reward Systems",
      "Points Economy",
    ],
    businessDescription:
      "AI-powered rewards platform where users earn points by completing surveys, tasks, and engagement activities, then redeem rewards through digital payouts and gift cards.",

    role: "Full Stack Engineer",

    highlights: [
      "Built survey and task participation system for user reward generation",
      "Implemented points wallet and reward exchange functionality",
      "Developed payout integrations for digital rewards and bank transfers",
      "Integrated AI recommendation engine to surface relevant earning opportunities",
      "Created user dashboard for tracking points, tasks, and reward history",
    ],

    impact:
      "Improved user engagement and retention by introducing a transparent points economy and streamlined reward redemption system.",

    logo: "/images/projects/rakuearn.webp",
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
    businessDescription:
      "AI assistant app for contextual communication and response generation.",
    role: "AI Product Engineer",
    highlights: [
      "Integrated LLM APIs for high-quality response suggestions",
      "Built context-aware prompt and conversation handling",
      "Delivered cross-platform architecture with React Native + Expo",
    ],
    impact:
      "Reduced response friction and increased user engagement in messaging flows.",
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
    businessDescription:
      "Interactive browser-based 3D model viewer for product visualization.",
    role: "Frontend Engineer",
    highlights: [
      "Built modular scene architecture for dynamic model loading",
      "Optimized rendering performance across browsers and devices",
      "Implemented interaction controls for object manipulation",
    ],
    impact:
      "Improved 3D content accessibility and reduced friction for visual demos.",
    logo: "/images/projects/interfactive-model-verge3d.webp",
    isExpanded: false,
  },

  {
    id: "clinical-chart",
    title: "Clinical Chart",
    period: { start: "2022" },
    link: "#",
    skills: [
      "PostgreSQL",
      "React",
      "Node.js",
      "Healthcare",
      "Cloud Systems",
      "REST API",
      "Data Systems",
    ],
    businessDescription:
      "Cloud clinical records platform supporting care teams with critical patient data.",
    role: "Full Stack Engineer",
    highlights: [
      "Developed patient monitoring dashboards and reporting tools",
      "Built secure healthcare data processing workflows",
      "Implemented analytics for clinical decision support",
    ],
    impact: "Enabled more reliable data visibility for care operations.",
    logo: "/images/projects/clinical.webp",
    isExpanded: false,
  },

  {
    id: "edtech-myhomework",
    title: "EdTech | MyHomework App",
    period: { start: "2022" },
    link: "https://info.myhomeworkapp.com",
    skills: [
      "PostgreSQL",
      "Next.js",
      "Node.js",
      "RLS",
      "Education Platform",
      "AWS",
      "RBAC",
      "Analytics",
    ],
    businessDescription:
      "Education platform for assignment workflows across students, teachers, and parents.",
    role: "Full Stack Engineer",
    highlights: [
      "Implemented RBAC and row-level data isolation",
      "Built assignment management and grading automation",
      "Developed analytics dashboards for student performance",
    ],
    impact:
      "Improved administrative efficiency and progress visibility for schools.",
    logo: "/images/projects/edtech-myhomework.webp",
    isExpanded: false,
  },

  {
    id: "poipi",
    title: "POIPI Engagement & Airdrop Platform",
    period: { start: "2022" },
    link: "https://poipi.com/",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Firebase",
      "Firestore",
      "DFS Chain",
      "Points System",
      "Airdrop Platform",
      "Gamification",
    ],
    businessDescription:
      "Gamified engagement platform where users earn points through platform activities, social engagement, and referrals, with rewards redeemable for DFS Chain tokens and ecosystem airdrops.",

    role: "Full Stack Engineer",

    highlights: [
      "Built daily reward and engagement tracking system",
      "Implemented referral and social activity reward mechanics",
      "Developed points wallet and DFS token airdrop participation system",
      "Created survey and Q&A reward modules for community engagement",
      "Designed dashboard for tracking points, activities, and rewards",
    ],

    impact:
      "Increased ecosystem growth and user participation through gamified incentives and structured token reward campaigns.",

    logo: "/images/projects/poipi.webp",
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
    businessDescription:
      "Decentralized review platform combining API aggregation with on-chain verification.",
    role: "Backend + Smart Contract Integration Engineer",
    highlights: [
      "Built review ingestion and scoring pipelines",
      "Integrated blockchain proofs for authenticity checks",
      "Delivered scalable REST APIs and CI/CD workflows",
    ],
    impact:
      "Increased trust and scalability of the review verification pipeline.",
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
    businessDescription:
      "AI media platform for generating videos from images and voice inputs.",
    role: "AI Frontend Engineer",
    highlights: [
      "Integrated D-ID video generation APIs",
      "Built media processing and rendering workflows",
      "Implemented voice, animation, and output controls",
    ],
    impact:
      "Reduced content production effort for creators and marketing teams.",
    logo: "/images/projects/ai-video-generator.webp",
    isExpanded: false,
  },

  // {
  //   id: "aifx",
  //   title: "AIFX Platform",
  //   period: { start: "2024" },
  //   link: "https://aifx.pepesushi.vip",
  //   skills: [
  //     "React",
  //     "AI",
  //     "Trading Systems",
  //     "Web3",
  //     "Solidity",
  //     "Crypto Payments",
  //     "Binance Smart Chain",
  //   ],
  //   businessDescription:
  //     "AI-assisted trading platform with crypto-enabled subscription flows.",
  //   role: "Full Stack Engineer",
  //   highlights: [
  //     "Built real-time signal and trading dashboard interfaces",
  //     "Integrated crypto payment support for subscriptions",
  //     "Implemented AI-assisted decision support workflows",
  //   ],
  //   impact:
  //     "Improved product differentiation through faster AI-assisted analysis.",
  //   logo: "/images/projects/aifx.webp",
  //   isExpanded: false,
  // },

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
    businessDescription:
      "Wallet-native messaging platform for Web3 communities.",
    role: "Frontend + Realtime Engineer",
    highlights: [
      "Built wallet-based login and chat infrastructure",
      "Implemented token transfer flows inside messaging",
      "Added group communication and community features",
    ],
    impact:
      "Enabled community engagement with native Web3 identity and payments.",
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
    businessDescription:
      "Meme token ecosystem with DeFi utilities and token operations.",
    role: "Web3 Frontend Engineer",
    highlights: [
      "Developed wallet integration and token interaction UIs",
      "Implemented burn mechanics and utility flows",
      "Supported DeFi transaction workflows and UX",
    ],
    impact: "Improved token utility adoption through clearer user flows.",
    logo: "/images/projects/pepe-sushi.webp",
    isExpanded: false,
  },

  {
    id: "quick-ido",
    title: "Quick IDO Exchange Platform",
    period: { start: "2023" },
    link: "https://www.quickido.com/",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Web3.js",
      "Ethers.js",
      "WalletConnect",
      "MetaMask",
      "BSC",
      "DFS Chain",
      "Crypto UI",
    ],
    businessDescription:
      "Hybrid crypto exchange platform similar to SimpleSwap supporting Web3 and Web2 asset conversions across BNB Smart Chain and DFS Chain, enabling cross-environment token swaps and digital asset trading.",

    role: "Web3 Full Stack Engineer",

    highlights: [
      "Developed swap interface supporting Web3 to Web3 token exchanges",
      "Built hybrid swap flows between Web2 DFS assets and Web3 tokens",
      "Implemented wallet connection and transaction interaction UI",
      "Designed token selection, rate display, and swap confirmation interfaces",
      "Created responsive trading dashboard and exchange workflows",
    ],

    impact:
      "Simplified cross-platform asset exchange by providing a unified swap interface for both blockchain and platform-based assets.",

    logo: "/images/projects/quickido.webp",
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
    businessDescription:
      "Interactive family relationship modeling and visualization tool.",
    role: "Frontend Engineer",
    highlights: [
      "Developed dynamic diagram rendering with GoJS",
      "Implemented drag-and-edit relationship management",
      "Built structured data visualization workflows",
    ],
    impact: "Simplified complex relationship mapping for end users.",
    logo: "/images/projects/genogram.webp",
    isExpanded: false,
  },

  {
    id: "album-app",
    title: "Album App",
    period: { start: "2020" },
    link: "#",
    skills: [
      "PostgreSQL",
      "Ionic",
      "Angular",
      "Node.js",
      "Mobile Development",
      "Social Platform",
    ],
    businessDescription:
      "Mobile social app for photo sharing and user interactions.",
    role: "Full Stack Mobile Engineer",
    highlights: [
      "Implemented OTP authentication and onboarding",
      "Built upload, feed, and social interaction features",
      "Developed backend APIs with PostgreSQL persistence",
    ],
    impact: "Delivered a stable social experience for mobile-first users.",
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
    businessDescription:
      "Immersive 3D commerce experience for virtual product discovery.",
    role: "Frontend 3D Engineer",
    highlights: [
      "Engineered modular 3D scene architecture for dynamic assets",
      "Built content workflows for managing models and metadata",
      "Integrated product navigation with commerce-ready interactions",
    ],
    impact:
      "Improved product engagement through immersive shopping experiences.",
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
    businessDescription:
      "Meme token DEX with bonding-curve mechanics and referral incentives.",
    role: "Web3 Product Engineer",
    highlights: [
      "Built wallet connection and token swap interaction flows",
      "Implemented bonding-curve pricing and referral logic",
      "Integrated smart contracts for token lifecycle management",
    ],
    impact: "Enabled faster token launches and higher community participation.",
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
    businessDescription:
      "AI business website focused on lead generation and service positioning.",
    role: "Frontend Engineer",
    highlights: [
      "Built custom WordPress and Elementor page architecture",
      "Implemented responsive conversion-focused page sections",
      "Improved SEO and performance for discoverability",
    ],
    impact: "Strengthened online positioning and inbound lead quality.",
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
    businessDescription:
      "Conversational AI avatar platform with live voice synthesis.",
    role: "AI Frontend Engineer",
    highlights: [
      "Integrated OpenAI conversational response pipelines",
      "Implemented Azure Text-to-Speech output flow",
      "Built scalable UI architecture for interactive sessions",
    ],
    impact:
      "Delivered engaging AI avatar interactions with production-ready UX.",
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
    businessDescription:
      "Healthcare business website focused on service trust and patient conversion.",
    role: "Frontend Engineer",
    highlights: [
      "Built responsive UI for services and appointment information",
      "Designed accessible user flows for healthcare visitors",
      "Implemented reusable components for ongoing content updates",
    ],
    impact: "Improved patient information clarity and appointment intent.",
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
    businessDescription:
      "Fashion e-commerce frontend focused on merchandising and conversion.",
    role: "Frontend Engineer",
    highlights: [
      "Built responsive catalog and landing page components",
      "Designed UI patterns optimized for product discovery",
      "Implemented reusable storefront component architecture",
    ],
    impact: "Increased usability and consistency for catalog browsing flows.",
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
    businessDescription:
      "Crypto product website for token ecosystem communication and growth.",
    role: "Frontend Engineer",
    highlights: [
      "Built landing pages for ecosystem and token promotion",
      "Designed roadmap and tokenomics presentation sections",
      "Implemented responsive layouts for Web3 audiences",
    ],
    impact: "Improved ecosystem storytelling and product communication.",
    logo: "/images/projects/crypto.webp",
    isExpanded: false,
  },

  {
    id: "lucky-wheel-loto",
    title: "Lucky Spin Blockchain Game",
    period: { start: "2021" },
    link: "https://lucky-wheel-lotto.vercel.app/",
    skills: [
      "React",
      "JavaScript",
      "BSC",
      "Web3.js",
      "HTML5",
      "SCSS",
      "CSS3",
      "Crypto UI",
      "Wallet Integration",
    ],
    businessDescription:
      "Blockchain-based lucky spin game built on BNB Smart Chain allowing users to connect wallets, spin to win token rewards, and participate in gamified DeFi engagement mechanics.",
    role: "Frontend / Web3 Engineer",
    highlights: [
      "Developed Web3 UI for wallet connection and spin interaction",
      "Built gamified token reward interface connected to smart contract logic",
      "Implemented responsive crypto gaming dashboard and landing pages",
      "Designed token utility and reward visualization sections",
    ],
    impact:
      "Increased user engagement through gamified token rewards and interactive blockchain gameplay.",
    logo: "/images/projects/lucky-wheel.webp",
    isExpanded: false,
  },

  {
    id: "plinko-lotto",
    title: "Plinko Blockchain Lottery Game",
    period: { start: "2022" },
    link: "https://plinko-lotto.vercel.app/",
    skills: [
      "React",
      "JavaScript",
      "BSC",
      "Web3.js",
      "HTML5",
      "SCSS",
      "CSS3",
      "Crypto UI",
      "Wallet Integration",
      "Game Mechanics UI",
    ],
    businessDescription:
      "Blockchain-based Plinko lottery game on BNB Smart Chain where users connect wallets, drop balls into randomized peg boards, and earn token rewards based on multiplier zones.",

    role: "Frontend / Web3 Engineer",

    highlights: [
      "Developed interactive Plinko board UI connected to blockchain reward logic",
      "Implemented wallet connection and transaction interaction flows",
      "Built real-time reward visualization and multiplier mechanics",
      "Designed responsive crypto gaming interface for DeFi users",
    ],

    impact:
      "Boosted platform engagement through gamified blockchain rewards and transparent lottery mechanics.",

    logo: "/images/projects/plinko-lotto.webp",
    isExpanded: false,
  },

  {
    id: "micro-bitcoin-spin",
    title: "Micro Bitcoin Spin",
    period: { start: "2022" },
    link: "https://micro-spin.vercel.app/",
    skills: [
      "React",
      "TypeScript",
      "SCSS",
      "Ethers.js",
      "WalletConnect",
      "MetaMask",
      "Web3 UI",
      "Crypto UX",
      "Binance Smart Chain",
    ],
    businessDescription:
      "Crypto gaming interface enabling users to participate in micro-reward spin activities with wallet connectivity and real-time token reward visualization.",

    role: "Frontend Web3 Engineer",

    highlights: [
      "Developed responsive crypto gaming UI using React and TypeScript",
      "Implemented wallet connection flows using MetaMask and WalletConnect",
      "Built spin interaction interface and reward visualization components",
      "Integrated frontend transaction flows with blockchain APIs",
      "Designed user dashboard for tracking rewards and participation history",
    ],

    impact:
      "Improved user experience and engagement through intuitive Web3 interaction design and responsive crypto gaming interfaces.",

    logo: "/images/projects/wbtc-spin.webp",
    isExpanded: false,
  },

  {
    id: "micro-bitcoin",
    title: "Micro Bitcoin Platform",
    period: { start: "2022" },
    link: "https://microbitcoin.vercel.app/",
    skills: [
      "React",
      "TypeScript",
      "SCSS",
      "Ethers.js",
      "WalletConnect",
      "MetaMask",
      "Web3 UI",
      "Crypto UX",
      "Binance Smart Chain",
    ],
    businessDescription:
      "Crypto product website and Web3 interface for a micro-Bitcoin token ecosystem, enabling users to understand token utility, connect wallets, and interact with blockchain-based reward mechanics.",

    role: "Frontend Web3 Developer",

    highlights: [
      "Developed responsive landing pages for Micro Bitcoin token ecosystem",
      "Built wallet connection UI using MetaMask and WalletConnect",
      "Implemented token information and utility presentation sections",
      "Designed crypto-focused UI components for token engagement",
      "Created user-friendly interfaces for Web3 onboarding experience",
    ],

    impact:
      "Enhanced product adoption by improving token presentation, usability, and Web3 onboarding experience through modern frontend design.",

    logo: "/images/projects/wbtc-lp.webp",
    isExpanded: false,
  },
]

export function getAllProjects() {
  return PROJECTS
}
