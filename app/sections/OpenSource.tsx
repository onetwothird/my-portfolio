"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import Magnetic from "../components/Magnetic";
import { useTheme } from "next-themes";
import { useSound } from "../components/SoundProvider"; 

const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function OpenSource() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sleek Black and Gray monochrome theme
  const customTheme = {
    // Light mode: Very light gray to solid black (#1C1D20)
    light: ["#f3f4f6", "#d1d5db", "#9ca3af", "#4b5563", "#1C1D20"],
    // Dark mode: Very dark gray to solid white (#ededed)
    dark: ["#27272a", "#3f3f46", "#71717a", "#a1a1aa", "#ededed"],
  };

  return (
    <section
      id="opensource"
      className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-t border-black/10 dark:border-white/10"
    >
      <div className="text-xs font-medium text-[#999D9E] mb-12 uppercase tracking-widest">
        Open Source
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={revealUp}
        className="group relative flex flex-col p-8 md:p-12 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/2 dark:hover:bg-white/2 transition-colors duration-500 overflow-hidden"
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="text-2xl md:text-4xl font-medium tracking-tight mb-2">
              @onetwothird
            </h3>
            <div className="flex items-center gap-3 mt-4">
              <span className="relative flex h-2 w-2">
                {/* Slowed down the pulse to 3 seconds for a gentle blink effect */}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white animate-[pulse_3s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
              </span>
              <span className="text-xs font-mono text-[#999D9E] uppercase tracking-wider">
                Active Contributor
              </span>
            </div>
          </div>

          <Magnetic>
            <a
              href="https://github.com/onetwothird"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
              className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1C1D20] text-white dark:bg-white dark:text-[#1C1D20] hover:scale-110 transition-transform duration-300 shadow-md shrink-0"
            >
              <span className="text-xl md:text-2xl font-light leading-none -mt-0.5">
                ↗
              </span>
            </a>
          </Magnetic>
        </div>

        {/* CALENDAR & YEARS SECTION */}
        <div className="flex flex-col border-t border-black/10 dark:border-white/10 pt-8 md:pt-12">
          {/* Year Selector Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {years.map((year) => (
              <button
                key={year}
                onMouseEnter={() => playHover(760, 920)}
                onClick={() => {
                  if (selectedYear !== year) {
                    playClick();
                    setSelectedYear(year);
                  }
                }}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 border cursor-pointer ${
                  selectedYear === year
                    ? "bg-[#1C1D20] text-white border-[#1C1D20] dark:bg-white dark:text-[#1C1D20] dark:border-white"
                    : "bg-transparent text-[#999D9E] border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Calendar Container */}
          <div
            className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent
                           [&_span.react-activity-calendar__count]:text-4xl! md:[&_span.react-activity-calendar__count]:text-6xl! 
                           [&_span.react-activity-calendar__count]:font-medium! 
                           [&_span.react-activity-calendar__count]:text-[#1C1D20]! dark:[&_span.react-activity-calendar__count]:text-white! 
                           [&_span.react-activity-calendar__count]:tracking-tighter! 
                           [&_span.react-activity-calendar__count]:mb-8!
                           [&_span.react-activity-calendar__count]:block!
                           [&_text]:fill-[#999D9E]!
                           [&_text]:text-[10px]!
                           [&_text]:font-mono!
                           [&_.react-activity-calendar__legend]:text-[#999D9E]!
                           [&_.react-activity-calendar__legend]:text-xs!
                           [&_.react-activity-calendar__legend]:font-mono!
                           [&_.react-activity-calendar__legend-colors]:rounded-sm!"
          >
            <div className="min-w-200">
              {mounted && (
                <GitHubCalendar
                  username="onetwothird"
                  year={selectedYear}
                  theme={customTheme}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  blockSize={14}
                  blockMargin={5}
                  fontSize={12}
                  labels={{
                    totalCount: `{{count}} contributions in ${selectedYear}`,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}