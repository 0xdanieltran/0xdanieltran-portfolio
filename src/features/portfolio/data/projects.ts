import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "lovarank",
    title: "LovaRank",
    period: { start: "2026" },
    link: "https://lovarank.lol",
    skills: [
      "TanStack Start",
      "TanStack Router",
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Supabase Edge Functions",
      "Paystack",
      "Payments",
      "Server Functions",
      "Zod",
      "SEO",
      "Lovable",
    ],
    businessDescription:
      "Sponsored discovery directory for Lovable-built websites where builders pay to claim and climb ranks, browse by category and today’s listings, and get discovered through paid placement instead of votes or waitlists.",
    role: "Full Stack Product Engineer",
    highlights: [
      "Built an end-to-end sponsored ranking product on TanStack Start, React 19, and Tailwind with public directory surfaces for all-time ranks, category boards, today’s joiners, featured placements, and website detail pages",
      "Designed a balance-based ranking model in PostgreSQL where higher paid balances rise higher, with tie-break timing, category partitions, and a $2 listing floor aligned to Paystack USD minimums",
      "Implemented a public claim-and-pay flow: URL and category intake, Open Graph metadata enrichment, bid preview, Paystack checkout, payment verification, then secure listing credit",
      "Modeled the data layer with websites, ranking accounts, ranking payments, featured bookings, categories, and RLS policies for anonymous public reads with privileged writes through security-definer RPCs",
      "Optimized directory and profile performance with count-based rank queries, shared directory chrome, searchable category comboboxes, lazy logo loading, and reduced overfetching on category and detail routes",
      "Shipped discovery UX for mobile and desktop: claim UI, podium list cards, category filters with search, sidebar today’s rank, and SEO metadata for home, category, today, and detail pages",
    ],
    impact:
      "Gave Lovable builders a paid discovery channel to get listed, rise by investment, and be found by category — with real checkout, secure server-side payments, and a production-ready ranking board ready for community marketing.",
    logo: "/images/projects/lovarank.webp",
    isExpanded: true,
  },

  {
    id: "ai-voice-agent",
    title: "AI Voice Sales Agent",
    period: { start: "2026" },
    link: "https://opeban-service.vercel.app",
    skills: [
      "Next.js",
      "TypeScript",
      "AI",
      "LLM",
      "Voice AI",
      "Twilio",
      "ElevenLabs",
      "Speech-to-Text",
      "Text-to-Speech",
      "RAG",
      "CRM Integration",
      "Real-Time Communication",
      "Vercel",
    ],
    businessDescription:
      "AI-powered voice sales platform that conducts natural inbound and outbound calls, follows approved sales scripts, answers customer questions, handles objections, qualifies leads, and coordinates follow-ups or live transfers to human representatives.",
    role: "Full Stack AI Engineer",
    highlights: [
      "Architected an end-to-end voice pipeline connecting Twilio telephony, speech-to-text, LLM reasoning, and ElevenLabs text-to-speech for natural customer conversations",
      "Designed AI sales conversation logic that follows approved scripts, handles common objections and rebuttals, answers product questions, and determines the next best action",
      "Implemented RAG-based retrieval across product information, FAQs, policies, sales materials, and authorized live business data such as pricing and availability",
      "Built inbound and outbound calling workflows with lead qualification, call outcome capture, appointment scheduling, and automated SMS and email follow-ups",
      "Integrated CRM and lead management workflows to store conversation summaries, customer interest, objections, and actionable next steps",
      "Implemented warm call transfers for customer requests, high-value leads, and conversations requiring human sales expertise",
      "Designed the voice agent architecture for configurable AI models based on response quality, latency, reliability, privacy, call volume, and operating cost",
    ],
    impact:
      "Enabled businesses to automate scalable sales conversations while preserving accurate company messaging, structured lead capture, timely follow-ups, and seamless human escalation for qualified or complex opportunities.",
    logo: "/images/projects/ai-voice-agent.webp",
    isExpanded: true,
  },

  {
    id: "sonica-studio",
    title: "Sonica Studio",
    period: { start: "2026" },
    link: "https://sonicastudio.vercel.app",
    skills: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "AI",
      "LLM",
      "Music AI",
      "Audio Processing",
      "Stripe",
      "Crypto payment",
      "Vercel",
      "Tailwind",
      "shadcn/ui",
    ],
    businessDescription:
      "AI-powered music creation platform that helps creators generate original music, lyrics, melodies, and complete productions through intelligent AI workflows while providing tools for editing, organizing, and publishing creative projects.",

    role: "Full Stack AI Engineer",

    highlights: [
      "Architected a scalable asynchronous music generation pipeline with queue-based processing, job lifecycle management, retries, progress tracking, and failure recovery for long-running AI generation tasks",
      "Built the platform using Next.js, TypeScript, and Supabase, leveraging PostgreSQL, Authentication, Storage, Edge Functions, and Row-Level Security for a secure multi-user SaaS architecture",
      "Designed a production-ready backend architecture supporting concurrent music generation requests, real-time status updates, optimized database operations, and efficient resource utilization",
      "Integrated AI-powered music generation workflows capable of producing complete songs, instrumentals, vocals, lyrics, and multiple musical styles through configurable generation pipelines",
      "Developed a comprehensive project management system with generation history, versioning, favorites, search, filtering, and cloud-based asset management",
      "Implemented subscription, credit-based billing, secure authentication, and user quota management to support commercial-scale AI music generation services",
      "Optimized frontend performance with Next.js App Router, server components, streaming, caching, and real-time Supabase subscriptions to deliver a responsive user experience",
    ],

    impact:
      "Empowered musicians, creators, content producers, and businesses to transform ideas into professional-quality music within minutes, dramatically accelerating creative workflows while making high-quality music production more accessible.",

    logo: "/images/projects/sonica.webp",
    isExpanded: true,
  },

  {
    id: "skypost-ai",
    title: "Skypost AI",
    period: { start: "2026" },
    link: "https://skypost-ai.vercel.app",
    skills: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Groq",
      "AI SDK",
      "Bluesky API",
      "OAuth",
      "Vercel",
      "Cron Jobs",
      "Tailwind",
      "shadcn/ui",
    ],
    businessDescription:
      "AI scheduling platform for marketing content that generates, organizes, schedules, and automatically publishes social media content using AI-powered workflows and connected social accounts.",
    role: "Full Stack AI Engineer",
    highlights: [
      "Built an AI-powered marketing automation platform that transforms a single content idea into weeks or months of scheduled social media content",
      "Integrated Groq Llama 3.3 70B and AI SDK to generate high-quality marketing posts with configurable tone, audience targeting, and content strategies",
      "Implemented secure Bluesky account connection and OAuth-based authentication for automated publishing workflows",
      "Designed a scheduling engine that automatically generates publishing calendars and manages future content across customizable posting frequencies",
      "Created a content management dashboard for reviewing, editing, scheduling, and monitoring AI-generated marketing campaigns",
      "Developed automated publishing infrastructure with retry mechanisms, publishing logs, token management, and delivery tracking",
      "Implemented timezone-aware scheduling and content batching to support global marketing campaigns and consistent audience engagement",
    ],
    impact:
      "Enabled marketers, creators, and businesses to automate content planning, generation, scheduling, and publishing from a single platform, significantly reducing manual effort while improving content consistency and audience reach.",
    logo: "/images/projects/skypost-ai.webp",
    isExpanded: true,
  },

  {
    id: "o1-exchange",
    title: "o1 Exchange",
    period: { start: "2024" },
    link: "https://o1.exchange",
    skills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Web3",
      "DeFi",
      "DEX Aggregation",
      "Copy Trading",
      "Smart Contracts",
      "Trading Systems",
    ],
    businessDescription:
      "Advanced cryptocurrency trading platform offering spot trading, instant swaps, copy trading, and multi-router DeFi liquidity aggregation.",
    role: "Senior Full Stack Engineer",
    highlights: [
      "Developed core trading platform functionality including copy trading, spot trading, and instant trading workflows",
      "Designed and built a Meta DEX Aggregator Engine utilizing multiple routing strategies to optimize swap execution",
      "Implemented high-performance routing logic to deliver faster transactions, improved liquidity access, and reduced trading costs",
      "Built backend services and APIs supporting real-time trading operations and portfolio synchronization",
    ],
    impact:
      "Improved trading efficiency and execution quality through intelligent routing, enabling users to access optimal liquidity across multiple decentralized exchanges.",
    logo: "/images/projects/o1exchange-metadex.webp",
    isExpanded: true,
  },

  {
    id: "predictefy",
    title: "Predictefy",
    period: { start: "2024" },
    link: "https://predictefy.com",
    skills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Web3",
      "Prediction Markets",
      "Copy Trading",
      "API Integrations",
      "Real-Time Data",
      "Blockchain",
    ],
    businessDescription:
      "Prediction market platform enabling users to participate in event-based markets and leverage social trading strategies powered by blockchain technology.",
    role: "Senior Full Stack Engineer",
    highlights: [
      "Contributed to full-stack development of the prediction market platform across frontend, backend, and data services",
      "Integrated third-party prediction market providers and external market data sources, including Polymarket-compatible endpoints",
      "Implemented one-click copy trading functionality allowing users to automatically replicate successful trading strategies",
      "Built real-time market synchronization, trade execution, and portfolio tracking systems",
    ],
    impact:
      "Enhanced user engagement and trading accessibility by simplifying prediction market participation and enabling automated strategy replication.",
    logo: "/images/projects/predictefy.webp",
    isExpanded: true,
  },

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
      "Web2.5 blockchain infrastructure ecosystem designed to bring tokenization, digital asset management, transaction tracking, and Web3-style functionality into familiar Web2 application environments.",
    role: "Lead Full Stack Engineer",
    highlights: [
      "Engineered core full-stack infrastructure for blockchain-enabled applications, integrating token, transaction, account, and digital asset workflows across the DFS Chain ecosystem",
      "Developed blockchain explorer and transaction-tracking functionality for monitoring asset activity, transaction records, hashes, and ecosystem operations",
      "Built wallet and account-adjacent infrastructure enabling users and applications to manage digital assets through a simplified Web2-oriented experience",
      "Designed token lifecycle and ecosystem service architecture supporting token creation, transfers, application-level utility, and interconnected digital asset workflows",
      "Developed and integrated APIs connecting frontend applications with blockchain and ecosystem services, enabling consistent data access and transaction processing across multiple products",
      "Contributed to ecosystem applications spanning token launches, exchanges, asset management, transaction visualization, and interconnected Web2/Web3 experiences",
      "Designed reusable full-stack components and service integrations to support the expansion of multiple applications operating within the DFS Chain ecosystem",
    ],
    impact:
      "Contributed to the development of a scalable Web2.5 infrastructure ecosystem that simplified blockchain-style functionality for applications and users while enabling tokenization, transaction tracking, digital asset management, and cross-application connectivity.",
    logo: "/images/projects/dfs-simuchain.webp",
    isExpanded: true,
  },

  {
    id: "difines-ai",
    title: "DIFINES AI",
    period: { start: "2026" },
    link: "https://difines.org/ai",
    skills: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "pgvector",
      "AI SDK",
      "Groq",
      "Llama 3.3 70B",
      "Gemini embedding-001",
      "RAG",
      "Markdown Knowledge Base",
      "Tailwind",
    ],
    businessDescription:
      "RAG-based AI consultant that answers user questions about the DIFINES ecosystem using markdown knowledge resources, Supabase pgvector search, and Groq-powered LLM responses.",
    role: "Full Stack AI Engineer",
    highlights: [
      "Built a RAG chatbot for the DIFINES consultant page using markdown documents as the knowledge source",
      "Implemented Supabase pgvector storage and similarity search for retrieving relevant ecosystem documentation",
      "Integrated Groq Llama 3.3 70B for fast AI responses and Gemini embedding-001 for document embeddings",
      "Created an ingestion workflow to chunk markdown files, generate embeddings, and store searchable knowledge in PostgreSQL",
      "Designed the assistant UI to match the existing DIFINES landing page style and provide a smooth chat experience",
    ],
    impact:
      "Improved user understanding of the DIFINES ecosystem by enabling instant AI-powered answers based on verified project documentation.",
    logo: "/images/projects/difines-ai.webp",
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
    id: "zunvra",
    title: "Zunvra",
    period: { start: "2025" },
    type: "app",
    androidLink: "https://play.google.com/store/apps/details?id=com.zunvra.app",
    iosLink: "https://apps.apple.com/app/zunvra/id6755365763",
    skills: [
      "Android",
      "iOS",
      "React Native",
      "TypeScript",
      "Social Networking",
      "Real-Time Messaging",
      "Private Chat",
      "Notifications",
      "Solana",
      "Crypto",
      "Token Analytics",
      "AI",
      "AI Image Generation",
      "Real-Time Updates",
      "Content Moderation",
      "Privacy & Security",
    ],
    businessDescription:
      "Decentralized social network combining community communication, real-time messaging, crypto-native Solana token analytics, and AI-powered tools for users interested in Web3 and emerging technologies.",
    role: "Full Stack & Mobile Engineer",
    highlights: [
      "Built a mobile-first social networking experience supporting text and image posts, likes, reposts, replies, bookmarks, follows, and rich media interactions",
      "Implemented real-time communication features including private one-to-one chats, notifications, live updates, and community interactions",
      "Integrated Solana-focused token discovery and analytics with real-time token information and AI-powered risk insights",
      "Implemented AI-powered functionality through SOFIA AI, including conversational assistance, image generation, and content insights",
      "Developed customizable user profiles with themes and backgrounds while supporting a personalized social experience",
      "Implemented community engagement features including badges, trending topics, user discovery, and content exploration",
      "Built communication experiences supporting voice and video calls as well as public and moderated audio rooms",
      "Focused on privacy and secure data handling with self-hosted infrastructure and encrypted data transmission",
    ],
    impact:
      "Delivered a decentralized social platform combining real-time community communication, crypto-native Solana analytics, and AI-powered experiences in a mobile-first product.",
    logo: "/images/projects/zunvra.webp",
    isExpanded: false,
  },

  {
    id: "kin-home",
    title:
      "KIN HOME | Solar Financial Performance & Cost Intelligence Platform",
    period: { start: "2025" },
    link: "",
    skills: [
      "Svelte",
      "SvelteKit",
      "Turso",
      "QuickBooks",
      "Quickbase",
      "Firebase Auth",
      "Railway",
      "Chart.js",
      "Financial Modeling",
      "Cost Intelligence",
    ],
    businessDescription:
      "Solar financial performance and cost intelligence platform designed to unify accounting data with operational targets to deliver real-time profitability insights.",
    role: "Full-Stack Financial Systems Engineer",
    highlights: [
      "Built a full-stack financial modeling platform integrating QuickBooks actuals with Quickbase and Turso operational datasets",
      "Architected Profit & Loss and PBA models including gross margin, G&A allocation, and net income forecasting",
      "Implemented dynamic price-per-watt financial scenarios based on kW system sizing",
      "Developed direct vs indirect cost allocation across EPC and sales operations",
      "Created advanced financial adjustments including domestic content rebates and internal crew salary allocations",
      "Delivered project-level and tool-level financial breakdowns for operational decision making",
    ],
    impact:
      "Enabled real-time profitability tracking and improved financial visibility for solar project operations and executive decision making.",
    logo: "/images/projects/kin-exec.webp",
    isExpanded: false,
  },

  {
    id: "xmr-casino",
    title: "XMR.gg | Crypto Casino",
    period: { start: "2023" },
    type: "app",
    link: "https://xmr.gg",
    skills: [
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Redis",
      "High Concurrency",
      "Crypto Payments",
      "Gaming Systems",
      "Wallet Systems",
      "Fraud Prevention",
      "REST APIs",
    ],
    businessDescription:
      "Crypto gaming and payments platform supporting casino games, wallet operations, cryptocurrency transactions, and high-volume financial workflows.",
    role: "Senior Backend Engineer",
    highlights: [
      "Architected backend services for high-volume gaming activity, wallet operations, and transaction processing",
      "Built cryptocurrency payment and wallet services supporting deposits, withdrawals, balances, and transaction tracking",
      "Developed REST APIs and financial workflows for casino games, user accounts, rewards, and payment operations",
      "Implemented Redis-based caching and asynchronous processing to improve performance under high concurrent workloads",
      "Designed MongoDB data models and optimized database operations for transaction-heavy production workloads",
      "Implemented reliability and fraud-prevention mechanisms around financial transactions and gaming activity",
    ],
    impact:
      "Delivered scalable backend infrastructure for a production crypto gaming platform, supporting reliable gaming, wallet, and payment operations under high concurrency.",
    logo: "/images/projects/casino.webp",
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
    type: "app",
    link: "#",
    skills: [
      "React",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "Healthcare",
      "Cloud Systems",
      "REST APIs",
      "Clinical Data",
      "Data Visualization",
      "Patient Monitoring",
      "Analytics",
    ],
    businessDescription:
      "Cloud-based clinical data platform designed to help healthcare teams monitor patient information, visualize vital signs, and support data-driven clinical workflows.",
    role: "Full Stack Engineer",
    highlights: [
      "Built responsive clinical dashboards for monitoring patient vital signs, risk indicators, and longitudinal health data",
      "Developed interactive data visualizations for temperature, heart rate, blood pressure, respiratory rate, and oxygen saturation",
      "Implemented backend APIs and PostgreSQL data workflows for securely processing and serving clinical information",
      "Built reporting and analytics features to help care teams identify trends and support clinical decision-making",
      "Developed cloud-based data processing workflows with a focus on reliability, security, and consistent patient data handling",
      "Optimized dashboard data loading and visualization performance for large sets of time-series clinical data",
    ],
    impact:
      "Delivered a reliable clinical analytics experience that gave care teams clearer visibility into patient data, vital-sign trends, and operational insights.",
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
    link: "https://poipi.vercel.app",
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
    link: "#",
    skills: [
      "React",
      "AI",
      "D-ID API",
      "Video Generation",
      "API Integration",
      "Animation",
    ],
    businessDescription:
      "AI media generation platform that transforms static images and voice inputs into engaging avatar-based video content through automated AI-powered media processing.",
    role: "AI Full Stack Engineer",
    highlights: [
      "Integrated D-ID video generation APIs to transform user-provided images and voice inputs into AI-generated presenter and avatar videos",
      "Engineered end-to-end media processing workflows covering asset upload, voice configuration, video generation, processing states, and final output rendering",
      "Developed interactive controls for configuring voice characteristics, avatar animation, video generation parameters, and output preferences",
      "Implemented asynchronous generation workflows with real-time processing states, progress feedback, error handling, and reliable result delivery",
      "Built responsive media creation interfaces that simplified complex AI generation workflows for creators and marketing teams",
      "Integrated frontend components with AI and media-processing services while maintaining reusable architecture and consistent application state",
    ],
    impact:
      "Streamlined AI-assisted video production by transforming static visual and voice assets into ready-to-use animated content, reducing manual production effort and enabling creators and marketing teams to generate media more efficiently.",
    logo: "/images/projects/ai-video-generator.webp",
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
    businessDescription:
      "Wallet-native messaging platform designed for Web3 communities, combining decentralized identity, real-time communication, and integrated digital asset interactions.",
    role: "Web3 Full Stack Engineer",
    highlights: [
      "Architected and developed wallet-based authentication and real-time messaging infrastructure to enable seamless identity and communication within Web3 communities",
      "Implemented integrated token transfer workflows directly within conversations, allowing users to initiate and manage digital asset transactions without leaving the messaging experience",
      "Developed scalable group communication features, including community creation, group management, real-time message synchronization, and interactive member experiences",
      "Built responsive, data-driven interfaces for wallet connectivity, conversations, community management, and transaction interactions",
    ],
    impact:
      "Delivered an integrated Web3 communication experience that combined wallet-based identity, real-time community engagement, and native digital asset transfers within a unified messaging platform.",
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
      "WalletConnect",
      "MetaMask",
      "BSC",
      "DFS Chain",
    ],
    businessDescription:
      "Hybrid crypto exchange platform inspired by SimpleSwap, enabling Web3 and Web2 asset conversions across BNB Smart Chain and DFS Chain through a unified digital asset exchange experience.",
    role: "Web3 Full Stack Engineer",
    highlights: [
      "Engineered a multi-network swap interface supporting Web3-to-Web3 token exchanges across supported blockchain ecosystems",
      "Implemented hybrid exchange workflows connecting Web2-based DFS assets with Web3 tokens, enabling seamless cross-environment asset conversions",
      "Integrated Web3 wallet connectivity and blockchain transaction interactions, including wallet state management, transaction initiation, and confirmation handling",
      "Developed token selection, exchange-rate presentation, balance validation, transaction estimation, and swap confirmation workflows",
      "Built reusable exchange components and responsive trading interfaces for managing token pairs, network selection, transaction parameters, and swap states",
      "Implemented transaction status and error-handling flows to provide users with clear feedback throughout the asset conversion lifecycle",
      "Integrated frontend exchange workflows with backend and blockchain services to coordinate swap requests, asset information, and transaction processing across supported networks",
    ],
    impact:
      "Delivered a unified Web3/Web2 exchange experience that simplified cross-network and cross-environment asset conversion while providing a scalable foundation for digital asset trading and swap operations.",
    logo: "/images/projects/quickido.webp",
    isExpanded: false,
  },

  {
    id: "burn-to-earn",
    title: "Burn To Earn Token Platform",
    period: { start: "2023" },
    link: "https://burn-to-earn.vercel.app/", // change if different project URL
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "SCSS",
      "Ethers.js",
      "WalletConnect",
      "MetaMask",
      "Solidity",
      "Hardhat",
      "BNB Smart Chain",
      "Web3",
      "Crypto UI",
    ],

    businessDescription:
      "Web3 token utility platform that enables users to burn supported tokens in exchange for platform rewards, combining token utility with deflationary mechanics across meme-coin ecosystems and the BNB Smart Chain.",

    role: "Web3 Full Stack Engineer",

    highlights: [
      "Architected and implemented a burn-to-earn mechanism that enables users to permanently burn eligible tokens in exchange for predefined platform rewards",
      "Developed and integrated smart contracts for secure token-burn validation, eligibility verification, transaction execution, and reward distribution",
      "Implemented seamless Web3 wallet connectivity with MetaMask and WalletConnect, including wallet state management and blockchain network handling",
      "Built comprehensive transaction workflows covering burn initiation, wallet signing, on-chain confirmation, error handling, and persistent burn-history tracking",
      "Developed a responsive token management dashboard with real-time blockchain data, transaction status updates, token balances, and user participation metrics",
      "Integrated support for multiple meme-token contracts on BNB Smart Chain, with reusable abstractions for token configuration and blockchain interactions",
      "Implemented frontend-to-contract interaction layers using modern Web3 libraries to provide reliable and user-friendly on-chain transaction experiences",
    ],

    impact:
      "Delivered an end-to-end Web3 token utility experience that streamlined participation in deflationary burn mechanisms, automated reward workflows, and provided users with transparent visibility into their on-chain activity.",

    logo: "/images/projects/b2e-home.webp",
    isExpanded: false,
  },

  {
    id: "genogram",
    title: "Genogram",
    period: { start: "2021" },
    link: "",
    skills: [
      "React",
      "GoJS",
      "Data Visualization",
      "JavaScript",
      "UI Engineering",
    ],
    businessDescription:
      "Interactive family relationship modeling and visualization platform designed to transform complex relational data into clear, intuitive visual diagrams.",
    role: "Frontend Engineer",
    highlights: [
      "Architected and implemented dynamic, data-driven diagram rendering with GoJS to visualize complex multi-level family relationships and associated information",
      "Developed intuitive drag-and-edit interactions that enabled users to create, modify, and maintain relationships directly within the interactive diagram",
      "Designed structured data visualization workflows for transforming relationship data into consistent, interactive, and easily interpretable visual representations",
      "Implemented responsive frontend interactions and state management to keep diagram updates synchronized with underlying relationship data",
    ],
    impact:
      "Simplified the visualization and management of complex family relationship data by providing an intuitive interactive interface, enabling users to efficiently explore, update, and understand large relationship structures.",
    logo: "/images/projects/genogram.webp",
    isExpanded: false,
  },

  {
    id: "album-app",
    title: "Album App",
    period: { start: "2020" },
    type: "app",
    link: "#",
    skills: [
      "iOS",
      "Android",
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Mobile Development",
      "Social Networking",
      "Photo Sharing",
      "Real-Time Messaging",
      "Push Notifications",
      "Media Uploads",
    ],
    businessDescription:
      "Mobile social platform for sharing photos and memories with friends, combining personal albums, social feeds, user interactions, and private communication in a mobile-first experience.",
    role: "Full Stack Mobile Engineer",
    highlights: [
      "Built a cross-platform mobile experience with Ionic and Angular for photo sharing, personal albums, social feeds, and user profiles",
      "Implemented secure OTP-based authentication and onboarding flows with session management and account recovery",
      "Developed photo and media upload workflows with optimized feed presentation, album organization, and image previews",
      "Built social interactions including likes, comments, sharing, friend connections, and activity notifications",
      "Developed backend APIs with Node.js and PostgreSQL for users, albums, media, social relationships, and interactions",
      "Implemented private communication features allowing users to connect and share content with friends",
      "Optimized mobile performance and API data loading to provide a responsive experience across different devices and network conditions",
    ],
    impact:
      "Delivered a mobile-first social photo-sharing platform that combined personal albums, friend interactions, media sharing, and communication into a single experience.",
    logo: "/images/projects/album-app.webp",
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
      "Immersive 3D commerce platform designed to deliver interactive and engaging virtual product discovery experiences.",
    role: "Three.js Full Stack Engineer",
    highlights: [
      "Architected and developed a modular 3D scene framework capable of dynamically loading, rendering, and managing interactive product assets",
      "Implemented structured content management workflows for efficiently managing 3D models, product metadata, and associated interactive elements",
      "Integrated intuitive product navigation and interactive commerce features to connect immersive 3D experiences with core shopping workflows",
    ],
    impact:
      "Enhanced product discovery and customer engagement by delivering an immersive, interactive shopping experience that seamlessly combines 3D visualization with commerce functionality.",
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
      "Engineered secure wallet connection and transaction flows, enabling users to seamlessly connect their Web3 wallets, interact with token contracts, and execute token swaps directly through the platform",
      "Designed and implemented bonding-curve pricing mechanics with dynamic token pricing, supply-based calculations, and automated referral logic to support transparent token distribution and community-driven growth",
      "Integrated and orchestrated smart contracts across the token lifecycle, including token creation, trading, liquidity management, and on-chain transaction handling, with reliable frontend-to-contract interactions",
      "Developed responsive, data-driven interfaces for token discovery, launch management, trading activity, liquidity metrics, and portfolio interactions using modern React/Next.js architecture",
      "Implemented blockchain data synchronization and transaction-state handling to provide users with accurate on-chain status, balances, pricing information, and transaction feedback",
    ],

    impact:
      "Delivered a production-oriented Web3 token launch and trading experience that streamlined token creation and participation, reduced friction across wallet and transaction workflows, and provided a scalable foundation for community-driven token launches and liquidity growth.",
    logo: "/images/projects/sato-pump.webp",
    isExpanded: false,
  },

  {
    id: "roppongi-ai",
    title: "Roppongi AI | AI Business Website",
    period: { start: "2022" },
    link: "",
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
]

export function getAllProjects() {
  return PROJECTS
}

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id)
}

export function findProjectNeighbour(id: string) {
  const index = PROJECTS.findIndex((project) => project.id === id)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: index > 0 ? PROJECTS[index - 1] : undefined,
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : undefined,
  }
}
