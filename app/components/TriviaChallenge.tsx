"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { useSound } from './SoundProvider';

interface TriviaChallengeProps {
  isOpen: boolean;
  onClose: () => void;
  onSolve: () => void;
}

const TRIVIA_POOL = [
  {
    text: <>What cross-platform UI toolkit uses the <span className="text-[#999D9E] font-semibold">Dart</span> language?</>,
    answers: ["flutter"]
  },
  {
    text: <>Which real-time object detection algorithm means <span className="text-[#999D9E] font-semibold">&quot;You Only Look Once&quot;</span>?</>,
    answers: ["yolo"]
  },
  {
    text: <>What declarative <span className="text-[#999D9E] font-semibold">JavaScript library</span> is commonly used to build React frameworks?</>,
    answers: ["react", "reactjs", "react.js"]
  },
  {
    text: <>What popular version control system was created by <span className="text-[#999D9E] font-semibold">Linus Torvalds</span>?</>,
    answers: ["git"]
  },
  {
    text: <>What CSS framework uses utility classes like <span className="text-[#999D9E] font-semibold">&quot;flex&quot;</span> and <span className="text-[#999D9E] font-semibold">&quot;p-4&quot;</span>?</>,
    answers: ["tailwind", "tailwindcss"]
  }
];

function pickQuestionIndex(exclude?: number) {
  if (TRIVIA_POOL.length === 1) return 0;
  let index = Math.floor(Math.random() * TRIVIA_POOL.length);
  while (index === exclude) {
    index = Math.floor(Math.random() * TRIVIA_POOL.length);
  }
  return index;
}

export default function TriviaChallenge({ isOpen, onClose, onSolve }: TriviaChallengeProps) {
  const { playHover, playClick } = useSound();
  const inputRef = useRef<HTMLInputElement>(null);

  const [questionIndex, setQuestionIndex] = useState(() => pickQuestionIndex());
  const [guess, setGuess] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const restart = useCallback(() => {
    setQuestionIndex((prev) => pickQuestionIndex(prev));
    setGuess("");
    setIsComplete(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const restartTimer = setTimeout(restart, 0);
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => {
        clearTimeout(restartTimer);
        clearTimeout(focusTimer);
      };
    }
  }, [isOpen, restart]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        playClick();
        onClose();
      } else if (e.key === "Tab") {
        e.preventDefault();
        playClick();
        restart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, playClick, restart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setGuess(rawValue);
    if (isComplete) return;

    const checkValue = rawValue.toLowerCase().trim();
    if (TRIVIA_POOL[questionIndex].answers.includes(checkValue)) {
      setIsComplete(true);
      playClick();
      setTimeout(() => {
        onSolve();
        onClose();
      }, 1800);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100000 bg-[#1C1D20] flex flex-col items-center justify-center overflow-hidden px-6"
        >
          <div className="absolute -top-32 left-1/5 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/5 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

          <button
            onClick={() => { playClick(); onClose(); }}
            onMouseEnter={playHover}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 text-[#999D9E] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 z-10"
          >
            <X size={20} />
          </button>

          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-8 sm:gap-10 w-full max-w-2xl text-center"
              >
                <span className="text-[10px] sm:text-xs font-mono text-[#999D9E] uppercase tracking-widest">
                  &gt;_ System Challenge
                </span>

                <motion.p
                  key={questionIndex}
                  animate={{ x: [-1, 2, -2, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.3, repeatDelay: 3 }}
                  className="text-white text-xl sm:text-3xl md:text-4xl font-medium leading-relaxed"
                >
                  {TRIVIA_POOL[questionIndex].text}
                </motion.p>

                <input
                  ref={inputRef}
                  type="text"
                  value={guess}
                  onChange={handleChange}
                  placeholder="Enter answer..."
                  autoFocus
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full max-w-sm bg-white/5 border border-white/10 rounded-lg px-5 py-3 text-white text-sm sm:text-base text-center focus:outline-none focus:border-white/40 transition-colors font-mono shadow-inner placeholder:text-white/30"
                />

                <div className="flex items-center gap-4 sm:gap-6 text-[#999D9E] text-[9px] sm:text-xs font-mono tracking-widest uppercase">
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 normal-case">tab</kbd>
                    new question
                  </span>
                  <span className="flex items-center gap-2">
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 normal-case">esc</kbd>
                    close
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="solved"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <CheckCircle2 size={48} strokeWidth={1.5} className="text-white" />
                <span className="text-white text-lg sm:text-xl font-mono font-bold tracking-widest uppercase">
                  Access Granted
                </span>
                <span className="text-[#999D9E] text-xs sm:text-sm font-mono tracking-widest uppercase">
                  The change featured is Marquee Overridden
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}