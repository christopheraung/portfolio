"use client";

import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

type Project = {
  title: string;
  description: string;
  image: string;
  status: string;
  statusColor: string;
  client: string;
  domain: string;
  methodologies: string[];
  href?: string;
};

const InlineMath = dynamic(
  () => import("react-katex").then((mod) => mod.InlineMath),
  { ssr: false },
);

type HmmTab =
  | "demand"
  | "standard"
  | "methodology"
  | "application"
  | "forecast";
type ForecastTab = "bayesian_mc" | "bayesian_sarima" | "indusover";
type BeastTab = "profiling" | "issues" | "methodology" | "modelling";

const HMM_TABS: { value: HmmTab; label: string }[] = [
  { value: "demand", label: "Profiling Demand" },
  { value: "standard", label: "Issues in Conventional State Modelling" },
  { value: "methodology", label: "Methodology" },
  { value: "application", label: "Latent States in Demand" },
  { value: "forecast", label: " " },
];

const BEAST_TABS: { value: BeastTab; label: string }[] = [
  { value: "profiling", label: "Solar Generation" },
  { value: "issues", label: "Disruptions and Growth in Solar" },
  { value: "methodology", label: "Methodology" },
  { value: "modelling", label: "BEAST Modelling" },
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
  "Portfolio enquiry — client information form",
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
    methodologies: [
      "Time Series Analysis",
      "Statistical Inference",
      "Parameter Estimation",
    ],
  },
  {
    title:
      "Female Ambition Mitigates the Wicked Problem of Declining Birthrates",
    description:
      "Singapore's resident Total Fertility Rate stood at a historic low of 0.97 in 2023, below the population replacement rate of 2.1. However, small-town evidence from the United States offers an alternate narrative to this first-world country tale.",
    image: "/images/Birth.png",
    status: "Archived",
    statusColor: "bg-orange-400",
    client: "Public",
    domain: "Domestic, Gender, Culture",
    methodologies: [
      "Statistical Inference",
      "Dynamic Modelling",
      "Structural Break Analysis",
    ],
  },
  {
    title:
      "The Myth of Substitutionality between Social Workers and Volunteers",
    description:
      "A commentary piece dated April 18, 2017 in Today argued that low pay in the social sector was the primary issue behind poor talent retention among NPOs. This project examines whether volunteer substitution distorted the labour-market interpretation.",
    image: "/images/social.jpg",
    status: "Archived",
    statusColor: "bg-orange-400",
    client: "Government and Private",
    domain: "Wage, Social Work",
    methodologies: [
      "Statistical Inference",
      "Computational General Equilibrium",
    ],
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
    title:
      "Covariant Environmental Factors in Floating Solar Capital Depreciation within ESG Investing",
    description:
      "Floating solar capital experiences additional depreciation from default environmental conditions. Physical mitigation measures are profiled as investment premiums to offset valuation loss.",
    image: "/images/solar.jpg",
    status: "Active",
    statusColor: "bg-green-400",
    client: "Private",
    domain: "Capital, Insurance, Risk",
    methodologies: [
      "Time Series Analysis",
      "Statistical Inference",
      "Dynamic Modelling",
      "Underwriting",
    ],
  },
];

