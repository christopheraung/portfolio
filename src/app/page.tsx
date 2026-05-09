"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type Project = {
  title: string;
  description: string;
  image: string;
  status: "Active" | "Internal" | "Archived";
  statusColor: string;
  client: string;
  domain: string;
  methodologies: string[];
};

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Policies", href: "#policies" },
  { label: "Capital", href: "#capital" },
  { label: "Commodities", href: "#commodities" },
];

const EMAIL = "mhaung.2021@mse.smu.edu.sg";

const EMAIL_TEMPLATE = `To: Christopher

I would like to submit an enquiry for review.

Salutation:
Full name:
Company / Institution:
Corporate email domain:
Designation / Title:
Business function:

Enquiry classification:
[ ] Capital market research
[ ] Commodity market research
[ ] Policy impact analysis
[ ] Lecture / workshop request
[ ] Document / manuscript review
[ ] Private client engagement

Mandate / request summary:

Intended use of analysis:
[ ] Internal decision support
[ ] Academic / teaching use
[ ] Executive briefing
[ ] Investment / market monitoring
[ ] Policy / regulatory interpretation

Preferred engagement format:
[ ] Written memo
[ ] Presentation
[ ] Dataset / model review
[ ] Lecture / seminar
[ ] Exploratory call

Relevant documents or links:

Confidentiality acknowledgement:
I confirm that the information shared may be reviewed for the purpose of assessing this enquiry. I understand that further correspondence may require explicit consent and confidentiality terms.

Additional notes:
`;

const enquiryHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Portfolio enquiry — client information form"
)}&body=${encodeURIComponent(EMAIL_TEMPLATE)}`;

const policies: Project[] = [
  {
    title: "The Raga Project",
    description:
      "The Raga Project is a Tote Board funded programme supporting NPO financial autonomy through donorship retention programmes and economic frameworks to navigate Singapore's social sector. Anti-fraudulent analysis skills were also imparted onto attendees.",
    image: "/images/raga.jpeg",
    status: "Internal",
    statusColor: "bg-blue-400",
    client: "Government and Private",
    domain: "Wage, Social Work",
    methodologies: ["Time Series Analysis", "Statistical Inference", "Parameter Estimation"],
  },
  {
    title: "Female Ambition Mitigates the Wicked Problem of Declining Birthrates",
    description:
      "Singapore's resident Total Fertility Rate stood at a historic low of 0.97 in 2023, below the population replacement rate of 2.1. However, small-town evidence from the United States offers an alternate narrative to this first-world country tale.",
    image: "/images/Birth.png",
    status: "Archived",
    statusColor: "bg-orange-400",
    client: "Public",
    domain: "Domestic, Gender, Culture",
    methodologies: ["Statistical Inference", "Dynamic Modelling", "Structural Break Analysis"],
  },
  {
    title: "The Myth of Substitutionality between Social Workers and Volunteers",
    description:
      "A commentary piece dated April 18, 2017 in Today argued that low pay in the social sector was the primary issue behind poor talent retention among NPOs. This project examines whether volunteer substitution distorted the labour-market interpretation.",
    image: "/images/social.jpg",
    status: "Archived",
    statusColor: "bg-orange-400",
    client: "Government and Private",
    domain: "Wage, Social Work",
    methodologies: ["Statistical Inference", "Computational General Equilibrium"],
  },
  {
    title: "The Wicked Problem of Going Woke",
    description:
      "Modern mass media remains a powerful conduit for cultural values. Popular portrayal of hyper-assertive characters can lead younger audiences to conflate scripted behaviour with real-world norms.",
    image: "/images/mediaa.png",
    status: "Archived",
    statusColor: "bg-orange-400",
    client: "Government and Private",
    domain: "Media, Culture, Social Behaviour",
    methodologies: ["Statistical Inference", "Structural Break Analysis"],
  },
];

const capital: Project[] = [

 {
    title: "Covariant Environmental Factors in Floating Solar Capital Depreciation within ESG Investing",
    description:
      "Floating solar capital experiences additional depreciation from default environmental conditions. Physical mitigation measures are profiled as investment premiums to offset valuation loss.",
    image: "/images/solar.jpg",
    status: "Active",
    statusColor: "bg-green-400",
    client: "Private",
    domain: "Capital, Insurance, Risk",
    methodologies: ["Time Series Analysis", "Statistical Inference", "Dynamic Modelling", "Underwriting"],
  },


];

const commodities: Project[] = [
 
  {
    title: "De-meaned Inferences Paradoxically Yield Distorted Market Conclusions",
    description:
      "Postulate commentaries framed market interventions between 2018 and 2021 as inflation targeted measures when the policy was actually directed towards volatility dampening. Macro analysis revealed conclusions based on simplistic methods yield non-reflective conclusions.",
    image: "/images/ElecVolal.jpg",
    status: "Active",
    statusColor: "bg-green-500",
    client: "Government and Private",
    domain: "Policy, Market, Risk",
    methodologies: [
      "Time Series Analysis",
      "Statistical Inference",
      "Parameter Estimation",
      "Dynamic Modelling",
      "Applied Mathematics",
    ],
  },


  {
    title: "Bayesian Fourier Decomposition of Refined Oil Index",
    description:
      "Information on market exposure and behaviour are complemented using a Bayesian-Fourier parameter framework. Covariant seasonality gives additional insight into platform premiums against personal management fees.",
    image: "/images/Stpp.png",
    status: "Internal",
    statusColor: "bg-blue-400",
    client: "Private",
    domain: "Capital, Investment, Risk",
    methodologies: [
      "Time Series Analysis",
      "Statistical Inference",
      "Parameter Estimation",
      "Fourier Transformation",
      "Spectral Analysis",
    ],
  },

];

function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="mb-8 font-lora text-4xl font-bold tracking-tight text-[#1a1f2b]">
      {title}
    </h1>
  );
}

function ArrowLink({ children, href = enquiryHref }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 transition-colors hover:text-steel-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      {children}
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-auto w-full max-w-[540px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="h-52 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <h3 className="mb-3 max-w-[90%] text-[18px] font-semibold leading-snug text-gray-900">
          {project.title}
        </h3>
        <p className="mb-5 text-justify text-[12px] leading-relaxed text-gray-600">
          {project.description}
        </p>

        <div className="mb-3 flex items-center justify-between text-[13px] text-gray-600">
          <span>Referential Status</span>
          <span className="flex items-center gap-2">
            <span className={clsx("h-2 w-2 rounded-full", project.statusColor)} /> {project.status}
          </span>
        </div>

        <div className="mb-3 border-t border-gray-200" />

        <div className="space-y-1 text-[13px] text-gray-600">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Client:</span>
            <span className="text-right text-gray-700">{project.client}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-400">Domain:</span>
            <span className="text-right text-gray-700">{project.domain}</span>
          </div>
          <div>
            <p className="mb-2 text-gray-400">Methodologies:</p>
            <div className="flex flex-wrap gap-2">
              {project.methodologies.map((method) => (
                <span key={method} className="rounded-md bg-blue-950 px-3 py-0.5 text-[12px] text-white">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-2">
          <ArrowLink>Request preview</ArrowLink>
        </div>
      </div>
    </article>
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="space-y-4 text-[15px] tracking-wide">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <a href={item.href} onClick={onNavigate} className="hover:text-bluebrand-800">
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a href={enquiryHref} onClick={onNavigate} className="hover:text-bluebrand-800">
          Enquiry Form
        </a>
      </li>
    </ul>
  );
}

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const wrapperClass = useMemo(
    () => clsx("flex min-h-screen bg-white text-gray-800 transition-opacity duration-1000", fadeIn ? "opacity-100" : "opacity-0"),
    [fadeIn]
  );

  return (
    <div className={wrapperClass}>
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed left-6 top-22 z-50 rounded-md bg-[#1b1e27] px-2 py-1 text-xs text-white shadow-lg md:hidden"
      >
        Solutions
      </button>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-[#1b1e27] p-6 text-gray-200 transition-transform duration-300 md:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button onClick={() => setMenuOpen(false)} className="mb-6 text-sm text-gray-400 hover:text-white">
          Close ✕
        </button>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
      </aside>

      <nav className="fixed left-0 top-[2.5rem] hidden h-[calc(100%-2.5rem)] w-44 border-r border-bluebrand-200 bg-bluebrand-100 py-38.5 pl-9 pr-4 text-bluebrand-700 md:block">
        <div className="mt-12">
          <Sidebar />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl flex-1 px-6 py-20 sm:px-10 md:ml-44 md:px-24">
        <section id="about" className="mb-32 pt-10">
          <h1 className="mb-8 font-lora text-5xl font-bold tracking-tight text-[#1a1f2b]">
            Christopher Lee
          </h1>
          <h2 className="mb-1 text-3xl font-semibold text-[#3b465c]">Senior Economist</h2>
          <h3 className="mb-6 text-[18px] text-gray-400">Commodity Econometrician</h3>
          <p className="mb-5 text-justify text-[15px] leading-relaxed">
            Christopher is a professional econometrician specialising in commodity market and capital valuation analysis. His portfolio has supported C-suit executives through policy implementations and analysts through market behaviour. Autonomous and private universities also contact him for modules in quantitative economics and applied statistics.
          </p>

          <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:gap-7">
            <a
              href={enquiryHref}
              className="rounded-lg border border-steel-500 px-5 py-1.5 text-[14px] font-medium text-steel-500 transition-colors hover:bg-gray-100"
            >
              Enquiries
            </a>
          </div>
        </section>


<section id="research" className="mb-32 w-full max-w-5xl pt-0">
  <SectionTitle title="Research" />

  <details className="group border-b border-gray-200 py-6">
    
    <summary className="cursor-pointer list-none">
      
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#1a1f2b]">
            Hidden Markov Regimes in Electricity Demand
          </h2>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
            A regime-switching research interface designed to identify latent
            structural demand states within Singapore’s electricity system.
            The framework profiles persistence, conditional volatility, and
            transition behaviour in aggregate electricity demand to study
            national grid stress conditions and long-run electricity usage
            trajectories.
          </p>
        </div>

        <span className="ml-6 text-xl transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </div>
      
    </summary>

    <div className="mt-6 space-y-5">
      
      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        This custom research interface deploys a Hidden Markov Model on aggregate
        electricity demand in Singapore to identify latent regimes. These regimes
        are proposed auxiliary states that serve two time-based purposes. In the
        short run, it seeks to identify both the magnitude and propensity of
        additional stress on the national grid. In the long run, it aids in
        determining electricity usage trajectories to evaluate and diversify
        electricity generation investment.
      </p>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        The interface below is constructed using a Hidden Markov regime-switching
        model algorithm. Latent regimes are profiled based on the conditional
        mean, variance, and persistence of extracted trends in electricity demand.
        A transition probability matrix is also deployed to support immediate
        market behaviour analysis.
      </p>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <iframe
          src="https://christopherleeaung.shinyapps.io/DemandHMM/"
          title="Demand HMM Shiny Research Interface"
          className="h-[780px] w-full"
        />
      </div>
    </div>
  </details>
</section>


        <section id="policies" className="w-full max-w-5xl pt-0">
          <SectionTitle title="Policies" />
          <ProjectGrid projects={policies} />
        </section>

        <section id="capital" className="mt-24 w-full max-w-5xl pt-0">
          <SectionTitle title="Capital" />
          <ProjectGrid projects={capital} />
        </section>

        <section id="commodities" className="mt-24 w-full max-w-5xl pt-0">
          <SectionTitle title="Commodities" />
          <ProjectGrid projects={commodities} />
        </section>

      </main>
    </div>
  );
}
