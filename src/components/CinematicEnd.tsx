"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicEnd() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".end-img", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        scale: 1.2,
        opacity: 0,
        y: 100,
        stagger: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="end-img relative rounded-[40px] overflow-hidden aspect-video border border-white/10 glass-card">
            <img src="/ambience/ambience_14.webp" alt="Ambience Final 1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="end-img relative rounded-[40px] overflow-hidden aspect-video border border-white/10 glass-card">
            <img src="/ambience/ambience_15.webp" alt="Ambience Final 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
