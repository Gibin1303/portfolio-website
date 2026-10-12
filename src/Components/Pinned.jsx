import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../styles/hero.css";
import { useStackedSlides } from "../hooks/gasp";
import Banner from "./Banner";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Employee Management System",
    text: "A streamlined HR and workforce platform designed to cut payroll processing and onboarding steps in half, built with an intuitive dashboard and cleaner role-based navigation.",
    role: "Developer",
    year: "2026",
    image: "/project1.png",
  },
  {
    title: "Chatting Application",
    text: "A real-time messaging platform designed for seamless instant communication, featuring multi-room channels, instant media sharing, and continuous socket-driven connectivity.",
    role: "Developer",
    year: "2026",
    image: "/project4.png",
  },
  {
    title: "Online Shopping Site",
    text: "An intuitive e-commerce platform designed to streamline product browsing and checkout, turning complex product catalogs into a seamless shopping experience.",
    role: "Developer",
    year: "2025",
    image: "/project3.png",
  },
  {
    title: "Study Abroad Education",
    text: "A comprehensive platform connecting students with global universities, featuring program comparisons, application tracking, and personalized guidance for overseas admission.",
    role: "Developer",
    year: "2025",
    image: "/project2.png",
  },
];

export default function Portfolio() {
  const root = useRef(null);

  useStackedSlides(root, {
    start: "top 55px",
    scrub: 0.8,
  });

  return (
    <section
      ref={root}
      id="works"
      className="w-full relative flex items-center justify-center"
    >
      {/* Centered card container (REMOVED 'contents' class to fix padding, centering, and horizontal scroll) */}
      <div
        className="grid relative contents w-full mt-23 max-w-5xl grid-cols-[1fr_1.15fr] items-center gap-[clamp(1rem,4vw,4rem)] overflow-hidden
                     bg-red-950 [clamp(1.5rem,4vw,4rem)] text-white rounded-2xl shadow-2xl
                     max-md:grid-cols-1 max-md:grid-rows-[auto_1fr] max-md:pt-12"
      >
     
     <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30  pointer-events-none">
         
       <h1
            data-title-wrapper
            className="font-[var(--font-syne)] text-4xl md:text-7xl font-extrabold uppercase tracking-tight text-luxury-gold drop-shadow-md"
          >
            My Projects
          </h1>
        </div>

        {/* LEFT: descriptions */}
        <div className="desc animate-text inline-block p-24 relative h-[min(50vh,460px)] max-md:h-[32vh] ">
          {projects.map((p) => (
            <article
              key={p.title}
              data-info
              className="absolute inset-0 flex flex-col justify-center gap-4 max-md:justify-start max-md:gap-3"
            >
              <h3 className="text-[clamp(2rem,4.5vw,4rem)] text-white font-bold leading-none tracking-tighter max-md:text-[1.8rem]">
                {p.title}
              </h3>
              <p className="max-w-[42ch] text-[clamp(0.95rem,1.2vw,1.1rem)] text-white dark:text-[#9b98b3]">
                {p.text}
              </p>

              {/* Role & Year Metadata */}
              <div className="flex max-w-[42ch] gap-6 border-t border-white/20 pt-3.5 text-sm dark:border-[#35324a]">
                <span className="text-white">
                  <b className="block text-xs font-normal text-white dark:text-[#9b98b3]">
                    Role
                  </b>
                  {p.role}
                </span>
                <span className="text-white">
                  <b className="block text-xs font-normal text-white dark:text-[#9b98b3]">
                    Year
                  </b>
                  {p.year}
                </span>
              </div>

              {/* Progress Bar — Placed directly below Role & Year */}
              <div className="mt-1 h-0.5 w-full max-w-[42ch] bg-black/20 dark:bg-[#35324a]">
                <i
                  data-bar
                  className="block h-full origin-left scale-x-0 bg-black dark:bg-[#efedf8]"
                />
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT: images */}
        <div className="relative h-[min(50vh,460px)] overflow-hidden rounded-xl max-md:order-first max-md:h-[38vh]">
          {projects.map((p) => (
            <div
              key={p.title}
              data-shot
              className="absolute inset-0 overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.title}
                className="block h-full w-full object-cover pointer-events-none select-none will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



