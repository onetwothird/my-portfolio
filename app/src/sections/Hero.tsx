"use client";

import { motion, Variants } from 'framer-motion';
import { Globe, ArrowDownLeft, ArrowDownRight } from 'lucide-react';
import Image from 'next/image';
import Magnetic from '../components/Magnetic';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  return (
    <section className="min-h-dvh w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-[#ababab]">
      
      {/* PORTRAIT MULTIMEDIA CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] md:w-full h-[95vh] pointer-events-none z-0"
      >
        <Image 
          src="/img/cover1.png" 
          alt="Angelito Portrait" 
          fill 
          className="object-contain object-bottom" 
          priority
          quality={100}
          sizes="100vw"
        />
      </motion.div>

      {/* INFINITE MARQUEE BACKGROUND TEXT */}
      <div className="absolute top-[65%] lg:top-[85%] -translate-y-1/2 left-0 w-full overflow-hidden flex whitespace-nowrap z-10 pointer-events-none">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          <div className="flex gap-16 px-8 items-center">
            <h1 className="text-[clamp(6rem,18vw,16rem)] leading-none font-medium tracking-tighter text-white opacity-90 pb-8">
              Angelito Decatoria III —
            </h1>
          </div>
          <div className="flex gap-16 px-8 items-center">
            <h1 className="text-[clamp(6rem,18vw,16rem)] leading-none font-medium tracking-tighter text-white opacity-90 pb-8">
              Angelito Decatoria III —
            </h1>
          </div>
        </motion.div>
      </div>

      {/* RESPONSIVE: MIDDLE-LEFT BADGE */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={revealUp} 
        className="absolute left-6 xl:left-12 top-[15%] md:top-[25%] lg:top-1/2 -translate-y-1/2 z-30 w-[80%] max-w-[260px] md:max-w-[320px]"
      >
        <div className="flex flex-col items-start gap-4">
          <div className="bg-white p-4 md:p-5 w-full shadow-lg">
            <h2 className="text-black font-extrabold text-[0.95rem] md:text-[1.2rem] uppercase leading-[1.15] md:leading-[1.1] tracking-tighter">
              DESIGNING STRUCTURED INTERFACES BUILT FOR SCALE AND REAL-WORLD IMPACT.
            </h2>
          </div>
        </div>
      </motion.div>

      {/* DESKTOP: MIDDLE-RIGHT DESCRIPTION BLOCK */}
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={revealUp} 
        className="absolute right-6 xl:right-40 top-[45%] -translate-y-1/2 hidden lg:flex items-center gap-4 text-white z-30"
      >
        <div className="leading-[1.2] drop-shadow-sm font-light tracking-wide text-right flex flex-col items-end">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-medium">Full Stack Developer</span>
          </div>
          <span className="text-lg md:text-xl opacity-80">& CS Student</span>
        </div>
        <div className="w-fit mb-6">
          <Magnetic>
             {/* Using ArrowDownLeft and rotating it slightly to match the reference arrow pointing left */}
             <ArrowDownLeft size={28} strokeWidth={1.5} className="opacity-70 hover:opacity-100 transition-colors cursor-pointer drop-shadow-sm rotate-45" />
          </Magnetic>
        </div>
      </motion.div>

      {/* MOBILE & TABLET OVERLAY */}
      <div className="lg:hidden absolute bottom-8 left-6 right-6 flex justify-between items-end z-30 text-white drop-shadow-md">
        <div className="flex flex-col gap-6">
          <ArrowDownRight size={24} strokeWidth={1.5} className="opacity-90" />
          <div className="text-xl font-medium leading-[1.1] tracking-tight">
            <p>Full Stack Developer</p>
            <p>& CS Student</p>
          </div>
        </div>
        <div className="pb-1">
          <Globe size={32} strokeWidth={1.5} className="opacity-90" />
        </div>
      </div>

    </section>
  );
}