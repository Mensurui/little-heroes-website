import BlogSection from "@/components/BlogSection";
import WavyCard from "@/components/ui/WavyCard";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { fetchPublishedNewsletters } from "@/services/blogService";
import { siteData } from "@/data/siteData";

export const metadata = {
  title: "Blog & Media | Little Heroes Day Care Addis Ababa",
  description:
    "Expert tips on early childhood education, play-based learning, toddler milestones, and parenting advice from our educators in Addis Ababa.",
};

export default async function BlogPage() {
  const newslettersRes = await fetchPublishedNewsletters().catch(() => ({
    success: false,
    items: [],
  }));

  const initialArticles =
    newslettersRes.success && newslettersRes.items?.length > 0
      ? newslettersRes.items
      : siteData.blog.articles;

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* Main Blog Cards & Social Banner */}
      <BlogSection initialArticles={initialArticles} />

      {/* Parent Newsletter Section */}
      <section className="py-20 bg-sky-50/50 dark:bg-slate-900/40 transition-colors">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <WavyCard className="!p-8 sm:!p-12 text-center">
            <NewsletterSubscribe />
          </WavyCard>
        </div>
      </section>
    </div>
  );
}
