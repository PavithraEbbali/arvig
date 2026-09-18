/**
 * lib/content.ts — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every price, speed, channel count, disclosure line and CTA label on this site
 * is derived from this file. Change a number here and it cascades to the hero
 * lockup, the plan cards, the fine-print comparison grid and the legal footer
 * automatically. No TSX layout file contains a hard-coded price.
 *
 * All plan facts below were sourced from arvig.com.
 */

/* ========================================================================== */
/*  TYPES                                                                     */
/* ========================================================================== */

export type ServiceLine =
  | 'fiber'
  | 'cable'
  | 'bundle'
  | 'tv'
  | 'mobile'
  | 'phone';

export interface PlanItem {
  id: string;
  /** e.g. "Arvig High-Speed Internet", "Arvig Fiber" */
  name: string;
  serviceLine: ServiceLine;
  speedDown?: number;
  speedUp?: number;
  /** Whole-dollar portion of the monthly rate. Omit when Arvig publishes no rate. */
  price?: number;
  /** Cents portion, rendered muted beside the dominant integer. */
  cents?: string;
  promoQualifier?: string;
  equipmentFee?: string;
  dataPolicy?: string;
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;

  /* --- optional presentation fields (still data, never layout) --- */
  /** Short line under the plan name. */
  tagline?: string;
  /** Overrides the speed lockup when a plan is not measured in Mbps. */
  speedLabel?: string;
  /** Replaces the price lockup when Arvig publishes no rate for the plan. */
  priceNote?: string;
  /** Unit shown to the right of the price. Defaults to "/mo". */
  priceUnit?: string;
  /** "Best for..." positioning used by the fine-print grid. */
  bestFor?: string;
}

export interface SectionImage {
  /** Path under /public. */
  src: string;
  /** Empty string marks the image as decorative. */
  alt: string;
  /**
   * 'side'       — boxed image beside the card grid
   * 'banner'     — boxed strip spanning the full width above the cards
   * 'background' — fills the whole section edge to edge, with NO scrim over
   *                it. Header copy moves onto an opaque white panel so the
   *                photograph stays at full strength and text stays legible.
   *
   *                Runs under an indigo scrim with centred white copy. The
   *                scrim is not optional: it is what carries the type, and it
   *                is also what hides the ~1.5x upscale of a 1250px source
   *                spanning a wide viewport. An unscrimmed full-bleed of the
   *                same file looked visibly blown up.
   */
  layout: 'side' | 'banner' | 'background';
  /** CSS object-position, to keep the subject in frame when cropped. */
  objectPosition?: string;
}

export interface ServiceSection {
  id: string;
  serviceLine: ServiceLine;
  eyebrow: string;
  heading: string;
  intro: string;
  /** Rendered beneath the card grid as small print. */
  footnote?: string;
  /** Optional photography. Sections without one stay text-only. */
  image?: SectionImage;
}

/* ========================================================================== */
/*  SITE / BRAND                                                              */
/* ========================================================================== */

export const site = {
  brand: 'Arvig',
  retailerName: 'Arvig Authorized Retailer',
  wordmark: 'Arvig',
  wordmarkSuffix: 'Authorized Retailer',

  /**
   * PLACEHOLDER SALES LINE — replace both values with the live retailer number.
   * Uses the reserved 555-01xx fictional range so nothing real is dialled.
   */
  phoneDisplay: '(888) 555-0142',
  phoneHref: 'tel:+18885550142',

  /** Persistent, non-dismissable top bar. */
  disclosure: 'Independent Authorized Retailer of Arvig.',

  /** Longer disclosure used in the footer legal block. */
  disclosureLong:
    'This site is operated by an independent authorized retailer of Arvig services. Arvig and the Arvig logo are trademarks of their respective owner. Plans, speeds and pricing shown are subject to change and to serviceability at your address.',

  metaTitle:
    'Arvig Authorized Retailer | Fiber Internet, TV, Mobile & Home Phone',
  metaDescription:
    'Order Arvig fiber and cable internet, WiFi TV, Arvig Mobile and home phone through an authorized retailer. Fiber plans from $65/mo with unlimited data. Check availability at your address.',
} as const;

