"use client";

import { Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion, Variants } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { useSound } from '../components/SoundProvider';

const LocationGlobe = dynamic(() => import('../components/LocationGlobe'), { ssr: false });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

const socials = [
  { name: "GitHub", href: "https://github.com/onetwothird" },
  { name: "LinkedIn", href: "https://linkedin.com/in/angelito-decatoria" },
  { name: "Instagram", href: "https://instagram.com/cntwxrms" },
  { name: "Facebook", href: "https://facebook.com/angelo.decatoria.5" },
];

export default function Footer() {
  const { playHover, playClick } = useSound();

  return (
    <footer id="contact" className="bg-[#1C1D20] text-white pt-24 pb-8 px-6 md:px-12 mt-20 relative rounded-t-[40px] md:rounded-t-[80px] overflow-hidden">
      
      <div className="w-full max-w-400 mx-auto flex flex-col justify-between min-h-[75vh]">
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 flex-1">
          
          {/* Left: Typography & CTA */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col z-10 max-w-2xl mt-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-10 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse"></div>
              <span className="text-xs font-mono tracking-widest text-[#999D9E] uppercase">Available for work</span>
            </div>

            <h2 className="text-[4rem] sm:text-[6rem] lg:text-[7vw] font-medium tracking-tighter leading-[0.9] mb-8">
              Got an <br />
              <span className="text-[#8B5CF6]">idea?</span>
            </h2>

            <p className="text-[#999D9E] text-lg sm:text-xl max-w-md mb-12">
              Let&apos;s build scalable software solutions together. Drop me a message to start the conversation.
            </p>

            <Magnetic>
              <a 
                href="mailto:angelitodecatoriaa@gmail.com" 
                onMouseEnter={playHover} 
                onClick={playClick} 
                className="group relative inline-flex items-center gap-4 bg-white text-[#1C1D20] px-10 py-5 rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={20} />
                  Email Me
                </span>
                <div className="absolute inset-0 bg-[#8B5CF6] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
                <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <Mail size={20} />
                  Email Me
                </span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Right: The Interactive Globe Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] h-100 sm:h-125 lg:h-150 relative rounded-[40px] border border-white/10 bg-linear-to-b from-white/5 to-transparent overflow-hidden"
          >
            <div className="absolute top-6 left-8 z-10 pointer-events-none">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase">Location</span>
              <p className="text-white font-medium mt-1">Naic, Cavite</p>
            </div>
            <LocationGlobe />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full pt-8 mt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-[#999D9E] font-medium uppercase tracking-widest gap-6 md:gap-0"
        >
          <div className="flex gap-12 md:gap-24">
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Base</span>
              <span className="text-white">Naic, Cavite, PH</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="opacity-50">Built With</span>
              <span className="text-white">Next.js & Three.js</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-2">
             <span className="opacity-50">Connect</span>
             <div className="flex gap-4 md:gap-6 flex-wrap text-white">
                {socials.map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="hover:text-[#8B5CF6] transition-colors relative group"
                  >
                    {social.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#8B5CF6] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
             </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}