import {
  finePrint,
  finePrintRows,
  speedLabel,
  type PlanItem,
} from '@/lib/content';
import Reveal from './Reveal';

/** Monthly rate as a single string, derived from the same PlanItem fields. */
function monthly(plan: PlanItem): string {
  if (typeof plan.price !== 'number') {
    return plan.priceNote ?? finePrint.emptyCell;
  }
  const cents = plan.cents ? `.${plan.cents}` : '';
  return `$${plan.price}${cents}${plan.priceUnit ?? '/mo'}`;
}

function cell(value: string | undefined): string {
  return value && value.length > 0 ? value : finePrint.emptyCell;
}

/**
 * Honest fine-print grid. Every row is generated from the plans array, so
 * hardware costs, monthly rates and inclusions can never drift out of sync
 * with the cards above.
 *
 * Renders as a real <table> from `md` up and as stacked definition cards
 * below that, which keeps it readable at 320px with no horizontal scroll.
 */
export default function FinePrintGrid() {
  const rows = finePrintRows();
  const [, ...detailColumns] = finePrint.columns;

  return (
    <section id="fine-print" className="bg-white py-18 sm:py-20 lg:py-24">
      <div className="shell">
        <Reveal>
          <header className="max-w-[62ch]">
            <span className="eyebrow">{finePrint.eyebrow}</span>
            <h2 className="mt-3.5 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.028em] text-arvig-900 sm:text-[2.125rem]">
              {finePrint.heading}
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.7] text-ink-soft">
              {finePrint.intro}
            </p>
          </header>
        </Reveal>

        {/* ---------------- Desktop / tablet: table ---------------- */}
        <Reveal>
          <div className="mt-11 hidden overflow-hidden rounded-[16px] border border-line md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Arvig plan comparison: speed, monthly rate, equipment, data
                policy and terms
              </caption>
              <thead>
                <tr className="bg-arvig-900">
                  {finePrint.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-5 py-4 text-[0.75rem] font-bold uppercase tracking-[0.09em] text-arvig-100 lg:text-[0.6875rem]"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((plan, i) => (
                  <tr
                    key={plan.id}
                    className={`border-t border-line align-top ${
                      i % 2 === 1 ? 'bg-canvas-alt' : 'bg-white'
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-5 py-5 text-[0.875rem] font-bold text-arvig-900"
                    >
                      {plan.name}
                      <span className="mt-1 block text-[0.75rem] font-medium capitalize text-ink-mute">
                        {plan.serviceLine}
                      </span>
                    </th>
                    <td className="px-5 py-5 text-[0.8125rem] leading-[1.55] text-ink-soft">
                      {cell(speedLabel(plan))}
                    </td>
                    <td className="px-5 py-5 text-[0.875rem] font-bold text-arvig-700">
                      {monthly(plan)}
                    </td>
                    <td className="px-5 py-5 text-[0.8125rem] leading-[1.55] text-ink-soft">
                      {cell(plan.equipmentFee)}
                    </td>
                    <td className="px-5 py-5 text-[0.8125rem] leading-[1.55] text-ink-soft">
                      {cell(plan.dataPolicy)}
                    </td>
                    <td className="px-5 py-5 text-[0.8125rem] leading-[1.55] text-ink-soft">
                      {cell(plan.contractTerm)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ---------------- Mobile: stacked cards ---------------- */}
        <div className="mt-9 flex flex-col gap-4 md:hidden">
          {rows.map((plan, i) => {
            const values = [
              speedLabel(plan),
              monthly(plan),
              plan.equipmentFee,
              plan.dataPolicy,
              plan.contractTerm,
            ];

            return (
              <Reveal key={plan.id} delay={i * 45}>
                <div className="card p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[1rem] font-bold text-arvig-900">
                      {plan.name}
                    </h3>
                    <span className="shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-mute">
                      {plan.serviceLine}
                    </span>
                  </div>

                  <dl className="mt-4 flex flex-col gap-3">
                    {detailColumns.map((column, index) => (
                      <div
                        key={column}
                        className="grid grid-cols-[86px_minmax(0,1fr)] gap-3 border-t border-line-soft pt-3 first:border-0 first:pt-0"
                      >
                        <dt className="text-[0.75rem] font-bold uppercase tracking-[0.07em] text-ink-mute">
                          {column}
                        </dt>
                        <dd
                          className={`min-w-0 break-words text-[0.8125rem] leading-[1.5] ${
                            column === 'Monthly'
                              ? 'font-bold text-arvig-700'
                              : 'text-ink-soft'
                          }`}
                        >
                          {cell(values[index])}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-8 max-w-[80ch] text-[0.8125rem] leading-[1.6] text-ink-mute">
            {finePrint.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
