// Import React hooks, GSAP animation library, and constants
import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useFontsLoaded } from "../hooks/useFontsLoaded";

/**
 * NutritionSection Component
 *
 * Displays nutritional information about the product with animated text and
 * a responsive nutrient list. Features sophisticated GSAP animations and
 * adaptive content based on screen size.
 *
 * Features:
 * - Animated title text "It still does Body Good" with character-by-character reveals
 * - Clip-path reveal animation for "Body Good" text
 * - Responsive nutrient list (shows 3 items on mobile, all on desktop)
 * - Background images for visual appeal
 * - Font loading optimization
 * - Accessibility improvements (removes problematic aria-labels)
 *
 * Layout:
 * - Desktop: Three-column layout (title, description, nutrient list)
 * - Mobile: Stacked layout with reduced nutrient items
 */
const NutritionSection = () => {
  // Media query to detect mobile devices
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // State to manage nutrient list (responsive based on screen size)
  const [lists, setLists] = useState(nutrientLists);

  // Custom hook to check if fonts are loaded before starting animations
  const fontsLoaded = useFontsLoaded();

  // Effect to adjust nutrient list based on screen size
  useEffect(() => {
    if (isMobile) {
      // On mobile: show only first 3 nutrients to save space
      setLists(nutrientLists.slice(0, 3));
    } else {
      // On desktop: show all nutrients
      setLists(nutrientLists);
    }
  }, [isMobile]);

  // GSAP animation setup - runs when fonts are loaded or screen size changes
  useGSAP(() => {
    // Exit early if fonts aren't loaded yet to prevent layout shift
    if (!fontsLoaded) return;

    // Split text elements for animation
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars", // Split "It still does" into individual characters
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines", // Split paragraph into both words and lines
      linesClass: "paragraph-line", // Add custom class to line elements
    });

    // Remove aria-label attributes added by SplitText for accessibility
    // SplitText automatically adds these but they can interfere with screen readers
    document
      .querySelectorAll(".nutrition-section [aria-label]")
      .forEach((el) => {
        el.removeAttribute("aria-label");
      });

    // Create main content animation timeline
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section", // Element that triggers the animation
        start: "top center", // Animation starts when section top reaches center of viewport
      },
    });

    // Animate title characters sliding up from below
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100, // Start 100% below final position
        stagger: 0.02, // 0.02s delay between each character
        ease: "power2.out",
      })
      // Animate paragraph words sliding up with slight rotation
      .from(paragraphSplit.words, {
        yPercent: 300, // Start 300% below final position
        rotate: 3, // Start with 3 degree rotation
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01, // 0.01s delay between each word
      });

    // Create separate timeline for "Body Good" text reveal
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section", // Same trigger as content animation
        start: "top 80%", // Animation starts when section top reaches 80% of viewport
      },
    });

    // Animate "Body Good" text reveal using clip-path and opacity
    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1, // Fade in
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)", // Reveals full element
      ease: "power1.inOut",
    });
  }, [fontsLoaded, isMobile]); // Re-run when fonts load or screen size changes

  return (
    <section className="nutrition-section">
      {/* Top decorative image */}
      <img
        src="/images/slider-dip.png"
        alt="slider-dip"
        className="w-full object-cover"
      />

      {/* Background image for visual appeal */}
      <img
        src="/images/big-img.png"
        alt="slider-dip background"
        className="big-img"
      />

      {/* Main content container with responsive layout */}
      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-0">
        {/* Title section - "It still does Body Good" */}
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            {/* First part of title: "It still does" with overflow hidden for slide animation */}
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">It still does</h1>
            </div>

            {/* "Body Good" text with clip-path animation - starts hidden */}
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // Creates a thin vertical line (hidden)
              }}
              className="nutrition-text-scroll place-self-start"
            >
              <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                <h2 className="text-milk-yellow">Body Good</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Description section - nutritional information text */}
        <div className="flex md:justify-center items-center translate-y-5">
          <div className="md:max-w-xs max-w-md">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Milk contains a wide array of nutrients, including vitamins,
              minerals, and protein, and this is lactose free
            </p>
          </div>
        </div>

        {/* Nutrition facts box - displays nutrient amounts */}
        <div className="nutrition-box">
          <div className="list-wrapper">
            {/* Map through nutrient data to create individual nutrient items */}
            {lists.map((nutrient, index) => (
              <div key={index} className="relative flex-1 col-center">
                <div>
                  {/* Nutrient label (e.g., "Protein", "Calcium") */}
                  <p className="md:text-lg text-sm font-paragraph">
                    {nutrient.label}
                  </p>
                  <p className="font-paragraph text-sm mt-2">up to</p>
                  {/* Nutrient amount (e.g., "25g", "30%") */}
                  <p className="text-2xl md:text-3xl tracking-tighter font-bold">
                    {nutrient.amount}
                  </p>
                </div>

                {/* Separator border between nutrients (except for last item) */}
                {index !== lists.length - 1 && (
                  <div className="spacer-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
