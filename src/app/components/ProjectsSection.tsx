'use client';
import { useEffect, useState } from 'react';
import { FaLinkedin, FaGraduationCap } from "react-icons/fa";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function Navbar() {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'USEP', price: 218.12, change: 1.02 },
    { symbol: 'STI', price: 262.44, change: -0.87 },
    { symbol: 'NQSG0001', price: 446.58, change: 0.2718 },
  ]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(s => ({
          ...s,
          price: +(s.price + (Math.random() - 0.5) * 1.2).toFixed(2),
          change: +(Math.random() * 2.0 - 1).toFixed(2),
        }))
      );
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/christopher-mhaung/"
            target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-900 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://smu-sg.academia.edu/CAung"
            target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-700 transition-colors duration-200"
            aria-label="Academia.edu"
          >
            <FaGraduationCap size={20} />
          </a>
        </div>
      </div>



"use client";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Electricity Market Volatility Decomposition",
      description:
        "Fourier-based spectral analysis and GARCH modeling of Singapore’s USEP price series to uncover latent cyclical behaviour and volatility clustering.",
      link: "#",
      year: 2025,
    },
    {
      title: "ETF Co-movement and Diffusion Index Forecasting",
      description:
        "PCA and spectral density decomposition applied to ETF NAV time series to construct diffusion-index forecasts for sectoral performance diagnostics.",
      link: "#",
      year: 2024,
    },
    {
      title: "Energy Derivative Pricing Framework",
      description:
        "Stochastic volatility-in-mean modeling and Bayesian calibration for pricing renewable-linked derivatives in Singapore’s wholesale electricity market.",
      link: "#",
      year: 2024,
    },
    {
      title: "Renewable Certificate Pricing and Arbitrage Dynamics",
      description:
        "Econometric evaluation of REC and carbon-credit markets using VAR and state-space volatility tracking for policy intervention design.",
      link: "#",
      year: 2023,
    },
  ];

  return (
    <section id="Projects" className="bg-white text-gray-800 py-20 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Projects & Case Studies
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            A selection of applied econometric and market-analysis projects,
            integrating theory, computation, and data-driven insight.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-steel-200 bg-white shadow-sm 
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
                         hover:border-steel-500 cursor-pointer overflow-hidden"
            >
              <div className="h-44 bg-gradient-to-r from-steel-50 to-steel-200" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-steel-700 transition-colors duration-200">
                    {proj.title}
                  </h3>
                  <span className="text-xs text-gray-500">{proj.year}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {proj.description}
                </p>
                <a
                  href={proj.link}
                  className="text-steel-700 text-sm font-medium hover:underline"
                >
                  View details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

