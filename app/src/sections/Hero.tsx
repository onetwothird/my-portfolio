"use client";

import { motion, Variants } from 'framer-motion';
import { Globe, ArrowUpRight } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 relative">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={stagger} className="w-full max-w-400 mx-auto flex flex-col items-start mt-auto">
        
        <motion.div variants={revealUp} className="flex items-center gap-4 bg-[#1C1D20] text-white dark:bg-white dark:text-[#1C1D20] px-5 py-3 rounded-full mb-12 shadow-lg">
          <div className="flex flex-col text-xs font-medium leading-tight">
            <span>Located</span>
            <span>in the Naic, Cavite (PH)</span>
          </div>
          <div className="bg-white/20 dark:bg-black/10 p-2 rounded-full">
            <Globe size={18} />
          </div>
        </motion.div>

        <div className="overflow-hidden w-full pb-[4vw] mb-[-4vw]">
          <motion.h1 variants={revealUp} className="text-[clamp(4rem,14vw,12rem)] leading-[0.9] font-medium tracking-tighter">
            Angelito
          </motion.h1>
        </div>
        <div className="overflow-hidden w-full flex justify-end pb-[4vw] mb-[-4vw]">
          <motion.h1 variants={revealUp} className="text-[16vw] lg:text-[14vw] leading-[0.9] font-medium tracking-tighter">
            Decatoria III
          </motion.h1>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={revealUp} className="w-full max-w-400 mx-auto flex justify-between items-end mt-24 text-lg md:text-2xl font-medium text-[#999D9E]">
        <p className="max-w-xs">Full Stack Developer &<br/>Computer Science Student.</p>
        <Magnetic>
           <ArrowUpRight size={48} className="hidden md:block opacity-50 hover:text-black dark:hover:text-white hover:opacity-100 transition-colors cursor-pointer" />
        </Magnetic>
      </motion.div>
    </section>
  );
}