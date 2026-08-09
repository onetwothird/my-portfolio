"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundContextValue = {
  enabled: boolean;
  toggleSound: () => void;
  playHover: (freqOrEvent?: number | React.SyntheticEvent | unknown, customGlide?: number) => void;
  playClick: () => void;
  setWindIntensity: (speed: number) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "portfolio-sound-enabled";

type ToneOptions = {
  frequency: number;
  duration?: number;
  type?: OscillatorType;
  volume?: number;
  glideTo?: number;
  delay?: number;
};

function playTone(ctx: AudioContext, opts: ToneOptions) {
  const {
    frequency,
    duration = 0.09,
    type = "sine",
    volume = 0.05,
    glideTo,
    delay = 0,
  } = opts;

  const startAt = ctx.currentTime + delay;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startAt);
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, startAt + duration);
  }

  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? saved === "true" : true;
  });
  const hydrated = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHoverRef = useRef(0);
  const windNodeRef = useRef<{ noise: AudioBufferSourceNode, filter: BiquadFilterNode, gain: GainNode } | null>(null);

  useEffect(() => {
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      ctxRef.current = new AudioCtx();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  useEffect(() => {
    const unlock = () => getCtx();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [getCtx]);

  const initWind = useCallback(() => {
    const ctx = getCtx();
    if (!ctx || windNodeRef.current) return;

    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 50; 

    const gain = ctx.createGain();
    gain.gain.value = 0; 

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    windNodeRef.current = { noise, filter, gain };
  }, [getCtx]);

  const setWindIntensity = useCallback((speed: number) => {
    if (!enabled) {
      if (windNodeRef.current) {
        windNodeRef.current.gain.gain.setTargetAtTime(0, getCtx()?.currentTime || 0, 0.1);
      }
      return;
    }
    
    initWind();
    
    if (windNodeRef.current) {
      const ctx = getCtx();
      if (!ctx) return;
      
      const targetFreq = Math.min(100 + speed * 20, 1200);
      const targetGain = Math.min(speed * 0.005, 0.15); 
      
      windNodeRef.current.filter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.1);
      windNodeRef.current.gain.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.1);
    }
  }, [enabled, initWind, getCtx]);

  const playHover = useCallback((freqOrEvent?: number | React.SyntheticEvent | unknown, customGlide?: number) => {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastHoverRef.current < 60) return;
    lastHoverRef.current = now;

    const ctx = getCtx();
    if (!ctx) return;
    
    const frequency = typeof freqOrEvent === 'number' ? freqOrEvent : 720;
    
    playTone(ctx, {
      frequency: frequency,
      glideTo: customGlide ?? 900,
      duration: 0.07,
      volume: 0.035,
    });
  }, [enabled, getCtx]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    playTone(ctx, {
      frequency: 480,
      glideTo: 300,
      duration: 0.1,
      volume: 0.06,
    });
  }, [enabled, getCtx]);

  const toggleSound = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        const ctx = getCtx();
        if (ctx) {
          playTone(ctx, { frequency: 600, glideTo: 950, duration: 0.08, volume: 0.06 });
          playTone(ctx, { frequency: 950, duration: 0.09, volume: 0.05, delay: 0.09 });
        }
      } else {
        if (windNodeRef.current) {
            windNodeRef.current.gain.gain.setTargetAtTime(0, getCtx()?.currentTime || 0, 0.1);
        }
      }
      return next;
    });
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggleSound, playHover, playClick, setWindIntensity }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return ctx;
}