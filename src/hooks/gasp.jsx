import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable hook for pinned stacked-slide scroll animations using GSAP & ScrollTrigger.
 *
 * @param {React.RefObject} targetRef - Reference to the outer container element.
 * @param {Object} [options] - Optional custom settings and selector overrides.
 */
export function useStackedSlides(targetRef, options = {}) {
  const {
    infoSelector = "[data-info]",
    shotSelector = "[data-shot]",
    marqueeSelector = "[data-marquee]",
    titleWrapperSelector = "[data-title-wrapper]",
    animateTextSelector = ".animate-text",
    progressBarSelector = "[data-bar]",
    start = "top top",
    scrub = 0.8,
  } = options;

  useGSAP(
    () => {
      if (!targetRef.current) return;

      const infos = gsap.utils.toArray(infoSelector);
      const shots = gsap.utils.toArray(shotSelector);
      const n = infos.length;

      if (!n) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // 1. Layer stack & clipPath setup
      shots.forEach((shot, i) => {
        gsap.set(shot, { zIndex: i });
        if (i > 0) gsap.set(shot, { clipPath: "inset(100% 0% 0% 0%)" });
      });

      // 2. Initial text state setups
      gsap.set(infos[0], { autoAlpha: 1, y: 0 });
      gsap.set(infos.slice(1), { autoAlpha: 0, y: 40 });

      // Continuous running marquee
      if (targetRef.current.querySelector(marqueeSelector)) {
        gsap.to(marqueeSelector, {
          xPercent: -50,
          repeat: -1,
          duration: 15,
          ease: "none",
        });
      }

      // 3. Main pinned scroll timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
        scrollTrigger: {
          trigger: targetRef.current,
          start,
          end: () => `+=${(n - 1) * window.innerHeight * 2}`,
          pin: true,
          pinSpacing: true,
          scrub: reduce ? true : scrub,
          snap: {
            snapTo: 1 / (n - 1),
            duration: 0.4,
            ease: "power1.inOut",
          },

          invalidateOnRefresh: true,
        },
      });

      // Initial header/title transitions (Position 0)
      if (targetRef.current.querySelector(titleWrapperSelector)) {
        tl.to(
          titleWrapperSelector,
          { y: "-30vh", scale: 0.6, opacity: 0.8, duration: 0.8 },
          0,
        );
      }

      const textElements =
        targetRef.current.querySelectorAll(animateTextSelector);
      if (textElements.length) {
        tl.from(
          textElements,
          {
            autoAlpha: 0.5,
            x: -50,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.05,
            force3D: true,
          },
          0,
        );
      }

      // 4. Sequence slide transitions
      for (let i = 1; i < n; i++) {
        const prevInfo = infos[i - 1];
        const currentInfo = infos[i];
        const currentShot = shots[i];
        const img = currentShot.querySelector("img");
        const position = i - 1;

        tl.to(prevInfo, { autoAlpha: 0, y: -40 }, position)
          .to(currentInfo, { autoAlpha: 1, y: 0 }, position)
          .to(currentShot, { clipPath: "inset(0% 0% 0% 0%)" }, position);

        if (img) {
          tl.fromTo(img, { scale: 1.25 }, { scale: 1 }, position);
        }
      }

      // 5. Progress bar track
      if (targetRef.current.querySelector(progressBarSelector)) {
        tl.to(
          progressBarSelector,
          { scaleX: 1, ease: "none", duration: n - 1 },
          0,
        );
      }
    },
    {
      scope: targetRef,
      dependencies: [infoSelector, shotSelector, start, scrub],
    },
  );
}
