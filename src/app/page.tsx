"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { BlockMath } from "react-katex";
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

const EMAIL_TEMPLATE = `

Salutation:
Preferred name:
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
const [hmmTab, setHmmTab] = useState<
  "demand" | "methodology" | "application"
>("demand");

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
  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a1f2b]">
          Hidden Markov Regimes in Singapore's Electricity Demand
        </h2>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Investigating commodity demand is conventionally undertaken by studying market prices. However in electricity markets, direct analysis of demand is more practical given its isolation of consumer utility from spot price factors. But this approach reduces analysis to a single metric, presenting market study as a balance between demand relevant information captured in price indexes but distorted by financial noise, or strictly relevant but incomplete information encapsulated in demand load. To address this limitation, a latent-state framework is introduced opposed to further price index decomposition methodologies to identify hidden structural demand regimes.

</p>

      </div>

      <span className="ml-6 text-xl transition-transform duration-500 ease-out group-open:rotate-45">
        +
      </span>
    </div>
  </summary>
<div className="grid grid-rows-[0fr] transition-all duration-700 ease-out group-open:grid-rows-[1fr]">
  <div className="overflow-hidden">

    <div className="mt-6 opacity-0 translate-y-3 transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0">

{/* TABS */}
<div className="mb-6 flex gap-8 border-b border-gray-200">

  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setHmmTab("demand");
    }}
    className={`pb-2 text-[13px] font-medium transition-all duration-300 ${
      hmmTab === "demand"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
    Electricity Demand
  </button>

  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setHmmTab("methodology");
    }}
    className={`pb-2 text-[13px] font-medium transition-all duration-300 ${
      hmmTab === "methodology"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
    Methodology
  </button>

  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setHmmTab("application");
    }}
    className={`pb-2 text-[13px] font-medium transition-all duration-300 ${
      hmmTab === "application"
        ? "border-b-2 border-blue-950 text-blue-950"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
    Modelling the Demand Collapse of Late 2021
  </button>

</div>

<div className="relative min-h-[400px]">

  {/* DEMAND TAB */}
  <div
    className={`transition-all duration-500 ease-in-out ${
      hmmTab === "demand"
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`}
  >
    <div className="space-y-5">

      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Aggregate Demand and Latent States
      </h2>


<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

In this approach, demand influence in spot prices is hypothesised to be exerted by the same hidden structural regimes responsible for demand behaviour. This implies superficial observances of statistical parameters contain relevant but incomplete information. Demand behaviour now does not rely on a set of assumptions indicating observations have to manifest based on some network of parametric processes reflective of consumer demand and logistical constraints, as typically so in conventional index analysis, but instead stem from unobserved states characterised by trend persistence, variance, and structural behaviour for example. 
</p>

      <img
        src="/images/compare.png"
        alt="Hidden Markov and traditional comparison"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Observably the approaches to identify regimes, or any auxiliary measure of behavioural state, is different. In traditional methods, its reliance on translating observed values literally will always result in regimes strictly defined parameter value boundaries. These measures are revenant information, but still considerably incomplete as they can at most frame observed values as posteriors, indicating some conditionality within their model. This is opposed to latent state modelling where observed prices are conditional on a multitude of the same set, not necessarily the same, observable parameters, revealing why similar values may not come from the same regime. This framework proposes a less "fatalistic" approach towards profiling prices and more importantly their trajectory.
</p>


      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Historic Performance of Conventional Modelling
      </h2>


<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Limitations of conventional modelling were particularly pronounced during periods of dramatic market stress. Multiple decompositional and forecasting efforts to utilise observable variables insufficiently characterised structural instability to yield practical simulations to anticipate market stress. During 2021's global energy crunch, industry analysts were overly zealous to predict both forecasted demand and USEP using observed behaviour from previous times of market stress. The key dates to take note of were the 19th of October 2021, when EMA released an official announcement encouraging all market participants to undertake necessary preparations to ensure undisrupted supply of electricity following anticipated stress on the national grid coming December 2021 onwards. The press release stated to check in again on the 31st of March 2022 should the monitored preparations be deemed insufficient. It must be noted that the Authority was already actively engaging with market participants at least 2 months prior to October 2021.

</p>

     <img
        src="/images/38.png"
        alt="Monte Carlo USEP"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />


<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Source: Author using R Studio. Data from National Electricity Market Singapore, USEP 2021 to 2022
</p>

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Observably even with more competent frameworks that deploy Bayesian bootstrapped trained Monte Carlo simulations opposed to either parametric Monte Carlo or even SARIMA based exponential smoothing yield impractical forecasts. Despite installing robust confidence intervals, there were still volatility spikes and path trajectories that were unaccounted for.
</p>

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">


There was impression that therefore such frameworks would instead perform better with data exhibiting strong seasonality with relatively predictable cycles. The case of having relevant but insufficient information when subjected to market expectations becomes paradoxically more pronounced here. 

</p>

     <img
        src="/images/39.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Source: Author using R Studio. Data from National Electricity Market Singapore, Demand 2021 to 2022
</p>


<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Seemingly the incomplete information becomes a strong issue when identifying projected behaviour given no conditional information. This means a competent model must already have some information that it can use as a proxy to model future market behaviour. This means various methodologies that seek to decompose information based on a single index are not erroneous nor limited, but should instead be deployed for other forms of research and analysis. Consider a regular SARIMA Based Projection for Demand.
 
</p>

     <img
        src="/images/40.png"
        alt="SARIMA Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Source: Author using R Studio. Data from National Electricity Market Singapore, Demand 2021 to 2022
</p>

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

While it still cannot account for periods of high volatility nor anticipate periods of increased usage, it has performed relatively better than Monte Carlo based simulations. It still however has failed to address the initial objective of identifying future likelihood of increased load stress since its projections do not account for market stress. 
</p>

     <img
        src="/images/41.png"
        alt="SARIMA Bootstrapped USEP"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Source: Author using R Studio. Data from National Electricity Market Singapore, USEP 2021 to 2022
</p>


<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
Again, reapplying this model with bootstrapped specifications to account for future volatility and stress periods show a highly impractical trajectory. The problem of balancing between using incomplete but relevant information continues to persist. In this case explicitly, almost full utility of incomplete information has been deployed, presenting a classical overfit trajectory. 
</p>

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
Conclusively informational structure of underlying data opposed to decompositional complexity is key to producing competent forecasting models, particularly for future states with no priors to provide fitting posteriors. Even then, a single index regardless its decomposition can only reflect realised market behaviour that remains fundamentally constrained by the past itself. Increasing model complexity does not resolve this issue and instead amplifies instability through overfitting.

</p>

</div>
</div>

  {/* METHODOLOGY TAB */}
  <div
    className={`transition-all duration-500 ease-in-out ${
      hmmTab === "methodology"
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`}
  >
    <div className="space-y-5">

      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        The Framework
      </h2>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        The Hidden Markov framework separates observed electricity demand from
        latent structural states. Observable demand acts as an emission process,
        while the hidden state sequence evolves through transition
        probabilities estimated across time.
      </p>

      <img
        src="/images/HiddenMarkov.png"
        alt="Hidden Markov and Markov chain comparison"
        className="my-5 mr-auto w-full max-w-[550px] object-contain"
      />

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        Unlike conventional Markov chains where observable values themselves
        transition directly, Hidden Markov Models infer an underlying latent
        regime responsible for generating observations. The observed demand
        series therefore becomes a probabilistic reflection of structural
        market conditions rather than a directly classified regime process.
      </p>

      <img
        src="/images/c1.png"
        alt="Latent transition illustration"
        className="my-5 mr-auto w-full max-w-[355px] object-contain"
      />

      <div className="rounded-xl bg-gray-50 p-4 text-[12.5px] leading-relaxed text-gray-700">
        <BlockMath math={"P(S_t = j \\mid S_{t-1} = i) = p_{ij}"} />
        <BlockMath math={"y_t \\sim F(\\theta_{S_t})"} />
        <BlockMath math={"y_t = \\mu_{S_t} + \\epsilon_t"} />
        <BlockMath math={"\\sum_{j=1}^{K} p_{ij} = 1"} />
      </div>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        High diagonal transition probabilities imply persistent regimes, while
        lower diagonal values imply greater transition instability. The model
        therefore estimates how likely demand behaviour remains structurally
        persistent under changing market conditions.
      </p>

    </div>
  </div>

  {/* APPLICATION TAB */}
  <div
    className={`transition-all duration-500 ease-in-out ${
      hmmTab === "application"
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`}
  >
    <div className="space-y-5">

      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Live Application Example
      </h2>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
        The interactive interface below applies Hidden Markov regime detection
        onto Singapore electricity demand data. The framework estimates latent
        states, transition persistence, conditional volatility, and regime
        probabilities across the observed time series.
      </p>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <iframe
          src="https://christopherleeaung.shinyapps.io/DemandHMM/"
          title="Demand HMM Shiny Research Interface"
          className="h-[780px] w-full"
        />
      </div>

    </div>
  </div>

</div>

    </div>
  </div>
</div>
</details>

<details className="group border-b border-gray-200 py-6">
  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a1f2b]">
          BEAST Point Detection and Decomposition of the USEP
        </h2>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
          The Bayesian Estimator of Abrupt change, Seasonality and Trend
          decomposes USEP into trend, seasonal, and abrupt-change components.
          Its objective is to estimate how many structural breaks exist, when
          they occur, and how much posterior probability supports each detected
          breakpoint.
        </p>
      </div>

      <span className="ml-6 text-xl transition-transform duration-500 ease-out group-open:rotate-45">
        +
      </span>
    </div>
  </summary>

  <div className="grid grid-rows-[0fr] transition-all duration-700 ease-out group-open:grid-rows-[1fr]">
    <div className="overflow-hidden">
      <div className="mt-6 space-y-5 opacity-0 translate-y-3 transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0">

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          This research interface applies BEAST to daily mean or median USEP
          values in order to detect probabilistic structural changes in
          Singapore’s wholesale electricity price series. BEAST is useful for
          identifying breakpoints, structural breaks, joinpoints, regime shifts,
          nonlinear trend changes, seasonal shifts, and abnormal price movements.
          The algorithm was introduced by Zhao et al. in 2019 as a Bayesian
          ensemble decomposition framework.
        </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          The central problem BEAST addresses is model uncertainty. Traditional
          decomposition or changepoint methods often force the analyst to select
          one preferred model specification. BEAST instead uses Bayesian model
          averaging, estimating many competing decompositions and weighting them
          by posterior plausibility. This produces not only a detected break
          date, but also a probability that a structural change exists at each
          point in time.
        </p>

        <div className="rounded-xl bg-gray-50 p-4 text-[12.5px] leading-relaxed text-gray-700">
          <p>yₜ = Tₜ + Sₜ + εₜ</p>
          <p className="mt-2">Tₜ = piecewise trend component</p>
          <p>Sₜ = seasonal or cyclic component</p>
          <p>εₜ = irregular residual component</p>
          <p className="mt-2">P(change at time t | y₁, ..., yₙ) = posterior changepoint probability</p>
        </div>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          In this interface, the probability threshold controls how strongly the
          posterior evidence must support a breakpoint before it is treated as a
          detected regime change. A lower threshold is more exploratory and will
          identify more candidate breaks. A higher threshold is more conservative
          and retains only breaks with stronger posterior support. The threshold
          should therefore be interpreted as an inspection rule, not as an
          objective truth boundary.
        </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          Applied to USEP, BEAST helps distinguish temporary price volatility
          from structural change in the wholesale electricity market. This is
          important because electricity price indexes can move sharply due to
          transient demand shocks, fuel-cost pressure, reserve scarcity, generator
          outages, or policy interventions. A decomposition framework helps
          identify whether observed USEP movements are short-lived irregular
          deviations or persistent changes in the underlying price process.
        </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          For energy capital valuation, the BEAST output can inform both timing
          and scale. If posterior break probabilities cluster around periods of
          sustained price elevation, this may indicate a stronger case for
          generation, storage, hedging, or grid-support investment. If breaks are
          weak or short-lived, the valuation case may favour flexible operating
          responses rather than large irreversible capital deployment. The
          interface therefore converts USEP time-series behaviour into an
          investment signal: when structural pricing pressure appears, whether it
          is persistent, and how much capital exposure may be justified.
        </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          Methodologically, the framework follows Zhao et al.’s BEAST algorithm,
          which decomposes time series through Bayesian model averaging, and the
          Rbeast implementation, which extends the method for practical
          changepoint, seasonality, trend, and anomaly detection workflows.
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <iframe
            src="https://christopherleeaung.shinyapps.io/BeastR/"
            title="BEAST USEP Shiny Research Interface"
            className="h-[780px] w-full"
          />
        </div>
      </div>
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
