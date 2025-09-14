import { useRef } from "react";
import { cards } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const TestimonialSection = () => {
  const vdRef = useRef([]);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    // Only apply negative margin on desktop
    if (!isMobile) {
      gsap.set(".testimonials-section", {
        marginTop: "-140vh",
      });
    } else {
      // Mobile: Set initial state for cards to be hidden
      gsap.set(".vd-card", {
        yPercent: 150,
        opacity: 0,
      });
    }

    // Desktop: parallax effect with pinning
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      });

      tl.to(".testimonials-section .first-title", {
        xPercent: 70,
      })
        .to(
          ".testimonials-section .sec-title",
          {
            xPercent: 25,
          },
          "<"
        )
        .to(
          ".testimonials-section .third-title",
          {
            xPercent: -50,
          },
          "<"
        );

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      pinTl.from(".vd-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    } else {
      // Mobile: simple scroll animations without pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      tl.from(".testimonials-section .first-title", {
        xPercent: 70,
        opacity: 0,
      })
        .from(
          ".testimonials-section .sec-title",
          {
            xPercent: 25,
            opacity: 0,
          },
          "<"
        )
        .from(
          ".testimonials-section .third-title",
          {
            xPercent: -50,
            opacity: 0,
          },
          "<"
        );

      // Mobile: individual card animations with sequential scroll triggers
      cards.forEach((_, index) => {
        gsap.to(`.vd-card:nth-child(${index + 1})`, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".testimonials-section",
            start: `top ${80 - index * 10}%`, // Each card starts at different scroll positions
            end: `top ${60 - index * 10}%`, // Each card ends at different scroll positions
            scrub: 1,
          },
        });
      });
    }
  });

  const handlePlay = (index) => {
    const video = vdRef.current[index];
    video.play();
  };

  const handlePause = (index) => {
    const video = vdRef.current[index];
    video.pause();
  };

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center md:pt-[5vw] pt-[24vw]">
        <h1 className="text-black first-title">What's</h1>
        <h1 className="text-light-brown sec-title">Everyone</h1>
        <h1 className="text-black third-title">Talking</h1>
      </div>

      <div className="pin-box">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`vd-card ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            <video
              ref={(el) => (vdRef.current[index] = el)}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
