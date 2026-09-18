/**
 * lib/legal.ts — the eight policy documents
 * ---------------------------------------------------------------------------
 * Same architecture as lib/content.ts: the documents are data, and one route
 * plus one layout component renders all of them. Adding or amending a policy
 * is an edit here, never a layout change.
 *
 * ---------------------------------------------------------------------------
 * THESE ARE DRAFTS, NOT LEGAL ADVICE.
 *
 * They follow the structure and coverage that authorized-retailer sites in
 * this sector normally carry, and they are written to be accurate about how
 * THIS site actually behaves — no payment form, no data sale, orders taken by
 * phone. They still need review by counsel before launch, and every
 * `[bracketed]` placeholder in `site` must be filled in first.
 * ---------------------------------------------------------------------------
 */

import { site } from './content';

export interface LegalSection {
  heading: string;
  /** Paragraphs. */
  body?: string[];
  /** Rendered as a bulleted list beneath the paragraphs. */
  list?: string[];
}

export interface LegalDoc {
  /** URL segment under /legal. */
  slug: string;
  /** Page <h1> and <title>. */
  title: string;
  /** Short label for footer and cross-links. */
  navLabel: string;
  /** Meta description. */
  description: string;
  /** Standfirst under the heading. */
  intro: string;
  sections: LegalSection[];
}

/**
 * Optional "Last reviewed" line. Left empty deliberately: the build carries a
 * no-date-stamp rule, and a stale date on a policy is worse than none. Set it
 * to something like 'March 2026' when counsel signs the documents off, and it
 * will render on every page.
 */
export const legalLastReviewed = '';

const ENTITY = site.legalEntity;
const RETAILER = site.retailerName;

/** Contact block appended to every document, so it is written once. */
const contactSection: LegalSection = {
  heading: 'Contact',
  body: [
    `Questions about this policy can be directed to ${ENTITY}, operator of this site.`,
  ],
  list: [
    `Phone: ${site.phoneDisplay}`,
    `Email: ${site.legalEmail}`,
    `Mail: ${site.legalAddress}`,
  ],
};

