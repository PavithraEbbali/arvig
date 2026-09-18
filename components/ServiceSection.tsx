import Image from 'next/image';
import { plansFor, type ServiceSection as Section } from '@/lib/content';
import PlanCard from './PlanCard';
import Reveal from './Reveal';

/**
 * Renders one service line. The same component drives fiber, cable, bundles,
 * TV, mobile and phone — the order, the copy and the photography all come from
 * serviceSections in lib/content.ts, so adding or removing a service line (or
 * an image) is a data edit, never a layout edit.
 *
 * A section with no plans behind it is filtered out upstream by
 * `activeSections`, so no empty placeholder can ever render.
 */
export default function ServiceSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  const sectionPlans = plansFor(section.serviceLine);
  if (sectionPlans.length === 0) return null;

  const image = section.image;
  const beside = image?.layout === 'side';
  const asBackground = image?.layout === 'background';
  // A section carrying a full-bleed photograph provides its own surface, so it
  // opts out of the alternating white / off-white rhythm.
  const tinted = !asBackground && index % 2 === 1;

  // Card grid columns. Beside an image the cards get less room, so they stay
  // narrower than they would across the full container.
  const columns = beside || asBackground
    ? sectionPlans.length === 1
      ? 'grid-cols-1'
      : 'grid-cols-1 sm:grid-cols-2'
    : sectionPlans.length === 1
      ? 'sm:grid-cols-1 sm:max-w-[520px]'
      : sectionPlans.length === 2
        ? 'sm:grid-cols-2 lg:max-w-[860px]'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  const cards = (
    <div className={`grid grid-cols-1 gap-6 ${columns}`}>
      {sectionPlans.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 70} className="h-full">
          <PlanCard plan={plan} />
        </Reveal>
      ))}
    </div>
  );

  const header = (
    <>
      <span className="eyebrow">{section.eyebrow}</span>
      <h2 className="mt-3.5 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] text-arvig-900 sm:text-[2.125rem]">
        {section.heading}
      </h2>
      <p className="mt-4 text-[1rem] leading-[1.7] text-ink-soft">
        {section.intro}
      </p>
    </>
  );

  /** Centred, light-on-dark header used over a photographic background. */
  const headerOnDark = (
    <>
      {/* White, not lime. Over this photography the lime accent only reaches
          2.6-3.8:1 at the reduced scrim levels; it passed before purely
          because the scrim sat at 70%. */}
      <span className="eyebrow text-white">{section.eyebrow}</span>
      <h2 className="mt-4 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] text-white sm:text-[2.25rem]">
        {section.heading}
      </h2>
      <p className="mx-auto mt-5 max-w-[62ch] text-[1rem] leading-[1.7] text-arvig-100">
        {section.intro}
      </p>
    </>
  );

  /* ---------------- Full-bleed photographic section ---------------- */
  if (asBackground && image) {
    return (
      <section
        id={section.id}
        className="relative overflow-hidden bg-arvig-900 text-white"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: image.objectPosition ?? 'center' }}
        />

        {/* Indigo scrim. This carries white type over the photograph and hides
            the upscale of a 1250px source running edge to edge.
            Floor set by measurement against the cable shot's overcast sky
            (~200,200,204), the brightest backdrop behind any text here: at the
            58% mid stop white is 5.9:1 and arvig-100 4.8:1. Going lighter
            drops the intro paragraph below AA. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-arvig-900/50 via-arvig-900/58 to-arvig-900/74"
        />

        <div className="shell relative py-18 sm:py-20 lg:py-24">
          <Reveal>
            <header className="mx-auto max-w-[760px] text-center">
              {headerOnDark}
            </header>
          </Reveal>

          {/* White cards read cleanly against the darkened photograph. */}
          <div
            className={`mx-auto mt-11 ${
              sectionPlans.length === 1 ? 'max-w-[520px]' : 'max-w-[880px]'
            }`}
          >
            {cards}
          </div>

          {section.footnote ? (
            <Reveal>
              <p className="mx-auto mt-8 max-w-[76ch] text-center text-[0.8125rem] leading-[1.6] text-arvig-200">
                {section.footnote}
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  /* ---------------- Standard section ---------------- */
  return (
    <section
      id={section.id}
      className={`py-18 sm:py-20 lg:py-24 ${tinted ? 'bg-canvas-alt' : 'bg-white'}`}
    >
      <div className="shell">
        <Reveal>
          <header className="max-w-[62ch]">{header}</header>
        </Reveal>

        {/* --- Banner image: full width above the cards --- */}
        {image && !beside ? (
          <Reveal>
            <div className="relative mt-10 h-[210px] overflow-hidden rounded-[16px] sm:h-[280px] lg:h-[340px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1220px) 1156px, 100vw"
                className="object-cover"
                style={{ objectPosition: image.objectPosition ?? 'center' }}
              />
            </div>
          </Reveal>
        ) : null}

        {/* --- Side image: image and cards share a row from lg up --- */}
        {beside && image ? (
          <div className="mt-11 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-10">
            <Reveal>
              <div className="relative h-[230px] overflow-hidden rounded-[16px] sm:h-[320px] lg:h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 460px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: image.objectPosition ?? 'center' }}
                />
              </div>
            </Reveal>
            <div className="min-w-0">{cards}</div>
          </div>
        ) : (
          <div className="mt-11">{cards}</div>
        )}

        {section.footnote ? (
          <Reveal>
            <p className="mt-8 max-w-[76ch] text-[0.8125rem] leading-[1.6] text-ink-mute">
              {section.footnote}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
