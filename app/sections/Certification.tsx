"use client";

import { useState, useEffect } from 'react';
import { motion, Variants, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 } 
  }
};

export default function Certification() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const previewCerts = [
    { 
      title: "Prompt to Persona: Building Your AI Twin for the Digital Age", 
      issuer: "DICT Region 3", 
      date: "2026",
      imageUrl: "/cert/e-cert_6.png"
    },
    { 
      title: "Mastering SQL Query Optimization: Boost Performance, Reduce Server Load", 
      issuer: "SREGEN", 
      date: "2024",
      imageUrl: "/cert/e-cert_3.png"
    },
    { 
      title: "FWDP Monthly Community Day", 
      issuer: "FWDP Peers", 
      date: "2023",
      imageUrl: "/cert/e-cert_1.png"
    },
    { 
      title: "Bicol Startup 101", 
      issuer: "DICT Region 4", 
      date: "2023",
      imageUrl: "/cert/e-cert_2.png"
    }
  ];

  return (
    <section id="certification" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10 relative">
      <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest">Certifications</div>
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-[320px] h-55 overflow-hidden rounded-xl shadow-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {previewCerts.map((cert, index) => (
          <Image
            key={index}
            src={cert.imageUrl}
            alt={`${cert.title} Certificate`}
            fill
            sizes="320px"
            className="object-cover transition-opacity duration-300"
            style={{ 
              opacity: hoveredIndex === index ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={staggerContainer}
        className="flex flex-col border-t border-black/10 dark:border-white/10"
      >
        {previewCerts.map((cert, idx) => (
          <motion.div 
            key={idx}
            variants={slideUpFade}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-12 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500 cursor-default z-10"
          >
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
              {cert.title}
            </h3>
            <div className="flex items-center gap-4 mt-4 md:mt-0 pointer-events-none">
               <span className="text-sm font-medium opacity-60">
                 {cert.issuer}
               </span>
               <span className="text-xs font-mono opacity-40">
                 {cert.date}
               </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={slideUpFade}
        className="flex justify-center mt-24"
      >
         <Link href="/certificate" className="px-8 py-4 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-colors duration-300">
           More certificates
         </Link>
      </motion.div>
    </section>
  );
}