"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { InlineMath } from "react-katex";
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

type HmmTab = "demand" | "standard" | "methodology" | "application" | "forecast";
type ForecastTab = "bayesian_mc" | "bayesian_sarima" | "indusover";

const HMM_TABS: { value: HmmTab; label: string }[] = [
  { value: "demand", label: "Understanding Demand" },
  { value: "standard", label: "Standard Modelling" },
  { value: "methodology", label: "Methodology" },
  { value: "application", label: "Latent States in Demand" },
  { value: "forecast", label: " " },
];

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
          loading="lazy"
          decoding="async"
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

  const [hmmTab, setHmmTab] = useState<HmmTab>("demand");
  const [forecastTab, setForecastTab] = useState<ForecastTab>("bayesian_mc");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const wrapperClass = useMemo(
    () =>
      clsx(
        "min-h-screen bg-white text-gray-700 transition-opacity duration-700",
        fadeIn ? "opacity-100" : "opacity-0"
      ),
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
            Christopher is a professional econometrician specialising in commodity market and capital valuation analysis. His portfolio has supported C-suit executives through policy implementations and analysts through market behaviour. Autonomous and private universities engage him to lecture modules in quantitative economics and applied econometrics.
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

During the second half of 2021, Singapore was recovering from both impact and constraint measures of the COVID-19 pandemic. Higher than anticipated market volatility which resulting in six electricity retailers exiting the market prompted urgent intervention from the Electricity Market Authority (EMA). Part of this intervention saw active and committed dialogues undertaken by the authority to communicate with all market participants to assess, evaluate and prepare themselves for an uncertain environment going into 2022. This saw many market participants engage in demand forecasting using both traditional and novel approaches, among which identifying latent states was particularly promising.
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
<div className="mb-6 flex gap-8 overflow-x-auto border-b border-gray-200">
  {HMM_TABS.map((tab) => (
    <button
      key={tab.value}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setHmmTab(tab.value);
      }}
      className={`pb-2 text-[13px] font-medium transition-all duration-300 ${
        hmmTab === tab.value
          ? "border-b-2 border-blue-950 text-blue-950"
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {tab.label}
    </button>
  ))}
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
        Key Shortcoming of Parameter Defined State Profiles 
      </h2>


<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Market demand states are conventionally inferred through the behaviour of inferential statistics. For instance, periods exhibiting low volatility and mean reverting behaviour are commonly interpreted as stable market phases. While practical for quick inspection, this approach is insufficient to serve as both an inferential and diagnostic framework. This is because calculated inferred statistics are considered to be posterior elements with observations as priors, presenting the exercise of identifying and defining market phase transitions in real time to be highly susceptible to both type I and type II errors. 

</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Consider this quick set up. Suppose in a market all index observations are strictly positive and defined to belong to the set

{" "}
  <InlineMath math="Y: \{y_i \}^{N}_{i=1}." /> 
{" "}

Let these prices be arranged by their valuation such that two subsets representing low observations and high observations be formed such that

{" "}
  <InlineMath math="\gamma_L \cup \gamma_H = Y." /> 
{" "}

At time period 

{" "}
  <InlineMath math="t," /> 
{" "}

a set of observed values is taken to exist from 


{" "}
  <InlineMath math="Y" /> 
{" "}

in a manner 

{" "}
  <InlineMath math="O_{t}:[y_a,y_b]" /> 
{" "}

and

{" "}
  <InlineMath math="O_{t+1}:[y_c,y_d]." /> 
{" "}

Their boundaries are taken to overlap because 

{" "}
  <InlineMath math="y_c < y_b." /> 
{" "}

Now assume that a stable market phase exists and for simplicity, it is defined by the parameter 


{" "}
  <InlineMath math="\theta_t" /> 
{" "}

with some empirical distribution defined by parameters betas in the manner 

{" "}
  <InlineMath math="\theta_t \sim \mathcal{f}_t (\beta_{t,i}, \beta_{t,j})." /> 
{" "}

Now suppose another set of observations have occurred at time period

{" "}
  <InlineMath math="t+1" /> 
{" "}

with an empirical distribution defined by parameters betas in the manner 

{" "}
  <InlineMath math="\theta_{t+1} \sim \mathcal{f}_{t+1} (\beta_{t+1,i}, \beta_{t+1,j})." /> 
{" "}

How valid would these two distributions be to serve as posterior inferences to inspect if the market has entered a new state when an observed index of value

{" "}
  <InlineMath math="y^*" /> 
{" "}

with likelihood 

{" "}
  <InlineMath math="P(y^*)" /> 
{" "}

has occurred?
</p>

      <img
        loading="lazy"
        decoding="async"
        src="/images/52.png"
        alt="Bayesian review of index identification"
        className="my-5 mx-auto w-full max-w-[600px] object-contain"
      />

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

In this simple example, it can be seen that inspecting 

{" "}
  <InlineMath math="y^*" /> 
{" "}

's state membership will produce different answers depending on which prior 

{" "}
  <InlineMath math=" O_k" /> 
{" "}

it conditions itself on as

{" "}
  <InlineMath math="P(y^* \mid O_t) \neq P(y^* \mid O_{t+1})." /> 
{" "}

Again, in this simple example this is so because each market state is defined by observable parametric 

{" "}
  <InlineMath math="\theta_t" /> 
{" "}

or

{" "}
  <InlineMath math="\theta_{t+1}" /> 
{" "}

for this matter. As such, the key shortcoming is that regime identification is entirely dependent on arbitrarily defined parameter boundaries. 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Because even in this simplified example, should all observations across 

{" "}
  <InlineMath math="t,t+1" /> 
{" "}

be grouped together then there is definite conclusion that no regime change has happened; and corresponding if observations were placed into further fragmented subsets 

{" "}
  <InlineMath math="t-k, \cdots, t, t+1, \cdots ,t+j," /> 
{" "}

then regime change would conclusively have occurred. 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
As such when such market states are incorporated into both market decompositional and forecasting algorithms, resulting trajectories and conclusions on the market are strongly susceptible to bias.
</p>


      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Electricity Demand in Singapore
      </h2>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Singapore's electricity market can superficially seem to exhibit relatively well defined seasonality and trends, giving impression that strict parameter boundaries can serve as competent settings for profile states. However annual time series decompositions yield statistical differences to exist, highlighting the inappropriateness of relying on historical parameter boundaries for state analysis. This was particularly evident for demand behaviour across 2021 and 2022.
</p>

      <img
        loading="lazy"
        decoding="async"
        src="/images/01a.png"
        alt="Electricity Demand Time Series Decompositions"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Overviewing the Singapore Electricity Market based on its Spot Price Index, (USEP) from 2021 to 2022. Data from National Electricity Market, USEP 2021 and 2022. Output Source: Author 
</p>



<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
During this post pandemic market stress period, market participants were strongly pressured by both EMA and each other to undertake responsible market profiling. The primary objective was to ensure appropriate, market participant nature respective measurements could be undertaken based on their personal profiling. For example, if the participant was a Genco, then forecasting demand to ensure supply remains undisrupted without wild market spot prices was an objective. Alternatively, if the participant was an electricity retailer, then forecasting demand to ensure adequate supply scheduling was an objective. </p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
By mid 2021, it was evident that utilising market behaviour from 2020 or even earlier LNG shock periods to filter data for simulating 2022 was insufficient. This was primarily owing to an inherently different market structure inferred from the degree of market liberalisation. However this was not evident to many market participants primarily on two grounds. First, there was conviction that truncated market data when treated as historical priors rather than market data as a whole would be sufficient to model future uncertainty. Secondly, existing seasonality and trends have to continue in a statistically indifferent manner as no economic expansion can occur post Covid-19; electricity demand in Singapore is strongly related to economic activity rather than consumption. </p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
From observable parameters visualised by the histograms above, it can be deduced why these assumptions remained unexamined; with no observable superficial differences in distributions and notable structural breaks during uncertainty, undertaking conditional modelling would have been sufficient. 

</p>

      <img
        loading="lazy"
        decoding="async"
        src="/images/02.png"
        alt="Statistical Tests inferring similarity between 2021 and 2022 Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Overviewing the Singapore Electricity Market based on its Spot Price Index, (USEP) from 2021 to 2022. Data from National Electricity Market, USEP 2021 and 2022. Output Source: Author 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Formal statistical decompositions however present no statistical similarity between the years on hindsight. The Kolmogorov-Smirnov (KS) test to inspect differences in non-parametric distributions through vertical differences, the Wilcoxon test to identify differences in non-parametric distributions through data rank and a superficial median split comparison test to identify proportions of data above and below the respective medians present conclusively evidence that statistically significant differences exists between the two years' distributional structures. This implies 2022's anticipated demand modelled using either truncated stress behaviour or overall historical behaviour, can only yield technical and recursive forecasts which at best incorporate market exogenous factors. 
</p>




</div>
</div>




  {/* STANDARD TAB */}
  <div
    className={`transition-all duration-500 ease-in-out ${
      hmmTab === "standard"
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`}
  >
    <div className="space-y-5">





      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Conventional Stress Demand Modelling in 2021 for 2022
      </h2>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
When EMA was preparing to undertake national wide level interventions to ensure electricity supply remains undisrupted, it conducted regular consultations with both market participants and auditing consultants to gauge market conditions. This saw an official press release published on 19th October 2021 urging all relevant parties to undertake necessary measures to mitigate potentially erratic market demand. A follow up was scheduled on 31st March 2022 to evaluate if market participants independent measures undertaken were sufficient or relevant. In between this period, many industry analysts and commentators produced forecasting models for both demand and market spot price. </p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

While a large class of these models were built on either linear modelling or multi-variate regressions, for the purpose of comparing similar algorithms, only time series models that incorporated machine learning to fine tune their parameters are discussed. As such, the author will be presenting a template algorithm that is his own summary, personally tuned with modifications based on what he felt were better practices. There are two general models that cover these approaches; one to represent classical statistical models fine tuned with machine learning, and another to represent neural network algorithm based models. 
</p>





{/* SECONDARY MODELLING TABS */}
<div className="mt-5 mb-5 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">


 <button
    type="button"
    onClick={() => setForecastTab("indusover")}
    className={`rounded-full px-4 py-1.5 text-[11.5px] transition-all duration-300 ${
      forecastTab === "indusover"
        ? "bg-blue-950 text-white shadow-sm"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
    Industry Models Overview
  </button>


  <button
    type="button"
    onClick={() => setForecastTab("bayesian_mc")}
    className={`rounded-full px-4 py-1.5 text-[11.5px] transition-all duration-300 ${
      forecastTab === "bayesian_mc"
        ? "bg-blue-950 text-white shadow-sm"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
   SARIMA Modelling
  </button>

  <button
    type="button"
    onClick={() => setForecastTab("bayesian_sarima")}
    className={`rounded-full px-4 py-1.5 text-[11.5px] transition-all duration-300 ${
      forecastTab === "bayesian_sarima"
        ? "bg-blue-950 text-white shadow-sm"
        : "text-gray-500 hover:text-gray-800"
    }`}
  >
    TSF Modelling
  </button>

</div>

{/* BAYESIAN MONTE CARLO */}
{forecastTab === "bayesian_mc" && (

  <div className="space-y-4 animate-fadeIn">

      <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
        Bayesian filtering training data for bootstrapping 
      </h2>

     <img
        loading="lazy"
        decoding="async"
        src="/images/BayeP.png"
        alt="Monte Carlo Demand"
        className="my-5 mx-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
As a baseline example, consider some time series of demand. Let Event A be the event where observable demand remains above 6000 MW, and hence any demand that is 6000 MW or below will be Event -A. Let Event B be demand reaching above 6500 MW. As such only high prices given sustained high demand from previous time periods will be used to train stressful periods in the market. This means spikes are not periodic nor temporal, but conditional on the extend demand has "dipped" in its seasonal low. In this quick example,

{" "}
  <InlineMath math="P(B \mid A)" /> 
{" "}


is utilised to bootstrap stressed demand. This gives a set up for Monte Carlo simulations to not base trajectory on the entirety of observed behaviour but only on how the market may look if stressful conditions persist and grow.
</p>




      <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
Monte Carlo Simulations from XGBoost Residual tuned Bayesian SARIMA baseline model
      </h2>
     <img
        loading="lazy"
        decoding="async"
        src="/images/39.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />


     <img
        loading="lazy"
        decoding="async"
        src="/images/SARIMA.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Monte Carlo Simulations based on bootstrapped Bayesian filtered data trained SARIMA for stressful market projection. Data from National Electricity Market Singapore, Demand 2021 to 2022. Output source: Author
</p>  


<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

The standard SARIMA framework demonstrated an overall competent forecast, achieving low RMSE 199.743 with MAE 123.643 and n impressive analytical interval coverage rate of 95.7%. Seemingly the model successfully captured key characteristics of underlying demand, notably inferred by a low MAPE of 1.94% indicating produced trajectory was stable. SARIMA’s diagnosis of (0,1,1)[7] indicates regardless the degree of stress experienced by market demand, it will still reflect the regular oscillatory structure observed through historical demand. 

</p>

     <img
        loading="lazy"
        decoding="async"
        src="/images/SARIP.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Key points of less competent forecasting are highlighted when historical demand was noted to transit across different volatility regimes. Between May 2022 and September 2022, projections persistently underpredicted realised demand spikes, particularly during abrupt deviations associated with high volatility. This reflects the previously highlighted structural limitation of determining market states through observable parameter bounds regardless their technical fine tuning; SARIMA can only extrapolate and undertake profiling future states from historically stable autocorrelation structures and assumes all behaviour will eventually revert towards seasonal means. This also explains why variance from October 2022 to January 2023, the framework began to overpredict realised demand levels. Collectively this otherwise strongly powerful trait is why SARIMA models must be adapted further to anticipate abrupt and symmetric volatility shifts by incorporating nonlinear or additional state dependent correction mechanisms.

</p>

  </div>


)}



{/* BAYESIAN ML SARIMA */}
{forecastTab === "bayesian_sarima" && (

  <div className="space-y-4 animate-fadeIn">

      <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
        Paradox in treating data for TimesFM
      </h2>

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

It was surprising to note that a Bayesian treated TimesFM model based Monte Carlo simulations did not perform better than a non-treated TimesFM base. While some aspects of uncertainty calibration were noticeably better, the regular model was noticeably stronger regarding point forecast accuracy.

</p>

     <img
        loading="lazy"
        decoding="async"
        src="/images/timesB.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

     <img
        loading="lazy"
        decoding="async"
        src="/images/timesT.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />


<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

The weaker performance of the Bayesian treated TimesFM model likely arises from Bayesian processes interfering and altering otherwise well captured structural properties of the demand process. Demand behaviour is dominated by strong deterministic seasonality and persistent cyclical behaviour which the original TimesFM algorithm already captures through directly learned temporal embeddings and autoregressive attention mechanisms. Seemingly introducing a Bayesian intervention is unwarranted as it forced stressed information into the model, possible forcing an overfit. The result is having an additional Bayesian layer act more as a variance smoothing filter than an informational one. This explains why the Bayesian model exhibits higher residual variance, RMSE, and MAE despite wider predictive intervals.

</p>

     <img
        loading="lazy"
        decoding="async"
        src="/images/timesraw.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

     <img
        loading="lazy"
        decoding="async"
        src="/images/timeswell.png"
        alt="Monte Carlo Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Comparatively, the Bayesian treated model performs better only in interval estimation. Producing a wider interval with an average width 616.654 compared to 401.521, it indicates processing data using a Bayesian filter simply expands its forecast band to mask unanticipated variance. Regarding coverage rate, the Bayesian treated model boasts 78.90% underperforming the original model's 80.82%. Residual diagnostics also highlight the Bayesian model to systematically underpredict while the original model has a negative mean error of −92.919 suggesting overprediction instead. 
</p>






  </div>


)}

{/* Industry Overview */}
{forecastTab === "indusover" && (

  <div className="space-y-4 animate-fadeIn">


      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Monte Carlos of Linear, Multi-linear, SARIMA Models

</h2>

      <img
        loading="lazy"
        decoding="async"
        src="/images/13.png"
        alt="Statistical Tests inferring similarity between 2021 and 2022 Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">
Individual Monte Carlo simulated paths expanding MSE against realised historical demand. Data from National Electricity Market, USEP 2021 and 2022. Output Source: Author 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
It was interesting to note some market participants preferred models that affirmed anxious outlook over certain risk. The author notes smaller industry players preferred adopting this strongly risk averse behaviour. It hints the prospect of being assessed by a market authority which determines future market participation motivates agents to undertake costlier preparations for worst case scenarios opposed to taking less expensive measures for more likely, less drastic outcomes. It is possible that without such an authority, certain agents would have incentive to undertake less expensive actions to hedge risk over long term market participation. Reviewing cumulative forecasts affirmed "doomsday" forecasting; while a majority of models did model demand relatively competently, the assumption that unregulated USEP would cause a recursive feedback loop that would contribute to even more erratic demand. The projections while not good measures of forecasts, however do capture market sentiment accurately that if demand remained characteristically indifferent, erratic market spot prices will influence economic behaviour which in turn influences demand. 
</p>



<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

A review of resulting MSE when comparing doomsday Monte Carlo models against historical data affirms this. The poor accuracy of overall fatalistic predictions is reflected the eventual stabilising MSE values, albeit extremely high levels, reflecting the models' inability to re-correct itself in the absence of past data where the market endogenously fixes itself. A decreasing gradient of noticeable models form a surprisingly even more fatalistic set of projections, again more telling of individual agent's risk appraisal rather than technical competency. 
</p>

      <img
        loading="lazy"
        decoding="async"
        src="/images/22a.png"
        alt="Statistical Tests inferring similarity between 2021 and 2022 Demand"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">
Evaluation of Aggregate Monte Carlo simulated paths against realised historical demand. Data from National Electricity Market, USEP 2021 and 2022. Output Source: Author 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Observably even with supposed "realistic" projections of how erratic the market would behave in the short run (approximately 6 months forward), the models' mean projections began faltering from February 2022 onwards, with Median performance consistently faring poorly from the start. It seems a more nuanced understanding of why certain market participants find value in these projections can be uncovered through variance projections. The progressive tighter intervals, albeit deducible only in hindsight, give indication that perhaps market participants are not seeking doomsday predictions for the sake of it, but perhaps they have see personal inside information being reflected in other models not of their own. Collectively if all agents undertake this approach, the rational on why market participants preferring paranoid predictions can be framed as a coincidentally collative decision rather than a mass self affirming attitude. 
</p>

  </div>


)}

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

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Conventional market modelling used to profile market structures can be generalised into two broad classes. The first class utilises directly observable parameters such as mean, variance, and autocorrelation structures to determine foundational structures such as SARIMA before building subsequent frameworks. The second group utilises decomposed or transformed components of observed data obtained through statistical filtering procedures such as Bayesian filtering or spectral decomposition to construct analytical frameworks such as multi-variate regression. Competent econometric models rely some combination or permutation of inter and intra interactions between these classes; for example a Bayesian filtered SARIMA framework to estimate underlying market spot price trends can be complemented by a spectrally decomposed spot prices prior to regular regression to estimate seasonality. Often the need for cross domain frameworks owes to models struggling with frequency misaligning when handling diverse frequency combinations (Zhao, Lai & Mo, 2025). 

</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
While these frameworks are highly competent, they utility is 

 is found in its general assumption that observable market behaviour sufficiently represents underlying market states. Hidden-state frameworks depart from this assumption by distinguishing between observable outcomes and the latent mechanisms generating them. Rather than treating observations as direct representations of market structure, Hidden Markov Models (HMMs) treat observations as probabilistic manifestations of unobserved regimes.

</p>

<p className="text-justify text-[8px] leading-relaxed text-gray-600">
Zhao, Q., Lai, F., & Mo, X. (2025). Exploring time series analysis in frequency domain with complex-valued spectral attention and bidirectional variable mamba. Journal of Supercomputing, 81(8). https://doi.org/10.1007/s11227-025-07277-9
</p>

      <img
        loading="lazy"
        decoding="async"
        src="/images/over.png"
        alt="Hidden Markov and traditional comparison"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">
Source: Author 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Applying this framework in practise to demand, it means observable parameters are used to estimate the existence of latent states. This means depending on the underlying behaviour of identified parameters, similarly valued observations can be profiled from different latent states. 

</p>
      <img
        loading="lazy"
        decoding="async"
        src="/images/compare.png"
        alt="Hidden Markov and traditional comparison"
        className="my-5 mr-auto w-full max-w-[800px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Source: Author 
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

In the simplified visual example above, the hidden regimes are identified through conditional mean, variance and trend persistence. While these latent states are well defined, they are not mutually exclusive because observations can share common properties across different parameters. This posits that each observation cannot claim exclusive membership to a specific latent state and instead possess different likelihoods.
</p>


      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
When applying the framework to prices, each observation maps out a characteristic state as seen in the example below. Observation A has different but not necessarily unique likelihood values to arise from all three latent states, while observation C only possesses likelihoods to arise from latent state two and three. Explicitly, the likelihood of observation C arising from latent state two is 

{" "}
  <InlineMath math="b_{2,C}" /> 
{" "}

And latent state three is 

{" "}
  <InlineMath math="b_{3,C}" /> 
{" "}. 

The probabilities that these latent states either remain or transit are given by 

{" "}
  <InlineMath math="a_{i,i+1}" /> 
{" "}

where the initial state is 

{" "}
  <InlineMath math="i" /> 
{" "}

with subsequent state 

{" "}
  <InlineMath math="i+1" /> 
{" "}. 

In this simplified example, no latent state is taken to persist hence each state transits to another. These transitions are distinguished from a Markov chain process however since the latter only pertains to observable states identified from other measures. This contrast is why 

{" "}
  <InlineMath math="a_{i,i+1} \neq c_{z,\mathcal{Z}}" /> 
{" "}. 




</p>
      <img
        loading="lazy"
        decoding="async"
        src="/images/HiddenMarkov.png"
        alt="Hidden Markov and Markov chain comparison"
        className="my-5 mr-auto w-full max-w-[550px] object-contain"
      />

<p className="text-justify text-[8px] leading-relaxed text-gray-600">
Source: Author
</p>


      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
A Hidden Markov Model is evaluated through four diagnostic layers. These layers namely profile latent states, estimate each state's persistence and long run behaviour, inspect each state's specification robustness, and finally inspect the applied coherency of identified states.</p>


    </div>
  </div>







  {/* Forecast tab*/}
  <div
    className={`transition-all duration-500 ease-in-out ${
      hmmTab === "forecast"
        ? "opacity-100 translate-y-0"
        : "pointer-events-none absolute inset-0 opacity-0 translate-y-2"
    }`}
  >
    <div className="space-y-5">

      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
        Hidden Markov Model Forecasts 
      </h2>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

In either cases of traditional modelling, the market is inferred based on two key classes of metrics. From observable parameters such as mean, median or variance, along with decomposed components form processing data through a partial autocorrelation function or a Bayesian process as examples, some combination of both inter and intra classified metrics are used to define the market in the respective algorithms. Latent states however only seek to characterise the markets based on observable parameters. 

</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

In the simplified visual example above, the hidden regimes are identified through conditional mean, variance and trend persistence. While these latent states are well defined, they are not mutually exclusive because observations can share common properties across different parameters. This posits that each observation cannot claim exclusive membership to a specific latent state and instead possess different likelihoods.
</p>


      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
When applying the framework to prices, each observation maps out a characteristic state as seen in the example below. Observation A has different but not necessarily unique likelihood values to arise from all three latent states, while observation C only possesses likelihoods to arise from latent state two and three. Explicitly, the likelihood of observation C arising from latent state two is 


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
Demand of 2021 going into 2022
      </h2>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
       The live model below allows users to interact with any time period they wish to analyse. The presented default view is the electricity market from June 2021 to July 20222 to showcase how latent state analysis is undertaken for this period. Because Hidden Markov Modelling begins with precursor finite mixture modelling, exploratory latent mixture models are first formulated. From there, an optimal number of states are identified using the BIC criterion and the shown algorithm presents the framework based on the number of identified states. However should an analyst have strongly good reason to already know a pre identified number of states, they may also key in the number and carry out respective analysis. 
      </p>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <iframe
          loading="lazy"
          src={hmmTab === "application" ? "https://christopherleeaung.shinyapps.io/DemandHMM/" : undefined}
          title="Demand HMM Shiny Research Interface"
          className="h-[780px] w-full"
        />

      </div>

<p className="text-justify text-[8px] leading-relaxed text-gray-600">

Hidden Markov Modelling applied onto electricity demand from 2021 to 2022. Data from National Electricity Market Singapore, Demand 2021 to 2022. Output source: Author 
</p>  

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
The latent regime membership tab showcases a simplified overview of the different latent states; 5 states are identified to exist. While this gives a good overview of the number of states and their propagation across the period of analysis, conclusions regarding their formation, value range, and occurrence likelihood are better inferred other tabs. Decoded Demand Regimes are arguably used together with latent regime membership plots as the most dominant state is not necessarily the lowest value owing to implications how lower levels trend to carry lesser variance and instability. A good example is how state 1 may seem the lowest and most stable state, is in fact that the second highest valued state with densities even higher than supposedly more "popular" states 2 and 5. 
      </p>

      <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
Demand through Latent States: Analysis in 2 points
      </h2>

      <h2 className="text-[12.5px] font-semibold text-[#1a1f2b]">
[1] Volatility spikes arise from frequent regime switches and not compounded unanticipated demand
      </h2>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

While visual summary of electricity demand continuing cyclical behaviour with periodic periods of heightened stress suggest volatility is a consequence of unanticipated demand, underlying latent state behaviour reveal rapid remise oscillations to be responsible instead. This means modelling demand by incorporating exhibited behaviour across "circuit breaker" periods are not practical at all. A primary reason is because demand drop is not reflective of demand pick up. While demand dropped almost instantly following the first circuit breaker measure, the reopening of public spaces and working arrangements was not overnight. Latent phases competently tracked this behaviour noticeably by not forcing the same closure dynamics to model variance persistence. The only caveats are that regimes 2 and 3 may actually be considered the same regime as they can serve as a single posterior distribution when considered together, particularly in the manner of {" "}
  <InlineMath math="P(S=2 \mid S=3 )" /> 
{" "}. In other worse, since state 2 represents volatility spikes and state 3 for periods of noticeable grid stress, this framing presented volatility spikes to only occur when the grid was undergoing stress. This was otherwise undetected under regular time series decomposition as it would firstly be muted into a trend, and secondly the persisting underlying cycle would give impression that no significant changes have been made. 

</p>

      <h2 className="text-[12.5px] font-semibold text-[#1a1f2b]">
[2] Volatile behaviour reverts back without lag
      </h2>

      <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Before understanding this, the context of observed behaviour so far from density decomposition shows state 3 defining high demand centred around 6550–6650 MW, while states 2 and 5 are representative of lower demand around 5900–6150 MW. State 1 seems to behaves as an intermediate stabilisation regime around 6350–6450 MW. This suggests these states are more representative of the market undergoing stress without the behavioural and anxious jitters, presenting volatility spokes to be highly state switching dependent. Higher demand regimes become increasingly frequent into 2022, and lower demand regimes are not the baseline but are intermittent breaks. State 4 is unstable and often reverts to either 3 or 5, giving good reason that first-order Markov dependence framing can describe market behaviour decently. This means during uncertainty periods, the market repeatedly revisits state 3 instead of drifting continuously. This contradicts the assumption that crisis period  demand continues to reflect market anxiety persistently with drag. 
 </p>

    </div>
  </div>

</div>
</div>
</div>
</div>
</details>





{/*
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
            loading="lazy"
            src="https://christopherleeaung.shinyapps.io/BeastR/"
            title="BEAST USEP Shiny Research Interface"
            className="h-[780px] w-full"
          />
        </div>
      </div>
    </div>
  </div>
</details>

*/}

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
