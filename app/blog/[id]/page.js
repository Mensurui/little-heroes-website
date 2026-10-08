import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchNewsletterByName } from "@/services/blogService";
import { siteData } from "@/data/siteData";
import ExpandableArticleContent from "@/components/ExpandableArticleContent";
import WavyCard from "@/components/ui/WavyCard";
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const res = await fetchNewsletterByName(resolvedParams.id);
  const article = res?.article || siteData.blog.articles[0];

  return {
    title: `${article.title} | Little Heroes Day Care`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Little Heroes Day Care`,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const res = await fetchNewsletterByName(resolvedParams.id);

  if (!res || !res.article) {
    notFound();
  }

  const { article } = res;

  // Filter out current article for related stories
  const relatedArticles = siteData.blog.articles
    .filter((a) => String(a.id) !== String(article.id) && a.slug !== resolvedParams.id)
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300 min-h-screen py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to All Media</span>
          </Link>

          <nav className="text-xs font-medium text-slate-400 dark:text-slate-500">
            <Link href="/" className="hover:text-sky-500 transition-colors">Home</Link>
            {" / "}
            <Link href="/blog" className="hover:text-sky-500 transition-colors">Blog</Link>
            {" / "}
            <span className="text-sky-500 dark:text-sky-400 font-semibold truncate max-w-[200px] inline-block align-bottom">
              {article.category || "Article"}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          {/* Category & Status Pill */}
          <div className="flex items-center gap-2.5">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
              {article.category || "Daycare Guide"}
            </span>
            {article.isLive && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles size={12} />
                Official Bulletin
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          {/* Metadata Row: Date, Reading Time, Author */}
          <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-sky-100 relative flex-shrink-0 border border-sky-200 dark:border-slate-700">
                <Image
                  src={article.authorAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"}
                  alt={article.author}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block font-bold text-slate-900 dark:text-white leading-tight">
                  {article.author}
                </span>
                <span className="block text-xs text-sky-500">
                  {article.authorRole || "Early Learning Team"}
                </span>
              </div>
            </div>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

            {/* Date */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Calendar size={15} className="text-sky-400" />
              <span>{article.date}</span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-1.5 text-xs sm:text-sm">
              <Clock size={15} className="text-amber-400" />
              <span>{article.readTime || "5 min read"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image with Deckled Torn Border Style */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Expandable Article Content (Key Takeaways, Body, Accordions) */}
        <ExpandableArticleContent
          title={article.title}
          bodyHtml={article.body}
          keyTakeaways={article.keyTakeaways || []}
          expandableSections={article.expandableSections || []}
        />

        {/* Educator / Author Spotlight */}
        <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800">
          <WavyCard className="!p-6 sm:!p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full overflow-hidden relative shadow-md border-2 border-sky-200 flex-shrink-0">
                <Image
                  src={article.authorAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"}
                  alt={article.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                  Written by
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {article.author}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dedicated to sharing modern pedagogy, respectful childcare frameworks, and milestone guidance with families in Addis Ababa.
                </p>
              </div>
            </div>
          </WavyCard>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
                  Continue Reading
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Related Stories & Advice
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-sky-500 hover:text-sky-600 flex items-center gap-1 group"
              >
                <span>View all</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${encodeURIComponent(rel.id || rel.slug)}`}
                  className="group flex focus:outline-none"
                >
                  <WavyCard className="w-full !p-4 group-hover:translate-y-[-4px] transition-transform flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-xs font-semibold text-sky-400 block">
                        {rel.date}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-sky-500 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-500">
                      <span>Read</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </WavyCard>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Schedule a Tour CTA Banner */}
        <div className="mt-20 rounded-3xl bg-sky-400 text-white p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Looking for a Loving Childcare Environment?
            </h3>
            <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
              Schedule a personalized tour of our Kazanchis facility to meet our educators and see our classrooms firsthand.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-sky-500 font-bold text-sm shadow-md transition-transform active:scale-95"
              >
                Book A School Visit
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
