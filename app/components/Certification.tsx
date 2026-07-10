"use client";

import Link from 'next/link';
import Image from 'next/image';
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

export default function Certification() {
  const certifications = [
    { 
      title: "Prompt to Persona: Building Your AI Twin for the Digital Age", 
      issuer: "DICT Region 3", 
      date: "2026", 
      pdfUrl: "/cert/e-cert_6.pdf",
      imageUrl: "/cert/e-cert_6.png"
    },
    { 
      title: "Mastering SQL Query Optimization", 
      issuer: "Gordon College - SREGEN", 
      date: "2025", 
      pdfUrl: "/cert/e-cert_1.pdf",
      imageUrl: "/cert/e-cert_1.png"
    },
    { 
      title: "Artificial Intelligence & Innovation", 
      issuer: "KOENIG", 
      date: "2025", 
      pdfUrl: "/cert/e-cert_2.pdf",
      imageUrl: "/cert/e-cert_2.png"
    },
    { 
      title: "Generative AI: ChatGPT to AutoGPT", 
      issuer: "NIELIT-Delhi", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_3.pdf",
      imageUrl: "/cert/e-cert_3.png"
    },
    { 
      title: "Future of Containerization", 
      issuer: "Cognixia", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_4.pdf",
      imageUrl: "/cert/e-cert_4.png"
    },
    { 
      title: "Software Engineering Principles", 
      issuer: "Coursera", 
      date: "2024", 
      pdfUrl: "/cert/e-cert_5.pdf",
      imageUrl: "/cert/e-cert_5.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white pb-24">
      
      <section className="pt-32 pb-8 px-6 md:px-12 relative max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#999D9E] hover:text-black dark:hover:text-white transition-colors mb-12 group z-10 relative"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={slideUpFade} className="text-6xl md:text-[8vw] leading-[0.85] font-medium tracking-tighter">
              Certifications.
            </motion.h1>
          </div>
          <motion.div variants={slideUpFade} className="flex items-center gap-4 mt-4">
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              認定資格
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              {String(certifications.length).padStart(2, '0')} Certificates
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {certifications.map((cert, i) => (
            <motion.a 
              key={i} 
              href={cert.pdfUrl}
              target="_blank"
              rel="noreferrer"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
              className={`group w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm block bg-white dark:bg-[#1A1A1A] ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Image 
                src={cert.imageUrl} 
                alt={`${cert.title} Certificate`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-2 max-w-[70%]">
                    <h3 className="text-white text-2xl md:text-3xl font-medium tracking-tight">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-xs font-mono font-bold tracking-widest block mb-1">
                      {cert.date}
                    </span>
                    <span className="text-white/70 text-xs font-mono uppercase tracking-widest">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <span className="text-white text-lg leading-none -mt-0.5">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
      
    </div>
  );
}