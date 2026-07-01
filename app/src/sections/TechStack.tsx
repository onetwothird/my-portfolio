"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } 
  }
};

export default function TechStack() {
  const techStack = [
    { title: "1. Frontend & Mobile", items: ['JavaScript', 'Dart', 'React.js', 'Next.js', 'HTML5', 'CSS3', 'Flutter SDK'] },
    { title: "2. Backend & DB", items: ['Node.js', 'Python', 'PHP', 'MySQL', 'Firebase', 'REST APIs'] },
    { title: "3. AI & Tools", items: ['TensorFlow Lite', 'YOLO', 'Roboflow', 'Label Studio', 'Git', 'VS Code'] }
  ];

  return (
    <section id="techstack" className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10">
      
      {/* Top Grid for Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={revealUp}>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter">Techstack.</h2>
          <p className="font-mono text-xs text-[#999D9E] mt-4">私の技術スタック</p>
        </motion.div>
        
        <div className="flex flex-col gap-12">
          {techStack.map((stack, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={revealUp} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start border-b md:border-none border-black/5 dark:border-white/5 pb-8 md:pb-0 last:border-none last:pb-0">
              <h3 className="text-sm font-bold uppercase tracking-widest pt-2 text-[#999D9E]">{stack.title}</h3>
              <div className="flex flex-wrap gap-2">
                {stack.items.map(t => (
                  <span key={t} className="px-4 py-2 border border-black/10 dark:border-white/10 text-xs font-bold font-mono uppercase rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.1 }} variants={slideUpFade}
        className="flex justify-center mt-24"
      >
         <Link href="/tech-stack" className="px-8 py-4 rounded-full border border-black/20 dark:border-white/20 text-sm font-medium hover:bg-[#1C1D20] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1D20] transition-colors duration-300">
           More tech stack
         </Link>
      </motion.div>

    </section>
  );
}