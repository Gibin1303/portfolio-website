// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import "../styles/navbar.css";

// const Navbar = () => {
//   const location = useLocation();
//   const [open, setOpen] = useState(false);

//   const navData = [
//     {
//       title: "Home",
//       link: "/",
//     },
//     {
//       title: "Works",
//       link: "/work",
//     },
//     {
//       title: "About",
//       link: "/about",
//     },
//     {
//       title: "Contact",
//       link: "#contact",
//     },
//   ];

//   return (
//     <nav className="fixed main top-0 left-0 z-100 bg-luxury-champagne  w-full px-6 py-5 ">
//       <div className="mx-auto content flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-8">
//         {/* Logo */}
//         <Link to="/" className="group flex items-center gap-3">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
//             <span className="text-sm font-black">P</span>
//           </div>

//           <div>
//             <h1 className="text-lg font-semibold tracking-tight text-white">
//               Portfolio
//             </h1>
//             <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
//               Creative Studio
//             </p>
//           </div>
//         </Link>

//         {/* Navigation */}
//         <div className=" navcontent hidden items-center gap-5 md:flex">
//           {navData.map((item) => {
//             const isActive = location.pathname === item.link;

//             return (
//               <Link
//                 key={item.link}
//                 to={item.link}
//                 className={`relative navlinks rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
//                   isActive
//                     ? "bg-white text-black"
//                     : "text-white hover:bg-white/10 hover:text-white"
//                 }`}
//               >
//                 {item.title}
//               </Link>
//             );
//           })}
//         </div>

//         {/* CTA */}
//         <Link
//           to="/contact"
//           className="contact group hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10 md:flex"
//         >
//           Let's Talk
//           <span className="transition-transform duration-300 group-hover:translate-x-1">
//             →
//           </span>
//         </Link>

//         {/* Mobile Menu */}
//         <button
//           className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           <div className="space-y-1.5">
//             <span className="block h-0.5 w-5 bg-white" />
//             <span className="block h-0.5 w-3 bg-white" />
//           </div>
//         </button>
//       </div>
//       <div className="relative h-full">
//         {open && (
//           <div className="w-64 inline md:hidden bg-yellow-200 absolute right-0 rounded-3xl top-2">
//             <div className=" para1 flex flex-col gap-5 p-3.5 ">
//               {navData.map((item, index) => (
//                 <Link to={item.link}>
//                   <p className="para">{item.title}</p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
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
            <span className="text-sm font-black">P</span>
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Portfolio
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
              Creative Studio
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
