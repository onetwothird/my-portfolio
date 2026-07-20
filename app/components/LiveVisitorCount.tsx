'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LiveVisitorCount() {
  const [stats, setStats] = useState({ totalUnique: 0, activeNow: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/public-stats?t=${new Date().getTime()}`);
        const data = await res.json();
        setStats({ 
          totalUnique: data.totalUnique, 
          activeNow: data.activeNow 
        });
      } catch (error) {
        console.error('Failed to load visitor stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-start gap-2 animate-pulse mb-2 md:mb-4">
        <div className="h-8 w-24 md:h-10 md:w-28 bg-white/20 rounded-full"></div>
        <div className="h-3 w-28 md:h-4 md:w-32 bg-white/20 rounded-full"></div>
      </div>
    );
  }

  const remainingCount = stats.totalUnique > 3 ? stats.totalUnique - 3 : 0;
  const avatarSeeds = ['Angelito', 'Dev', 'Code'];

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3 mb-2 md:mb-4">
      
      <div className="flex items-center -space-x-2 md:-space-x-3">
        {avatarSeeds.map((seed, index) => (
          <div 
            key={seed} 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/40 bg-white overflow-hidden relative shadow-sm"
            style={{ zIndex: 10 - index }}
          >
            <Image
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=ffffff`}
              alt="Visitor Avatar"
              fill
              sizes="(max-width: 768px) 32px, 40px"
              className="object-cover"
            />
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div 
            className="w-auto min-w-8 md:min-w-10 px-2 h-8 md:h-10 rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] md:text-xs font-medium text-white relative shadow-sm"
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-start text-left">
         <div className="text-xs md:text-sm font-medium text-white/90 drop-shadow-sm">
           <span className="font-bold text-white text-sm md:text-base mr-1">{stats.activeNow}</span> 
           people viewing now
         </div>
         <div className="text-[10px] md:text-xs font-medium text-white/70 mt-0.5 md:mt-1">
           {stats.totalUnique} all-time visitors
         </div>
      </div>
      
    </div>
  );
}