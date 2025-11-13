'use client';
import { useEffect, useState } from 'react';
import { TfiLinkedin } from "react-icons/tfi";
import { SiAcademia } from "react-icons/si";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);  
  const [stocks, setStocks] = useState<Stock[]>([
    { symbol: 'USEP', price: 218.12, change: 1.02 },
    { symbol: 'STI', price: 262.44, change: -0.87 },
    { symbol: 'NQSG0001', price: 446.58, change: 0.2718 },
  ]);

  //
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(s => ({
          ...s,
          price: +(s.price + (Math.random() - 0.5)).toFixed(2),
          change: +(Math.random() * 2 - 1).toFixed(2),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null; //

  return (
<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-2 border-b border-gray-200 bg-white text-gray-800">

      {/* Left section */}
      <div className="flex items-center gap-6">
  <a
  href="https://www.linkedin.com/in/christopher-mhaung/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center w-4 h-4 bg-blue-900 text-white rounded-sm transition-colors duration-300 hover:bg-steel-500"
  aria-label="LinkedIn"
>
<TfiLinkedin size={10}/>
</a>
<a
  href="https://smu-sg.academia.edu/CAung"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center w-4 h-4 bg-blue-900 text-white rounded-sm transition-colors duration-300 hover:bg-steel-500"
  aria-label="Academia.edu"
>
  <SiAcademia size={9} />
</a>

      </div>

      {/* Right section — Stock ticker */}
      <div className="flex items-center gap-6 text-[10px]">
        {stocks.map((s) => (
          <div key={s.symbol} className="flex items-center gap-1">
            <span className="text-[10px] opacity-80">{s.symbol}</span>
            <span className="font-semibold text-[11px]">${s.price.toFixed(2)}</span>
            <span className={s.change >= 0 ? 'text-green-600 text-[10px]' : 'text-red-500 text-[10px]'}>
              {s.change >= 0 ? `+${s.change.toFixed(2)}` : s.change.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}
