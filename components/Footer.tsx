import { footer, site } from '@/lib/content';
import CallCta from './CallCta';
import Wordmark from './Wordmark';

/**
 * Dark footer laid out like the reference: a wide brand column with the
 * wordmark and blurb, two link columns, a contact column carrying the sales
 * line and hours, then a full-width legal block and a bottom bar with the
 * policy links and copyright.
 */
export default function Footer() {
  return (
    <footer id="legal" className="bg-arvig-950 text-white">
      <div className="shell py-16 sm:py-20">
        {/* ---------------- Columns ---------------- */}
        <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.25fr] lg:gap-10">
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
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.13em] text-white sm:text-[0.6875rem]">
                {column.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
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

          {/* Contact — the second of two places the raw number is the label. */}
          <div>
            <h3 className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-white">
              {footer.contact.title}
            </h3>

            <CallCta
              location="footer"
              className="mt-5 block text-[1.375rem] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-lime-brand"
            >
              {site.phoneDisplay}
            </CallCta>

            <p className="mt-2.5 text-[0.8125rem] leading-[1.6] text-arvig-200">
              {footer.contact.hours}
            </p>
            <p className="mt-1 text-[0.8125rem] text-arvig-300">
              {footer.contact.note}
            </p>
          </div>
        </div>

        {/* ---------------- Legal block ---------------- */}
        <div className="mt-14 border-t border-white/10 pt-9">
          <div className="flex max-w-[110ch] flex-col gap-3.5">
            {footer.legalLines.map((line) => (
              <p
                key={line.slice(0, 40)}
                className="text-[0.75rem] leading-[1.75] text-arvig-300"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* ---------------- Bottom bar ---------------- */}
        <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
            {footer.policyLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-block py-1.5 text-[0.75rem] text-arvig-200 transition-colors hover:text-lime-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[0.75rem] text-arvig-300">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
