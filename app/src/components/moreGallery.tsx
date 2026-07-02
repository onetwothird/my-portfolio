"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft } from 'lucide-react';

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

export default function MoreGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    "/img/image1.jpg", "/img/image2.jpg", "/img/image3.jpg", "/img/image4.jpg",
    "/img/image5.jpg", "/img/image6.jpg", "/img/image7.jpg", "/img/image8.jpg"
  ];

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
          <motion.p variants={slideUpFade} className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest mt-4">
            アーカイブギャラリー
          </motion.p>
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
              onClick={() => setSelectedImage(src)} 
              className={`w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Image src={src} alt={`Gallery Image ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
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
    </div>
  );
}