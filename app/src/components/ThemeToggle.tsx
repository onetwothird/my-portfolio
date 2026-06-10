"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom"; // Add this import

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to prevent layout shift
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const toggleTheme = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Fallback for browsers that don't support View Transitions API
    if (!("startViewTransition" in document)) {
      setTheme(newTheme);
      return;
    }

    // Get click coordinates to use as the circle's starting center
    const x = e.clientX;
    const y = e.clientY;

    // Calculate distance to the furthest corner to know how big the circle needs to get
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
        {
          clipPath: clipPath,
        },
        {
          duration: 500, 
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}