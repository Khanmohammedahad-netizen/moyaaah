"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = Array.from({ length: 20 }, (_, i) => `/gallery/img_${(i + 1).toString().padStart(4, '0')}.png`);

export default function RevolvingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = galleryRef.current?.querySelectorAll('.gallery-img');
      if (!images) return;

      // Initial placement with high depth spacing
      images.forEach((img, i) => {
        const depth = i * 600; // dramatically increased spacing
        gsap.set(img, {
          rotateY: i * 15, // subtle rotation
          z: -depth,
          scale: 1 - i * 0.05,
          opacity: 1 - i * 0.1,
          transformOrigin: "center center"
        });
      });

      // Pinned Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // Longer scroll for more depth
          pin: true,
          scrub: 1.5,
        }
      });

      // Move the entire stack forward as we scroll
      tl.to(galleryRef.current, {
        z: 8000, // Move forward dramatically
        ease: "none",
        duration: 1
      });

      // Text Animation
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top+=40% top",
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden perspective-2000">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient-cosmic opacity-50" />

      {/* Gallery Wrapper (Camera Distance) */}
      <div className="absolute inset-0 flex items-center justify-center translate-z-[-1200px]">
        <div 
          ref={galleryRef}
          className="relative w-full h-full flex items-center justify-center preserve-3d"
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div 
              key={i}
              className="gallery-img absolute w-[350px] md:w-[450px] aspect-[4/5] rounded-[30px] overflow-hidden border border-white/10 glass-card preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Center Text Overlay */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
      >
        <h2 className="text-4xl md:text-8xl font-black text-white text-glow text-center leading-none tracking-tighter drop-shadow-2xl">
          CRAFTED. <br/>
          LAYERED. <br/>
          <span className="text-primary italic">PERFECTED.</span>
        </h2>
      </div>

      {/* Floating Particles or Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
}
