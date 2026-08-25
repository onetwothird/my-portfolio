"use client";

import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

type MarkerData = {
  lat: number;
  lng: number;
};

export default function LocationGlobe() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const markerData: MarkerData[] = [
    {
      lat: 14.2988,
      lng: 120.7877,
    }
  ];

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    const timeoutId = setTimeout(updateDimensions, 100); 
    
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (globeEl.current && dimensions.width > 0) {
      globeEl.current.pointOfView({ lat: 14.2988, lng: 120.7877, altitude: 1.5 }, 2000);
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.0; 
      globeEl.current.controls().enableZoom = false; 
    }
  }, [dimensions.width]);

  return (
    <div ref={containerRef} className="w-full h-full absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing">
      {dimensions.width > 0 && (
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="#ffffff" 
          atmosphereAltitude={0.1}
          
          htmlElementsData={markerData}
          htmlLat={(d: object) => (d as MarkerData).lat}
          htmlLng={(d: object) => (d as MarkerData).lng}
          htmlAltitude={0} 
          
          htmlElement={() => {
            const rootEl = document.createElement('div');
            rootEl.style.width = '0px';
            rootEl.style.height = '0px';
            rootEl.style.position = 'relative';
            
            rootEl.innerHTML = `
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer w-max pointer-events-auto">
                
                <!-- Hover Tooltip Updated to Naic, Cavite -->
                <div class="absolute bottom-full mb-2 px-3 py-1.5 bg-[#1C1D20]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 z-20">
                  <span class="text-white text-[11px] md:text-xs font-medium whitespace-nowrap">Naic, Cavite</span>
                  <span class="text-[#8B5CF6] text-[9px] md:text-[10px] font-mono tracking-wide uppercase mt-0.5">Philippines</span>
                </div>

                <!-- Avatar Image -->
                <div class="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white overflow-hidden bg-[#1C1D20] z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110">
                  <img src="/img/cover-photos.png" alt="Angelito" class="w-full h-full object-cover" />
                </div>

                <!-- Connecting Line -->
                <div class="w-0.5 h-8 md:h-12 bg-linear-to-b from-white to-transparent opacity-90 z-0 -mt-1"></div>

                <!-- Exact Coordinate Base Dot -->
                <div class="absolute bottom-0 w-2.5 h-2.5 bg-white rounded-full translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,1)]">
                  <div class="absolute inset-0 bg-white rounded-full animate-ping opacity-60"></div>
                </div>

              </div>
            `;
            return rootEl;
          }}
        />
      )}
    </div>
  );
}