"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  
  const springProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  const xPosition = useTransform(springProgress, [0, 1], ["0vw", "95vw"]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      
      <motion.div
        className="absolute bottom-1.5 origin-bottom"
        style={{ x: xPosition }}
        animate={{ 
          rotate: [-12, 12, -12],
          y: [0, -6, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.6, 
          ease: "easeInOut" 
        }}
      >
        <Image 
          src="/img/my-penguin.png" 
          alt="Waddling Penguin" 
          width={40} 
          height={40} 
          className="drop-shadow-md object-contain"
          priority 
        />
      </motion.div>

      <motion.div
        className="h-1.5 bg-gray-800 dark:bg-gray-700 origin-left w-full"
        style={{ scaleX: springProgress }}
      />
      
    </div>
  );
}