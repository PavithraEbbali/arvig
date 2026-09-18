'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    /** Set on first Reveal mount; read by the boot script in app/layout.tsx. */
    __revealReady?: boolean;
  }
}

/* ==========================================================================
   SHARED REVEAL CONTROLLER

   One rAF-driven pass drives every reveal on the page rather than giving each
   element its own IntersectionObserver.

   IntersectionObserver was the original approach and proved unreliable here:
   the browser only delivers its callbacks while the page is actively
   painting, so elements scrolled into view could stay stuck at opacity 0.
   Measuring rects directly on scroll is deterministic — if an element is on
   screen it gets revealed, full stop.

   Elements drop out of the registry as soon as they fire, so the pass is
   O(remaining) and the listeners detach once the page is fully revealed.
   ========================================================================== */

type Entry = { el: HTMLElement; show: () => void };

let pending: Entry[] = [];
let queued = false;
let listening = false;
let sweep: ReturnType<typeof setTimeout> | null = null;

function pass() {
  queued = false;

  const vh = window.innerHeight;
  // Hold the reveal until the element is a little way into the viewport.
  const threshold = vh - Math.min(vh * 0.1, 90);

  pending = pending.filter(({ el, show }) => {
    const rect = el.getBoundingClientRect();
    const onScreen = rect.top < threshold && rect.bottom > 0;
    if (onScreen) {
      show();
      return false;
    }
    return true;
  });

  if (pending.length === 0) detach();
}

/**
 * Coalesce to one pass per task, via a microtask rather than
 * requestAnimationFrame. rAF only runs while the page is painting, so a
 * backgrounded or occluded tab could otherwise scroll past a section and leave
 * it stuck at opacity 0. A microtask always runs.
 */
function schedule() {
  if (queued) return;
  queued = true;
  queueMicrotask(pass);
}

/**
 * Slow backstop. Browsers suspend scroll events, rAF and IntersectionObserver
 * in a hidden or occluded tab, so a reveal driven only by those can be left
 * stranded at opacity 0. Timers keep running (throttled), so this guarantees
 * every pending element is eventually checked no matter what. It stops itself
 * as soon as the registry empties.
 */
function startSweep() {
  if (sweep !== null) return;
  sweep = setTimeout(function tick() {
    sweep = null;
    pass();
    if (pending.length) startSweep();
  }, 700);
}

function attach() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  startSweep();
}

function detach() {
  if (!listening) return;
  listening = false;
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  document.removeEventListener('visibilitychange', schedule);
  if (sweep !== null) {
    clearTimeout(sweep);
    sweep = null;
  }
}

function register(entry: Entry) {
  pending.push(entry);
  attach();
  schedule();

  return () => {
    pending = pending.filter((e) => e !== entry);
    if (pending.length === 0) detach();
  };
}

/* ========================================================================== */

/**
 * One-shot entrance reveal. Fades and lifts an element the first time it
 * enters the viewport, then stops tracking it.
 *
 * The hidden starting state lives behind `html[data-reveal='on']`, which the
 * boot script in app/layout.tsx removes if the app never hydrates — so a JS
 * failure degrades to fully visible content rather than a blank page.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'header';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Signals the boot script that hydration happened, so it leaves the
    // reveals armed instead of disarming them at its deadline.
    window.__revealReady = true;

    const node = ref.current;
    if (!node) {
      setVisible(true);
      return;
    }

    return register({ el: node, show: () => setVisible(true) });
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
