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

export default function Works() {
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

  const works = [
    { 
      title: "Seelai", 
      tag: "AI Mobile Ecosystem", 
      link: "https://seelai-docs.vercel.app",
      imageUrl: "/projects/seelai-preview.png"
    },
    { 
      title: "AlgoVerse", 
      tag: "Interactive OS Simulator", 
      link: "https://onetwothird.page.gd/",
      imageUrl: "/projects/AlgoVerse.png"
    },
    { 
      title: "ODCI Tracker", 
      tag: "Corporate Routing System", 
      link: "https://odci.page.gd/",
      imageUrl: "/projects/odci.png"
    },
    { 
      title: "Jayann's Store", 
      tag: "E-Commerce & POS", 
      link: "https://jayann-store.page.gd/",
      imageUrl: "/projects/jayann_store.png"
    }
  ];

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10 relative">
      <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest">Recent Work</div>
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-100 h-65 overflow-hidden rounded-xl shadow-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm"
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
        {works.map((work, index) => (
          <Image
            key={index}
            src={work.imageUrl}
            alt={`${work.title} Preview`}
            fill
            sizes="400px"
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
        {works.map((work, idx) => (
          <motion.a 
            href={work.link}
            target="_blank"
            rel="noreferrer"
            key={idx}
            variants={slideUpFade}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500 z-10"
          >
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
              {work.title}
            </h3>
            <span className="text-sm md:text-base font-medium mt-4 md:mt-0 opacity-60 pointer-events-none">
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