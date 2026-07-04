"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, Variants, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Smooth mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Update mouse coordinates on window move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const certifications = [
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
    <div className="min-h-screen bg-[#F4F4F4] dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] font-sans selection:bg-[#8B5CF6] selection:text-white relative">
      
      {/* Floating Image Cursor (Hidden on mobile) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block w-[320px] h-55 overflow-hidden rounded-xl shadow-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        {certifications.map((cert, index) => (
          <Image
            key={index}
            src={cert.imageUrl}
            alt={`${cert.title} Certificate`}
            fill
            sizes="320px"
            className="object-cover transition-opacity duration-300"
            style={{ 
              opacity: hoveredIndex === index ? 1 : 0,
            }}
          />
        ))}
      </motion.div>

      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative max-w-350 mx-auto">
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
          <motion.p variants={slideUpFade} className="font-mono text-xs text-[#999D9E] font-bold uppercase tracking-widest mt-4">
            認定資格
          </motion.p>
        </motion.div>
      </section>

      {/* List Showcase */}
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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col xl:flex-row justify-between items-start xl:items-center py-12 md:py-16 border-b border-black/10 dark:border-white/10 hover:px-6 transition-all duration-500 z-10"
            >
              {/* Left Side: Title */}
              <div className="flex flex-col gap-3 max-w-3xl mb-8 xl:mb-0 pr-8 pointer-events-none">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight group-hover:opacity-40 transition-opacity duration-500 flex items-center">
                  {cert.title}
                  <ArrowUpRight size={36} className="opacity-0 group-hover:opacity-100 transition-all duration-500 -ml-4 group-hover:ml-4 text-[#8B5CF6] hidden md:block" />
                </h3>
              </div>
              
              {/* Right Side: Issuer & Year */}
              <div className="flex flex-row items-center gap-4 xl:gap-8 shrink-0 pointer-events-none">
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