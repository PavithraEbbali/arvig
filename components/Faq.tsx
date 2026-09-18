import { cta, faq } from '@/lib/content';
import CallCta from './CallCta';
import Reveal from './Reveal';

/**
 * FAQ accordion built on native <details>/<summary>: it works without
 * JavaScript, is keyboard accessible out of the box, and costs nothing at
 * runtime. The open state is exclusive per group via the shared `name`.
 */
export default function Faq() {
  return (
    <section id="faq" className="bg-canvas-alt py-18 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="grid gap-11 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <header className="lg:sticky lg:top-[120px]">
              <span className="eyebrow">{faq.eyebrow}</span>
              <h2 className="mt-3.5 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] text-arvig-900 sm:text-[2.125rem]">
                {faq.heading}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
                Anything not covered here, a retail specialist can answer on the
                phone before you commit to a plan.
              </p>
              <CallCta location="faq" className="btn btn-outline mt-6">
                {cta.order}
              </CallCta>
            </header>
          </Reveal>

          <div className="flex flex-col gap-3">
            {faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 40}>
                <details
                  name="faq"
                  className="group rounded-[14px] border border-line bg-white transition-colors duration-200 open:border-arvig-300 hover:border-arvig-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4.5 text-[0.9375rem] font-semibold leading-[1.5] text-arvig-900 sm:px-6 sm:text-[1rem] [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">{item.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      className="mt-1 h-4 w-4 shrink-0 text-arvig-600 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="max-w-[68ch] text-[0.9375rem] leading-[1.7] text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
