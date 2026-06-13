"use client";

import { useMemo, useState } from "react";

type DimensionKey =
  | "usecase"
  | "data"
  | "humanCapital"
  | "governance"
  | "disclosure"
  | "productBreadth";

type SourceLink = {
  label: string;
  href: string;
};

type TimelineItem = {
  year: string;
  tag: string;
  text: string;
};

type BankProfile = {
  bank: string;
  type: string;
  geography: string;
  usecase: number;
  data: number;
  humanCapital: number;
  governance: number;
  disclosure: number;
  productBreadth: number;
  history: string;
  timeline: TimelineItem[];
  sources: SourceLink[];
};

const COL_WHITE = "#FFFFFF";
const COL_DARK = "#4D4D4D";
const COL_GRID = "#E4E0DF";
const COL_SEPIA = "#8C7D80";
const COL_SEPIA_DARK = "#6E6163";
const COL_SEPIA_MID = "#B7A7A2";
const COL_LOW = "#C7B6B0";
const COL_MED = "#A99690";
const COL_HIGH = "#7F6B67";

const DIMENSIONS: { key: DimensionKey; label: string }[] = [
  { key: "usecase", label: "Use Case" },
  { key: "data", label: "Data" },
  { key: "humanCapital", label: "Human Capital" },
  { key: "governance", label: "Governance" },
  { key: "disclosure", label: "Disclosure" },
  { key: "productBreadth", label: "Product Breadth" },
];