export const legalDocs: LegalDoc[] = [
  /* ===================================================================== */
  {
    slug: 'privacy',
    title: 'Privacy & Data Protection',
    navLabel: 'Privacy & Data Protection',
    description:
      'How this independent Arvig authorized retailer collects, uses, shares and retains personal information, and the privacy rights available to you.',
    intro:
      'This policy explains what this site collects, why, who it goes to, and how long it is kept. It covers this site only — once an order is placed with Arvig, Arvig’s own privacy policy governs the information it holds about your account.',
    sections: [
      {
        heading: 'Who operates this site',
        body: [
          `This site is operated by ${ENTITY} as an ${RETAILER.toLowerCase()}. It is not operated by Arvig, and Arvig is not responsible for its contents.`,
        ],
      },
      {
        heading: 'Information we collect',
        body: [
          'We keep collection to what the site actually needs to function.',
        ],
        list: [
          'ZIP code entered into the availability checker, used to discuss serviceability with you.',
          'Standard server request data such as IP address, browser user agent, referring page and timestamp, recorded automatically by the hosting platform.',
          'Your cookie consent choice, stored in your own browser.',
          'Anything you tell us voluntarily on a phone call, including the details needed to place an order.',
          'Call detail and, where recording applies, call audio. See the TCPA Policy for how recording is handled.',
        ],
      },
      {
        heading: 'What we do not collect',
        body: [
          'This site contains no payment form, no account login and no file upload. We do not ask for, receive or store card numbers, bank details, Social Security numbers or government identifiers through this website. See the PCI DSS page for how payment details are handled.',
        ],
      },
      {
        heading: 'How we use it',
        list: [
          'To check which Arvig plans are serviceable at an address and to quote them accurately.',
          'To take, place and follow up on an order you ask us to place.',
          'To keep the site secure and diagnose faults.',
          'To understand, in aggregate, which pages are useful.',
          'To meet legal, tax and regulatory obligations.',
        ],
      },
      {
        heading: 'Sharing your information',
        body: [
          'We do not sell personal information, and we do not share it for cross-context behavioural advertising.',
          'Information is disclosed only in these circumstances:',
        ],
        list: [
          'To Arvig, where you have asked us to place an order and the details are needed to provision service.',
          'To service providers who operate the site on our behalf, such as hosting and analytics, and only to the extent they need it.',
          'Where we are legally required to, or to establish or defend legal claims.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'Server request logs are retained for a short operational period and then discarded. Order records are retained as long as needed for the order, and afterwards for the period required by tax and regulatory rules. Your cookie consent choice remains in your browser until you clear it.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'The site is served over HTTPS, and access to any order information is limited to staff who need it. No method of transmission or storage is completely secure, and we do not claim otherwise.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'This site is intended for adults arranging residential service. It is not directed at children under 13, and we do not knowingly collect their information. If you believe a child has provided information, contact us and it will be deleted.',
        ],
      },
      {
        heading: 'Your privacy rights',
        body: [
          'Depending on where you live, you may have the right to request access to the personal information we hold about you, to have it corrected or deleted, to obtain a portable copy, and not to be discriminated against for exercising those rights. Residents of California and of other states with comprehensive privacy laws have these rights by statute.',
          'To exercise any of them, use the contact details below. We will verify your identity before acting, and we will not charge you for a reasonable request.',
          'Because we do not sell or share personal information for cross-context behavioural advertising, there is nothing for a "Do Not Sell or Share" request to opt out of. Requests will still be acknowledged.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'This policy may be amended. The current version is always the one published on this page.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    navLabel: 'Disclaimer',
    description:
      'The relationship between this site and Arvig, and the limits of the pricing, speed and availability information published here.',
    intro:
      'The most important thing on this page: this site is operated by an independent authorized retailer. It is not Arvig, and it is not endorsed by Arvig beyond the retail authorization that lets us sell and order its services.',
    sections: [
      {
        heading: 'Independent retailer status',
        body: [
          `${ENTITY} operates this site as an independent authorized retailer of Arvig residential services. We are a separate business. We are not Arvig, not a subsidiary of Arvig, and not an agent with authority to bind Arvig.`,
          'Statements on this site are ours, not Arvig’s. Arvig is not responsible for them.',
        ],
      },
      {
        heading: 'Pricing and availability',
        body: [
          'Prices shown are Arvig published rates as we understood them at the time of writing. They vary by service address, they can change, and promotional terms can end. Nothing on this site is a binding quote.',
          'Which plans are actually available depends entirely on what is serviceable at your address. A plan appearing here does not mean it can be delivered to you.',
          'Internet rates shown include the monthly saving for enrolling in AutoPay (ACH) together with Paperless Billing. Without both enrolments the rate is higher.',
        ],
      },
      {
        heading: 'Speeds',
        body: [
          'Speeds are the maximum wired speeds for the plan. Actual throughput depends on your equipment, in-home wiring, Wi-Fi conditions, the device you are using and network conditions. No specific speed is guaranteed.',
        ],
      },
      {
        heading: 'Taxes, fees and equipment',
        body: [
          'Monthly rates exclude taxes, regulatory surcharges, activation charges and equipment costs unless a page says otherwise. Your final bill comes from Arvig and will reflect those items.',
        ],
      },
      {
        heading: 'Service, billing and support',
        body: [
          'Once service is established, your account, billing and technical support relationship is with Arvig under its own terms and policies. This site is a sales and ordering channel.',
        ],
      },
      {
        heading: 'No warranty',
        body: [
          'This site is provided as is. We work to keep it accurate, but we do not warrant that it is complete, current or error-free, and we are not liable for decisions made solely in reliance on it. Confirm the details that matter to you before ordering.',
        ],
      },
      {
        heading: 'External links',
        body: [
          'Where this site links elsewhere, we do not control the destination and are not responsible for its content or its privacy practices.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'cookies',
    title: 'Cookies Policy',
    navLabel: 'Cookies Policy',
    description:
      'What cookies and similar technologies this site uses, what each category does, and how to control them.',
    intro:
      'A cookie is a small file a site stores in your browser. This page sets out what this site stores, why, and how to refuse it.',
    sections: [
      {
        heading: 'Categories we use',
        body: [
          'Cookies and similar browser storage on this site fall into these groups.',
        ],
        list: [
          'Strictly necessary — required for the site to load, to remember your cookie choice and to protect against abuse. These cannot be switched off without breaking the site.',
          'Analytics — aggregate measurement of which pages are viewed, so the site can be improved. Set only where analytics are enabled and you have consented.',
          'Advertising — used to measure the effectiveness of advertising campaigns. Set only with your consent, and never used to build a profile that is sold.',
        ],
      },
      {
        heading: 'What we do not do',
        body: [
          'We do not use cookies to sell your personal information, and we do not share cookie data for cross-context behavioural advertising. Non-essential categories stay off until you consent.',
        ],
      },
      {
        heading: 'Managing cookies',
        body: [
          'Every major browser lets you block or delete cookies, and lets you do so per site. Blocking strictly necessary cookies will stop parts of the site working.',
          'This site also honours the Global Privacy Control signal where your browser or extension sends one.',
        ],
      },
      {
        heading: 'Withdrawing consent',
        body: [
          'Clearing this site’s data in your browser removes your stored consent choice, and you will be asked again on your next visit.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If the cookies used here change materially, this page will be updated to match.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'tcpa',
    title: 'TCPA Policy',
    navLabel: 'TCPA Policy',
    description:
      'How this retailer handles calls and text messages under the Telephone Consumer Protection Act, including consent, revocation and Do-Not-Call rights.',
    intro:
      'This policy explains how we treat telephone contact under the Telephone Consumer Protection Act (TCPA) and related rules. Consent is voluntary, it is never a condition of buying anything, and you can withdraw it at any time.',
    sections: [
      {
        heading: 'Calls you place to us',
        body: [
          `When you dial the number published on this site, you are initiating the call. Nothing about that call is automated on our side; you reach a person.`,
        ],
      },
      {
        heading: 'Consent for calls and texts from us',
        body: [
          'If you give us your telephone number and ask us to follow up, you consent to being contacted at that number about Arvig services, including by automatic telephone dialing system, prerecorded message or artificial voice, and by SMS.',
          'Consent is not a condition of purchasing any product or service. You can decline and still order by calling us.',
        ],
      },
      {
        heading: 'Message frequency and charges',
        body: [
          'Message frequency varies with what you have asked us to do. Message and data rates may apply according to your own mobile plan. We do not charge for the messages themselves.',
        ],
      },
      {
        heading: 'Stopping messages',
        body: [
          'Reply STOP to any text message to end texts to that number. Reply HELP for assistance. You can also ask us by phone or email to stop contacting you, and we will action it.',
        ],
      },
      {
        heading: 'Revoking consent',
        body: [
          'Consent can be revoked at any time, by any reasonable means. Tell us on a call, reply STOP to a text, or email the address below. A revocation applies to the number you identify and takes effect promptly once processed.',
        ],
      },
      {
        heading: 'Do-Not-Call rights',
        body: [
          'We honour the National Do Not Call Registry and maintain an internal do-not-call list. Asking to be added to our internal list will be honoured regardless of your registry status, and the entry is kept.',
        ],
      },
      {
        heading: 'Call recording',
        body: [
          'Calls may be recorded or monitored for quality and training. Where recording applies you will be notified at the start of the call, and you can ask that the call not be recorded.',
        ],
      },
      {
        heading: 'Carriers',
        body: [
          'Mobile carriers are not liable for delayed or undelivered messages.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    navLabel: 'Trademarks',
    description:
      'Ownership of the Arvig name and marks, and the basis on which this independent retailer refers to them.',
    intro:
      'Arvig and the Arvig logo are trademarks of their owner. This site uses them to identify the services it is authorized to sell, and for no other purpose.',
    sections: [
      {
        heading: 'Ownership',
        body: [
          'Arvig, the Arvig logo and all related names, marks and slogans are the property of Arvig or its affiliates. Nothing on this site transfers any right in them, and nothing here should be read as granting you a licence to use them.',
        ],
      },
      {
        heading: 'How this site uses them',
        body: [
          `${ENTITY} uses the Arvig name descriptively, to identify the services it is authorized to sell and order on your behalf. This is a referential use to describe the product, not a claim of ownership.`,
          'The wordmark presented in this site’s header is our own retailer mark. It is not the Arvig corporate logo and should not be mistaken for it.',
        ],
      },
      {
        heading: 'No endorsement',
        body: [
          'Use of the Arvig name here does not imply that Arvig sponsors, endorses or has reviewed this site, beyond the retail authorization that permits us to sell its services. See the Disclaimer for the full statement of that relationship.',
        ],
      },
      {
        heading: 'Other marks',
        body: [
          'Any other product or company names appearing on this site, including channel and network names in television lineups and device or platform names, are the trademarks of their respective owners and are used for identification only.',
        ],
      },
      {
        heading: 'Concerns about our use',
        body: [
          'If you are a rights holder and believe a mark is being used improperly on this site, contact us using the details below and it will be reviewed promptly.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'marketing',
    title: 'Marketing Policy',
    navLabel: 'Marketing Policy',
    description:
      'The standards this retailer holds its advertising to, covering truthful pricing claims, disclosure of retailer status and channel conduct.',
    intro:
      'This policy sets out how we advertise. Its purpose is simple: what we say in an advertisement should match what you actually get when you call.',
    sections: [
      {
        heading: 'Truthful advertising',
        body: [
          'Claims we publish must be accurate, substantiated and current. Where a claim depends on a condition, the condition is stated with the claim rather than buried.',
        ],
      },
      {
        heading: 'Pricing claims',
        body: [
          'Advertised rates are presented with the qualifiers that actually apply to them.',
        ],
        list: [
          'Where a rate depends on enrolment in AutoPay and Paperless Billing, that is stated alongside the rate.',
          'Where a rate varies by service address, it is described as a starting rate rather than a fixed price.',
          'Where a plan has no published rate, we say so and quote it on a call rather than inventing a figure.',
          'Taxes, surcharges, equipment and installation costs are identified as additional.',
        ],
      },
      {
        heading: 'Retailer status is disclosed',
        body: [
          'Every page of this site carries a persistent statement that it is operated by an independent authorized retailer. We do not run advertising that presents this business as Arvig itself, and we do not bid on or present ourselves in a way designed to be mistaken for the carrier’s own site.',
        ],
      },
      {
        heading: 'No bait advertising',
        body: [
          'We do not advertise a plan or rate we are not prepared to sell at that rate where it is serviceable. If something advertised turns out not to be available at your address, we will say so and explain what is.',
        ],
      },
      {
        heading: 'Competitors',
        body: [
          'Comparative statements, where made, are factual and verifiable. We do not disparage other providers.',
        ],
      },
      {
        heading: 'Third parties acting for us',
        body: [
          'Anyone marketing on our behalf is required to meet this policy and the TCPA Policy. Marketing that breaches either is grounds for ending the arrangement.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you have seen advertising attributed to this business that you believe is inaccurate or misleading, report it using the details below. We will investigate and correct what needs correcting.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    navLabel: 'Service Fulfillment',
    description:
      'What happens after you call to order: serviceability checks, order placement, installation, equipment, and which party is responsible for what.',
    intro:
      'This page sets out what we do, what Arvig does, and what you can expect between placing an order and having working service.',
    sections: [
      {
        heading: 'What we do and what Arvig does',
        body: [
          'We are the sales and ordering channel. We confirm what is serviceable at your address, explain the plans and their costs, and submit the order.',
          'Arvig provides the network, performs the installation, owns the customer account and issues the bill. After service is live, your ongoing relationship is with Arvig under its own terms.',
        ],
      },
      {
        heading: 'Checking serviceability',
        body: [
          'The availability checker on this site is a starting point, not a confirmation. Serviceability is confirmed against your exact address during the call, because what is available can differ between two homes on the same street.',
        ],
      },
      {
        heading: 'Placing an order',
        body: [
          'Orders are taken by telephone. Before an order is submitted we will confirm the plan, the monthly rate, what conditions that rate depends on, the equipment involved and any one-time charges.',
        ],
      },
      {
        heading: 'Installation',
        body: [
          'Arvig schedules and performs installation. For a new fibre connection this can involve mapping the property, flagging the route, locating public utilities, you marking any private lines, construction, splicing, and finally the indoor work.',
          'Timelines depend on the work required at your property and are set by Arvig, not by us. A straightforward connection to existing infrastructure is considerably quicker than a new build.',
        ],
      },
      {
        heading: 'Equipment',
        body: [
          'Equipment supplied with the service, including any managed Wi-Fi router or television device, is provided under Arvig’s terms. Charges for it appear on your Arvig bill.',
        ],
      },
      {
        heading: 'Changing or cancelling an order',
        body: [
          'To change or cancel before installation, call us and we will pass it to Arvig. After service is active, changes and cancellation are handled under your Arvig account terms.',
        ],
      },
      {
        heading: 'Billing',
        body: [
          'We do not bill you. All charges for service come from Arvig. We take no payment for the service itself at the point of order.',
        ],
      },
      {
        heading: 'If something goes wrong with the order',
        body: [
          'If an order we placed does not match what was agreed on the call, contact us using the details below and we will work to put it right.',
        ],
      },
      contactSection,
    ],
  },

  /* ===================================================================== */
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    navLabel: 'PCI DSS',
    description:
      'How cardholder data is handled by this retailer, and why this website neither collects nor stores payment card information.',
    intro:
      'The Payment Card Industry Data Security Standard (PCI DSS) governs how card data is handled. The short version for this site: it does not handle any.',
    sections: [
      {
        heading: 'This website takes no payments',
        body: [
          'There is no checkout, no payment form, no card field and no stored payment method anywhere on this site. No cardholder data is transmitted to or through it.',
          'The only interactive element is the ZIP availability checker, which accepts a five-digit postal code and nothing else.',
        ],
      },
      {
        heading: 'Where payment actually happens',
        body: [
          'Service is billed by Arvig. Payment details are provided to Arvig and handled under Arvig’s own systems and its own PCI DSS obligations, not ours.',
        ],
      },
      {
        heading: 'If card details are ever discussed with us',
        body: [
          'Our staff do not request card numbers to place an order. If cardholder data is ever handled incidentally in the course of assisting you, the following applies:',
        ],
        list: [
          'Card numbers, security codes and PINs are never written down, stored in a file, emailed or entered into this website.',
          'Sensitive authentication data such as the CVV and full magnetic stripe or chip data is never retained after authorization under any circumstances.',
          'Card details are never requested by email or text message, both of which are unsuitable for them.',
          'Access is limited to staff with a legitimate need at that moment.',
        ],
      },
      {
        heading: 'How to protect yourself',
        body: [
          'We will never email or text you asking for a full card number, and we will never ask you to send card details to an address you were given in an unsolicited message. If you receive such a request claiming to be from us, do not respond to it and report it using the details below.',
        ],
      },
      {
        heading: 'Site security',
        body: [
          'The site is served exclusively over HTTPS, so traffic between your browser and it is encrypted in transit.',
        ],
      },
      {
        heading: 'Reporting a concern',
        body: [
          'If you believe card data has been mishandled, or you have received a suspicious request in this business’s name, contact us immediately using the details below.',
        ],
      },
      contactSection,
    ],
  },
];

/* ========================================================================== */
/*  SELECTORS                                                                 */
/* ========================================================================== */

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}

export const legalSlugs: string[] = legalDocs.map((d) => d.slug);

/** Footer link set, derived so a new document appears automatically. */
export const legalLinks = legalDocs.map((d) => ({
  label: d.navLabel,
  href: `/legal/${d.slug}`,
}));
