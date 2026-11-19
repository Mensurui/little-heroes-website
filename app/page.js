import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Educators from "@/components/Educators";
import Gallery from "@/components/Gallery";
import BlogSection from "@/components/BlogSection";
import BookingContact from "@/components/BookingContact";
import { fetchPublishedNewsletters } from "@/services/blogService";
import { fetchWebsiteGalleryImages } from "@/services/galleryService";
import { siteData } from "@/data/siteData";

export default async function Home() {
  const [newslettersRes, galleryRes] = await Promise.all([
    fetchPublishedNewsletters().catch(() => ({ success: false, items: [] })),
    fetchWebsiteGalleryImages({ category: "All" }).catch(() => ({ success: false, items: [] })),
  ]);

  const initialArticles =
    newslettersRes.success && newslettersRes.items?.length > 0
      ? newslettersRes.items
      : siteData.blog.articles;

  const initialGalleryItems =
    galleryRes.success && galleryRes.items?.length > 0
      ? galleryRes.items
      : siteData.gallery.items;

  return (
    <>
      {/* 1. Hero Section: "Where Care Sparks Growth" */}
      <Hero />

      {/* 2. About Section: "Leading Refined Childcare in Addis Ababa" */}
      <About />

      {/* 3. Programs Section: "Exceptional Care For Every Stage" */}
      <Programs />

      {/* 4. Educators Section: "Meet Our Educators" */}
      <Educators />

      {/* 5. Photo Gallery Section: "Amazing Activities Done By Our Kids" */}
      <Gallery initialItems={initialGalleryItems} />

      {/* 6. Social Banner & Latest Media / Blogs */}
      <BlogSection initialArticles={initialArticles} />

      {/* 7. Booking Form & Contact Details */}
      <BookingContact />
    </>
  );
}
