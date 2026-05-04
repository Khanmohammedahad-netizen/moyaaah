"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Rocket, ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
    )
    .fromTo(burgerRef.current,
      { opacity: 0, scale: 0.5, rotate: -20 },
      { opacity: 1, scale: 1, rotate: 0, duration: 2, ease: "elastic.out(1, 0.5)" },
      "-=1"
    );

    // Floating animation for burger
    gsap.to(burgerRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-cosmic"
    >
      {/* Parallax Stars Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000" 
          alt="Space" 
          className="w-full h-full object-cover mix-blend-screen"
        />
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div ref={textRef} className="md:w-1/2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Rocket size={16} className="text-primary" />
            <span className="text-primary text-xs font-black tracking-widest uppercase">Flavour Beyond This World</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black leading-[0.9] mb-6">
            UNLEASH <br />
            <span className="moyaaah-gradient text-glow">THE BEAST.</span>
          </h1>
          
          <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
            Welcome to the ultimate flavor fiesta. Hyderabad's most iconic smashed burgers, 
            crafted with passion and served with a side of cosmic energy.
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button className="bg-primary text-secondary px-8 py-4 rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
              EXPLORE MENU
            </button>
            <button className="bg-white/10 text-white px-8 py-4 rounded-full font-black text-lg backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
              FIND US
            </button>
          </div>
        </div>

        {/* Hero Image (Burger) */}
        <div className="md:w-1/2 flex justify-center items-center relative">
          <div className="absolute w-[120%] h-[120%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div ref={burgerRef} className="relative z-10 w-full max-w-[500px]">
             {/* We'll use a high-end burger image that looks "smashed" */}
             <img 
               src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000" 
               alt="Smashed Buff Burger"
               className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-125"
             />
             {/* Mock Astronaut Icon/Mascot overlay if possible */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary glass-card flex items-center justify-center rotate-12">
                <span className="text-xs font-black text-center text-primary leading-tight">
                  BURGASM<br/>GUARANTEED
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer flex flex-col items-center gap-2">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">Scroll to Explore</span>
        <ChevronDown size={20} className="text-primary" />
      </div>
    </section>
  );
}
