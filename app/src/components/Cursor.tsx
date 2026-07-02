"use client";

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorSize = isHovering ? 60 : 16;
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.group') || target.closest('Magnetic')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorSize, mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-99999 hidden md:flex items-center justify-center mix-blend-difference"
      style={{ 
        x: cursorX, 
        y: cursorY,
        width: cursorSize,
        height: cursorSize,
      }}
      animate={{
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0)" : "#ffffff", 
        border: isHovering ? "1px solid #ffffff" : "0px solid rgba(255, 255, 255, 0)",
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
    />
  );
}