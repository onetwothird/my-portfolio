"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
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

export default function Certification() {
  const certifications = [
    { 
      title: "Mastering SQL Query Optimization", 
      issuer: "Gordon College - SREGEN", 
      date: "2025", 
      pdfUrl: "/cert/e-cert_1.pdf" 
    },
    { 
      title: "Artificial Intelligence & Innovation", 
      issuer: "KOENIG", 
      date: "2025", 
      pdfUrl: "/cert/e-cert_2.pdf" 
    },
    { 
      title: "Generative AI: ChatGPT to AutoGPT", 
      issuer: "NIELIT-Delhi", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_3.pdf" 
    },
    { 
      title: "Future of Containerization", 
      issuer: "Cognixia", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_4.pdf" 
    },
    { 
      title: "Software Engineering Principles", 
      issuer: "Coursera", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_5.pdf" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative max-w-350 mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#999D9E] hover:text-black dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={slideUpFade} className="text-6xl md:text-[8vw] leading-[0.85] font-medium tracking-tighter">
              Certifications.
            </motion.h1>
          </div>
          <motion.p variants={slideUpFade} className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest mt-4">
            認定資格
          </motion.p>
        </motion.div>
      </section>

      {/* List Showcase - Matching Projects & TechStack UI */}
      <section className="max-w-350 mx-auto px-6 md:px-12 py-12 md:py-24">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, amount: 0.1 }} 
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col border-t border-black/10 dark:border-white/10"
        >
          {certifications.map((cert, index) => (
            <motion.a 
              key={index}
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              variants={slideUpFade}
              className="group flex flex-col xl:flex-row justify-between items-start xl:items-center py-12 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500"
            >
              {/* Left Side: Title */}
              <div className="flex flex-col gap-3 max-w-3xl mb-8 xl:mb-0 pr-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight group-hover:opacity-50 transition-opacity duration-500 flex items-center">
                  {cert.title}
                  <ArrowUpRight size={36} className="opacity-0 group-hover:opacity-100 transition-all duration-500 -ml-4 group-hover:ml-4 text-[#8B5CF6] hidden md:block" />
                </h3>
              </div>
              
              {/* Right Side: Issuer & Year */}
              <div className="flex flex-row items-center gap-4 xl:gap-8 shrink-0">
                <span className="px-5 py-2.5 border border-black/20 dark:border-white/20 rounded-full text-xs font-bold font-mono uppercase bg-transparent text-[#1C1D20] dark:text-[#ededed] group-hover:bg-[#1C1D20] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-[#1C1D20] transition-colors duration-300">
                  {cert.issuer}
                </span>
                <span className="text-sm font-medium opacity-60 font-mono w-12 text-right">
                  {cert.date}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
      
    </div>
  );
}