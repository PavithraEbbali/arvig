'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scrolling. Mounted once at the root.
 *
 * Skipped entirely when the visitor prefers reduced motion, and wired to
 * intercept in-page anchor clicks so the sticky header offset is respected.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route in-page anchors through Lenis with a header offset.
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -96 });
      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
