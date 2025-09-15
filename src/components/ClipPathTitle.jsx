/**
 * ClipPathTitle Component
 *
 * A reusable component for creating animated titles with clip-path reveal effects.
 * This component is designed to work with GSAP animations and provides a consistent
 * structure for text that needs to be revealed using clip-path animations.
 *
 * Features:
 * - Customizable colors for text, background, and border
 * - Responsive padding and sizing
 * - Clip-path ready for GSAP animations
 * - Initially hidden (opacity-0) for animation control
 * - Flexible styling through className prop
 *
 * Props:
 * @param {string} title - The text content to display
 * @param {string} color - Text color (CSS color value)
 * @param {string} bg - Background color (CSS color value)
 * @param {string} className - Additional CSS classes to apply
 * @param {string} borderColor - Border color (CSS color value)
 *
 * Usage:
 * This component is typically used with GSAP animations that modify the clipPath
 * style property to create reveal effects. The initial clipPath creates a thin
 * vertical line that can be expanded to reveal the full text.
 */
const ClipPathTitle = ({ title, color, bg, className, borderColor }) => {
  return (
    <div className="general-title">
      {/* Main container with clip-path and border styling */}
      <div
        style={{
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // Creates a thin vertical line (hidden)
          borderColor: borderColor, // Dynamic border color
        }}
        className={`${className} border-[.5vw] text-nowrap opacity-0`} // Initially hidden for animation
      >
        {/* Inner content container with background color */}
        <div
          className="pb-5 md:px-14 px-3 md:pt-0 pt-3" // Responsive padding
          style={{
            backgroundColor: bg, // Dynamic background color
          }}
        >
          {/* Title text with dynamic color */}
          <h2
            style={{
              color: color, // Dynamic text color
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ClipPathTitle;
