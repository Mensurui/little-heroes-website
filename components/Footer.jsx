"use client";

import React from "react";
import Link from "next/link";
import { siteData } from "@/data/siteData";

export default function Footer() {
  const { brand, navLinks } = siteData;

  return (
    <footer className="bg-slate-900 text-white py-12 px-6 sm:px-8 lg:px-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight hover:opacity-95 transition-opacity">
            Little <span className="text-sky-400">Heroes</span>
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

        <div className="text-xs text-slate-500 text-center md:text-right space-y-1">
          <div>
            © {new Date().getFullYear()} Little Heroes Day Care. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <Link href="/privacy" className="hover:text-sky-400 transition-colors underline underline-offset-4">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/support" className="hover:text-sky-400 transition-colors underline underline-offset-4">
              App Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
