"use client";

import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import JourneySection from "../components/landing/JourneySection";
import GamificationSection from "../components/landing/GamificationSection";
import DetailedFeaturesSection from "../components/landing/DetailedFeaturesSection";
import WhySection from "../components/landing/WhySection";
import OnboardingFlowSection from "../components/landing/OnboardingFlowSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import PricingSection from "../components/landing/PricingSection";
import DownloadSection from "../components/landing/DownloadSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import ScrollToTop from "../components/landing/ScrollToTop";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <JourneySection />
      <GamificationSection />
      <DetailedFeaturesSection />
      <WhySection />
      <OnboardingFlowSection />
      <TestimonialsSection />
      <PricingSection />
      <DownloadSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
