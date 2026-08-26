"use client";

import { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Globe, ArrowDownLeft, ArrowDownRight, Download } from 'lucide-react';
import Image from 'next/image';
import Magnetic from '../components/Magnetic';
import LiveVisitorCount from '../components/LiveVisitorCount';
import TriviaChallenge from '../components/TriviaChallenge';
import { useSound } from '../components/SoundProvider';
import { Tape, caveat } from '../components/Scrapbook';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero() {
  const { playHover, playClick } = useSound();

  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [triviaStep, setTriviaStep] = useState<"intro" | "solved">("intro");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSolve = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setTriviaStep("solved");
    }, 2500);
  };

  return (
    <section className="min-h-dvh w-full flex flex-col justify-between lg:block relative overflow-hidden bg-[#ababab]">

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              y: "-100%",
              borderBottomLeftRadius: "30%",
              borderBottomRightRadius: "30%",
            }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100000 bg-[#1C1D20] flex flex-col items-center justify-center text-white overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-4 sm:gap-6 px-6 text-center"
            >
              <span className="text-[#999D9E] text-xs md:text-sm font-mono tracking-widest uppercase">
                The change featured is
              </span>
              <span className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight">
                Marquee Overridden
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-20 sm:top-24 left-4 md:left-8 z-50 pointer-events-auto">
        <Magnetic>
          <button
            onClick={() => { setIsChallengeOpen(true); playClick(); }}
            onMouseEnter={playHover}
            className="group flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/10 bg-[#1C1D20] text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] shadow-xl"
          >
            <span className="text-sm font-mono opacity-70 group-hover:opacity-100 transition-opacity">&gt;_</span>
            <span className="text-xs font-medium tracking-widest uppercase mt-0.5">Test Skills</span>
          </button>
        </Magnetic>
      </div>

      <TriviaChallenge
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
        onSolve={handleSolve}
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] sm:w-[130vw] md:w-[110vw] lg:w-screen h-[78dvh] sm:h-[85dvh] lg:h-[95vh] pointer-events-none z-0"
      >
        <Image
          src="/img/cover-photos.png"
          alt="Angelito Portrait"
          fill
          className="object-contain object-bottom"
          priority
          quality={100}
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealUp}
        className="order-1 self-start relative lg:absolute z-30 w-[clamp(200px,60vw,340px)]
                   ml-4 sm:ml-8 mt-36 sm:mt-40
                   lg:ml-0 lg:mt-0 lg:left-8 xl:left-14 lg:top-[42%] lg:-translate-y-1/2"
      >
        <div className="flex flex-col items-start gap-3 sm:gap-4">
          <div className="pointer-events-auto">
            <LiveVisitorCount />
          </div>

          <div className="border-l-[3px] border-white/40 pl-3 sm:pl-5 w-full">
            <h2 className="text-white/90 font-medium text-[clamp(0.75rem,1.8vw,1.05rem)] leading-[1.4] tracking-wide">
              DESIGNING STRUCTURED INTERFACES BUILT FOR SCALE AND REAL-WORLD IMPACT.
            </h2>
          </div>
        </div>
      </motion.div>

      <div
        className="order-2 flex-1 min-h-0 relative w-full flex items-center overflow-hidden pointer-events-none z-10 my-auto
                   lg:flex-none lg:block lg:absolute lg:top-[85%] lg:-translate-y-1/2"
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 22
          }}
        >
          <div className="flex gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-8 items-center">
            <h1 className={`text-[clamp(2.75rem,12vw,4.5rem)] sm:text-[clamp(3.25rem,13vw,6rem)] lg:text-[clamp(4rem,10vw,9rem)] xl:text-[clamp(4.5rem,12vw,14rem)] leading-none tracking-tighter pb-3 sm:pb-4 lg:pb-8 transition-all duration-1000 ${triviaStep === "solved" ? 'font-mono text-[#1C1D20] drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]' : 'font-medium text-white opacity-90'}`}>
              {triviaStep === "solved" ? "Angelito Decatoria III — [OVERRIDE] —" : "Angelito Decatoria III —"}
            </h1>
          </div>
          <div className="flex gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-8 items-center">
            <h1 className={`text-[clamp(2.75rem,12vw,4.5rem)] sm:text-[clamp(3.25rem,13vw,6rem)] lg:text-[clamp(4rem,10vw,9rem)] xl:text-[clamp(4.5rem,12vw,14rem)] leading-none tracking-tighter pb-3 sm:pb-4 lg:pb-8 transition-all duration-1000 ${triviaStep === "solved" ? 'font-mono text-[#1C1D20] drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)]' : 'font-medium text-white opacity-90'}`}>
              {triviaStep === "solved" ? "Angelito Decatoria III — [OVERRIDE] —" : "Angelito Decatoria III —"}
            </h1>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealUp}
        className="absolute right-4 xl:right-28 top-[42%] -translate-y-1/2 hidden lg:flex flex-col items-end gap-4 xl:gap-6 z-30 max-w-[38vw] xl:max-w-none"
      >
        <div className="flex items-center gap-3 xl:gap-4 text-white">
          <div className="leading-[1.2] drop-shadow-sm font-light tracking-wide text-right flex flex-col items-end">
            <div className="flex items-center gap-3">
              <span className="text-xl lg:text-2xl xl:text-3xl font-medium">Full Stack Developer</span>
            </div>
            <span className="text-base lg:text-lg xl:text-xl opacity-80">& CS Student</span>
          </div>
          <div className="w-fit mb-6" onMouseEnter={playHover}>
            <Magnetic>
               <ArrowDownLeft size={28} strokeWidth={1.5} className="opacity-70 hover:opacity-100 transition-colors cursor-pointer drop-shadow-sm rotate-45 pointer-events-auto" />
            </Magnetic>
          </div>
        </div>

        <div className="relative">
          <span className={`${caveat.className} hidden xl:block absolute top-1/2 -translate-y-1/2 -left-32 text-white/70 text-lg rotate-[-4deg] whitespace-nowrap pointer-events-none`}>
            grab a copy →
          </span>
          <Tape inverted className="w-12 h-5 -top-2.5 -right-3" rotate={-12} />
          <Magnetic>
            <a
              href="/resume/Decatoria-Angelito_Resume.pdf"
              download="Decatoria-Angelito_Resume.pdf"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex items-center gap-3 px-5 xl:px-6 py-2.5 xl:py-3 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white transition-all duration-500 hover:bg-white hover:text-black pointer-events-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <span className="text-sm font-medium tracking-widest uppercase">Resume</span>
              <Download size={16} strokeWidth={2} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <div className="order-3 lg:hidden relative px-6 sm:px-8 pb-8 sm:pb-12 pt-4 flex justify-between items-end gap-4 z-30 text-white drop-shadow-md pointer-events-none">
        <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
          <ArrowDownRight size={22} strokeWidth={1.5} className="opacity-90 shrink-0 sm:hidden" />
          <ArrowDownRight size={24} strokeWidth={1.5} className="opacity-90 shrink-0 hidden sm:block" />
          <div className="text-base sm:text-lg md:text-xl font-medium leading-[1.15] tracking-tight">
            <p>Full Stack Developer</p>
            <p>& CS Student</p>
          </div>

          <Magnetic>
            <a
              href="/resume/Decatoria-Angelito_Resume.pdf"
              download="Decatoria-Angelito_Resume.pdf"
              onClick={playClick}
              className="group flex w-fit items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white transition-all duration-300 pointer-events-auto active:bg-white active:text-black"
            >
              <span className="text-xs font-medium tracking-widest uppercase">Resume</span>
              <Download size={14} strokeWidth={2} />
            </a>
          </Magnetic>
        </div>
        <div className="pb-1 shrink-0">
          <Globe size={28} strokeWidth={1.5} className="opacity-90 sm:hidden" />
          <Globe size={32} strokeWidth={1.5} className="opacity-90 hidden sm:block" />
        </div>
      </div>

    </section>
  );
}