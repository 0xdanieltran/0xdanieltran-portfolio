import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "difines",
    companyName: "DIFINES",
    companyLogo: "/images/experiences/difines.webp",
    companyWebsite: "https://www.difines.org/",
    positions: [
      {
        id: "1",
        title: "Senior Full Stack Engineer",
        employmentPeriod: {
          start: "02.2024",
        },
        employmentType: "Contract",
        icon: "code",
        description:
          "- Designed and developed production full stack applications across frontend interfaces, backend APIs, database architecture, authentication, background processing, and deployment.\n- Built AI powered product features using LLM APIs, retrieval augmented generation (RAG), structured prompt pipelines, knowledge retrieval, content generation, and workflow automation.\n- Developed AI driven content and marketing systems that retrieve contextual knowledge, generate structured content plans, process content through multi step LLM workflows, and automate publishing operations.\n- Designed scalable backend services and APIs supporting asynchronous processing, job queues, scheduled workflows, rate limiting, retry handling, caching, and failure recovery for high concurrency applications.\n- Designed application data models, service boundaries, authentication flows, and API integrations while connecting frontend experiences with backend services and persistent application state.\n- Implemented end to end product features spanning user interfaces, business logic, APIs, database operations, real time processing, and third party service integrations.\n- Designed and implemented a web based educational platform that reproduces real blockchain mechanics including wallets, transactions, blocks, confirmations, asset transfers, and ledger state using conventional Web2 application infrastructure.\n- Built reusable internal services and AI assisted automation for testing, debugging, monitoring, workflow orchestration, and operational tasks, reducing repetitive engineering work across development workflows.\n- Collaborated across product, frontend, backend, and infrastructure responsibilities from requirements and system design through implementation, deployment, monitoring, and production support.",
        skills: [
          "TypeScript",
          "Node.js",
          "Next.js",
          "PostgreSQL",
          "RAG Systems",
          "Workflow Orchestration",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "xmrplay-ltd",
    companyName: "XMRPlay Ltd",
    companyLogo: "/images/experiences/xmr.gg.jpg",
    companyWebsite: "https://xmr.gg",
    positions: [
      {
        id: "1",
        title: "Backend Engineer",
        employmentPeriod: {
          start: "08.2023",
          end: "02.2024",
        },
        employmentType: "Contract",
        icon: "code",
        description:
          "- Developed core backend services for an iGaming casino platform using Node.js, TypeScript, Express.js, and MongoDB, supporting casino game experiences, player accounts, session management, real time activity, transaction flows, payments, promotions, affiliate systems, and platform operations.\n- Developed real time gaming functionality using Socket.io to synchronize player interactions, game events, account updates, session state, and other live platform activity.\n- Designed payment and transaction processing workflows covering deposits, withdrawals, validation, status tracking, failure handling, and fraud prevention, improving transaction processing speed by approximately 50%.\n- Developed AI assisted fraud and content risk detection workflows using automated image analysis and classification to identify suspicious or policy sensitive user submitted content and reduce manual review requirements.\n- Implemented secure authentication and player session management using JWT, CAPTCHA, authorization controls, and account protection workflows.\n- Built affiliate, referral, promotion, and reward functionality supporting player acquisition, attribution tracking, commission logic, and campaign operations.\n- Developed customer support and ticket management workflows integrating player, account, payment, and platform data, helping reduce average support response time from approximately 48 hours to 12 hours.\n- Improved backend stability and performance through MongoDB query optimization, API improvements, validation, error handling, logging, debugging, and production issue resolution.",
        skills: [
          "Node.js",
          "TypeScript",
          "Express.js",
          "MongoDB",
          "Socket.io",
          "Payment Processing",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "decentreviews",
    companyName: "Decent Reviews",
    companyLogo: "/images/experiences/decentreviews.png",
    companyWebsite: "https://decentreviews.co",
    positions: [
      {
        id: "1",
        title: "Backend Engineer",
        employmentPeriod: {
          start: "04.2023",
          end: "08.2023",
        },
        employmentType: "Contract",
        icon: "code",
        description:
          "- Developed backend services for a customer review and reputation platform using Node.js, TypeScript, and Express.js, supporting review collection, aggregation, verification, badge generation, and external integrations.\n- Built automated review aggregation workflows to collect, process, normalize, and expose customer feedback data through reusable APIs, improving review data collection efficiency by approximately 50%.\n- Developed a dynamic badge generation system that transformed verified review and reputation data into embeddable and shareable components for websites and external channels.\n- Designed and maintained REST APIs, data processing logic, request validation, error handling, and service integrations while documenting endpoints with Swagger for frontend and third party integrations.\n- Implemented blockchain based verification as an additional platform capability, integrating Ethereum smart contracts through Web3.js to provide tamper resistant validation for selected review data.\n- Implemented automated testing with Jest and Cypress and built CI/CD workflows using GitHub Actions and Docker to standardize testing, packaging, and deployment.\n- Improved application performance and backend reliability through database query optimization, API profiling, caching, logging, debugging, and production issue resolution.",
        skills: [
          "Node.js",
          "TypeScript",
          "Express.js",
          "Docker",
          "GitHub Actions",
          "API Design",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "worldspeed",
    companyName: "WORLD SPEED",
    companyLogo: "/images/experiences/worldspeed.png",
    companyWebsite: "#",
    positions: [
      {
        id: "1",
        title: "Full Stack Engineer",
        employmentPeriod: {
          start: "01.2021",
          end: "04.2023",
        },
        employmentType: "Full-time",
        icon: "code",
        description:
          "- Designed and developed full stack financial and digital asset applications using React.js, Node.js, Express.js, and GraphQL, covering frontend interfaces, backend services, APIs, data processing, and production deployment.\n- Built multiple production products including trading platforms, asset management systems, marketplace functionality, token related services, and interactive game based applications within a blockchain focused ecosystem.\n- Developed scalable backend services for transaction processing, asset synchronization, account workflows, financial operations, and integrations with external blockchain networks.\n- Built reusable React.js frontend architectures and integrated application interfaces with backend APIs and blockchain related services, improving consistency across product development and delivery.\n- Managed API design, automated integration workflows, CI/CD, and cloud deployment using GraphQL, REST, CircleCI, GitHub, Bitbucket, and AWS Lambda, reducing deployment time by approximately 40%.",
        skills: [
          "React",
          "Node.js",
          "GraphQL",
          "Web3.js",
          "AWS Lambda",
          "CI/CD",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "defichain",
    companyName: "Defichain",
    companyLogo: "/images/experiences/defichain.png",
    companyWebsite: "#",
    positions: [
      {
        id: "1",
        title: "Software Engineer",
        employmentPeriod: {
          start: "04.2020",
          end: "01.2021",
        },
        employmentType: "Contract",
        icon: "code",
        description:
          "- Developed backend and application functionality for decentralized finance products, supporting liquidity, staking, and yield related workflows across web based financial applications.\n- Implemented smart contract functionality for selected product features and integrated blockchain services with application interfaces and backend workflows.\n- Improved release quality through automated testing with Truffle and Hardhat while supporting frontend integration, debugging, and production deployment.",
        skills: [
          "Solidity",
          "Binance Smart Chain",
          "Smart Contracts",
          "DeFi",
          "Hardhat",
          "Truffle",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "liva-healthcare",
    companyName: "Liva Healthcare",
    companyLogo: "/images/experiences/liva-healthcare.jpg",
    companyWebsite: "https://www.livahealthcare.com/",
    positions: [
      {
        id: "1",
        title: "Software Engineer",
        employmentPeriod: {
          start: "04.2019",
          end: "04.2020",
        },
        employmentType: "Full-time",
        icon: "code",
        description:
          "- Developed full stack features for a cloud based digital health platform, supporting patient engagement, care program management, health data monitoring, and secure healthcare integrations.\n- Built backend services using Node.js, Express.js, and MongoDB to ingest, process, and expose patient data from mobile applications, wearable devices, remote monitoring systems, and third party healthcare platforms.\n- Developed analytics dashboards and coach management interfaces using React.js and D3.js, helping healthcare teams monitor patient progress, treatment outcomes, and operational activity.\n- Improved application scalability and reliability through service architecture improvements, caching, monitoring, debugging, and collaboration with product, healthcare, and infrastructure teams.",
        skills: [
          "React",
          "Node.js",
          "Express.js",
          "MongoDB",
          "D3.js",
          "Healthcare Systems",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "adapt-agency",
    companyName: "Adapt Agency",
    companyLogo: "/images/experiences/adapt-agency.png",
    companyWebsite: "https://www.adaptagency.com/",
    positions: [
      {
        id: "1",
        title: "Frontend Developer",
        employmentPeriod: {
          start: "08.2017",
          end: "04.2019",
        },
        employmentType: "Full-time",
        icon: "code",
        description:
          "- Developed and maintained production web applications using React.js, TypeScript, HTML5, and CSS3, building reusable UI components and responsive interfaces across desktop and mobile experiences.\n- Translated product and design requirements into maintainable frontend features while improving component consistency, application usability, and cross browser compatibility.\n- Supported application stability through frontend debugging, issue resolution, testing, continuous integration, and participation in production release workflows.",
        skills: [
          "React",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Responsive Design",
        ],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "education",
    companyName: "Technical University of Denmark (DTU)",
    positions: [
      {
        id: "1",
        title: "Bachelor of Science (BSc) in Software Technology",
        employmentPeriod: {
          start: "09.2013",
          end: "06.2017",
        },
        icon: "education",
        description: `- Awarded Bachelor's degree in Software Engineering from the Technical University of Denmark (DTU).
- Focused on software architecture, distributed systems, databases, and scalable application development.
- Completed coursework in algorithms, data structures, operating systems, and cloud computing fundamentals.
- Built multiple academic projects involving full-stack development, API design, and data processing systems.
- Collaborated in team-based engineering projects following agile development methodologies.
- Developed strong foundations in system design, backend engineering, and performance optimization.`,
        skills: [
          "Data Structures & Algorithms",
          "Software Architecture",
          "Database Systems (SQL/NoSQL)",
          "Computer Networks",
          "System Design",
          "Software Testing",
        ],
      },
    ],
  },
]
