import { activeSections } from '@/lib/content';
import Faq from '@/components/Faq';
import FinePrintGrid from '@/components/FinePrintGrid';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import ServiceSection from '@/components/ServiceSection';
import TopChrome from '@/components/TopChrome';

/**
 * Page order is fixed by spec:
 *
 *   disclosure bar -> sticky header -> hero
 *   -> service lines (fiber, cable, bundles, TV, mobile, phone)
 *   -> fine print -> how it works / why us -> FAQ -> footer
 *
 * The service-line block is driven entirely by `activeSections`, which
 * preserves the canonical merchandising order declared in lib/content.ts and
 * drops any line that has no plans behind it.
 */
export default function Page() {
  return (
    <>
      <TopChrome />

      <main>
        <Hero />

        {/* Anchor for the "Plans" nav link — first service line below. */}
        <div id="plans" aria-hidden="true" />

        {activeSections.map((section, index) => (
          <ServiceSection key={section.id} section={section} index={index} />
        ))}

        <FinePrintGrid />
        <HowItWorks />
        <Faq />
      </main>

      <Footer />
    </>
  );
}
