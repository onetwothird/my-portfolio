"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './src/components/ThemeToggle';

// Components
import Cursor from './src/components/Cursor';
import Hero from './src/sections/Hero';
import About from './src/sections/About';
import Works from './src/sections/Works';
import TechStack from './src/sections/TechStack';
import JourneyGallery from './src/sections/JourneyGallery';
import Footer from './src/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Preloader
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 800);
      }
      setProgress(currentProgress);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white cursor-auto md:cursor-none overflow-hidden">
      
      {/* Global Smooth Scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}} />

      {/* NEW CURSOR */}
      <Cursor />

      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ y: "-100%" }} 
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }} 
            className="fixed inset-0 z-100000 bg-[#1C1D20] text-white flex flex-col justify-between p-8 md:p-16"
          >
            <div className="font-medium text-sm">System Loading</div>
            <div className="text-[22vw] leading-none font-medium tracking-tighter self-end">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED HEADER */}
      <header className="fixed top-0 w-full z-50 mix-blend-difference text-white px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none">
        <div className="font-medium tracking-wide text-sm">© Code by Thirdy</div>
        <div className="pointer-events-auto flex items-center gap-8 text-sm font-medium">
          <a href="#work" className="hidden md:block hover:opacity-70 transition-opacity">Work</a>
          <a href="#about" className="hidden md:block hover:opacity-70 transition-opacity">About</a>
          <ThemeToggle />
        </div>
      </header>

      {/* PAGE SECTIONS */}
      <main>
        <Hero />
        <About />
        <Works />
        <TechStack />
        <JourneyGallery />
      </main>

      <Footer />
    </div>
  );
}