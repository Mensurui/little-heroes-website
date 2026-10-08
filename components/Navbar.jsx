"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/data/siteData";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300 border-b border-slate-100/80 dark:border-slate-800/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
              Little <span className="text-sky-500 group-hover:text-sky-400 transition-colors">Heroes</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {siteData.navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] tracking-wide relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-sky-500 font-semibold after:w-full"
                      : "text-slate-700 dark:text-slate-300 font-medium hover:text-sky-500 dark:hover:text-sky-400"
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sky-400 hover:after:w-full after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions: Theme Toggle + Schedule CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Schedule Visit
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-sky-100 dark:border-slate-800 shadow-xl px-6 py-6"
          >
            <div className="flex flex-col space-y-4">
              {siteData.navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-lg transition-colors py-1 ${
                      isActive
                        ? "text-sky-500 font-bold"
                        : "text-slate-700 dark:text-slate-200 font-medium hover:text-sky-500 dark:hover:text-sky-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full inline-flex justify-center items-center py-3 px-6 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-medium shadow-md transition-all"
                >
                  Schedule School Visit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
