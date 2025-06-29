// Utility to initialize Lenis for smooth scrolling with GSAP integration (no ScrollTrigger)
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

export function initSmoothScroll() {
  if (window.__lenisInstance) return;
  const lenis = new Lenis({
    duration: 2.2,
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: true,
    touchMultiplier: 5,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  window.__lenisInstance = lenis;
}
