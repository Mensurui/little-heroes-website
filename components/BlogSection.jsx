"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";
import BlogDetailModal from "@/components/BlogDetailModal";
import { fetchPublishedNewsletters } from "@/services/blogService";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const { blog, brand } = siteData;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLiveSource, setIsLiveSource] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadNewsletters() {
      try {
        const result = await fetchPublishedNewsletters();

        if (!isMounted) return;

        if (result.success && result.items && result.items.length > 0) {
          setArticles(result.items);
          setIsLiveSource(true);
        } else {
          // Fallback gracefully to default curated siteData articles
          setArticles(blog.articles || []);
          setIsLiveSource(false);
        }
      } catch (err) {
        if (!isMounted) return;
        setArticles(blog.articles || []);
        setIsLiveSource(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadNewsletters();

    return () => {
      isMounted = false;
    };
  }, [blog.articles]);

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
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
              {blog.subtitle}
            </span>
            {isLiveSource && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold tracking-normal uppercase border border-emerald-500/20">
                
                
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {blog.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Click on any story to read the full bulletin, announcements, and parenting updates.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <WavyCard key={`skeleton-${n}`} className="h-full !p-4 animate-pulse">
                <div className="space-y-4">
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  {/* Date Tag Placeholder */}
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  {/* Title Lines Placeholder */}
                  <div className="space-y-2">
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                  {/* Excerpt Placeholder */}
                  <div className="space-y-1.5 pt-1">
                    <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-11/12 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              </WavyCard>
            ))}
          </div>
        ) : (
          /* 4 Article Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article, idx) => {
              const articleHref = `/blog/${encodeURIComponent(article.id || article.name || "1")}`;
              return (
                <motion.div
                  key={article.id || `art-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="flex"
                >

                  <Link
                    href={articleHref}
                    className="w-full flex group focus:outline-none"
                  >

                    <WavyCard className="w-full h-full group-hover:translate-y-[-6px] transition-transform duration-300 !p-4 flex flex-col justify-between">
                      <div className="space-y-4">
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

                        {/* Date Tag */}
                        <span className="text-xs font-semibold text-sky-400 block tracking-wide">
                          {article.date}
                        </span>

                        {/* Title */}
                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-sky-500 transition-colors">
                          {article.title}
                        </h4>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Read More Link / Button indicator */}
                      <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-500 group-hover:text-sky-600">
                        <span>Read Full Article</span>
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
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