const commodities: Project[] = [
  {
    title:
      "De-meaned Inferences Paradoxically Yield Distorted Market Conclusions",
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

function ArrowLink({
  children,
  href = "#enquiry",
}: {
  children: React.ReactNode;
  href?: string;
}) {
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
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
            <span
              className={clsx("h-2 w-2 rounded-full", project.statusColor)}
            />{" "}
            {project.status}
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
                <span
                  key={method}
                  className="rounded-md bg-blue-950 px-3 py-0.5 text-[12px] text-white"
                >
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

function StandardModellingContent({
  forecastTab,
  setForecastTab,
}: {
  forecastTab: ForecastTab;
  setForecastTab: Dispatch<SetStateAction<ForecastTab>>;
}) {
  return (
    <div className="space-y-5">
      <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
This study compares the utility of applying Bayesian filtering to machine learning and machine learning fine tuned traditional forecasting models built on SARIMA specifications. The context relates to seeking better forecasts of an uncertain future in electricity marked by strong volatility midst a mean reverting index. Traditional models are first assessed if Bayesian filtering has any impact on forecasting performance before and after XGBoost based fine tuning. TimesFM by Google is the baseline model for ML forecasting, and comparing its performance before and after Bayesian filtering is of interest. The non-Bayesian treated SARIMA model is not of interest as it is understood as a baseline block of a model rather than a standalone component. The overall workflow is visualised as: </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/diagnosis.png"
            alt="Monte Carlo Demand"
            className="my-5 mx-auto w-full max-w-[800px] object-contain"
          />

     <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

The argument on applying Bayesian filters is slightly different depending on the class of model applied. On one hand, fine tuning parameters using machine learning on traditional models based on "well behaving" data is almost redundant as Bayesian filtering already help discern relevant statistical properties from noisy raw data. On the other hand, subjecting Bayesian treated data onto a ML model will yield poorer performance that subjecting to it non-treated data owing to overfitting. 
 </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/BayeP.png"
            className="my-5 mx-auto w-full max-w-[700px] object-contain"
          />


          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
            As a baseline example, consider some time series of demand. Let
            Event A be the event where observable demand remains above 6000 MW,
            and hence any demand that is 6000 MW or below will be Event -A. Let
            Event B be demand reaching above 6500 MW. As such only high prices
            given sustained high demand from previous time periods will be used
            to train stressful periods in the market. This means spikes are not
            periodic nor temporal, but conditional on the extend demand has
            "dipped" in its seasonal low. In this quick example,{" "}
            <InlineMath math="P(B \mid A)" /> is utilised to bootstrap stressed
            demand. This gives a set up for Monte Carlo simulations to not base
            trajectory on the entirety of observed behaviour but only on how the
            market may look if stressful conditions persist and grow.
          </p>

      {/* SECONDARY MODELLING TABS */}
      <div className="mt-5 mb-5 inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
        <button
          type="button"
          onClick={() => setForecastTab("indusover")}
          className={`rounded-full px-4 py-1.5 text-[11.5px] transition-all duration-300 ${
            forecastTab === "indusover"
              ? "!bg-blue-950 !text-white shadow-sm"
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
              ? "!bg-blue-950 !text-white shadow-sm"
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
              ? "!bg-blue-950 !text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Time Series FM Modelling
        </button>
      </div>

      {/* BAYESIAN MONTE CARLO */}
      {forecastTab === "bayesian_mc" && (
        <div className="origin-top space-y-4 animate-fadeIn transition-all duration-500 ease-in-out">


          <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
            Monte Carlo Simulations non fine tuned Bayesian SARIMA
            baseline model
          </h2>
          <img
            loading="lazy"
            decoding="async"
            src="/images/SARIMAwoML.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <img
            loading="lazy"
            decoding="async"
            src="/images/SARIMAwoMLdiag.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <p className="text-justify text-[8px] leading-relaxed text-gray-600">
            Monte Carlo Simulations based on bootstrapped Bayesian filtered data
            trained SARIMA for stressful market projection. Data from National
            Electricity Market Singapore, Demand 2021 to 2022. Output source:
            Author
          </p>

          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
            The standard SARIMA framework demonstrated an overall competent
            forecast, achieving low RMSE 134.387 with MAE 87.216, and an
            impressive analytical interval coverage rate of 96.23%. Seemingly the
            model successfully captured key characteristics of underlying
            demand, notably inferred by a low MAPE of 1.44% resulting in stable trajectories. SARIMA’s diagnosis of (3,0,0)[7] indicates
            regardless the degree of stress experienced by market demand, it
still reflected regular oscillatory structure.
          </p>


          <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
            Monte Carlo Simulations from fine tuned Bayesian SARIMA
            baseline model
          </h2>
          <img
            loading="lazy"
            decoding="async"
            src="/images/SARIMAwML.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <img
            loading="lazy"
            decoding="async"
            src="/images/SARIMAwMLdiag.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

Noticeably the differences are extremely marginal, indicating parameter fine tuning does little to improve the model apart from providing slightly additional better technical performance. 

</p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/Diff_SARIMA.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
            Key points of less competent forecasting are highlighted when
            historical demand was noted to transit across different volatility
            regimes. Between May 2022 and September 2022, projections
            persistently underpredicted realised demand spikes, particularly
            during abrupt deviations associated with high volatility. This
            reflects the previously highlighted structural limitation of
            determining market states through observable parameter bounds
            regardless their technical fine tuning; SARIMA can only extrapolate
            and undertake profiling future states from historically stable
            autocorrelation structures and assumes all behaviour will eventually
            revert towards seasonal means. This also explains why variance from
            October 2022 to January 2023, the framework began to overpredict
            realised demand levels. Collectively this otherwise strongly
            powerful trait is why SARIMA models must be adapted further to
            anticipate abrupt and symmetric volatility shifts by incorporating
            nonlinear or additional state dependent correction mechanisms.
          </p>
        </div>
      )}

      {/* BAYESIAN ML SARIMA */}
      {forecastTab === "bayesian_sarima" && (
        <div className="origin-top space-y-4 animate-fadeIn transition-all duration-500 ease-in-out">
          <h2 className="text-[14.5px] font-semibold text-[#1a1f2b]">
            Paradox in treating data for TimesFM
          </h2>

          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
            It was surprising to note a Bayesian treated TimesFM model forecasting Monte Carlo simulations did not perform better than a non-Bayesian treated TimesFM base model. While aspects mitigating error terms  were better, the regular model remained
            stronger still in point forecast accuracy.
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
            The weaker performance of the Bayesian treated TimesFM model likely
            arises from Bayesian processes interfering and altering otherwise
            well captured structural properties of the demand process. Demand
            behaviour is already dominated by deterministic seasonality and
            persistent cyclical behaviour which the original TimesFM algorithm
            captures through directly learned temporal and autoregressive embedding mechanisms. The introduction of a
            Bayesian filter has proven unwarranted as it "forced" stressed
            information into the model, overfitting moments of stress into the model. The result
            is an additional Bayesian layer acting more like a variance
            smoothing filter than an information supplementing one. This explains why the
            Bayesian model exhibits higher residual variance, RMSE, and MAE
            despite wider predictive intervals.
          </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/TimesB.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <img
            loading="lazy"
            decoding="async"
            src="/images/TimesT.png"
            alt="Monte Carlo Demand"
            className="my-5 mr-auto w-full max-w-[800px] object-contain"
          />

          <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
            Comparatively, the Bayesian treated model performs better only in
            interval estimation noted by its better residual accounts. A reason why this comes about is strongly likely to be technical since having overfitted dramatic data results in wider confidence intervals, observably by comparing average widths of 616.654 against 401.521. The paradoxical effect however is that despite the Bayesian treated model having a wider interval width to account for more deviations such that it can "contain" more accurate forecasts, it had a larger error rate and poorer convergence rate. Coupling this with residual diagnostics, the Bayesian model systematically under predicts given its positive mean error of approximately 72 MW, which results in huge residual variance difference of roughly 62,900. While MAPE still remains relatively impressive, it means the model captures underlying demand relatively well but the problem of not being able to account for unforeseen spikes despite Bayesian conditioning still remains. </p>
        </div>
      )}

      {/* Industry Overview */}
      {forecastTab === "indusover" && (
        <div className="origin-top space-y-4 animate-fadeIn transition-all duration-500 ease-in-out">
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
            Individual Monte Carlo simulated paths expanding MSE against
            realised historical demand. Data from National Electricity Market,
            USEP 2021 and 2022. Output Source: Author
          </p>

          <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
The performance of industry contained forecasting models can be overviewed through a spaghetti plot regarding their forecast <InlineMath math="\text{MSE}_{i,t}=\frac{1}{t}\sum_{\tau=1}^{t}(\hat{y}_{i,\tau}-y_{\tau})^2" /> trajectories. 

The solid black line represents the median expanding MSE path, or the typical degree of forecast uncertainty faced by any participant relying on a SARIMA baseline forecasting model. Across all models, upward shifts around January and February 2022 highlight the difficulty faced in all model permutations in these challenging environments. This is strongly likely owing to observed instability following December 2021's regime.
The dotted point series represents MSE path of a Bayesian treated SARIMA model, highlighting the strong contrast between performances in fit, albeit still experiencing the same issues. 

</p>

          <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

The wide dispersion reflects all models' instability in cumulative forecasting based on repeated stochastic settings of its inherent SARIMA process. The upper fan of grey trajectories expands with dissipating density, indicating that market participants have preferences towards "doomsday" models, either reflecting extremely risk adverse appetite facing uncertainty, or simple a reflection of model unreliability.
 </p> 


          <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
            A review of median MSE when comparing Bayesian treated SARIMA Monte Carlo models reflect a good preference for Bayesian treated data when undertaking modelling. The interesting note is that while it does account for fitting better, it is not immune to the same shocks experienced by all other models, and most interestingly still share the same miss rate; if anything performing poorer during January 2022 when the market demand behaved erratically. 
          </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/industry.png"
            className="my-5 mr-auto w-full max-w-[900px] object-contain"
          />

          <p className="text-justify text-[8px] leading-relaxed text-gray-600">
            Evaluation of Aggregate Monte Carlo simulated paths against realised
            historical demand. Data from National Electricity Market, USEP 2021
            and 2022. Output Source: Author
          </p>

          <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
            Observably even with supposed "realistic" projections of how erratic
            the market would behave in the short run (approximately 6 months
            forward), the models' mean projections began faltering from February
            2022 onwards, with Median performance consistently faring poorly
            from the start. It seems a more nuanced understanding of why certain
            market participants find value in these projections can be uncovered
            through variance projections. The progressive tighter intervals,
            albeit deducible only in hindsight, give indication that perhaps
            market participants are not seeking doomsday predictions for the
            sake of it, but perhaps they have see personal inside information
            being reflected in other models not of their own. Collectively if
            all agents undertake this approach, the rational on why market
            participants preferring paranoid predictions can be framed as a
            coincidentally collative decision rather than a mass self affirming
            attitude.
          </p>
        </div>
      )}
    </div>
  );
}

const ENQUIRY_CLASSIFICATIONS = [
  "Capital market research",
  "Commodity market research",
  "Policy impact analysis",
  "Lecture / workshop request",
  "Document / manuscript review",
  "Private client engagement",
];

const INTENDED_USES = [
  "Internal decision support",
  "Academic / teaching use",
  "Executive briefing",
  "Investment / market monitoring",
  "Policy / regulatory interpretation",
];

const SALUTATIONS = ["Mr", "Ms", "Mx", "Dr", "Prof"];

function EnquiryInput({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block border-b border-[#C9CCD0] pb-1 text-[13px] leading-none text-[#545454]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        className="h-7 w-full rounded-[4px] border border-[#D8D8D8] bg-white px-2 text-[12.5px] text-[#545454] outline-none transition-all focus:border-[#545454] focus:ring-1 focus:ring-[#545454]"
      />
    </label>
  );
}

function EnquirySelect({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block border-b border-[#C9CCD0] pb-1 text-[13px] leading-none text-[#545454]">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="h-7 w-full rounded-[4px] border border-[#D8D8D8] bg-white px-2 text-[12.5px] text-[#545454] outline-none transition-all focus:border-[#545454] focus:ring-1 focus:ring-[#545454]"
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function EnquirySection() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleEnquirySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Enquiry submission failed");

      form.reset();
      setSubmitStatus("sent");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <section
      id="enquiry"
      className="mt-24 w-full max-w-5xl pt-0 text-[#545454]"
    >
      <div className="mx-auto w-full max-w-[760px] bg-white px-3 py-8 sm:px-8">
        <SectionTitle title="Enquiries" />

        <p className="mb-14 max-w-4xl text-justify text-[12.5px] leading-relaxed text-[#545454]">
          Requests for research support, manuscript review, executive analysis,
          applied econometric engagement and media enquiries are welcomed.
          Information shared must not be confidential on initial correspondence,
          and collected information is strictly limited to enquiry nature
          identification, suitability assessment, conflict screening, and
          whether further correspondence should proceed under stated
          confidentiality terms. Only verified and active formal institutional work e-mails are permitted for communication.
        </p>

        <form onSubmit={handleEnquirySubmit} className="space-y-10">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-[0.55fr_2.15fr]">
            <EnquirySelect
              label="Salutation"
              name="salutation"
              options={SALUTATIONS}
            />
            <EnquiryInput label="Preferred Name" name="preferred_name" />
          </div>

          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <EnquiryInput label="First Name" name="first_name" />
            <EnquiryInput label="Last Name" name="last_name" />
            <EnquiryInput label="Designation / Job title" name="job_title" />
            <EnquiryInput
              label="Company Email"
              name="company_email"
              type="email"
            />
            <EnquiryInput label="Company / Institution" name="company" />
            <EnquiryInput label="Business function" name="business_function" />
            <EnquirySelect
              label="Enquiry Classification"
              name="enquiry_classification"
              options={ENQUIRY_CLASSIFICATIONS}
            />
            <EnquirySelect
              label="Intended Use"
              name="intended_use"
              options={INTENDED_USES}
            />
          </div>

          <label className="block">
            <span className="mb-2 block w-full max-w-[300px] border-b border-[#C9CCD0] pb-1 text-[13px] leading-none text-[#545454]">
              Mandate / request summary
            </span>
            <textarea
              name="mandate_summary"
              rows={6}
              className="w-full rounded-[4px] border border-[#D8D8D8] bg-white px-3 py-3 text-[12.5px] text-[#545454] outline-none transition-all focus:border-[#545454] focus:ring-1 focus:ring-[#545454]"
            />
          </label>

          <div className="grid gap-10 md:grid-cols-[0.95fr_1.35fr] md:items-center">
            <button
              type="submit"
              disabled={submitStatus === "sending"}
              className="h-11 rounded-full border border-[#C9CCD0] bg-white px-8 text-[13px] font-semibold text-[#545454] transition-colors hover:border-[#545454] disabled:cursor-wait disabled:opacity-60"
            >
              {submitStatus === "sending" ? "Submitting" : "Submit Enquiry"}
            </button>

            <p className="text-justify text-[10.5px] font-semibold leading-relaxed text-[#545454]">
              I confirm that the information shared may be reviewed for the
              purpose of assessing this enquiry. I understand that further
              correspondence may require explicit consent and confidentiality
              terms.
            </p>
          </div>

          {submitStatus === "sent" && (
            <p className="text-[12.5px] font-medium text-[#545454]">
              Enquiry submitted.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="text-[12.5px] font-medium text-[#545454]">
              Submission failed. Please try again later.
            </p>
          )}

          <div className="space-y-3 text-justify text-[8.5px] leading-relaxed text-[#545454]">
            <p>
              By submitting this form, you acknowledge that the personal data
              provided may be collected, used, and disclosed for the limited
              purpose of assessing and responding to this enquiry. This
              submission is intended to operate as notice and consent under
              Singapore's Personal Data Protection Act 2012, which governs
              organisational collection, use, and disclosure of personal data.
              The legal effect of this consent is limited to the purposes stated
              here: enquiry assessment, conflict screening, correspondence, and
              preparation of suitable engagement terms. Personal data should not
              be used for unrelated purposes unless further consent, deemed
              consent, or another lawful exception applies. Further
              correspondence may require separate confidentiality terms.
            </p>
            <p>
              Legal reference basis: Singapore Personal Data Protection Act
              2012; Personal Data Protection Commission guidance on consent,
              notification, purpose limitation, and appropriate collection, use,
              or disclosure of personal data.
            </p>
            <p>
              https://sso.agc.gov.sg/Act/PDPA2012
              <br />
              https://www.pdpc.gov.sg/about/the-legislation/pdpa-overview
              <br />
              https://www.pdpc.gov.sg/data-protection-obligations
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="space-y-4 text-[15px] tracking-wide">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={onNavigate}
            className="hover:text-bluebrand-800"
          >
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#enquiry"
          onClick={onNavigate}
          className="hover:text-bluebrand-800"
        >
          Enquiries
        </a>
      </li>
    </ul>
  );
}

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [hmmTab, setHmmTab] = useState<HmmTab>("demand");
  const [forecastTab, setForecastTab] = useState<ForecastTab>("indusover");
const [beastTab, setBeastTab] = useState<BeastTab>("profiling");

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const wrapperClass = useMemo(
    () =>
      clsx(
        "min-h-screen bg-white text-gray-700 transition-opacity duration-700",
        fadeIn ? "opacity-100" : "opacity-0",
      ),
    [fadeIn],
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
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="mb-6 text-sm text-gray-400 hover:text-white"
        >
          Close ✕
        </button>
        <Sidebar onNavigate={() => setMenuOpen(false)} />
      </aside>

      <nav className="fixed left-0 top-[2.5rem] hidden h-[calc(100%-2.5rem)] w-44 border-r border-bluebrand-200 bg-bluebrand-100 py-38.5 pl-9 pr-4 text-bluebrand-700 md:block">
        <div className="mt-12">
          <Sidebar />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl flex-1 px-6 py-30 sm:px-10 md:ml-44 md:px-24">
        <section id="about" className="mb-50 pt-10">
          <h1 className="mb-8 font-lora text-5xl font-bold tracking-tight text-[#1a1f2b]">
            Christopher Lee
          </h1>
          <h2 className="mb-1 text-3xl font-semibold text-[#3b465c]">
            Senior Economist
          </h2>
          <h3 className="mb-6 text-[18px] text-gray-400">
            Commodity Econometrician
          </h3>
          <p className="mb-5 text-justify text-[15px] leading-relaxed">
            Christopher is a professional econometrician specialising in
            commodity market and capital valuation analysis. His portfolio has
            supported C-suit executives through policy implementations and
            analysts through market behaviour. Autonomous and private
            universities engage him to lecture modules in quantitative economics
            and applied econometrics.
          </p>

          <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row sm:gap-7">
            <a
              href="#enquiry"
              className="rounded-lg border border-steel-500 px-5 py-1.5 text-[14px] font-medium text-steel-500 transition-colors hover:bg-gray-100"
            >
              Enquiries
            </a>
          </div>
        </section>

        <section
          id="research"
          className="mb-32 w-full max-w-5xl pt-0 text-[#545454] [&_*]:text-[#545454]"
        >
          <SectionTitle title="Research" />

          <div className="w-full max-w-4xl bg-white/40">
            <div className="mb-10">
              <h2 className="mb-2 text-[20px] font-semibold tracking-tight text-[#4a4a4a]">
                Market Intelligence
              </h2>
              <div className="border-t border-[#C9CCD0] pt-3">
                <div className="space-y-1">
                  <details className="group py-2">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold leading-snug text-[#1a1f2b]">
                            Hidden Markov Regimes in Singapore’s Electricity Demand
                          </h3>
                        </div>

                        <span className="ml-5 text-xl transition-transform duration-600 ease-out group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="mt-6 origin-top opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">
                          <p className="mb-8 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

        During the second half of 2021, Singapore was recovering from both economic and operational constraints imposed during the COVID-19 pandemic. As energy markets tightened, higher than anticipated volatility contributed to six electricity retailers withdrawing from the open electricity market, prompting intervention by the Electricity Market Authority (EMA). Among key issues faced by market participants and authorities, an interesting one was the limitation of relying on observable indices to predict future market states with little or no appropriate priors. Latent state modelling becomes a plausible alternative. Here market behaviour is assumed governed by underlying unobservable states. In the context of Singapore's electricity market, these latent states represent different demand regimes, supply conditions and market stress from exogenous indexes. Markov chains are then introduced to inspect latent state propensities to remain or transit following underlying seasonality and macro shocks. 
                          </p>

                          {/* TABS */}
                          <div className="mb-6 flex gap-12 overflow-x-auto border-b border-gray-200">
                            {HMM_TABS.map((tab) => (
                              <button
                                key={tab.value}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setHmmTab(tab.value);
                                }}
                                className={`pb-2 text-[11.5px] font-medium transition-all duration-300 ${
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
                              className={`origin-top transition-all duration-500 ease-in-out ${
                                hmmTab === "demand"
                                  ? "opacity-100 translate-y-0 scale-y-100"
                                  : "pointer-events-none absolute inset-0 opacity-0 -translate-y-2 scale-y-[0.985]"
                              }`}
                            >
                              <div className="space-y-5">
  
                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                           Hidden Markov Model Conclusions Latent States
                                </h2>



<section className="w-full bg-white px-1 py-1 text-[#666d7a]">
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.15fr]">

    {/* LEFT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        Annual Demand Statistics
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>2021</div>
        <div>2022</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 grid grid-cols-2 gap-8">
        <div className="space-y-1">
          {[
            ["Mean", "6447 MW", ""],
            ["Median", "6566 MW", ""],
            ["Variance", "110544 MW", ""],
          ].map(([metric, value, change]) => (
            <div key={metric} className="grid grid-cols-[50px_1fr_42px] items-center">
              <span className="text-[8px] text-gray-600">{metric}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
              <span className="text-[8px] font-semibold text-gray-600">{change}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {[
            ["Mean", "6563 MW", "+1.80%"],
            ["Median", "6714 MW", "+2.25%"],
            ["Variance", "111265MW", "+0.65%"],
          ].map(([metric, value, change]) => (
            <div key={metric} className="grid grid-cols-[50px_1fr_42px] items-center">
              <span className="text-[8px] text-gray-600">{metric}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
              <span className="text-[8px] font-semibold text-gray-600">{change}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        Demand Regime Profiles
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>Average Demand</div>
        <div>Economic Interpretation</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 grid grid-cols-2 gap-8">
        <div className="space-y-1">
          {[
            ["S1", "5900 MW", ""],
            ["S5", "6100 MW", "+3.39%"],
            ["S3", "6250 MW", "+2.46%"],
            ["S2", "6400 MW", "+2.40%"],
            ["S4", "6600 MW", "+3.13%"],
          ].map(([state, value, change]) => (
            <div key={state} className="grid grid-cols-[24px_1fr_42px] items-center">
              <span className="text-[8px] text-gray-600">{state}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
              <span className="text-[8px] font-semibold text-gray-600">{change}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {[

  ["S1", "Demand collapse regime"],
  ["S5", "Sub-trend demand regime"],
  ["S3", "Baseline operating regime"],
  ["S2", "Expansionary demand regime"],
  ["S4", "Peak-load demand regime"],
          ].map(([state, desc]) => (
            <div key={state} className="grid grid-cols-[24px_1fr] items-center">
              <span className="text-[8px] text-gray-600">{state}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  Hidden Markov Modelling of Singapore's electricity demand market between June 2021 and July 2022 identifies four distinct latent regimes that repeatedly reappear throughout. Regime membership plots reveal that observations transit frequently between states, indicating that electricity demand is still cyclical and recurrent rather than reacting to post pandemic realities, be it policy or price influenced constraints. State occupancy is dominated by two principal conditions; higher demand periods see large concentrations of State 1 and State 2, while lower demand markets are defined by States 3 and 4. Each latent state maintains a relatively stable demand profile over time, supporting the interpretation that demand is better profiled through persistent structural operating conditions rather than dramatic short term statistical anomalies.
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
State distributions further confirm that the four regimes capture differences in electricity consumption behaviour. State 2 represents the highest operating regime, with observations concentrated between 6,500 MW and 6,700 MW, consistent with periods of elevated economic activity and stronger electricity consumption. State 1 forms the baseline operating regime, centred near 6,350 MW to 6,450 MW. State 3 occupies an intermediate low demand regime around 6,050 MW to 6,250 MW, while State 4 represents the lowest demand environment, centred near 5,850 MW to 6,000 MW. Although some overlap exists between neighbouring distributions, the density functions remain sufficiently separated to support reliable state classification.
</p>

<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Transition dynamics indicate regime persistence differs substantially across states. State 1 exhibits the highest persistence, with a self-transition probability of approximately 0.76, implying that once the market enters its baseline demand environment it is likely to remain there. State 4 also demonstrates moderate persistence with a probability near 0.58, suggesting that periods of demand contraction tend to cluster together. In contrast, States 2 and 3 display relatively low persistence, implying expansionary and transitional demand conditions are less likely to endure. Taken together, the results suggest that Singapore's electricity demand is characterised by a stable core operating regime surrounded by recurring periods of expansion and contraction. 
</p>


                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                                  Demand across 2021 and 2022
                                </h2>




                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
                                  Singapore's electricity market can
                                  superficially seem to exhibit relatively well
                                  defined seasonality and trends, giving
                                  impression that strict parameter boundaries
                                  can serve as competent settings for profile
                                  states. However annual time series
                                  decompositions yield statistical differences
                                  to exist, highlighting the inappropriateness
                                  of relying on historical parameter boundaries
                                  for state analysis. This was particularly
                                  evident for demand behaviour across 2021 and
                                  2022.
                                </p>

                                <img
                                  loading="lazy"
                                  decoding="async"
                                  src="/images/01a.png"
                                  alt="Electricity Demand Time Series Decompositions"
                                  className="my-5 mr-auto w-full max-w-[900px] object-contain"
                                />

                                <p className="text-justify text-[8px] leading-relaxed text-gray-600">
                                  Overviewing the Singapore Electricity Market
                                  based on its Spot Price Index, (USEP) from
                                  2021 to 2022. Data from National Electricity
                                  Market, USEP 2021 and 2022. Output Source:
                                  Author
                                </p>

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
                                  During this post pandemic period, market participants had strong incentives to undertake responsible market profiling. Understanding market demand was crucial to maintain electricity supply; a volatile market spot price index can induce paranoid hedging with LNG suppliers as well as profiting opportunities off electricity retailers. As examples, if the
                                  participant was a Genco, then forecasting
                                  demand primarily serves ensuring undisrupted supply within appropriate financial objectives. If the participant
                                  was an electricity retailer, then forecasting
                                  demand ensured adequate supply scheduling without taking on losses
                                  was key. Only through understanding demand then can subsequent analysis regarding related commodity markets and resulting USEP behaviour be understood competently.
                                </p>

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
                                  By mid 2021, it was evident that utilising
                                  market behaviour from 2020 or earlier LNG
                                  shock periods to filter data for
                                  2022 simulations was insufficient. This was primarily
                                  because the degree of market
                                  liberalisation has changed sufficiently. However some market participants still went on to affirm such simulations owing to two key reasons. First, there was conviction that
                                  truncated market data when treated as
                                  historical priors rather than market data as a
                                  whole would be sufficient to model future
                                  uncertainty. This means there is strong belief that regardless Covid recovery, the underlying trends and seasonality in demand retain statistically unchanged. Additional conditions relating to stress are seen simply as permutations of previously seen stress. For example, if the past saw irregular demand as a result of LNG supply disruptions and interest rate shocks, then projected regular demand from LNG supply disruptions and macroeconomic shocks can be profiled too after adjusting for expected magnitudes. Secondly, there was little relevant data either from too much market noise or limited index information. This meant some market participants with increased exposure to market anxiety may not necessarily have additional information regarding market behaviour, and that there were only a few other exogenous indices such as LNG markets and logistical shipping trackers to estimate demand. As such, rather than undertaking extensive efforts to incorporate and filter all data for urgent short run projections, demand data is utilised alone. 
                                </p>


                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                                  Differences in Annual Demand
                                </h2>

                                <img
                                  loading="lazy"
                                  decoding="async"
                                  src="/images/02.png"
                                  alt="Statistical Tests inferring similarity between 2021 and 2022 Demand"
                                  className="my-5 mr-auto w-full max-w-[800px] object-contain"
                                />

                                <p className="text-justify text-[8px] leading-relaxed text-gray-600">
                                  Overviewing the Singapore Electricity Market
                                  based on its Spot Price Index, (USEP) from
                                  2021 to 2022. Data from National Electricity
                                  Market, USEP 2021 and 2022. Output Source:
                                  Author
                                </p>

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
                                  Formal statistical decompositions
                                  present no statistical similarity between the two years. This means market participants assumptions on demand remaining characteristically similar are unfounded, mitigating projections that utilise repeated historical patterns. Again, this implies if 2021 served as a training prior, even non-parametric bootstrapped variations can only repeat already observed behaviour. Conditioning previous market periods of stress becomes redundant since their priors are not reflected. For example, if low demand was conditioned on short bursts of sporadic demand prior, 2022 projections can only reflect stressful periods if such similar prior behaviour was observed. </p> 

                               <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

The Kolmogorov-Smirnov
                                  (KS) test to inspect differences in
                                  non-parametric distributions through vertical
                                  differences, the Wilcoxon test to identify
                                  differences in non-parametric distributions
                                  through data rank and a superficial median
                                  split comparison test to identify proportions
                                  of data above and below the respective medians
                                  present conclusively evidence that
                                  statistically significant differences exists
                                  between the two years' distributional
                                  structures. 
                                </p>
                              </div>
                            </div>

                            {/* STANDARD TAB */}
                            <div
                              className={`origin-top transition-all duration-500 ease-in-out ${
                                hmmTab === "standard"
                                  ? "opacity-100 translate-y-0 scale-y-100"
                                  : "pointer-events-none absolute inset-0 opacity-0 -translate-y-2 scale-y-[0.985]"
                              }`}
                            >
                              <div className="space-y-5">
                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                                 Type I and Type II errors in Identifying Market States
                                </h2>

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
To understand how market state misidentification arises from observing literal indexes only, it begins from examining the conventional impression that a market state is defined by boundaries of observed values. This means an arbitrary market index observation <InlineMath math=" y_i \in C_j" /> is defined so as long as <InlineMath math=" y_i \in [C_{1,\min}, C_{1,\max}]" />. This is primarily problematic across three reasons. Firstly, it does not account for non-stationary trend behaviour. As such if market index <InlineMath math=" Y" /> were to grow quarterly as an example where <InlineMath math=" \bar{Y}_{Q1} < \bar{Y}_{Q2}" />, then identified market states in Q2 are considerably higher than those in Q1. So should the prior framing be adopted, then it concludes that the market is entering a higher phase indefinitely, giving little utility for analysis. The question then arises if market states should be defined by the resulting variance instead; which introduces the second reason why boundary definitions are problematic. Variance, mean or median parameters are conditional on observed values, meaning any arbitrary parameter  <InlineMath math=" \theta_k" /> must exist as a posterior element based on the subset of observed values prior. Market states are now defined by their observed parameters, with state boundaries determined by the range of observations which contribute to statistical indifferent parameter values. The probability of a market state manifesting is now <InlineMath math=" P(\theta_k \mid C_j)" />. Consider this quick illustration of Gaussian distributed data where the parameter of interest is the mean <InlineMath math="\theta_{k,j} = \bar{C_j}" />. This notation is used so that other parameters such as variance can be represented by <InlineMath math="\theta_{l,j} = \sigma^2_{C_j}" />.

</p>

                        <img
                                      loading="lazy"
                                      decoding="async"
                                      src="/images/53.png"
                                      alt="Market observation distributions that contribute to state identification "
                                      className="my-5 mx-auto w-full max-w-[600px] object-contain"
                                    />

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Observably notions of how erroneous market state identification arises can be induced. The overlapping areas which contribute to <InlineMath math="\theta_{k,\neg j}" /> come to represent both type I and type II errors. This shows that market states are defined by distribution priors rather than value ranges, and the boundaries that conventional impression has are actually based on confidence intervals. Which leads to the third reason; market states dependent on parameters rely strongly on technical methodologies to identify these parameters. In this example it is easy to define both parameters and confidence intervals since example distributions are homogeneously parametric; all Gaussian. But given the actual distribution of market indexes which may not be the mean, this assumption is unlikely to hold. 
</p>


                        <img
                                      loading="lazy"
                                      decoding="async"
                                      src="/images/52.png"
                                      alt="Monte Carlo Demand"
                                      className="my-5 mx-auto w-full max-w-[600px] object-contain"
                                    />



                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Now consider two arbitrary market phase subsets <InlineMath math=" C_1 \bigcup C_2 \subset Y " /> to exist. Let <InlineMath math=" C_1 : \{c_{\tiny{1,i}} \}_{\tiny{i=1}}^{|{\tiny{C_1}|}}" /> represent a stable market where market observations are distributed in the manner <InlineMath math=" C_1 \sim f_1(\theta_{k,1}, \theta_{l,1}) " /> assuming a gaussian like distribution for simplicity. Likewise, <InlineMath math=" C_2 : \{c_{\tiny{2,i}} \}_{\tiny{i=1}}^{|{\tiny{C_2}|}}" /> contains all observations that represent an unstable market phase. In this state, market observations are distributed in the manner  <InlineMath math=" C_2 \sim f_2(\theta_{k,2}, \theta_{l,2}) " />. 
                                </p>

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
There are three market observations of interest; <InlineMath math=" y_1 \in C_1, y_2 \in C_1 \cap C_2, y_3 \in C_2." /> When analysing the market based on these observations, it is easy to deduce the market state when observing <InlineMath math=" y_1 \text{ and }y_3 " /> since their subset membership is well defined, or explicitly their underlying distribution priors are well defined. So there can be no confusion on what state the market is existing in when these values manifest. 
</p>


<p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
The problem arises when <InlineMath math="  y_2 \in C_1 \cap C_2 " /> is concerned as distribution priors overlap. This shows how the previously highlighted Type I and Type II errors come about; should observation <InlineMath math="  y_2" /> be defined based on <InlineMath math="  f_1 " />, it runs into chance of being a type 2 error. It may be a false negative denoting the market state has not changed when the market has transited to <InlineMath math="  C_2 " />. 

</p>

                              </div>
                            </div>

                            {/* METHODOLOGY TAB */}
                            <div
                              className={`origin-top transition-all duration-500 ease-in-out ${
                                hmmTab === "methodology"
                                  ? "opacity-100 translate-y-0 scale-y-100"
                                  : "pointer-events-none absolute inset-0 opacity-0 -translate-y-2 scale-y-[0.985]"
                              }`}
                            >
                              <div className="space-y-5">
                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                                  The Framework
                                </h2>

                              <img
                                  loading="lazy"
                                  decoding="async"
                                  src="/images/59.png"
                                  alt="Latent State approache"
                                  className="my-5 mx-auto w-full max-w-[600px] object-contain"
                                />

                                <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

 There are two components beyond technical methodology approach which separates Hidden Markov Modeling from classical regime modelling. First is the definition and approach to identify market states, and secondly is to also incorporate transition chains into its analysis.  A latent state model assumes that observed market index values{" "}
  <InlineMath math="Y=\{y_t\}_{t=1}^{T}" /> are generated by an
  unobserved state process comprising of K latent states from <InlineMath math="\Psi=\{\psi_1,\dots,\psi_K\}" />. This means market observations at time t are assumed "diffused" from a few latent states with respective likelihoods <InlineMath math="P(y_i \mid \psi_i)" />. This means each observation possesses a posterior state probability vector known as a posterior latent profile <InlineMath math="\Gamma_{y_i,t} = (P(y_i \mid \psi_1),P(y_1 \mid \psi_2), \cdots, P(y_i \mid \psi_n)) " /> but when undertaking 2D visualisation only <InlineMath math="\hat \psi_{i} = \arg \max_k P(\psi_k \mid y_i)" />, or the only state with the largest posterior probability is visualised. With this state now defined, the model then captures the likelihood identified states remain or transit to another state through a simple probability  <InlineMath math="P(\psi_{i,t+1} \mid \psi_{i,t} = p_{ij} )" />. This means collectively as a transition matrix, its latent state membership profile is given by: </p>

 <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">



 <InlineMath math="\mathbf{P}=\begin{bmatrix}
p_{1,1} & p_{1,2} & \cdots & p_{1,K}\\
p_{2,1} & p_{2,2} & \cdots & p_{2,K}\\
\vdots & \vdots & \ddots & \vdots\\
p_{K,1} & p_{K,2} & \cdots & p_{K,K}
\end{bmatrix}" /> 



</p>

 <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
 
Consider a simple visualisation above regarding three observed values <InlineMath math="y_1, y_2, y_3" />. Their respective individual posterior state probability vectors reveal how type I and type II errors are not considered primarily owing to the frame how latent membership is defined by different likelihoods, rather than an explicit claim that true latent state membership lies in one exclusive state only. 

</p>

                            

                              </div>
                            </div>



                            {/* APPLICATION TAB */}
                            <div
                              className={`origin-top transition-all duration-500 ease-in-out ${
                                hmmTab === "application"
                                  ? "opacity-100 translate-y-0 scale-y-100"
                                  : "pointer-events-none absolute inset-0 opacity-0 -translate-y-2 scale-y-[0.985]"
                              }`}
                            >
                              <div className="space-y-5">
                                <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
                                  Demand of 2021 going into 2022
                                </h2>

                                <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
                                  The live model below allows live analysis
                                  with any time period. The
                                  presented default view is the electricity
                                  market from June 2021 to July 20222 to
                                  showcase latent states present. 


Regarding the number of latent states, Markov Modelling explores a latent mixture of prior models first from which an optimal number of states are identified using
                                  the BIC criterion. However should an analyst
                                  have strongly good reason to already know a
                                  pre identified number of states, they may also
                                  key in the number and carry out respective
                                  analysis.
                                </p>

                                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                  <iframe
                                    loading="lazy"
                                    src={
                                      hmmTab === "application"
                                        ? "https://christopherleeaung.shinyapps.io/DemandHMM/"
                                        : undefined
                                    }
                                    title="Demand HMM Shiny Research Interface"
                                    className="h-[780px] w-full"
                                  />
                                </div>

                                <p className="text-justify text-[8px] leading-relaxed text-gray-600">
                                  Hidden Markov Modelling applied onto
                                  electricity demand from 2021 to 2022. Data
                                  from National Electricity Market Singapore,
                                  Demand 2021 to 2022. Output source: Author
                                </p>

                              <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
Regime membership plots reveal that observations transit frequently between states, indicating that electricity demand is still cyclical and recurrent rather than reacting to post pandemic realities, be it policy or price influenced constraints. State occupancy is dominated by two principal conditions; higher demand periods see large concentrations of State 1 and State 2, while lower demand markets are defined by States 3 and 4. Each latent state maintains a relatively stable demand profile over time, supporting the interpretation that demand is better profiled through persistent structural operating conditions rather than dramatic short term statistical anomalies.

State distributions further confirm that the four regimes capture differences in electricity consumption behaviour. State 2 represents the highest operating regime, with observations concentrated between 6,500 MW and 6,700 MW, consistent with periods of elevated economic activity and stronger electricity consumption. State 1 forms the baseline operating regime, centred near 6,350 MW to 6,450 MW. State 3 occupies an intermediate low demand regime around 6,050 MW to 6,250 MW, while State 4 represents the lowest demand environment, centred near 5,850 MW to 6,000 MW. Although some overlap exists between neighbouring distributions, the density functions remain sufficiently separated to support reliable state classification.

Transition dynamics indicate regime persistence differs substantially across states. State 1 exhibits the highest persistence, with a self-transition probability of approximately 0.76, implying that once the market enters its baseline demand environment it is likely to remain there. State 4 also demonstrates moderate persistence with a probability near 0.58, suggesting that periods of demand contraction tend to cluster together. In contrast, States 2 and 3 display relatively low persistence, implying expansionary and transitional demand conditions are less likely to endure. Taken together, the results suggest that Singapore's electricity demand is characterised by a stable core operating regime surrounded by recurring periods of expansion and contraction.
                           </p>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
 <details className="group py-1">
  <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-[15px] font-semibold leading-snug text-[#1a1f2b]">
          Structural Changes Beyond Temporals in Solar Generation
        </h3>


      </div>
      <span className="ml-5 text-xl leading-none text-gray-600 transition-transform duration-500 ease-out group-open:rotate-45">
        +
      </span>

    </div>
  </summary>

  <div className="mt-8 origin-top space-y-8 opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Solar generation has expanded steadily over recent years, reflecting continued investment in Singapore's photovoltaic energy generating capacity. This also reflects confidence in Singapore's long-term irradiance profile to be stable regardless seasonal fluctuations. However increased solar generation variance has created impressions that market participants are deploying greater amounts of capital into a competitive environment with little calculation for intermittency risk. This raises the question if rising fluctuations are a natural consequence of installing a larger solar fleet, or if it is reflective of an increasingly unoptimal operation structure. To distinguish between cyclical weather driven variability and genuine shifts in the underlying market, a Bayesian Estimator of Abrupt Change, Seasonality and Trend (BEAST) decomposition can be applied to identify structural breakpoints, evolving trends, and changes in seasonal behaviour. Such an approach allows the analysis to determine whether the observed increase in variance is sufficient evidence of industry transformation beyond normal meteorological influences, and whether new structural dynamics in capital deployment, technology adoption, or system integration are emerging within the solar sector.


</p>


    <div className="mb-8 flex gap-12 overflow-x-auto border-b border-gray-200">


      {BEAST_TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setBeastTab(tab.value);
          }}
          className={`pb-1.5 text-[11.5px] font-medium transition-all duration-300 ${
            beastTab === tab.value
              ? "border-b-2 border-blue-950 text-blue-950"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>


    {beastTab === "profiling" && (
      <div className="space-y-5 animate-fadeIn">
        <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
 Bayesian Estimator of Abrupt Change, Seasonality and Trend Conclusions on Structural Breaks
        </h2>

<section className="w-full bg-white px-1 py-1 text-[#666d7a]">
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.95fr_1.15fr]">

    {/* LEFT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        Solar Trend Diagnostics
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>Pre-Changepoint</div>
        <div>Post-Changepoint</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 grid grid-cols-2 gap-8">

        <div className="space-y-1">
          {[
            ["Period", "Mar 2024", ""],
            ["Trend", "150 Index", ""],
            ["Regime", "Stable", ""],
            ["Growth", "Low", ""],
          ].map(([metric, value, change]) => (
            <div key={metric} className="grid grid-cols-[50px_1fr_42px] items-center">
              <span className="text-[8px] text-gray-600">{metric}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
              <span className="text-[8px] font-semibold text-gray-600">{change}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {[
            ["Period", "Mar 2026", "+24 mths"],
            ["Trend", "220 Index", "+46.7%"],
            ["Regime", "Expansion", ""],
            ["Growth", "Persistent", ""],
          ].map(([metric, value, change]) => (
            <div key={metric} className="grid grid-cols-[50px_1fr_42px] items-center">
              <span className="text-[8px] text-gray-600">{metric}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
              <span className="text-[8px] font-semibold text-gray-600">{change}</span>
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* RIGHT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        Solar Structural Profile
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>Statistic</div>
        <div>Interpretation</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 grid grid-cols-2 gap-8">

        <div className="space-y-1">
          {[
            ["TCP", "0.30"],
            ["Mean", "-0.34"],
            ["Var", "1567.35"],
            ["Skew", "-0.65"],
            ["Kurt", "3.54"],
            ["SW", "0.975"],
          ].map(([state, value]) => (
            <div key={state} className="grid grid-cols-[28px_1fr] items-center">
              <span className="text-[8px] text-gray-600">{state}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{value}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {[
            ["TCP", "Major Feb-2025 trend break"],
            ["Mean", "No systematic bias"],
            ["Var", "High daily uncertainty"],
            ["Skew", "Larger downside shocks"],
            ["Kurt", "Fat-tailed residuals"],
            ["SW", "Reject normality"],
          ].map(([state, desc]) => (
            <div key={state} className="grid grid-cols-[28px_1fr] items-center">
              <span className="text-[8px] text-gray-600">{state}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">{desc}</span>
            </div>
          ))}
        </div>

      </div>
    </div>

  </div>
</section>



        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

BEAST decomposition reveals that Singapore's solar generation market experienced structural transition around late January to early February 2025. Prior to this, solar generation trends were relatively stable around 150MW. Following the solar capital expansion through heavy investment commitments,  the underlying trend shifted upward abruptly to around 180MW before continuing a gradual increase, hitting 220MW by March 2026. Subsequent spikes during August to September 2025 are comparatively weaker and are insufficient to indicate major structural change. This suggests that the principal driver of solar growth was a single capacity expansion event rather than a sequence of multiple investment rounds or gradual growth that accumulates to significant change. </p>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

The QQ plot and Shapiro-Wilk test (W = 0.9749, p &lt; 0.001) reject normality of error terms, implying olar deviations are influenced by occasional extreme weather events or cloud cover episodes. Given the still growing market structure of the solar industry, operational constraints should not be considered as responsible forces behind irregular behaviour. 
</p>

        <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
          Solar Generation from 2024 to 2026
        </h2>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

          Formal reporting for solar generation was only published by the National Energy Market Singapore (NEMS) following March 2024. Prior, while solar generation is present in the national market, supply figures remains largely contained within stakeholder circles and relevant contracted parties only. An increasingly important characteristic of solar generation in Singapore is its propensity to be shaped more by industry policy and industrial agreements rather than technological and capital constraints. While natural factors will continue playing an important role, supply will increasingly become associated with policy measures such as virtual power plant schemes, curtailment or energy storage systems beyond conventional notions of basic grid infrastructure and technology capacity. </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/solardecomp.png"
            className="my-5 mr-auto w-full max-w-[900px] object-contain"
          />

        <p className="mt-3 max-w-4xl text-justify text-[8px] leading-relaxed text-gray-600">
12 month seasonal and trend decompositions on solar supply time series. Data from National Electricity Market, March 2024 to March 2026. Output Source: Author</p>


        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Trend decompositions were interesting in the first 12 months as even following relatively strong smoothening, a fluctuating trend reflected quarterly moving structural changes that hint at capacity constraints, operational availability or system integration in the midst of weather persistence. Inspecting weather persistence also yielded interesting results; the same 12 month period reflected variations in supply that are unlikely linked to changing weather conditions. Given Singapore's relatively unchanged irradiance conditions, the change in seasonality supply hints at structural and operational changes more. 
        </p>

          <img
            loading="lazy"
            decoding="async"
            src="/images/Solarcomp.png"
            className="my-5 mr-auto w-full max-w-[900px] object-contain"
          />

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Formal statistical inspections on differences in seasonally reveal that while seasonality production trends are statistically different, the median levels of solar generation remain the same. This gives good insight that inherent structures are stable despite changes in production arrangements. Regarding trend however, there is statistical evidence to reject both notions that both trends and the median trend lines are different, hinting at increased capacity of solar generation. Combining these two output it gives a promising revelation that solar generation is increasing in a stable manner, where national production has proven itself robust so far given the unchanging seasonal median. 
        </p>


      </div>
    )}

    {beastTab === "issues" && (
      <div className="space-y-5 animate-fadeIn">
        <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
Variance in solar generation from 2024 to 2026
        </h2>


<section className="w-full bg-white px-1 py-1 text-[#666d7a]">
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
    {/* LEFT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        Average Solar Generation Variance
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>2024: March to December
2025: January to December</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 space-y-1">
        <div className="grid grid-cols-[70px_1fr] items-center">
          <span className="text-[8px] text-gray-600">2024</span>
          <span className="text-[8px] font-semibold text-[#1a1f2b]">
            7091.61 MW
          </span>
        </div>

        <div className="grid grid-cols-[70px_1fr] items-center">
          <span className="text-[8px] text-gray-600">2025</span>
          <span className="text-[8px] font-semibold text-[#1a1f2b]">
            13522.05 MW
          </span>
        </div>

        <div className="grid grid-cols-[70px_1fr] items-center pt-2">
          <span className="text-[8px] text-gray-600">▲</span>
          <span className="text-[8px] font-semibold text-[#1a1f2b]">
            90.68%
          </span>
        </div>
      </div>
    </div>

    {/* RIGHT CARD */}
    <div className="rounded-[24px] bg-gray-50 p-6">
      <p className="text-[10px] font-semibold leading-snug text-[#1a1f2b]">
        4 Month Rolling Variance
      </p>

      <div className="mt-1 grid grid-cols-2 gap-8 text-[8px] text-gray-600">
        <div>Mar 2024 – Feb 2025</div>
        <div>Mar 2025 – Feb 2026</div>
      </div>

      <div className="mt-1 h-px bg-gray-300" />

      <div className="mt-3 grid grid-cols-2 gap-8">
        <div className="space-y-1">
          {[
            ["Q1", "6118.25 MW", ""],
            ["Q2", "6275.00 MW", "+2.56%"],
            ["Q3", "7929.78 MW", "+26.37%"],
            ["Q4", "8043.40 MW", "+1.43%"],
          ].map(([q, value, change]) => (
            <div
              key={q}
              className="grid grid-cols-[22px_1fr_42px] items-center"
            >
              <span className="text-[8px] text-gray-600">{q}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">
                {value}
              </span>
              <span className="text-[8px] font-semibold text-gray-600">
                {change}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {[
            ["Q1", "13536.86 MW", "+68.23%"],
            ["Q2", "12523.74 MW", "-7.48%"],
            ["Q3", "17133.40 MW", "+36.81%"],
            ["Q4", "10792.83 MW", "-37.01%"],
          ].map(([q, value, change]) => (
            <div
              key={q}
              className="grid grid-cols-[22px_1fr_42px] items-center"
            >
              <span className="text-[8px] text-gray-600">{q}</span>
              <span className="text-[8px] font-semibold text-[#1a1f2b]">
                {value}
              </span>
              <span className="text-[8px] font-semibold text-gray-600">
                {change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

          <img
            loading="lazy"
            decoding="async"
            src="/images/timesvar.png"
            className="my-5 mr-auto w-full max-w-[900px] object-contain"
          />

                                <p className="text-justify text-[8px] leading-relaxed text-gray-600">
                                 Historical rolling monthly variance of solar energy generation, March 2024 to February 2026, National Electricity Market. Output: Author
                                </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

While growing variance hinted fundamentally different weather conditions, meteorological conditions influencing irradiance have not changed noticeably. This implies earlier seen variance in 2024 prior to extensive solar capital investment reflects the stabilised market with the given amount of capital. This means some underlying lower level of variance will reflect natural circumstances, while higher variance must be characterised by multiplicative magnitude to account for the increased variance that comes with additional solar capital. </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

This can be seen in early 2025 where growing solar operations under non-unique meteorological conditions contributed to the largest variance in the later year, reaching approximately 26,000 MW. While this peak variance later declined, it remained materially higher than prior 2024 levels, suggesting the market has reached a new reality of increased capital and variance. </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">

A TimesFM based forecast expects monthly variance to remain elevated but broadly ranging into the remainder of 2026 based on the expectation that no further dramatic investments or expansions of solar capital are undertaken. Seemingly hints at September 2025's increment had to be some unusual spike relating to capital related factors rather than weather; Singapore's rainfall in September 2025 was not the lowest despite clocking in the highest solar generation.
</p>

  

      </div>
    )}

    {beastTab === "methodology" && (
      <div className="space-y-5 animate-fadeIn">
        <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
          Methodology
        </h2>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
          BEAST, the Bayesian Estimator of Abrupt change, Seasonality, and Trend, is a Bayesian model-averaging algorithm for decomposing one-dimensional sequential data into abrupt-change, trend, and seasonal or periodic components. Zhao et al. describe the method as an ensemble alternative to single-best-model decomposition. Instead of selecting one deterministic specification, BEAST evaluates many possible decompositions and averages across them using posterior model probabilities.
        </p>

        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          This is useful for solar generation because structural interpretation is sensitive to model choice. A linear based model may miss nonlinear supply changes while a fixed seasonal decomposition can overstate regularity, and single breakpoint models force transitions onto processes that changes gradually or repeatedly. BEAST reduces this dependence on one assumed structure, being the seasonality of expected irradiance, and by so allowing trend and seasonal change points to be inferred probabilistically.
        </p>


        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          The method is relevant for change-point detection, breakpoints, structural breaks, joinpoints, regime shifts, anomalies, nonlinear trend detection, seasonal-trend decomposition, time-series segmentation, interrupted time-series analysis, outlier detection, curve fitting, smoothing, and gap-filling of one-dimensional curves. While the original demonstration is associated with satellite and environmental time-series data, the statistical structure is generic and can be transferred to electricity-market solar supply because the series is also sequential, seasonal, noisy, and vulnerable to abrupt changes.
        </p>

      </div>
    )}

    {beastTab === "modelling" && (
      <div className="space-y-5 animate-fadeIn">
        <h2 className="text-[15px] font-semibold text-[#1a1f2b]">
          BEAST Modelling
        </h2>

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
          The modelling interface applies BEAST to electricity-market data so that posterior break probabilities, trend shifts, and seasonal movements can be inspected jointly.
          The output is read in four stages. First, it inspects whether posterior change point probabilities cluster around specific dates. Secondly, it checks whether the trend component changes level or slope after those dates. Thirdly, it inspect whether the seasonal component changes amplitude or phase. And lastly, it compare residual behaviour before and after the suspected breaks. 

        </p>


        <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
          Observably from March to December 2024, daily mean solar output is lower across April to June, increasing again through July to October, and reaching tits highest in late September. BEAST is therefore applied to testing whether these movements represent ordinary seasonal variation or a statistically persistent change in the realised solar supply process.
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <iframe
            loading="lazy"
            src={
              beastTab === "modelling"
                ? "https://christopherleeaung.shinyapps.io/BeastR/"
                : undefined
            }
            title="BEAST Shiny Research Interface"
            className="h-[780px] w-full"
          />
        </div>
      </div>
    )}
  </div>
</details>



                </div>
              </div>
            </div>

            <div className="mb-11">
              <h2 className="mb-2 text-[20px] font-semibold tracking-tight text-[#4a4a4a]">
                Scenario and Stress Modelling
              </h2>
              <div className="border-t border-[#C9CCD0] pt-1">
                <div className="space-y-2">
                  <details
                    className="group py-5"
                    onToggle={(event) => {
                      if (event.currentTarget.open) setForecastTab("indusover");
                    }}
                  >
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold leading-snug text-[#1a1f2b]">
                            Bayesian Applications in Classical and Machine Learning Forecasting
                          </h3>
                        </div>
                        <span className="ml-6 text-xl leading-none text-gray-600 transition-transform duration-500 ease-out group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>
                    <div className="mt-6 origin-top opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">
                      <StandardModellingContent
                        forecastTab={forecastTab}
                        setForecastTab={setForecastTab}
                      />
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
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

        <EnquirySection />
      </main>
    </div>
  );
}
