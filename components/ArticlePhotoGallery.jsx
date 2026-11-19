"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";

export default function ArticlePhotoGallery({ images = [], title = "Classroom Moments" }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="my-10 space-y-4">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-500 flex items-center justify-center">
            <Camera size={16} />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Classroom Photo Album
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {images.length} {images.length === 1 ? "photo" : "photos"} from this week's activities
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-sky-500 bg-sky-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-sky-100 dark:border-slate-700">
          Tap to expand
        </span>
      </div>

      {/* Masonry / Grid Display */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer shadow-sm border border-slate-200/60 dark:border-slate-700"
          >
            <Image
              src={img.src || img}
              alt={img.alt || `${title} - Photo ${idx + 1}`}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                <Maximize2 size={16} />
              </div>
            </div>
            {img.caption && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-2 text-white text-[11px] truncate">
                {img.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            {/* Top Bar: Counter & Close */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-10">
              <span className="text-sm font-medium bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/10 transition-colors"
                aria-label="Close photo view"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prev / Next Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-110 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-white/10 transition-all hover:scale-110 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Main Active Image */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-[75vh] max-w-4xl">
                <Image
                  src={images[selectedIndex]?.src || images[selectedIndex]}
                  alt={images[selectedIndex]?.alt || `${title} - Full size`}
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              {images[selectedIndex]?.caption && (
                <p className="mt-3 text-center text-sm text-slate-300 max-w-xl">
                  {images[selectedIndex].caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
