# Image brief — Arvig Authorized Retailer

Generate with Gemini Nano Banana (Gemini 2.5 Flash Image), save into
`public/images/` using the **exact filenames** below, then tell me they have
landed and I will wire them into the layout.

---

## Before you start — three rules

**1. No Arvig branding in any image.** No Arvig logo, no Arvig name on vans,
uniforms, hard hats or equipment. Generating branded assets would fabricate
marketing that Arvig never produced, and on an authorized-retailer site that
edges into implying these are Arvig's own crews. Every prompt below ends with
an explicit "no branding, no logos" instruction — keep it.

**2. No readable screens.** TV screens show a soft out-of-focus scene; phone
screens stay blank or dimmed. This avoids inventing a channel lineup or a UI
that does not exist, and it also stops the model producing garbled fake text.

**3. Aim for ≥1500px on the long edge.** Set the aspect ratio in the tool
rather than cropping afterwards. Save as **JPEG, quality ~85**. I will run them
through `next/image`, so no manual optimisation is needed.

---

## Where each image goes

| # | Filename | Aspect | Placement | Priority |
| --- | --- | --- | --- | --- |
| 1 | `hero-home-fiber.jpg` | 16:9 | Full-bleed behind the hero, under the `#1D1060` overlay | **Essential** |
| 2 | `install-technician.jpg` | 4:3 | "Three steps from call to connected" section | **Essential** |
| 3 | `why-us-local-team.jpg` | 16:9 | Wide band in "What sets Arvig service apart" | **Essential** |
| 4 | `tv-living-room.jpg` | 4:3 | Beside the two TV plan cards | **Essential** |
| 5 | `mobile-everyday.jpg` | 4:3 | Beside the Arvig Mobile cards | Optional |
| 6 | `home-phone-kitchen.jpg` | 4:3 | Beside the two home phone cards | Optional |
| 7 | `cable-neighborhood.jpg` | 4:3 | Beside the single cable card | Optional |

The four essentials carry most of the benefit. Sections with one or two cards
(cable, TV, phone) have visual room for a side image; fiber and bundles already
run three cards wide, so they stay text-only and the page keeps its rhythm.

---

## Prompts

Copy each block verbatim.

### 1. `hero-home-fiber.jpg` — 16:9

> Documentary-style photograph of a modest two-storey family home in rural
> Minnesota at blue hour, warm lamplight glowing in the downstairs windows,
> bare maple trees along a gravel driveway, a pickup truck parked to one side,
> patchy late-autumn grass and a low wooden fence. Overcast dusk sky with a
> soft gradient and generous empty space across the upper middle of the frame.
> Shot on a Canon EOS R6, 35mm lens, f/4, ISO 800, natural available light,
> fine sensor grain. Wide establishing shot, low visual clutter in the centre.
> Muted true-to-life colours, no colour grading, no lens flare, no HDR look.
> No people, no text, no logos, no watermarks.

*Why this composition:* the hero headline sits centred over this image, so the
empty upper-middle sky is what keeps the type legible under the overlay.

### 2. `install-technician.jpg` — 4:3

> Candid documentary photograph of a fibre-optic installation technician
> kneeling beside an open utility pedestal in a suburban front yard, splicing a
> thin fibre cable with a hand tool, wearing a plain navy work shirt, safety
> glasses and worn work gloves, an orange traffic cone on the grass nearby.
> Early morning overcast light. Shot on a Nikon Z6 II, 50mm lens, f/2.8,
> natural light, shallow depth of field, authentic skin texture, fine grain.
> Unposed and mid-action, not looking at the camera. Ordinary work clothing
> with visible wear and creases. No branding or logos on clothing, vehicle or
> equipment, no text, no watermarks.

### 3. `why-us-local-team.jpg` — 16:9

