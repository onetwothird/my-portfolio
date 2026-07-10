"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const AbstractContributionGraph = () => {
  const cols = 26; 
  const rows = 7;  

  const getContributionLevel = (col: number, row: number) => {
    const hash = (col * 17 + row * 31) % 100;
    if (hash < 45) return 0; 
    if (hash < 75) return 1; 
    if (hash < 90) return 2; 
    return 3;               
  };

  const getStyle = (level: number) => {
    switch (level) {
      case 0: return "bg-black/5 dark:bg-white/5 w-1.5 h-1.5";
      case 1: return "bg-black/30 dark:bg-white/30 w-1.5 h-1.5";
      case 2: return "bg-black/60 dark:bg-white/60 w-2 h-2";
      case 3: return "bg-black dark:bg-white w-2.5 h-2.5";
      default: return "bg-black/5 dark:bg-white/5 w-1 h-1";
    }
  };

  return (
    <div className="mt-12 flex gap-1.25 items-center justify-start overflow-x-auto pb-4 max-w-full [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
      {Array.from({ length: cols }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-1.25 items-center w-2.5">
          {Array.from({ length: rows }).map((_, rowIndex) => {
            const level = getContributionLevel(colIndex, rowIndex);
            return (
              <motion.div
                key={rowIndex}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ 
                  delay: (colIndex * 0.015) + (rowIndex * 0.01), 
                  duration: 0.3,
                  ease: "backOut"
                }}
                className={`rounded-full ${getStyle(level)}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default function JourneyGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);

  const journey = [
    {
      year: "2026",
      title: "Seelai",
      desc: "Thesis Project | Full Stack",
      detail: "My undergraduate thesis — an AI-powered mobile assistant built with Flutter, TensorFlow Lite, and YOLO that helps visually impaired individuals interpret their surroundings in real time."
    },
    {
      year: "2025",
      title: "ODCI Document Tracker",
      desc: "Full Stack Developer (OJT)",
      detail: "The biggest project from my OJT — a centralized document tracking system built with a 3-person team, with role-based dashboards for Superadmins, Admins, and Users."
    },
    {
      year: "2025",
      title: "AlgoVerse",
      desc: "OS Final Project | Full Stack",
      detail: "My final project for Operating Systems — a web-based simulator that visualizes CPU scheduling algorithms like FCFS, SJF, Priority, SRTF, and Round Robin."
    },
    {
      year: "2022",
      title: "Hello World! 👋🏻",
      desc: "Wrote my first line of code.",
      detail: "The day I wrote my very first line of code — the small start of everything that followed."
    }
  ];

  const galleryImages = [
    "/img/image1.jpg", "/img/image2.jpg", "/img/image3.jpg", "/img/image4.jpg",
    "/img/image5.jpg", "/img/image6.jpg", "/img/image7.jpg", "/img/image8.jpg"
  ];
  const previewImages = galleryImages.slice(0, 4);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showNext = useCallback(() => setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % previewImages.length)), [previewImages.length]);
  const showPrev = useCallback(() => setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + previewImages.length) % previewImages.length)), [previewImages.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, closeLightbox, showNext, showPrev]); 

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border-y border-black/10 dark:border-white/10 max-w-7xl mx-auto">

        <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">Journey.</h2>
            <p className="font-mono text-xs text-[#999D9E] mt-4">私の歩み</p>
          </div>
          <div className="space-y-0 border-l border-black/10 dark:border-white/10 ml-2">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={revealUp}
                onMouseEnter={() => setHoveredJourney(i)}
                onMouseLeave={() => setHoveredJourney(null)}
                onClick={() => setHoveredJourney(hoveredJourney === i ? null : i)}
                className="relative pl-10 pb-16 last:pb-0 group cursor-default"
              >
                <div className="absolute -left-1.25 top-2 w-2.5 h-2.5 bg-black dark:bg-white group-hover:scale-150 transition-transform duration-300 rounded-full" />
                <div className="border-b border-black/5 dark:border-white/5 pb-6 group-hover:px-4 md:group-hover:px-6 transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                    <div>
                      <span className="text-xs font-bold font-mono text-[#999D9E] block mb-3">{item.year}</span>
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-xs font-medium text-[#999D9E] mt-4 md:mt-0">{item.desc}</p>
                  </div>

                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: hoveredJourney === i ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#999D9E] leading-relaxed pt-6 max-w-lg">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-start overflow-hidden">
          <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest hidden lg:block">
            Open Source
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.1 }} 
            variants={revealUp} 
            className="group relative flex flex-col p-8 md:p-10 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-500 overflow-hidden"
          >
             <div className="flex justify-between items-start mb-16">
               <div>
                 <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">@onetwothird</h3>
                 <div className="flex items-center gap-3">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a9e2f] opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5a9e2f]"></span>
                   </span>
                   <span className="text-xs font-mono text-[#999D9E] uppercase tracking-wider">Active Contributor</span>
                 </div>
               </div>

               <Magnetic>
                 <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1D20] text-white dark:bg-white dark:text-[#1C1D20] hover:scale-110 transition-transform duration-300 shadow-md shrink-0">
                   <span className="text-xl font-light leading-none -mt-0.5">↗</span>
                 </a>
               </Magnetic>
             </div>

             <div className="flex flex-col border-t border-black/10 dark:border-white/10 pt-6">
                <span className="text-5xl md:text-6xl font-medium tracking-tighter mb-1">1,350+</span>
                <span className="text-sm font-medium text-[#999D9E]">Contributions in the last year</span>
                
                <AbstractContributionGraph />
             </div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-24 px-6 md:px-12 bg-[#F4F4F4] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
             <div>
               <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Archive Gallery</h2>
               <p className="font-mono text-xs text-[#999D9E] mt-4">アーカイブギャラリー</p>
             </div>
             <Link 
               href="/gallery" 
               className="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-all duration-300"
             >
               More images <span className="opacity-50 text-xs ml-1">{galleryImages.length}</span>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {previewImages.map((src, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                onClick={() => setSelectedIndex(i)} 
                className={`group w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <Image src={src} alt={`Gallery Image ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {String(i + 1).padStart(2, '0')} / {String(previewImages.length).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-200000 flex items-center justify-center bg-black/95 backdrop-blur-sm p-6"
            onClick={closeLightbox}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gray-400 transition-colors z-10"><X size={36} /></button>

            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-6xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={previewImages[selectedIndex]} alt="Fullscreen" fill className="object-contain" quality={100} priority />
            </motion.div>

            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-mono font-bold tracking-widest">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(previewImages.length).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}