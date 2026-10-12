import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-luxury-dark text-gray-400 border-t border-white/10 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
        {/* 1. Mini Bio / Tagline & Copyright */}
        <div className="space-y-3">
          <h3 className="text-white text-lg font-bold tracking-wider">
            Gibin Sunny
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm mx-auto md:mx-0">
            Full-Stack Developer based in Kochi , Kerala, India. Building
            scalable web applications and digital experiences.
          </p>
          <div className="text-xs text-gray-600 font-mono pt-2">
            © {currentYear} Gibin Sunny. All rights reserved.
          </div>
        </div>

        {/* 2. Navigation Links (Mini-Sitemap) */}
        <div className="flex flex-col items-center md:items-center space-y-2">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/" className="hover:text-red-500 transition-colors">
              Home
            </Link>
            <a href="#contact" className="hover:text-red-500 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* 3. Call to Action, Contact Info & Socials */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="text-center md:text-right">
            <p className="text-xs font-mono text-red-500 uppercase tracking-wider mb-1">
              Let's work together
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gibins531@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-500 transition-colors text-sm font-mono"
            >
              gibins531@gmail.com
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 text-sm pt-2">
            <a
              href="https://www.linkedin.com/in/gibin-sunny-599270227"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:border-red-500 hover:text-white transition-all"
            >
              LinkedIn
            </a>{" "}
            <a
              href="https://github.com/Gibin1303"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:border-red-500 hover:text-white transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
