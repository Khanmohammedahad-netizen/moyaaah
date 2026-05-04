"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = Array.from({ length: 25 }, (_, i) => `/ambience/ambience_${(i + 1).toString().padStart(2, '0')}.webp`);

export default function RevolvingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const columns = [column1Ref.current, column2Ref.current, column3Ref.current];
    
    const ctx = gsap.context(() => {
      columns.forEach((col, i) => {
        if (!col) return;
        
        // Different speeds for each column to create parallax collage feel
        const speed = 100 + (i * 150); 
        
        gsap.to(col, {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // Reveal images on scroll
      const images = containerRef.current?.querySelectorAll('.collage-img');
      images?.forEach((img) => {
        gsap.fromTo(img, 
          { opacity: 0, scale: 0.8, y: 50 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: img,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split images into 3 columns for the collage
  const col1 = GALLERY_IMAGES.slice(0, 8);
  const col2 = GALLERY_IMAGES.slice(8, 16);
  const col3 = GALLERY_IMAGES.slice(16, 25);

  return (
    <section ref={containerRef} className="relative w-full py-20 md:py-40 bg-black overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-radial-gradient-cosmic opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            CRAFTED. <span className="text-primary italic">LAYERED.</span> <br/> PERFECTED.
          </h2>
          <p className="mt-6 text-white/50 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
            A visual symphony of flavor and texture, captured in every frame of our craft.
          </p>
        </div>

        {/* Floating Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Column 1 */}
          <div ref={column1Ref} className="flex flex-col gap-6 md:gap-10 pt-20">
            {col1.map((src, i) => (
              <div key={i} className="collage-img group relative rounded-3xl overflow-hidden aspect-[3/4] border border-white/10 glass-card">
                <img src={src} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={column2Ref} className="flex flex-col gap-6 md:gap-10">
            {col2.map((src, i) => (
              <div key={i} className="collage-img group relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/10 glass-card">
                <img src={src} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div ref={column3Ref} className="flex flex-col gap-6 md:gap-10 pt-40">
            {col3.map((src, i) => (
              <div key={i} className="collage-img group relative rounded-3xl overflow-hidden aspect-[3/4] border border-white/10 glass-card">
                <img src={src} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Text in background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left text-[20vh] font-black text-white/5 pointer-events-none select-none">
        GALLERY
      </div>
      <div className="absolute bottom-0 right-0 text-[20vh] font-black text-white/5 pointer-events-none select-none translate-y-1/4">
        MOYAAAH
      </div>
    </section>
  );
}
