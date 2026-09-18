'use client';

import { useState } from 'react';
import Image from 'next/image';
import { hero, heroPlan, speedLabel } from '@/lib/content';
import PriceLockup from './PriceLockup';

type Status = 'idle' | 'invalid' | 'checked';

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-lime-brand"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

/**
 * Single-column hero, matching the reference layout: no boxed panel, content
 * centered in one column, and the availability check presented as a fused
 * search pill rather than a bordered card.
 *
 * The hero carries no phone CTA — the ZIP checker is the only conversion
 * element here. The header call button sits directly above it.
 */
export default function Hero() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // Frontend-only availability check: validates the ZIP format and confirms
  // that plans are set by service address. No backend call.
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(/^\d{5}$/.test(zip.trim()) ? 'checked' : 'invalid');
  };

  // Split the headline around its accented phrase. Falls back to the plain
  // headline if the phrase is ever edited out of the copy.
  const cut = hero.headline.indexOf(hero.headlineHighlight);
  const headlineParts =
    cut === -1
      ? { before: hero.headline, highlight: '', after: '' }
      : {
          before: hero.headline.slice(0, cut),
          highlight: hero.headlineHighlight,
          after: hero.headline.slice(cut + hero.headlineHighlight.length),
        };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-arvig-900 pt-[112px] pb-14 text-white sm:pt-[124px] sm:pb-24 lg:pt-[160px] lg:pb-28"
    >
      {/* Photographic backdrop under an Arvig-indigo scrim. The image is
          decorative, so it carries an empty alt and is hidden from assistive
          tech; the scrim is what holds white type at AA contrast over it. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image
          src={hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-pan object-cover object-center"
        />
        {/* Flat base gradient. Bottom-heavy so the ZIP row and trust chips sit
            on the densest part; very light at the top, where the photograph is
            dusk sky and already dark. */}
        <div className="absolute inset-0 bg-gradient-to-b from-arvig-900/12 via-arvig-900/24 to-arvig-900/58" />

        {/* Focused pool behind the copy. Density is concentrated where the text
            actually sits, so the photograph's edges run at 24% while the
            composite behind the type is ~60.5% — over the sunset strip that
            measures white 7.2:1, arvig-100 5.9:1, lime 4.4:1 (large text). */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(74% 62% at 50% 44%, rgb(29 16 96 / 0.48) 0%, rgb(29 16 96 / 0.20) 58%, transparent 80%)',
          }}
        />

        {/* Drifting light washes so the sky is never a static plate. Kept very
            faint and confined to the upper corners: a wash sits ON TOP of the
            photograph, so anything stronger lifts its blacks and the whole
            frame reads hazy rather than brighter. */}
        <div className="hero-drift-a absolute -top-[22%] -left-[6%] h-[52%] w-[38%] rounded-full bg-white/6 blur-[130px]" />
        <div className="hero-drift-b absolute -top-[10%] -right-[6%] h-[48%] w-[34%] rounded-full bg-lime-brand/7 blur-[140px]" />
      </div>

      <div className="shell relative">
        <div className="mx-auto flex min-w-0 max-w-[900px] flex-col items-center text-center">
          <span
            className="hero-rise chip bg-white/10 text-lime-brand ring-1 ring-inset ring-white/15"
            style={{ animationDelay: '0ms' }}
          >
            {hero.eyebrow}
          </span>

          <h1
            className="hero-rise mt-6 max-w-[min(18ch,100%)] sm:mt-7 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.032em] sm:max-w-[21ch] sm:text-[2.875rem] lg:text-[3.5rem]"
            style={{ animationDelay: '90ms' }}
          >
            {headlineParts.before}
            {/* Gradient fill with a slow sheen passing through it. The fallback
                colour is set first so the phrase is still lime if a browser
                does not support background-clip: text. */}
            <span className="text-lime-brand">
              <span className="text-sheen bg-gradient-to-r from-lime-brand via-white to-lime-brand bg-clip-text text-transparent">
                {headlineParts.highlight}
              </span>
            </span>
            {headlineParts.after}
          </h1>

          {/* arvig-100, not arvig-200: the lighter scrim drops arvig-200 to
              3.5:1 over the brightest part of the photograph. */}
          <p
            className="hero-rise mt-5 max-w-[62ch] text-[1rem] sm:mt-6 leading-[1.7] text-arvig-100 sm:text-[1.0625rem]"
            style={{ animationDelay: '180ms' }}
          >
            {hero.subline}
          </p>

          {/* Price anchor — same lockup component used on every plan card. */}
          {heroPlan ? (
            <div
              className="hero-rise mt-8 flex flex-wrap sm:mt-10 items-center justify-center gap-x-6 gap-y-4 rounded-[18px] border border-lime-brand/45 bg-arvig-950/45 px-7 py-5 shadow-[0_20px_50px_-26px_rgb(0_0_0/0.8)] sm:backdrop-blur-[3px]"
              style={{ animationDelay: '280ms' }}
            >
              <PriceLockup
                plan={heroPlan}
                size="lg"
                tone="dark"
                prefix={hero.anchorLabel}
              />
              {/* The divider only makes sense while this sits beside the
                  price; once it wraps below, drop the rule and centre it. */}
              <div className="border-white/20 text-center sm:border-l sm:pl-6 sm:text-left">
                <p className="text-sm font-semibold text-white">
                  {heroPlan.name}
                </p>
                <p className="mt-0.5 text-sm text-arvig-200">
                  {speedLabel(heroPlan)}
                </p>
              </div>
            </div>
          ) : null}

          {/* ---------------- Availability check ---------------- */}
          <div
            id="hero-zip"
            className="hero-rise mt-9 w-full sm:mt-12"
            style={{ animationDelay: '380ms' }}
          >
            <h2 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-white">
              {hero.zipHeading}
            </h2>

            <form
              onSubmit={onSubmit}
              noValidate
              className="mx-auto mt-4 w-full max-w-[560px]"
            >
              <label htmlFor="zip" className="sr-only">
                {hero.zipPlaceholder}
              </label>

              {/* Stacked on phones, fused into one white pill from sm up. */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_20px_50px_-22px_rgb(0_0_0/0.65)] sm:ring-1 sm:ring-white/10 sm:transition-shadow sm:focus-within:ring-2 sm:focus-within:ring-lime-brand">
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder={hero.zipPlaceholder}
                  value={zip}
                  onChange={(event) => {
                    setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
                    if (status !== 'idle') setStatus('idle');
                  }}
                  aria-invalid={status === 'invalid'}
                  aria-describedby="zip-status"
                  className="min-w-0 rounded-full bg-white px-5 py-[15px] text-[1rem] font-medium text-ink sm:text-[0.9375rem] placeholder:text-ink-mute focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-brand sm:flex-1 sm:bg-transparent sm:py-3 sm:pl-6 sm:focus-visible:ring-0"
                />
                <button
                  type="submit"
                  className="btn btn-accent shrink-0 sm:px-7 sm:py-[13px]"
                >
                  {hero.zipCta}
                </button>
              </div>

              <p
                id="zip-status"
                role="status"
                aria-live="polite"
                className="mx-auto mt-4 min-h-[1.25rem] max-w-[60ch] text-[0.8125rem] leading-relaxed"
              >
                {status === 'invalid' ? (
                  <span className="text-lime-bright">{hero.zipInvalid}</span>
                ) : null}
                {status === 'checked' ? (
                  <span className="text-arvig-100">{hero.zipSuccess}</span>
                ) : null}
              </p>
            </form>
          </div>

          {/* Trust chips */}
          <ul
            className="hero-rise mt-8 flex flex-wrap justify-center gap-2.5 sm:mt-9"
            style={{ animationDelay: '470ms' }}
          >
            {hero.trustChips.map((chip) => (
              <li
                key={chip}
                className="chip bg-white/8 text-arvig-100 ring-1 ring-inset ring-white/15"
              >
                <CheckGlyph />
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
