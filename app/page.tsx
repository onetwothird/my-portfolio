"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from '@studio-freight/react-lenis';

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

  // Slower, controlled timer for the cinematic sequence
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, 65); 
      
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  return (
    // 2. Wrap your app in ReactLenis
    // The "lerp" value controls the smoothness. 0.05 gives that buttery 300Hz feel.
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
        
        <style dangerouslySetInnerHTML={{__html: `
          html { scroll-behavior: smooth; }
          body { overflow-x: hidden; }
        `}} />

        <Cursor />

        {/* PRELOADER */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              exit={{ y: "-100%", borderBottomLeftRadius: "30%", borderBottomRightRadius: "30%" }} 
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} 
              className="fixed inset-0 z-100000 bg-[#1C1D20] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden"
            >
              {/* TOP ANCHOR: Minimalist metadata to frame the screen */}
              <div className="w-full flex justify-between text-[#999D9E] text-[10px] sm:text-xs uppercase tracking-widest font-mono">
                <span className="animate-pulse">Establishing Connection...</span>
                <span>[ @Onetwothird ]</span>
              </div>

              {/* CENTER: The Cinematic Foreshadowing Sequence */}
              <div className="flex-1 flex items-center justify-center px-4 text-center">
                <AnimatePresence mode="wait">
                  {progress < 30 && (
                    <motion.h2 
                      key="q1" 
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight"
                    >
                      So, you want to know <br className="hidden sm:block" />
                      <span className="text-[#8B5CF6]">Angelito P. Decatoria III?</span>
                    </motion.h2>
                  )}
                  
                  {progress >= 30 && progress < 60 && (
                    <motion.h2 
                      key="q2" 
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight"
                    >
                      Want to see the <span className="text-[#8B5CF6]">ecosystems</span> <br className="hidden sm:block" />
                      he has engineered?
                    </motion.h2>
                  )}

                  {progress >= 60 && progress < 90 && (
                    <motion.h2 
                      key="q3" 
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight"
                    >
                      Curious about his <br className="hidden sm:block" />
                      <span className="text-[#8B5CF6]">1,164+</span> contributions?
                    </motion.h2>
                  )}

                  {progress >= 90 && (
                    <motion.h2 
                      key="q4" 
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} 
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} 
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight text-white"
                    >
                      Let&apos;s begin.
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTTOM SECTION: Name Fill & Progress Tracker */}
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-4 w-full">
                
                {/* Animated Text Fill */}
                <div className="relative text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[11vw] leading-[0.85] font-medium tracking-tighter uppercase select-none pb-2 md:pb-0">
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
                <div className="font-mono text-5xl sm:text-6xl md:text-6xl tracking-tighter self-end md:self-auto mb-2 md:mb-4 text-right w-24 md:w-32">
                  {progress}%
                </div>
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>

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
    </ReactLenis>
  );
}