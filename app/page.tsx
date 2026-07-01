"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Cursor from './src/components/Cursor';
import Navigation from './src/components/Navigation'; 
import Hero from './src/sections/Hero';
import About from './src/sections/About';
import Works from './src/sections/Works';
import TechStack from './src/sections/TechStack';
import JourneyGallery from './src/sections/JourneyGallery';
import Footer from './src/components/Footer';
import Certification from './src/sections/Certification';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
      
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}} />

      <Cursor />

      {/* PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            // The border radius on exit creates a high-end "curtain pulling up" effect
            exit={{ y: "-100%", borderBottomLeftRadius: "30%", borderBottomRightRadius: "30%" }} 
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} 
            className="fixed inset-0 z-100000 bg-[#1C1D20] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          >
            {/* TOP LOGS: Dynamic Terminal Boot Sequence */}
            <div className="flex justify-between items-start font-mono text-xs md:text-sm text-[#999D9E]">
              <div className="flex flex-col gap-1.5">
                <span className="text-white uppercase tracking-widest text-[10px]">System Boot</span>
                <span>
                  {progress < 25 ? "Fetching structural dependencies..." :
                   progress < 60 ? "Compiling Flutter web ecosystem..." :
                   progress < 85 ? "Loading YOLOv8 neural weights..." :
                   "Mounting UI components..."}
                </span>
              </div>
              <div className="text-right flex flex-col gap-1.5 uppercase tracking-widest text-[10px]">
                <span className="text-white">Location Data</span>
                <span>LAT: 14.3166 | LON: 120.7666</span>
                <span>CAVITE, PH</span>
              </div>
            </div>

            {/* BOTTOM SECTION: Name Fill & Progress */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4 w-full">
              
              {/* Animated Text Fill */}
              <div className="relative text-[18vw] md:text-[14vw] leading-[0.85] font-medium tracking-tighter uppercase select-none pb-2">
                {/* Outline Layer (Background) */}
                <span 
                  className="text-transparent" 
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
                >
                  Decatoria
                </span>
                
                {/* Solid Fill Layer (Foreground mapped to progress) */}
                <motion.span 
                  className="absolute left-0 top-0 overflow-hidden text-white whitespace-nowrap"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                >
                  Decatoria
                </motion.span>
              </div>
              
              {/* Percentage Tracker */}
              <div className="font-mono text-4xl md:text-6xl tracking-tighter mb-3 md:mb-5 w-30 text-right">
                {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW NAVIGATION COMPONENT WITH MAGNETIC HAMBURGER */}
      <Navigation />

      <main>
        <Hero />
        <About />
        <Works />
        <Certification />
        <TechStack />
        <JourneyGallery />
      </main>

      <Footer />
    </div>
  );
}