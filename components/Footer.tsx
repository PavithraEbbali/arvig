import Link from 'next/link';
import { footer, site } from '@/lib/content';
import { legalLinks } from '@/lib/legal';
import CallCta from './CallCta';
import Wordmark from './Wordmark';

/**
 * Dark footer laid out like the reference: a wide brand column with the
 * wordmark and blurb, two link columns, a contact column leading with the
 * phone number, then a labelled required-disclosures block, the policy link
 * row, a named compliance route and the copyright with trademark attribution.
 *
 * The reference carries a "Pricing current as of <date>" line above its
 * disclosures. That is deliberately not reproduced -- this build carries a
 * no-date-stamp rule, and an accuracy date nobody updates is worse than none.
 */
export default function Footer() {
  return (
    <footer id="legal" className="bg-arvig-950 text-white">
      <div className="shell py-16 sm:py-20">
        {/* ---------------- Columns ---------------- */}
        <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.3fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Wordmark tone="dark" showSuffix={false} />
            <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.13em] text-lime-brand sm:text-[0.6875rem]">
              {site.wordmarkSuffix}
            </p>
            <p className="mt-5 max-w-[42ch] text-[0.875rem] leading-[1.7] text-arvig-200">
              {footer.blurb}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white sm:text-[0.6875rem]">
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1.5 text-[0.875rem] text-arvig-200 transition-colors hover:text-lime-brand"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact -- the second of two places the raw number is the label. */}
          <div>
            <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white sm:text-[0.6875rem]">
              {footer.contact.title}
            </h2>

            <CallCta
              location="footer"
              className="mt-5 block text-[1.5rem] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-lime-brand"
            >
              {site.phoneDisplay}
            </CallCta>

            <p className="mt-2.5 text-[0.8125rem] leading-[1.6] text-arvig-200">
              {footer.contact.hours}
            </p>
            <p className="mt-1 text-[0.8125rem] text-arvig-300">
              {footer.contact.note}
            </p>
            <p className="mt-3 text-[0.8125rem] leading-[1.6] text-arvig-300">
              {site.legalAddress}
            </p>
          </div>
        </div>

        {/* ---------------- Required disclosures ---------------- */}
        <section
          aria-labelledby="footer-disclosures"
          className="mt-14 border-t border-white/10 pt-9"
        >
          <h2
            id="footer-disclosures"
            className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-arvig-200 sm:text-[0.6875rem]"
          >
            {footer.disclosuresTitle}
          </h2>

          <div className="mt-5 flex max-w-[110ch] flex-col gap-3.5">
            {footer.disclosures.map((item) => (
              <p
                key={item.body.slice(0, 44)}
                className="text-[0.75rem] leading-[1.75] text-arvig-300"
              >
                {item.label ? (
                  <span className="font-bold uppercase tracking-[0.06em] text-arvig-200">
                    {item.label}:{' '}
                  </span>
                ) : null}
                {item.body}
              </p>
            ))}
          </div>
        </section>

        {/* ---------------- Policy links ---------------- */}
        <nav
          aria-label="Legal policies"
          className="mt-9 border-t border-white/10 pt-7"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="inline-block py-1.5 text-[0.75rem] text-arvig-200 transition-colors hover:text-lime-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------------- Compliance + copyright ---------------- */}
        <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-7">
          <p className="max-w-[110ch] text-[0.75rem] leading-[1.7] text-arvig-300">
            {footer.complianceLine}
          </p>
          <p className="max-w-[110ch] text-[0.75rem] leading-[1.7] text-arvig-300">
            {footer.copyright} {footer.trademarkLine}
          </p>
        </div>
      </div>
    </footer>
  );
}
