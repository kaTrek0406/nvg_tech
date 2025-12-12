import { useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Context for Lenis instance
const LenisContext = createContext(null);

/**
 * Lenis Provider Component
 * Initializes smooth scroll and integrates with GSAP ScrollTrigger
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false, // Disable on touch for native scroll feel
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Animation frame loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access Lenis instance
 * @returns {Lenis | null} Lenis instance
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Scroll to element smoothly
 * @param {string} selector - CSS selector or element ID
 * @param {Object} options - Scroll options
 */
export function scrollTo(selector, options = {}) {
  const lenis = lenisRef?.current;
  if (!lenis) return;

  const target = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector;

  if (target) {
    lenis.scrollTo(target, {
      offset: options.offset || 0,
      duration: options.duration || 1.2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      ...options,
    });
  }
}