/* ========================================================================== */
/*  CTA LABELS — enforced sitewide                                            */
/* ========================================================================== */

export const cta = {
  /** Every plan/section CTA where a published rate exists. */
  order: 'Call to order',
  /** Every plan/section CTA where Arvig publishes no rate. */
  pricing: 'Call for pricing',
  checkAvailability: 'Check availability',
} as const;

/** Single rule that derives a plan's CTA label from its data. */
export function ctaLabelFor(plan: PlanItem): string {
  return typeof plan.price === 'number' ? cta.order : cta.pricing;
}

/* ========================================================================== */
/*  NAVIGATION                                                                */
/* ========================================================================== */

export const navLinks = [
  { label: 'Plans', href: '#plans' },
  { label: 'TV & Phone', href: '#tv' },
  { label: 'FAQ', href: '#faq' },
] as const;

/* ========================================================================== */
/*  HERO                                                                      */
/* ========================================================================== */

export const hero = {
  eyebrow: 'Authorized Retailer',
  headline: 'Reliable high-speed internet and entertainment for your home.',
  /**
   * Substring of `headline` rendered in the Arvig lime accent. Kept as data so
   * the emphasis moves with the copy instead of being hard-coded in the JSX.
   */
  headlineHighlight: 'high-speed internet',
  subline:
    'Arvig runs one of Minnesota’s largest independently owned broadband networks — fiber and cable reaching more than 150 communities across a 9,000 square-mile footprint. Every residential plan includes unlimited data: no caps, no throttling, no peak-time slowdowns.',
  /** Plan whose lockup anchors the hero. Resolved from the plans array below. */
  anchorPlanId: 'fiber-everyday-essentials',
  anchorLabel: 'Fiber plans start at',

  /**
   * Hero conversion path is the ZIP checker alone — no phone CTA sits in the
   * hero. The header call button remains directly above it.
   */
  zipHeading: 'See what’s available at your address',
  zipPlaceholder: 'Enter your ZIP code',
  zipCta: 'Check availability',
  zipInvalid: 'Enter a five-digit ZIP code to continue.',
  zipSuccess:
    'Thanks — Arvig plans are confirmed by service address. The fiber, cable and bundle options below cover what is available in your area.',
  trustChips: ['High-Speed Internet', 'Reliable Connection', 'Flexible Plans'],

  /** Full-bleed backdrop. Decorative, so its alt text is intentionally empty. */
  backgroundImage: '/images/hero-home-fiber.jpg',
} as const;

/* ========================================================================== */
/*  SHARED FINE PRINT                                                         */
/* ========================================================================== */

const INTERNET_PROMO =
  'Listed price includes $10/mo savings with AutoPay (ACH) and Paperless Billing. Pricing varies by location.';
const INTERNET_DATA = 'Unlimited data — no caps, no throttling';
const INTERNET_EQUIP = 'Managed WiFi available as an add-on';
const TERMS_BY_ADDRESS = 'Terms vary by service address';

/* ========================================================================== */
/*  PLANS — the whole catalogue                                               */
/* ========================================================================== */

