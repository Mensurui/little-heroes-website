import Gallery from "@/components/Gallery";
import { siteData } from "@/data/siteData";
import { Camera } from "lucide-react";

export const metadata = {
  title: "Photo Gallery | Little Heroes Day Care Activities",
  description:
    "See our little heroes in action: arts & crafts, classroom STEM discoveries, outdoor playground moments, and festive events in Kazanchis, Addis Ababa.",
};

export default function GalleryPage() {
  const { brand } = siteData;

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* Interactive Gallery */}
      <Gallery />

      {/* Social Live Feeds Callout */}
      <section className="py-16 bg-sky-50 dark:bg-slate-900/40 text-center transition-colors">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-500 mx-auto flex items-center justify-center">
            <Camera size={24} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Want to see live daily stories?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            We post real-time classroom activities, student artwork, and celebration highlights on our Instagram and TikTok channels.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href={brand.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Follow on Instagram
            </a>
            <a
              href={brand.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-black text-white font-semibold text-xs transition-colors shadow-sm border border-transparent dark:border-slate-700"
            >
              Watch on TikTok
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
