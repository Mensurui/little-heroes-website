"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-500 mx-auto flex items-center justify-center">
        <Mail size={24} />
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Subscribe to Our Monthly Parent Guide
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        Receive practical tips on speech development, positive discipline routines, and craft activity ideas delivered once a month.
      </p>

      {subscribed ? (
        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center gap-2 text-sm font-semibold border border-emerald-200">
          <CheckCircle2 size={18} />
          <span>Thank you for subscribing! Check your inbox soon.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 pt-3"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm"
          />
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-sky-400 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
