import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/content';
import {
  getLegalDoc,
  legalDocs,
  legalLastReviewed,
  legalSlugs,
} from '@/lib/legal';
import CallCta from '@/components/CallCta';
import Footer from '@/components/Footer';
import TopChrome from '@/components/TopChrome';

/**
 * One route renders all eight policy documents. They are data in lib/legal.ts,
 * so adding a ninth is a data edit — no new file, no new layout.
 *
 * Every document is prerendered at build time via generateStaticParams, and
 * `dynamicParams = false` makes any other slug a 404 rather than an attempted
 * render.
 */
export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} | ${site.retailerName}`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} | ${site.retailerName}`,
      description: doc.description,
      type: 'article',
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <TopChrome />

      <main>
        {/* ---------------- Masthead ---------------- */}
        <section className="bg-arvig-900 pt-[112px] pb-12 text-white sm:pt-[124px] sm:pb-16 lg:pt-[150px] lg:pb-20">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 py-1 text-[0.8125rem] font-medium text-arvig-100 transition-colors hover:text-lime-brand"
              >
                <span aria-hidden="true">&larr;</span> Back to plans
              </Link>
            </nav>

            <span className="eyebrow text-lime-brand">Legal</span>
            <h1 className="mt-4 max-w-[22ch] text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.5rem]">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-[68ch] text-[1rem] leading-[1.7] text-arvig-100">
              {doc.intro}
            </p>
            {legalLastReviewed ? (
              <p className="mt-5 text-[0.8125rem] text-arvig-200">
                Last reviewed {legalLastReviewed}
              </p>
            ) : null}
          </div>
        </section>

        {/* ---------------- Document ---------------- */}
        <section className="bg-white py-14 sm:py-18 lg:py-20">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
              <article className="min-w-0 max-w-[72ch]">
                {doc.sections.map((section) => (
                  <section key={section.heading} className="mb-10 last:mb-0">
                    <h2 className="text-[1.125rem] font-bold tracking-[-0.015em] text-arvig-900 sm:text-[1.25rem]">
                      {section.heading}
                    </h2>

                    {section.body?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className="mt-3.5 text-[0.9375rem] leading-[1.75] text-ink-soft"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list ? (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {section.list.map((item) => (
                          <li
                            key={item.slice(0, 48)}
                            className="flex gap-3 text-[0.9375rem] leading-[1.7] text-ink-soft"
                          >
                            <span
                              className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-lime-deep"
                              aria-hidden="true"
                            />
                            <span className="min-w-0">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </article>

              {/* ---------------- Sidebar ---------------- */}
              <aside className="min-w-0 lg:sticky lg:top-[120px] lg:self-start">
                <div className="rounded-[16px] border border-line bg-canvas-alt p-6">
                  <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-arvig-900">
                    Other policies
                  </h2>
                  <ul className="mt-4 flex flex-col gap-1">
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/legal/${other.slug}`}
                          className="block py-1.5 text-[0.875rem] leading-snug text-ink-soft transition-colors hover:text-arvig-700"
                        >
                          {other.navLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <hr className="rule my-6" />

                  <p className="text-[0.875rem] leading-[1.6] text-ink-soft">
                    Questions about any of this?
                  </p>
                  <CallCta
                    location={`legal-${doc.slug}`}
                    className="btn btn-primary btn-sm btn-block mt-4"
                  >
                    Call to order
                  </CallCta>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
