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

export default function Projects() {
  const projects = [
    {
      title: "Seelai AI Assistant",
      category: "Thesis Project",
      year: "2026",
      description: "Mobile application for the partially sighted. Integrates real-time object detection via YOLO and TensorFlow Lite.",
      projectUrl: "https://seelai-docs.vercel.app",
      imageUrl: "/projects/seelai-preview.png"
    },
    {
      title: "Seelai Admin",
      category: "Web Platform",
      year: "2026",
      description: "Super admin web interface for the Seelai ecosystem, designed to facilitate machine learning model training.",
      projectUrl: "https://supeadmin-modeltraining-website.vercel.app",
      imageUrl: "/projects/seelai_dashboard.png"
    },
    {
      title: "AlgoVerse Simulator",
      category: "OS Project",
      year: "2025",
      description: "Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes.",
      projectUrl: "https://onetwothird.page.gd/",
      imageUrl: "/projects/AlgoVerse.png"
    },
    {
      title: "ODCI Doc Tracker",
      category: "OJT Project",
      year: "2025",
      description: "Centralized role-based document tracking system engineered collaboratively.",
      projectUrl: "https://odci.page.gd/",
      imageUrl: "/projects/odci.png"
    },
    {
      title: "Jayann's Store",
      category: "E-Commerce",
      year: "2025",
      description: "Full-stack web-based Point of Sale platform that also functions as a customer-facing e-commerce site.",
      projectUrl: "https://jayann-store.page.gd/",
      imageUrl: "/projects/jayann_store.png"
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
              Featured Works.
            </motion.h1>
          </div>
          <motion.div variants={slideUpFade} className="flex items-center gap-4 mt-4">
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              注目のプロジェクト
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest">
              {String(projects.length).padStart(2, '0')} Projects
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Grid Showcase */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {projects.map((project, i) => (
            <motion.a 
              key={i} 
              href={project.projectUrl}
              target={project.projectUrl !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } }}
              className={`group w-full aspect-4/3 relative cursor-pointer overflow-hidden rounded-sm block ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <Image 
                src={project.imageUrl} 
                alt={`${project.title} Preview`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />

              {/* Hover caption overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-2xl md:text-3xl font-medium tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm max-w-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-xs font-mono font-bold tracking-widest block mb-1">
                      {project.year}
                    </span>
                    <span className="text-white/70 text-xs font-mono uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Right Arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500">
                <span className="text-white text-lg leading-none -mt-0.5">↗</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}