export const plans: PlanItem[] = [
  /* ----------------------------- 1. FIBER ------------------------------- */
  {
    id: 'fiber-everyday-essentials',
    name: 'Everyday Essentials',
    serviceLine: 'fiber',
    tagline: 'Browsing, email and light streaming',
    speedDown: 300,
    speedUp: 30,
    price: 65,
    cents: '00',
    promoQualifier: INTERNET_PROMO,
    equipmentFee: INTERNET_EQUIP,
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Browsing, email, light streaming',
    features: [
      'Up to 300 Mbps download / 30 Mbps upload',
      'Unlimited data with no overage charges',
      'Backed by the Arvig 100% Satisfaction Guarantee',
      'Local Minnesota technicians handle your install',
    ],
  },
  {
    id: 'fiber-happy-medium',
    name: 'The Happy Medium',
    serviceLine: 'fiber',
    tagline: 'Video calls and a house full of devices',
    speedDown: 500,
    speedUp: 50,
    price: 80,
    cents: '00',
    promoQualifier: INTERNET_PROMO,
    equipmentFee: INTERNET_EQUIP,
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    isPopular: true,
    bestFor: 'Video calls, multiple devices',
    features: [
      'Up to 500 Mbps download / 50 Mbps upload',
      'Headroom for simultaneous 4K streams and video calls',
      'Unlimited data with no peak-time slowdowns',
      'Add Managed WiFi for whole-home coverage',
    ],
  },
  {
    id: 'fiber-full-speed-ahead',
    name: 'Full Speed Ahead',
    serviceLine: 'fiber',
    tagline: 'Pro gaming, 4K streaming and remote work',
    speedDown: 1000,
    speedUp: 100,
    price: 95,
    cents: '00',
    promoQualifier: INTERNET_PROMO,
    equipmentFee: INTERNET_EQUIP,
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Pro gaming, 4K streaming, remote work',
    features: [
      'Up to 1 Gbps download / 100 Mbps upload',
      'Built for low-latency gaming and heavy uploads',
      'Handles dozens of connected smart-home devices',
      'Unlimited data with no caps or throttling',
    ],
  },

  /* ----------------------------- 2. CABLE ------------------------------- */
  {
    id: 'cable-high-speed-internet',
    name: 'Arvig Cable Internet',
    serviceLine: 'cable',
    tagline: 'A stable hard-wired line where fiber is still expanding',
    speedLabel: 'Speeds by address',
    priceNote: 'Rate set by your address',
    equipmentFee: INTERNET_EQUIP,
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Everyday streaming and multi-device homes',
    features: [
      'Hard-wired coaxial service in Arvig cable neighborhoods',
      'Unlimited data, same as every Arvig residential plan',
      'A reliable alternative to 5G fixed wireless or satellite',
      'An upgrade path as Arvig builds fiber into your community',
    ],
  },

  /* ---------------------------- 3. BUNDLES ------------------------------ */
  {
    id: 'bundle-internet-tv',
    name: 'Internet + WiFi TV',
    serviceLine: 'bundle',
    tagline: 'One connection, one bill, live TV on every screen',
    speedLabel: 'Pairs with any internet tier',
    priceNote: 'Built on your internet plan',
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Homes replacing a traditional cable box',
    features: [
      'Any Arvig internet tier plus Arvig WiFi TV',
      'Cloud DVR and 72-hour Replay TV included',
      'Watch on Evo, Fire TV, Android TV, Apple and the web',
      'One account and one monthly statement',
    ],
  },
  {
    id: 'bundle-internet-tv-phone',
    name: 'Internet + TV + Home Phone',
    serviceLine: 'bundle',
    tagline: 'The full home package',
    speedLabel: 'Pairs with any internet tier',
    priceNote: 'Built on your internet plan',
    dataPolicy: INTERNET_DATA,
    contractTerm: TERMS_BY_ADDRESS,
    isPopular: true,
    bestFor: 'Families who still want a landline',
    features: [
      'Internet, Arvig WiFi TV and landline home phone together',
      'Unlimited local calling plus optional long distance',
      'Voicemail, Caller ID, Call Forwarding and Call Waiting',
      'A single install appointment for the whole household',
    ],
  },
  {
    id: 'bundle-internet-mobile',
    name: 'Internet + Arvig Mobile',
    serviceLine: 'bundle',
    tagline: 'Add up to four mobile lines to your home internet',
    speedLabel: 'Requires Arvig internet',
    priceNote: 'Built on your internet plan',
    promoQualifier:
      'Arvig Mobile requires active Arvig internet service. The $30/mo credit for 12 months applies to one line per account on the Unlimited Plan.',
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Cutting a family mobile bill',
    features: [
      'Up to four lines on the Arvig Mobile network',
      'Unlimited Plan lines carry a $30/mo credit for 12 months',
      'Mobile and internet on the same Arvig account',
      'Keep your existing number when you switch',
    ],
  },

  /* ------------------------------- 4. TV -------------------------------- */
  {
    id: 'tv-wifi-tv',
    name: 'Arvig WiFi TV',
    serviceLine: 'tv',
    tagline: 'Live television delivered over your Arvig connection',
    speedLabel: 'Streams on 5 Mbps',
    priceNote: 'Lineups vary by market',
    equipmentFee: 'Evo Force 1 box optional; bring your own streaming device',
    contractTerm: 'Requires Arvig internet service',
    isPopular: true,
    bestFor: 'Live TV without a traditional set-top box',
    features: [
      'Cloud DVR with 10 hours included, expandable to 200 hours',
      'Replay TV looks back up to 72 hours on most channels',
      'Free HD with automatic picture-quality detection',
      'Up to 7 simultaneous streams per household',
      'Premium add-ons: HBO, Cinemax, Showtime, Starz and more',
    ],
  },
  {
    id: 'tv-broadband-value',
    name: 'Broadband TV Value Plan',
    serviceLine: 'tv',
    tagline: 'Big entertainment, small price',
    speedLabel: '50+ channels',
    priceNote: 'Lineups vary by market',
    contractTerm: 'Requires an Arvig internet plan',
    bestFor: 'A lighter, lower-cost channel lineup',
    features: [
      '50+ lifestyle and entertainment channels',
      'A&E, Hallmark, Outdoor Channel, C-SPAN and Sony Movies',
      'Available with the purchase of an Arvig internet plan',
      'Add TiVo+ for dozens of extra streaming channels',
    ],
  },

  /* ----------------------------- 5. MOBILE ------------------------------ */
  {
    id: 'mobile-by-the-gig',
    name: 'By The Gig',
    serviceLine: 'mobile',
    tagline: 'Light data, unlimited conversation',
    speedLabel: '1 GB data',
    price: 15,
    cents: '00',
    priceUnit: '/mo per line',
    promoQualifier: 'Requires active Arvig internet service.',
    equipmentFee: '$20 activation per line',
    dataPolicy: '1 GB of data, SD video quality',
    contractTerm: '$3.30/mo cost recovery fee applies',
    bestFor: 'Backup lines and light data users',
    features: [
      'Unlimited talk and text',
      '1 GB of data each month',
      'SD video streaming quality',
      'Requires active Arvig internet service',
    ],
  },
  {
    id: 'mobile-unlimited',
    name: 'Unlimited',
    serviceLine: 'mobile',
    tagline: 'The line the $0-for-a-year offer is built on',
    speedLabel: 'Unlimited data',
    price: 30,
    cents: '00',
    priceUnit: '/mo per line',
    promoQualifier:
      'Cut your mobile bill on up to 4 lines to $0 for a full year. The $30/mo credit for 12 months applies to one line per account with qualifying Arvig internet service. Based on Arvig service area; some restrictions apply.',
    equipmentFee: '$20 activation per line',
    dataPolicy: 'Unlimited data, SD video quality',
    contractTerm: '$3.30/mo cost recovery fee applies',
    isPopular: true,
    bestFor: 'Most households switching from a national carrier',
    features: [
      'Unlimited talk, text and data',
      '5 GB of mobile hotspot each month',
      'SD video streaming quality',
      'Requires active Arvig internet service',
    ],
  },
  {
    id: 'mobile-unlimited-max',
    name: 'Unlimited Max',
    serviceLine: 'mobile',
    tagline: 'HD video and the largest hotspot allowance',
    speedLabel: 'Unlimited data',
    price: 40,
    cents: '00',
    priceUnit: '/mo per line',
    promoQualifier: 'Requires active Arvig internet service.',
    equipmentFee: '$20 activation per line',
    dataPolicy: 'Unlimited data, HD video quality',
    contractTerm: '$3.30/mo cost recovery fee applies',
    bestFor: 'Heavy streamers and hotspot users',
    features: [
      'Unlimited talk, text and data',
      '10 GB of mobile hotspot each month',
      'HD video streaming quality',
      'Requires active Arvig internet service',
    ],
  },

  /* ------------------------------ 6. PHONE ------------------------------ */
  {
    id: 'phone-home-phone',
    name: 'Arvig Home Phone',
    serviceLine: 'phone',
    tagline: 'Simple, affordable landline service',
    speedLabel: 'Unlimited local calling',
    priceNote: 'Rate set by your address',
    contractTerm: TERMS_BY_ADDRESS,
    isPopular: true,
    bestFor: 'A dependable handset line for the household',
    features: [
      'Unlimited local calling with no limit on minutes',
      'Voicemail, Caller ID, Call Forwarding and Call Waiting',
      'Phone to Go included',
      'Keep the number you have had for years',
    ],
  },
  {
    id: 'phone-long-distance',
    name: 'Home Phone + Long Distance',
    serviceLine: 'phone',
    tagline: 'Add a calling plan for family further afield',
    speedLabel: 'Landline + long distance',
    priceNote: 'Rate set by your address',
    contractTerm: TERMS_BY_ADDRESS,
    bestFor: 'Households calling out of state regularly',
    features: [
      'Everything in Arvig Home Phone',
      'Add a long distance calling plan to your line',
      'Toll-free numbers available',
      'One line item on your existing Arvig bill',
    ],
  },
];

