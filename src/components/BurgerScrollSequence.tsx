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
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload frames with progress tracking
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
          // Small delay to ensure state updates
          setTimeout(() => render(1), 100);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const render = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Performance optimization
    if (!ctx) return;

    // Use floor to get current frame, but could potentially do more if we had more frames
    const index = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(frame) - 1));
    const img = images[index];
    if (!img) return;
    
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const padding = 0.8; // Comfortable visual padding
    const ratio = Math.min(hRatio, vRatio) * padding;
    
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;
    
    // Smooth drawing
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const obj = { frame: 1 };
    
    // Main Timeline with increased scrub for momentum
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // Longer scroll for more control
        pin: true,
        scrub: 2.5, // High scrub value for "Figma-smooth" weight
        onUpdate: (self) => {
          // Sync render to GSAP progression
          render(obj.frame);
        }
      }
    });

    // Frame Progression with ultra-smooth easing
    tl.to(obj, {
      frame: TOTAL_FRAMES,
      ease: "power2.inOut",
      duration: 1
    }, 0);

    // Subtle scale and position drift for depth
    tl.to(canvasRef.current, {
      scale: 1.08,
      y: -20,
      ease: "power1.inOut",
      duration: 1
    }, 0);

    // Story Text Timeline with "Figma-level" refined transitions
    const phases = [
      { text: "Precision in every layer", start: 0, end: 0.2 },
      { text: "Fresh ingredients. Perfect balance.", start: 0.25, end: 0.45 },
      { text: "Built to satisfy. Designed to impress.", start: 0.5, end: 0.7 },
      { text: "Moyaaah — Beyond the ordinary", start: 0.75, end: 0.95 }
    ];

    const textElements = textContainerRef.current?.querySelectorAll('.story-text');
    
    textElements?.forEach((el, i) => {
      const phase = phases[i];
      
      // Reveal
      gsap.fromTo(el, 
        { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${phase.start * 400}% top`,
            end: `top+=${(phase.start + 0.1) * 400}% top`,
            scrub: 1,
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Dismiss
      gsap.to(el, {
        opacity: 0,
        y: -30,
        filter: "blur(10px)",
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top+=${(phase.end - 0.05) * 400}% top`,
          end: `top+=${phase.end * 400}% top`,
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, images]);

  // Handle Resize
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
      {/* Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-contain"
      />

      {/* Premium Loader */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center gap-6">
             <div className="relative w-64 h-1 bg-white/10 rounded-full overflow-hidden">
               <div 
                 className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out" 
                 style={{ width: `${loadProgress}%` }}
               />
             </div>
             <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">
               Synchronizing Flavor {loadProgress}%
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
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0 italic">
            Precision <br/> in every layer
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0">
            Fresh ingredients. <br/> <span className="text-primary italic">Perfect balance.</span>
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-6xl md:text-9xl font-black text-primary tracking-tighter leading-tight opacity-0 italic">
            Built to satisfy.
          </h2>
          <h2 className="story-text absolute inset-0 flex items-center justify-center text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight opacity-0">
            Moyaaah — <br/> <span className="text-primary">Beyond ordinary</span>
          </h2>
        </div>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient-vignette pointer-events-none opacity-40" />
    </div>
  );
}
