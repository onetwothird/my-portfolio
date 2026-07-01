"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

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
  const previewCerts = [
    { title: "Mastering SQL Query Optimization", issuer: "Gordon College", date: "2025" },
    { title: "Artificial Intelligence & Innovation", issuer: "KOENIG", date: "2025" },
    { title: "Generative AI: ChatGPT to AutoGPT", issuer: "NIELIT-Delhi", date: "2024" }
  ];

  return (
    <section id="certification" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10">
      <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest">Certifications</div>
      
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }} 
        variants={staggerContainer}
        className="flex flex-col border-t border-black/10 dark:border-white/10"
      >
        {previewCerts.map((cert, idx) => (
          <motion.div 
            key={idx}
            variants={slideUpFade}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-12 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500 cursor-default"
          >
            <h3 className="text-3xl md:text-5xl font-medium tracking-tight group-hover:opacity-50 transition-opacity duration-500">
              {cert.title}
            </h3>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
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
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={slideUpFade}
        className="flex justify-center mt-24"
      >
         <Link href="/certificate" className="px-8 py-4 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-colors duration-300">
           More certificates
         </Link>
      </motion.div>
    </section>
  );
}