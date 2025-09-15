// Import media query hook for responsive design
import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  // Detect mobile devices for responsive content switching
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      {/* Decorative dip image at the top of footer - creates visual transition */}
      <img
        src="/images/footer-dip.png"
        alt=""
        className="w-full object-cover -translate-y-1"
      />

      {/* Main footer content container with responsive height and padding */}
      <div className="2xl:h-[110dvh] relative md:pt-[20vh] pt-[10vh]">
        {/* Brand tagline section with overflow hidden for potential animations */}
        <div className="overflow-hidden z-10">
          <h1 className="general-title text-center text-milk py-5">
            #CHUGRESPONSIBLY
          </h1>
        </div>

        {/* Conditional rendering based on device type */}
        {isMobile ? (
          // Mobile: Static image for better performance and data usage
          <img
            src="/images/footer-drink.png"
            className="absolute top-0 object-contain"
            alt="Spylt drink"
          />
        ) : (
          // Desktop: Animated video with blend mode for visual effect
          <video
            src="/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten"
          />
        )}

        {/* Social media links section */}
        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <img src="./images/yt.svg" alt="YouTube" />
          </div>
          <div className="social-btn">
            <img src="./images/insta.svg" alt="Instagram" />
          </div>
          <div className="social-btn">
            <img src="./images/tiktok.svg" alt="TikTok" />
          </div>
        </div>

        {/* Main footer content with navigation links and newsletter signup */}
        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
          {/* Left side: Navigation links organized in columns */}
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>SPYLT Flavors</p>
            </div>
            <div>
              <p>Chug Club</p>
              <p>Student Marketing</p>
              <p>Dairy Dealers</p>
            </div>
            <div>
              <p>Company</p>
              <p>Contacts</p>
              <p>Tasty Talk</p>
            </div>
          </div>

          {/* Right side: Newsletter signup section */}
          <div className="md:max-w-lg">
            <p>
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>
            {/* Email input with styled border and arrow icon */}
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans placeholder:text-[#999999]"
              />
              <img src="/images/arrow.svg" alt="Submit arrow" />
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal links section */}
        <div className="copyright-box">
          <p>Copyright © 2025 Spylt - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
