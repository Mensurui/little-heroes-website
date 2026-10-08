"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";

export default function Hero() {
  const { brand } = siteData;

  return (
    <section id="hero" className="relative pt-6 pb-20 lg:pt-12 lg:pb-32 overflow-hidden bg-white dark:bg-[#0B1120] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 z-10 space-y-7"
          >
            {/* Top Wavy Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center"
            >
              <span className="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-900 border border-sky-200/80 dark:border-slate-800 shadow-sm">
                {brand.badge}
              </span>
            </motion.div>

            {/* Main Hero Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-[66px] font-extrabold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
              Where Care <br />
              <span className="text-sky-400 font-extrabold inline-block">
                Sparks Growth
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              {brand.description}
            </p>

            {/* Dual Action Buttons with Spring Feedback */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-semibold text-base shadow-md hover:shadow-lg transition-colors"
                >
                  Schedule School Visit
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base border-2 border-sky-200 dark:border-slate-700 hover:border-sky-300 transition-colors"
                >
                  Explore Programs
                </Link>
              </motion.div>
            </div>

            {/* Quick Glimpse Social Links */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">
                WANT A QUICK GLIMPSE BEFORE BOOKING?
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/50 hover:bg-pink-100 transition-colors shadow-sm"
                >
                  Instagram Photos
                </motion.a>
                <motion.a
                  href={brand.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-slate-900 border border-sky-200 dark:border-slate-800 hover:bg-sky-100 transition-colors shadow-sm"
                >
                  TikTok Videos
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Classroom Image & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Main Classroom Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-none h-[420px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden shadow-2xl group border border-transparent dark:border-slate-800">
              {/* Classroom Photo with natural Montessori aesthetic */}
              <Image
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200"
                alt="Little Heroes Day Care Classroom"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle inner lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge 1: 100% Child-Centered Learning */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-4 sm:top-6 left-4 sm:left-6 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700/80 flex items-center gap-2.5 cursor-pointer transition-shadow"
            >
              <span className="text-amber-400 text-lg">⭐</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                100% Child-Centered Learning
              </span>
            </motion.div>

            {/* Floating Badge 2: Certified Caregivers */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700/80 flex items-center gap-2.5 cursor-pointer transition-shadow"
            >
              <span className="text-rose-500 text-lg">🎈</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Certified Caregivers
              </span>
            </motion.div>

            {/* Floating Badge 3: Arts • STEM • Outdoor Play */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 2 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-4 sm:bottom-6 right-6 sm:right-12 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700/80 flex items-center gap-2.5 cursor-pointer transition-shadow"
            >
              <span className="text-emerald-500 text-lg">🎨</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Arts • STEM • Outdoor Play
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
