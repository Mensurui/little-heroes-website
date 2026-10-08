"use client";

import React from "react";

export function TornEdge({
  position = "top", // "top" or "bottom"
  color = "#38BDF8", // Tailwind sky-400
  className = "",
  flip = false,
}) {
  const isTop = position === "top";

  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{ height: "14px" }}
    >
      <svg
        viewBox="0 0 1200 18"
        preserveAspectRatio="none"
        className={`w-full h-full block ${flip ? "scale-x-[-1]" : ""}`}
      >
        <path
          fill={color}
          d={
            isTop
              ? "M0,18 L0,8 Q35,4 70,10 T140,5 T210,11 T280,4 T350,9 T420,3 T490,10 T560,5 T630,11 T700,4 T770,9 T840,3 T910,11 T980,5 T1050,10 T1120,4 T1200,8 L1200,18 Z"
              : "M0,0 L0,10 Q35,14 70,8 T140,13 T210,7 T280,14 T350,9 T420,15 T490,8 T560,13 T630,7 T700,14 T770,9 T840,15 T910,7 T980,13 T1050,8 T1120,14 T1200,10 L1200,0 Z"
          }
        />
      </svg>
    </div>
  );
}

export function TornLine({ color = "#38BDF8", height = 6, className = "" }) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          fill={color}
          d="M0,0 L0,7 Q40,3 80,8 T160,5 T240,9 T320,4 T400,8 T480,3 T560,7 T640,4 T720,8 T800,4 T880,9 T960,5 T1040,8 T1120,4 T1200,7 L1200,0 Z"
        />
      </svg>
    </div>
  );
}
