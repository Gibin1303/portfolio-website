// import React from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import "../styles/hero.css";

// const Banner = ({
//   text = "hello",
//   technologies = [],
//   skills = "",
//   isTrue = false,
// }) => {
//   const mouseX = useMotionValue(300);
//   const mouseY = useMotionValue(60);

//   const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
//   const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

//   const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
//     const { left, top } = currentTarget.getBoundingClientRect();
//     mouseX.set(clientX - left);
//     mouseY.set(clientY - top);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(600);
//     mouseY.set(72);
//   };

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.03,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { y: "130%", opacity: 0, filter: "blur(12px)" },
//     visible: {
//       y: "0%",
//       opacity: 1,
//       filter: "blur(0px)",
//       transition: {
//         duration: 0.9,
//         ease: [0.16, 1, 0.3, 1],
//       },
//     },
//   };

//   const particles = Array.from({ length: 10 });

//   return (
//     <div
//       className={`w-full bg-luxury-dark overflow-hidden relative [perspective:1000px] ${isTrue ? "py-4" : ""}`}
//     >
//       <div className="hero-banner w-full max-w-7xl mx-auto px-2 sm:px-4">
//         <motion.div
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           className={`banner-inner bg-slate-950  rounded-2xl w-full  flex flex-col items-center justify-center relative overflow-hidden border border-white/10 shadow-2xl group cursor-default select-none transition-shadow duration-300 hover:shadow-cyan-500/10 ${
//             isTrue
//               ? "px-6 sm:px-10 py-10 min-h-[300px]"
//               : "px-6 py-10 sm:py-12 min-h-[100px]"
//           }`}
//         >
//           {/* Shimmer Border Beam */}
//           <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none bg-gradient-to-r from-amber-500/0 via-cyan-500/40 to-purple-600/0 animate-shimmer" />

//           {/* Mouse Spotlight Radial Glow */}
//           <motion.div
//             style={{
//               left: useTransform(smoothX, (x) => `${x}px`),
//               top: useTransform(smoothY, (y) => `${y}px`),
//             }}
//             className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 bg-gradient-to-r from-amber-500/20 via-purple-600/20 to-cyan-500/20 blur-3xl rounded-full pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
//           />

//           {/* Floating Background Orbs */}
//           <motion.div
//             animate={{
//               scale: [1, 1.25, 1],
//               x: ["-10%", "10%", "-10%"],
//               y: ["-8%", "8%", "-8%"],
//             }}
//             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -top-10 -left-10 w-40 h-40 sm:w-64 sm:h-64 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"
//           />
//           <motion.div
//             animate={{
//               scale: [1.25, 1, 1.25],
//               x: ["10%", "-10%", "10%"],
//               y: ["8%", "-8%", "8%"],
//             }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 bg-amber-500/20 blur-3xl rounded-full pointer-events-none"
//           />

//           {/* Floating Particle Embers */}
//           <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
//             {particles.map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 rounded-full bg-cyan-300/70 blur-[0.5px]"
//                 initial={{
//                   left: `${(i + 1) * 9}%`,
//                   bottom: "-10%",
//                 }}
//                 animate={{
//                   y: [-10, -110],
//                   x: [0, i % 2 === 0 ? 15 : -15, 0],
//                   opacity: [0, 0.8, 0],
//                   scale: [0.5, 1.3, 0.2],
//                 }}
//                 transition={{
//                   duration: 4 + (i % 3),
//                   repeat: Infinity,
//                   ease: "easeInOut",
//                   delay: i * 0.35,
//                 }}
//               />
//             ))}
//           </div>

//           {/* Shimmer Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer pointer-events-none z-10" />

//           {/* Sub-Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="z-20 mb-4 flex items-center gap-2"
//           >
//             <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
//             <span className="text-xs font-mono uppercase tracking-widest text-amber-200/70 font-medium">
//               Creative Engineering
//             </span>
//           </motion.div>

//           {/* Animated Typography */}
//           {text && (
//             <div className="z-20 flex justify-center overflow-hidden px-2 mb-6">
//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="flex justify-center tracking-[0.15em]"
//               >
//                 {text.split("").map((char, index) => (
//                   <div
//                     key={index}
//                     className="overflow-hidden py-1 inline-block"
//                   >
//                     <motion.div variants={letterVariants}>
//                       <motion.span
//                         animate={{ y: [-2, 2, -2] }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                           delay: 1.0 + index * 0.08,
//                         }}
//                         whileHover={{
//                           y: -6,
//                           scale: 1.15,
//                           color: "#fbbf24",
//                           textShadow: "0px 0px 20px rgba(251, 191, 36, 0.8)",
//                         }}
//                         className="inline-block font-mono font-black text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 transition-colors duration-200"
//                       >
//                         {char === " " ? "\u00A0" : char}
//                       </motion.span>
//                     </motion.div>
//                   </div>
//                 ))}
//               </motion.div>
//             </div>
//           )}

//           {/* Technologies Grid */}
//           {technologies.length > 0 && (
//             <div className="z-20 mt-6 w-full px-4 flex flex-col items-center">
//               {skills && (
//                 <h3 className="text-xl md:text-3xl text-center font-extrabold mb-8 text-luxury-gold/80 tracking-wider">
//                   {skills}
//                 </h3>
//               )}

//               <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-5xl">
//                 {technologies.map((tech) => {
//                   const Icon = tech.icon;
//                   return (
//                     <motion.div
//                       key={tech.name}
//                       whileHover={{ scale: 1.2, y: -5 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                       className="flex flex-col items-center gap-2 cursor-pointer"
//                     >
//                       <Icon size={45} color={tech.color} />
//                       <span className="text-white text-xs font-mono font-medium">
//                         {tech.name}
//                       </span>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Banner;




import React, { useState, useEffect } from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const navData = [
    { title: "Home", link: "#home" },
    { title: "Works", link: "#works" },
    { title: "About", link: "#about" },
    { title: "Contact", link: "#contact" },
  ];

   useEffect(() => {
    const sections = navData
      .map((item) => document.querySelector(item.link))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.3 
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleScrollTo = (e, link) => {
    e.preventDefault();
    setOpen(false);
    setActiveSection(link);
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed main top-0 left-0 z-50 bg-luxury-champagne w-full px-6 py-5">
      <div className="mx-auto content flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-8">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleScrollTo(e, "#home")} 
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
            <span className="text-sm font-black">G</span>
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Gibin Sunny
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              Creative Developer
            </p>
          </div>
        </a>

        {/* Navigation */}
        <div className="navcontent hidden items-center gap-5 md:flex">
          {navData.map((item) => {
            const isActive = activeSection === item.link;

            return (
              <a
                key={item.link}
                href={item.link}
                onClick={(e) => handleScrollTo(e, item.link)}
                className={`relative navlinks rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleScrollTo(e, "#contact")}
          className="contact group hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 md:flex cursor-pointer"
        >
          Let's Talk
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => setOpen(!open)}
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-3 bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="relative h-full">
        {open && (
          <div className="w-64 inline md:hidden bg-zinc-900 border border-white/10 absolute right-0 rounded-3xl top-2 shadow-2xl backdrop-blur-xl">
            <div className="para1 flex flex-col gap-3 p-4">
              {navData.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  onClick={(e) => handleScrollTo(e, item.link)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.link
                      ? "bg-white text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.title}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="mt-2 text-center rounded-xl bg-white py-2 text-sm font-semibold text-black"
              >
                Let's Talk →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
