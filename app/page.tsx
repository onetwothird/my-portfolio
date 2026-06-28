"use client";

import { useState } from 'react';
import { MapPin, Mail, ExternalLink, ChevronRight, Trophy, FileText, X } from 'lucide-react';
import { ThemeToggle } from './src/components/ThemeToggle';
import Image from "next/image";
import Link from 'next/link';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const VerifiedBadge = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 inline-block ml-2">
    <path d="M12 1.5L14 3.5L17 2.8L18 5.7L21 6.5L20.3 9.5L22.5 12L20.3 14.5L21 17.5L18 18.3L17 21.2L14 20.5L12 22.5L10 20.5L7 21.2L6 18.3L3 17.5L3.7 14.5L1.5 12L3.7 9.5L3 6.5L6 5.7L7 2.8L10 3.5L12 1.5Z" fill="currentColor" />
    <path d="M8.5 12L11 14.5L16 9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    "/img/image1.jpg",
    "/img/image2.jpg",
    "/img/image3.jpg",
    "/img/image4.jpg",
    "/img/image5.jpg",
    "/img/image6.jpg",
    "/img/image7.jpg",
    "/img/image8.jpg"
  ];

  const contributionGrid = [
    "0000000", "0000010", "0100010", "0001000", "0100000", 
    "0020010", "0302000", "0101020", "0110000", "0202100", 
    "0102000", "0110000", "0110100", "0010000", "0001000", 
    "0000000", "0001000", "0000000", "0100000", "0304200", 
    "0204010", "0103020", "0102000", "0110100", "0110000", 
    "0201010", "0110000", "0201020", "0101000", "0100000", 
    "0100100", "0010000", "0010010", "0102010", "0201020", 
    "0102000", "1211010", "1321100", "1232100", "1211010", 
    "2233210", "2343200", "1344310", "2443210", "2232100", 
    "2343210", "3444320", "2343210", "1232100", "2342110", 
    "1232110", "2343210", "1344310"                        
  ];

  const getContributionColor = (val: string) => {
    if (val === '4') return "bg-green-500 dark:bg-[#39d353]";
    if (val === '3') return "bg-green-400 dark:bg-[#26a641]";
    if (val === '2') return "bg-green-300 dark:bg-[#006d32]";
    if (val === '1') return "bg-green-200 dark:bg-[#0e4429]";
    return "bg-gray-100 dark:bg-[#161b22]"; 
  };

  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-gray-500 selection:text-white relative">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-10">
        
        <header className="animate-slide-up flex flex-col md:flex-row gap-8 items-start">
          
          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-sm overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm">
            <Image
              src="/img/image.jpg"
              alt="Angelito Decatoria"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 w-full pt-2">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-4xl font-bold tracking-tight flex items-center">
                Angelito P. Decatoria III <VerifiedBadge />
              </h1>
              <ThemeToggle />
            </div>
            
            <div className="flex items-center gap-2 text-gray-900 dark:text-gray-400 mt-2 font-medium">
              <MapPin size={16} /> Cavite, Philippines (Naic, Cavite)
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <p className="text-lg font-medium text-black dark:text-gray-200">
                Full Stack Developer \ CS Student 
              </p>

              <div className="relative group w-fit">
                <div className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 flex items-center gap-2 rounded-sm w-fit shadow-sm cursor-pointer transition-colors hover:bg-blue-700">
                  <Trophy size={12} fill="currentColor" />
                  <span>DEAN&apos;S LISTER 2022–2026</span>
                  <ChevronRight size={14} className="group-hover:rotate-90 transition-transform duration-200" />
                </div>
                
                <div className="absolute left-0 top-full mt-2 w-full min-w-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible -translate-y-2.5 group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-3 rounded-sm shadow-lg">
                    <div className="flex items-center gap-2 font-bold text-sm text-black dark:text-white">
                      <Trophy size={14} className="text-yellow-500 fill-yellow-500" />
                      Magna Cum Laude
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                      Class of 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>

           <div className="flex flex-wrap gap-3 mt-6 border-b border-gray-100 dark:border-zinc-800 pb-8">
              <a href="/resume/resume%20now.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm">
                <FileText size={16} /> View Resume <ChevronRight size={16} className="ml-2 opacity-50" />
              </a>

              <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-200 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                <GithubIcon size={16} /> View GitHub <ChevronRight size={16} className="ml-2 opacity-50" />
              </a>

              <a href="mailto:angelitodecatoriaa@gmail.com" className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-200 text-sm font-semibold rounded-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors shadow-sm">
                <Mail size={16} /> Send Email
              </a>
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 mt-4 relative">
          
          {/* LEFT COLUMN - Wrapped in flex h-full */}
          <div className="flex flex-col h-full">
            
            <div className="space-y-10">
              {/* About */}
              <section className="animate-slide-up" style={{ animationDelay: '150ms' }}>
                <h2 className="text-2xl font-bold mb-6">About</h2>
                <div className="space-y-4 text-black dark:text-gray-300 leading-relaxed">
                  <p>
                    I&apos;m a full-stack developer and senior Computer Science student specializing in building structural, high-fidelity web ecosystems alongside intelligent mobile applications. I work on projects including modern web platforms, POS systems, and integrating AI into daily utilities.
                  </p>

                  <p>
                    I&apos;ve engineered solutions locally, from educational simulators mapping CPU algorithms to corporate document tracking systems deployed during my OJT. My technical landscape balances rigorous software development with practical execution.
                  </p>
                  <p>
                    Lately, I&apos;ve been diving deeper into the world of artificial intelligence and computer vision, focusing on integrating YOLO and TensorFlow Lite tools natively into mobile ecosystems as I utilized this on my thesis project. My flagship work, Seelai, leverages this technology to empower individuals with visual impairments through real-time object recognition and accessibility assistance.
                  </p>        
                </div>
              </section>

              {/* Tech Stack */}
              <section className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <h2 className="text-2xl font-bold">Tech Stack</h2>
                  <Link href="/tech-stack" className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group">
                    View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">Frontend & Mobile</h3>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'Dart', 'React.js', 'Next.js', 'HTML5', 'CSS3', 'Flutter SDK'].map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">Backend & Database</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Python', 'PHP', 'MySQL', 'Firebase', 'REST APIs'].map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-gray-100 mb-3">AI & Developer Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {['TensorFlow Lite', 'YOLO', 'Roboflow', 'Label Studio', 'Git', 'VS Code'].map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-black dark:text-gray-300 text-sm font-medium rounded-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Projects */}
              <section className="animate-slide-up" style={{ animationDelay: '450ms' }}>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <h2 className="text-2xl font-bold">Recent Projects</h2>
                  <Link
                    href="/projects"
                    className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group"
                  >
                    View All
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Project 1: Seelai */}
                 <a href="https://seelai-docs.vercel.app" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-800">
                      <Image 
                        src="/projects/seelai-preview.png" 
                        alt="Seelai AI Assistant Preview" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20">
                        <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
                          View Project <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-black dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors mb-1 line-clamp-1">Seelai AI Assistant</h4>
                        <p className="text-xs text-gray-800 dark:text-gray-400 line-clamp-2">Real-time object & caretaker face detection mobile app.</p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex gap-2 text-[10px] sm:text-xs font-mono bg-white dark:bg-black px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                          seelai-app.dev
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Project 2: ODCI */}
                  <a href="https://odci.page.gd/" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <Image src="/projects/odci.png" alt="ODCI Document Tracker Preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20">
                        <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
                          View Project <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-black dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors mb-1 line-clamp-1">ODCI Document Tracker</h4>
                        <p className="text-xs text-gray-800 dark:text-gray-400 line-clamp-2">Centralized role-based corporate routing system.</p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex gap-2 text-[10px] sm:text-xs font-mono bg-white dark:bg-black px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                          odci.page.gd
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Project 3: AlgoVerse */}
                  <a href="https://onetwothird.page.gd/" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <Image src="/projects/AlgoVerse.png" alt="AlgoVerse Simulator Preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20">
                        <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
                          View Project <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-black dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors mb-1 line-clamp-1">AlgoVerse Simulator</h4>
                        <p className="text-xs text-gray-800 dark:text-gray-400 line-clamp-2">Visual CPU scheduling execution platform.</p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex gap-2 text-[10px] sm:text-xs font-mono bg-white dark:bg-black px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                          onetwothird.page.gd
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Project 4: POS */}
                  <a href="https://jayann-store.page.gd/" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <Image src="/projects/jayann_store.png" alt="Jayann's Store POS Preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-20">
                        <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm transform translate-y-4 group-hover:translate-y-0    transition-all">
                          View Project <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-black dark:text-white group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors mb-1 line-clamp-1">Jayann&apos;s Store POS</h4>
                        <p className="text-xs text-gray-800 dark:text-gray-400 line-clamp-2">Full stack inventory & ecommerce application.</p>
                      </div>
                      <div className="mt-3">
                        <span className="inline-flex gap-2 text-[10px] sm:text-xs font-mono bg-white dark:bg-black px-2 py-1 border border-gray-200 dark:border-zinc-800 rounded-sm text-black dark:text-gray-300">
                          jayann-store.page.gd
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </section>  
            </div>

            {/* Certifications Grid (Pushed to bottom) */}
            <div className="mt-auto pt-10">
              <section className="animate-slide-up" style={{ animationDelay: '600ms' }}>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 dark:border-zinc-800 pb-2">
                  <h2 className="text-2xl font-bold">Recent Certifications</h2>
                  <Link href="/certificate" className="text-sm font-semibold text-black dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white flex items-center transition-colors group">
                    View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Cert 1 */}
                  <a href="/cert/e-cert_1.pdf" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-white">
                      <Image src="/cert/e-cert_1.png" alt="Mastering SQL Query Optimization" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-black dark:text-white transition-colors line-clamp-1">Mastering SQL Query Optimization</h4>
                      <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">Gordon College - SREGEN</p>
                    </div>
                  </a>

                  {/* Cert 2 */}
                  <a href="/cert/e-cert_2.pdf" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-white">
                      <Image src="/cert/e-cert_2.png" alt="Artificial Intelligence & Innovation" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-black dark:text-white transition-colors line-clamp-1">Artificial Intelligence & Innovation</h4>
                      <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">KOENIG</p>
                    </div>
                  </a>

                  {/* Cert 3 */}
                  <a href="/cert/e-cert_3.pdf" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-white">
                      <Image src="/cert/e-cert_3.png" alt="Generative AI: ChatGPT to AutoGPT" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-black dark:text-white transition-colors line-clamp-1">Generative AI: ChatGPT to AutoGPT</h4>
                      <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">NIELIT-Delhi</p>
                    </div>
                  </a>

                  {/* Cert 4 */}
                  <a href="/cert/e-cert_4.pdf" target="_blank" rel="noreferrer" className="group flex flex-col bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm hover:border-gray-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="relative w-full aspect-[1.414] border-b border-gray-200 dark:border-zinc-800 overflow-hidden bg-white">
                      <Image src="/cert/e-cert_4.png" alt="Future of Containerization" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-sm text-black dark:text-white transition-colors line-clamp-1">Future of Containerization</h4>
                      <p className="text-xs text-gray-800 dark:text-gray-400 mt-1">Cognixia</p>
                    </div>
                  </a>

                </div>
              </section>
            </div>

          </div>

          {/* RIGHT COLUMN - Wrapped in flex h-full */}
          <div className="flex flex-col h-full animate-slide-up" style={{ animationDelay: '300ms' }}>
            
            <div className="space-y-8">
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-b border-gray-200 dark:border-zinc-800">
                
                <div>
                  <div className="font-black tracking-wide text-xl md:text-2xl mb-1 text-black dark:text-white">
                    AVAILABLE FOR ROLES
                  </div>

                  <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-400">
                    Open to Full-Stack & Software Engineering positions.
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <div className="inline-block text-xs font-mono font-bold border border-gray-300 dark:border-zinc-700 px-3 py-1.5 rounded-sm text-gray-800 dark:text-gray-200">
                    BSCS 2026
                  </div>
                </div>

              </div>

              {/* Experience Timeline */}
              <section className="pt-4">
                <h2 className="text-2xl font-bold mb-8">Journey & Experience</h2>
                
                <div className="relative border-l border-gray-200 dark:border-zinc-800 ml-3 space-y-6">
                  
                  {/* Seelai */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-black dark:bg-white border border-black dark:border-white rounded-sm group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">Seelai</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2026</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-300 mb-1.5">Thesis Project | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Mobile application for the partially sighted with real-time object detection, caretaker face recognition, document scanning, text-to-speech functionality, and other assistive features.</p>
                  </div>

                  {/* ODCI */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">ODCI (Document Tracker)</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Full Stack Developer (OJT) | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Centralized role-based document tracking system engineered collaboratively to efficiently route and monitor document lifecycles.</p>
                  </div>

                  {/* AlgoVerse */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">AlgoVerse</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Operating Systems Final Project | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes.</p>
                  </div>

                  {/* Jayann's Store POS */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">Jayann&apos;s Store POS System</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Application Development and Emerging Technologies Final Project | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Web-based POS platform functioning as an e-commerce site utilizing PHP and MySQL.</p>
                  </div>
                  
                  {/* Sari-tech */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">Sari-tech</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2025</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Software Engineering II Final Project | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Comprehensive software engineering project serving as the capstone for the course.</p>
                  </div>

                  {/* Smart Cook */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-white dark:bg-[#0a0a0a] border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-black dark:text-white">Smart Cook</h3>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1 xl:mt-0">2024</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Software Engineering I Final Project | Full Stack Developer</p>
                    <p className="text-sm text-gray-800 dark:text-gray-400">Recipe finder web app built with Vanilla JS and the Edamam API to filter meals based on dietary needs.</p>
                  </div>

                  {/* Hello World */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-1.75 top-1.5 w-3.5 h-3.5 bg-gray-100 dark:bg-zinc-900 border-2 border-gray-300 dark:border-zinc-600 rounded-sm group-hover:bg-black group-hover:border-black dark:group-hover:bg-white dark:group-hover:border-white transition-all" />
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                      <h3 className="font-bold text-gray-500 dark:text-gray-400">Hello World! 👋🏻</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-mono mt-1 xl:mt-0">2022</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500 italic">Wrote my first line of code.</p>
                  </div>

                </div>
              </section>

              {/* GitHub Activity Widget */}
              <section className="pt-8 mt-8 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black dark:text-white">GitHub Activity</h2>
                  <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <ExternalLink size={14} />
                  </a>
                </div>
                
                <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="block bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-sm p-5 hover:border-gray-300 dark:hover:border-zinc-700 transition-colors group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-sm group-hover:border-gray-300 dark:group-hover:border-zinc-600 transition-colors">
                      <GithubIcon size={20} className="text-black dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-black dark:text-white transition-colors">@onetwothird</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">1,164 contributions in the last year</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide opacity-80 group-hover:opacity-100 transition-opacity">
                    {contributionGrid.map((colStr, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-1 shrink-0">
                        {colStr.split('').map((val, rowIndex) => (
                          <div 
                            key={rowIndex} 
                            className={`w-2.5 h-2.5 rounded-xs ${getContributionColor(val)}`} 
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </a>
              </section>

            </div>

            <div className="mt-auto pt-8">
              <section className="pt-8 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-black dark:text-white">Gallery</h2>
                </div>

                <div className="grid grid-cols-2 gap-px bg-gray-200 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-sm w-full overflow-hidden shadow-sm">
                  {galleryImages.map((imgSrc, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedImage(imgSrc)}
                      className="relative aspect-square overflow-hidden group cursor-pointer bg-white dark:bg-[#0a0a0a]"
                    >
                      <Image 
                        src={imgSrc} 
                        alt={`Gallery snapshot ${i + 1}`} 
                        fill 
                        sizes="(max-width: 768px) 50vw, 180px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors z-10 flex items-center justify-center">
                        <div className="bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                          <ExternalLink size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
                    
          </div>
        </div>

        {/* FULL WIDTH BOTTOM GRID */}
        <div className="animate-slide-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 mt-14 border-t border-gray-200 dark:border-zinc-800" style={{ animationDelay: '750ms' }}>
          
          <div>
            <h3 className="text-sm font-bold mb-4">Focus Areas</h3>
            <ul className="flex flex-wrap gap-2 text-sm text-gray-900 dark:text-gray-400">
              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                Data Structures <ExternalLink size={12} className="opacity-70" />
              </li>
              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                Machine Learning <ExternalLink size={12} className="opacity-70" />
              </li>
              <li className="flex items-center gap-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                System Architecture <ExternalLink size={12} className="opacity-70" />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">Social Links</h3>
            <ul className="space-y-3 text-sm text-gray-900 dark:text-gray-400">
              <li>
                <a href="https://github.com/onetwothird" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
                  <GithubIcon size={14}/> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/angelito-decatoria/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
                  <LinkedinIcon size={14}/> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/angelo.decatoria.5" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
                  <FacebookIcon size={14}/> Facebook
                </a>
              </li>
              <li>
                <a href="mailto:angelitodecatoriaa@gmail.com" className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors">
                  <Mail size={14}/> Email Me
                </a>
              </li>
            </ul>
          </div>

          {/* Clean div without the negative margin */}
          <div>
            <h3 className="text-sm font-bold mb-4">Education</h3>
            <div className="text-xs text-gray-900 dark:text-gray-400 space-y-1">
              <p className="font-bold text-black dark:text-white text-sm">
                Cavite State University (CvSU)
              </p>
              <p>Naic Campus</p>
              <div className="mt-2 text-black dark:text-white font-medium">
                BS Computer Science
              </div>
              <p>Class of 2026</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4">Get in touch</h3>
            <p className="text-sm text-gray-900 dark:text-gray-400 mb-4 pr-4">
              Available for new opportunities in software development.
            </p>
            <a href="mailto:angelitodecatoriaa@gmail.com" className="inline-flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors group">
              Let&apos;s talk <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="animate-slide-up pt-8 mt-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-900 dark:text-gray-400 pb-8" style={{ animationDelay: '900ms' }}>
          <p>&copy; 2026 Angelito P. Decatoria III. All rights reserved.</p>
          <a href="mailto:angelitodecatoriaa@gmail.com" className="mt-4 md:mt-0 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-semibold flex items-center gap-2 rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm">
            <Mail size={16}/> Connect with Me
          </a>
        </footer>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full border border-white/10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <div className="relative w-full h-[80vh]">
              <Image 
                src={selectedImage} 
                alt="Fullscreen view" 
                fill 
                className="object-contain"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}