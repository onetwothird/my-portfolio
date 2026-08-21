"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../components/SoundProvider'; 
import { Tape } from '../components/Scrapbook';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function JourneyGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);
  
  const { playHover } = useSound();

  const journey = [
    {
      year: "2026",
      title: "QueueTopia",
      desc: "Side Project | Full Stack",
      detail: "My side project for Operating Systems — a web-based simulator that visualizes CPU scheduling algorithms like FCFS, SJF, Priority, SRTF, and Round Robin."
    },
    {
      year: "2026",
      title: "Seelai",
      desc: "Thesis Project | Full Stack",
      detail: "My undergraduate thesis — an AI-powered mobile assistant built with Flutter, TensorFlow Lite, and YOLO that helps visually impaired individuals interpret their surroundings in real time."
    },
    {
      year: "2026",
      title: "Resumi",
      desc: "Resume Builder & Portfolio",
      detail: "A dedicated project focused on empowering users to create robust resumes and professional portfolios."
    },
    {
      year: "2026",
      title: "Jayann's Store",
      desc: "E-Commerce & POS",
      detail: "An integrated e-commerce and point-of-sale system designed to streamline online storefront operations and inventory."
    },
    {
      year: "2025",
      title: "ODCI Document Tracker",
      desc: "Full Stack Developer (OJT)",
      detail: "The biggest project from my OJT — a centralized document tracking system built with a 3-person team, with role-based dashboards for Superadmins, Admins, and Users."
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
      <section className="grid grid-cols-1 border-y border-black/10 dark:border-white/10 max-w-7xl mx-auto">

        <div className="p-8 md:p-16 border-b lg:border-b-0 border-black/10 dark:border-white/10">
          <div className="mb-20">
            <div className="relative inline-block">
              <Tape className="w-10 h-4 sm:w-12 sm:h-5 -top-2 -left-3" rotate={-7} />
              <h2 className="relative text-4xl md:text-5xl font-medium tracking-tighter">Journey.</h2>
            </div>
            <p className="font-mono text-xs text-[#999D9E] mt-4">私の歩み</p>
          </div>
          <div className="space-y-0 border-l border-black/10 dark:border-white/10 ml-2">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={revealUp}
                onMouseEnter={() => {
                  setHoveredJourney(i);
                  playHover(400, 500); 
                }}
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

      </section>

      <section id="gallery" className="py-24 px-6 md:px-12 bg-[#F4F4F4] dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
             <div>
               <div className="relative inline-block">
                 <Tape className="w-10 h-4 sm:w-12 sm:h-5 -top-2 -left-3" rotate={-7} />
                 <h2 className="relative text-3xl md:text-5xl font-medium tracking-tight">Archive Gallery</h2>
               </div>
               <p className="font-mono text-xs text-[#999D9E] mt-4">アーカイブギャラリー</p>
             </div>
             <Link 
               href="/gallery" 
               className="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-all duration-300"
             >
               More images <span className="opacity-50 text-xs ml-1">{galleryImages.length}</span>
             </Link>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.1 }} 
            variants={staggerGrid}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          >
            {previewImages.map((src, i) => (
              <motion.div 
                key={i} 
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                onMouseEnter={() => playHover(900, 1100)} 
                onClick={() => setSelectedIndex(i)} 
                className={`group w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm`}
              >
                <Image src={src} alt={`Gallery Image ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-mono font-bold tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  {String(i + 1).padStart(2, '0')} / {String(previewImages.length).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </motion.div>
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