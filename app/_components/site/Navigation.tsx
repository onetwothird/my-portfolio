"use client";

import { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, MapPin, ArrowRight } from 'lucide-react';
import Magnetic from '../shared/Magnetic';
import { useSound } from '../shared/SoundProvider';

const expandedVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { 
    opacity: 1, 
    height: "auto",
    transition: { 
      duration: 0.25, // Reduced from 0.5
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.02, // Reduced from 0.05
      delayChildren: 0.05 // Reduced from 0.1
    }
  },
  exit: { 
    opacity: 0, 
    height: 0,
    transition: { 
      duration: 0.2, // Reduced from 0.4
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.015, // Reduced from 0.03
      staggerDirection: -1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } // Reduced from 0.5
  },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" }
} as const;

export default function Navigation({ isReady = false }: { isReady?: boolean }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  
  const { playHover, playClick } = useSound();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const navItems = [
    { title: "Home", href: "#" },
    { title: "Work", href: "#work" },
    { title: "About", href: "#about" },
    { title: "Tech Stack", href: "#techstack" },
    { title: "Certifications", href: "#certification" },
    { title: "Gallery", href: "#gallery" },
    { title: "Contact", href: "#contact" },
  ];

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: "easeInOut" }} // Reduced from 0.5
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : -14 }}
        transition={{ duration: 0.4, delay: isReady ? 0.92 : 0, ease: [0.16, 1, 0.3, 1] }} // Sped up initial load drop slightly
        className="fixed top-4 left-4 right-4 sm:left-auto sm:right-8 md:top-8 md:right-12 z-50 flex justify-end pointer-events-none"
      >
        <motion.nav
          layout
          initial={{ borderRadius: 32 }}
          animate={{ 
            borderRadius: isOpen ? 24 : 32,
            backgroundColor: "#1C1D20",
          }}
          // Increased stiffness, decreased mass for a faster, snappier spring
          transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }} 
          className={`border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] text-white overflow-hidden flex flex-col origin-top-right pointer-events-auto will-change-transform ${
            isOpen ? "w-full sm:w-105" : "w-auto max-w-full"
          }`}
        >
          
          <motion.div 
            layout 
            className="flex items-center justify-between p-2 pl-4 md:pl-5 gap-3 sm:gap-8 w-full"
          >
            <Magnetic>
              <div 
                className="flex items-center gap-2 md:gap-3 cursor-pointer select-none group py-1.5 px-2" 
                onClick={() => {
                  playClick();
                  window.scrollTo(0,0);
                  setIsOpen(false);
                }}
                onMouseEnter={() => playHover(400, 500)}
              >
                <div className="relative flex items-center justify-center w-2.5 h-2.5 md:w-3 md:h-3 shrink-0">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-60"></div>
                  <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-medium tracking-tight text-sm md:text-base transition-colors group-hover:text-white/70 whitespace-nowrap">
                  Angelito.
                </span>
              </div>
            </Magnetic>

            <AnimatePresence mode="wait">
              {!isScrolled && !isOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
                  exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }} // Reduced from 0.3
                  className="hidden md:flex items-center gap-6 overflow-hidden whitespace-nowrap"
                >
                  {["Work", "About", "Contact"].map((item, i) => (
                    <a 
                      key={i}
                      href={`#${item.toLowerCase()}`} 
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors py-1"
                      onMouseEnter={() => playHover(500 + (i * 100), 600 + (i * 100))}
                      onClick={playClick}
                    >
                      {item}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Magnetic>
              <button 
                onClick={() => {
                  playClick();
                  setIsOpen(!isOpen);
                }}
                onMouseEnter={playHover}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 md:px-4 md:py-2.5 rounded-full text-xs md:text-sm font-medium shrink-0 group"
              >
                <motion.span layout className="hidden sm:block text-white group-hover:opacity-70 transition-opacity">{isOpen ? "Close" : "Menu"}</motion.span>
                <motion.div layout className="text-white group-hover:scale-110 transition-transform duration-200">
                  {isOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.div>
              </button>
            </Magnetic>
          </motion.div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={expandedVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full border-t border-white/10 max-h-[75vh] overflow-y-auto no-scrollbar"
              >
                <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-10">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {navItems.map((item, i) => (
                      <motion.a 
                        key={i}
                        variants={itemVariants}
                        href={item.href}
                        onClick={() => {
                          playClick();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => playHover(300 + (i * 50), 400 + (i * 50))}
                        className="group flex items-center justify-between p-3 md:p-4 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <ArrowRight size={14} className="text-white" />
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div 
                    variants={itemVariants}
                    className="flex justify-center pt-6 border-t border-white/10"
                  >
                    <Magnetic>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                        <MapPin size={14} className="text-white" />
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-[#999D9E]">
                          Naic, Cavite
                        </span>
                      </div>
                    </Magnetic>
                  </motion.div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.nav>
      </motion.div>
    </>
  );
}