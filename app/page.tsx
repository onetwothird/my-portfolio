"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// Components
import Cursor from "./components/Cursor";
import Navigation from "./components/Navigation";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Works from "./sections/Works";
import TechStack from "./sections/TechStack";
import JourneyGallery from "./sections/JourneyGallery";
import Footer from "./components/Footer";
import Certification from "./sections/Certification";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visitType, setVisitType] = useState<"initial" | "return" | null>(null);

  useEffect(() => {
    const checkVisitTimer = setTimeout(() => {
      const hasVisited = sessionStorage.getItem("portfolioVisited");
      if (hasVisited) {
        setVisitType("return");
      } else {
        setVisitType("initial");
      }
    }, 0);

    return () => clearTimeout(checkVisitTimer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (visitType === "initial") {
      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => prev + 1);
        }, 65);
        return () => clearTimeout(timer);
      } else {
        sessionStorage.setItem("portfolioVisited", "true");
        const exitTimer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(exitTimer);
      }
    } else if (visitType === "return") {
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 1500); 
      return () => clearTimeout(exitTimer);
    }
  }, [progress, visitType]);

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html { scroll-behavior: auto; }
            body { overflow-x: hidden; }
          `,
        }}
      />

      <Cursor />

      <AnimatePresence>
        {loading && visitType === "initial" && (
          <motion.div
            key="initial-preloader"
            exit={{
              y: "-100%",
              borderBottomLeftRadius: "30%",
              borderBottomRightRadius: "30%",
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100000 bg-[#1C1D20] text-white flex flex-col justify-center p-6 md:p-12 overflow-hidden"
          >
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
                    <span className="text-[#8B5CF6]">
                      Angelito P. Decatoria III?
                    </span>
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
                    Want to see the{" "}
                    <span className="text-[#8B5CF6]">ecosystems</span>{" "}
                    <br className="hidden sm:block" />
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
                    <span className="text-[#8B5CF6]">1,268+</span> contributions?
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
          </motion.div>
        )}

        {loading && visitType === "return" && (
          <motion.div
            key="return-preloader"
            exit={{
              y: "-100%",
              borderBottomLeftRadius: "30%",
              borderBottomRightRadius: "30%",
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100000 bg-[#1C1D20] text-white flex flex-col justify-center items-center overflow-hidden p-6"
          >
            <div className="text-center flex flex-col items-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-[#999D9E] font-mono text-xs md:text-sm tracking-widest uppercase animate-pulse"
              >
                Re-establishing Connection...
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-medium tracking-tight"
              >
                Welcome <span className="text-[#8B5CF6]">back.</span>
              </motion.h2>

              <div className="w-48 h-0.5 bg-white/10 mt-6 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-[#8B5CF6]"
                />
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
  );
}