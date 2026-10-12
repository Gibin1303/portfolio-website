import React, { useEffect, useRef } from "react";
import AboutImg from "/gibinportfolio.png";
import Banner from "./Banner";

// import {
//   SiReact,
//   SiJavascript,
//   SiNodedotjs,
//   SiMongodb,
//   SiTypescript,
//   SiExpress,
//   SiTailwindcss,
//   SiBootstrap,
//   SiGreensock,
//   SiGit,
//   SiThreedotjs,
//   SiVisualstudiocode,
//   SiSocketdotio,
//   SiTanstack,
// } from "react-icons/si";

import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiTypescript,
  SiExpress,
  SiTailwindcss,
  SiBootstrap,
  SiGreensock,
  SiGit,
  SiThreedotjs,
  // SiVscode,
  SiSocketdotio,
  SiTanstack,
} from "react-icons/si";

const About = () => {
  const canvasRef = useRef(null);

  //   const technologies = [
  //   {
  //     name: "React",
  //     icon: SiReact,
  //     color: "#61DAFB",
  //   },
  //   {
  //     name: "JavaScript",
  //     icon: SiJavascript,
  //     color: "#F7DF1E",
  //   },
  //   {
  //     name: "Node.js",
  //     icon: SiNodedotjs,
  //     color: "#339933",
  //   },
  //   {
  //     name: "MongoDB",
  //     icon: SiMongodb,
  //     color: "#47A248",
  //   },
  //   {
  //     name: "TypeScript",
  //     icon: SiTypescript,
  //     color: "#3178C6",
  //   },
  // ];

  const technologies = [
    {
      name: "React",
      icon: SiReact,
      color: "#61DAFB",
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "#3178C6",
    },
    {
      name: "Node.js",
      icon: SiNodedotjs,
      color: "#339933",
    },
    {
      name: "Express.js",
      icon: SiExpress,
      color: "#FFFFFF",
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
      color: "#47A248",
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      color: "#06B6D4",
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
      color: "#7952B3",
    },
    {
      name: "GSAP",
      icon: SiGreensock,
      color: "#88CE02",
    },
    {
      name: "Three.js",
      icon: SiThreedotjs,
      color: "#FFFFFF",
    },
    {
      name: "Git",
      icon: SiGit,
      color: "#F05032",
    },
    //  {
    //   name: "VS Code",
    //   icon: SiVscode,
    //   color: "#007ACC",
    // },
    {
      name: "Socket.io",
      icon: SiSocketdotio,
      color: "#FFFFFF",
    },
    {
      name: "TanStack",
      icon: SiTanstack,
      color: "#FF4154",
    },
  ];
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    // Mouse position & interaction radius
    const mouse = {
      x: null,
      y: null,
      radius: 80, // Distance around mouse where particles scatter
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Create particles
    const numParticles = 80;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.6 + 0.3,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Normal drift movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas screen borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse "Particle Breaking / Repulsion" physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            // Push particle away proportional to distance from cursor
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = (dx / distance) * force * 6;
            const directionY = (dy / distance) * force * 6;

            p.x += directionX;
            p.y += directionY;
          }
        }

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Draw broken web links (lines break when too far)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="about">
      <div className="relative w-auto p-8 bg-transparent flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* <div className="relative z-10  w-full md:w-7/8  bg-transparent backdrop-blur-md border border-gray-300 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-lg font-bold text-gray-700 mb-4">About</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-luxury-gold/50 text-white p-8 rounded-xl flex flex-col justify-center items-center min-w-0 h-auto border border-slate-800 shadow">
              <h3 className="text-4xl font-bold mb-3 text-center text-black font-stretch-50% font-bold">Scallable <span className="text-luxury-gold font-extrabold text-6xl">Fullstack developer</span></h3>
              <p className="text-slate-400 text-md mt-1 text-center text-start">
                I am a Full Stack Developer specializing in the MERN stack
                (MongoDB, Express.js, React, Node.js) with a passion for building
                fast, responsive, and user-centric web applications. I bridge the
                gap between robust backend architectures and refined frontend
                interfaces. With hands-on experience building dynamic web apps,
                RESTful APIs, and modern user interfaces, I focus on writing
                clean, maintainable code and delivering performant digital
                solutions. Whether designing interactive 3D web experiences,
                optimizing database queries, or implementing authentication and
                real-time features, I strive to build products that scale smoothly
              </p>
            </div>
  
            <div className="bg-blue-600 text-white p-8 rounded-xl flex flex-col justify-center items-center h-auto min-w-0 border border-blue-500 shadow">
              <h3 className="text-xl font-bold">Box 2</h3>
              <p className="text-blue-100 text-sm mt-1">Right Content Area</p>
            </div>
          </div>
        </div> */}

        <div className="relative z-10 w-full bg-white/10 backdrop-blur-md border border-gray-300/30 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-4xl text-center font-bold text-white mb-8 font-mono">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="bg-luxury-gold/20 text-white p-6 md:p-8 rounded-xl flex flex-col justify-center items-start w-full min-w-0 border border-luxury-gold/30 shadow">
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-white">
                Scalable{" "}
                <span className="text-luxury-gold font-extrabold text-3xl lg:text-4xl block sm:inline">
                  Fullstack Developer
                </span>
              </h3>
              {/* <p className="text-slate-300 text-md leading-relaxed text-left">
                I am a Full Stack Developer specializing in the MERN stack
                (MongoDB, Express.js, React, Node.js) with a passion for
                building fast, responsive, and user-centric web applications. I
                bridge the gap between robust backend architectures and refined
                frontend interfaces. With hands-on experience building dynamic
                web apps, RESTful APIs, and modern user interfaces, I focus on
                writing clean, maintainable code and delivering performant
                digital solutions. Whether designing interactive 3D web
                experiences, optimizing database queries, or implementing
                authentication and real-time features, I strive to build
                products that scale smoothly.
              </p> */}
              <p className="text-slate-300 text-base leading-relaxed text-left">
                I am a Full Stack Developer specializing in the{" "}
                <span className="text-white font-semibold">MERN stack</span>{" "}
                (MongoDB, Express.js, React, Node.js). I bridge the gap between
                robust backend architectures and sleek, responsive frontend
                interfaces—focusing on clean code, performant database queries,
                real-time features, and interactive web experiences that scale.
              </p>
            </div>

            <div className="bg-transparent relative text-white p-6 md:p-8 rounded-xl flex flex-col justify-center items-center w-full min-w-0 border border-slate-800 shadow">
              {/* Added inset-0 and m-auto, removed left-11.5 and top-1 */}
              <div className="absolute inset-0 m-auto bg-black/20 w-10/12 rounded-full aspect-square pointer-events-none z-10" />
              <img
                src={AboutImg}
                alt="image"
                className="w-4/5 aspect-square object-cover rounded-full pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
      <Banner
        text=""
        technologies={technologies}
        skills={"SKILLS & EXPERTICE"}
        isTrue={true}
      />
    </section>
  );
};

export default About;
