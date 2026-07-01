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

export default function Works() {
  const works = [
    { title: "Seelai", tag: "AI Mobile Ecosystem", link: "https://seelai-docs.vercel.app" },
    { title: "AlgoVerse", tag: "Interactive OS Simulator", link: "https://onetwothird.page.gd/" },
    { title: "ODCI Tracker", tag: "Corporate Routing System", link: "https://odci.page.gd/" },
    { title: "Jayann's Store", tag: "E-Commerce & POS", link: "https://jayann-store.page.gd/" }
  ];

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10">
      <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest">Recent Work</div>
      
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={staggerContainer}
        className="flex flex-col border-t border-black/10 dark:border-white/10"
      >
        {works.map((work, idx) => (
          <motion.a 
            href={work.link}
            target="_blank"
            rel="noreferrer"
            key={idx}
            variants={slideUpFade}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500"
          >
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight group-hover:opacity-50 transition-opacity duration-500">
              {work.title}
            </h3>
            <span className="text-sm md:text-base font-medium mt-4 md:mt-0 opacity-60">
              {work.tag}
            </span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={slideUpFade}
        className="flex justify-center mt-24"
      >
         <Link href="/projects" className="px-8 py-4 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-colors duration-300">
           More work
         </Link>
      </motion.div>
    </section>
  );
}