"use client";

import { ReactNode } from 'react';
import { Caveat } from 'next/font/google';

export const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600', '700'] });

type InkProps = {
  className?: string;
  inverted?: boolean;
};

export function Tape({
  className = '',
  rotate = -4,
  inverted = false,
}: InkProps & { rotate?: number }) {
  return (
    <span
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`pointer-events-none absolute block ${
        inverted
          ? 'bg-white/15 border border-white/25'
          : 'bg-black/5 dark:bg-white/8 border border-black/15 dark:border-white/20'
      } shadow-[0_1px_6px_rgba(0,0,0,0.12)] backdrop-blur-[1px] ${className}`}
    />
  );
}

export function PinDot({ className = '', inverted = false }: InkProps) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full shadow-sm ${
        inverted ? 'bg-white/80' : 'bg-black/70 dark:bg-white/80'
      } ${className}`}
    />
  );
}

export function DoodleArrow({
  className = '',
  inverted = false,
  flip = false,
}: InkProps & { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 60"
      fill="none"
      className={`pointer-events-none ${
        inverted ? 'text-white/50' : 'text-black/30 dark:text-white/35'
      } ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d="M4 8 C 32 2, 58 42, 96 32 M96 32 C 88 27, 82 22, 80 15 M96 32 C 90 39, 85 44, 80 47"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleCircle({ className = '', inverted = false }: InkProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 60"
      fill="none"
      className={`pointer-events-none ${
        inverted ? 'text-white/45' : 'text-black/25 dark:text-white/30'
      } ${className}`}
    >
      <path
        d="M52 3 C 22 1, 3 18, 5 33 C 7 49, 27 58, 51 56 C 78 54, 97 42, 94 24 C 91 8, 71 1, 52 3 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sticker({
  children,
  className = '',
  rotate = -3,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`inline-flex items-center gap-2 rounded-full border border-dashed border-black/25 dark:border-white/25 bg-white/80 dark:bg-[#1C1D20]/70 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export function GridPaper({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 text-black dark:text-white opacity-[0.12] dark:opacity-[0.08] ${className}`}
      style={{
        backgroundImage: 'radial-gradient(currentColor 1.4px, transparent 1.4px)',
        backgroundSize: '24px 24px',
      }}
    />
  );
}