"use client";

import { motion, Variants } from 'framer-motion';
// Make sure this import path matches your project structure
import { ThemeToggle } from '../components/ThemeToggle';

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
    transition: { staggerChildren: 0.15 } 
  }
};

const textStagger = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.1 } 
  }
};

export default function About() {
  const coreValues = [
    { num: "01.", title: "Structural Ecosystems", desc: "Specializing in building structural, high-fidelity web ecosystems." },
    { num: "02.", title: "Practical Execution", desc: "Engineered solutions locally, from OS simulators to corporate document tracking systems." },
    { num: "03.", title: "Intelligent Integration", desc: "Integrating YOLO and TensorFlow Lite tools natively into mobile ecosystems." }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 relative">
      
      {/* 
        THEME TOGGLE
        Absolutely positioned to the top-right of the section padding.
        This horizontally aligns it with the "About me" text.
      */}
      <div className="absolute top-32 right-6 md:right-12 z-10">
        <div className="bg-black/5 dark:bg-white/10 p-2 rounded-full hover:scale-110 transition-transform duration-300">
          <ThemeToggle />
        </div>
      </div>

      {/* Left Column - Added pt-2 so its baseline aligns with the padded button */}
      <div className="text-sm font-medium uppercase tracking-widest text-[#999D9E] shrink-0 pt-2">
        About me
      </div>
      
      <div className="flex-1 mt-4 md:mt-0">
        
        {/* The Specializing text block */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={textStagger}
          className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mb-16"
        >
          <div className="overflow-hidden mb-2">
            <motion.div variants={slideUpFade}>
              Specializing in building structural,
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div variants={slideUpFade}>
              high-fidelity web ecosystems alongside
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div variants={slideUpFade}>
              intelligent mobile applications using
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div variants={slideUpFade}>
              Flutter and YOLOv8.
            </motion.div>
          </div>
        </motion.div>
        
        {/* Core Values Grid */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-black/10 dark:border-white/10"
        >
          {coreValues.map((val, idx) => (
            <motion.div key={idx} variants={slideUpFade} className="group">
              <div className="font-mono text-sm text-[#999D9E] font-bold mb-8 border-b border-black/10 dark:border-white/10 pb-4">{val.num}</div>
              <h3 className="text-xl font-medium tracking-tight mb-4">{val.title}</h3>
              <p className="text-sm text-[#999D9E] leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}