> Candid documentary photograph of two utility field workers standing beside an
> open plain white work van in a small-town parking lot on a cold clear winter
> morning, one holding a coil of fibre cable, both in plain high-visibility
> vests and knit beanies, breath visible in the cold air, talking to each
> other. Shot on a Nikon Z6 II, 50mm lens, f/2.8, low winter sun from the side,
> natural light, weathered work clothing, fine grain. Unposed, mid-conversation,
> neither looking at the camera. No branding or logos on the van, vests or
> equipment, no text, no watermarks.

### 4. `tv-living-room.jpg` — 4:3

> Candid photograph of a family of three watching television in an ordinary
> suburban living room in the evening, seen from behind and slightly to one
> side, sitting on a sectional sofa with a rumpled throw blanket, a
> wall-mounted television showing a soft out-of-focus nature scene, warm
> table-lamp light, a coffee table holding two mugs and a remote. Shot on a
> Sony A7 III, 35mm lens, f/2.0, ISO 1600, available light only, natural grain.
> Lived-in room that is not styled, with mild everyday clutter. Nothing
> readable on the television screen, no logos, no text, no watermarks.

### 5. `mobile-everyday.jpg` — 4:3

> Candid photograph of a woman in her thirties standing in a kitchen doorway
> glancing at her smartphone while holding a coffee mug, wearing a plain knit
> sweater and jeans, soft morning light through a window behind her. Shot on a
> Fujifilm X-T4, 35mm lens, f/2, natural window light with slight backlight
> haze, authentic skin texture with visible pores and a few flyaway hairs.
> Unposed and caught mid-moment, not looking at the camera. Ordinary home
> kitchen with real clutter on the counter. Phone screen dark and blank. No
> logos, no text, no watermarks.

### 6. `home-phone-kitchen.jpg` — 4:3

> Candid photograph of a man in his seventies talking on a cordless landline
> handset while standing at a kitchen counter in a modest home, wearing a
> flannel shirt, soft daylight from a side window, a folded newspaper and
> reading glasses on the counter beside him. Shot on a Canon EOS R6, 50mm lens,
> f/2.8, natural light, realistic skin texture and wrinkles, fine grain. Warm
> but neutral colours, not stylised. Unposed documentary feel, not looking at
> the camera. No logos, no text, no watermarks.

### 7. `cable-neighborhood.jpg` — 4:3

> Documentary photograph of a quiet residential street in a small Minnesota
> town on an overcast late afternoon in early spring, modest single-storey
> houses with vinyl siding, utility poles carrying aerial cable lines, a
> cracked sidewalk with patches of melting snow, one parked sedan. Shot on a
> Canon EOS R5, 35mm lens, f/5.6, flat natural overcast light, true-to-life
> muted colours, fine grain. No people, no text, no logos, no watermarks.

---

## What makes these read as real rather than AI

Each prompt deliberately includes:

- **A specific camera, lens and aperture.** Pushes the model toward photographic
  depth of field instead of the uniformly sharp illustrative look.
- **Named available light** — overcast, blue hour, low winter sun, window
  backlight. Generic "beautiful lighting" is what produces the glossy CGI feel.
- **Imperfection, stated outright** — worn gloves, rumpled blanket, counter
  clutter, flyaway hair, visible pores, creased clothing. This matters more
  than anything else on the list.
- **Unposed, not looking at the camera.** Direct eye contact plus a symmetrical
  smile is the single strongest AI-stock tell.
- **Muted, ungraded colour.** Asking for "cinematic", "stunning", "4K" or
  "ultra-detailed" reliably pushes the result toward a render.

If a result still looks synthetic, the usual culprits are hands, teeth and any
text in frame. Regenerate rather than retouch, and crop tighter if hands are
the problem.

---

## When they land

Drop the files in `public/images/` and tell me. I will then:

1. Add an optional `image` field to `ServiceSection` in `lib/content.ts`, so
   imagery stays data-driven like everything else and no layout file holds a
   file path.
2. Render section images through `next/image` with explicit width/height, lazy
   loading below the fold, and `priority` on the hero only.
3. Layer the hero image under the existing `#1D1060` with an overlay tuned to
   keep headline contrast at WCAG AA.
4. Re-run the 320px overflow check and the production build.