const BANKS: BankProfile[] = [
  {
    bank: "RHB Bank",
    type: "Regional commercial bank",
    geography: "Malaysia / Singapore",
    usecase: 5,
    data: 5,
    humanCapital: 5,
    governance: 5,
    disclosure: 5,
    productBreadth: 4,
    history:
      "RHB’s AI profile is still closer to applied digital transformation than full enterprise AI industrialisation. Its visible AI narrative is concentrated in retail-process automation, SME financing, branch service support, digital onboarding, and fund/product exposure to the AI investment theme. The revaluation signal simply reflects fewer AI outcomes from private disclosure rather than a direct valuation of operation or earning contribution.",
    timeline: [
      {
        year: "2023–2024",
        tag: "Digital retail",
        text: "Expanded digital onboarding and SME financing capabilities, including AI, machine-learning, big-data, and facial-recognition elements in financing workflows.",
      },
      {
        year: "2025",
        tag: "Branch productivity",
        text: "Formal industry reporting highlighted RHB Ask, an internal AI chatbot intended to improve branch-service consistency and reduce employee time spent on repeated enquiries.",
      },
      {
        year: "2025",
        tag: "Governance",
        text: "Integrated reporting and technology-risk material framed AI as part of broader operational-efficiency, data, and digital-risk controls rather than a separately disclosed AI earnings engine.",
      },
    ],
    sources: [
      {
        label: "RHB Integrated Reports",
        href: "https://www.rhbgroup.com/investor-relations/financial-reports/annual-reports/rhb-bank-berhad/index.html",
      },
      {
        label: "RHB SME financing app",
        href: "https://www.rhbgroup.com/merge/article/rhbs-sme-financing-app/index.html",
      },
      {
        label: "The Asian Banker coverage",
        href: "https://www.theasianbanker.com/updates-and-articles/rhb-s-multi-pronged-retail-transformation-in-digital-acquisition-ai-services-and-flexible-home-financing",
      },
    ],
  },
  {
    bank: "CIMB",
    type: "ASEAN universal bank",
    geography: "Malaysia / Singapore / ASEAN",
    usecase: 6,
    data: 6,
    humanCapital: 6,
    governance: 6,
    disclosure: 6,
    productBreadth: 5,
    history:
      "CIMB’s AI positioning is regionally distributed, with more visible experimentation around AI governance, decision support, digitalisation, and customer facing financial advisory support. Public evidence points less towards AI value disclosure and more towards progressive embedding of AI into data governance, operational efficiency, and customer service channels.",
    timeline: [
      {
        year: "2024–2025",
        tag: "AI governance",
        text: "CIMB disclosed an AI governance framing through technology-risk management, model governance, data protection, and emerging-technology risk controls.",
      },
      {
        year: "2025",
        tag: "Investment outlook",
        text: "CIMB Singapore published market commentary positioning AI infrastructure and Asia’s AI supply chain as a material investment theme.",
      },
      {
        year: "2026",
        tag: "AI agents",
        text: "CIMB Niaga, Google Cloud, and Artefact announced AI agents to support relationship managers and contact-centre teams with advisory and service workflows.",
      },
    ],
    sources: [
      {
        label: "CIMB Digitalisation & Innovation",
        href: "https://www.cimbislamic.com/en/sustainability/our-priorities/digitalisation-and-innovation.html",
      },
      {
        label: "CIMB Singapore 2026 outlook",
        href: "https://www.cimb.com.sg/en/personal/cimb-pulse/media/2026/outlook26.html",
      },
      {
        label: "CIMB Niaga AI agents release",
        href: "https://www.artefact.com/news/cimb-niaga-google-cloud-and-artefact-debut-enterprise-ai-agents-to-deliver-life-centric-banking-for-millions-of-indonesians/",
      },
    ],
  },
  {
    bank: "Maybank",
    type: "Regional commercial bank",
    geography: "Malaysia / Singapore / ASEAN",
    usecase: 6,
    data: 6,
    humanCapital: 6,
    governance: 6,
    disclosure: 6,
    productBreadth: 6,
    history:
      "Maybank’s AI path is best read through platform modernisation and human centred financial services. Its disclosure is not AI monetisation heavy because the bank frames AI and machine learning as tools for productivity, data analytics, customer centricity and cyber risk response.",
    timeline: [
      {
        year: "2024",
        tag: "AI/ML opportunity",
        text: "Annual reporting identified AI and machine learning as opportunities for productivity, turnaround-time reduction, and data analytics, while also flagging cyber and data-risk concerns.",
      },
      {
        year: "2025",
        tag: "SME education",
        text: "Maybank Singapore published practical AI guidance for SMEs, positioning AI around automation, decision support, and efficiency improvement.",
      },
      {
        year: "2026",
        tag: "ROAR30 roadmap",
        text: "Public reporting on Maybank’s ROAR30 strategy pointed to technology, cloud, data, and AI investment as part of the bank’s next transformation cycle.",
      },
    ],
    sources: [
      {
        label: "Maybank Annual Report 2024",
        href: "https://www.maybank.com/iwov-resources/documents/pdf/annual-report/2024/Maybank-AR2024-Integrated-Annual-Report.pdf",
      },
      {
        label: "Maybank Singapore AI guide",
        href: "https://www.maybank2u.com.sg/en/imsavvy/Business-pages/plug-into-ai.html",
      },
      {
        label: "Reuters ROAR30 coverage",
        href: "https://www.reuters.com/world/asia-pacific/malaysias-maybank-aims-mobilise-74-billion-sustainable-finance-by-2030-2026-01-21/",
      },
    ],
  },
  {
    bank: "UOB",
    type: "Singapore commercial bank",
    geography: "Singapore / ASEAN",
    usecase: 7,
    data: 8,
    humanCapital: 7,
    governance: 8,
    disclosure: 7,
    productBreadth: 7,
    history:
      "UOB’s AI history is more defensive and compliance led. The strongest early signal was its anti money laundering AI initiative where machine learning was deployed across transaction monitoring and name screening. The later phase shifts toward regional customer experience, productivity, and GenAI adoption, especially after the ASEAN consumer bank expansion.",
    timeline: [
      {
        year: "2020",
        tag: "AI AML",
        text: "UOB deployed an AI-powered anti-money-laundering solution that screens roughly 60,000 account names monthly and applies AI across transaction monitoring and name screening.",
      },
      {
        year: "2021–2022",
        tag: "ASEAN data platform",
        text: "Digital-bank and regional-expansion initiatives placed analytics, customer personalisation, and operational data integration at the centre of UOB’s ASEAN platform strategy.",
      },
      {
        year: "2025",
        tag: "GenAI / agentic AI",
        text: "UOB signed a three-year collaboration with Accenture to accelerate adoption of generative AI and agentic AI across customer experience, productivity, and risk-management use cases.",
      },
    ],
    sources: [
      {
        label: "UOB AI AML release",
        href: "https://www.uobgroup.com/uobgroup/newsroom/2020/new-money-laundering-solution.page?path=data%2Fuobgroup%2F2020%2F133",
      },
      {
        label: "UOB × Accenture AI release",
        href: "https://www.uobgroup.com/uobgroup/newsroom/2025/uob-accenture-collab.page?path=data%2Fuobgroup%2F2025%2F335",
      },
    ],
  },
  {
    bank: "OCBC",
    type: "Singapore commercial bank",
    geography: "Singapore / ASEAN / Greater China",
    usecase: 8,
    data: 8,
    humanCapital: 7,
    governance: 8,
    disclosure: 8,
    productBreadth: 8,
    history:
      "OCBC has one of the clearest organisation wide level AI adoption in Singapore. Its 2018 AI unit created an early institutional anchor while later disclosures show AI moving into fraud detection, credit card personalisation, employee productivity, and automation towards assessing  daily decisions. The strongest valuation stems from steadily integrating initiatives into well larger scaled operating infrastructure.",
    timeline: [
      {
        year: "2018",
        tag: "AI Lab",
        text: "OCBC launched its own AI unit, stating it was the first Singapore bank to establish an AI unit to develop in-house AI capabilities.",
      },
      {
        year: "2023",
        tag: "OCBC GPT",
        text: "OCBC announced OCBC GPT for 30,000 employees globally, supporting writing, research, and ideation through a GenAI chatbot.",
      },
      {
        year: "2024",
        tag: "Daily AI decisions",
        text: "OCBC reported AI embedded in credit-card personalisation, fraud detection, productivity, and roughly six million bank decisions daily.",
      },
    ],
    sources: [
      {
        label: "OCBC AI Lab 2018",
        href: "https://www.ocbc.com/group/media/release/2018/ocbc-launches-ai-lab.page",
      },
      {
        label: "OCBC GPT release",
        href: "https://www.ocbc.com/group/media/release/2023/ocbc-is-first-singapore-bank-to-roll-out-generative-ai-chatbot-to-all-employees-globally",
      },
      {
        label: "OCBC 2024 AI report",
        href: "https://www.ocbc.com/group/investors/annual-reports/2024-annual-report/creating-value-through-ai.page",
      },
    ],
  },
  {
    bank: "Citibank SG",
    type: "Global bank branch / subsidiary presence",
    geography: "US / Singapore / global",
    usecase: 8,
    data: 8,
    humanCapital: 8,
    governance: 8,
    disclosure: 7,
    productBreadth: 8,
    history:
      "Citi’s AI profile is institutionally broad but not Singapore specific. Its strongest current signal is employee scale AI tool through Citi Assist, Citi Stylus, and Citi Stylus Workspaces. The development from policy search and document intelligence toward agentic workflows is almost noticeably unique owing to Citi's regional operational footprint.",
    timeline: [
      {
        year: "2024",
        tag: "Citi Assist / Stylus",
        text: "Citi began scaling internal GenAI tools for policy search, document summarisation, comparison, and employee productivity.",
      },
      {
        year: "2025",
        tag: "Agentic AI",
        text: "Citi announced Citi Stylus Workspaces with agentic AI, integrating selected systems so employees can complete multi-step tasks more efficiently.",
      },
      {
        year: "2025",
        tag: "Regional rollout",
        text: "Formal reporting described Citi AI tools becoming available to employees across multiple markets, including Singapore.",
      },
    ],
    sources: [
      {
        label: "Citi Stylus Workspaces",
        href: "https://www.citigroup.com/global/news/press-release/2025/citi-unveils-citi-stylus-workspaces-agentic-ai-turbocharging-productivity",
      },
      {
        label: "Reuters regional rollout",
        href: "https://www.reuters.com/world/china/citi-launches-ai-tools-hong-kong-employees-2025-05-22/",
      },
    ],
  },
  {
    bank: "Bank of America",
    type: "Global bank",
    geography: "US / global",
    usecase: 8,
    data: 8,
    humanCapital: 8,
    governance: 8,
    disclosure: 7,
    productBreadth: 8,
    history:
      "Bank of America’s AI history is most prominent through Erica, its virtual financial assistant. Its relevance to a Singapore's banking landscape is mainly as a global benchmark for customer facing AI at a much larger scale. Proactive financial insights, mobile banking assistance, and mass digital servicing abroad see slightly different implementation than within Singapore, mostly owing to demography of deployment rather than inherent bank specific processes.",
    timeline: [
      {
        year: "2018",
        tag: "Erica launch",
        text: "Erica was launched as Bank of America’s virtual financial assistant inside mobile banking.",
      },
      {
        year: "2023",
        tag: "Scale milestone",
        text: "Bank of America reported Erica passing 1.5 billion client interactions and tens of millions of users.",
      },
      {
        year: "2025",
        tag: "3B interactions",
        text: "Bank of America announced Erica had surpassed three billion client interactions, making it a long-running customer-facing AI benchmark.",
      },
    ],
    sources: [
      {
        label: "BofA Erica product page",
        href: "https://info.bankofamerica.com/en/digital-banking/erica",
      },
      {
        label: "BofA Erica 3B release",
        href: "https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/08/a-decade-of-ai-innovation--bofa-s-virtual-assistant-erica-surpas.html",
      },
      {
        label: "BofA Erica 1.5B release",
        href: "https://newsroom.bankofamerica.com/content/newsroom/press-releases/2023/07/bofa-s-erica-surpasses-1-5-billion-client-interactions--totaling.html",
      },
    ],
  },
  {
    bank: "Barclays",
    type: "Global bank",
    geography: "UK / global",
    usecase: 8,
    data: 8,
    humanCapital: 8,
    governance: 8,
    disclosure: 7,
    productBreadth: 8,
    history:
      "Barclays’ AI profile is more research, infrastructure, and controlled scaling orientated than retail assistant deployment. Its public materials frame AI around productivity, safe scaling, risk controls, financial market research and operational modernisation. The score is high because the bank has extremely strong technical depth and institutional disclosure, but owing to its nature towards private wealth and equity it is much less concerned of deploying massive AI consumer centric products.",
    timeline: [
      {
        year: "2024",
        tag: "AI research",
        text: "Barclays Research published work on AI productivity and macro-financial implications, reflecting AI as both an internal and market-facing research theme.",
      },
      {
        year: "2025",
        tag: "Scaling GenAI",
        text: "Barclays published its scaling-AI framing, emphasising safe, secure, and thoughtful GenAI deployment.",
      },
    ],
    sources: [
      {
        label: "Barclays scaling AI",
        href: "https://home.barclays/insights/2025/07/scaling-AI-at-Barclays/",
      },
      {
        label: "Barclays AI productivity research",
        href: "https://www.ib.barclays/our-insights/AI-productivity-boom.html",
      },
    ],
  },
  {
    bank: "Standard Chartered",
    type: "Global bank with Singapore headquarters functions",
    geography: "UK / Singapore / global",
    usecase: 8,
    data: 8,
    humanCapital: 8,
    governance: 8,
    disclosure: 8,
    productBreadth: 8,
    history:
      "Standard Chartered boasts a strong score owing to its AI strategy explicitly framed around cross border transactions, affluent clients, sustainability, and federated AI adoption. Its 2025 SC GPT rollout across 41 markets provides a clear enterprise GenAI signal, while the 2026 A*STAR partnership gave it a boost in scoring for Singapore specific research and development relevance.",
    timeline: [
      {
        year: "2024–2025",
        tag: "AI strategy",
        text: "Standard Chartered formalised AI around operating-model design, client-centric use cases, data infrastructure, governance, and responsible deployment.",
      },
      {
        year: "2025",
        tag: "SC GPT",
        text: "Standard Chartered launched SC GPT across 41 markets to support operational efficiency and client engagement.",
      },
      {
        year: "2026",
        tag: "A*STAR partnership",
        text: "Standard Chartered and A*STAR launched a three-year partnership to advance AI-led innovation for financial services.",
      },
    ],
    sources: [
      {
        label: "Standard Chartered AI strategy",
        href: "https://www.sc.com/en/about/innovation/artificial-intelligence/",
      },
      {
        label: "SC GPT release",
        href: "https://www.sc.com/en/press-release/standard-chartered-rolls-out-sc-gpt-advancing-ai-driven-innovation-in-banking/",
      },
      {
        label: "A*STAR partnership",
        href: "https://www.a-star.edu.sg/ihpc/news/news/press-release/scb-and-astar-to-advance-ai-led-innovation-for-financial-services",
      },
    ],
  },
  {
    bank: "HSBC",
    type: "Global bank",
    geography: "UK / Hong Kong / Singapore / global",
    usecase: 8,
    data: 8,
    humanCapital: 8,
    governance: 8,
    disclosure: 8,
    productBreadth: 8,
    history:
      "HSBC’s AI position is mature at global scale, with hundreds of use cases spanning fraud detection, cybersecurity, transaction monitoring, customer service, and risk assessment. The later Mistral AI partnership adds a GenAI acceleration layer, but HSBC’s main strength continues to be its breadth and controlled implementation.",
    timeline: [
      {
        year: "2024–2025",
        tag: "600+ use cases",
        text: "HSBC disclosed more than 600 AI use cases in operation across fraud detection, cyber security, transaction monitoring, customer service, and risk assessment.",
      },
      {
        year: "2025",
        tag: "Treasury / payments",
        text: "HSBC published applied AI material on commercial payments, treasury modernisation, fraud prevention, FX optimisation, and decision support.",
      },
      {
        year: "2025",
        tag: "Mistral AI",
        text: "HSBC announced a multi-year partnership with Mistral AI to accelerate generative AI adoption across the global bank.",
      },
    ],
    sources: [
      {
        label: "HSBC transforming with AI",
        href: "https://www.hsbc.com/who-we-are/hsbc-and-digital/hsbc-and-ai/transforming-hsbc-with-ai",
      },
      {
        label: "HSBC × Mistral AI release",
        href: "https://www.hsbc.com/news-and-views/news/media-releases/2025/hsbc-and-mistral-ai-join-forces-to-accelerate-ai-adoption-across-global-bank",
      },
      {
        label: "HSBC AI in payments",
        href: "https://www.business.hsbc.com/en-gb/insights/navigating-the-ai-wave-innovations-in-commercial-payments",
      },
    ],
  },
  {
    bank: "Morgan Stanley",
    type: "Global investment bank / wealth manager",
    geography: "US / global",
    usecase: 8,
    data: 9,
    humanCapital: 8,
    governance: 8,
    disclosure: 8,
    productBreadth: 8,
    history:
      "Morgan Stanley is one of the clearest wealth management AI cases. Its OpenAI partnership created advisor facing knowledge retrieval, meeting summarisation, action item extraction, and research query tools. The adoption logic is different from retail banking where AI assets are used to compress advisor search costs, improve relationship documentation, and industrialise institutional research access.",
    timeline: [
      {
        year: "2023",
        tag: "OpenAI partnership",
        text: "Morgan Stanley announced a strategic OpenAI initiative for a bespoke wealth-management AI solution.",
      },
      {
        year: "2024",
        tag: "Advisor debrief",
        text: "AI @ Morgan Stanley Debrief was launched to generate meeting notes, surface action items, draft follow-up emails, and save notes into Salesforce with client consent.",
      },
      {
        year: "2024",
        tag: "AskResearchGPT",
        text: "Morgan Stanley Research announced AskResearchGPT, extending GenAI into institutional research retrieval and synthesis.",
      },
    ],
    sources: [
      {
        label: "OpenAI partnership release",
        href: "https://www.morganstanley.com/press-releases/key-milestone-in-innovation-journey-with-openai",
      },
      {
        label: "AI Debrief release",
        href: "https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch",
      },
      {
        label: "AskResearchGPT release",
        href: "https://www.morganstanley.com/press-releases/morgan-stanley-research-announces-askresearchgpt",
      },
    ],
  },
  {
    bank: "Goldman Sachs",
    type: "Global investment bank",
    geography: "US / global",
    usecase: 9,
    data: 9,
    humanCapital: 9,
    governance: 8,
    disclosure: 9,
    productBreadth: 8,
    history:
      "Goldman Sachs’ AI score is high because the firm combines AI market research, developer/productivity tooling, investment banking automation, and firm wide GenAI deployment. Relative to commercial banks, its edge is less branch or retail service AI and more analyst, engineering, document, risk, and capital markets workflow augmentation.",
    timeline: [
      {
        year: "2024",
        tag: "Productivity programme",
        text: "Goldman began explicitly linking automation and AI to productivity and organisational-efficiency programmes.",
      },
      {
        year: "2025",
        tag: "GS AI Assistant",
        text: "Formal news reporting described Goldman’s firmwide launch of a generative-AI assistant to support summarisation, drafting, and data analysis.",
      },
      {
        year: "2025",
        tag: "AI agents research",
        text: "Goldman Sachs Research published analysis on AI agents and the expansion of enterprise software productivity.",
      },
    ],
    sources: [
      {
        label: "Reuters GS AI Assistant",
        href: "https://www.reuters.com/business/goldman-sachs-launches-ai-assistant-firmwide-memo-shows-2025-06-23/",
      },
      {
        label: "Goldman AI agents research",
        href: "https://www.goldmansachs.com/insights/articles/ai-agents-to-boost-productivity-and-size-of-software-market",
      },
    ],
  },
  {
    bank: "JPMorgan Chase",
    type: "Global systemically important bank",
    geography: "US / global",
    usecase: 9,
    data: 9,
    humanCapital: 9,
    governance: 8,
    disclosure: 9,
    productBreadth: 9,
    history:
      "JPMorgan Chase is the highest global benchmark in this comparison because its AI implementation spans research, payments, legal document analysis, investment advisory tools, internal LLM suites, and enterprise AI research. Its advantage comes from scale. Large proprietary datasets, deep technical labour, and a long running institutional AI research unit that support controlled adoption across regulated banking functions are what give it a strong score.",
    timeline: [
      {
        year: "2017",
        tag: "COiN / document AI",
        text: "JPMorgan became widely associated with Contract Intelligence, using machine learning and NLP-style document analysis to reduce manual review in legal and lending workflows.",
      },
      {
        year: "2023",
        tag: "IndexGPT / advisor AI",
        text: "Public reporting described JPMorgan’s development of AI-supported investment-advice tooling under the IndexGPT name.",
      },
      {
        year: "2024",
        tag: "LLM Suite",
        text: "Formal news reporting described JPMorgan’s internal LLM Suite for employee productivity, research-style assistance, summarisation, and drafting.",
      },
      {
        year: "Ongoing",
        tag: "AI research",
        text: "JPMorgan maintains a dedicated AI research function focused on finance-specific AI, including agents and business applications.",
      },
    ],
    sources: [
      {
        label: "JPMorgan AI Research",
        href: "https://www.jpmorganchase.com/about/technology/research/ai",
      },
      {
        label: "Reuters LLM Suite",
        href: "https://www.reuters.com/technology/artificial-intelligence/jpmorgan-launches-in-house-chatbot-ai-based-research-analyst-ft-reports-2024-07-26/",
      },
    ],
  },
  {
    bank: "DBS Group",
    type: "Singapore commercial bank",
    geography: "Singapore / Asia",
    usecase: 9,
    data: 9,
    humanCapital: 9,
    governance: 9,
    disclosure: 9,
    productBreadth: 9,
    history:
      "DBS is the strongest Singapore bank in this scoring framework because its AI programme is disclosed as an earnings relevant operating system rather than a collection of implemented products. The key distinction is monetisation visibility. DBS's approach by being strongly competent in scaling its AI models, communicating regularly case breadth reviews with the government, investor and consumers, allows it to expand with consistent feedback on its data infrastructure and other formal analytics processes.",
    timeline: [
      {
        year: "2018–2021",
        tag: "AI industrialisation",
        text: "DBS built out enterprise AI foundations through data governance, model development processes, and bank-wide analytics industrialisation.",
      },
      {
        year: "2024",
        tag: "S$750M AI value",
        text: "DBS reported that data analytics and AI/ML delivered over S$750 million in economic value in 2024, more than double the previous year.",
      },
      {
        year: "2024",
        tag: "1,500+ models",
        text: "DBS disclosed more than 1,500 models across over 370 use cases, including personalised nudges to regional customers.",
      },
      {
        year: "2025",
        tag: "AI value target",
        text: "Public reporting indicated DBS expected AI economic value to exceed S$1 billion in 2025.",
      },
    ],
    sources: [
      {
        label: "DBS 2024 AI value disclosure",
        href: "https://www.dbs.com/annualreports/2024/innovating-impactful-solutions-for-customers.html",
      },
      {
        label: "DBS Annual Report 2024 PDF",
        href: "https://www.dbs.com/iwov-resources/images/investors/annual-report/dbs-annual-report-2024.pdf?pid=splitter-home-annual-report-2024",
      },
      {
        label: "Business Times DBS AI value",
        href: "https://www.businesstimes.com.sg/companies-markets/dbs-expects-economic-value-its-use-ai-exceed-s1-billion-2025",
      },
    ],
  },
];

