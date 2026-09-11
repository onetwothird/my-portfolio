"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ThemeToggle } from '../shared/ThemeToggle';
import { SoundToggle } from '../shared/SoundToggle';
import { Tape, DoodleArrow, DoodleCircle, Sticker, GridPaper, caveat } from '../shared/Scrapbook';

export default function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative flex flex-col">
      
      <div className="flex justify-between items-start mb-4 md:mb-12 z-30 relative w-full">
        <div className="relative inline-block">
          <Tape className="w-10 h-4 sm:w-12 sm:h-5 -top-2 -left-3" rotate={-8} />
          <div className="relative text-xs font-medium text-[#999D9E] uppercase tracking-widest">
            About Me
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer">
            <SoundToggle />
          </div>
          <div className="bg-black/5 dark:bg-white/10 backdrop-blur-md w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center justify-center z-10 min-h-125 md:min-h-175 mt-8">

        <GridPaper />

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-10 pointer-events-none z-0 overflow-hidden">
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-3 md:mb-5"
        >
          <Sticker rotate={-3} className="px-5 py-2">
            <span className={`${caveat.className} text-base sm:text-lg md:text-xl leading-none text-[#1C1D20] dark:text-white`}>
              Hey, I&apos;m Angelito
            </span>
          </Sticker>
          <DoodleArrow className="hidden md:block absolute top-full left-[66%] w-14 h-10 -mt-1 rotate-95" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 h-75 sm:h-100 md:h-125 lg:h-150 rotate-[-1.5deg]"
        >
          <Tape className="w-14 h-6 sm:w-16 sm:h-7 -top-3 -left-5 sm:-left-6" rotate={-20} />
          <Tape className="w-14 h-6 sm:w-16 sm:h-7 -top-3 -right-5 sm:-right-6" rotate={18} />

          <div className="h-full flex items-end justify-center p-2 sm:p-3 bg-white/60 dark:bg-white/4 backdrop-blur-[1px] border border-black/10 dark:border-white/15 shadow-2xl">
            <Image
              src="/img/about-photos.png"
              alt="Angelito P. Decatoria III"
              width={800}
              height={1200}
              className="h-full w-auto object-contain object-bottom"
            />
          </div>

          <span className={`${caveat.className} pointer-events-none absolute -bottom-4 sm:-bottom-7 right-0 sm:right-2 text-sm sm:text-base md:text-lg text-[#1C1D20]/70 dark:text-white/70 -rotate-2 whitespace-nowrap`}>
            building things since 2022
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-[5%] md:top-[15%] left-0 md:left-[5%] lg:left-[10%] z-20 w-40 md:w-62.5 lg:w-70"
        >
          <div className="relative -rotate-2 border border-dashed border-black/15 dark:border-white/20 bg-white/50 dark:bg-white/3 backdrop-blur-[1px] px-3 py-3 md:px-4 md:py-4">
            <Tape className="w-10 h-4 md:w-12 md:h-5 -top-2 left-4" rotate={-6} />
            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3">
              <span className="relative inline-flex items-center justify-center text-[10px] md:text-xs font-mono text-[#999D9E]">
                <DoodleCircle className="absolute -inset-x-1.5 -inset-y-1 w-[calc(100%+12px)] h-[calc(100%+8px)] -z-10" />
                01
              </span>
              <div className="h-px w-4 md:w-8 bg-black/20 dark:bg-white/20"></div>
              <h3 className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider">CS Undergraduate</h3>
            </div>
            <p className="text-xs md:text-sm text-[#999D9E] leading-relaxed hidden md:block">
              Specializing in architecting scalable web platforms and intelligent mobile ecosystems with React and Flutter.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute top-[40%] md:top-[45%] right-0 md:right-[2%] lg:right-[5%] z-20 w-40 md:w-62.5 lg:w-70"
        >
          <div className="relative rotate-2 border border-dashed border-black/15 dark:border-white/20 bg-white/50 dark:bg-white/3 backdrop-blur-[1px] px-3 py-3 md:px-4 md:py-4">
            <Tape className="w-10 h-4 md:w-12 md:h-5 -top-2 right-4" rotate={7} />
            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3 justify-end md:justify-start">
              <span className="relative inline-flex items-center justify-center text-[10px] md:text-xs font-mono text-[#999D9E] md:order-1">
                <DoodleCircle className="absolute -inset-x-1.5 -inset-y-1 w-[calc(100%+12px)] h-[calc(100%+8px)] -z-10" />
                02
              </span>
              <div className="h-px w-4 md:w-8 bg-black/20 dark:bg-white/20 md:order-2"></div>
              <h3 className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider md:order-3 text-right md:text-left">Full-Stack Architect</h3>
            </div>
            <p className="text-xs md:text-sm text-[#999D9E] leading-relaxed text-right md:text-left hidden md:block">
              Developing robust administrative dashboards and seamless web portals using React.js, supported by optimized Firebase backend services.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-[5%] md:bottom-[15%] left-0 md:left-[5%] lg:left-[10%] z-20 w-40 md:w-62.5 lg:w-70"
        >
          <div className="relative rotate-[-1.5deg] border border-dashed border-black/15 dark:border-white/20 bg-white/50 dark:bg-white/3 backdrop-blur-[1px] px-3 py-3 md:px-4 md:py-4">
            <Tape className="w-10 h-4 md:w-12 md:h-5 -top-2 left-4" rotate={-5} />
            <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-3">
              <span className="relative inline-flex items-center justify-center text-[10px] md:text-xs font-mono text-[#999D9E]">
                <DoodleCircle className="absolute -inset-x-1.5 -inset-y-1 w-[calc(100%+12px)] h-[calc(100%+8px)] -z-10" />
                03
              </span>
              <div className="h-px w-4 md:w-8 bg-black/20 dark:bg-white/20"></div>
              <h3 className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider">Machine Learning</h3>
            </div>
            <p className="text-xs md:text-sm text-[#999D9E] leading-relaxed hidden md:block">
              Designing and training custom object recognition models utilizing YOLO and TensorFlow Lite for real-time mobile environments.
            </p>
          </div>
        </motion.div>

        <div className="absolute top-[30%] left-[35%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/20 dark:bg-white/20 z-0 hidden md:block"></div>
        <div className="absolute bottom-[35%] right-[30%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black/20 dark:bg-white/20 z-0 hidden md:block"></div>

      </div>
    </section>
  );
}