"use client";

import React from "react";

export default function WavyCard({
  children,
  className = "",
  borderColor,
  shadow = true,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`relative group ${
        shadow
          ? "shadow-[0_4px_24px_-4px_rgba(56,189,248,0.08)] dark:shadow-[0_4px_28px_-4px_rgba(0,0,0,0.5)]"
          : ""
      } ${className}`}
      style={{ borderRadius: "24px" }}
    >
      {/* SVG Hand-Drawn Wavy Outline */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-colors duration-300 z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="
            M 6,2
            Q 18,3.2 30,1.8
            T 55,2.6
            T 80,1.4
            Q 94,1.8 98,6
            Q 97.2,20 98.6,35
            T 97.7,60
            T 98.5,85
            Q 98,95 94,98
            Q 82,97.2 68,98.6
            T 40,97.5
            T 16,98.4
            Q 3,98 2,94
            Q 2.8,80 1.4,65
            T 2.5,40
            T 1.5,15
            Q 2,4 6,2
            Z
          "
          fill="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="text-white dark:text-[#131D31] stroke-[#BAE6FD] dark:stroke-[#203A60] group-hover:stroke-sky-400 dark:group-hover:stroke-sky-400 transition-colors duration-300"
        />
      </svg>

      {/* Card Content with safe inner padding */}
      <div className="relative z-20 h-full p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
