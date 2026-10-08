"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-sky-50 dark:bg-slate-800 text-slate-700 dark:text-amber-300 border border-sky-200/60 dark:border-slate-700 shadow-sm"
      aria-label="Toggle Bedtime Dark Mode"
      title={isDark ? "Switch to Sunny Day Mode" : "Switch to Cozy Bedtime Mode"}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isDark ? <Sun size={19} className="text-amber-300" /> : <Moon size={19} className="text-sky-600" />}
      </motion.div>
    </motion.button>
  );
}
