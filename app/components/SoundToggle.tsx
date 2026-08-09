"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "./SoundProvider";

export function SoundToggle() {
  const { enabled, toggleSound } = useSound();

  return (
    <button
      onClick={toggleSound}
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={enabled}
      title={enabled ? "Sound on" : "Sound off"}
      className="relative flex items-center justify-center w-5 h-5 text-[#1C1D20] dark:text-[#ededed]"
    >
      {enabled ? (
        <Volume2 size={18} strokeWidth={1.75} />
      ) : (
        <VolumeX size={18} strokeWidth={1.75} className="opacity-50" />
      )}
    </button>
  );
}