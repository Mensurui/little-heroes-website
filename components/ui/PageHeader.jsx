"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PageHeader({ tag, title, subtitle, breadcrumb = "" }) {
  return (
    <div className="relative bg-white dark:bg-[#0B1120] transition-colors duration-300 pt-6 pb-8 border-b border-slate-100 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="mb-6 text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              Home
            </Link>{" "}
            / <span className="text-sky-500 dark:text-sky-400">{breadcrumb}</span>
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          {tag && (
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 uppercase">
              {tag}
            </span>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
