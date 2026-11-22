"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";
import BlogDetailModal from "@/components/BlogDetailModal";
import { fetchPublishedNewsletters } from "@/services/blogService";
import {
  Sparkles,
  ArrowRight,
  Search,
  X,
  Clock,
  User,
  Calendar,
  ChevronDown,
  Check,
} from "lucide-react";

function getArticleDateInfo(article) {
  if (!article) return null;
  const raw = article.rawDate || article.date;
  if (!raw) return null;

  let d;
  if (typeof raw === "string") {
    d = new Date(raw.replace(" ", "T"));
    if (isNaN(d.getTime())) {
      d = new Date(raw);
    }
  } else {
    d = new Date(raw);
  }

  if (isNaN(d.getTime())) return null;

  const year = d.getFullYear();
  const monthIndex = d.getMonth();
  const monthName = d.toLocaleString("en-US", { month: "long" });
  const shortMonth = d.toLocaleString("en-US", { month: "short" });
  const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
  const label = `${monthName} ${year}`;

  return { year, monthIndex, monthName, shortMonth, key, label };
}

export default function BlogSection({ initialArticles = [] }) {
  const { blog, brand } = siteData;

  const hasInitial = Array.isArray(initialArticles) && initialArticles.length > 0;
  const [articles, setArticles] = useState(hasInitial ? initialArticles : []);
  const [loading, setLoading] = useState(!hasInitial);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLiveSource, setIsLiveSource] = useState(hasInitial);
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const archiveDropdownRef = useRef(null);

  const categories = [
    "All Updates",
    "Little Explorers (1-2 yrs)",
    "Curious Learners (2-3 yrs)",
    "Confident Creators (3-4 yrs)",
    "Weekly Updates",
  ];

  // Dynamic Archive Timeline calculation (grouped by year & month)
  const archiveTimeline = useMemo(() => {
    const monthMap = new Map();

    articles.forEach((art) => {
      const info = getArticleDateInfo(art);
      if (!info) return;

      if (!monthMap.has(info.key)) {
        monthMap.set(info.key, {
          ...info,
          count: 0,
        });
      }
      monthMap.get(info.key).count += 1;
    });

    const sortedMonths = Array.from(monthMap.values()).sort((a, b) =>
      b.key.localeCompare(a.key)
    );

    const yearGroups = {};
    sortedMonths.forEach((item) => {
      if (!yearGroups[item.year]) {
        yearGroups[item.year] = [];
      }
      yearGroups[item.year].push(item);
    });

    return {
      months: sortedMonths,
      yearGroups: Object.entries(yearGroups).sort(([yA], [yB]) => Number(yB) - Number(yA)),
      total: articles.length,
    };
  }, [articles]);

  // Handle click outside to close the archive popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        archiveDropdownRef.current &&
        !archiveDropdownRef.current.contains(event.target)
      ) {
        setIsArchiveOpen(false);
      }
    }
    if (isArchiveOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isArchiveOpen]);

  const filteredArticles = articles.filter((a) => {
    // 1. Category Filter
    const matchesCategory =
      selectedCategory === "All Updates" || a.category === selectedCategory;

    // 2. Search Query Filter
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.author && a.author.toLowerCase().includes(q));

    // 3. Month & Year Archive Filter
    const matchesArchive =
      !selectedArchive ||
      (() => {
        const info = getArticleDateInfo(a);
        return info && info.key === selectedArchive.key;
      })();

    return matchesCategory && matchesQuery && matchesArchive;
  });

  const getCategoryBadgeStyle = (cat) => {
    if (cat?.includes("Explorers")) {
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200/60";
    }
    if (cat?.includes("Curious")) {
      return "bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200/60";
    }
    if (cat?.includes("Confident")) {
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200/60";
    }
    return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/60";
  };

  useEffect(() => {
    let isMounted = true;

    async function loadNewsletters() {
      try {
        const result = await fetchPublishedNewsletters();

        if (!isMounted) return;

        if (result.success && result.items && result.items.length > 0) {
          setArticles(result.items);
          setIsLiveSource(true);
        } else if (!hasInitial) {
          setArticles(blog.articles || []);
          setIsLiveSource(false);
        }
      } catch (err) {
        if (!isMounted) return;
        if (!hasInitial) {
          setArticles(blog.articles || []);
          setIsLiveSource(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNewsletters();

    return () => {
      isMounted = false;
    };
  }, [blog.articles, hasInitial]);

  return (
    <section
      id="blog"
      className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Sky-Blue Social Banner (Figma Exact) */}
        <div className="relative mb-12 sm:mb-14 rounded-3xl bg-sky-400 p-8 sm:p-10 lg:p-12 text-white shadow-xl shadow-sky-200/50 dark:shadow-none overflow-hidden">
          {/* Subtle Organic Background Patterns */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-sky-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {blog.bannerTitle}
              </h3>
              <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
                {blog.bannerSubtitle}
              </p>
            </div>

            {/* Social Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-rose-500 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Instagram
              </a>
              <a
                href={brand.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Section Header: Our Latest Media / Bulletins */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
              {blog.subtitle}
            </span>
            {isLiveSource && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold tracking-normal uppercase border border-emerald-500/20">
                <Sparkles size={11} />
                Live Bulletins
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {blog.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Weekly classroom journals, learning highlights, and announcements directly from our lead educators.
          </p>
        </div>

        {/* Search Bar, Monthly Archive Pill & Classroom Category Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-10 space-y-5">
          {/* Control Bar: Search Input & Timeline Archive Dropdown Pill */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Real-time Search Input */}
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search updates, crafts, activities..."
                className="w-full pl-11 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Timeline Archive Dropdown Pill (Option 1) */}
            <div className="relative w-full sm:w-auto" ref={archiveDropdownRef}>
              <button
                type="button"
                onClick={() => setIsArchiveOpen((prev) => !prev)}
                className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all border shadow-sm ${
                  selectedArchive
                    ? "bg-sky-50 dark:bg-sky-950/70 border-sky-400 text-sky-700 dark:text-sky-300 ring-2 ring-sky-200/60 dark:ring-sky-900/60"
                    : "bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-sky-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar
                    size={15}
                    className={selectedArchive ? "text-sky-500" : "text-slate-400"}
                  />
                  <span>
                    {selectedArchive ? selectedArchive.label : "Archive Timeline"}
                  </span>
                </div>

                {selectedArchive ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArchive(null);
                    }}
                    className="p-0.5 rounded-full hover:bg-sky-200 dark:hover:bg-sky-800 text-sky-600 dark:text-sky-300 transition-colors"
                    title="Clear archive filter"
                  >
                    <X size={13} />
                  </span>
                ) : (
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isArchiveOpen ? "rotate-180 text-sky-500" : ""
                    }`}
                  />
                )}
              </button>

              {/* Floating Archive Popover */}
              <AnimatePresence>
                {isArchiveOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-40 space-y-1.5"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Past Classroom Stories
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {archiveTimeline.total} Total
                      </span>
                    </div>

                    {/* Reset to All Dates */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArchive(null);
                        setIsArchiveOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        !selectedArchive
                          ? "bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-slate-400" />
                        <span>All Dates</span>
                      </div>
                      {!selectedArchive && <Check size={14} className="text-sky-500" />}
                    </button>

                    {/* Year Groups */}
                    {archiveTimeline.yearGroups.map(([year, months]) => (
                      <div key={year} className="pt-2">
                        <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {year}
                        </div>
                        <div className="space-y-0.5">
                          {months.map((m) => {
                            const isSelected = selectedArchive?.key === m.key;
                            return (
                              <button
                                key={m.key}
                                type="button"
                                onClick={() => {
                                  setSelectedArchive(m);
                                  setIsArchiveOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                                  isSelected
                                    ? "bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 font-bold"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }`}
                              >
                                <span className="font-medium">{m.monthName}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                                    {m.count} {m.count === 1 ? "story" : "stories"}
                                  </span>
                                  {isSelected && (
                                    <Check size={14} className="text-sky-500" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Classroom Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-sky-400 text-white border-sky-400 shadow-md shadow-sky-200/50 dark:shadow-none scale-105"
                      : "bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-sky-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicators & Reset Action */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>
              Showing <strong className="text-slate-700 dark:text-slate-200">{filteredArticles.length}</strong> updates
            </span>
            {selectedCategory !== "All Updates" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All Updates")}
                  className="hover:text-rose-500"
                >
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedArchive && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-semibold border border-sky-200/50 dark:border-sky-800/50">
                🗓️ {selectedArchive.label}
                <button
                  onClick={() => setSelectedArchive(null)}
                  className="hover:text-rose-500"
                >
                  <X size={11} />
                </button>
              </span>
            )}
            {(selectedCategory !== "All Updates" || selectedArchive || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All Updates");
                  setSelectedArchive(null);
                  setSearchQuery("");
                }}
                className="text-sky-500 hover:underline font-semibold ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <WavyCard key={`skeleton-${n}`} className="h-full !p-4 animate-pulse">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              </WavyCard>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          /* Empty Filter State */
          <div className="text-center py-16 px-6 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-slate-800 text-sky-400 flex items-center justify-center mx-auto">
              <Search size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching updates found
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Try adjusting your search terms, clearing the date filter, or select "All Updates" to view all classroom posts.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Updates");
                setSelectedArchive(null);
              }}
              className="px-5 py-2 rounded-full bg-sky-400 text-white text-xs font-bold hover:bg-sky-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Article Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.map((article, idx) => {
              const articleHref = `/blog/${encodeURIComponent(article.id || article.name || "1")}`;
              return (
                <motion.div
                  key={article.id || `art-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                  className="flex"
                >
                  <Link
                    href={articleHref}
                    className="w-full flex group focus:outline-none"
                  >
                    <WavyCard className="w-full h-full group-hover:translate-y-[-6px] transition-transform duration-300 !p-4 flex flex-col justify-between">
                      <div className="space-y-3.5">
                        {/* Article Thumbnail */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 100vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Top Metadata: Category Pill & Read Time */}
                        <div className="flex items-center justify-between gap-2 pt-0.5">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border truncate max-w-[150px] ${getCategoryBadgeStyle(
                              article.category
                            )}`}
                          >
                            {article.category || "Weekly Update"}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 flex-shrink-0">
                            <Clock size={11} className="text-amber-400" />
                            {article.readTime || "2 min"}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">
                          {article.title}
                        </h4>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Card Footer: Date & Read Link */}
                      <div className="pt-3.5 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                        <span className="text-[11px] text-slate-400 font-normal">
                          {article.date}
                        </span>
                        <div className="text-sky-500 group-hover:text-sky-600 flex items-center gap-1">
                          <span>Read Story</span>
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </WavyCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      
        {/* Full Article Reader Modal */}
        <BlogDetailModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      </div>
    </section>
  );
}




