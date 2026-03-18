/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const STAGES = [
  {
    word: "simple",
    underlined: true,
    paragraph: "We keep our AI agent deployment for your business simple on your end while we handle the complexity. Our streamlined integration process ensures that you can focus on your core operations without getting bogged down by technical hurdles.",
    color: "text-emerald-600",
    accent: "#10b981",
    cta: "Scroll to explore more"
  },
  {
    word: "sturdy",
    underlined: true,
    paragraph: "Our AI solutions are built on a foundation of reliability and security. We ensure that your deployment remains resilient under pressure, providing consistent performance that your business can depend on 24/7.",
    color: "text-blue-600",
    accent: "#2563eb",
    cta: "Keep scrolling"
  },
  {
    word: "scalable",
    underlined: true,
    paragraph: "As your business grows, our AI agents grow with you. We design our systems to handle increasing workloads effortlessly, allowing you to expand your reach and impact without needing to re-engineer your infrastructure.",
    color: "text-indigo-600",
    accent: "#4f46e5",
    cta: "Ready to scale? Let's talk."
  }
];

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const isTransitioning = useRef(false);
  const touchStart = useRef<number | null>(null);

  const nextStage = () => {
    if (currentStage < STAGES.length - 1 && !isTransitioning.current) {
      setCurrentStage(prev => prev + 1);
      startCooldown();
    }
  };

  const prevStage = () => {
    if (currentStage > 0 && !isTransitioning.current) {
      setCurrentStage(prev => prev - 1);
      startCooldown();
    }
  };

  const startCooldown = () => {
    isTransitioning.current = true;
    setTimeout(() => {
      isTransitioning.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        nextStage();
      } else {
        prevStage();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStart.current === null) return;
      const touchEnd = e.touches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextStage();
        } else {
          prevStage();
        }
        touchStart.current = null;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextStage();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevStage();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStage]);

  return (
    <div className="fixed inset-0 bg-stone-50 font-sans selection:bg-emerald-100 overflow-hidden touch-none">
      {/* Background Accent */}
      <motion.div 
        className="absolute inset-0 -z-10 opacity-10"
        animate={{
          background: `radial-gradient(circle at 30% 50%, ${STAGES[currentStage].accent} 0%, transparent 60%)`
        }}
        transition={{ duration: 1 }}
      />

      <div className="h-full w-full flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-stone-900 mb-12 leading-tight">
            <div className="block opacity-60">keep your</div>
            <div className="flex items-center gap-x-4 flex-wrap">
              <span>business</span>
              <div className="inline-block relative">
                {/* Text Window */}
                <div className="relative h-[1.2em] overflow-hidden min-w-[4ch]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={STAGES[currentStage].word}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className={`inline-block ${STAGES[currentStage].color}`}
                    >
                      {STAGES[currentStage].word}
                    </motion.span>
                  </AnimatePresence>
                </div>
                
                {/* Static Underline - Animates width based on stage */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    opacity: STAGES[currentStage].underlined ? 1 : 0,
                    scaleX: STAGES[currentStage].underlined ? 1 : 0,
                    backgroundColor: STAGES[currentStage].accent
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute -bottom-1 left-0 h-1 w-full origin-left"
                />
              </div>
            </div>
          </h1>

          <div className="h-40 md:h-32 flex items-start">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base md:text-lg text-stone-500 leading-relaxed max-w-xl text-left"
              >
                {STAGES[currentStage].paragraph}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Interaction Hint / CTA */}
        <div className="absolute bottom-12 left-12 md:left-24 flex flex-col items-start gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage === STAGES.length - 1 ? 'cta' : 'hint'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col gap-1"
            >
              <span className={`text-xs uppercase tracking-widest font-semibold ${currentStage === STAGES.length - 1 ? STAGES[currentStage].color : 'text-stone-400'}`}>
                {STAGES[currentStage].cta}
              </span>
              {currentStage !== STAGES.length - 1 && (
                <span className="text-[10px] text-stone-300 uppercase tracking-tighter">Scroll or Swipe</span>
              )}
            </motion.div>
          </AnimatePresence>
          
          <div className="w-24 h-px bg-stone-200 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-stone-800"
              animate={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
