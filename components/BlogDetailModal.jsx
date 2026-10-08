"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function BlogDetailModal({ article, isOpen, onClose }) {
  // Lock body scroll when modal is open & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!article) return null;

  const handleBookingClick = () => {
    onClose();
    // Smooth scroll to booking section
    const el = document.getElementById("booking") || document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header / Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-20">
              <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase tracking-wider">
                <BookOpen size={16} />
                <span>Little Heroes Bulletin</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors hover:scale-105 active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 space-y-6">
              {/* Cover Image */}
              {article.image && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-md">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Meta Badges: Date & Author */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium pt-2">
                <span className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full font-semibold">
                  <Calendar size={14} />
                  {article.date}
                </span>

                {article.author && (
                  <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                    <User size={14} />
                    {article.author}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {article.title}
              </h2>

              <hr className="border-slate-100 dark:border-slate-800" />

              {/* Rich-Text Body with Daycare Themed HTML Styling */}
              <div
                className="article-content text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-4 font-normal"
                dangerouslySetInnerHTML={{
                  __html:
                    article.body ||
                    `<p><strong>${article.excerpt || ""}</strong></p>
                     <p>At Little Heroes Day Care, our early childhood pedagogy is built around hands-on curiosity, emotional security, and language development. Every child learns at their own pace in an environment designed specifically to spark joy and independence.</p>
                     <h3>Why This Matters for Early Development</h3>
                     <p>Research in early childhood education consistently shows that warm social bonds and inquiry-led activities set the groundwork for future resilience, focus, and empathy. From sensory play to structured group storytelling, our educators guide each moment with intention.</p>
                     <blockquote>"When children feel safe and celebrated, exploration becomes natural and delightful."</blockquote>
                     <p>If you would like to learn more about our curriculum or see our classrooms in action in Kazanchis, Addis Ababa, feel free to schedule a school tour with our team.</p>`,
                }}
              />
            </div>

            {/* Modal Footer / CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 sm:px-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Have questions about our daycare routines or admissions?
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleBookingClick}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-sky-400 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-400/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Book School Tour</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
