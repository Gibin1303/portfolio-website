import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParticles } from "../hooks/useParticles";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Conscious Technologies",
    role: "Full-Stack Developer",
    period: "2025 — 2026",
    location: "Remote",
    description:
      "Architected and maintained scalable MERN stack web applications. Reduced API response latency by 35% using Redis caching and optimized MongoDB database indexing.",
    skills: ["React", "Node.js", "Express", "Postgress Sql", "Tailwind CSS"],
  },
  {
    company: "Aventus Informatics",
    role: "Junior Frontend Developer",
    period: "2024 — 2025",
    location: "Thrissur, Kerala",
    description:
      "Developed and maintained high-performance Next.js applications utilizing custom hooks, context API, and optimized component rendering. Integrated RESTful APIs, ensured cross-browser responsiveness with Tailwind CSS, and improved core web vitals and overall page load speeds.",
    skills: [
      "Next.js",
      "Api Integration",
      "Optimization",
      "React Query",
      "Material UI",
    ],
  },
  {
    company: "Luminar Technolab",
    role: "Fullstack Developer Intern",
    period: "2023 — 2024",
    location: "Kochi, Kerala",
    description:
      "Developed responsive client websites and customized e-commerce storefronts. Integrated third-party payment gateways and Web3Forms contact services.",
    skills: [
      "React.JS",
      "Angular.Js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST APIs",
      "Tailwind Css",
      "Bootstrap",
      "Node.js",
      "Express.js",
      "MongoDb",
    ],
  },
];

export default function WorkExperience() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useParticles(canvasRef);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".experience-card");

      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-950 py-24 px-6 md:px-12 lg:px-24 text-slate-100 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-sm uppercase tracking-widest text-indigo-400 font-semibold mb-2">
            Career Journey
          </h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Work Experience
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card relative group">
              {/* Timeline Node Icon */}
              <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-950 group-hover:scale-125 group-hover:bg-indigo-400 transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />

              {/* Experience Card */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-indigo-500/40 transition-colors duration-300 shadow-xl">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-base text-slate-400 font-medium">
                      {exp.company} <span className="text-slate-600">•</span>{" "}
                      <span className="text-xs text-slate-500">
                        {exp.location}
                      </span>
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 w-max">
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 text-xs font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:border-indigo-400/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
