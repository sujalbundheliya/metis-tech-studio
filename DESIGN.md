# Metis Tech Studio — Design System

Dark, editorial, black + blue. Tokens live in
[`src/app/globals.css`](src/app/globals.css); copy lives in
[`src/content/site.ts`](src/content/site.ts) and
[`src/content/services.ts`](src/content/services.ts).

---

## 1. Colour

Dark is the only mode. All five brand colours survive as anchors; the system
extends down into near-black navy surfaces and up into an electric beam blue.

### Ink — the page itself

| Token | Hex | Role |
|---|---|---|
| `ink-1000` | `#03070e` | **Page base.** Near-black carrying the brand's blue cast |
| `ink-950` | `#060c16` | Alternate section / raised panel |
| `ink-900` | `#0a1420` | Cards |
| `ink-800` / `ink-700` | `#0f1e2c` / `#16283a` | Surfaces, borders |

### Venice — the primary ramp

| Token | Hex | Role |
|---|---|---|
| `venice-200` | `#c8d9e6` | **BRAND — Sky Blue. Body copy on dark** |
| `venice-300` | `#84b3ce` | **BRAND — Rock Blue.** Muted copy, meta |
| `venice-700` | `#16587b` | **BRAND — Venice Blue.** Blooms, structure |
| `venice-950` | `#08202e` | Deepest structural blue |

### Accents

| Token | Hex | Rule |
|---|---|---|
| `aurora-500` | `#28c7e8` | Cyan signal — links, data, live edges, FAQ markers |
| `beam-500` | `#2f6bff` | **Electric blue. Light shafts and glows only, never text** |
| `ember-500` | `#e88f35` | ≤5% of any surface — numerals, seam markers |
| `sand-100` | `#f5eedd` | **BRAND — Merino.** Primary CTAs only |

Merino on near-black is the single warmest thing on the site, which is exactly
why it is reserved for the primary action. Beam blue never carries text — it
fails contrast at every size; it exists to light the page.

---

## 2. Type

| Face | Used for |
|---|---|
| **Instrument Serif** | Display — `t-display`, `t-h2`, editorial accents |
| **Inter** | Body, UI, `t-h3` |
| **JetBrains Mono** | `t-label` — micro-labels, numerals, breadcrumbs |

| Utility | Size | Notes |
|---|---|---|
| `t-display` | 44 → 84px | `1.02` leading, `-0.028em` |
| `t-h2` | 32 → 52px | |
| `t-h3` | 20 → 24px | Inter 500 |
| `t-lead` | 18 → 21px | |
| `t-body` | 17px | `1.62` leading |
| `t-small` | 15px | the floor for prose |
| `t-label` | 11px | mono, `0.14em`, uppercase |

> **Tailwind v4 traps, all of which fail silently.** See §5.

---

## 3. Atmosphere

Two effects, borrowed from the reference sites and rebuilt in our palette
([`ui/atmosphere.tsx`](src/components/ui/atmosphere.tsx)):

**Light beam** (prepairo.ai) — a hard diagonal shaft raking across the hero at
`-34deg`, blurred 46px, breathing on a 14s cycle rather than sweeping. A second
narrower shaft sits behind it for depth. Beam blue → aurora cyan across its width.

**Light curtains** (deccanexperts.ai) — faint vertical bands behind everything,
cross-fading on a 9s cycle.

Both sit under a `grid-lines` blueprint layer and a corner bloom marking the
light source, and everything settles back to `ink-1000` at the bottom edge.
`intensity="soft"` dials the whole stack back for interior pages so the homepage
stays the loudest thing on the site.

**Closing band** — the full-width strip above the footer, sampled directly from
the hero bloom: deep indigo → blue → an electric core → violet, falling away at
both ends. A blurred copy sits above the strip so it reads as light spilling
upward rather than as a painted stripe. It replaced an earlier rainbow band whose
teal and orange fought everything else on the page.

---

## 4. Interactions

**Grab a hero node** ([`draggable-lattice.tsx`](src/components/ui/draggable-lattice.tsx)) —
nodes are spring-tethered to home positions. Grab one and its edges stretch, close
neighbours get tugged along, a ghost ring marks where it belongs; release and it
flies back with your throw velocity, overshoots, settles. Cursor becomes
`grab`/`grabbing`; pointer capture keeps the drag alive off-canvas.

