"use client";

import React, { useState } from "react";
import { siteData } from "@/data/siteData";
import WavyCard from "@/components/ui/WavyCard";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingContact() {
  const { booking, brand } = siteData;

  const [formData, setFormData] = useState({
    parentName: "",
    phoneNumber: "",
    emailAddress: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <section id="contact" className="relative bg-white dark:bg-[#0B1120] transition-colors duration-300 pt-8 pb-12 overflow-hidden">
      
      {/* Book A School Tour Today Banner (Clean Straight Lines) */}
      <div className="relative w-full bg-[#38BDF8] py-14 sm:py-20 px-6 sm:px-8 text-center text-white my-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-tight text-white">
            {booking.bannerTitle}
          </h2>
          <p className="text-white/95 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {booking.bannerSubtitle}
          </p>
          <div className="pt-4 flex justify-center">
            <a
              href="#tour-form"
              className="inline-flex items-center justify-center px-9 py-3.5 bg-white hover:bg-slate-50 text-[#38BDF8] hover:text-[#0284C7] font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Schedule A Visit
            </a>
          </div>
        </div>
      </div>

      {/* Main Form & Contact Section */}
      <div id="tour-form" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Schedule A School Tour Form */}
          <div className="lg:col-span-6">
            <WavyCard className="shadow-sm !p-8 sm:!p-10">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
                {booking.formTitle}
              </h3>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-sky-50 dark:bg-slate-800/80 rounded-2xl border border-sky-200 dark:border-slate-700">
                  <CheckCircle2 className="w-12 h-12 text-sky-500 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Tour Request Received!
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Thank you, {formData.parentName}. Our admissions team will call you at {formData.phoneNumber} shortly to confirm your visit time.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ parentName: "", phoneNumber: "", emailAddress: "", message: "" });
                    }}
                    className="text-xs font-semibold text-sky-600 dark:text-sky-400 underline pt-2"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Parent Name"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      placeholder="Any specific questions or child's age..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white focus:border-sky-400 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 outline-none transition-all text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </form>
              )}
            </WavyCard>
          </div>

          {/* Right Column: Contact Details & Note for Parents */}
          <div className="lg:col-span-6 space-y-6">
            <WavyCard className="shadow-sm !p-8 sm:!p-10">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                Contact Details
              </h3>

              <div className="space-y-4 mb-8 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <span className="font-medium">{brand.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-700 dark:text-slate-300 flex-shrink-0" />
                  <a
                    href={`tel:${brand.phone.replace(/\s+/g, "")}`}
                    className="font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <a
                    href={`mailto:${brand.email}`}
                    className="font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                  >
                    {brand.email}
                  </a>
                </div>
              </div>

              {/* Note For Enrolling Parents Box */}
              <div className="relative rounded-2xl bg-[#FEFCE8] dark:bg-amber-950/30 border border-[#FDE047] dark:border-amber-700/60 p-6 space-y-2">
                <h4 className="text-sm font-bold text-[#854D0E] dark:text-amber-300 tracking-tight">
                  {booking.noteForParentsTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#A16207] dark:text-amber-200/90 leading-relaxed">
                  {booking.noteForParentsText}
                </p>
              </div>

            </WavyCard>
          </div>

        </div>
      </div>
    </section>
  );
}
