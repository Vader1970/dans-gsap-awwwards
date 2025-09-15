import { useState, useEffect } from "react";

export const useFontsLoaded = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if document.fonts is available (modern browsers)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback for older browsers
      const checkFonts = () => {
        if (document.fonts && document.fonts.check) {
          // Check for the main fonts used in the project
          const antonioLoaded = document.fonts.check('1em "Antonio"');
          const proximaLoaded = document.fonts.check(
            '1em "ProximaNova, sans-serif"'
          );

          if (antonioLoaded && proximaLoaded) {
            setFontsLoaded(true);
          } else {
            setTimeout(checkFonts, 100);
          }
        } else {
          // If font checking is not available, wait a bit and assume loaded
          setTimeout(() => setFontsLoaded(true), 1000);
        }
      };

      checkFonts();
    }
  }, []);

  return fontsLoaded;
};
