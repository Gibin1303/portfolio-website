import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useNavigate();
  const canvasRef = useRef(null);


  // Only validates after the user starts typing a 10-digit Indian mobile number
  const isValidPhoneNumber =
    phoneNumber.length === 0 || /^[6-9]\d{9}$/.test(phoneNumber);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! 🎉");
        setIsSubmitting(false);
        event.target.reset();
        setPhoneNumber("");
        setTimeout(() => setResult(""), 5000);
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error", error);
      setResult("Failed to send. Please try again.");
      setIsSubmitting(false);
    }
  };

  const navCard = () => {
    setLoading(true);
    setTimeout(() => {
      router("/card");
      setLoading(false);
    }, 2000);
  };

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
    <section
      className="w-full bg-luxury-dark relative text-white py-20 px-6 md:px-16"
      id="contact"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN: Content, Availability, and Direct Gmail */}
        <div className="space-y-6 p-18 md:p-0">
          <span className="text-red-500 font-mono text-sm tracking-wider uppercase">
            Get in Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's build something extraordinary together.
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Have a project in mind, a freelance opportunity, or just want to
            connect? Drop a message and I'll get back to you within 24 hours.
          </p>

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-gray-300">
              Actively looking for full-stack developer roles
            </span>
          </div>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm text-gray-300">
              Immediate Available to Join
            </span>
          </div>

          {/* Direct Info / Socials */}
          <div className="pt-4 flex flex-col sm:flex-row gap-6 text-sm text-gray-400">
            <div>
              <p className="text-gray-500 font-medium">Direct Email</p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Gibins%20%3Cgibins531@gmail.com%3E"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors font-mono"
              >
                gibins531@gmail.com
              </a>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Location</p>
              <p className="text-white">Idukki, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Contact Form */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                maxLength={10}
                required
              />
              {!isValidPhoneNumber && (
                <p className="text-red-500 text-xs mt-1 font-mono">
                  Please enter a valid 10-digit mobile number
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-red-600/20 cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {result && (
            <p
              className={`text-sm text-center mt-4 font-mono ${result.includes("success") ? "text-emerald-400" : "text-gray-300"}`}
            >
              {result}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
