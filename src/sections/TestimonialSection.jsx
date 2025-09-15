// Import React hooks, GSAP animation library, and constants
import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

/**
 * TestimonialSection Component
 *
 * Displays customer testimonial videos in an interactive, animated layout.
 * Features sophisticated scroll-triggered animations with different behaviors
 * for desktop and mobile devices. Videos play on hover (desktop) and are
 * arranged in a dynamic grid with parallax effects.
 *
 * Features:
 * - Responsive design with different animations for desktop/mobile
 * - Parallax title animations with staggered movement
 * - Pinned section with video card reveals (desktop)
 * - Hover-to-play video functionality
 * - Dynamic video card positioning and rotation
 * - Scroll-triggered animations with smooth scrubbing
 *
 * Desktop Behavior:
 * - Pinned section with parallax title movement
 * - Video cards slide up from below with stagger
 * - Videos play on hover, pause on mouse leave
 *
 * Mobile Behavior:
 * - Simplified animations without pinning
 * - Sequential card reveals based on scroll position
 * - Optimized for touch interaction
 */
const TestimonialSection = () => {
  // Ref array to store video element references for play/pause control
  const vdRef = useRef([]);

  // Media query to detect mobile devices
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // GSAP animation setup with responsive behavior
  useGSAP(() => {
    // Desktop: Apply negative margin to create overlap with previous section
    if (!isMobile) {
      gsap.set(".testimonials-section", {
        marginTop: "-140vh", // Creates dramatic overlap effect
      });
    } else {
      // Mobile: Set initial state for cards to be hidden below viewport
      gsap.set(".vd-card", {
        yPercent: 150, // Start 150% below final position
        opacity: 0, // Start invisible
      });
    }

    // Desktop: Complex parallax and pinning animations
    if (!isMobile) {
      // Create parallax timeline for title movement
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section", // Element that triggers the animation
          start: "top bottom", // Animation starts when section top reaches bottom of viewport
          end: "200% top", // Animation ends when user scrolls 200% of viewport height
          scrub: true, // Animation is tied to scroll position
        },
      });

      // Animate title elements with different movement speeds for parallax effect
      tl.to(".testimonials-section .first-title", {
        xPercent: 70, // Move "What's" right by 70%
      })
        .to(
          ".testimonials-section .sec-title",
          {
            xPercent: 25, // Move "Everyone" right by 25% (starts at same time as previous)
          },
          "<" // Start at the same time as previous animation
        )
        .to(
          ".testimonials-section .third-title",
          {
            xPercent: -50, // Move "Talking" left by 50% (starts at same time as previous)
          },
          "<" // Start at the same time as previous animation
        );

      // Create pinned timeline for video card reveals
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section", // Same trigger as parallax animation
          start: "10% top", // Animation starts when section top is 10% from viewport top
          end: "200% top", // Animation ends when user scrolls 200% of viewport height
          scrub: 1.5, // Smooth scrubbing with slight delay
          pin: true, // Pin the section during scroll for immersive effect
        },
      });

      // Animate video cards sliding up from below with stagger effect
      pinTl.from(".vd-card", {
        yPercent: 150, // Start 150% below final position
        stagger: 0.2, // 0.2s delay between each card
        ease: "power1.inOut",
      });
    } else {
      // Mobile: Simplified animations without pinning for better performance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section", // Element that triggers the animation
          start: "top 80%", // Animation starts when section top reaches 80% of viewport
          end: "bottom 20%", // Animation ends when section bottom reaches 20% of viewport
          scrub: 1, // Smooth scrubbing
        },
      });

      // Animate title elements with fade-in and movement
      tl.from(".testimonials-section .first-title", {
        xPercent: 70, // Start 70% to the right
        opacity: 0, // Start invisible
      })
        .from(
          ".testimonials-section .sec-title",
          {
            xPercent: 25, // Start 25% to the right
            opacity: 0, // Start invisible
          },
          "<" // Start at the same time as previous animation
        )
        .from(
          ".testimonials-section .third-title",
          {
            xPercent: -50, // Start 50% to the left
            opacity: 0, // Start invisible
          },
          "<" // Start at the same time as previous animation
        );

      // Mobile: Individual card animations with sequential scroll triggers
      cards.forEach((_, index) => {
        gsap.to(`.vd-card:nth-child(${index + 1})`, {
          yPercent: 0, // Move to final position
          opacity: 1, // Fade in
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".testimonials-section", // Same trigger for all cards
            start: `top ${80 - index * 10}%`, // Each card starts at different scroll position
            end: `top ${60 - index * 10}%`, // Each card ends at different scroll position
            scrub: 1, // Smooth scrubbing
          },
        });
      });
    }
  });

  // Video control functions for hover interaction
  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play(); // Play video on hover
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause(); // Pause video when hover ends
  };

  return (
    <section className="testimonials-section">
      {/* Title section with parallax animation */}
      <div className="absolute size-full flex flex-col items-center pt-[40vw] md:pt-[5vw]">
        <h1 className="text-black first-title">What's</h1>
        <h1 className="text-light-brown sec-title">Everyone</h1>
        <h1 className="text-black third-title">Talking</h1>
      </div>

      {/* Video cards container */}
      <div className="pin-box">
        {/* Map through testimonial video data to create individual cards */}
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`} // Apply dynamic positioning and rotation
            onMouseEnter={() => handlePlay(index)} // Play video on hover
            onMouseLeave={() => handlePause(index)} // Pause video when hover ends
          >
            {/* Testimonial video with auto-play settings */}
            <video
              ref={(el) => (vdRef.current[index] = el)} // Store reference for play/pause control
              src={card.src} // Video source from constants
              playsInline // Prevent fullscreen on mobile
              muted // Start muted for autoplay compatibility
              loop // Loop the video continuously
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
