"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Share2, Check, BookOpen, Lightbulb } from "lucide-react";

export default function ExpandableArticleContent({
  keyTakeaways = [],
  bodyHtml = "",
  expandableSections = [],
  title = "",
}) {
  const [takeawaysOpen, setTakeawaysOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({ 0: true });
  const [copied, setCopied] = useState(false);

  const toggleSection = (idx) => {
    setExpandedSections((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="space-y-10">
      {/* Quick Action Bar: Reading Mode & Share Link */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-sky-50/60 dark:bg-slate-900/60 border border-sky-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-sky-300">
          <BookOpen size={16} />
          <span>Parent Resource Guide</span>
        </div>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-400 transition-colors shadow-sm active:scale-95"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={14} className="text-sky-500" />
              <span>Share Article</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Key Takeaways Box */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="rounded-3xl border-2 border-sky-200 dark:border-sky-900/60 bg-sky-50/40 dark:bg-slate-900/40 overflow-hidden shadow-sm transition-colors">
          <button
            onClick={() => setTakeawaysOpen(!takeawaysOpen)}
            className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none group"
            aria-expanded={takeawaysOpen}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-400 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Lightbulb size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-500 transition-colors">
                  Key Takeaways for Parents
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {takeawaysOpen ? "Click to collapse summary" : "Click to expand key points"}
                </p>
              </div>
            </div>

            <motion.div
              animate={{ rotate: takeawaysOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-slate-500"
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {takeawaysOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 border-t border-sky-100 dark:border-slate-800 pt-5">
                  <ul className="space-y-3">
                    {keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Main Rich Article Body */}
      <div
        className="prose prose-lg dark:prose-invert prose-sky max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-normal
          prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:mb-5
          prose-blockquote:border-l-4 prose-blockquote:border-sky-400 prose-blockquote:bg-sky-50/50 dark:prose-blockquote:bg-slate-900/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:font-medium prose-blockquote:text-slate-800 dark:prose-blockquote:text-slate-200"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      {/* Expandable Deep Dive & Q&A Accordion Sections */}
      {expandableSections && expandableSections.length > 0 && (
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="mb-4">
            <span className="text-xs font-bold tracking-widest text-sky-500 uppercase">
              Expandable Deep Dives
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Checklists & Guidance
            </h3>
          </div>

          {expandableSections.map((sec, idx) => {
            const isOpen = !!expandedSections[idx];
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white pr-4">
                    {sec.title}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 flex-shrink-0"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5 pt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: sec.content }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
