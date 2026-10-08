"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";
import WavyAvatar from "@/components/ui/WavyAvatar";

export default function Educators() {
  const { educators } = siteData;

  return (
    <section id="educators" className="py-20 lg:py-28 bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            OUR DEDICATED TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet Our Educators
          </h2>
        </div>

        {/* 4 Educator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {educators.map((educator, idx) => (
            <motion.div
              key={educator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
            >
              <WavyCard className="h-full text-center hover:translate-y-[-6px] transition-transform duration-300">
                <div className="flex flex-col items-center space-y-4">
                  {/* Organic Squiggly Circular Avatar */}
                  <WavyAvatar
                    src={educator.image}
                    alt={educator.name.replace("\n", " ")}
                    size={110}
                    borderColor="#CBD5E1"
                  />

                  {/* Educator Name */}
                  <div className="min-h-[52px] flex items-center justify-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight whitespace-pre-line">
                      {educator.name}
                    </h3>
                  </div>

                  {/* Role Tag */}
                  <span
                    className={`text-[11px] sm:text-xs font-bold tracking-wider uppercase block ${educator.roleColor}`}
                  >
                    {educator.role}
                  </span>

                  {/* Bio */}
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] leading-relaxed font-normal pt-1">
                    {educator.bio}
                  </p>
                </div>
              </WavyCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
