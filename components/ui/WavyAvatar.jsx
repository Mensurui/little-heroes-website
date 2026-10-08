"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WavyAvatar({
  src,
  alt = "Educator",
  size = 110,
  borderColor = "#CBD5E1",
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.45, ease: "easeInOut" },
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Hand-drawn squiggly circle border SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
      >
        <path
          d="
            M 50,4
            C 62,3.5 74,6.2 84,15.5
            C 93.8,24.8 96.5,37 96,50
            C 95.5,63 93,75 83.5,84.5
            C 74,94 62,96.5 50,96
            C 37.5,95.5 25.5,93.5 16,84
            C 6.5,74.5 3.5,62.5 4,50
            C 4.5,37 7.5,25 16.5,15.8
            C 25.5,6.5 37.5,4.2 50,4
            Z
          "
          fill="none"
          stroke={borderColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300 group-hover:stroke-sky-400"
        />
      </svg>

      {/* Internal avatar image with matching organic clip */}
      <div
        className="w-[84%] h-[84%] rounded-full overflow-hidden relative shadow-inner bg-sky-50 flex items-center justify-center"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-sky-100 to-sky-50 flex items-center justify-center text-sky-400 font-semibold text-lg">
            {alt.charAt(0)}
          </div>
        )}
      </div>
    </motion.div>
  );
}
