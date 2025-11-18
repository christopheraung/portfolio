"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

export default function ClientLogin() {
  const [fadeIn, setFadeIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* === MOBILE MENU BUTTON === */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden fixed top-20 left-6 z-50 bg-[#1b1e27] text-white px-2 py-1 rounded-md shadow-lg text-xs"
      >
        Solutions
      </button>

      {/* === MOBILE OVERLAY === */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        />
      )}

      {/* === MOBILE SLIDING DRAWER === */}
      <aside
        className={clsx(
          "md:hidden fixed top-0 left-0 z-50 w-64 h-full bg-[#1b1e27] text-gray-200 p-6 transform transition-transform duration-300",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="text-gray-400 text-sm mb-6 hover:text-white"
        >
          Close ✕
        </button>

        <ul className="space-y-5 text-[15px]">
          <li><a href="/#about" className="hover:text-white">About</a></li>
          <li><a href="/#Policies" className="hover:text-white">Policies</a></li>
          <li><a href="/#Commodities" className="hover:text-white">Commodities</a></li>
          <li><a href="/#Marketplace" className="hover:text-white">Marketplace</a></li>
          <li><a href="/#Lectures" className="hover:text-white">Lectures</a></li>
          <li><a href="/" className="hover:text-white">Home</a></li>
        </ul>
      </aside>

      {/* === MAIN LAYOUT === */}
      <div
        className={`flex h-screen bg-[#0f1118] text-gray-200 transition-opacity duration-1000 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* DESKTOP SIDEBAR */}
        <nav className="hidden md:block w-44 bg-[#1b1e27] border-r border-gray-700 text-gray-300 pl-9 pr-4 py-65 fixed top-0 left-0 h-full">
          <ul className="space-y-5 text-[15px] tracking-wide mt-12">
            <li><a href="/#about" className="hover:text-white">About</a></li>
            <li><a href="/#Policies" className="hover:text-white">Policies</a></li>
            <li><a href="/#Commodities" className="hover:text-white">Commodities</a></li>
            <li><a href="/#Marketplace" className="hover:text-white">Marketplace</a></li>
            <li><a href="/#Lectures" className="hover:text-white">Lectures</a></li>
          </ul>
        </nav>

        {/* LOGIN PANEL */}
<div
  className="
    flex flex-col justify-center
    w-full md:w-1/2
    bg-[#1a1f2b] text-white
    px-16 py-105
    md:ml-44
  "
>

          <div className="mb-12">
            <h1 className="text-2xl font-lora tracking-wide text-steel-200 mb-1">
              Industry Clients
            </h1>
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Quantitative Analytics
            </p>
          </div>

          <h2 className="text-4xl font-bold mb-3 font-lora leading-snug">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-10 text-[14px]">
            Log in to access your portfolio.
          </p>

          <form className="space-y-8 max-w-sm">
            <div>
              <label
                htmlFor="userId"
                className="block text-[12px] uppercase tracking-wider text-gray-400 mb-1"
              >
                User ID
              </label>
              <input
                id="userId"
                type="text"
                placeholder="Enter your ID"
                className="w-full bg-transparent border-b border-gray-600 focus:border-steel-500 outline-none py-1 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[12px] uppercase tracking-wider text-gray-400 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent border-b border-gray-600 focus:border-steel-500 outline-none py-1 text-white placeholder-gray-500"
              />
            </div>

            <button
              type="submit"
              className="bg-steel-700 hover:bg-steel-500 text-white text-[14px] font-medium py-3 px-6 rounded-md transition-colors w-auto"
            >
              Log In
            </button>

            <div className="text-[12px] mt-6 space-y-2">
              <a
                href="mailto:mhaung.2021@mse.smu.edu.sg?subject=Password Reset Request"
                className="block text-steel-300 hover:text-steel-100 underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a>
              <a
                href="mailto:mhaung.2021@mse.smu.edu.sg?subject=Password Change Request"
                className="block text-steel-300 hover:text-steel-100 underline-offset-2 hover:underline"
              >
                Change your password
              </a>
            </div>
          </form>
        </div>

        {/* RIGHT PANEL IMAGE */}
        <div className="hidden md:block relative w-1/2 overflow-hidden h-full">
          <img
            src="/images/room.png"
            alt="Dashboard Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/0 backdrop-blur-[0px] transition-opacity duration-700 hover:bg-white/10"></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 w-full text-center py-2 bg-[#0f1118] text-gray-400 text-[10px] border-t border-gray-700">
        Market data shown are delayed or simulated and provided for educational purposes only.
        <br className="md:hidden" />
        Not intended for trading or financial advice.
      </footer>
    </>
  );
}
