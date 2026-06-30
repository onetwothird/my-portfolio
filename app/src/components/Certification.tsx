"use client";

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
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

export default function Certification() {
  const certifications = [
    { title: "Mastering SQL Query Optimization", issuer: "Gordon College - SREGEN", date: "2025", pdfUrl: "/cert/e-cert_1.pdf" },
    { title: "Artificial Intelligence & Innovation", issuer: "KOENIG", date: "2025", pdfUrl: "/cert/e-cert_2.pdf" },
    { title: "Generative AI: ChatGPT to AutoGPT", issuer: "NIELIT-Delhi", date: "2024", pdfUrl: "/cert/e-cert_3.pdf" },
    { title: "Future of Containerization", issuer: "Cognixia", date: "2024", pdfUrl: "/cert/e-cert_4.pdf" },
    { title: "Software Engineering Principles", issuer: "Coursera", date: "2024", pdfUrl: "/cert/e-cert_5.pdf" }
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
              Certifications.
            </motion.h1>
          </div>
          <motion.p variants={revealUp} className="font-mono text-xs text-gray-500 font-bold uppercase tracking-widest mt-4">
            認定資格
          </motion.p>
        </motion.div>
      </section>

      {/* Clean List View */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
        {certifications.map((cert, index) => (
          <motion.a 
            href={cert.pdfUrl}
            target="_blank"
            rel="noreferrer"
            key={index}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={revealUp}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-8 transition-all duration-300 w-full rounded-sm hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="flex-1">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300">
                {cert.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 transition-transform duration-300">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-gray-500">
                  {cert.issuer}
                </span>
                <span className="w-1 h-1 bg-black/30 dark:bg-white/30 rounded-full" />
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-gray-500">
                  {cert.date}
                </span>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 flex items-center justify-center p-4 border border-black/20 dark:border-white/20 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-full transition-colors duration-300 shrink-0">
              <ExternalLink size={20} />
            </div>
          </motion.a>
        ))}
      </section>
      
    </div>
  );
}