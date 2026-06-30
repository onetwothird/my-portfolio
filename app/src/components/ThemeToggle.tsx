"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; 
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (!("startViewTransition" in document)) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath: clipPath },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-8 h-8 rounded-full opacity-70 hover:opacity-100 transition-opacity"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: currentTheme === "dark" ? 180 : 0, 
          scale: currentTheme === "dark" ? 0 : 1 
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ 
          rotate: currentTheme === "dark" ? 0 : -180, 
          scale: currentTheme === "dark" ? 1 : 0 
        }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute"
      >
        <Moon size={18} />
      </motion.div>
    </button>
  );
}