/* ========================================================================== */
/*  SECTION COPY — canonical merchandising order                              */
/*  fiber -> cable -> bundle -> tv -> mobile -> phone                          */
/* ========================================================================== */

export const serviceSections: ServiceSection[] = [
  {
    id: 'fiber',
    serviceLine: 'fiber',
    eyebrow: 'Fiber Internet',
    heading: 'Arvig fiber plans',
    intro:
      'Fiber carries your connection on light through glass, which is why it holds its speed when the whole street is online. Arvig is the largest independently owned provider in Minnesota and keeps extending fiber into communities other carriers skip.',
    footnote:
      'Pricing varies by location. Listed prices include $10/mo savings with AutoPay (ACH) and Paperless Billing enrollment.',
  },
  {
    id: 'cable',
    serviceLine: 'cable',
    eyebrow: 'Cable Internet',
    heading: 'Cable internet across the Arvig service area',
    intro:
      'Arvig operates a cable network alongside its fiber footprint. In areas where fiber construction is still underway, cable provides a dedicated hard-wired connection with the same unlimited-data policy, and a clear upgrade path once fiber becomes available at your address.',
    image: {
      src: '/images/cable-neighborhood.jpg',
      alt: 'A residential street lined with utility poles carrying aerial cable in a small Minnesota town.',
      layout: 'background',
      objectPosition: 'center 55%',
    },
  },
  {
    id: 'bundles',
    serviceLine: 'bundle',
    eyebrow: 'Bundles',
    heading: 'Bundled services on a single account',
    intro:
      'Internet service forms the foundation of every Arvig bundle. Television, home phone and Arvig Mobile are added to that same account, consolidating your services into one monthly statement and one installation appointment.',
    footnote:
      'Bundle rates are built from your selected internet tier and the services you add. Availability depends on your service address.',
  },
  {
    id: 'tv',
    serviceLine: 'tv',
    eyebrow: 'Television',
    heading: 'Television delivered over your Arvig connection',
    intro:
      'Arvig television is delivered over the internet connection already installed at your property, which removes the need for a satellite dish or additional cabling. Both television plans require an active Arvig internet service.',
    footnote:
      'Channel lineups vary by market. Both TV plans require Arvig internet service.',
    image: {
      src: '/images/tv-living-room.jpg',
      alt: 'A family watching television together in a living room at home.',
      layout: 'side',
    },
  },
  {
    id: 'mobile',
    serviceLine: 'mobile',
    eyebrow: 'Arvig Mobile',
    heading: 'Mobile service on your Arvig account',
    intro:
      'Arvig Mobile is available to customers with an active Arvig internet service. Add up to four lines to your existing account and consolidate household mobile service onto a single monthly statement.',
    footnote:
      'All Arvig Mobile plans require active Arvig internet service. A $20 activation fee per line and a $3.30/mo cost recovery fee apply.',
    image: {
      src: '/images/mobile-everyday.jpg',
      alt: 'A woman checking her phone in her kitchen on a weekday morning.',
      layout: 'banner',
      objectPosition: 'center 18%',
    },
  },
  {
    id: 'phone',
    serviceLine: 'phone',
    eyebrow: 'Home Phone',
    heading: 'Dependable home phone service',
    intro:
      'A landline remains a practical choice for precise 911 location reporting, for households that prefer a dedicated handset, and for properties where cellular coverage is limited. Arvig home phone includes unlimited local calling.',
    image: {
      src: '/images/home-phone-kitchen.jpg',
      alt: 'An older man talking on a cordless landline phone at his kitchen counter.',
      layout: 'background',
      objectPosition: '62% center',
    },
  },
];

