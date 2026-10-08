"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";

export default function Programs() {
  const { programs } = siteData;

  const badgeStyles = {
    green: "bg-emerald-400 text-white shadow-emerald-200 dark:shadow-none",
    blue: "bg-sky-400 text-white shadow-sky-200 dark:shadow-none",
    yellow: "bg-amber-400 text-white shadow-amber-200 dark:shadow-none",
  };

  return (
    <section id="programs" className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 lg:mb-10 space-y-2"
        >
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            PROGRAMS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Exceptional Care For Every Stage
          </h2>
        </motion.div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group"
            >
              <WavyCard className="h-full transition-shadow duration-300 group-hover:shadow-xl">
                <div className="space-y-6 text-left">
                  {/* Organic Brush Badge for Age Bracket with Hover Spring */}
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 350 }}
                  >
                    <span
                      className={`inline-block px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-sm transition-transform duration-200 ${badgeStyles[program.badgeColor]}`}
                      style={{
                        borderRadius:
                          program.badgeColor === "green"
                            ? "18px 24px 20px 22px"
                            : program.badgeColor === "blue"
                            ? "22px 18px 24px 20px"
                            : "20px 22px 18px 24px",
                      }}
                    >
                      {program.age}
                    </span>
                  </motion.div>

                  {/* Program Title */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-500 transition-colors">
                    {program.title}
                  </h3>

                  {/* Features Bullet List with Stagger Effect */}
                  <ul className="space-y-3 pt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-normal">
                    {program.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1"
                        style={{ transitionDelay: `${fIdx * 30}ms` }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-sky-400 inline-block flex-shrink-0 transition-colors" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </WavyCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
