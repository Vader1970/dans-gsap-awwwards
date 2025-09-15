// Component imports - organized by type for better readability
import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";

// GSAP imports - grouped together for better organization
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useFontsLoaded } from "./hooks/useFontsLoaded";

// Register GSAP plugins for smooth scrolling and scroll-triggered animations
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  // Custom hook to check if fonts are loaded before initializing ScrollSmoother
  const fontsLoaded = useFontsLoaded();

  // Initialize ScrollSmoother only after fonts are loaded to prevent layout shifts
  useGSAP(() => {
    // Exit early if fonts aren't loaded yet to prevent incorrect positioning
    if (!fontsLoaded) return;

    // Small delay to ensure DOM is fully ready after font loading
    const initScrollSmoother = () => {
      ScrollSmoother.create({
        smooth: 3, // Smoothness factor (higher = smoother)
        effects: true, // Enable parallax and other scroll effects
      });
    };

    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(initScrollSmoother);
  }, [fontsLoaded]); // Re-run when fontsLoaded changes

  return (
    <main>
      {/* Navigation bar - positioned outside smooth wrapper for fixed positioning */}
      <NavBar />

      {/* Loading state - shown while fonts are loading to prevent layout shifts */}
      {!fontsLoaded && (
        <div className="fixed inset-0 bg-milk flex-center z-50">
          <div className="text-dark-brown text-xl font-bold">Loading...</div>
        </div>
      )}

      {/* ScrollSmoother wrapper - required for smooth scrolling functionality */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* Individual sections - each handles its own animations and content */}
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          {/* Grouped sections - wrapped together for coordinated animations */}
          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          {/* Footer section - separate as it typically has different scroll behavior */}
          <FooterSection />
        </div>
      </div>
    </main>
  );
};

export default App;
