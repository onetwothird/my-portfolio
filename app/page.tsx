"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";

import Cursor from "./_components/site/Cursor";
import Navigation from "./_components/site/Navigation";
import ScrollIndicator from "./_components/site/ScrollIndicator";
import Hero from "./_components/home/Hero";
import About from "./_components/home/About";
import Works from "./_components/home/Works";
import TechStack from "./_components/home/TechStack";
import JourneyGallery from "./_components/home/JourneyGallery";
import Footer from "./_components/home/Footer";
import Certification from "./_components/home/Certification";
import OpenSource from "./_components/home/OpenSource";

const preloaderImages = [
  { src: "/gallery/image1.jpg", label: "01 / portrait" },
  { src: "/gallery/image3.jpg", label: "02 / place" },
  { src: "/gallery/image4.jpg", label: "03 / people" },
] as const;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [returnProgress, setReturnProgress] = useState(0);
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
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useEffect(() => {
    if (visitType === "initial") {
      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + 8, 100));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        sessionStorage.setItem("portfolioVisited", "true");
        const exitTimer = setTimeout(() => {
          setLoading(false);
        }, 180);
        return () => clearTimeout(exitTimer);
      }
    } else if (visitType === "return") {
      const progressTimer = setInterval(() => {
        setReturnProgress((previousProgress) => Math.min(previousProgress + 10, 100));
      }, 50);
      const exitTimer = setTimeout(() => {
        setLoading(false);
      }, 900);
      return () => {
        clearInterval(progressTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [progress, visitType]);

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#fffff] font-sans selection:bg-[#8B5CF6] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
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
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100000 flex items-center justify-center overflow-hidden bg-[#ededed] p-6 text-[#1C1D20]"
            role="status"
            aria-live="polite"
          >
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-[min(46vw,172px)]"
            >
              <div className="mb-1 flex items-center justify-between text-[10px] font-medium uppercase tracking-[-0.03em]">
                <span>Angelito Decatoria</span>
                <span>{String(progress).padStart(2, "0")}</span>
              </div>
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-4/5 overflow-hidden bg-[#D8D3CA]"
              >
                <Image
                  src={preloaderImages[0].src}
                  alt=""
                  fill
                  priority
                  sizes="172px"
                  className="object-cover grayscale-[0.15]"
                />
              </motion.div>
              <div className="mt-1 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-black/45">
                <span>Selected image</span>
                <span>01 / 03</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {loading && visitType === "return" && (
          <motion.div
            key="return-preloader"
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100000 flex items-center justify-center overflow-hidden bg-[#ededed] p-6 text-[#1C1D20]"
            role="status"
            aria-live="polite"
          >
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-[min(46vw,172px)]"
            >
              <div className="mb-1 flex items-center justify-between text-[10px] font-medium uppercase tracking-[-0.03em]">
                <span>Angelito Decatoria</span>
                <span>{String(returnProgress).padStart(2, "0")}</span>
              </div>
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-4/5 overflow-hidden bg-[#D8D3CA]"
              >
                <Image
                  src="/gallery/image4.jpg"
                  alt=""
                  fill
                  sizes="172px"
                  className="object-cover grayscale-[0.15]"
                />
                <div className="absolute inset-0 bg-[#ededed]/20" />
              </motion.div>
              <div className="mt-1 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-black/45">
                <span>Welcome back</span>
                <span>02 / 03</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollIndicator />
      <Navigation isReady={!loading} />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: loading ? 0 : 1,
          y: loading ? 20 : 0,
        }}
        transition={{ duration: 0.6, delay: loading ? 0 : 0.86, ease: [0.16, 1, 0.3, 1] }}
      >
        <Hero isReady={!loading} />
        <About />
        <Works />
        <Certification />
        <TechStack />
        <JourneyGallery />
        <OpenSource />
      </motion.main>

      <Footer />
    </div>
  );
}