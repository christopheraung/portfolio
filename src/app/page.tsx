"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";


export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);



return (
  <div
    className={clsx(
      "flex min-h-screen bg-white text-gray-800 transition-opacity duration-1000",
      fadeIn ? "opacity-100" : "opacity-0"
    )}
  >


      {/* Sidebar Navigation */}
      <nav className="w-44 bg-bluebrand-100 border-r border-bluebrand-200 text-bluebrand-700 pl-9 pr-4 py-51 fixed top-[2.5rem] left-0 h-[calc(100%-2.5rem)]">
        <ul className="space-y-4 text-[15px] font-regular tracking-wide mt-12">
          <li><a href="#about" className="hover:text-bluebrand-800 transition-colors">About</a></li>
          <li><a href="#Policies" className="hover:text-bluebrand-800 transition-colors">Policies</a></li>
          <li><a href="#Commodities" className="hover:text-bluebrand-800 transition-colors">Commodities</a></li>
          <li><a href="#Marketplace" className="hover:text-bluebrand-800 transition-colors">Marketplace</a></li>
          <li><a href="#Lectures" className="hover:text-bluebrand-800 transition-colors">Lectures</a></li>
          <li><a href="/client" className="hover:text-bluebrand-800 transition-colors">Client Login</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="ml-44 flex-1 flex flex-col items-start justify-center px-25 py-20">
        
        {/* === ABOUT SECTION === */}
        <section id="about" className="pt-10 mb-110 max-w-5xl">
          <h1 className="text-5xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-10">
            Christopher Lee
          </h1>
          <h2 className="text-3xl font-semibold text-[#3b465c] mb-1">
            Senior Economist
          </h2>
          <h3 className="text-[18px] text-gray-400 mb-6">
            Commodity and Capital Markets Econometrician
          </h3>

          <p className="text-[15px] leading-relaxed mb-5 text-justify">
            Christopher is a professional econometrician specialising in commodity and capital market index analysis. His portfolio has been engaged by C Suit Executives to navigate policy intervention, and industry analysts alongside investors to decompose price latent behaviour. Autonomous universities regularly contact him for under and post graduate modular studies in quantitative economics and inter-disciplinary analytical training. 

          </p>

<div className="flex gap-7">
  {/* Route to client login page */}
  <a
    href="/client"
    className="bg-blue-950 text-white px-5 py-1.5 rounded-lg text-[14px] font-medium hover:bg-steel-500 transition-colors"
  >
    Industry Clients
  </a>

  {/* Pre-filled email link */}
<a
  href={`mailto:mhaung.2021@mse.smu.edu.sg
?subject=Enquiry%20Regarding%20(Subject%20Topic)
&body=Thank%20you%20for%20reaching%20out.%20Do%20fill%20up%20this%20mail%20with%20the%20relevant%20information%20in%20accordance%20to%20the%20structure%20below%20to%20facilitate%20quick%20processing.%20All%20information%20shared%20will%20be%20compliant%20with%20the%20Personal%20Data%20Protection%20Act%2C%20and%20all%20enquiries%20will%20be%20required%20to%20state%20explicit%20consent%20following%20initial%20correspondence.%20Thank%20you%20for%20your%20understanding.%0A%0A
Salutation%3A%0A
Name%3A%0A
Company%20name%20to%20match%20Email%20Address%20domain%3A%0A
Title%3A%0A
Job%20Function%3A%0A
Area%20of%20Interest%3A%20(Please%20select%20one%20domain%20and%20the%20specific%20contract%20of%20interest)%0A
-%20Research%3A%20[Market%20Analysis]%2C%20[Unit%20Trust%20Index%20Analysis]%2C%20[Policy%20Impact%20Analysis]%0A
-%20Programe%3A%20[Raga%20Project]%0A
-%20Document%3A%20[Cite%20accordingly]%0A
-%20Lecturing%3A%20[Foundational%20Statistics]%2C%20[Applied%20Media%20Analysis]%2C%20[Policy%20%26%20Market%20Dynamics]%2C%20[Data%20%26%20Analytics]%2C%20[Research%20%26%20Insights]%0A%0A
Personal%20request%3A%0A%0A
Mails%20are%20system%20vetted,%20please%20ensure%20adherence%20to%20ensure%20a%20response.%20Thank%20you%20for%20your%20time.`}
  className="border border-steel-500 text-steel-500 px-5 py-1.5 rounded-lg text-[14px] font-medium hover:bg-gray-100 transition-colors"
>
  Enquiries
</a>

</div>




        </section>




{/* Policies */}

<section id="Policies" className="pt-0 max-w-5xl w-full">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-6">
      Policies
    </h1>
    <p className="text-[15px] leading-relaxed mb-12 text-justify text-gray-600">
  
    </p>


{/* Grid */}
<div
  className={clsx(
    "grid",
    "grid-cols-1",            // default: 1 card per row
    "md:grid-cols-2",         // 2 cards from md breakpoint up
    "gap-8",
    "justify-items-center"    // centers cards horizontally
  )}
>



{/* Card 1 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/raga.jpeg"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        The Raga Project

      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

The Raga Project is a Tote Board funded program supporting NPO financial autonomy through donorship retention programmes and economic frameworks to navigate Singapore's social sector. Anti-fraudulent analysis skills were also imparted onto attendees.

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400"></span> Internal
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">

        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Government and Private</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Wage, Social Work </span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Time Series Analysis
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Parameter Estimation
          </span>


        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">


<a
  href="/client"
  className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Client Login
</a>



    </div>
  </div>
</div>


{/* Card 1 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/ElecVolal.jpg"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        Mitigating Naive Risk Modelling in Electricity Spot Market Indexes
      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Postulate commentaries framed market interventions between 2018 and 2021 as volatility dampening measures that constrained retailer margins. Macro analysis however point towards broader objectives of reinforcing market integrity through curbing distortionary behaviour and speculative activity in covariating commodity indexes.  

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span> Referential Status </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
      </span>

    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Government and Private</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Policy, Market, Risk</span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Time Series Analysis
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Parameter Estimation
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Dynamic Modelling 
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Applied Mathematics  
          </span>
        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>



{/* Card 2 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/Birth.png"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        Female Ambition Mitigates the Wicked Problem of Declining Birthrates
      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Singapore's resident Total Fertility Rate stood at a historic low of 0.97 in 2023, below the population replacement rate of 2.1. However a small town in the United States is booming with well educated Gen Z parents offer an alternate narrative to this first world country tale.

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400"></span> Archived
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Public</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Domestic, Gender, Culture </span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Dynamic Modelling
          </span>




          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Structural Break Analysis
          </span>
        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>



{/* Card 5 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/social.jpg"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        The Myth of Substitutionally between Social Workers and Volunteers

      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

A commentary piece dated April 18th, 2017 in the Today newspaper argued low pay in the social sector was the primary issue behind poor talent retention among NPOs. It argues this phenomena arises from volunteers displacing executives.

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400"></span> Archived
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Government and Private</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Wage, Social Work </span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Computational General Equilibrium
          </span>




        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>



{/* Card 5 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/polli.png"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        The Wicked Problem of Going "Woke"

      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Modern mass media remains a powerful conduit for cultural values. Popular portrayal of ‘woke’ or hyper-assertive characters can lead younger audiences to conflate scripted behaviour with real-world norms, blurring lines between characterisation and genuine ideals of progressiveness. 

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400"></span> Archived
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Government and Private</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Wage, Social Work </span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">


          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Structural Break Analysis
          </span>


        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>





    </div>
  </div>

</section>





{/* Commodities */}
<section id="Commodities" className="pt-0 max-w-5xl w-full mt-24">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-6">
      Commodities
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
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/ElecVolal.jpg"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        Mitigating Naive Risk Modelling in Electricity Spot Market Indexes
      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Postulate commentaries framed market interventions between 2018 and 2021 as volatility dampening measures that constrained retailer margins. Macro analysis however point towards broader objectives of reinforcing market integrity through curbing distortionary behaviour and speculative activity in covariating commodity indexes.  

    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span> Referential Status </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
      </span>

    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Government and Private</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Policy, Market, Risk</span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Time Series Analysis
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Parameter Estimation
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Dynamic Modelling 
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Applied Mathematics  
          </span>
        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>





{/* Card 3 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/solar.jpg"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        Covariant Environmental factors in Floating Solar Capital Depreciation within ESG Investing
      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Floating Solar Capital experience additional factors of depreciation owing to default environment conditions. Introduced physical mitigation measures are profiled as investment premiums to off-set valuation loss. 
    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400"></span> Active
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Private</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>

        <div className="flex items-center gap-2 text-gray-700">
          <span>Capital, Insurance, Risk</span>
          

        </div>

      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Time Series Analysis
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Dynamic Modelling
          </span>


          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Underwriting
          </span>
        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Request Preview
      </a>
    </div>
  </div>
</div>


 
{/* Card 2 */}
<div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden 
                transition-all duration-300 hover:shadow-lg hover:-translate-y-2 w-full max-w-[540px] h-auto flex flex-col">

  {/* Image */}
  <div className="relative h-52 w-full overflow-hidden">
    <img
      src="/images/Stpp.png"

      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col flex-1 px-6 py-5">
    {/* Header */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-[18px] font-semibold text-gray-900 leading-snug max-w-[85%]">
        Bayesian Fourier Decomposition of Unit Trust Returns
      </h3>

    </div>

    {/* Description */}
    <p className="text-[12px] text-gray-600 leading-relaxed mb-5 text-justify">

Information on market exposure, investor–fund alignment, and portfolio allocation is complemented using a Bayesian-Fourier parameter framework. Covariant seasonality give additional insight to evaluating platform premiums against personal management fees.
    </p>

    {/* Referential status */}
    <div className="flex items-center justify-between text-[13px] text-gray-600 mb-3">
      <span>Referential Status</span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400"></span> Internal
      </span>
    </div>

    {/* Single Divider */}
    <div className="border-t border-gray-200 mb-3"></div>

    {/* Metadata */}
    <div className="text-[13px] text-gray-600 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Client:</span>
        <div className="flex items-center gap-2 text-gray-700">
          <span>Private</span>
          

        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400">Domain:</span>
        <span className="text-gray-700">Capital, Investment, Risk</span>
      </div>

      {/* Methodologies */}
      <div>
        <p className="text-gray-400 mb-2">Methodologies:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Time Series Analysis
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Statistical Inference
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Parameter Estimation
          </span>

          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Fourier Transformation
          </span>


          <span className="px-3 py-0.5 text-[12px] rounded-md bg-blue-950 text-white">
            Spectral Analysis
          </span>
        </div>
      </div>
    </div>


    {/* Footer */}
    <div className="mt-4 pt-2">


<a
  href="/client"
  className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Client Login
</a>



    </div>
  </div>
</div>




    </div>
  </div>

</section>





{/* Marketplace */}
<section id="Marketplace" className="pt-0 max-w-5xl w-full mt-24">
  <div className="max-w-6xl mx-auto">
 
    <h1 className="text-4xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-8">
      Marketplace
    </h1>

         <p className="text-[15px] leading-relaxed mb-5 text-justify">

The Marketplace is curated selection of news articles individually reviewed, trimmed, and contextualised for relevance in client accounts. The purpose is to give clients direct access to developments influencing their markets, policies, or asset exposures that may gate kept from the general public. 
          </p>


    {/* TOP FEATURED STORY */}

    <div className="grid md:grid-cols-2 gap-6 bg-steel-50 border border-steel-200 rounded-xl p-8 shadow-sm">
      {/* Text Side */}
      <div>
        <p className="text-[14px] font-semibold text-steel-700 uppercase mb-2">
          Energy Markets
        </p>
        <h2 className="text-2xl font-bold font-lora text-[#1a1f2b] mb-4 leading-snug  ">
Inverse oil prices from increasing US crude inventories further fuel supply concerns
        </h2>
        <p className="text-[12px] text-justify text-gray-600 leading-relaxed mb-4">

Oil prices fell for two days straight following rising U.S. crude inventories. Forecasts by analysts further exacerbated global surplus trends, fuelling fears that persistent outpaced demand will continue pressuring prices. All this just two months on from Singapore's reaffirmations as a global energy hub during Asia Pacific Petroleum Conference (APPEC) 2025.
        </p>
        <p className="text-[13px] text-gray-400 font-medium uppercase tracking-wide">
          November 13, 2025
        </p>

<a
  href="/client"
  className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Client Login
</a>




      </div>

      {/* Image Side */}
      <div className="relative rounded-md overflow-hidden border border-gray-200 shadow-sm">
        <img
          src="/images/oil.png"
          alt="Oil Market Futures"
          className="h-full w-full object-cover object-[50%_40%]"
        />
      </div>
    </div>

    {/* SUBGRID */}
    <div className="grid md:grid-cols-2 gap-8 mt-12">
      {/* Left Column */}
      <div>
        <h3 className="text-[16px] font-semibold tracking-wide text-[#1a1f2b] mb-3 border-b-4 border-steel-700 inline-block">
          Commodities
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <h4 className="text-xl font-lora font-semibold text-gray-900 leading-snug mb-3">
            Safe Haven demand drops as chances of December rate cut fade
          </h4>
          <p className="text-[12px] text-gray-600 text-justify leading-relaxed">
            Bullion holds near $4,200 following dimmed hopes of aggressive rate cuts by the Fed. This follows a month ago's surge reaching the historic US$4,000 an ounce from economic and geopolitical uncertainty alongside expectations of rate cuts.
          </p>

<a
  href="/client"
  className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Client Login
</a>


          <div className="mt-4 relative rounded-md overflow-hidden border border-gray-100">
            <img
              src="/images/gol.png"
              alt="Gold Prices"
              className="h-40 w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div>
        <h3 className="text-[16px] font-semibold tracking-wide text-[#1a1f2b] mb-3 border-b-4 border-steel-700 inline-block">
          Opinion & Analysis
        </h3>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <h4 className="text-[20px] font-lora font-semibold text-gray-900 leading-snug mb-3">
            The Volatility Paradox: Market Calmness amidst Shock Anticipation
          </h4>
          <p className="text-[12px] text-justify text-gray-600 leading-relaxed mb-2">

Speculative comments referencing market calmness owing to delayed reactions brought by a government shut down may be localised observations of a border picture rather than an overviewing one. While investor anxiety is characterised through price patterns, calmness may hint robustness more than delay. 

          </p>

<a
  href="/client"
  className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-steel-700 transition-colors"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  Client Login
</a>


          <div className="mt-4 relative rounded-md overflow-hidden border border-gray-100">
            <img
              src="/images/down.png"
              alt="Volatility Chart"
              className="h-40 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>





{/* Lectures */}
<section id="Lectures" className="pt-0 max-w-6xl w-full mt-24 mx-auto">
  {/* Header */}
  <div className="text-left mb-12">
    <h1 className="text-4xl font-bold font-lora tracking-tight text-[#1a1f2b] mb-4">
      Lectures
    </h1>

  </div>

  {/* Grid of Lecture Offerings */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-[#f8f9fb] border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
          Research & Insights
        </h3>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
          Gain an understanding of econometric reasoning through evidence-based approaches across
          commodity and policy models.
        </p>
      </div>
      <a
        href="#"
        className="text-[14px] font-medium text-steel-700 hover:text-steel-500 flex items-center gap-1 mt-4"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    {/* Card 2 */}
    <div className="bg-[#f8f9fb] border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
          Data & Analytics
        </h3>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
          Explore applied statistics and time-series decomposition through econometric modelling and
          forecasting frameworks.
        </p>
      </div>
      <a
        href="#"
        className="text-[14px] font-medium text-steel-700 hover:text-steel-500 flex items-center gap-1 mt-4"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    {/* Card 3 */}
    <div className="bg-[#f8f9fb] border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
          Policy & Market Dynamics
        </h3>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
          Understand how fiscal and energy policy interventions propagate through commodity and
          financial markets.
        </p>
      </div>
      <a
        href="#"
        className="text-[14px] font-medium text-steel-700 hover:text-steel-500 flex items-center gap-1 mt-4"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    {/* Card 4 */}
    <div className="bg-[#f8f9fb] border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
          Applied Media Analysis 
        </h3>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
          Practical sessions on utilising media to understand current market events, particularly for industry executives who have teams reliant on their expertise and leadership. 
        </p>
      </div>
      <a
        href="#"
        className="text-[14px] font-medium text-steel-700 hover:text-steel-500 flex items-center gap-1 mt-4"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    {/* Card 5 */}
    <div className="bg-[#f8f9fb] border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
          Foundational Statistics
        </h3>
        <p className="text-[14px] text-gray-600 leading-relaxed mb-4">
          Revisit foundations in statistics to build and construct reliably robust models for market data and subsequent algorithms. 

        </p>
      </div>
      <a
        href="#"
        className="text-[14px] font-medium text-steel-700 hover:text-steel-500 flex items-center gap-1 mt-4"
      >
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>




      </main>
    </div>
  );
}
