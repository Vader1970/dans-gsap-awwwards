// Import GSAP animation library and React hooks
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useFontsLoaded } from "../hooks/useFontsLoaded";

/**
 * FlavorTitle Component
 *
 * Displays the animated title text "We have 6 freaking delicious flavors"
 * with sophisticated character-by-character animations and clip-path reveals.
 *
 * Animation Sequence:
 * 1. "We have 6" - slides up from below with character stagger
 * 2. "freaking" - revealed using clip-path animation in a brown background box
 * 3. "delicious flavors" - slides up from below with character stagger
 *
 * Features:
 * - Character-by-character text animations using SplitText
 * - Clip-path reveal for the "freaking" text
 * - Scroll-triggered animations synchronized with FlavorSlider
 * - Font loading optimization
 * - Responsive spacing and typography
 */
const FlavorTitle = () => {
  // Custom hook to check if fonts are loaded before starting animations
  const fontsLoaded = useFontsLoaded();

  // GSAP animation setup - runs when fonts are loaded
  useGSAP(() => {
    // Exit early if fonts aren't loaded yet to prevent layout shift
    if (!fontsLoaded) return;

    // Split text elements into individual characters for animation
    const firstTextSplit = SplitText.create(".first-text-split h1", {
      type: "chars", // Split "We have 6" into individual characters
    });
    const secondTextSplit = SplitText.create(".second-text-split h1", {
      type: "chars", // Split "delicious flavors" into individual characters
    });

    // Animate first part of title: "We have 6" slides up from below
    gsap.from(firstTextSplit.chars, {
      yPercent: 200, // Start 200% below final position
      stagger: 0.02, // 0.02s delay between each character
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section", // Same trigger as FlavorSlider for coordination
        start: "top 30%", // Animation starts when section top reaches 30% of viewport
      },
    });

    // Animate "freaking" text reveal using clip-path
    gsap.to(".flavor-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveals full element
      scrollTrigger: {
        trigger: ".flavor-section", // Same trigger as FlavorSlider for coordination
        start: "top 10%", // Animation starts when section top reaches 10% of viewport
      },
    });

    // Animate second part of title: "delicious flavors" slides up from below
    gsap.from(secondTextSplit.chars, {
      yPercent: 200, // Start 200% below final position
      stagger: 0.02, // 0.02s delay between each character
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section", // Same trigger as FlavorSlider for coordination
        start: "top 1%", // Animation starts when section top reaches 1% of viewport
      },
    });
  }, [fontsLoaded]); // Re-run when fontsLoaded changes

  return (
    <div className="general-title col-center h-full 2xl:gap-32 xl:gap-24 gap-16">
      {/* First part of title: "We have 6" with overflow hidden for slide animation */}
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1>We have 6</h1>
      </div>

      {/* "freaking" text with clip-path animation - starts hidden */}
      <div
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // Creates a thin vertical line (hidden)
        }}
        className="flavor-text-scroll"
      >
        <div className="bg-mid-brown pb-5 2xl:pt-0 pt-3 2xl:px-5 px-3">
          <h2 className="text-milk">freaking</h2>
        </div>
      </div>

      {/* Second part of title: "delicious flavors" with overflow hidden for slide animation */}
      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1>delicious flavors</h1>
      </div>
    </div>
  );
};

export default FlavorTitle;
