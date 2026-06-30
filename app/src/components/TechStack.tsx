"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function TechStack() {
  const categories = [
    {
      title: "1. Frontend & Mobile",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Flutter SDK", "Dart"]
    },
    {
      title: "2. Backend & DB",
      items: ["Node.js", "Python", "PHP", "MySQL", "Firebase", "REST APIs"]
    },
    {
      title: "3. Tools & Platforms",
      items: ["Git", "GitHub", "Figma", "Vercel", "Render", "Cloudinary"]
    },
    {
      title: "4. AI / Machine Learning",
      items: ["TensorFlow Lite", "YOLOv8", "YOLOv11", "Label Studio", "Roboflow", "Google Colab"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed] font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative border-b border-black/10 dark:border-white/10">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={revealUp} className="text-5xl md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter">
              Tech Stack.
            </motion.h1>
          </div>
          <motion.p variants={revealUp} className="font-mono text-xs text-gray-500 font-bold uppercase tracking-widest mt-4">
            私の技術スタック
          </motion.p>
        </motion.div>
      </section>

      {/* Stack List - Clean Version matching screenshot */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 space-y-16 md:space-y-24">
        {categories.map((category, index) => (
          <motion.div 
            key={index}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={revealUp}
            className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-start"
          >
            <h3 className="text-lg font-black uppercase tracking-widest pt-2">
              {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 md:gap-3">
              {category.items.map((tech, techIndex) => (
                <span 
                  key={techIndex} 
                  className="px-4 py-2 border border-black/10 dark:border-white/10 text-xs font-bold font-mono uppercase bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </section>
      
    </div>
  );
}