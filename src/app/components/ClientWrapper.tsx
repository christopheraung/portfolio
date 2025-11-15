"use client";
import { useState, useEffect, ReactNode } from "react";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
