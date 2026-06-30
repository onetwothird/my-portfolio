"use client";

import { motion, Variants } from 'framer-motion';

// Snellenberg's signature cubic-bezier easing
const slideUp: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { 
    opacity: 1, 
    y: "0%", 
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
};

export default function About() {
  const coreValues = [
    { num: "01.", title: "Structural Ecosystems", desc: "Specializing in building structural, high-fidelity web ecosystems." },
    { num: "02.", title: "Practical Execution", desc: "Engineered solutions locally, from OS simulators to corporate document tracking systems." },
    { num: "03.", title: "Intelligent Integration", desc: "Integrating YOLO and TensorFlow Lite tools natively into mobile ecosystems." }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-350 mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
      <div className="text-sm font-medium uppercase tracking-widest text-[#999D9E] shrink-0">About me</div>
      <div className="flex-1">
        
        {/* Masked Text Reveal */}
        <div className="text-3xl md:text-5xl font-medium leading-tight tracking-tight mb-16">
          <div className="overflow-hidden mb-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={slideUp}>
              Specializing in building structural,
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={slideUp}>
              high-fidelity web ecosystems alongside
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={slideUp}>
              intelligent mobile applications using
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={slideUp}>
              Flutter and YOLOv8.
            </motion.div>
          </div>
        </div>
        
        {/* Staggered Fade Up */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10%" }} 
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-black/10 dark:border-white/10"
        >
          {coreValues.map((val, idx) => (
            <motion.div key={idx} variants={fadeUp} className="group">
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