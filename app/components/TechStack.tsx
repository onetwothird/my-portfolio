"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function TechStack() {
  const categories = [
    {
      title: "Frontend & Mobile",
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Flutter SDK", "Dart"]
    },
    {
      title: "Backend & DB",
      items: ["Node.js", "Python", "PHP", "MySQL", "Firebase", "REST APIs"]
    },
    {
      title: "Tools & Platforms",
      items: ["Git", "GitHub", "Figma", "Vercel", "Render", "Cloudinary"]
    },
    {
      title: "AI & Machine Learning",
      items: ["TensorFlow Lite", "YOLOv8", "YOLOv11", "Label Studio", "Roboflow", "Google Colab"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white pb-24">
      
      {/* Header Section */}
      <section className="pt-32 pb-8 px-6 md:px-12 relative max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#999D9E] hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={slideUpFade} className="text-6xl md:text-[8vw] leading-[0.85] font-medium tracking-tighter">
              Tech Stack.
            </motion.h1>
          </div>
          
          <motion.div variants={slideUpFade} className="flex items-center gap-4 mt-4">
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest shrink-0">
              私の技術スタック
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest shrink-0">
              {String(categories.length).padStart(2, '0')} Categories
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col border-t border-black/10 dark:border-white/10"
        >
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              variants={slideUpFade}
              className="group flex flex-col xl:flex-row justify-between items-start xl:items-center py-12 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight group-hover:opacity-50 transition-opacity duration-500 mb-8 xl:mb-0">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-2 md:gap-3 xl:max-w-xl xl:justify-end">
                {category.items.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-5 py-2.5 border border-black/20 dark:border-white/20 rounded-full text-xs font-bold font-mono uppercase bg-transparent hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
    </div>
  );
}