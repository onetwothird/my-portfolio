"use client";

import Link from 'next/link';
import Image from 'next/image';
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

export default function Projects() {
  const projects = [
    {
      title: "Seelai AI Assistant",
      category: "Thesis Project",
      year: "2026",
      description: "Mobile application for the partially sighted. Integrates real-time object detection via YOLO and TensorFlow Lite.",
      imageUrl: "/projects/seelai-preview.png", 
      projectUrl: "https://seelai-docs.vercel.app",
    },
    {
      title: "AlgoVerse Simulator",
      category: "OS Project",
      year: "2025",
      description: "Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes.",
      imageUrl: "/projects/AlgoVerse.png",
      projectUrl: "https://onetwothird.page.gd/",
    },
    {
      title: "ODCI Doc Tracker",
      category: "OJT Project",
      year: "2025",
      description: "Centralized role-based document tracking system engineered collaboratively.",
      imageUrl: "/projects/odci.png",
      projectUrl: "https://odci.page.gd/",
    },
    {
      title: "Jayann's Store",
      category: "E-Commerce",
      year: "2025",
      description: "Full-stack web-based Point of Sale platform that also functions as a customer-facing e-commerce site.",
      imageUrl: "/projects/jayann_store.png",
      projectUrl: "https://jayann-store.page.gd/",
    },
    {
      title: "Seelai Admin",
      category: "Web Platform",
      year: "2026",
      description: "Super admin web interface for the Seelai ecosystem, designed to facilitate machine learning model training.",
      imageUrl: "/projects/seelai_dashboard.png",
      projectUrl: "https://supeadmin-modeltraining-website.vercel.app",
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#171717] dark:text-[#ededed] font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={revealUp} className="text-5xl md:text-[8vw] leading-[0.85] font-black uppercase tracking-tighter">
              Featured Works.
            </motion.h1>
          </div>
          <motion.p variants={revealUp} className="font-mono text-xs text-gray-500 font-bold uppercase tracking-widest mt-4">
            注目のプロジェクト
          </motion.p>
        </motion.div>
      </section>

      {/* Grid Showcase - Hover Reveal Effect */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-24 max-w-400 mx-auto">
        {projects.map((project, index) => {
          const isSeelai = project.title.includes("Seelai");
          
          return (
            <motion.a 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }} 
              variants={revealUp}
              key={index} 
              href={project.projectUrl}
              target={project.projectUrl !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className="group block relative w-full aspect-4/3 md:aspect-video overflow-hidden bg-black/5 dark:bg-white/5 cursor-pointer rounded-sm"
            >
              {/* Background Image */}
              <Image 
                src={project.imageUrl}
                alt={`${project.title} Preview`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out ${isSeelai ? 'object-contain p-12' : 'object-cover object-top'}`}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12 z-10">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-start">
                  
                  <span className="text-[10px] font-bold font-mono border border-black/20 dark:border-white/20 px-3 py-1.5 mb-4 inline-block uppercase bg-transparent">
                    {project.category} / {project.year}
                  </span>
                  
                  <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-3 flex items-center gap-3">
                    {project.title} <ExternalLink size={24} className="opacity-50" />
                  </h3>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  
                </div>
              </div>
            </motion.a>
          );
        })}
      </section>
    </div>
  );
}