// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

/**
 * Custom hook to detect when web fonts are fully loaded
 *
 * This hook prevents layout shift and ensures smooth animations by waiting
 * for fonts to load before triggering GSAP animations. It uses multiple
 * detection methods for cross-browser compatibility.
 *
 * @returns {boolean} - True when fonts are loaded, false otherwise
 *
 * Features:
 * - Uses modern Font Loading API when available
 * - Fallback font checking for older browsers
 * - Specific font detection for project fonts (Antonio, ProximaNova)
 * - Graceful degradation with timeout fallback
 */
export const useFontsLoaded = () => {
  // State to track whether fonts have finished loading
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Effect runs once on component mount to check font loading status
  useEffect(() => {
    // Modern browsers: Use Font Loading API for reliable font detection
    if (document.fonts && document.fonts.ready) {
      // document.fonts.ready is a Promise that resolves when all fonts are loaded
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback for older browsers that don't support Font Loading API
      const checkFonts = () => {
        // Check if document.fonts.check is available (partial Font Loading API support)
        if (document.fonts && document.fonts.check) {
          // Check for the main fonts used in this project
          const antonioLoaded = document.fonts.check('1em "Antonio"');
          const proximaLoaded = document.fonts.check(
            '1em "ProximaNova, sans-serif"'
          );

          // If both fonts are loaded, update state
          if (antonioLoaded && proximaLoaded) {
            setFontsLoaded(true);
          } else {
            // If fonts aren't ready yet, check again in 100ms
            setTimeout(checkFonts, 100);
          }
        } else {
          // If no font checking is available, wait 1 second and assume fonts are loaded
          // This prevents infinite waiting on very old browsers
          setTimeout(() => setFontsLoaded(true), 1000);
        }
      };

      // Start the font checking process
      checkFonts();
    }
  }, []); // Empty dependency array - only run once on mount

  // Return the current font loading status
  return fontsLoaded;
};
