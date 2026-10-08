import About from "@/components/About";
import Educators from "@/components/Educators";
import WavyCard from "@/components/ui/WavyCard";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, Smile } from "lucide-react";

export const metadata = {
  title: "About Us | Little Heroes Day Care Addis Ababa",
  description:
    "Learn about our world-class childcare standards, nurturing educators, and child-centered learning philosophy at Kazanchis, Addis Ababa.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      iconColor: "text-sky-500",
      title: "Safe & Nurturing Sanctuary",
      desc: "Child-proofed environments, medical-grade hygiene protocols, and constant vigilant supervision.",
    },
    {
      icon: Heart,
      iconColor: "text-rose-500",
      title: "Loving, Certified Educators",
      desc: "Passionate mentors trained in early childhood developmental psychology and respectful caregiving.",
    },
    {
      icon: Sparkles,
      iconColor: "text-amber-500",
      title: "Sensory & Creative Discovery",
      desc: "Curriculums rich in open-ended sensory arts, STEM exploration, rhythm music, and story circles.",
    },
    {
      icon: Smile,
      iconColor: "text-emerald-500",
      title: "Emotional & Social Readiness",
      desc: "Helping toddlers understand empathy, self-expression, conflict resolution, and teamwork.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* Philosophy Pillars */}
      <section className="pt-6 pb-14 lg:pt-8 lg:pb-16 bg-sky-50/40 dark:bg-slate-900/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold tracking-widest text-sky-500 dark:text-sky-400 uppercase">
              Our Foundations
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Why Families Trust Little Heroes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <WavyCard key={idx} className="!p-6 text-left">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </WavyCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main About Component */}
      <About />

      {/* Meet Our Educators */}
      <Educators />

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-sky-400 text-white text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Come Experience Little Heroes In Person
          </h2>
          <p className="text-sky-100 text-base max-w-xl mx-auto">
            Book a guided tour of our Kazanchis facility to meet our directors and educators.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-sky-500 font-bold text-sm shadow-lg transition-transform active:scale-95"
            >
              Book A School Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
