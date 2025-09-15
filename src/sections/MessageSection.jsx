// Import GSAP animation library and React hooks
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useFontsLoaded } from "../hooks/useFontsLoaded";

/**
 * MessageSection Component
 *
 * A text-heavy section featuring animated messaging about the product.
 * Uses GSAP for sophisticated text animations including word-by-word reveals,
 * color transitions, and scroll-triggered effects.
 *
 * Features:
 * - Word-by-word text animations with staggered timing
 * - Scroll-triggered color transitions
 * - Clip-path reveal animations
 * - Paragraph text with rotation and slide effects
 * - Font loading optimization
 */
const MessageSection = () => {
  // Custom hook to check if fonts are loaded before starting animations
  const fontsLoaded = useFontsLoaded();

  // GSAP animation setup - runs when fonts are loaded
  useGSAP(() => {
    // Exit early if fonts aren't loaded yet to prevent layout shift
    if (!fontsLoaded) return;

    // Split text elements into individual words for animation
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words", // Split into individual words
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words", // Split into individual words
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines", // Split into both words and lines
      linesClass: "paragraph-line", // Add custom class to line elements
    });

    // Remove aria-label attributes added by SplitText for accessibility
    // SplitText automatically adds these but they can interfere with screen readers
    document.querySelectorAll(".message-content [aria-label]").forEach((el) => {
      el.removeAttribute("aria-label");
    });

    // Animate first message words: change color as user scrolls
    gsap.to(firstMsgSplit.words, {
      color: "#faeade", // Light cream color
      ease: "power1.in",
      stagger: 1, // 1 second delay between each word
      scrollTrigger: {
        trigger: ".message-content", // Element that triggers the animation
        start: "top center", // Animation starts when top of trigger reaches center of viewport
        end: "30% center", // Animation ends when trigger is 30% from center
        scrub: true, // Animation is tied to scroll position
      },
    });

    // Animate second message words: change color as user scrolls
    gsap.to(secMsgSplit.words, {
      color: "#faeade", // Light cream color
      ease: "power1.in",
      stagger: 1, // 1 second delay between each word
      scrollTrigger: {
        trigger: ".second-message", // Element that triggers the animation
        start: "top center", // Animation starts when top of trigger reaches center of viewport
        end: "bottom center", // Animation ends when bottom of trigger reaches center
        scrub: true, // Animation is tied to scroll position
      },
    });

    // Create timeline for "Fuel Up" text reveal animation
    const revealTl = gsap.timeline({
      delay: 1, // 1 second delay before starting
      scrollTrigger: {
        trigger: ".msg-text-scroll", // Element that triggers the animation
        start: "top 60%", // Animation starts when top of trigger reaches 60% of viewport
      },
    });

    // Animate clip-path to reveal the "Fuel Up" text from left to right
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveals full element
      ease: "circ.inOut",
    });

    // Create timeline for paragraph text animation
    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p", // Element that triggers the animation
        start: "top center", // Animation starts when top of trigger reaches center of viewport
      },
    });

    // Animate paragraph words: slide up from below with slight rotation
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300, // Start 300% below final position
      rotate: 3, // Start with 3 degree rotation
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01, // 0.01s delay between each word
    });
  }, [fontsLoaded]); // Re-run when fontsLoaded changes

  return (
    <section className="message-content">
      <div className="container mx-auto flex-center py-28 relative">
        <div className="w-full h-full">
          {/* Main message wrapper containing the animated text */}
          <div className="msg-wrapper">
            {/* First part of the message - animated with color transition */}
            <h1 className="first-message">Stir up your fearless past and</h1>

            {/* "Fuel Up" text with clip-path animation - starts hidden */}
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", // Creates a thin vertical line (hidden)
              }}
              className="msg-text-scroll"
            >
              <div className="bg-light-brown md:pb-5 pb-3 px-5">
                <h2 className="text-red-brown">Fuel Up</h2>
              </div>
            </div>

            {/* Second part of the message - animated with color transition */}
            <h1 className="second-message">
              your future with every gulp of Perfect Protein
            </h1>
          </div>

          {/* Paragraph section with slide-up animation */}
          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Rev up your rebel spirit and feed the adventure of life with
                SPYLT, where you're one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
