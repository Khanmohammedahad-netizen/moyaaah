"use client";

import React from 'react';
import { Rocket, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2 space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Rocket className="text-secondary" size={24} />
                </div>
                <span className="text-4xl font-black tracking-tighter text-primary">MOYAAAH!</span>
             </div>
             <p className="text-2xl font-bold text-white/40 leading-snug max-w-md">
               The galaxy's favorite burger joint. <br/>
               Hyderabad’s iconic flavor fiesta.
             </p>
             <div className="flex gap-6">
               {[Rocket, Globe, ArrowUpRight].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-all">
                   <Icon size={20} />
                 </a>
               ))}
             </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-primary font-black uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Our Story', 'Menu', 'Ambience'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-primary font-black uppercase tracking-widest text-sm">Join the Fiesta</h4>
            <p className="text-white/40 text-sm">Get cosmic updates and secret menu reveals in your inbox.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs font-bold focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-secondary px-6 rounded-full font-black text-[10px]">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">
          <div>© 2026 MOYAAAH! ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div>POWERED BY COSMIC ENERGY</div>
        </div>
      </div>
    </footer>
  );
}
