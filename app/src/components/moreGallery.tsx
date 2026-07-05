"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
  }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Moved outside the component to prevent recreating the array on every render
const galleryImages = [
  "/img/image1.jpg", "/img/image2.jpg", "/img/image3.jpg", "/img/image4.jpg",
  "/img/image5.jpg", "/img/image6.jpg", "/img/image7.jpg", "/img/image8.jpg"
];

export default function MoreGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Wrapped in useCallback to maintain stable references
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  
  const showNext = useCallback(() => 
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length)), 
  []);
  
  const showPrev = useCallback(() => 
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length)), 
  []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, closeLightbox, showNext, showPrev]); // Added missing dependencies

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white pb-24">
      
      {/* Header Section */}
      <section className="pt-32 pb-8 px-6 md:px-12 relative max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Link 
            href="/#gallery" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#999D9E] hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={slideUpFade} className="text-6xl md:text-[8vw] leading-[0.85] font-medium tracking-tighter">
              Archive Gallery.
            </motion.h1>
          </div>
          <motion.div variants={slideUpFade} className="flex items-center gap-4 mt-4">
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              アーカイブギャラリー
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              {String(galleryImages.length).padStart(2, '0')} Images
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Full Gallery Grid */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {galleryImages.map((src, i) => (
            <motion.div 
              key={i} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
              onClick={() => setSelectedIndex(i)} 
              className={`group w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Image src={src} alt={`Gallery Image ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />

              {/* Hover caption overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-white text-xs font-mono font-bold tracking-widest">
                  {String(i + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </span>
              </div>
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <span className="text-white text-lg leading-none -mt-0.5">↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
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
              <Image src={galleryImages[selectedIndex]} alt="Fullscreen" fill className="object-contain" quality={100} priority />
            </motion.div>

            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs font-mono font-bold tracking-widest">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}