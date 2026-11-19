"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";
import BlogDetailModal from "@/components/BlogDetailModal";
import { fetchPublishedNewsletters } from "@/services/blogService";
import { Sparkles, ArrowRight, Search, X, Clock, User } from "lucide-react";

export default function BlogSection({ initialArticles = [] }) {
  const { blog, brand } = siteData;

  const hasInitial = Array.isArray(initialArticles) && initialArticles.length > 0;
  const [articles, setArticles] = useState(hasInitial ? initialArticles : []);
  const [loading, setLoading] = useState(!hasInitial);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLiveSource, setIsLiveSource] = useState(hasInitial);
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Updates",
    "Little Explorers (1-2 yrs)",
    "Curious Learners (2-3 yrs)",
    "Confident Creators (3-4 yrs)",
    "Weekly Updates",
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCategory =
      selectedCategory === "All Updates" || a.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.author && a.author.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
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
          // Fallback gracefully to default curated siteData articles
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

        {/* Search Bar & Classroom Category Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-10 space-y-5">
          {/* Real-time Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search weekly updates, crafts, activities..."
              className="w-full pl-11 pr-10 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
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

          {/* Active Filter Count Indicator */}
          <div className="text-center text-xs text-slate-400">
            Showing <span className="font-bold text-slate-700 dark:text-slate-200">{filteredArticles.length}</span> updates
            {selectedCategory !== "All Updates" && ` in ${selectedCategory}`}
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
          /* Empty Search State */
          <div className="text-center py-16 px-6 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-slate-800 text-sky-400 flex items-center justify-center mx-auto">
              <Search size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching updates found
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Try adjusting your search terms or select "All Updates" to view all classroom posts.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Updates");
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




