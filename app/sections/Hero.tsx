"use client";

import { motion, Variants } from 'framer-motion';
import { Globe, ArrowDownLeft, ArrowDownRight, Download } from 'lucide-react';
import Image from 'next/image';
import Magnetic from '../components/Magnetic';
import LiveVisitorCount from '../components/LiveVisitorCount';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  return (
    <section className="min-h-dvh w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-[#ababab]">
      
      <motion.div 
        initial={{ opacity: 0, y: 100 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[95vh] pointer-events-none z-0"
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

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={revealUp} 
        className="absolute left-4 sm:left-6 xl:left-12 top-20 sm:top-24 md:top-28 lg:top-1/2 lg:-translate-y-1/2 z-30 w-[clamp(160px,45vw,320px)]"
      >
        <div className="flex flex-col items-start gap-4">
          
          <div className="pointer-events-auto">
            <LiveVisitorCount />
          </div>

          <div className="bg-white p-3 sm:p-4 md:p-5 w-full shadow-lg">
            <h2 className="text-black font-extrabold text-[clamp(0.7rem,2.5vw,1.2rem)] uppercase leading-[1.2] tracking-tighter">
              DESIGNING STRUCTURED INTERFACES BUILT FOR SCALE AND REAL-WORLD IMPACT.
            </h2>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.1 }} 
        variants={revealUp} 
        className="absolute right-6 xl:right-40 top-[45%] -translate-y-1/2 hidden lg:flex flex-col items-end gap-6 z-30"
      >
        <div className="flex items-center gap-4 text-white">
          <div className="leading-[1.2] drop-shadow-sm font-light tracking-wide text-right flex flex-col items-end">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-medium">Full Stack Developer</span>
            </div>
            <span className="text-lg md:text-xl opacity-80">& CS Student</span>
          </div>
          <div className="w-fit mb-6">
            <Magnetic>
               <ArrowDownLeft size={28} strokeWidth={1.5} className="opacity-70 hover:opacity-100 transition-colors cursor-pointer drop-shadow-sm rotate-45 pointer-events-auto" />
            </Magnetic>
          </div>
        </div>

        <Magnetic>
          <a 
            href="/resume/Decatoria_Angelito_CV.pdf" 
            download="Decatoria_Angelito_CV.pdf"
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white transition-all duration-500 hover:bg-white hover:text-black pointer-events-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="text-sm font-medium tracking-widest uppercase">Resume</span>
            <Download size={16} strokeWidth={2} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Magnetic>
      </motion.div>

      <div className="lg:hidden absolute bottom-8 left-6 right-6 flex justify-between items-end z-30 text-white drop-shadow-md pointer-events-none">
        <div className="flex flex-col gap-5">
          <ArrowDownRight size={24} strokeWidth={1.5} className="opacity-90" />
          <div className="text-xl font-medium leading-[1.1] tracking-tight">
            <p>Full Stack Developer</p>
            <p>& CS Student</p>
          </div>
          
          <Magnetic>
            <a 
              href="/resume/Decatoria_Angelito_CV.pdf" 
              download="Decatoria_Angelito_CV.pdf"
              className="group flex w-fit items-center gap-2 px-5 py-2.5 mt-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white transition-all duration-300 pointer-events-auto active:bg-white active:text-black"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Resume</span>
              <Download size={14} strokeWidth={2} />
            </a>
          </Magnetic>
        </div>
        <div className="pb-1">
          <Globe size={32} strokeWidth={1.5} className="opacity-90" />
        </div>
      </div>

    </section>
  );
}