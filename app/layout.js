import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ThemeProvider from "@/components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Little Heroes | Premium Early Childhood Education & Daycare in Addis Ababa",
  description:
    "Where Care Sparks Growth. A luxury daycare and preschool experience in Kazanchis, Addis Ababa offering world-class care, exploration, creativity, and play-based learning.",
  keywords: [
    "daycare Addis Ababa",
    "preschool Addis Ababa",
    "Little Heroes Day Care",
    "Kazanchis childcare",
    "early childhood education Ethiopia",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Little Heroes | Where Care Sparks Growth",
    description: "Premium Early Childhood Education & Daycare in Kazanchis, Addis Ababa.",
    url: "https://littleheroes.et",
    siteName: "Little Heroes Day Care",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="font-outfit antialiased bg-white dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 selection:bg-sky-200 selection:text-sky-900 flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
