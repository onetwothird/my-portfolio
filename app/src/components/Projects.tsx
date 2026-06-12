import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Projects() {
  // Array manually sorted by year (descending: newest to oldest)
  const projects = [
    {
      title: "Seelai AI Assistant",
      category: "Thesis Project",
      year: "2026",
      description: "Mobile application for the partially sighted. Integrates real-time object detection via YOLO and TensorFlow Lite, alongside caretaker face recognition and environmental text-to-speech features.",
      imageUrl: "/projects/seelai.png", 
      projectUrl: "#",
      domain: "seelai-app.dev"
    },
    {
      title: "AlgoVerse Simulator",
      category: "Operating Systems Project",
      year: "2025",
      description: "Web-based visual simulator for CPU scheduling algorithms (FCFS, SJF, Round Robin) for educational purposes. Built to bridge the gap between theoretical OS concepts and practical understanding.",
      imageUrl: "/projects/AlgoVerse.png",
      projectUrl: "https://onetwothird.page.gd/",
      domain: "onetwothird.page.gd"
    },
    {
      title: "ODCI Document Tracker",
      category: "OJT Project",
      year: "2025",
      description: "Centralized role-based document tracking system engineered collaboratively. Designed to efficiently route, timestamp, and monitor corporate document lifecycles across different organizational departments.",
      imageUrl: "/projects/odci.png",
      projectUrl: "#",
      domain: "odci.internal"
    },
    {
      title: "Jayann's Store POS",
      category: "E-Commerce",
      year: "2025",
      description: "Full-stack web-based Point of Sale platform that also functions as a customer-facing e-commerce site. Built utilizing PHP and MySQL for robust inventory management and transaction handling.",
      imageUrl: "/projects/pos.png",
      projectUrl: "#",
      domain: "store-pos.local"
    }
  ];

  return (
    <div className="min-h-screen text-black dark:text-gray-100 font-sans selection:bg-gray-500 selection:text-white transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col min-h-[90vh]">
        
        {/* Navigation Header */}
        <div className="mb-16 animate-slide-up">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Projects</h1>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl text-lg">
            A deep dive into my recent full-stack platforms, mobile AI applications, and system architecture builds.
          </p>
        </div>

        {/* Static Showcase Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 animate-slide-up"
          style={{ animationDelay: '150ms' }}
        >
          {projects.map((project, index) => (
            <a 
              key={index} 
              href={project.projectUrl}
              target={project.projectUrl !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className="group flex flex-col bg-white dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-sm overflow-hidden hover:border-gray-400 dark:hover:border-gray-500 transition-all hover:shadow-[0_8px_30px_rgba(156,163,175,0.2)] dark:hover:shadow-[0_8px_30px_rgba(156,163,175,0.05)]"
            >
              {/* Image Showcase Area */}
              <div className="relative w-full aspect-[1.6] bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-800 overflow-hidden">
                <Image 
                  src={project.imageUrl}
                  alt={`${project.title} Preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundColor: '#e5e7eb' }} 
                />
                
                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/5 dark:bg-black/30 opacity-0 group-hover:opacity-100 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center z-20">
                  <span className="flex items-center gap-2 bg-white dark:bg-zinc-900 text-black dark:text-white px-5 py-2.5 rounded-sm text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Live Project <ExternalLink size={16} />
                  </span>
                </div>
              </div>

              {/* Data Area */}
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between bg-white dark:bg-transparent z-10">
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2 sm:gap-0">
                    {/* Title hover effect removed here */}
                    <h3 className="font-bold text-2xl text-black dark:text-white leading-tight">
                      {project.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-gray-50 dark:bg-black border border-gray-100 dark:border-zinc-800 rounded-sm text-xs font-mono font-semibold text-gray-600 dark:text-gray-400 shrink-0">
                      {project.year}
                    </span>
                  </div>
                  
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
                    {project.category}
                  </p>
                  
                  <p className="text-base text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Footer URL Tag */}
                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {project.domain}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}