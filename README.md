# Arvig Authorized Retailer

A one-page landing site for an **independent authorized retailer of Arvig**
residential internet, television, mobile and home phone service.

Built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS v4.
The page is fully static — no backend, no database, no API routes.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3210
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on port 3210 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next's ESLint pass |

> Do not run `npm run build` while `npm run dev` is running — both use the same
> `.next` directory, and the build will invalidate the chunks the dev server is
> serving, leaving the running page with 404s on its JavaScript.

---

## Architecture

### `lib/content.ts` is the single source of truth

Every price, speed, feature, disclosure line, CTA label and image reference
lives in this one file. **No layout file contains a hard-coded price or file
path.** Changing a rate there cascades to the hero lockup, the plan card and
the fine-print comparison grid at once, because all three read the same
`PlanItem`.

Layouts never touch the raw arrays. They read derived selectors:

| Selector | Returns |
| --- | --- |
| `plansFor(line)` | Plans for one service line |
| `activeSections` | Sections in canonical order, with empty lines dropped |
| `ctaLabelFor(plan)` | `"Call to order"` or `"Call for pricing"` |
| `speedLabel(plan)` | A formatted speed string |
| `finePrintRows()` | Rows for the comparison grid |
| `heroPlan` | The plan anchoring the hero |

Because `activeSections` filters out any service line with no plans behind it,
an empty placeholder section is structurally impossible.

### Components

| Component | Role |
| --- | --- |
| `TopChrome` | Non-dismissable disclosure bar + sticky header |
| `Hero` | Headline, price anchor, ZIP availability check |
| `PriceLockup` | **The** price renderer — used by hero, cards and grid |
| `PlanCard` | One plan; CTA label derived from the data |
| `ServiceSection` | Any service line; `side`, `banner` or `background` imagery |
| `FinePrintGrid` | Real `<table>` from `md` up, stacked cards below |
| `HowItWorks` | Install steps, and the split Why Us section |
| `Faq` | Native `<details>` accordion, zero runtime JS |
| `Footer` | Dark footer, links, legal block |
| `CallCta` | **The only** place a `tel:` link is built |
| `Reveal` | One-shot entrance, shared scroll controller |
| `SmoothScroll` | Lenis + anchor interception |

Two invariants are enforced by construction rather than by review:

- **`CallCta` is the sole constructor of `tel:` hrefs**, so every call CTA
  carries `data-call-cta="<surface>"` and the attribute cannot be dropped by a
  later edit.
- **`.reveal` is visible by default.** The hidden state only applies under
  `html[data-reveal="on"]`, set by an inline script that removes itself if the
  app never hydrates. A chunk failure or disabled JS degrades to fully visible
  content, never a blank page.

### Colors

Sampled from arvig.com's own CSS declarations, not from screenshots:

| Hex | Role |
| --- | --- |
| `#1D1060` | Primary indigo |
| `#C0D52F` | Lime accent |
| `#F8F8F8` | Section tint |
| `#A0A0A0` | Muted text |
| `#313131` | Body charcoal |

Every other value in `app/globals.css` is a straight mix of one of these with
white or black — no new hues are introduced.

---

## Deploying to Vercel

The repo is Vercel-ready with no configuration. Import it and accept the
detected defaults:

| Setting | Value |
| --- | --- |
| Framework | Next.js (auto-detected) |
| Build command | `next build` (default) |
| Output directory | `.next` (default) |
| Install command | `npm install` (default) |
| Environment variables | none required |

`next/image` optimisation works out of the box on Vercel, so the photography is
served as WebP/AVIF at the right size per breakpoint.

---

## Before going live

**Replace the placeholder phone number.** `lib/content.ts` carries
`(888) 555-0142` / `tel:+18885550142`, which uses the reserved `555-01xx`
fictional range so nothing real is dialled. Change both values in the `site`
object and every CTA on the page updates.

The footer's Privacy Policy, Terms, Disclaimer, Accessibility and Do Not Sell
links currently anchor to `#legal`. Point them at real pages before launch.

---

## Content accuracy

Plan facts were taken from arvig.com. Arvig publishes rates for internet and
mobile only; television, home phone, cable and bundles are quoted by service
address, so those plans carry no `price` and their CTA reads
**"Call for pricing"** automatically.

| Service | Published rates |
| --- | --- |
| Fiber internet | $65 / $80 / $95 per month |
| Arvig Mobile | $15 / $30 / $40 per line |
| Cable, TV, phone, bundles | By address |

Internet prices include the $10/mo saving for AutoPay (ACH) plus Paperless
Billing, and vary by location — both stated on the page.

---

## Photography

Seven images in `public/images`, optimised to **884 KB total**. The uncropped
PNG masters are excluded from the repo via `.gitignore`; only the shipped JPEGs
are committed.
