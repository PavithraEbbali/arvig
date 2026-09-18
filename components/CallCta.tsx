import { site } from '@/lib/content';

/**
 * The only place a tel: link is constructed. Every call CTA on the site renders
 * through this component, which guarantees each one carries `data-call-cta`
 * for analytics and keeps the number itself in lib/content.ts.
 *
 * `children` supplies the visible label. Section and plan CTAs pass
 * "Call to order" / "Call for pricing"; only the header and footer pass the
 * raw phone number.
 */
export default function CallCta({
  children,
  className = 'btn btn-primary',
  location,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  /** Analytics hook: which surface the click came from. */
  location: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={site.phoneHref}
      data-call-cta={location}
      className={className}
      aria-label={ariaLabel ?? `Call ${site.phoneDisplay}`}
    >
      {children}
    </a>
  );
}