**Tear the weave** ([`fabric-field.tsx`](src/components/ui/fabric-field.tsx)) —
the gaps section sits on a woven dot lattice. Sweeping applies a radial shove
*plus* a drag along the direction of travel, so the tear takes the shape of the
movement and knits back behind it. Displaced dots heat Rock Blue → Aurora → Ember.

Both cap DPR at 2, stop their rAF loop off-screen via `IntersectionObserver`, and
draw one static frame under `prefers-reduced-motion`.

**Geometry:** zero radius everywhere — buttons, cards, cells — with one
exception. The closing CTA keeps its pill, its centred composition and its radial
bloom, because that section was the one part of the first design worth keeping.

---

## 5. Tailwind v4 traps

Three separate silent failures hit during this build. All produced wrong pixels
with no error and no warning.

**1 · Vendor prefixes are deduped, last one wins.** Prefixed first, standard last:

```css
/* WRONG — the unprefixed property is dropped, blur never applies */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

**2 · Ambiguous arbitrary values may not generate.** `text-[clamp(...)]` reads as
either font-size or colour and can be skipped entirely. Use `text-[length:clamp(...)]`.

**3 · Theme tokens referenced only inside `@utility` bodies get tree-shaken.**
`--font-editorial` was defined in `@theme` but never emitted, so headings fell
back to system sans. The `t-*` utilities now inline their font stacks.

When something looks unstyled, check the *computed* style before assuming the
class name is wrong — the class will be on the element either way.

---

## 6. Performance

Measured on a production build, not the dev server.

### `filter: blur()` was costing 22fps

The homepage scrolled at **38fps with 19 dropped frames**. Removing the canvases
changed nothing (38 → 39). Removing the blurs took it to **59fps**.

Large `filter: blur()` forces the compositor to re-rasterise the element on
every scroll frame, and the blooms were 1100px+ wide. The fix: those elements
were already `radial-gradient`s — **a gradient with soft stops is visually almost
identical to a blurred one and composites for free.** The beam keeps its softness
via a 12-stop ramp plus a mask on the ends.

| | fps | dropped frames |
|---|---|---|
| Before | 38 | 19 / 145 |
| `blur(46px)` → `blur(14px)` | 44 | 17 / 145 |
| No blur, dense gradient stops | **60** | **1 / 145** |

Even a 14px blur cost 16fps. Reach for gradient stops before a blur filter.

### Other findings

- **Space Grotesk was loaded but never used** — four weights, ~22kB, left over
  from the earlier redesign. Always check `--font-*` variables are referenced.
- **Canvases were not the bottleneck**, but their per-frame work was still
  reducible: the lattice now precomputes its edge list (neighbours depend on
  *home* positions, which never change) and batches same-styled strokes into one
  path; the fabric stops redrawing entirely once every dot has sprung home.
- **LazyMotion saved ~nothing** (293 → 292kB). It is kept because `strict` mode
  stops the full bundle creeping back in, but it is not why the site is fast.
- CLS is **0** and TTFB is 15–50ms; neither needed work.

### The loading moment

Route changes are instant (static pages, prefetched links), so a route-level
loading state would never be seen — `loading.tsx` exists only as a slow-network
fallback. The mark instead appears in `BootSplash`: once per session, while
fonts settle, with a 620ms floor so it reads as intentional and a 1400ms ceiling
so it can never hold the site up. It renders only after mount, so it cannot
block first paint, and a visitor without JS never sees it.

---

## 7. Accessibility

- One `<h1>` per page, unbroken H2/H3 outline
- 2px aurora focus ring at 3px offset, globally
- Prose floor is 15px; 11px is reserved for mono labels
- Beam blue never used for text
- Full keyboard path; `Escape` closes the sheet and returns focus to its trigger
- All decorative layers `aria-hidden`
- Reduced motion fully supported
- Touch targets meet the 44px platform floor — gated on pointer capability, not
  width, so a 768px tablet keeps them (see §8)
- No horizontal overflow at any width from 320px up, portrait or landscape


---

## 8. Mobile

The site was composed at desktop width and the phone was assumed to follow. It
did not. This section is the record of what that assumption cost, because every
item here was invisible from a desktop browser window — narrowing the viewport
reproduces almost none of it.

### The bug that hid the whole menu

`backdrop-filter` makes an element **a containing block for every
`position: fixed` descendant**. The header carries `backdrop-blur-xl`. The
mobile sheet was `fixed top-14 bottom-0` *inside* that header, so it resolved
against the header's own 57px box:

```
panelRect: { top: 56, bottom: 56, height: 0 }
bodyOverflow: "hidden"
```

Zero height, and the scroll lock still applied. Tapping the menu froze the page
and showed nothing. With the header CTA hidden below `sm`, a phone visitor
could reach exactly one page — on a live site whose traffic is mostly phones.

**The sheet is now portalled to `document.body`, and that is load-bearing, not
stylistic.** `transform`, `filter`, `perspective`, `contain: paint` and
`will-change` on any of those do the same thing. `template.tsx` wraps every
route in an animated `m.div`, which is transformed for the length of the page
transition — so even hoisting the sheet out of the header would leave it
captured for ~380ms on every navigation. Anything pinned to the viewport on
this site belongs in a portal.

The desktop dropdown had the same latent fault and only worked by coincidence:
`fixed top-14` happened to resolve against a header that happened to be 56px
tall and pinned to the top. It is now `absolute top-full`, which is what it
always meant.

### Capability, not width

The first pass gated touch targets on `sm:`. That was wrong, and the audit
caught it: a 768px tablet is a touch device, and the breakpoint stripped its
44px rows. Screen width does not tell you what is pointing at the screen.

`can-hover:` — `@media (hover: hover) and (pointer: fine)` — is the correct
axis. It is used as the *inverse* of Tailwind's `hover:`: the touch-friendly
value is the base, and `can-hover:` restores the quieter pointer value on top.

| Affordance | Rest (touch) | `can-hover:` |
|---|---|---|
| `TextLink` underline | drawn at full width | collapses to `0%`, grows on hover |
| Practice-card rule | 40px aurora tick | `w-0`, sweeps full width on hover |
| Card crop marks | visible (`touch-visible`) | hidden until hover |
| Chips | one step brighter | dimmer resting state |
| Row heights | 44px floor | `min-h-0` |

Every one of these was hover-only, which on a phone means it **never
rendered** — the growing underline was the only thing distinguishing a
`TextLink` from body copy, and it never drew. A hover state that is also the
only affordance is not a style choice.

> A device reporting `pointer: none` — headless Chrome, some TVs — gets the
> touch branch. That is the safe direction: affordances visible rather than
> hidden.

### Portrait is a different canvas

The atmosphere did not survive the frame turning, and each layer failed
differently:

- **The beam** is a twelve-stop ramp. Over ~870px those stops read as soft
  light; compressed into 240px the same ramp resolves into a saturated
  blue-cyan-violet **rainbow stripe** cutting across the practice cards. The
  gradient was never wrong — the distance it had to spread over was. Portrait
  widens it past the viewport and drops its strength.
- **The bloom** sat in a corner above the headline, so the top of the hero —
  the first thing anyone sees — rendered flat black. Portrait moves it down
  behind the type.
- **The curtains** repeat every 126px; at 390px that is three cycles across the
  screen, which reads as wallpaper stripes rather than depth.

**A latent bug surfaced here.** The `beam` keyframes animate `opacity`, and an
animated property beats any declared value — so `opacity-45` on a running
`.light-beam` was silently discarded, and `intensity="soft"` had *never*
dimmed the shaft on interior pages. Strength is now two multiplied variables:
`--beam-soft` (the component's prop, inline) and `--beam-viewport` (the media
query). Two, because an inline style outranks a stylesheet rule — one variable
would let the component win at every width.

*Add this to §5's list of Tailwind traps that fail silently: an `@keyframes`
block that touches a property is the fourth way to get wrong pixels with no
error.*

### Patterns the phone needs and the desktop does not

**A standing action bar.** On desktop "Book a call" is pinned to the header and
never leaves. Below `sm` that block is hidden, which deleted the site's entire
conversion path at the width most visitors arrive on. `MobileActionBar` is not
that button shrunk — it is pinned to the thumb, stays out of the way over the
hero, and retires once the closing CTA or footer is on screen so the page never
shows two copies of the same action.

**A collapsible footer.** Four columns, 22 links, stacked into one phone column
at 44px each is roughly two thousand pixels — five screens of link list before
the copyright. Collapsed, the whole footer is one screen. One DOM tree, not
two: the list is `sm:block`, so above the breakpoint it ignores the collapsed
state and the heading is a heading again. Rendering a separate phone version
would duplicate every link for crawlers and screen readers.

**A scroll-driven weave.** `FabricField` listened on `window` `pointermove`,
which on touch only fires while a finger is down — and the browser cancels the
stream the moment that movement is recognised as a scroll. The one gesture a
phone performs here is the one that guaranteed the effect never ran. The
disturbance now follows the middle of the viewport as it travels down the
section: the weave tears where you are reading. `DraggableLattice` kept its
drag but widened its grab radius from 26px to 46px, because a fingertip is not
a cursor hotspot.

### Safe areas and the iOS tax

`viewportFit: "cover"` is required in the viewport export, or iOS letterboxes
the page inside the safe area and **every `env(safe-area-inset-*)` resolves to
`0`** — the notch padding silently does nothing.

- Inputs are `16px`. Below that iOS zooms the viewport on focus and never zooms
  back, leaving the page scaled and scrolled sideways for the rest of the visit.
- The scroll lock pins `<body>` at a negative offset rather than setting
  `overflow: hidden`, which does not hold on iOS Safari — the page behind keeps
  rubber-banding. The offset must be restored on close or the page jumps to the
  top.
- `px-gutter` is `max(1.5rem, safe-left)`: the design's own margin, growing only
  to clear a landscape notch.

### Verification

Measured, not eyeballed — headless Chrome over CDP, asserting `scrollWidth`
vs `innerWidth`, computed tap-target boxes and real overflow across
320/360/390/430/768/1024 and landscape. Current state: **42/42 page-viewport
combinations clean.**

| | Before | After |
|---|---|---|
| Tap targets under 44px | 15+ per page | 0 |
| Homepage height at 390px | 14,798px | 12,823px |
| Footer at phone width | ~2,000px | one screen |

Two exclusions the audit needs or it reports false failures: the `sr-only` skip
link (1×1 until focused) and the tech-stack marquee (deliberately wider than
the screen inside an `overflow-hidden`, mask-faded track).

**Headless Chrome reports `pointer: none`** — it has no input device — so it
always renders the touch branch and the `can-hover:` half cannot be observed
directly. `Emulation.setEmulatedMedia` does not override those two features. To
check the desktop branch, walk `document.styleSheets` *recursively* (Tailwind
v4 nests `@media` inside `@layer`, so a flat scan returns nothing), lift the
rules out of that media block and re-append them unconditionally.

**Still unverified:** no Safari/WebKit in the build environment. The iOS items
above are correct by construction and standard practice, but the scroll lock,
the safe-area insets and the no-zoom rule have not been exercised on a real
iPhone.

---

## 9. Three practices, About, Contact, calculator

`services.md` replaced the 22-service, four-category structure with three
practice pages — Generative AI & RAG, Agentic AI & Automation, Software
Development — eight services each. Every service is a section with an `id` on
its practice page, so the nav, footer and schema deep-link to
`/services/<practice>#<service>`. The 22 old slugs (and the older aliases)
`308` to the matching section, or to `/services` where the offering was
dropped; the map is in `next.config.ts`.