/* ========================================================================== */
/*  DERIVED SELECTORS — layouts read these, never raw arrays                  */
/* ========================================================================== */

export function plansFor(line: ServiceLine): PlanItem[] {
  return plans.filter((p) => p.serviceLine === line);
}

export function getPlan(id: string): PlanItem | undefined {
  return plans.find((p) => p.id === id);
}

/** Sections that actually have plans behind them. Empty service lines drop out. */
export const activeSections: ServiceSection[] = serviceSections.filter(
  (s) => plansFor(s.serviceLine).length > 0,
);

/** Lowest published monthly rate across every service line. */
export function lowestPrice(): number | undefined {
  const priced = plans
    .map((p) => p.price)
    .filter((p): p is number => typeof p === 'number');
  return priced.length ? Math.min(...priced) : undefined;
}

/** The hero anchor plan, resolved from data. */
export const heroPlan: PlanItem | undefined = getPlan(hero.anchorPlanId);

/** Formats a speed pair for display so no layout duplicates the logic. */
export function speedLabel(plan: PlanItem): string {
  if (plan.speedLabel) return plan.speedLabel;
  if (!plan.speedDown) return '';
  const fmt = (n: number) => (n >= 1000 ? `${n / 1000} Gbps` : `${n} Mbps`);
  return plan.speedUp
    ? `${fmt(plan.speedDown)} down / ${fmt(plan.speedUp)} up`
    : fmt(plan.speedDown);
}

