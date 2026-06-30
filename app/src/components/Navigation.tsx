"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { X } from 'lucide-react';
import Magnetic from './Magnetic'; // Added Magnetic import


export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide header and show hamburger on scroll down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 150 && latest > previous) {
      setHidden(true);
    } else if (latest < previous || latest < 50) {
      setHidden(false);
    }
  });

  const navItems = [
    { title: "Home", href: "#" },
    { title: "Work", href: "#work" },
    { title: "About", href: "#about" },
    { title: "Tech Stack", href: "#techstack" },
    { title: "Certification", href: "#certification" },
    { title: "Gallery", href: "#gallery" },
    { title: "Contact", href: "#contact" },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/onetwothird" },
    { name: "LinkedIn", href: "https://linkedin.com/in/angelito-decatoria" },
    { name: "Instagram", href: "https://instagram.com/cntwxrms" },
    { name: "Facebook", href: "https://facebook.com/angelo.decatoria.5" },
  ];

  return (
    <>
      {/* MAIN DESKTOP HEADER */}
      <motion.header 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 w-full z-50 mix-blend-difference text-white px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none"
      >
        <div className="pointer-events-auto group flex items-center cursor-pointer font-medium tracking-wide text-base overflow-hidden pr-4" onClick={() => window.scrollTo(0,0)}>
          <span className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-360 mr-2">©</span>
          <div className="grid relative overflow-hidden items-center">
            <span className="col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-10 opacity-100 group-hover:opacity-0 whitespace-nowrap">
              Code by Thirdy
            </span>
            <span className="col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
              Angelito P. Decatoria III
            </span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-8 text-base font-medium">
          <a href="#work" className="hidden md:flex flex-col items-center group relative opacity-70 hover:opacity-100 transition-opacity">
            Work
            <span className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </a>
          <a href="#about" className="hidden md:flex flex-col items-center group relative opacity-70 hover:opacity-100 transition-opacity">
            About
            <span className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </a>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* FLOATING HAMBURGER BUTTON */}
      <AnimatePresence>
        {hidden && !menuOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-8 right-6 md:right-12 z-100"
          >
            <Magnetic>
              <button 
                onClick={() => setMenuOpen(true)}
                // Updated background hover color here
                className="w-16 h-16 md:w-20 md:h-20 bg-[#1C1D20] text-white rounded-full flex flex-col justify-center items-center gap-1.5 hover:bg-[#8B5CF6] transition-colors duration-300 shadow-xl pointer-events-auto group"
              >
                <div className="w-6 h-0.5 bg-white group-hover:w-8 transition-all duration-300 ease-in-out" />
                <div className="w-6 h-0.5 bg-white group-hover:w-8 transition-all duration-300 ease-in-out" />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIDEBAR OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Backdrop (Click to close) - No blur effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 w-full h-screen bg-black/40 z-190 cursor-pointer"
            />

            {/* Right Sidebar */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 h-screen w-full sm:w-100 md:w-120 bg-[#1C1D20] text-white z-200 flex flex-col shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setMenuOpen(false)}
                // Updated background color here
                className="absolute top-8 right-6 md:right-12 w-14 h-14 bg-[#8B5CF6] rounded-full flex justify-center items-center hover:scale-105 transition-transform duration-300 z-10"
              >
                <X size={24} />
              </button>

              {/* Menu Content */}
              <div className="w-full h-full flex flex-col justify-center px-8 md:px-16 relative">
                
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#999D9E] mb-12 border-b border-white/20 pb-4 inline-block w-full">
                  Navigation
                </span>

                <div className="flex flex-col gap-2 md:gap-4">
                  {navItems.map((item, i) => (
                    <motion.a 
                      key={i}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      // Updated hover text color here
                      className="text-5xl md:text-6xl font-medium tracking-tight hover:text-[#8B5CF6] hover:translate-x-4 transition-all duration-500 w-max"
                    >
                      {item.title}
                    </motion.a>
                  ))}
                </div>

                {/* Socials Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-12 left-8 md:left-16 flex flex-col gap-4"
                >
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#999D9E]">
                    Socials
                  </span>
                  <div className="flex gap-4 md:gap-6 flex-wrap">
                    {socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.href} 
                        target="_blank"
                        rel="noopener noreferrer"
                        // Updated hover text color here
                        className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}