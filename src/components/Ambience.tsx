"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Ambience() {
  return (
    <section id="ambience" className="py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full" />
             <div className="relative aspect-square rounded-[60px] overflow-hidden border border-white/5">
                <img 
                  src="/ambience/ambience_13.png"
                  alt="Interior" 
                  className="w-full h-full object-cover"
                />
                {/* Neon Overlay effect */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
             </div>
             
             {/* Floating Elements */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 glass-card p-8 rotate-12"
             >
                <div className="text-primary text-4xl font-black mb-1 italic">NEON</div>
                <div className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Vibes Only</div>
             </motion.div>
          </div>

          <div className="space-y-10">
            <h2 className="text-sm font-black tracking-[0.5em] uppercase text-primary">The Atmosphere</h2>
            <h3 className="text-5xl md:text-8xl font-black leading-none">VIBES FROM <br/><span className="text-glow italic">OTHER PLANETS.</span></h3>
            <p className="text-xl text-white/50 leading-relaxed max-w-xl">
              Step into a space where time slows down and flavor takes flight. 
              Our neon-soaked interiors are designed for the dreamers, the foodies, and the cosmic explorers. 
              Warm lighting, immersive soundscapes, and the smell of sizzling buffalo patties.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="p-8 glass-card border-primary/20">
                <div className="text-primary font-black mb-2 uppercase text-xs tracking-widest">Open Daily</div>
                <div className="text-white text-xl font-bold">12 PM - 1 AM</div>
              </div>
              <div className="p-8 glass-card border-accent/20">
                <div className="text-accent font-black mb-2 uppercase text-xs tracking-widest">Location</div>
                <div className="text-white text-xl font-bold">Hyderabad, IN</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
