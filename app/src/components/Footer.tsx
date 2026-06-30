"use client";

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";
import { motion, Variants } from 'framer-motion';
import Magnetic from './Magnetic';

// Premium Footer Animations
const footerStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const slideUpScale: Variants = {
  hidden: { opacity: 0, y: 150, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const phTime = new Date().toLocaleTimeString("en-US", { 
        timeZone: "Asia/Manila", 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
      });
      setTime(phTime);
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer id="contact" className="bg-[#1C1D20] text-white pt-32 pb-10 px-6 md:px-12 mt-20 relative rounded-t-[40px] md:rounded-t-[80px] overflow-hidden">
      
      {/* 
        This is the trigger. 
        once: false means the animation resets and plays every time you scroll up/down to it.
      */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={footerStagger}
        className="w-full flex flex-col items-center"
      >
        <motion.div variants={slideUpScale} className="w-full max-w-300 flex flex-col md:flex-row items-center md:items-start justify-between relative z-10">
          <div className="flex items-center gap-6 mb-12 md:mb-0">
            <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden shrink-0">
               <Image src="/img/image.jpg" alt="Angelito" fill className="object-cover" />
            </div>
            <h2 className="text-6xl md:text-[8vw] font-medium tracking-tighter leading-none">
              Let&apos;s work<br/>together
            </h2>
          </div>
          <ArrowUpRight size={48} className="hidden md:block opacity-50 mt-12" />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-300 border-b border-white/20 pb-20 mt-16 flex flex-col md:flex-row gap-4 relative z-10">
           <Magnetic>
             <a href="mailto:angelitodecatoriaa@gmail.com" className="px-8 py-4 rounded-full border border-white/30 text-sm font-medium hover:bg-white hover:text-[#1C1D20] transition-colors inline-block">
               angelitodecatoriaa@gmail.com
             </a>
           </Magnetic>
           <Magnetic>
             <a href="https://www.linkedin.com/in/angelito-decatoria/" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-white/30 text-sm font-medium hover:bg-white hover:text-[#1C1D20] transition-colors inline-block">
               Connect on LinkedIn
             </a>
           </Magnetic>
        </motion.div>

        {/* Massive Magnetic Action Button */}
        <motion.div variants={fadeUp} className="absolute right-12 md:right-32 top-1/2 -translate-y-1/2 z-20 hidden md:block">
          <Magnetic>
            <a href="mailto:angelitodecatoriaa@gmail.com" className="w-40 h-40 md:w-48 md:h-48 bg-[#8B5CF6] hover:bg-[#7e53de] text-white rounded-full flex items-center justify-center font-medium shadow-2xl transition-colors duration-300">
               Get in touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-300 pt-10 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#999D9E] font-medium uppercase tracking-widest gap-8 md:gap-0">
          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Version</span>
              <span className="text-white">2026 © Edition</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Local Time</span>
              <span className="text-white">{time || "00:00 PM PHT"}</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
             <span className="opacity-50">Socials</span>
             <div className="flex gap-6 text-white">
               <a href="https://github.com/onetwothird" className="hover:text-[#8B5CF6] transition-colors">GitHub</a>
               <a href="https://www.linkedin.com/in/angelito-decatoria/" className="hover:text-[#8B5CF6] transition-colors">LinkedIn</a>
               <a href="https://seelai-docs.vercel.app" className="hover:text-[#8B5CF6] transition-colors">Seelai</a>
             </div>
          </div>
        </motion.div>
      </motion.div>

    </footer>
  );
}