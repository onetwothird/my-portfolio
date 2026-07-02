"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { X } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

// --- Added Contribution Graph Component ---
const AbstractContributionGraph = () => {
  const cols = 26; // Number of weeks to show
  const rows = 7;  // Days of the week

  // Deterministic randomizer for a realistic looking graph pattern
  const getContributionLevel = (col: number, row: number) => {
    const hash = (col * 17 + row * 31) % 100;
    if (hash < 45) return 0; // Empty
    if (hash < 75) return 1; // Light
    if (hash < 90) return 2; // Medium
    return 3;                // Heavy
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const journey = [
    { year: "2026", title: "Seelai", desc: "Thesis Project | Full Stack" },
    { year: "2025", title: "ODCI Document Tracker", desc: "Full Stack Developer (OJT)" },
    { year: "2025", title: "AlgoVerse", desc: "OS Final Project | Full Stack" },
    { year: "2022", title: "Hello World! 👋🏻", desc: "Wrote my first line of code." }
  ];

  const galleryImages = [
    "/img/image1.jpg", "/img/image2.jpg", "/img/image3.jpg", "/img/image4.jpg",
    "/img/image5.jpg", "/img/image6.jpg", "/img/image7.jpg", "/img/image8.jpg"
  ];

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border-y border-black/10 dark:border-white/10 max-w-7xl mx-auto">
        
        {/* Timeline */}
        <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-20">Journey.</h2>
          <div className="space-y-0 border-l border-black/10 dark:border-white/10 ml-2">
            {journey.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={revealUp} className="relative pl-10 pb-16 last:pb-0 group">
                <div className="absolute -left-1.25 top-2 w-2.5 h-2.5 bg-black dark:bg-white group-hover:scale-150 transition-transform duration-300 rounded-full" />
                <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-black/5 dark:border-white/5 pb-6">
                  <div>
                    <span className="text-xs font-bold font-mono text-[#999D9E] block mb-3">{item.year}</span>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs font-medium text-[#999D9E] mt-4 md:mt-0">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub Metrics - Redesigned with Graph */}
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
             {/* Header: Username & Status */}
             <div className="flex justify-between items-start mb-16">
               <div>
                 <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">@onetwothird</h3>
                 <div className="flex items-center gap-3">
                   {/* Integrated pulsing status dot */}
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5a9e2f] opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5a9e2f]"></span>
                   </span>
                   <span className="text-xs font-mono text-[#999D9E] uppercase tracking-wider">Active Contributor</span>
                 </div>
               </div>

               {/* Minimalist Link Button */}
               <Magnetic>
                 <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1D20] text-white dark:bg-white dark:text-[#1C1D20] hover:scale-110 transition-transform duration-300 shadow-md shrink-0">
                   <span className="text-xl font-light leading-none -mt-0.5">↗</span>
                 </a>
               </Magnetic>
             </div>

             {/* Big Typography Stats & Graph */}
             <div className="flex flex-col border-t border-black/10 dark:border-white/10 pt-6">
                <span className="text-5xl md:text-6xl font-medium tracking-tighter mb-1">1,268+</span>
                <span className="text-sm font-medium text-[#999D9E]">Contributions in the last year</span>
                
                {/* Simulated Data Graph */}
                <AbstractContributionGraph />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6 md:px-12 bg-[#F4F4F4] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
             <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Archive Gallery</h2>
             <Link 
               href="/gallery" 
               className="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-all duration-300"
             >
               More images <span className="opacity-50 text-xs ml-1">{galleryImages.length}</span>
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {galleryImages.slice(0, 4).map((src, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                onClick={() => setSelectedImage(src)} 
                className={`w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <Image src={src} alt={`Gallery Image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/95 backdrop-blur-sm p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gray-400 transition-colors"><X size={36} /></button>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative w-full max-w-6xl h-[85vh]">
              <Image src={selectedImage} alt="Fullscreen" fill className="object-contain" quality={100} priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}