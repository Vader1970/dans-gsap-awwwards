// Import GSAP animation library and React hooks
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useFontsLoaded } from "../hooks/useFontsLoaded";

/**
 * HeroSection Component
 *
 * The main hero section of the website featuring animated text and background media.
 * Uses GSAP for smooth animations and responsive design for different screen sizes.
 *
 * Features:
 * - Animated text reveal with character-by-character animation
 * - Responsive background (video on desktop, images on mobile/tablet)
 * - Scroll-triggered parallax effects
 * - Font loading optimization
 */
const HeroSection = () => {
  // Media queries for responsive design
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  // Custom hook to check if fonts are loaded before starting animations
  const fontsLoaded = useFontsLoaded();

  // GSAP animation setup - runs when fonts are loaded
  useGSAP(() => {
    // Exit early if fonts aren't loaded yet to prevent layout shift
    if (!fontsLoaded) return;

    // Split the hero title into individual characters for animation
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    // Create main animation timeline with 1 second delay
    const tl = gsap.timeline({
      delay: 1,
    });

    // Animate hero content fade-in and slide-up
    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      // Animate subtitle reveal using clip-path (starts 0.5s before previous animation ends)
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveals text from center outward
          ease: "circ.out",
        },
        "-=0.5"
      )
      // Animate each character of the title sliding up with stagger effect
      .from(
        titleSplit.chars,
        {
          yPercent: 200, // Start 200% below final position
          stagger: 0.02, // 0.02s delay between each character
          ease: "power2.out",
        },
        "-=0.5" // Start 0.5s before previous animation ends
      );

    // Create scroll-triggered parallax effect timeline
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container", // Element that triggers the animation
        start: "1% top", // Animation starts when top of trigger is 1% from top of viewport
        end: "bottom top", // Animation ends when bottom of trigger reaches top of viewport
        scrub: true, // Animation is tied to scroll position
      },
    });

    // Apply parallax effect: rotate, scale down, and move up as user scrolls
    heroTl.to(".hero-container", {
      rotate: 7, // Rotate 7 degrees
      scale: 0.9, // Scale down to 90%
      yPercent: 30, // Move up 30% of element height
      ease: "power1.inOut",
    });
  }, [fontsLoaded]); // Re-run when fontsLoaded changes

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {/* Responsive background media */}
        {isTablet ? (
          // For tablet and mobile: use static images instead of video for better performance
          <>
            {/* Additional background image for mobile only */}
            {isMobile && (
              <img
                src="/images/hero-bg.png"
                className="absolute bottom-40 size-full object-cover"
                alt="Background image of Spylt drinks"
              />
            )}
            {/* Main product image - centered and responsive */}
            <img
              src="/images/hero-img.png"
              srcSet="/images/hero-img.png 1x, /images/hero-img.png 2x"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-contain object-bottom"
              alt="Spylt drinks"
              style={{
                maxHeight: "80vh", // Limit height to 80% of viewport
                width: "auto",
                height: "auto",
                maxWidth: "100vw", // Never exceed viewport width
              }}
            />
          </>
        ) : (
          // For desktop: use video background for dynamic effect
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Hero content container - initially hidden (opacity-0) for animation */}
        <div className="hero-content opacity-0">
          {/* Main title with overflow hidden for animation effect */}
          <div className="overflow-hidden">
            <h1 className="hero-title text-center">Freaking Delicious</h1>
          </div>

          {/* Subtitle with clip-path animation - starts as a thin line */}
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // Creates a thin vertical line
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Protein + Caffine </h1>
            </div>
          </div>

          {/* Main description text */}
          <h2>
            Live life to the fullest with SPYLT: Shatter boredom and embrace
            your inner kid with every deliciously smooth chug.
          </h2>

          {/* Call-to-action button */}
          <div className="hero-button">
            <p>Chug a SPYLT</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
