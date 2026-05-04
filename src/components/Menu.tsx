"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Flame, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  {
    id: 1,
    name: "Smashed Buff Burger",
    description: "Gooey melted cheese on smashed juicy buff patties. A classic for the brave.",
    price: "₹499",
    image: "/ambience/ambience_10.webp",
    tag: "BEST SELLER",
    icon: <Flame className="text-orange-500" size={16} />
  },
  {
    id: 2,
    name: "Buff Ribs",
    description: "Juicy ribs glazed with our signature MOYAAAH Steak Sauce. Falls off the bone.",
    price: "₹899",
    image: "/ambience/ambience_11.webp",
    tag: "MUST TRY",
    icon: <Star className="text-yellow-500" size={16} />
  },
  {
    id: 3,
    name: "Mango Harissa Burger",
    description: "A spicy-sweet cosmic blast. Smashed patty with mango harissa glaze.",
    price: "₹549",
    image: "/ambience/ambience_12.webp",
    tag: "NEW RELEASE",
    icon: <Zap className="text-blue-500" size={16} />
  }
];

export default function Menu() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black tracking-[0.5em] uppercase text-primary mb-4">The Collection</h2>
            <h3 className="text-5xl md:text-7xl font-black leading-none">SIGNATURE <br/><span className="moyaaah-gradient text-glow">SELECTIONS.</span></h3>
          </div>
          <button className="text-primary font-black tracking-widest border-b-2 border-primary pb-1 hover:text-white hover:border-white transition-all">
            VIEW FULL MENU
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="menu-item group cursor-pointer"
            >
              <div className="relative glass-card overflow-hidden rounded-[40px] aspect-[4/5] mb-8">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                
                {/* Floating Tag */}
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  {item.icon}
                  <span className="text-[10px] font-black tracking-widest uppercase text-white">{item.tag}</span>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-10 left-8 right-8 transition-transform duration-500 group-hover:-translate-y-4">
                  <div className="text-4xl font-black mb-2 text-white">{item.price}</div>
                  <h4 className="text-2xl font-black text-primary mb-4 leading-tight">{item.name}</h4>
                  <p className="text-sm text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Add Button */}
                <button className="absolute bottom-10 right-8 w-14 h-14 bg-primary text-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:rotate-90">
                   <span className="text-3xl font-black">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
