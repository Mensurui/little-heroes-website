"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/data/siteData";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { navLinks } = siteData;

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 px-6 sm:px-8 lg:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Row: Brand Info & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-extrabold tracking-tight hover:opacity-95 transition-opacity"
            >
              <Image
                src="/logo-transparent.png"
                alt="Little Heroes Day Care Logo"
                width={36}
                height={28}
                className="h-7 w-auto object-contain"
              />
              <span>
                Little <span className="text-sky-400">Heroes</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400">
              Premium Early Childhood Education & Daycare in Kazanchis, Addis Ababa
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-sky-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/privacy"
              className="hover:text-sky-400 transition-colors text-slate-400 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/support"
              className="hover:text-sky-400 transition-colors text-slate-400 hover:text-white"
            >
              Support
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Powered By RoboTech & Legal Links */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Little Heroes Day Care. All rights reserved.
          </div>

          {/* Pro Badge: Powered by RoboTech */}
          <a
            href="https://robotech.et"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 shadow-sm hover:shadow-sky-500/10 hover:shadow-md transition-all duration-300 active:scale-95 text-xs"
            title="RoboTech - Innovative Tech & Software Engineering (robotech.et)"
          >
            {/* Live pulsating beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-slate-400 font-medium">Powered by</span>
            <span className="font-extrabold tracking-wide bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
              RoboTech
            </span>
            <ArrowUpRight
              size={13}
              className="text-slate-500 group-hover:text-sky-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              className="hover:text-sky-400 transition-colors underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/support"
              className="hover:text-sky-400 transition-colors underline underline-offset-4"
            >
              App Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
