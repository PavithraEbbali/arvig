import { site } from '@/lib/content';

/**
 * Custom Arvig-styled wordmark. Drawn in type rather than shipped as an image
 * so it stays crisp at any size and costs no extra request.
 *
 * The lime dot mirrors the accent in Arvig's own brand palette (#C0D52F).
 */
export default function Wordmark({
  tone = 'light',
  showSuffix = true,
}: {
  tone?: 'light' | 'dark';
  showSuffix?: boolean;
}) {
  const dark = tone === 'dark';

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`inline-flex items-baseline text-[1.375rem] font-extrabold tracking-[-0.035em] ${
          dark ? 'text-white' : 'text-arvig-700'
        }`}
      >
        {site.wordmark}
        <span
          className="ml-[2px] inline-block h-[6px] w-[6px] rounded-full bg-lime-brand"
          aria-hidden="true"
        />
      </span>

      {showSuffix ? (
        <>
          <span
            className={`hidden h-5 w-px sm:block ${
              dark ? 'bg-white/25' : 'bg-line'
            }`}
            aria-hidden="true"
          />
          <span
            className={`hidden text-[0.6875rem] font-semibold uppercase leading-tight tracking-[0.1em] sm:block ${
              dark ? 'text-arvig-200' : 'text-ink-mute'
            }`}
          >
            Authorized
            <br />
            Retailer
          </span>
        </>
      ) : null}
    </span>
  );
}
