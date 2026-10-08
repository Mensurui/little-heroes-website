import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Educators from "@/components/Educators";
import Gallery from "@/components/Gallery";
import BlogSection from "@/components/BlogSection";
import BookingContact from "@/components/BookingContact";

export default function Home() {
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
      <Gallery />

      {/* 6. Social Banner & Latest Media / Blogs */}
      <BlogSection />

      {/* 7. Booking Form & Contact Details */}
      <BookingContact />
    </>
  );
}
