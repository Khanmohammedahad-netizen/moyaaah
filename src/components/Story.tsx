"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="story"
      ref={sectionRef}
      className="py-32 bg-secondary relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-black tracking-[0.5em] uppercase text-primary mb-4">The Origin</h2>
          <h3 className="text-5xl md:text-7xl font-black">A FLAVOUR <span className="text-primary">FIESTA.</span></h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="story-card space-y-8">
            <h4 className="text-3xl font-black leading-tight">
              FROM HYDERABAD <br />
              <span className="text-white/60">TO THE GALAXY.</span>
            </h4>
            <p className="text-lg text-white/50 leading-relaxed">
              Moyaaah wasn't just born in a kitchen; it was forged in the fires of a buffalo flame. 
              Our mission was simple: create a burger so good it feels out of this world. 
              We combined the bold energy of the city with the precision of an astronaut's mission.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-black text-primary">100%</div>
                <div className="text-xs uppercase tracking-widest text-white/30 font-bold">Juiciness</div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary">Zero</div>
                <div className="text-xs uppercase tracking-widest text-white/30 font-bold">Compromise</div>
              </div>
            </div>
          </div>

          <div className="story-card relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="glass-card overflow-hidden aspect-video relative">
              <img 
                src="/ambience/ambience_14.png"
                alt="Moyaaah Interior"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-black tracking-widest bg-primary text-secondary px-3 py-1 rounded">EST. 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
