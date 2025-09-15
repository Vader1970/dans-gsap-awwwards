// Import child components for the flavor section
import FlavorTitle from "../components/FlavorTitle";
import FlavorSlider from "../components/FlavorSlider";

/**
 * FlavorSection Component
 *
 * The main container for the flavor showcase section. This section displays
 * the product's 6 different flavors with animated text and a horizontal
 * scrolling slider. It combines two child components:
 *
 * - FlavorTitle: Animated text revealing "We have 6 freaking delicious flavors"
 * - FlavorSlider: Horizontal scrolling showcase of all 6 flavor variants
 *
 * Layout:
 * - Desktop: Side-by-side layout (57% title, 43% slider)
 * - Mobile/Tablet: Stacked layout (title on top, slider below)
 *
 * Animation Coordination:
 * - Both components use the same trigger (".flavor-section") for synchronized animations
 * - FlavorTitle handles text reveal animations
 * - FlavorSlider handles horizontal scroll and title parallax effects
 */
const FlavorSection = () => {
  return (
    <section className="flavor-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        {/* Title section - takes up 57% width on desktop, full width on mobile */}
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>

        {/* Slider section - takes up remaining space on desktop, full width on mobile */}
        <div className="h-full">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
