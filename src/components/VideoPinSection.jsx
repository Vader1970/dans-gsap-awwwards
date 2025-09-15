// Import GSAP animation library and React hooks
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

/**
 * VideoPinSection Component
 *
 * Creates a pinned video section with a circular clip-path reveal animation.
 * Features a video background with animated circular reveal effect and
 * decorative spinning elements. The animation is disabled on mobile for
 * performance and user experience reasons.
 *
 * Features:
 * - Pinned section during scroll for immersive experience
 * - Circular clip-path reveal animation (desktop only)
 * - Auto-playing video background
 * - Spinning decorative elements
 * - Play button overlay
 * - Responsive design (full circle on mobile, animated on desktop)
 *
 * Animation:
 * - Desktop: Starts as small circle (6%) and expands to full circle (100%)
 * - Mobile: Always shows full circle for better performance
 */
const VideoPinSection = () => {
  // Media query to detect mobile devices
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // GSAP animation setup (desktop only)
  useGSAP(() => {
    // Skip animation on mobile for better performance
    if (!isMobile) {
      // Create timeline for circular reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section", // Element that triggers the animation
          start: "-15% top", // Animation starts when section is 15% above viewport top
          end: "200% top", // Animation ends when user scrolls 200% of viewport height
          scrub: 1.5, // Smooth scrubbing tied to scroll position
          pin: true, // Pin the section during scroll for immersive effect
        },
      });

      // Animate circular clip-path expansion
      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)", // Expand from small circle to full circle
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section className="vd-pin-section">
      {/* Video container with responsive clip-path */}
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)" // Mobile: always show full circle
            : "circle(6% at 50% 50%)", // Desktop: start as small circle for animation
        }}
        className="size-full video-box"
      >
        {/* Background video - auto-playing and looping */}
        <video src="/videos/pin-video.mp4" playsInline muted loop autoPlay />

        {/* Overlay elements - spinning text and play button */}
        <div className="abs-center md:scale-100 scale-200">
          {/* Spinning circular text element */}
          <img src="/images/circle-text.svg" alt="" className="spin-circle" />

          {/* Play button overlay */}
          <div className="play-btn">
            <img
              src="/images/play.svg"
              alt=""
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
