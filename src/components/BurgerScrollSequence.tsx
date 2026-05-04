"use client";

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BurgerModel() {
  const { scene } = useGLTF('/models/burger.glb');
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!modelRef.current) return;

    // Initial setup
    modelRef.current.rotation.y = Math.PI * 0.5;
    modelRef.current.scale.set(0, 0, 0);

    // Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#story",
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(modelRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 })
      .to(modelRef.current.rotation, { y: Math.PI * 2.5, duration: 4 }, 0)
      .to(modelRef.current.position, { y: 0.5, duration: 2 }, 1)
      .to(modelRef.current.rotation, { x: 0.2, duration: 2 }, 2);

    // Sync Text Phases
    const phases = [".phase-1", ".phase-2", ".phase-3", ".phase-4"];
    phases.forEach((phase, i) => {
      gsap.to(phase, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: "#story",
          start: `top+=${(i * 25)}% top`,
          end: `top+=${((i + 1) * 25)}% top`,
          scrub: true,
          toggleActions: "play reverse play reverse"
        }
      });
    });

  }, []);

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      position={[0, -0.5, 0]} 
    />
  );
}

export default function BurgerScrollSequence() {
  return (
    <section id="story" className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          <Suspense fallback={null}>
            <Stage />
            <BurgerModel />
            <Environment preset="studio" intensity={0.5} />
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4.5} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Story Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <div className="phase-1 opacity-0 translate-y-20 blur-xl">
            <h3 className="text-primary font-black text-2xl md:text-3xl mb-4 tracking-widest uppercase">Phase 01</h3>
            <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-none">
              REALITY IN <br/> EVERY <span className="text-primary italic">PIXEL.</span>
            </h2>
          </div>
          
          <div className="phase-2 absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20 blur-xl">
            <h3 className="text-primary font-black text-2xl md:text-3xl mb-4 tracking-widest uppercase">Phase 02</h3>
            <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-none">
              CRAFTED BY <br/> <span className="text-primary">ENGINEERS.</span>
            </h2>
          </div>

          <div className="phase-3 absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20 blur-xl">
            <h3 className="text-primary font-black text-2xl md:text-3xl mb-4 tracking-widest uppercase">Phase 03</h3>
            <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-none">
              FLAVOR WITHOUT <br/> <span className="text-primary">BOUNDARIES.</span>
            </h2>
          </div>

          <div className="phase-4 absolute inset-0 flex flex-col items-center justify-center opacity-0 translate-y-20 blur-xl">
            <h3 className="text-primary font-black text-2xl md:text-3xl mb-4 tracking-widest uppercase">Phase 04</h3>
            <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-none">
              THE FUTURE <br/> IS <span className="text-primary">MOYAAAH.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
    </section>
  );
}

function Stage() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#FFC300" />
    </>
  );
}
