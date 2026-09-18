import Image from 'next/image';
import { cta, howItWorks, whyUs } from '@/lib/content';
import CallCta from './CallCta';
import Reveal from './Reveal';

export default function HowItWorks() {
  return (
    <>
      {/* ---------------- How it works ---------------- */}
      <section
        id="how-it-works"
        className="bg-arvig-900 py-18 text-white sm:py-20 lg:py-24"
      >
        <div className="shell">
          <Reveal>
            <header className="max-w-[58ch]">
              <span className="eyebrow eyebrow-on-dark">
                {howItWorks.eyebrow}
              </span>
              <h2 className="mt-3.5 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] sm:text-[2.125rem]">
                {howItWorks.heading}
              </h2>
            </header>
          </Reveal>

          {/* Install photography beside the steps — the local-technician claim
              is the one worth showing rather than only stating. */}
          <div className="mt-11 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            <Reveal>
              <div className="relative h-[240px] overflow-hidden rounded-[16px] sm:h-[330px] lg:h-[430px]">
                <Image
                  src={howItWorks.image.src}
                  alt={howItWorks.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <ol className="flex min-w-0 flex-col gap-5">
              {howItWorks.steps.map((step, i) => (
                <Reveal as="li" key={step.n} delay={i * 80}>
                  <div className="flex gap-5 rounded-[16px] border border-white/12 bg-white/[0.05] p-6">
                    <span className="mt-0.5 text-[0.8125rem] font-bold tracking-[0.1em] text-lime-brand">
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.125rem] font-bold tracking-[-0.015em]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-[1.65] text-arvig-200">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal>
            <div className="mt-11 flex flex-col items-start gap-4 border-t border-white/12 pt-9 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-arvig-200">
                Ready to see what reaches your address? A retail specialist can
                confirm serviceable speeds and place the order on the same call.
              </p>
              <CallCta location="how-it-works" className="btn btn-accent shrink-0">
                {cta.order}
              </CallCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why us ---------------- */}
      {/*
        Split rather than overlaid. This photograph has two people in the middle
        of the frame, so laying six cards across it buried the subjects and left
        the copy sitting on busy detail. Giving the picture its own slab lets it
        be read as a picture, and putting the claims on solid indigo means they
        need no card chrome to stay legible.
      */}
      <section
        id="why-us"
        className="relative overflow-hidden bg-arvig-900 text-white"
      >
        <div className="grid lg:grid-cols-[42%_58%]">
          {/* --- Photograph --- */}
          <div className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[620px]">
            <Image
              src={whyUs.image.src}
              alt={whyUs.image.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            {/* Only a light tint, since no text sits on the image now. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-arvig-900/20"
            />
            {/* Soft blend into the indigo so the join is not a hard seam. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-arvig-900 lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-28 lg:bg-gradient-to-r"
            />
          </div>

          {/* --- Claims --- */}
          <div className="px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-16">
            <div className="mx-auto max-w-[640px] lg:mx-0 lg:max-w-[680px]">
              <Reveal>
                <header>
                  <span className="eyebrow text-lime-brand">
                    {whyUs.eyebrow}
                  </span>
                  <h2 className="mt-4 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] text-white sm:text-[2.25rem]">
                    {whyUs.heading}
                  </h2>
                </header>
              </Reveal>

              {/* No boxes. On a solid surface the lime rule and the spacing do
                  the separating, which reads far cleaner than six panels. */}
              <div className="mt-11 grid gap-x-10 gap-y-9 sm:grid-cols-2">
                {whyUs.items.map((item, i) => (
                  <Reveal key={item.title} delay={i * 60}>
                    <div>
                      <span
                        className="block h-[3px] w-8 rounded-full bg-lime-brand"
                        aria-hidden="true"
                      />
                      <h3 className="mt-4 text-[1.0625rem] font-bold tracking-[-0.015em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-[1.65] text-arvig-100">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
