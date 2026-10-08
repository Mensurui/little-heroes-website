import Programs from "@/components/Programs";
import WavyCard from "@/components/ui/WavyCard";
import Link from "next/link";
import { Clock, Sun, BookOpen, Apple, TreePine, Sparkles } from "lucide-react";

export const metadata = {
  title: "Programs | Little Heroes Day Care Addis Ababa",
  description:
    "Explore our age-tailored programs for toddlers and preschoolers: Little Explorers (1-2), Curious Learners (2-3), and Confident Creators (3-4).",
};

export default function ProgramsPage() {
  const schedule = [
    {
      time: "08:00 - 08:30 AM",
      icon: Sun,
      title: "Warm Welcome & Free Play",
      desc: "Gentle drop-off routine, soft music, and self-directed sensory toys.",
    },
    {
      time: "08:30 - 09:15 AM",
      icon: BookOpen,
      title: "Morning Circle & Songs",
      desc: "Story reading, greeting rhymes, and language readiness in English & Amharic.",
    },
    {
      time: "09:15 - 10:00 AM",
      icon: Sparkles,
      title: "Curriculum & STEM Discovery",
      desc: "Color sorting, tactile crafting, loose-parts exploration, and counting games.",
    },
    {
      time: "10:00 - 10:30 AM",
      icon: Apple,
      title: "Nutritious Snack Break",
      desc: "Fresh fruits, wholesome snacks, and hands-on table etiquette manners.",
    },
    {
      time: "10:30 - 11:30 AM",
      icon: TreePine,
      title: "Outdoor Play & Gross Motor",
      desc: "Sandpit, balance stepping stones, active cooperative games in the garden.",
    },
    {
      time: "11:30 - 12:30 PM",
      icon: Clock,
      title: "Creative Arts & Rest Time",
      desc: "Watercolor painting, sponge stamping, and calming nap / relaxation time.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* 3 Core Program Stage Cards */}
      <Programs />

      {/* Daily Routine / Schedule */}
      <section className="py-20 bg-sky-50/50 dark:bg-slate-900/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
              Routines & Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              A Day In The Life At Little Heroes
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Predictable, loving routines provide young children with emotional security, independence, and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => {
              const Icon = item.icon;
              return (
                <WavyCard key={idx} className="!p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800">
                        {item.time}
                      </span>
                      <Icon className="w-5 h-5 text-sky-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </WavyCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enroll Callout */}
      <section className="py-20 bg-white dark:bg-[#0B1120] text-center transition-colors">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find the Right Stage for Your Child
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base max-w-xl mx-auto">
            Schedule a personal school tour to see our classrooms in action and speak directly with our lead educators.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Book A School Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
