"use client";

import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiAcademia } from "react-icons/si";


interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function Navbar() {
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: "USEP", price: 218.12, change: 1.02 },
    { symbol: "STI", price: 262.44, change: -0.87 },
    { symbol: "NQSG0001", price: 446.58, change: 0.2718 },
  ]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => ({
          ...s,
          price: +(s.price + (Math.random() - 0.5) * 1.2).toFixed(2),
          change: +(Math.random() * 2.0 - 1).toFixed(2),
        })),
      );
      setPulse(true);
      setTimeout(() => setPulse(false), 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
<nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">

      {/* Left */}
      <div className="flex items-center gap-5">
        <a
          href="https://www.linkedin.com/in/christopher-mhaung/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-900 transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
<a
  href="https://smu-sg.academia.edu/CAung"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#4B5563] text-white p-1 rounded-[3px] flex items-center justify-center hover:opacity-90 transition"
>
  <SiAcademia size={9} />
</a>

</div>


      {/* Right – Stock ticker */}
      <div className="flex items-center gap-4 text-xs font-mono">
        {stocks.map((s) => (
          <div
            key={s.symbol}
            className={`flex items-center gap-2 ${pulse ? "animate-pulse" : ""}`}
          >
            <span className="tracking-wide">{s.symbol}</span>
            <span>{s.price.toFixed(2)}</span>
            <span className={s.change >= 0 ? "text-emerald-600" : "text-red-600"}>
              {s.change >= 0 ? "+" : ""}
              {s.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}
