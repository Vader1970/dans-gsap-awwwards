// Import GSAP animation library, React hooks, and constants
import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * FlavorSlider Component
 *
 * Creates a horizontal scrolling showcase of all 6 product flavors.
 * Features sophisticated scroll-triggered animations and responsive behavior.
 *
 * Features:
 * - Horizontal scroll animation (desktop only)
 * - Pinned section during scroll for immersive experience
 * - Title parallax effects synchronized with FlavorTitle
 * - Responsive design (disabled horizontal scroll on tablet/mobile)
 * - Dynamic scroll calculation based on content width
 *
 * Animation Coordination:
 * - Uses same trigger (".flavor-section") as FlavorTitle for synchronized effects
 * - Creates parallax movement of title elements during horizontal scroll
 * - Pins the entire section during scroll for extended interaction
 */
const FlavorSlider = () => {
  // Ref to access the slider container for scroll width calculations
  const sliderRef = useRef();

  // Media query to detect tablet/mobile devices
  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  // GSAP animation setup
  useGSAP(() => {
    // Calculate how much the slider needs to scroll horizontally
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    // Desktop-only horizontal scroll animation
    if (!isTablet) {
      // Create horizontal scroll timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section", // Same trigger as FlavorTitle for coordination
          start: "2% top", // Animation starts when section top is 2% from viewport top
          end: `+=${scrollAmount + 1500}px`, // Extend scroll distance by 1500px for smooth transition
          scrub: true, // Animation is tied to scroll position
          pin: true, // Pin the section during scroll for immersive effect
        },
      });

      // Move the entire section horizontally to create scroll effect
      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1500}px`, // Move left by calculated amount + buffer
        ease: "power1.inOut",
      });
    }

    // Create title parallax timeline (works on all devices)
    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section", // Same trigger as FlavorTitle for coordination
        start: "top top", // Animation starts when section top reaches viewport top
        end: "bottom 80%", // Animation ends when section bottom reaches 80% of viewport
        scrub: true, // Animation is tied to scroll position
      },
    });

    // Create parallax effect by moving title elements at different speeds
    titleTl
      .to(".first-text-split", {
        xPercent: -30, // Move "We have 6" left by 30%
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22, // Move "freaking" left by 22% (starts at same time as previous)
          ease: "power1.inOut",
        },
        "<" // Start at the same time as previous animation
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10, // Move "delicious flavors" left by 10% (starts at same time as previous)
          ease: "power1.inOut",
        },
        "<" // Start at the same time as previous animation
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {/* Map through flavor data to create individual flavor cards */}
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation}`}
          >
            {/* Background SVG with flavor-specific color */}
            <img
              src={`/images/${flavor.color}-bg.svg`}
              alt="flavor-bg"
              className="absolute bottom-0"
            />

            {/* Main product image (drink bottle) */}
            <img
              src={`/images/${flavor.color}-drink.webp`}
              alt="flavor-drink"
              className="drinks"
            />

            {/* Decorative elements (particles, effects) */}
            <img
              src={`/images/${flavor.color}-elements.webp`}
              alt="flavor-elements"
              className="elements"
            />

            {/* Flavor name text */}
            <h1>{flavor.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
