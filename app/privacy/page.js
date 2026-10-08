import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Little Heroes Day Care",
  description:
    "Official Privacy Policy for the Little Heroes platform and mobile application.",
};

export default function PrivacyPolicyPage() {
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
            href="/support"
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Support
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Privacy Policy
          </h1>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
            <span>Effective Date: Friday, October 9, 2026</span>
            <span>•</span>
            <span>Last Updated: Friday, October 9, 2026</span>
          </div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            This Privacy Policy explains how we collect, use, and protect personal information within the app. By using the Service, you agree to the practices described in this policy, which are designed to comply with standard educational privacy guidelines.
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              1. Account Provisioning & Access
            </h2>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              This app is not open to the general public.
            </p>
            <p>
              You cannot create an account directly through the app. All user accounts, credentials, and role assignments (e.g., student, teacher, parent, or administrator) are securely provisioned and managed directly by the School&apos;s administration. Passwords and login instructions are distributed by the School, and any issues regarding account access must be directed to the School&apos;s administrative office.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              2. Information We Process
            </h2>
            <p>
              To operate the academic, administrative, financial, and parent portal modules of the app, we process information on behalf of the School.
            </p>

            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                A. Information Provided by the School
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The School determines what data is populated into the app. This typically includes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-sm">
                <li>
                  <strong>Identity & Contact Data:</strong> Names, student ID numbers, grade levels, and parent/guardian contact information.
                </li>
                <li>
                  <strong>Academic Data:</strong> Class schedules, assignments, attendance records, and grades.
                </li>
                <li>
                  <strong>Financial & Administrative Data:</strong> Relevant fee statuses or administrative notices required for the parent portal.
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                B. Information Collected During Use
              </h3>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-sm">
                <li>
                  <strong>App Activity:</strong> We monitor technical usage (such as login times and module access) to ensure the system is running smoothly.
                </li>
                <li>
                  <strong>Device Data:</strong> We collect basic diagnostic data (e.g., OS version, device model, and crash logs) strictly to maintain app stability and security.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              3. How We Use the Data
            </h2>
            <p>
              We use the data solely to deliver the platform&apos;s features as contracted by the School. We use this information to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-sm">
              <li>Provide real-time academic updates and parent portal access.</li>
              <li>Facilitate communication between teachers, students, and parents.</li>
              <li>Secure the platform and prevent unauthorized access.</li>
              <li>Maintain and improve the technical performance of the application.</li>
            </ul>
            <p className="pt-2">
              <strong className="text-slate-900 dark:text-white">Strict Prohibition on Advertising:</strong> We do not sell, rent, or lease user data to third parties. We do not use student or parent data for targeted advertising or marketing purposes.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              4. Data Sharing & Third-Party Services
            </h2>
            <p>
              Data is only shared to the extent necessary to run the app&apos;s infrastructure. We use secure, enterprise-grade backend infrastructure (e.g., secure cloud hosting and database services) to store and process the School&apos;s data. These service providers are legally bound to strict confidentiality and security obligations and cannot use the data for their own purposes.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              5. Account & Data Deletion
            </h2>
            <p>
              Because the School is the official custodian of academic records, data retention and deletion are governed by the School&apos;s internal policies and local educational laws.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1 text-sm">
              <li>
                <strong>To Delete Your Account:</strong> If you are no longer enrolled or employed by the School, the School administration will deactivate your account and manage the removal of your data from the active system.
              </li>
              <li>
                <strong>App Store Compliance:</strong> If you wish to request the immediate deactivation of your app access or have questions about purging your personal data from the app&apos;s backend systems, please contact the School administration directly.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              6. Children&apos;s Privacy
            </h2>
            <p>
              This application is designed for educational use. We process personal information of students (including those under the age of 13) solely under the authorization and direction of the School. The School is responsible for obtaining any necessary parental consent for students to use the application. If you are a parent and have questions about your child&apos;s data, please contact the School directly.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              7. Security Measures
            </h2>
            <p>
              We utilize robust technical and organizational security measures to protect educational data. This includes encrypted data transmission (HTTPS/TLS), secure relational database architecture, and strict role-based access controls ensuring that users only see the data they are authorized to view (e.g., parents can only see their own child&apos;s data).
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              8. Contact Information
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                For questions regarding academic records, account creation, or institutional data policies, please contact Little Heroes Daycare at:
              </p>
              <p className="font-semibold text-slate-900 dark:text-white">
                School Contact: <a href="tel:+251941454545" className="underline hover:text-sky-500">+251941454545</a>
              </p>
            </div>

            <div className="space-y-2 pt-2 text-sm">
              <p>
                For technical questions regarding this Privacy Policy or the app&apos;s infrastructure, please contact the development team at:
              </p>
              <ul className="space-y-1 font-medium text-slate-800 dark:text-slate-200">
                <li>Developer: Robotech Software Solution</li>
                <li>
                  Support Email:{" "}
                  <a href="mailto:info@robotech.et" className="underline hover:text-sky-500">
                    info@robotech.et
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://www.robotech.et"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-sky-500"
                  >
                    www.robotech.et
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
