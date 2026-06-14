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
import AIRevaluationDashboard from "./components/AIRevaluationDashboard";

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

const BASTION_APP_URL =
  process.env.NEXT_PUBLIC_BASTION_APP_URL?.trim() ?? "";

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
Designed and evaluated hybrid forecasting frameworks combining Bayesian filtering, classical econometric models, and machine learning techniques for electricity market prediction. Compared Bayesian-enhanced SARIMA models with machine learning–based approaches, including Google TimesFM and XGBoost-optimised forecasting pipelines, to assess forecast accuracy, uncertainty quantification, and predictive robustness under volatile market conditions. Implemented Monte Carlo simulation, probabilistic forecasting, and residual-learning architectures to examine the extent to which machine learning contributes incremental information beyond established statistical models. Produced a comparative assessment of forecasting performance across multiple model classes using out-of-sample validation and risk-adjusted evaluation metrics.</p>

      <p className="mt-3 max-w-4xl text-justify text-[8px] leading-relaxed text-gray-600">
Bayesian Forecasting, SARIMA, XGBoost, TimesFM, Monte Carlo Simulation, Machine Learning, Predictive Analytics, Probabilistic Forecasting, Model Validation, Forecast Evaluation, Electricity Markets.
 </p>

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

const [aiGraphTab, setAiGraphTab] =
  useState<"app" | "methodology" | "findings" | "policy">("app");

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
                        <div className="mb-11">
              <h2 className="mb-2 text-[20px] font-semibold tracking-tight text-[#4a4a4a]">
                Artificial Intelligence and Sectoral Revaluation
              </h2>
              <div className="border-t border-[#C9CCD0] pt-1">
                <div className="space-y-2">
                  <details className="group py-5">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold leading-snug text-[#1a1f2b]">
                            Mapping Artificial Intelligence Revaluation Influences on Singapore's Banking Landscape through a Graph Augmented Structural Model 
                          </h3>
                        </div>
                        <span className="ml-6 text-xl leading-none text-gray-600 transition-transform duration-500 ease-out group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>

<div className="mt-6 origin-top opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">
  <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
A Retrieval-Augmented Generation (RAG) graph structure examining the degree of artificial intelligence policy adoption that influences bank valuations operating in Singapore. Given artificial intelligence becoming increasingly deployed in daily bank ordinance and operations, evaluating its relevance beyond productivity and into capital appreciation, be it human, technical or technological, is increasingly on investor's watch list. By incorporating different dimensions of information ranging from policy adherence to product depth implementation, a visual overview identifying where banks draw their degree of implementation can be identified. 
  </p>

<p className="mb-5 max-w-4xl text-justify text-[10px] leading-relaxed text-gray-600 italic">

This preview is a simulation of a prototype GraphRAG that showcases the results of custom queries in a generic manner. The actual model allows users to pull total custom enquiries and obtain model trained responses from a Neo4j database using Cypher that obtains information from a LLM retrieval pipeline. In this project however, the information is hard coded within and there is no deployment of a dynamic query fetch mechanism.
  </p>

<div className="mb-6 flex gap-12 overflow-x-auto border-b border-gray-200">
  {[
    { id: "app", label: "Application" },
    { id: "methodology", label: "Methodology" },
    { id: "findings", label: "Findings" },
    { id: "policy", label: "Policies" },
  ].map((tab) => (
    <button
      key={tab.id}
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setAiGraphTab(
          tab.id as "app" | "methodology" | "findings" | "policy"
        );
      }}
      className={`pb-2 text-[11.5px] font-medium transition-all duration-300 ${
        aiGraphTab === tab.id
          ? "border-b-2 border-blue-950 text-blue-950"
          : "text-gray-500 hover:text-gray-800"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>



{aiGraphTab === "policy" && (
  <div className="animate-fadeIn space-y-5">

    <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
      Singapore&apos;s AI policy environment for banking is best read as a
      layered governance stack. National AI Strategy 2.0 provides the economic
      and capability direction, MAS FEAT defines responsible-AI principles,
      Project Veritas operationalises those principles into testable controls,
      GenAI guidance and MindForge extend supervision into LLM deployment, while
      COSMIC runs alongside the stack as financial-crime information
      infrastructure that AI systems can exploit for AML analytics.
    </p>

    <div className="mb-6 border-t border-[#C9CCD0] pt-4">


      <div className="space-y-4">
        {[
          {
            title: "National AI Strategy 2.0",
            tag: "Macro Strategy",
            year: "2023",
            hierarchy: "National economic and technological direction",
            body:
              "National economic and technological strategy covering talent, industry adoption, infrastructure, research, safety and international leadership.",
            bank:
              "Signals long-run public support for bank AI investment, data infrastructure, AI talent formation and cross-border AI services.",
          },
          {
            title: "MAS FEAT Principles",
            tag: "Responsible AI",
            year: "2018",
            hierarchy: "Responsible-AI principles for financial services",
            body:
              "Fairness, Ethics, Accountability and Transparency principles for responsible AI and data analytics in financial services.",
            bank:
              "Relevant to credit scoring, fraud detection, customer segmentation and wealth-management recommendation systems.",
          },
          {
            title: "Project Veritas",
            tag: "Operational Controls",
            year: "FEAT Implementation",
            hierarchy: "Operationalisation of FEAT into measurable controls",
            body:
              "Translates FEAT from abstract principles into governance templates, risk methods, explainability metrics and fairness testing frameworks.",
            bank:
              "Allows banks to test whether AI decisions differ systematically across groups and whether model behaviour can be explained to regulators.",
          },
          {
            title: "MAS GenAI Guidelines",
            tag: "GenAI Governance",
            year: "LLM Controls",
            hierarchy: "Responsible deployment guidance for Generative AI",
            body:
              "Guidance on hallucination risk, privacy, cybersecurity, human oversight, vendor risk and third-party model governance.",
            bank:
              "Clarifies how employees may use ChatGPT-like tools, how confidential data should be protected, and how outputs require validation.",
          },
          {
            title: "Project MindForge",
            tag: "GenAI Adoption",
            year: "Supervisory Sandbox",
            hierarchy: "Safe GenAI experimentation and regulatory engagement",
            body:
              "Supports safe financial-sector GenAI adoption through implementation patterns, testing environments, risk controls and regulatory engagement.",
            bank:
              "Applies to relationship-manager copilots, internal knowledge assistants, compliance review assistants, research and reporting automation.",
          },
          {
            title: "COSMIC AML Platform",
            tag: "AML Infrastructure",
            year: "Financial Crime",
            hierarchy: "Parallel financial-crime information infrastructure",
            body:
              "Collaborative information-sharing platform for money-laundering, terrorism-financing and suspicious-customer intelligence.",
            bank:
              "Not primarily an AI policy, but creates richer data conditions for transaction monitoring, network analysis and suspicious-activity detection.",
          },
        ].map((item, idx) => (
          <details key={item.title} className="group border-b border-gray-200 pb-4">
            <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="mb-1 flex flex-wrap gap-x-3 gap-y-1 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-gray-400">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <span>{item.tag}</span>
                    <span>{item.year}</span>
                  </div>

                  <h4 className="text-[13px] font-semibold text-[#1a1f2b]">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-[11.5px] leading-relaxed text-gray-500">
                    {item.hierarchy}
                  </p>
                </div>

                <span className="text-[18px] leading-none text-gray-500 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>

            <div className="mt-4 space-y-3 pl-0">
              <p className="text-justify text-[11.5px] leading-relaxed text-gray-600">
                {item.body}
              </p>

              <p className="text-justify text-[11.5px] leading-relaxed text-gray-600">
                <span className="font-semibold text-[#3F3A33]">
                  Banking implication:
                </span>{" "}
                {item.bank}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>

    <p className="mt-3 text-justify text-[8px] leading-relaxed text-gray-600">
      Policy architecture summary for Singapore banking AI governance,
      including FEAT, Project Veritas, Project MindForge, National AI
      Strategy 2.0, COSMIC and MAS GenAI guidance. Source: Monetary Authority
      of Singapore and Smart Nation Singapore. Output: Author 
    </p>



  {/* ==========================================================
      2. STATIC POLICY-TO-VALUATION TRANSMISSION PATHWAY
  ========================================================== */}
  <div className="overflow-hidden rounded-[26px] border border-[#D7D2C8] bg-white shadow-sm">
    <div className="border-b border-[#D7D2C8] bg-[#F8F5EF] px-5 py-4 md:px-6">


      <h4 className="text-[13px] font-semibold text-[#3F3A33]">
       Structural transmission: MAS Policy to Bank Valuation
      </h4>

      <p className="mt-2 max-w-3xl text-justify text-[11.5px] leading-relaxed text-gray-600">
        The degree of policy adoption or adherence does not enter influence valuation as an automatic direct effect. 
        Depending on the nature of operation of a bank, the governance requirements and implementation incentives differ vastly. As such the degree at which a bank can adopt and sincerely adapt its operations accordingly is where the first critical point is noted. From there, the second critical component relates to investor's responses to observable valuations; essentially how well can banks communicate their deployment and attribute changes in valuation to integration is also key. 
      </p>
    </div>

    <div className="px-4 py-5 md:px-6 md:py-6">
      <svg
        viewBox="0 0 1160 350"
        role="img"
        aria-labelledby="transmissionPathTitle transmissionPathDescription"
        className="h-auto w-full"
      >
        <title id="transmissionPathTitle">
  MAS policy to bank valuation transmission pathway
        </title>

        <desc id="transmissionPathDescription">
          MAS policy influences AI governance, which influences bank AI
          deployment, which may produce operating and risk effects before a
          valuation response is examined using return and structural break
          evidence.
        </desc>

        <defs>
          <marker
            id="sepiaArrow"
            viewBox="0 0 10 10"
            refX="8.5"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#817463" />
          </marker>

          <filter
            id="softShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#6F6253"
              floodOpacity="0.14"
            />
          </filter>

          <linearGradient id="policyFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#F2EEE7" />
            <stop offset="100%" stopColor="#E5DCCF" />
          </linearGradient>

          <linearGradient id="governanceFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#EEE9E1" />
            <stop offset="100%" stopColor="#DDD2C2" />
          </linearGradient>

          <linearGradient id="deploymentFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#E9E2D8" />
            <stop offset="100%" stopColor="#CFC1AF" />
          </linearGradient>

          <linearGradient id="operationsFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#E2D8CB" />
            <stop offset="100%" stopColor="#BFAF9B" />
          </linearGradient>

          <linearGradient id="valuationFill" x1="0" x2="1">
            <stop offset="0%" stopColor="#C6B7A4" />
            <stop offset="100%" stopColor="#93816C" />
          </linearGradient>
        </defs>

        {/* Main arrows */}
        {[
          [210, 145, 252, 145],
          [428, 145, 470, 145],
          [646, 145, 688, 145],
          [864, 145, 906, 145],
        ].map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#817463"
            strokeWidth="2.5"
            markerEnd="url(#sepiaArrow)"
          />
        ))}

        {/* Stage 1: MAS policy */}
        <g filter="url(#softShadow)">
          <rect
            x="24"
            y="75"
            width="186"
            height="140"
            rx="21"
            fill="url(#policyFill)"
            stroke="#A99C8B"
            strokeWidth="1.5"
          />
        </g>

        <circle
          cx="117"
          cy="104"
          r="14"
          fill="#8E806E"
          stroke="#665A4D"
          strokeWidth="1.3"
        />
        <text
          x="117"
          y="109"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
        >
          1
        </text>

        <text
          x="117"
          y="138"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#403930"
        >
          MAS Policy
        </text>

        <text
          x="117"
          y="160"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          FEAT · Veritas · GenAI
        </text>
        <text
          x="117"
          y="177"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          MindForge · COSMIC
        </text>

        <text
          x="117"
          y="199"
          textAnchor="middle"
          fontSize="9"
          fill="#857B6F"
        >
          Regulatory direction
        </text>

        {/* Stage 2: Governance */}
        <g filter="url(#softShadow)">
          <rect
            x="252"
            y="75"
            width="176"
            height="140"
            rx="21"
            fill="url(#governanceFill)"
            stroke="#9D8F7E"
            strokeWidth="1.5"
          />
        </g>

        <circle
          cx="340"
          cy="104"
          r="14"
          fill="#827462"
          stroke="#625648"
          strokeWidth="1.3"
        />
        <text
          x="340"
          y="109"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
        >
          2
        </text>

        <text
          x="340"
          y="138"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#403930"
        >
          AI Governance
        </text>

        <text
          x="340"
          y="160"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          Accountability · fairness
        </text>
        <text
          x="340"
          y="177"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          validation · controls
        </text>

        <text
          x="340"
          y="199"
          textAnchor="middle"
          fontSize="9"
          fill="#857B6F"
        >
          Institutional safeguards
        </text>

        {/* Stage 3: Deployment */}
        <g filter="url(#softShadow)">
          <rect
            x="470"
            y="75"
            width="176"
            height="140"
            rx="21"
            fill="url(#deploymentFill)"
            stroke="#91816F"
            strokeWidth="1.5"
          />
        </g>

        <circle
          cx="558"
          cy="104"
          r="14"
          fill="#756653"
          stroke="#584B3E"
          strokeWidth="1.3"
        />
        <text
          x="558"
          y="109"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
        >
          3
        </text>

        <text
          x="558"
          y="138"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#403930"
        >
          Bank Deployment
        </text>

        <text
          x="558"
          y="160"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          Risk · AML · service
        </text>
        <text
          x="558"
          y="177"
          textAnchor="middle"
          fontSize="10.5"
          fill="#665E54"
        >
          credit · operations
        </text>

        <text
          x="558"
          y="199"
          textAnchor="middle"
          fontSize="9"
          fill="#857B6F"
        >
          Observable implementation
        </text>

        {/* Stage 4: Operating effects */}
        <g filter="url(#softShadow)">
          <rect
            x="688"
            y="75"
            width="176"
            height="140"
            rx="21"
            fill="url(#operationsFill)"
            stroke="#837361"
            strokeWidth="1.5"
          />
        </g>

        <circle
          cx="776"
          cy="104"
          r="14"
          fill="#6D5D4A"
          stroke="#514335"
          strokeWidth="1.3"
        />
        <text
          x="776"
          y="109"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
        >
          4
        </text>

        <text
          x="776"
          y="138"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#403930"
        >
          Operating Effects
        </text>

        <text
          x="776"
          y="160"
          textAnchor="middle"
          fontSize="10.5"
          fill="#5E554C"
        >
          Efficiency · risk control
        </text>
        <text
          x="776"
          y="177"
          textAnchor="middle"
          fontSize="10.5"
          fill="#5E554C"
        >
          revenue · confidence
        </text>

        <text
          x="776"
          y="199"
          textAnchor="middle"
          fontSize="9"
          fill="#766B60"
        >
          Economic transmission
        </text>

        {/* Stage 5: Valuation */}
        <g filter="url(#softShadow)">
          <rect
            x="906"
            y="75"
            width="230"
            height="140"
            rx="21"
            fill="url(#valuationFill)"
            stroke="#695A49"
            strokeWidth="1.7"
          />
        </g>

        <circle
          cx="1021"
          cy="104"
          r="14"
          fill="#514437"
          stroke="#3D332A"
          strokeWidth="1.3"
        />
        <text
          x="1021"
          y="109"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#FFFFFF"
        >
          5
        </text>

        <text
          x="1021"
          y="138"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#FFFFFF"
        >
          Valuation Response
        </text>

        <text
          x="1021"
          y="160"
          textAnchor="middle"
          fontSize="10.5"
          fill="#F6F1EA"
        >
          Abnormal returns · breaks
        </text>
        <text
          x="1021"
          y="177"
          textAnchor="middle"
          fontSize="10.5"
          fill="#F6F1EA"
        >
          persistence · volatility
        </text>

        <text
          x="1021"
          y="199"
          textAnchor="middle"
          fontSize="9"
          fill="#E9E0D5"
        >
          Market-evidence layer
        </text>

        {/* Evidence assessment line */}
        <path
          d="M 558 232 C 650 285, 890 285, 1021 232"
          fill="none"
          stroke="#9C8E7D"
          strokeWidth="1.7"
          strokeDasharray="6 6"
          markerEnd="url(#sepiaArrow)"
        />

        <rect
          x="604"
          y="263"
          width="380"
          height="47"
          rx="15"
          fill="#F7F3ED"
          stroke="#C9BFB2"
          strokeWidth="1.2"
        />

        <text
          x="783"
          y="282"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="700"
          fill="#51493F"
        >
          Structural-break and event-window assessment
        </text>

        <text
          x="783"
          y="299"
          textAnchor="middle"
          fontSize="9"
          fill="#7A7065"
        >
          Tests whether deployment timing corresponds with observable market repricing
        </text>


      </svg>
    </div>

    {/* Mobile fallback */}
    <div className="border-t border-[#D7D2C8] bg-[#F8F5EF] px-5 py-4 md:hidden">
      <div className="flex flex-wrap items-center justify-center gap-2 text-[9.5px] font-semibold text-[#554C42]">
        <span className="rounded-lg border border-[#D0C6B9] bg-white px-2.5 py-1.5">
          MAS policy
        </span>
        <span aria-hidden="true">→</span>
        <span className="rounded-lg border border-[#C9BEAF] bg-[#EEE8DF] px-2.5 py-1.5">
          AI governance
        </span>
        <span aria-hidden="true">→</span>
        <span className="rounded-lg border border-[#B8AA98] bg-[#DDD2C4] px-2.5 py-1.5">
          Bank deployment
        </span>
        <span aria-hidden="true">→</span>
        <span className="rounded-lg border border-[#9F8E79] bg-[#C6B7A4] px-2.5 py-1.5">
          Operating effects
        </span>
        <span aria-hidden="true">→</span>
        <span className="rounded-lg border border-[#665746] bg-[#8E806E] px-2.5 py-1.5 text-white">
          Valuation response
        </span>
      </div>
    </div>
  </div>


  </div>


)}





  {aiGraphTab === "app" && (
    <div>
      <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
        The live interface below is a prototype built on estimated returns to demonstrate the model architecture. In the full deployment, the simulated return signals are replaced with Yahoo Finance monthly returns, realised abnormal return estimates and fit into a BASTION time series decomposition. The interface present graphical presentation of institutional exposure as a calibrated transmission model, its technical table, and finally a comparative calibration page that explains how these scores are contributed. 
      </p>



      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <iframe
          loading="lazy"
          src="https://christopherleeaung.shinyapps.io/Neo4j_Graph_Bank_AI/"
          title="Graph-Augmented Structural Revaluation Model Shiny Research Interface"
          className="h-[900px] w-full"
        />
      </div>

      <p className="mt-3 text-justify text-[8px] leading-relaxed text-gray-600">
        Interactive graph augmented AI revaluation model for Singapore's banking landscape. The interface demonstrates edge strength calibration, policy to bank transmission pathways, adoption scoring, structural break alignment, and ML optimised parameter weighting. Output Source: Author.
      </p>
    </div>
  )}

{aiGraphTab === "methodology" && (
  <div>


    <img
      loading="lazy"
      decoding="async"
      src="/images/method.png"
      alt="Methodology"
      className="my-5 mx-auto w-full max-w-[800px] object-contain"
    />

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  Policy nodes enter the framework through two related channels. First, each
  policy is connected to AI evaluation dimensions that pertains governance and, or adoption and integration. Second, each policy characterised by
  implementation dates alongside any public or private news regarding evaluation windows. These dates determine each institution's timeline against which changes in bank returns are examined.
  The policy layer therefore does not directly determine revaluation but relies on
timing and regulatory context in which an AI-related valuation response occurs.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  Bank return nodes form the market evidence layer with each return series presenting market valuation of the corresponding bank over time. These are subjected to a BASTION decomposition process where identification of statistically significant changes in structural trend, volatility, regime behaviour, and changepoint probability are assessed.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  The central analytical step is the comparison between two dated objects:
  policy or AI-evaluation dates are evaluated against BASTION detected structural break dates.
  For some policy event occurring within a particular bank, temporal alignment reflected in its evaluation series may be represented as
  <InlineMath math="A_{i,e}=\exp\left(-\frac{|\tau^{B}_{i}-\tau^{AI}_{e}|}{h}\right)" />,
  where <InlineMath math="\tau^{AI}_{e}" /> is the implementation or evaluation
  date of the AI related event or policy window, and <InlineMath math="\tau^{B}_{i}" /> is the
  corresponding BASTION break date. <InlineMath math="h" /> controls how
  quickly the alignment score declines across time. A high
  value indicates that a return break occurred close to the AI policy subject 
  window, while a low value indicates weak temporal correspondence.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  The structural break assessment node summarises this comparison. It receives
  the implementation dates from the policy layer and the identified return breaks
  from BASTION then evaluates whether the timing, direction, and persistence of
  the market response are consistent with the proposed AI transmission
  mechanism. The assessment is stronger when a break occurs close to the event
  date, abnormal returns are economically aligned with publications and stakeholder announcements alongside volatility or regime
  behaviour changes.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  The final revaluation assessment combines two forms of support. The return
  evidence indicates whether the bank experienced unusual market repricing,
  while the structural evidence indicates whether that repricing coincided with
  a relevant AI or policy implementation period. The graph should therefore be
  read as Country and Segment
  <InlineMath math="\rightarrow" /> Bank Context,
  Bank <InlineMath math="\rightarrow" /> AI Capability,
  Policy <InlineMath math="\rightarrow" /> Dated Implementation Window,
  Bank Returns <InlineMath math="\rightarrow" /> BASTION Decomposition,
  and Policy Dates plus BASTION Break Dates
  <InlineMath math="\rightarrow" /> Structural-Break Assessment
  <InlineMath math="\rightarrow" /> Revaluation Assessment.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
  This framework proposes that evidence of AI policy influence on bank valuation can be detected after establishing explicit channels regarding its adoption, rather than a mere alignment of bank valuation and stakeholder published dates. It is a structured diagnostic relying on
  three jointly present conditions. First, that the bank exhibits relevant AI capability.
  Secondly, the policy or AI adoption occurs within a clearly defined period and lastly that
  the bank&apos;s return series displays significant changes in structural response near AI implementation, policy or adoption
  periods. 
</p>



    <p className="mb-8 max-w-4xl text-justify text-[8px] leading-relaxed text-gray-600">
      Key Skills: Neo4j Graph Modelling, Graph Augmented Structural Modelling, Financial Econometrics, AI Adoption Scoring, Policy Transmission Analysis, Edge-Weight Calibration, Shortest-Path Analysis, Structural Break Detection, BASTION, BEAST, R, Shiny, visNetwork, plotly, igraph.
    </p>
  </div>
)}



  {aiGraphTab === "findings" && (
    <div>

    <p className="text-justify text-[12.5px] leading-relaxed text-gray-600">
      The comparison matrix evaluates whether a bank possesses the capabilities
      required for a credible AI transmission channel. The pathway diagram then
      specifies the ordered mechanism through which those capabilities may
      become relevant to valuation. A high maturity bank does not automatically
      receive a high revaluation score: the model must additionally observe an AI related 
      dated policy or adoption event, an economically plausible operating
      channel regarding its implementation, and market evidence that price valuations occur nearby or across a corresponding evaluation window.
    </p>

<br></br>

{/* ============================================================
    BANK COMPARISON MATRIX + TRANSMISSION PATHWAY
    Insert inside: aiGraphTab === "findings"
    Replace the existing "Suggested Visual Extensions" card.
============================================================ */}

<section className="mb-8 space-y-6">
  {/* ==========================================================
      1. BANK AI CAPABILITY COMPARISON MATRIX
  ========================================================== */}
  
<div className="border-b border-[#D7D2C8]">
  <div className="border-b border-[#D7D2C8] px-5 py-4 md:px-6">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h4 className="text-[13px] font-semibold text-[#3F3A33]">
          Bank AI Capability Comparison Matrix
        </h4>

      </div>

    </div>
  </div>
{/* Comparison table */}
<div className="overflow-x-auto px-0 py-3">
  <table className="w-full min-w-[940px] table-fixed border-collapse border border-[#D8D8D8] bg-white">
    <caption className="sr-only">
      Relative AI capability maturity by bank and capability dimension
    </caption>

    <thead>
      <tr>
        <th scope="col" className="w-[145px] border border-[#D8D8D8] px-2 py-2 text-left text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#545454]">
          Bank
        </th>

        {[
          "Deployment",
          "Data readiness",
          "AI talent",
          "Governance",
          "Disclosure",
          "Product breadth",
          "Overall",
        ].map((dimension) => (
          <th
            key={dimension}
            scope="col"
            className="border border-[#D8D8D8] px-1.5 py-2 text-center text-[8px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#545454]"
          >
            {dimension}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {[
        ["DBS Group", 9, 9, 9, 9, 9, 9, "High"],
        ["OCBC", 8, 8, 7, 8, 8, 8, "High"],
        ["UOB", 7, 8, 7, 8, 7, 7, "Medium"],
        ["Citibank SG", 8, 8, 8, 8, 7, 8, "High"],
        ["Standard Chartered", 8, 8, 8, 8, 8, 8, "High"],
        ["Bank of America", 8, 8, 8, 8, 7, 8, "High"],
        ["HSBC", 8, 8, 8, 8, 8, 8, "High"],
        ["CIMB", 6, 6, 6, 6, 6, 5, "Medium"],
        ["RHB Bank", 5, 5, 5, 5, 5, 4, "Low"],
        ["Maybank", 6, 6, 6, 6, 6, 6, "Medium"],
        ["JPMorgan Chase", 9, 9, 9, 8, 9, 9, "High"],
        ["Goldman Sachs", 9, 9, 9, 8, 9, 8, "High"],
        ["Morgan Stanley", 8, 9, 8, 8, 8, 8, "High"],
        ["Barclays", 8, 8, 8, 8, 7, 8, "High"],
      ].map((row) => {
        const maturityLabel = (score: number | string) => {
          if (typeof score === "string") return score;
          if (score >= 8) return "High";
          if (score >= 6) return "Medium";
          return "Low";
        };

        return (
          <tr key={row[0] as string} className="bg-white hover:bg-gray-50">
            <th
              scope="row"
              className="border border-[#D8D8D8] px-2 py-1.5 text-left text-[9.5px] font-semibold text-[#3F3F3A]"
            >
              {row[0]}
            </th>

            {row.slice(1).map((value, index) => (
              <td
                key={`${row[0]}-${index}`}
                className="border border-[#D8D8D8] px-1.5 py-1.5 text-center text-[9px] font-medium text-[#545454]"
              >
                {maturityLabel(value)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>

  <p className="mt-2 text-[8.5px] leading-relaxed text-[#6B6B5E]">
    Note: Classifications follow the Shiny application&apos;s AI adoption scoring logic: scores of 8 and above are High, scores of 6 to below 8 are Medium, and lower scores are Low.
  </p>
</div>
</div>



</section>





        <h4 className="mb-3 text-[13px] font-semibold text-[#3F3A33]">
          A.I integration can only contributions to valuation when well defined and supported transmission channels exist
        </h4>

      <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Ultimately beyond media hype be it through mass media, social media or industrial publications, AI-related banking revaluation is better interpreted as a layered transmission process than a direct and explicit relationship defined by AI announcements and respective bank stock returns. The graph structure suggests that valuation sensitivity depends on whether AI adoption is supported by policy alignment, governance credibility, operational deployment, disclosure intensity, and observable market response behaviour.
      </p>

      <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
        Local Singapore banks are expected to show stronger structural relevance in this framework because DBS, OCBC, and UOB are more directly exposed to domestic regulatory signalling, MAS-linked digital finance initiatives, and Singapore-specific AI governance architecture. Foreign banks may exhibit high global AI capability, but their Singapore revaluation channel is likely weaker unless the local entity has visible AI deployment, local disclosure, or Singapore-specific operational integration.
      </p>

        <h4 className="mb-3 text-[13px] font-semibold text-[#3F3A33]">
AI adoption must be coupled with visibility to investors to boost chances of positive valuation
        </h4>

      <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
        The model also highlights revaluation strength is conditional on both AI adoption maturity and its visibility on top of communication to investors. A bank can score highly on AI deployment yet show limited local revaluation sensitivity if its AI initiatives are not visible to investors or not linked to Singapore policy events. Conversely, a bank with moderate AI adoption can produce stronger revaluation exposure if its much more communicative and active in managing stakeholder relationships where AI adoption is persistently and highlighted in a well regulated manner.
      </p>

        <h4 className="mb-3 text-[13px] font-semibold text-[#3F3A33]">
 Framework closing note
        </h4>


      <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
        The main empirical implication is that AI valuation should not be assessed through event study logic nor basic time series based correlation studies alone. Combinations of policy event timing, bank specific AI adoption scores, textual disclosure similarity, abnormal return behaviour, and structural break probabilities or any other factors reflecting their relevant representations to inspect a network of relations should be the minimum. This allows any framework to distinguish between publicity driven AI announcements and bank specific AI investments from underlying factors to conclude sincerely the effectiveness of investing in AI implementation. 
      </p>


    </div>
  )}
</div>


                  </details>

                  <details className="group py-5">
                    <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[15px] font-semibold leading-snug text-[#1a1f2b]">
                           Ranking Artificial Intelligence Integration within Singapore's Banking Landscape
                          </h3>
                        </div>
                        <span className="ml-6 text-xl leading-none text-gray-600 transition-transform duration-500 ease-out group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>

                    <div className="mt-6 origin-top opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">




                      <div className="w-full bg-transparent">
                        <AIRevaluationDashboard />
                      </div>

                      <p className="mt-3 text-justify text-[8px] leading-relaxed text-gray-600">
                        Interactive AI adoption and stock-performance dashboard for DBS, OCBC, UOB, and SGX. Built with Claude Sonnet 4.6 and ChatGPT 5.5. Output Source: Author.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
            </div>


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
                            BASTION Decompositions of Bank Equity Returns during the Emergence of Artificial Intelligence
                          </h3>
                        </div>

                        <span className="ml-5 text-xl transition-transform duration-600 ease-out group-open:rotate-45">
                          +
                        </span>
                      </div>
                    </summary>

                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="mt-6 origin-top -translate-y-2 scale-y-[0.985] opacity-0 transition-all duration-700 ease-out group-open:translate-y-0 group-open:scale-y-100 group-open:opacity-100">
                          <p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">
Bayesian Adaptive Seasonality and Trend Decomposition Incorporating Outliers and Noise (BASTION) is a R package that decomposes univariate time series data through a Bayesian framework. It is locally adaptive estimating trend and seasonality, aptly modelling outliers and time varying volatility. It addresses key limitations in existing decomposition methods, particularly regarding difficulty in adapting to abrupt changes in trend, heteroskedasticity, absence of quantifying uncertainty, and poor ability in accommodating multiple seasonal patterns.
</p>

<p className="mb-5 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

The application is an all inclusive user dash board that allows practical financial-econometric decomposition based on observed bank equity returns. The summary of all findings is that in an informationally efficient market, credible AI investment may be capitalised through revised expectations of operating efficiency, risk control, fee generating capacity, data productivity, and long run cash flows. However, since in real life information is not perfect and it also incorporates interest rate behaviour, bank specific credit conditions, and investor capital distributions, BASTION seeks to identify if AI touted return generating processes display persistent change, transitory innovation, or a change in residual risks near documented events of AI adoption.
                          </p>

           

<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  <iframe
    loading="lazy"
    src="https://christopherleeaung.shinyapps.io/BASTION_com/"
    title="BASTION Bank-Equity Decomposition Shiny Research Interface"
    className="h-[980px] w-full"
  />
</div>


                          <p className="mt-3 text-justify text-[8px] leading-relaxed text-gray-600">
                            Interactive BASTION bank-equity return decomposition and comparative market-intelligence interface. The application presents monthly log returns, local trend estimates, residual-risk dynamics, regime-shift screening, AI-reference alignment, annual diagnostics, and cross-bank performance comparisons. Output Source: Author.
                          </p>
                        </div>
                      </div>
                    </div>
                  </details>

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

Developed a latent-state modelling framework to identify structural demand regimes within Singapore's National Electricity Market during the post-pandemic energy volatility period. Applied Hidden Markov Models (HMMs), Bayesian inference, state-transition analysis, and probabilistic classification techniques to distinguish underlying electricity demand conditions from observable market fluctuations. Evaluated regime persistence, transition dynamics, and demand recovery patterns surrounding the 2021–2022 energy market disruption, providing insights into market resilience, supply adequacy, and policy effectiveness. Integrated time-series econometrics, statistical learning, and energy market analytics to improve demand forecasting under conditions of heightened uncertainty and structural change.
                          </p>

                          <p className="mb-8 max-w-4xl text-justify text-[8px] leading-relaxed text-gray-600">
Key Skills: Hidden Markov Models (HMM), Bayesian Statistics, Time Series Econometrics, Regime Detection, Energy Economics, Market Surveillance, Demand Forecasting, Transition Probability Modelling, Statistical Learning, Policy Evaluation.
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
          BEAST Decompositions in Solar Generation to Identify Structural Changes beyond Temporals
        </h3>


      </div>
      <span className="ml-5 text-xl leading-none text-gray-600 transition-transform duration-500 ease-out group-open:rotate-45">
        +
      </span>

    </div>
  </summary>

  <div className="mt-8 origin-top space-y-8 opacity-0 -translate-y-2 scale-y-[0.985] transition-all duration-700 ease-out group-open:opacity-100 group-open:translate-y-0 group-open:scale-y-100">

        <p className="mt-3 max-w-4xl text-justify text-[12.5px] leading-relaxed text-gray-600">

Applied the Bayesian Estimator of Abrupt Change, Seasonality and Trend (BEAST) to Singapore solar-generation data to distinguish durable structural expansion from recurring temporal variation and short-lived production noise. The framework decomposes observed generation into time-varying trend and seasonal components while estimating posterior support for abrupt changes in their level, slope, and periodic structure. This allows increases in solar output to be evaluated as possible capacity-led or system-level transitions rather than being inferred directly from raw growth, daylight cycles, weather-sensitive fluctuations, or conventional seasonal averages. The project reviews changepoint timing, posterior uncertainty, trend persistence, seasonal amplitude, and residual behaviour to determine whether apparent growth reflects a sustained change in the underlying generation process. The resulting decomposition provides a more defensible basis for market surveillance, infrastructure assessment, and policy evaluation where structural development must be separated from effects that are merely temporal.

</p>

        <p className="mt-3 max-w-4xl text-justify text-[8px] leading-relaxed text-gray-600">

Bayesian Forecasting, SARIMA, XGBoost, TimesFM, Monte Carlo Simulation, Machine Learning, Predictive Analytics, Probabilistic Forecasting, Model Validation, Forecast Evaluation, Electricity Markets.



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