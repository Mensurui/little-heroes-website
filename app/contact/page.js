import BookingContact from "@/components/BookingContact";
import WavyCard from "@/components/ui/WavyCard";
import { Clock, Shield, MapPin } from "lucide-react";

export const metadata = {
  title: "Schedule A Tour & Contact | Little Heroes Day Care",
  description:
    "Schedule your personal school visit at Little Heroes Day Care in Kazanchis, Addis Ababa. View visiting hours, location details, and admissions info.",
};

export default function ContactPage() {
  const visitGuidelines = [
    {
      icon: Clock,
      title: "Visiting Hours",
      desc: "Tours are conducted Monday through Friday from 09:30 AM to 11:30 AM or 03:00 PM to 04:30 PM by prior appointment.",
    },
    {
      icon: Shield,
      title: "Safety & Check-in",
      desc: "For the safety of all children, visitors must register at the reception desk upon arrival. Photo ID is required.",
    },
    {
      icon: MapPin,
      title: "Campus Location",
      desc: "Conveniently situated in Kazanchis, Addis Ababa with secure on-site parking and accessible drop-off zones.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B1120] transition-colors duration-300">
      {/* Campus Guidelines / Info Cards */}
      <section className="pt-6 pb-12 lg:pt-8 lg:pb-14 bg-sky-50/40 dark:bg-slate-900/40 transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visitGuidelines.map((item, idx) => {
              const Icon = item.icon;
              return (
                <WavyCard key={idx} className="!p-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-500 dark:text-sky-300 flex items-center justify-center border border-sky-200/50 dark:border-sky-800">
                      <Icon size={20} />
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

      {/* Main Tour Booking Form & Contact Information */}
      <BookingContact />
    </div>
  );
}
