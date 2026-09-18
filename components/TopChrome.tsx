'use client';

import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/content';
import CallCta from './CallCta';
import Wordmark from './Wordmark';

function PhoneGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

/**
 * Global top chrome: the persistent disclosure bar plus the sticky header.
 *
 * The disclosure bar is non-dismissable by design — there is no close control
 * and it is rendered above the header inside the same fixed stack, so it stays
 * on screen for the whole session.
 */
export default function TopChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* --- Persistent disclosure bar (non-dismissable) --- */}
      <div className="bg-arvig-900 text-white">
        <div className="shell flex min-h-[34px] items-center justify-center py-1.5">
          <p className="text-center text-[0.75rem] font-medium leading-snug tracking-[0.01em] text-arvig-100 sm:text-[0.8125rem]">
            {site.disclosure}
          </p>
        </div>
      </div>

      {/* --- Sticky header --- */}
      <header
        className={`border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
          scrolled
            ? 'border-line shadow-[0_6px_28px_-22px_rgb(29_16_96/0.5)]'
            : 'border-transparent'
        }`}
      >
        <div className="shell flex h-[64px] items-center justify-between gap-4">
          <a
            href="#top"
            className="shrink-0"
            aria-label={`${site.retailerName} — back to top`}
          >
            <Wordmark />
          </a>

          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Section navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-arvig-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Header is one of the two places the raw number is the label. */}
            <CallCta
              location="header"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              <PhoneGlyph className="h-4 w-4" />
              {site.phoneDisplay}
            </CallCta>

            <CallCta
              location="header-compact"
              className="btn btn-primary btn-sm !py-[13px] sm:hidden"
              ariaLabel={`Call ${site.phoneDisplay}`}
            >
              <PhoneGlyph className="h-4 w-4" />
              Call
            </CallCta>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-arvig-700 transition-colors hover:bg-arvig-50 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* --- Mobile nav --- */}
        <div
          id="mobile-nav"
          hidden={!menuOpen}
          className="border-t border-line bg-white md:hidden"
        >
          <nav className="shell flex flex-col py-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-line-soft py-3.5 text-[0.9375rem] font-medium text-ink last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
