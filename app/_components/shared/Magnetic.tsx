"use client";

import { motion } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const bounds = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      bounds.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!bounds.current) return;

    const { clientX, clientY } = e;
    const { width, height, top, left } = bounds.current;
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    bounds.current = null;
  };

  const { x, y } = position;
  
  return (
    <motion.div
      style={{ position: "relative", zIndex: 50 }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: x * 0.4, y: y * 0.4 }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.2 }}
    >
      {children}
    </motion.div>
  );
}