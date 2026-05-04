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

      const totalImages = images.length;
      const angleStep = (Math.PI * 2) / totalImages;
      const radius = 600; // Radius of the circle

      // Initial placement in 3D circle
      images.forEach((img, i) => {
        const angle = i * angleStep;
        gsap.set(img, {
          x: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
          rotationY: (angle * 180) / Math.PI,
          opacity: Math.cos(angle) > 0 ? 1 : 0.2, // Fade those in the back
          scale: Math.cos(angle) > 0 ? 1 : 0.8,
          filter: Math.cos(angle) > 0 ? "blur(0px)" : "blur(10px)"
        });
      });

      // Pinned Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1.5,
        }
      });

      // Rotate the entire gallery container
      tl.to(galleryRef.current, {
        rotationY: 360,
        ease: "none",
        duration: 1
      });

      // Dynamic adjustments for each image during rotation
      // This is slightly complex to do in a single scrub, but we can animate properties based on rotation
      tl.to({}, {
        onUpdate: () => {
          const rotation = gsap.getProperty(galleryRef.current, "rotationY") as number;
          const rad = (rotation * Math.PI) / 180;
          
          images.forEach((img, i) => {
            const angle = i * angleStep + rad;
            const cos = Math.cos(angle);
            
            gsap.set(img, {
              opacity: cos > 0.5 ? 1 : cos > 0 ? 0.5 : 0.1,
              scale: cos > 0 ? 0.8 + cos * 0.4 : 0.7,
              filter: cos > 0.6 ? "blur(0px)" : `blur(${(1 - cos) * 10}px)`,
              zIndex: Math.round(cos * 100)
            });
          });
        },
        duration: 1
      }, 0);

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
            end: "top+=50% top",
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

      {/* Gallery Container */}
      <div className="absolute inset-0 flex items-center justify-center translate-z-[-1000px]">
        <div 
          ref={galleryRef}
          className="relative w-full h-full flex items-center justify-center preserve-3d"
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div 
              key={i}
              className="gallery-img absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-[30px] overflow-hidden border border-white/10 glass-card preserve-3d"
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
        <h2 className="text-5xl md:text-9xl font-black text-white text-glow text-center leading-none tracking-tighter">
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
