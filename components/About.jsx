"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";

function AnimatedCounter({ value, suffix = "+" }) {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    const numericTarget = parseInt(value.replace(/\D/g, ""), 10) || 0;
    const duration = 1800; // ms
    const totalFrames = 60;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentVal = Math.round(numericTarget * (1 - Math.pow(2, -10 * progress)));
      setDisplayCount(currentVal);

      if (frame >= totalFrames) {
        setDisplayCount(numericTarget);
        clearInterval(interval);
      }
    }, duration / totalFrames);

    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayCount}{suffix}
    </span>
  );
}

export default function About() {
  const { about } = siteData;

  return (
    <section id="about" className="py-20 lg:py-28 bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Playroom Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl group border border-transparent dark:border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&q=80&w=1200"
                alt="Little Heroes Colorful Playroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right Column: Title, Philosophy & 3 Animated Counter Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Section Tag */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
                {about.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {about.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {about.description}
            </p>

            {/* 3 Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {about.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <WavyCard className="text-left !p-5 transition-shadow duration-300 hover:shadow-lg">
                    <div className="space-y-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-sky-400 block tracking-tight">
                        <AnimatedCounter value={stat.number} suffix="+" />
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 block leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  </WavyCard>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
