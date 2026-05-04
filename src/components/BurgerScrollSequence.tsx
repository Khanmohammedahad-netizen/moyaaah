"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 25;
const FRAME_PATH = (index: number) => `/burger/frame_${index.toString().padStart(4, '0')}.webp`;

export default function BurgerScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload frames and cache them in the browser
  useEffect(() => {
    let loadedCount = 0;
    const cache: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
        }
      };
      cache.push(img);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const obj = { frame: 1 };
    
    // Main Timeline
    // We use a shorter end (250%) to make 25 frames feel much smoother (less time per frame)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%", 
        pin: true,
        scrub: 1.2, // Faster scrub for more responsive feel
        onUpdate: (self) => {
          if (imgRef.current) {
            const index = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(obj.frame)));
            imgRef.current.src = FRAME_PATH(index);
          }
        }
      }
    });

    // Progression
    tl.to(obj, {
      frame: TOTAL_FRAMES,
      ease: "none", // Linear ease for frame progression is better when using image swap
      duration: 1
    }, 0);

    // Subtle Scale (avoiding over-zoom)
    tl.to(imgRef.current, {
      scale: 1.05,
      ease: "power1.inOut",
      duration: 1
    }, 0);

    // Story Text Timeline - Optimized for shorter scroll
    const phases = [
      { text: "Precision in every layer", start: 0, end: 0.2 },
      { text: "Fresh ingredients. Perfect balance.", start: 0.25, end: 0.45 },
      { text: "Built to satisfy. Designed to impress.", start: 0.5, end: 0.7 },
      { text: "Moyaaah — Beyond the ordinary", start: 0.75, end: 0.95 }
    ];

    const textElements = textContainerRef.current?.querySelectorAll('.story-text');
    
    textElements?.forEach((el, i) => {
      const phase = phases[i];
      
      gsap.fromTo(el, 
        { opacity: 0, y: 40, filter: "blur(12px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${phase.start * 250}% top`,
            end: `top+=${(phase.start + 0.1) * 250}% top`,
            scrub: 1,
            toggleActions: "play reverse play reverse"
          }
        }
      );

      gsap.to(el, {
        opacity: 0,
        y: -40,
        filter: "blur(12px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${(phase.end - 0.05) * 250}% top`,
          end: `top+=${phase.end * 250}% top`,
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient-cosmic opacity-20" />

      {/* Frame Container - Fixed sizing to avoid "too zoomed" feel */}
      <div className="absolute inset-0 flex items-center justify-center p-10 md:p-20">
        <img 
          ref={imgRef}
          src={FRAME_PATH(1)}
          alt="Moyaaah Burger Evolution"
          className="w-full h-full object-contain will-change-transform select-none pointer-events-none"
        />
      </div>

      {/* Premium Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center gap-6">
             <div className="relative w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
               <div 
                 className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out" 
                 style={{ width: `${loadProgress}%` }}
               />
             </div>
             <span className="text-primary font-black tracking-[0.4em] text-[10px] uppercase opacity-70">
               Assembling {loadProgress}%
             </span>
          </div>
        </div>
      )}

      {/* Story Overlay */}
      <div 
        ref={textContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <div className="relative w-full max-w-5xl px-10 text-center">
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight opacity-0 italic">
            Precision <br/> in every layer
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight opacity-0">
            Fresh ingredients. <br/> <span className="text-primary italic">Perfect balance.</span>
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-primary tracking-tighter leading-tight opacity-0 italic">
            Built to satisfy.
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight opacity-0">
            Moyaaah — <br/> <span className="text-primary">Beyond ordinary</span>
          </h2>
        </div>
      </div>

      {/* Dark Vignette to kill borders */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />
    </div>
  );
}
