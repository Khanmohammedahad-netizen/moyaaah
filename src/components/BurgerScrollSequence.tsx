"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 25;
const FRAME_PATH = (index: number) => `/burger/frame_${index.toString().padStart(4, '0')}.png`;

export default function BurgerScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Preload frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
          render(1); // Initial render
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const render = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[Math.round(frame) - 1] || images[0];
    
    // Clear and draw with cover fit
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const padding = 0.85; // 15% visual padding to prevent edge touching
    const ratio = Math.min(hRatio, vRatio) * padding;
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    if (isLoading || images.length === 0) return;

    // Canvas Frame Animation
    const obj = { frame: 1 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          render(obj.frame);
        }
      }
    });

    tl.to(obj, {
      frame: TOTAL_FRAMES,
      snap: "frame",
      ease: "none",
      duration: 1
    }, 0);

    // Depth effect: subtle scale
    tl.to(canvasRef.current, {
      scale: 1.05,
      ease: "none",
      duration: 1
    }, 0);

    // Story Text Timeline
    const phases = [
      { text: "Precision in every layer", start: 0, end: 0.25 },
      { text: "Fresh ingredients. Perfect balance.", start: 0.25, end: 0.5 },
      { text: "Built to satisfy. Designed to impress.", start: 0.5, end: 0.75 },
      { text: "Moyaaah — Beyond the ordinary", start: 0.75, end: 1 }
    ];

    const textElements = textContainerRef.current?.querySelectorAll('.story-text');
    
    textElements?.forEach((el, i) => {
      const phase = phases[i];
      // Fade in and move up
      gsap.fromTo(el, 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: phase.start >= 0.5 ? 1.1 : 1, // Phase 3 is slightly larger
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${phase.start * 300}% top`,
            end: `top+=${phase.end * 300}% top`,
            scrub: 0.5,
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Fade out before next phase starts (except last one)
      if (i < phases.length - 1) {
        gsap.to(el, {
          opacity: 0,
          y: -30,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${(phase.end - 0.05) * 300}% top`,
            end: `top+=${phase.end * 300}% top`,
            scrub: 0.5
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, images]);

  // Update canvas size on mount/resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas for burger animation */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
             <span className="text-primary font-black tracking-widest text-xs">PRELOADING MOYAAAH...</span>
          </div>
        </div>
      )}

      {/* Story Overlay */}
      <div 
        ref={textContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <div className="relative w-full max-w-5xl px-10 text-center">
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0 italic">
            Precision <br/> in every layer
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0">
            Fresh ingredients. <br/> <span className="text-primary italic">Perfect balance.</span>
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-6xl md:text-9xl font-black text-primary tracking-tighter leading-tight opacity-0 italic drop-shadow-[0_0_30px_rgba(255,195,0,0.3)]">
            Built to satisfy.
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0">
            Moyaaah — <br/> <span className="text-primary">Beyond ordinary</span>
          </h2>
        </div>
      </div>

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none opacity-60" />
    </div>
  );
}
