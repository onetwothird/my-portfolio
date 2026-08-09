"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSound } from './SoundProvider';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const { setWindIntensity } = useSound();
  
  const cursorSize = isHovering ? 60 : 16;
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    let rafId: number;
    lastPos.current.time = Date.now();

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - cursorSize / 2);
      mouseY.set(e.clientY - cursorSize / 2);

      const now = Date.now();
      const dt = now - lastPos.current.time;
      if (dt > 0) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / dt;

        setWindIntensity(speed);
        lastPos.current = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    const checkStop = () => {
      if (Date.now() - lastPos.current.time > 50) {
        setWindIntensity(0); 
      }
      rafId = requestAnimationFrame(checkStop);
    };
    rafId = requestAnimationFrame(checkStop);

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
      cancelAnimationFrame(rafId);
    };
  }, [cursorSize, mouseX, mouseY, setWindIntensity]);

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