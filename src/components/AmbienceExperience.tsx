"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AMBIENCE_PICS = [
  '/ambience/ambience_02.png',
  '/ambience/ambience_03.png',
  '/ambience/ambience_04.png',
  '/ambience/ambience_05.png',
  '/ambience/ambience_06.png',
  '/ambience/ambience_07.png',
  '/ambience/ambience_08.png',
];

export default function AmbienceExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section className="bg-black overflow-hidden">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
          
          {/* Introduction Slide */}
          <div className="h-screen w-screen flex items-center justify-center flex-shrink-0 relative">
            <div className="absolute inset-0 bg-radial-gradient-cosmic opacity-40" />
            <div className="z-10 text-center max-w-4xl px-6">
              <h2 className="text-primary font-black text-2xl md:text-3xl mb-4 tracking-widest uppercase">The Atmosphere</h2>
              <h3 className="text-white text-6xl md:text-9xl font-black tracking-tighter leading-none mb-8">
                BEYOND <br/> THE <span className="italic">ORDINARY.</span>
              </h3>
              <p className="text-white/50 text-lg md:text-xl font-medium tracking-wide">
                Experience a space where cosmic aesthetics meet premium comfort.
              </p>
            </div>
          </div>

          {/* Photo Slides */}
          {AMBIENCE_PICS.map((src, i) => (
            <div key={i} className="h-screen w-screen flex items-center justify-center flex-shrink-0 px-10 md:px-40 relative group">
              <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden border border-white/10 glass-card">
                <img 
                  src={src} 
                  alt={`Ambience ${i + 2}`} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          ))}

          {/* Decorative Background Text */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[40vh] font-black text-white/[0.03] pointer-events-none select-none whitespace-nowrap">
            MOYAAAH AMBIENCE EXPERIENCE MOYAAAH
          </div>
        </div>
      </div>
    </section>
  );
}
