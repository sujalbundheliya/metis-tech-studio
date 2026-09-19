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
- Full keyboard path; `Escape` closes menus, mobile panel locks scroll
- All decorative layers `aria-hidden`
- Reduced motion fully supported; no horizontal overflow at 390px
