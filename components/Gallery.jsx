"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/data/siteData";
import { X, Loader2 } from "lucide-react";
import { fetchWebsiteGalleryImages } from "@/services/galleryService";

export default function Gallery() {
  const { gallery } = siteData;
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState(gallery.items);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadGallery() {
      setIsLoading(true);
      try {
        const res = await fetchWebsiteGalleryImages({
          category: activeCategory,
        });
        if (!isMounted) return;
        if (res.success && res.items && res.items.length > 0) {
          setItems(res.items);
        } else {
          const fallback =
            activeCategory === "All"
              ? gallery.items
              : gallery.items.filter((item) => item.category === activeCategory);
          setItems(fallback);
        }
      } catch {
        if (!isMounted) return;
        const fallback =
          activeCategory === "All"
            ? gallery.items
            : gallery.items.filter((item) => item.category === activeCategory);
        setItems(fallback);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadGallery();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, gallery.items]);

  return (
    <section id="gallery" className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-white dark:bg-[#0B1120] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-400 uppercase">
            {gallery.subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {gallery.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {gallery.categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-sky-400 border-sky-400 text-white shadow-md shadow-sky-100 dark:shadow-none scale-105"
                    : "bg-white dark:bg-slate-900 border-sky-200 dark:border-slate-700 text-sky-600 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-white dark:bg-slate-900/60 shadow-sm border border-transparent dark:border-slate-800">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="
                M 3,1
                Q 20,2.2 40,0.8
                T 70,1.8
                T 96,1
                Q 99,1.5 99,5
                Q 97.8,25 99.2,50
                T 98.2,75
                T 99,95
                Q 98.5,99 95,99
                Q 75,98 50,99.2
                T 25,98.2
                T 4,99
                Q 1,98.5 1,95
                Q 2.2,75 0.8,50
                T 1.8,25
                T 1,4
                Q 1.5,1 3,1
                Z
              "
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="stroke-[#BAE6FD] dark:stroke-[#1E3A5F]"
            />
          </svg>

          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 size={32} className="animate-spin text-sky-400" />
              <span className="text-xs font-semibold">Updating gallery...</span>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-20"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent dark:border-slate-800"
                  >
                    <Image
                      src={item.image}
                      alt={item.title || "Photo"}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-white text-xs font-semibold line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-sky-300 text-[11px] font-medium">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title || "Selected Photo"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedImage.title}
                  </h4>
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-wider">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