function scoreBank(bank: BankProfile) {
  return (
    0.25 * bank.usecase +
    0.2 * bank.data +
    0.2 * bank.humanCapital +
    0.15 * bank.governance +
    0.1 * bank.disclosure +
    0.1 * bank.productBreadth
  );
}

function scoreClass(score: number) {
  if (score >= 8) return "High";
  if (score >= 6) return "Medium";
  return "Low";
}

function scoreColour(score: number) {
  if (score >= 8) return COL_HIGH;
  if (score >= 6) return COL_MED;
  return COL_LOW;
}

function ScoreBars({
  banks,
  selectedBank,
  onSelect,
}: {
  banks: BankProfile[];
  selectedBank: string;
  onSelect: (bank: string) => void;
}) {
  const sorted = [...banks].sort((a, b) => scoreBank(a) - scoreBank(b));

  const width = 920;
  const height = 260;
  const margin = { top: 22, right: 26, bottom: 82, left: 54 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const barGap = 7;
  const barWidth = innerWidth / sorted.length - barGap;

  const y = (value: number) =>
    margin.top + innerHeight - (value / 10) * innerHeight;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[860px]"
        role="img"
        aria-label="AI adoption scores by bank"
      >
        {[4, 6, 8].map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke={tick >= 6 ? COL_SEPIA_MID : COL_GRID}
              strokeDasharray={tick >= 6 ? "4 4" : "0"}
              strokeWidth={1}
            />
            <text
              x={margin.left - 10}
              y={y(tick) + 4}
              textAnchor="end"
              fontSize={10}
              fill={COL_DARK}
            >
              {tick}
            </text>
          </g>
        ))}

        <text
          x={margin.left - 38}
          y={margin.top + innerHeight / 2}
          transform={`rotate(-90 ${margin.left - 38} ${
            margin.top + innerHeight / 2
          })`}
          fontSize={11}
          fill={COL_DARK}
        >
          AI Adoption Score
        </text>

        <text
          x={width - margin.right - 120}
          y={y(8) - 7}
          fontSize={10}
          fill={COL_SEPIA_DARK}
        >
          High threshold
        </text>
        <text
          x={width - margin.right - 132}
          y={y(6) - 7}
          fontSize={10}
          fill={COL_SEPIA_MID}
        >
          Medium threshold
        </text>

        {sorted.map((bank, index) => {
          const score = scoreBank(bank);
          const x = margin.left + index * (barWidth + barGap);
          const barHeight = margin.top + innerHeight - y(score);
          const isSelected = bank.bank === selectedBank;

          return (
            <g
              key={bank.bank}
              onClick={() => onSelect(bank.bank)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={y(score)}
                width={barWidth}
                height={barHeight}
                rx={1.5}
                fill={scoreColour(score)}
                opacity={isSelected ? 1 : 0.72}
                stroke={isSelected ? COL_SEPIA_DARK : COL_WHITE}
                strokeWidth={isSelected ? 2 : 1}
              />
              <text
                x={x + barWidth / 2}
                y={height - 48}
                textAnchor="end"
                transform={`rotate(-38 ${x + barWidth / 2} ${height - 48})`}
                fontSize={9.5}
                fill={COL_DARK}
              >
                {bank.bank}
              </text>
              <text
                x={x + barWidth / 2}
                y={y(score) - 5}
                textAnchor="middle"
                fontSize={9}
                fill={COL_DARK}
              >
                {score.toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RadarChart({ bank }: { bank: BankProfile }) {
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 112;
  const angleStep = (Math.PI * 2) / DIMENSIONS.length;

  const point = (value: number, index: number) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = (value / 10) * radius;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const axisPoint = (index: number, r = radius) => {
    const angle = -Math.PI / 2 + index * angleStep;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const polygon = DIMENSIONS.map((dim, index) =>
    point(bank[dim.key], index).join(","),
  ).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto max-w-[340px]">
      {[2, 4, 6, 8, 10].map((level) => {
        const ring = DIMENSIONS.map((_, i) =>
          point(level, i).join(","),
        ).join(" ");
        return (
          <polygon
            key={level}
            points={ring}
            fill="none"
            stroke={COL_GRID}
            strokeWidth={1}
          />
        );
      })}

      {DIMENSIONS.map((dim, index) => {
        const [x2, y2] = axisPoint(index);
        const [lx, ly] = axisPoint(index, radius + 25);
        return (
          <g key={dim.key}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={COL_GRID} />
            <text
              x={lx}
              y={ly}
              textAnchor={lx < cx - 5 ? "end" : lx > cx + 5 ? "start" : "middle"}
              dominantBaseline="middle"
              fontSize={10}
              fill={COL_DARK}
            >
              {dim.label}
            </text>
          </g>
        );
      })}

      <polygon
        points={polygon}
        fill="rgba(140, 125, 128, 0.18)"
        stroke={COL_SEPIA_DARK}
        strokeWidth={2}
      />

      {DIMENSIONS.map((dim, index) => {
        const [x, y] = point(bank[dim.key], index);
        return (
          <circle
            key={dim.key}
            cx={x}
            cy={y}
            r={3.6}
            fill={COL_SEPIA_DARK}
          />
        );
      })}

      {[0, 2, 4, 6, 8, 10].map((tick) => (
        <text
          key={tick}
          x={cx + 4}
          y={cy - (tick / 10) * radius + 3}
          fontSize={8}
          fill={COL_DARK}
        >
          {tick}
        </text>
      ))}
    </svg>
  );
}

export default function AIRevaluationDashboard() {
  const [selectedBank, setSelectedBank] = useState("JPMorgan Chase");

  const bank = useMemo(
    () => BANKS.find((item) => item.bank === selectedBank) ?? BANKS[0],
    [selectedBank],
  );

  const score = scoreBank(bank);
  const classification = scoreClass(score);

  return (
    <div className="w-full bg-white text-[#4D4D4D]">
      <div className="mb-5 border-b border-[#C9CCD0] pb-4">

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-[#545454]">
          Within Singapore’s banking sector, artificial intelligence is increasingly embedded in institutional architecture through which banks manage risk, allocate capital, serve customers and improve operating productivity. Its relevance is increasingly extending beyond automation projects as AI capability now depends on the interaction between proprietary data, model infrastructure, specialist human capital and governance control. The breadth of deployment in financial products and operations are also increasingly specialised, with implementations now seeing it within fraud detection, credit assessment, transaction monitoring, customer personalisation and internal decision support. Singapore’s domestic banks have developed distinct positions within this transition across the past year years. DBS has placed particular emphasis on measuring economic value and industrialisation of AI, OCBC on integration of AI into daily operational decisions, and UOB on compliance, risk management and regional platform development. International banks operating in Singapore on the other hand, have been noted to contribute to the industrial landscape through global technology transfer, investment banking applications and enterprise scale generative AI. The resulting relationship between banking and AI is that investors should see value through the degree and regulated capability of process building rather than direct equity revaluation.</p>


      </div>


      <ScoreBars
        banks={BANKS}
        selectedBank={selectedBank}
        onSelect={setSelectedBank}
      />

      <div className="mt-7 grid gap-9 lg:grid-cols-[1.25fr_0.8fr]">
        <div>
          <label className="mb-2 block text-[11px] font-semibold text-[#4E333C]">
            Select bank
          </label>
          <select
            value={selectedBank}
            onChange={(event) => setSelectedBank(event.target.value)}
            className="h-8 w-full max-w-[280px] rounded-md border border-[#D8D0D0] bg-white px-2 text-[11px] text-[#4D4D4D] outline-none"
          >
            {BANKS.map((item) => (
              <option key={item.bank} value={item.bank}>
                {item.bank}
              </option>
            ))}
          </select>

          <div className="mt-6 grid max-w-[560px] grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-[#F8F8F8] px-4 py-4">
              <div className="text-[10px] text-[#666D7A]">Adoption score</div>
              <div className="mt-2 text-[20px] font-semibold text-[#666D7A]">
                {score.toFixed(2)}
              </div>
              <div className="mt-1 text-[8.5px] text-[#666D7A]">0–10 ordinal score</div>
            </div>
            <div className="rounded-xl bg-[#F8F8F8] px-4 py-4">
              <div className="text-[10px] text-[#666D7A]">Classification</div>
              <div className="mt-2 text-[20px] font-semibold text-[#666D7A]">
                {classification}
              </div>
              <div className="mt-1 text-[8.5px] text-[#666D7A]">High ≥ 8; Medium ≥ 6</div>
            </div>
            <div className="rounded-xl bg-[#F8F8F8] px-4 py-4">
              <div className="text-[10px] text-[#666D7A]">Institution type</div>
              <div className="mt-2 text-[13px] font-semibold leading-snug text-[#666D7A]">
                {bank.type}
              </div>
              <div className="mt-1 text-[8.5px] text-[#666D7A]">{bank.geography}</div>
            </div>
          </div>

          <h4 className="mt-9 text-[13px] font-semibold text-[#666D7A]">
            Bank AI history
          </h4>
          <p className="mt-3 max-w-3xl text-justify text-[12.5px] leading-relaxed text-[#545454]">
            {bank.history}
          </p>

          <h4 className="mt-9 text-[13px] font-semibold text-[#666D7A]">
            AI adoption timeline
          </h4>
          <div className="mt-4 space-y-3">
            {bank.timeline.map((item, index) => (
              <div key={`${item.year}-${index}`} className="flex gap-3">
                <div className="w-14 shrink-0 pt-2 text-[11px] text-[#8A8A8A]">
                  {item.year}
                </div>
                <div className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#8C7D80]" />
                <div className="flex-1 rounded-lg bg-[#F8F8F8] px-4 py-3">
                  <div className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-[#6E6163]">
                    {item.tag}
                  </div>
                  <p className="text-justify text-[10.5px] leading-relaxed text-[#545454]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h4 className="mt-8 text-[13px] font-semibold text-[#666D7A]">
            Formal sources
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {bank.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#D8D0D0] bg-white px-3 py-1.5 text-[10px] font-medium text-[#6E6163] transition-colors hover:bg-[#F8F8F8]"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-center text-[13px] font-semibold text-[#666D7A]">
            Radar Dimension Breakdown
          </h4>
          <RadarChart bank={bank} />

          <div className="mt-4 rounded-xl bg-[#F8F8F8] px-4 py-4">
            <div className="mb-3 text-[11px] font-semibold text-[#666D7A]">
              Dimension scores
            </div>
            <div className="space-y-2">
              {DIMENSIONS.map((dim) => (
                <div
                  key={dim.key}
                  className="flex items-center justify-between gap-4 text-[10.5px]"
                >
                  <span className="text-[#545454]">{dim.label}</span>
                  <span className="font-semibold text-[#6E6163]">
                    {bank[dim.key]}/10
                  </span>
                </div>
              ))}
            </div>
          </div>

       <p className="mt-3 max-w-4xl text-justify text-[8px] leading-relaxed text-[#545454]">

The Bank AI Capability Score is a constructed ordinal composite index based on two key organisational AI maturity literature. Firstly from the Multidimensional Capability Approach by Sadiq et al. (2021) and the AI Capability Assessment Model developed by Butler, Espinoza-Limón and Seppälä (2023). The governance component is further adapted to Singapore’s financial-sector context given Monetary Authority of Singapore’s FEAT Principles and Veritas assessment methodologies, together with NIST AI Risk Management Framework and Singapore’s Model AI Governance Framework. The use case deployment and product breadth reflect the range of banking applications identified in BIS assessments of AI in financial services. Public disclosure is introduced as a study specific observability proxy because comparable internal data on model inventories, expenditure, productivity and realised AI value are generally unavailable across banks. The dimension scores, aggregation weights and maturity thresholds remain researcher-defined and should therefore be interpreted as a structured screening measure rather than an externally validated or audited AI rating.

        </p>
        </div>
      </div>
    </div>
  );
}