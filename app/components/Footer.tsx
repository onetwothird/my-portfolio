"use client";

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";
import { motion, Variants } from 'framer-motion';
import Magnetic from './Magnetic';

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

const socials = [
  { name: "GitHub", href: "https://github.com/onetwothird" },
  { name: "LinkedIn", href: "https://linkedin.com/in/angelito-decatoria" },
  { name: "Instagram", href: "https://instagram.com/cntwxrms" },
  { name: "Facebook", href: "https://facebook.com/angelo.decatoria.5" },
];

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
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={footerStagger}
        className="w-full flex flex-col items-center"
      >
        {/* HEADLINE SECTION */}
        <motion.div variants={slideUpScale} className="w-full max-w-300 flex flex-col md:flex-row items-center md:items-start justify-between relative z-10">
          <div className="flex flex-col mb-12 md:mb-0">
            {/* First Line: Avatar + Let's work */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-24 md:h-24 relative rounded-full overflow-hidden shrink-0">
                 <Image src="/img/image.jpg" alt="Angelito" fill className="object-cover" />
              </div>
              <h2 className="text-6xl md:text-[8vw] font-medium tracking-tighter leading-none">
                Let&apos;s work
              </h2>
            </div>
            <h2 className="text-6xl md:text-[8vw] font-medium tracking-tighter leading-none mt-2 md:mt-4">
              together
            </h2>
          </div>
          <ArrowUpRight size={48} className="hidden md:block opacity-50 mt-8" />
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-300 relative mt-20 md:mt-32">
          <div className="w-full h-px bg-white/20"></div>
          
          <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20">
            <Magnetic>
              <a href="mailto:angelitodecatoriaa@gmail.com" className="w-32 h-32 md:w-44 md:h-44 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full flex items-center justify-center font-medium shadow-2xl transition-colors duration-300">
                 Get in touch
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-300 flex flex-col md:flex-row gap-4 mt-12 mb-24 relative z-10">
           <Magnetic>
             <a href="mailto:angelitodecatoriaa@gmail.com" className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-[#1C1D20] transition-colors inline-block">
               angelitodecatoriaa@gmail.com
             </a>
           </Magnetic>
           <Magnetic>
             <a href="https://www.linkedin.com/in/angelito-decatoria/" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full border border-white/20 text-sm font-medium hover:bg-white hover:text-[#1C1D20] transition-colors inline-block">
               Connect on LinkedIn
             </a>
           </Magnetic>
        </motion.div>

        <motion.div variants={fadeUp} className="w-full max-w-300 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#999D9E] font-medium uppercase tracking-widest gap-8 md:gap-0">
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
             <div className="flex gap-4 md:gap-6 flex-wrap text-white">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#8B5CF6] transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
             </div>
          </div>
        </motion.div>
      </motion.div>

    </footer>
  );
}