**A redirected fragment does not scroll.** Chrome keeps the `#section` from a
redirect's `Location` and even matches `:target`, but leaves the page at the
top — measured both cached and uncached. `HashLanding` scrolls to it when the
page is still at `scrollY === 0`; a direct `#hash` load has already started
its own scroll by then and is left alone.

**The services dropdown was anchored to the wrong box.** Its wrapper was
`relative`, so `absolute inset-x-0 top-full w-screen` started at the Services
cell's left edge and ran 107px past the viewport, scrolling the page sideways
while open. The wrapper is no longer positioned; the sticky header is the
containing block, as the comment there always intended.

**The calculator** (`sections/cost-calculator.tsx`) keeps the spec's
arithmetic, ranges and captions and is rebuilt in the site's own system. Its
sliders are `.range` in `globals.css`: a 44px-tall input with a 4px track,
square thumb, and the WebKit and Gecko pseudo-elements in *separate* rules —
one unknown pseudo-element in a selector list drops the whole rule.

Verified: 81/81 page-viewport combinations clean (9 pages × 320→1440 incl.
landscape); calculator outputs match the spec's worked example
(24 h / 1,248 h / $56,160 / 33 weeks) and its six-strip overflow line.

**New pages opened part-way down.** `html { scroll-behavior: smooth }` plus
Next 16, which stopped suspending it during navigation unless `<html>` carries
`data-scroll-behavior="smooth"`. The router's reset to the top ran as a smooth
scroll and the incoming page interrupted it: from the homepage footer, `/about`
opened at y=4102. The attribute is now on `<html>` in `layout.tsx`. The phone
menu's scroll-lock restore is `behavior: "instant"` for the same reason — a
smooth restore bled into the next page by 24–76px. Measured after: 8/8
navigations (desktop links, phone menu, phone footer) land at y=0, back still
restores, same-page `#` links still glide.
