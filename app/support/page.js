import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "App Support | Little Heroes Day Care",
  description:
    "Official support page for Little Heroes mobile app and parent portal. Get assistance with account access, password resets, and technical inquiries.",
};

export default function SupportPage() {
  const faqs = [
    {
      q: "How do I create an account for the Little Heroes app?",
      a: "The Little Heroes app is not open to the general public. All user accounts, credentials, and role assignments (parent, teacher, administrator) are securely provisioned directly by the School's administration. You cannot register directly inside the app.",
    },
    {
      q: "I forgot my password or cannot log in. What should I do?",
      a: "Because all credentials and access levels are managed directly by the School's administration, please contact the administrative office at +251941454545 to receive a password reset.",
    },
    {
      q: "How do I request account deactivation or data deletion?",
      a: "If your child is no longer enrolled or you wish to request the immediate deactivation of your app access or purge your personal data from backend systems, please contact the School administration directly at +251941454545.",
    },
    {
      q: "Who should I contact for technical bugs or app crashes?",
      a: "For technical questions regarding the app's infrastructure or to report application crashes, please email the developer team at info@robotech.et.",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-200 min-h-screen py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between text-xs mb-10 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            App & Portal Support
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Support contact points and common questions for parents and staff using the Little Heroes application.
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Contact Channels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  School Administration
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  For account credentials, password resets, enrollment records, and account deactivation.
                </p>
                <div className="pt-2 text-sm">
                  <span className="font-medium text-slate-500">Phone: </span>
                  <a href="tel:+251941454545" className="font-semibold underline hover:text-sky-500">
                    +251941454545
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Technical Support
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  For app stability, technical bugs, performance issues, and infrastructure.
                </p>
                <div className="pt-2 text-sm space-y-1">
                  <div>
                    <span className="font-medium text-slate-500">Developer: </span>
                    <span className="font-semibold text-slate-900 dark:text-white">Robotech Software Solution</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">Email: </span>
                    <a href="mailto:info@robotech.et" className="font-semibold underline hover:text-sky-500">
                      info@robotech.et
                    </a>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">Website: </span>
                    <a
                      href="https://www.robotech.et"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline hover:text-sky-500"
                    >
                      www.robotech.et
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
