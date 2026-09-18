import { ctaLabelFor, speedLabel, type PlanItem } from '@/lib/content';
import CallCta from './CallCta';
import PriceLockup from './PriceLockup';

function TickGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] h-4 w-4 shrink-0 text-arvig-600"
      aria-hidden="true"
    >
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

/**
 * A single plan card. Every value shown here comes from the PlanItem, and the
 * CTA label is derived by ctaLabelFor() — "Call to order" when a rate is
 * published, "Call for pricing" when it is not.
 */
export default function PlanCard({ plan }: { plan: PlanItem }) {
  const speed = speedLabel(plan);
  const label = ctaLabelFor(plan);

  return (
    <article
      className={`card card-hover h-full p-6 sm:p-7 ${
        plan.isPopular ? 'card-popular' : ''
      }`}
    >
      {plan.isPopular ? (
        <span className="absolute -top-[11px] left-6 rounded-full bg-arvig-700 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-[0.09em] text-lime-brand sm:text-[0.6875rem]">
          Most popular
        </span>
      ) : null}

      {/* --- Header --- */}
      <header>
        <h3 className="text-[1.25rem] font-bold tracking-[-0.02em] text-arvig-900">
          {plan.name}
        </h3>
        {plan.tagline ? (
          <p className="mt-1.5 text-[0.875rem] leading-snug text-ink-mute">
            {plan.tagline}
          </p>
        ) : null}
      </header>

      {/* --- Speed --- */}
      {speed ? (
        <p className="mt-5 inline-flex self-start rounded-full bg-arvig-50 px-3.5 py-1.5 text-[0.8125rem] font-semibold text-arvig-700">
          {speed}
        </p>
      ) : null}

      {/* --- Price lockup --- */}
      <div className="mt-5">
        <PriceLockup plan={plan} size="md" />
      </div>

      <hr className="rule my-6" />

      {/* --- Features --- */}
      <ul className="flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex gap-2.5 text-[0.875rem] leading-[1.55] text-ink-soft"
          >
            <TickGlyph />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* --- CTA pinned to the bottom so cards align in a row --- */}
      <div className="mt-auto pt-7">
        <CallCta
          location={`plan-${plan.id}`}
          className="btn btn-primary btn-block"
        >
          {label}
        </CallCta>

        {plan.promoQualifier ? (
          <p className="mt-3.5 text-[0.75rem] leading-[1.5] text-ink-mute">
            {plan.promoQualifier}
          </p>
        ) : null}
      </div>
    </article>
  );
}