/* ========================================================================== */
/*  FINE-PRINT GRID                                                           */
/* ========================================================================== */

export const finePrint = {
  eyebrow: 'The fine print',
  heading: 'Complete pricing and plan terms',
  intro:
    'Equipment costs, data policy and service terms are listed alongside each monthly rate, providing a complete view of what every plan includes before you place an order.',
  columns: [
    'Plan',
    'Speed',
    'Monthly',
    'Equipment',
    'Data policy',
    'Terms',
  ] as const,
  /** Service lines included in the comparison grid. */
  includeLines: ['fiber', 'cable', 'mobile'] as ServiceLine[],
  emptyCell: '—',
  footnote:
    'Rates shown reflect Arvig published pricing and vary by service address. Taxes, surcharges and any applicable fees are billed in addition to the monthly rate.',
};

export function finePrintRows(): PlanItem[] {
  return finePrint.includeLines.flatMap((line) => plansFor(line));
}

/* ========================================================================== */
/*  HOW IT WORKS / WHY US                                                     */
/* ========================================================================== */

export const howItWorks = {
  eyebrow: 'How it works',
  heading: 'Three steps from call to connected',
  image: {
    src: '/images/install-technician.jpg',
    alt: 'A technician splicing fiber at an open utility pedestal in a front yard.',
  },
  steps: [
    {
      n: '01',
      title: 'Choose your speed',
      body: 'Tell us your ZIP and how the household uses the internet. We confirm which Arvig plans are serviceable at your address and what each one runs.',
    },
    {
      n: '02',
      title: 'Schedule your install',
      body: 'Arvig technicians map the property, flag the route and handle the indoor work. Installs are done by local crews, not a national subcontractor.',
    },
    {
      n: '03',
      title: 'Enjoy your service',
      body: 'Your line goes live, Managed WiFi gets tuned if you added it, and the 100% Satisfaction Guarantee covers the experience from there.',
    },
  ],
};

export const whyUs = {
  eyebrow: 'Why order here',
  heading: 'What sets Arvig service apart',
  image: {
    src: '/images/why-us-local-team.jpg',
    alt: 'Two field technicians talking beside a work van on a winter morning.',
  },
  items: [
    {
      title: 'Robust connectivity',
      body: 'A 9,000 square-mile network reaching more than half of Minnesota’s counties.',
    },
    {
      title: 'Clear pricing',
      body: 'Published rates, with equipment and fees listed beside every plan.',
    },
    {
      title: 'Unlimited data, always',
      body: 'No caps, no overage charges, no throttling, no peak-time slowdowns.',
    },
    {
      title: 'Local install crews',
      body: 'Arvig designs, builds and lights its own fiber network.',
    },
    {
      title: 'Managed WiFi',
      body: 'A WiFi 6 router with ProtectIQ security and ExperienceIQ parental controls.',
    },
    {
      title: '100% Satisfaction Guarantee',
      body: 'Covers both the connection and the local support behind it.',
    },
  ],
};

