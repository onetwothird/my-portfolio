"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import { X } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function JourneyGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);

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
  const displayedGallery = showAllGallery ? galleryImages : galleryImages.slice(0, 4);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border-y border-black/10 dark:border-white/10 max-w-350 mx-auto">
        
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

        {/* GitHub Metrics - Exactly matching your image */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={revealUp} 
          className="relative p-8 md:p-16 flex flex-col justify-center items-center text-center bg-[#E6E6E6] dark:bg-[#151515]"
        >
           <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-2">@onetwothird</h3>
           <p className="text-sm font-medium text-[#999D9E] mb-10">1,164 GitHub contributions</p>
           
           <Magnetic>
             <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-full bg-[#1C1D20] text-white dark:bg-white dark:text-[#1C1D20] text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 inline-block">
               View Profile
             </a>
           </Magnetic>

           {/* Floating green dot with subtle bounce */}
           <motion.div 
             animate={{ y: [0, -8, 0] }} 
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute right-[15%] md:right-[20%] top-[55%] w-4 h-4 rounded-full bg-[#5a9e2f]" 
           />
        </motion.div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 px-6 md:px-12 bg-[#F4F4F4] dark:bg-[#111111]">
        <div className="max-w-350 mx-auto">
          <div className="flex justify-between items-center mb-16">
             <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Archive Gallery</h2>
             {!showAllGallery && (
               <button onClick={() => setShowAllGallery(true)} className="px-6 py-3 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-all duration-300">
                 More images <span className="opacity-50 text-xs ml-1">{galleryImages.length}</span>
               </button>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {displayedGallery.map((src, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }}
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
                onClick={() => setSelectedImage(src)} 
                className={`w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <Image src={src} alt="Gallery" fill className="object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-200000 flex items-center justify-center bg-black/95 backdrop-blur-sm p-6"
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