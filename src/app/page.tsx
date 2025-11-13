// ./src/app/page.tsx

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white text-gray-800">

      {/* Sidebar Navigation */}

<nav className="w-44 bg-bluebrand-100 border-r border-bluebrand-200 
                text-bluebrand-700 pl-9 pr-10 py-39.5 fixed top-[2.5rem] left-0 h-[calc(100%-2.5rem)]">



  <ul className="space-y-4 text-[15px] font-regular tracking-wide mt-12">
    <li><a href="#about" className="hover:text-bluebrand-800 transition-colors">About</a></li>
    <li><a href="#Sservices" className="hover:text-bluebrand-800 transition-colors">Services</a></li>
    <li><a href="#projects" className="hover:text-bluebrand-800 transition-colors">Projects</a></li>
    <li><a href="#education" className="hover:text-bluebrand-800 transition-colors">Education</a></li>
    <li><a href="#contact" className="hover:text-bluebrand-800 transition-colors">Contact</a></li>
  </ul>
</nav>


      {/* Main Content */}
<main className="ml-44 flex-1 flex flex-col items-start justify-center px-25 py-20">


        {/* About */}
        <section id="about" className="pt-10 mb-110 max-w-5xl">
          <h1 className="text-5xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-10">Christopher Lee</h1>
          <h2 className="text-3xl font-semibold font-inter text-[#3b465c] text-[24px] mb-1">Senior Economist</h2>
          <h3 className="text-[18px] text-gray-400 mb-6">
            Commodity and Capital Markets Econometrician
          </h3>

          <p className="text-[15px] leading-relaxed mb-5 text-justify">
            Christopher is a professional econometrician specialising in commodity and capital market index analysis. His portfolio has been engaged by C-Suite executives to study policy interventions, alongside industry analysts to decompose price latent behaviour. Autonomous and international universities regularly contract him for under and post graduate modular studies in quantitative economics and inter-disciplinary analytical training.
          </p>

          <div className="flex gap-7">
            <a
              href="/resume.pdf"
              className="bg-blue-950 text-white px-5 py-1.5 rounded-lg text-[14px] font-medium hover:bg-steel-500 transition-colors"
            >
              Services
            </a>
            <a
              href="mailto:mhaung.2021@mse.smu.edu.sg"
              className="border steel-500 text-steel-500 px-5 py-1.5 rounded-lg text-[14px] font-medium hover:bg-gray-100 transition-colors"
            >
              Media Enquiry
            </a>
          </div>
        </section>

{/* Projects */}
<section id="projects" className="pt-0 max-w-5xl w-full">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-6">
      Projects
    </h1>
    <p className="text-[15px] leading-relaxed mb-12 text-justify text-gray-600">
  
    </p>

    {/* Grid */}
    <div
      className="
        grid 
        grid-cols-1              /* default: 1 card per row */
        md:grid-cols-2           /* 2 cards from md breakpoint up */
        gap-8 
        justify-items-center     /* centers cards horizontally */
      "
    >
      {/* Card 1 */}
      <div
        className="
          group relative bg-white rounded-2xl border border-steel-200 shadow-sm overflow-hidden 
          transition-all duration-300 hover:shadow-lg hover:-translate-y-2
          w-full max-w-[520px] h-[420px]
          flex flex-col justify-between
        "
      >
        <img
          src="/images/usep-volatility.jpg"
          alt="Electricity Market Volatility Decomposition"
          className="h-48 w-full object-cover"
        />
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2 group-hover:text-steel-700 transition-colors">
              Mitigating Naive Risk Modelling in Electricity Spot Market Indexes
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4 text-justify">
              Fourier-based spectral analysis and GARCH modeling of Singapore’s USEP price series
              to uncover latent cyclical behaviour and volatility clustering.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Fourier</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">GARCH</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Volatility</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-steel-700 hover:text-steel-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View details
            </a>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        className="
          group relative bg-white rounded-2xl border border-steel-200 shadow-sm overflow-hidden 
          transition-all duration-300 hover:shadow-lg hover:-translate-y-2
          w-full max-w-[520px] h-[420px]
          flex flex-col justify-between
        "
      >
        <img
          src="/images/etf-pca.jpg"
          alt="ETF Co-movement and Diffusion Index Forecasting"
          className="h-48 w-full object-cover"
        />
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2 group-hover:text-steel-700 transition-colors">
              ETF Co-movement and Diffusion Index Forecasting
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4 text-justify">
              PCA and spectral density decomposition applied to ETF NAV time series to construct
              diffusion-index forecasts for sectoral performance diagnostics.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">PCA</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Spectral</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Forecasting</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-steel-700 hover:text-steel-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View details
            </a>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div
        className="
          group relative bg-white rounded-2xl border border-steel-200 shadow-sm overflow-hidden 
          transition-all duration-300 hover:shadow-lg hover:-translate-y-2
          w-full max-w-[520px] h-[420px]
          flex flex-col justify-between
        "
      >
        <img
          src="/images/energy-derivative.jpg"
          alt="Energy Derivative Pricing Framework"
          className="h-48 w-full object-cover"
        />
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2 group-hover:text-steel-700 transition-colors">
              Energy Derivative Pricing Framework
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-4 text-justify">
              Stochastic volatility-in-mean modeling and Bayesian calibration for pricing renewable-linked
              derivatives in Singapore’s wholesale electricity market.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Bayesian</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Stochastic</span>
              <span className="px-2 py-0.5 text-[12px] rounded-full bg-steel-50 text-steel-700">Volatility</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-steel-700 hover:text-steel-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View details
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      </main>
    </div>
  );
}