/* ========================================================================== */
/*  FAQ                                                                       */
/* ========================================================================== */

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Questions worth asking first',
  items: [
    {
      q: 'What internet speeds can I get?',
      a: 'Arvig publishes three residential tiers: up to 300/30 Mbps, up to 500/50 Mbps and up to 1 Gbps/100 Mbps. Which of those is serviceable depends on whether your address sits on fiber or cable, so the ZIP check is the fastest way to find out.',
    },
    {
      q: 'Is there a data cap?',
      a: 'No. Every Arvig residential internet plan includes unlimited data. You can stream, game, work from home and move large files without overage charges or speed throttling.',
    },
    {
      q: 'What does the installation involve?',
      a: 'After the order is placed, an Arvig technician maps the property and places white flags along the route. Public utilities are located, you mark any private lines, then construction and splicing happen before a technician completes the indoor work.',
    },
    {
      q: 'Do I need Arvig internet to get TV or mobile?',
      a: 'Yes for both. Arvig WiFi TV and the Broadband TV Value Plan are delivered over your Arvig internet connection, and every Arvig Mobile plan requires an active Arvig internet service on the account.',
    },
    {
      q: 'How does bundling work?',
      a: 'Internet is the base. Television, home phone and mobile lines attach to that same account, which keeps everything on one statement and lets a single install appointment cover multiple services.',
    },
    {
      q: 'What is Managed WiFi?',
      a: 'It is an add-on where Arvig supplies and tunes a WiFi 6 router for your home. Plus covers roughly 2,000 square feet; Premium uses up to three units for whole-home coverage. Both include ProtectIQ security and ExperienceIQ parental controls plus the management app.',
    },
    {
      q: 'Why is the price listed as “starting at”?',
      a: 'Arvig rates vary by location, and the published figures already include the $10 per month saving for enrolling in AutoPay (ACH) and Paperless Billing. We confirm the exact rate for your address before anything is ordered.',
    },
    {
      q: 'Can I keep my phone number?',
      a: 'In most cases yes, for both home phone and Arvig Mobile lines. Have a recent bill handy when you call so the account details can be matched during the transfer.',
    },
  ],
};

/* ========================================================================== */
/*  FOOTER                                                                    */
/* ========================================================================== */

export const footer = {
  blurb:
    'An independent authorized retailer helping Minnesota households order Arvig internet, television, mobile and home phone service.',
  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'Fiber internet', href: '#fiber' },
        { label: 'Cable internet', href: '#cable' },
        { label: 'Bundles', href: '#bundles' },
        { label: 'Television', href: '#tv' },
        { label: 'Arvig Mobile', href: '#mobile' },
        { label: 'Home phone', href: '#phone' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Plan comparison', href: '#fine-print' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Why order here', href: '#why-us' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Check availability', href: '#hero-zip' },
      ],
    },
  ],
  /** Contact column — the one place a raw number is allowed alongside the nav. */
  contact: {
    title: 'Contact',
    hours: 'Mon–Fri 8AM–9PM CT · Sat–Sun 9AM–6PM CT',
    note: 'Sales and new orders',
  },
  legalLines: [
    site.disclosureLong,
    'Speeds quoted are maximum wired speeds. Actual throughput depends on your equipment, wiring and in-home network. Taxes, surcharges and fees are additional. Arvig Mobile plans require active Arvig internet service.',
  ],
  policyLinks: [
    { label: 'Privacy Policy', href: '#legal' },
    { label: 'Terms & Conditions', href: '#legal' },
    { label: 'Disclaimer', href: '#legal' },
    { label: 'Accessibility', href: '#legal' },
    { label: 'Do Not Sell My Info', href: '#legal' },
  ],
  copyright: `© ${new Date().getFullYear()} ${site.retailerName}. All rights reserved.`,
};
