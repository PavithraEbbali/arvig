import type { PlanItem } from '@/lib/content';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'light' | 'dark';

const INTEGER_SIZE: Record<Size, string> = {
  sm: 'text-[2.1rem] leading-[0.95]',
  md: 'text-[2.75rem] leading-[0.92]',
  lg: 'text-[3.4rem] leading-[0.9]',
};

const SIGN_SIZE: Record<Size, string> = {
  sm: 'text-base mt-[0.28em]',
  md: 'text-lg mt-[0.3em]',
  lg: 'text-2xl mt-[0.3em]',
};

const CENTS_SIZE: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

/**
 * The one price lockup used everywhere on the site — hero anchor, plan cards
 * and the fine-print grid all render through this component. It reads a
 * PlanItem straight from lib/content.ts, so a price change in that file
 * cascades to every surface without touching a layout file.
 *
 * Renders a flex row: dollar sign · dominant integer (2.1–3.4rem) · muted cents.
 * When a plan carries no published rate it falls back to the plan's priceNote.
 */
export default function PriceLockup({
  plan,
  size = 'md',
  tone = 'light',
  prefix,
}: {
  plan: PlanItem;
  size?: Size;
  tone?: Tone;
  prefix?: string;
}) {
  const dark = tone === 'dark';

  // No published rate — show the qualitative note instead of an empty lockup.
  if (typeof plan.price !== 'number') {
    return (
      <div className="flex flex-col gap-1">
        {prefix ? (
          <span
            className={`text-[0.8125rem] font-semibold tracking-wide ${
              dark ? 'text-arvig-200' : 'text-ink-mute'
            }`}
          >
            {prefix}
          </span>
        ) : null}
        <span
          className={`font-bold ${
            size === 'lg' ? 'text-2xl' : 'text-xl'
          } ${dark ? 'text-white' : 'text-arvig-700'}`}
        >
          {plan.priceNote ?? 'Pricing by address'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {prefix ? (
        <span
          className={`text-[0.8125rem] font-semibold tracking-wide ${
            dark ? 'text-arvig-200' : 'text-ink-mute'
          }`}
        >
          {prefix}
        </span>
      ) : null}

      <div className="flex items-start gap-1">
        <span
          className={`font-bold ${SIGN_SIZE[size]} ${
            dark ? 'text-lime-brand' : 'text-arvig-700'
          }`}
          aria-hidden="true"
        >
          $
        </span>

        <span
          className={`font-bold tabular-nums tracking-[-0.03em] ${INTEGER_SIZE[size]} ${
            dark ? 'text-white' : 'text-arvig-700'
          }`}
        >
          {plan.price}
        </span>

        {plan.cents ? (
          <span
            className={`font-semibold tabular-nums mt-[0.34em] ${CENTS_SIZE[size]} ${
              dark ? 'text-arvig-200' : 'text-ink-mute'
            }`}
          >
            .{plan.cents}
          </span>
        ) : null}

        <span
          className={`self-end mb-[0.3em] ml-1 text-sm font-medium ${
            dark ? 'text-arvig-200' : 'text-ink-mute'
          }`}
        >
          {plan.priceUnit ?? '/mo'}
        </span>
      </div>

      {/* Screen readers get one clean sentence rather than the split lockup. */}
      <span className="sr-only">
        {`${plan.name}: $${plan.price}${plan.cents ? `.${plan.cents}` : ''} ${
          plan.priceUnit ?? 'per month'
        }`}
      </span>
    </div>
  );
}
