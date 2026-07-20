'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LiveVisitorCount() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/public-stats');
        const data = await res.json();
        
        // If your DB is brand new, you can add a baseline number here (e.g., data.count + 37) 
        // until you get real traffic, or just leave it as data.count
        setCount(data.count); 
      } catch (error) {
        console.error('Failed to load visitor count', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="h-10 w-32 bg-black/10 dark:bg-white/10 rounded-full"></div>
        <div className="h-4 w-40 bg-black/10 dark:bg-white/10 rounded-full"></div>
      </div>
    );
  }

  // Calculate what goes in the gray bubble (+X)
  // We show 3 avatar images, so subtract 3 from the total
  const remainingCount = count > 3 ? count - 3 : 0;

  // We use DiceBear's "notionists" style to match the black and white sketches from your image
  const avatarSeeds = ['Angelito', 'Dev', 'Code'];

  return (
    <div className="flex flex-col gap-3">
      {/* Overlapping Avatars */}
      <div className="flex items-center -space-x-3">
        {avatarSeeds.map((seed, index) => (
          <div 
            key={seed} 
            className="w-10 h-10 rounded-full border-2 border-[#F4F4F4] dark:border-[#111111] bg-white overflow-hidden relative"
            style={{ zIndex: 10 - index }}
          >
            <Image
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=ffffff`}
              alt="Visitor Avatar"
              fill
              sizes="40px" 
              className="object-cover"
            />
          </div>
        ))}
        
        {/* The +Number Bubble */}
        {remainingCount > 0 && (
          <div 
            className="w-auto min-w-10 px-2 h-10 rounded-full border-2 border-[#F4F4F4] dark:border-[#111111] bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300 relative"
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
      
      {/* Text Label */}
      <div className="text-sm font-medium text-[#999D9E]">
        <span className="font-bold text-[#1C1D20] dark:text-[#ededed] text-base">{count}</span> unique visitors
      </div>
    </div>
  );
}