// Import GSAP animation library and child components
import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

/**
 * BenefitSection Component
 *
 * Displays the key benefits of the SPYLT product using animated ClipPathTitle
 * components and a pinned video section. Features a sequential reveal animation
 * for each benefit title as the user scrolls.
 *
 * Features:
 * - Sequential clip-path reveal animations for 4 benefit titles
 * - Reusable ClipPathTitle components with custom styling
 * - Pinned video section for immersive experience
 * - Scroll-triggered animations with smooth scrubbing
 * - Responsive design considerations
 *
 * Benefits Showcased:
 * 1. "Shelf stable" - Product longevity benefit
 * 2. "Protein + Caffeine" - Nutritional benefits
 * 3. "Infinitely recyclable" - Environmental benefit
 * 4. "Lactose free" - Dietary benefit
 */
const BenefitSection = () => {
  // GSAP animation setup for sequential title reveals
  useGSAP(() => {
    // Create timeline for sequential benefit title reveals
    const revealTl = gsap.timeline({
      delay: 1, // 1 second delay before starting animations
      scrollTrigger: {
        trigger: ".benefit-section", // Element that triggers the animation
        start: "top 60%", // Animation starts when section top reaches 60% of viewport
        end: "top top", // Animation ends when section top reaches top of viewport
        scrub: 1.5, // Smooth scrubbing tied to scroll position
      },
    });

    // Sequential reveal of each benefit title with clip-path animation
    revealTl
      // Reveal first benefit: "Shelf stable"
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1, // Fade in
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)", // Reveals full element
        ease: "circ.out",
      })
      // Reveal second benefit: "Protein + Caffeine"
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1, // Fade in
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)", // Reveals full element
        ease: "circ.out",
      })
      // Reveal third benefit: "Infinitely recyclable"
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1, // Fade in
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)", // Reveals full element
        ease: "circ.out",
      })
      // Reveal fourth benefit: "Lactose free"
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1, // Fade in
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)", // Reveals full element
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          {/* Section introduction text */}
          <p>
            Unlock the Advantages: <br />
            Explore the Key Benefits of Choosing SPYLT
          </p>

          {/* Benefits showcase using ClipPathTitle components */}
          <div className="mt-20 col-center">
            {/* Benefit 1: Shelf stability */}
            <ClipPathTitle
              title={"Shelf stable"}
              color={"#faeade"} // Light cream text
              bg={"#c88e64"} // Brown background
              className={"first-title"} // Animation class
              borderColor={"#222123"} // Dark border
            />

            {/* Benefit 2: Nutritional content */}
            <ClipPathTitle
              title={"Protein + Caffeine"}
              color={"#222123"} // Dark text
              bg={"#faeade"} // Light cream background
              className={"second-title"} // Animation class
              borderColor={"#222123"} // Dark border
            />

            {/* Benefit 3: Environmental sustainability */}
            <ClipPathTitle
              title={"Infinitely recyclable"}
              color={"#faeade"} // Light cream text
              bg={"#7F3B2D"} // Dark red background
              className={"third-title"} // Animation class
              borderColor={"#222123"} // Dark border
            />

            {/* Benefit 4: Dietary accommodation */}
            <ClipPathTitle
              title={"Lactose free"}
              color={"#2E2D2F"} // Dark text
              bg={"#FED775"} // Yellow background
              className={"fourth-title"} // Animation class
              borderColor={"#222123"} // Dark border
            />
          </div>

          {/* Additional benefits teaser */}
          <div className="md:mt-0 mt-10">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      {/* Pinned video section overlay */}
      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
