import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GenreShowcase from "@/components/GenreShowcase";
import SceneBackground from "@/components/SceneBackground";

// Lazy-loaded sections for high-velocity performance
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ClientsSection = lazy(() => import("@/components/ClientsSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Minimal section loader to maintain layout rhythm
const SectionLoader = () => (
  <div className="py-24 w-full flex items-center justify-center opacity-20">
    <div className="w-12 h-px bg-primary animate-pulse" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <SceneBackground />
      <div className="absolute inset-0 pointer-events-none vignette opacity-40 z-[-1]" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GenreShowcase />
      <Suspense fallback={<SectionLoader />}>
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
