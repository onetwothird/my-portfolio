"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useSound } from '../shared/SoundProvider';

const slideUpFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

interface ProjectType {
  title: string;
  category: string;
  year: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
}

interface ProjectCardProps {
  project: ProjectType;
  playHover: () => void;
  playClick: () => void;
}

export default function Projects() {
  const { playHover, playClick } = useSound();
  
  const projects: ProjectType[] = [
    {
      title: "Resumi",
      category: "E-Commerce",
      year: "2026",
      description: "Build a professional, ATS-friendly resume in minutes with our easy-to-use resume builder.",
      projectUrl: "https://resumi-mu.vercel.app/",
      imageUrl: "/projects/Resumi.png"
    },
    {
      title: "QueueTopia Simulator",
      category: "OS Side Project",
      year: "2026",
      description: "Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes.",
      projectUrl: "https://onetwothird.page.gd/",
      imageUrl: "/projects/Queuetopia.png"
    },
    {
      title: "Seelai AI Assistant",
      category: "Thesis Project",
      year: "2026",
      description: "Mobile application for the partially sighted. Integrates real-time object detection via YOLO and TensorFlow Lite.",
      projectUrl: "https://seelai-docs.vercel.app",
      imageUrl: "/projects/seelai-preview.png"
    },
    {
      title: "ODCI Document Tracker",
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
    },
    {
      title: "Seelai Admin",
      category: "Web Platform",
      year: "2026",
      description: "Super admin web interface for the Seelai ecosystem, designed to facilitate machine learning model training.",
      projectUrl: "https://supeadmin-modeltraining-website.vercel.app",
      imageUrl: "/projects/seelai_dashboard.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white pb-32 overflow-hidden flex flex-col">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <section className="pt-32 pb-4 px-6 md:px-12 relative w-full max-w-400 mx-auto shrink-0">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <Link 
            href="/" 
            onMouseEnter={() => playHover()}
            onClick={playClick}
            className="inline-flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest text-[#999D9E] hover:text-black dark:hover:text-white transition-colors mb-12 lg:mb-16 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="overflow-hidden mb-4">
            <motion.h1 variants={slideUpFade} className="text-6xl md:text-[8vw] leading-[0.85] font-medium tracking-tighter">
              Featured Works.
            </motion.h1>
          </div>
          
          <motion.div variants={slideUpFade} className="flex items-center gap-6">
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest min-w-12">
              触れて一時停止
            </span>
            <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest min-w-12">
              {String(projects.length).padStart(2, '0')} Projects
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="md:px-12 relative w-full max-w-400 mx-auto shrink-0 hidden md:block mt-12 md:mt-16">
        <div
          className="overflow-hidden px-6 md:px-12"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)',
          }}
        >
          <div className="flex w-max animate-marquee">
            
            <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 items-center">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={`set1-${i}`} 
                  project={project} 
                  playHover={playHover} 
                  playClick={playClick} 
                />
              ))}
            </div>

            <div className="flex gap-6 md:gap-10 pr-6 md:pr-10 items-center">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={`set2-${i}`} 
                  project={project} 
                  playHover={playHover} 
                  playClick={playClick} 
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="flex md:hidden flex-col gap-6 mt-12 w-full max-w-400 mx-auto px-6">
        {projects.map((project, i) => (
          <MobileProjectCard 
            key={`mobile-${i}`} 
            project={project} 
            playClick={playClick} 
          />
        ))}
      </section>
    </div>
  );
}

interface MobileProjectCardProps {
  project: ProjectType;
  playClick: () => void;
}

function MobileProjectCard({ project, playClick }: MobileProjectCardProps) {
  return (
    <a
      href={project.projectUrl}
      target={project.projectUrl !== "#" ? "_blank" : "_self"}
      rel="noreferrer"
      onClick={playClick}
      className="relative w-full aspect-video flex items-center justify-center overflow-hidden rounded-2xl cursor-pointer border border-black/10 dark:border-white/10 active:scale-[0.98] transition-transform duration-300"
    >
      <Image
        src={project.imageUrl}
        alt={`${project.title} Preview`}
        fill
        className="object-contain pointer-events-none select-none"
        draggable={false}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex gap-3 items-center mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/80">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-white/80 border border-white/30 px-2 py-0.5 rounded-md">
            {project.year}
          </span>
        </div>

        <h3 className="text-white text-2xl font-medium tracking-tight mb-2">
          {project.title}
        </h3>
        <p className="text-white/80 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        <span className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-full font-medium text-sm w-full">
          View Project <ArrowUpRight size={16} />
        </span>
      </div>
    </a>
  );
}

function ProjectCard({ project, playHover, playClick }: ProjectCardProps) {
  return (
    <a 
      href={project.projectUrl}
      target={project.projectUrl !== "#" ? "_blank" : "_self"}
      rel="noreferrer"
      onMouseEnter={() => playHover()}
      onClick={playClick}
      className="group relative w-[80vw] sm:w-87.5 md:w-112.5 lg:w-137.5 xl:w-150 aspect-video shrink-0 flex items-center justify-center overflow-hidden rounded-2xl"
    >
      <Image 
        src={project.imageUrl} 
        alt={`${project.title} Preview`} 
        fill 
        className="object-contain pointer-events-none select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
        priority
        draggable={false}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <div className="flex flex-col xl:flex-row justify-between xl:items-end gap-6">
          
          <div className="flex flex-col gap-3 flex-1">
            <h3 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl line-clamp-2 md:line-clamp-none">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col xl:items-end gap-5 shrink-0">
            <div className="flex gap-4 items-center">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80">
                {project.category}
              </span>
              <span className="text-xs font-mono text-white/80 border border-white/30 px-2 py-1 rounded-md">
                {project.year}
              </span>
            </div>
            
            <span className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-full font-medium hover:scale-105 transition-transform w-full md:w-auto">
              View Project <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}