---
name: "Alexander Zhiganov Personal Website"
version: "1.1.0"
tokens:
  colors:
    canvas: "#f6f6f7"
    surface: "#ffffff"
    sunken: "#ececee"
    ink: "#0b0b0b"
    mute: "rgba(11, 11, 11, 0.60)"
    faint: "rgba(11, 11, 11, 0.44)"
    rule: "rgba(11, 11, 11, 0.08)"
    ruleStrong: "rgba(11, 11, 11, 0.16)"
    signal: "#960018"
    signalSubtle: "rgba(150, 0, 24, 0.08)"
    signalSoft: "#f6e8ea"
    ok: "#1f7443"
    warn: "#7a5e00"
    risk: "#960018"
    info: "#1a5f86"
  typography:
    fontSans: "'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif"
    fontMono: "'IBM Plex Mono', monospace"
    scale:
      typeSmall: "clamp(13px, 0.8rem + 0.1vw, 14px)"
      typeBody: "clamp(17px, 1.02rem + 0.15vw, 18px)"
      typeLead: "clamp(20px, 1.1rem + 0.55vw, 24px)"
      typeHeading: "clamp(32px, 3.6vw, 48px)"
      typeDisplay: "clamp(36px, 7.4vw, 108px)"
  spacing:
    spaceXs: "4px"
    spaceSm: "8px"
    spaceMd: "16px"
    spaceLg: "24px"
    spaceXl: "40px"
    space2xl: "64px"
    gutter: "clamp(16px, 4vw, 56px)"
    maxw: "1360px"
  radius:
    default: "0px"
  motion:
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)"
    durFast: "200ms"
    durNormal: "260ms"
  breakpoints:
    mobileMax: "768px"
    desktopMin: "769px"
---

# Design System: Instrumental Style

This document defines the single source of truth for UI, UX, styling, and visual rules for Alexander Zhiganov's personal website. All agents and developers must strictly follow these constraints.

---

## 1. Design Philosophy: Instrumental Style

The visual identity is based on **Instrumental Style** (approved October 27, 2026). It prioritizes utility, editorial precision, and clear tonal elevation, drawing inspiration from industrial tooling and high-end design systems like Shopify Polaris.

### Core Surface Hierarchy
Elevation is achieved purely through tone steps, spatial padding, and scale — never through gratuitous borders or drop shadows on resting elements:
- **`--bg-canvas` (`#f6f6f7`)**: The foundational page background.
- **`--bg-surface` (`#ffffff`)**: Elevated surfaces (catalog cards, content containers, modals).
- **`--bg-sunken` (`#ececee`)**: Sunken fields, code blocks, quote containers, tool wells, and ghost button fills.

### Rules of Flat Surfaces
- **No drop shadows in resting state**: Box shadows are strictly reserved for genuine floating overlays (the CV dropdown menu, system dialog modals, and the PhotoSwipe fullscreen bar).
- **No 1px hairline divider rules**: Elements separate by whitespace and tonal difference. Lines are kept only for actual data tables, form fields, the active-page navigation indicator, and interactive interface mocks marked with `data-ui` (e.g. `ShumAssistantExplainer`).
- **Sharp 90-degree corners (`border-radius: 0`)**: All interface components (buttons, project cards, dialog boxes, menus, chips, badges, and portraits) must maintain crisp rectangular edges. No rounded corners (`border-radius: 0` is non-negotiable).

---

## 2. Color System & Accents

- **Primary Accent (`--signal: #960018`)**: Deep crimson. Used for key callouts, active indicators, focus rings, and selection highlights. No other shades of red are permitted.
- **Subtle Signal (`--signal-subtle: rgba(150, 0, 24, 0.08)`)**: Used for soft highlights and interactive table row hover states.
- **Pull Quotes & Callouts**: Blockquotes, sunken editorial callouts, and key takeaway boxes use an authoritative accent bar on the left: `border-left: 3px solid var(--signal)` with a background of `var(--bg-sunken)` or transparent.

---

## 3. Typographic System: Strict 5-Step Canonical Scale

All typography across the site strictly adheres to exactly five canonical fluid steps defined in `src/styles/global.css`:

1. **`--type-small` (`clamp(13px, 0.8rem + 0.1vw, 14px)`)**: Metadata, figure captions, tags, status chips, table headers, small utility buttons.
2. **`--type-body` (`clamp(17px, 1.02rem + 0.15vw, 18px)`)**: Main running body paragraphs, bullet lists, case study prose, card descriptions. (Intermediate 15px/16px body copy is prohibited).
3. **`--type-lead` (`clamp(20px, 1.1rem + 0.55vw, 24px)`)**: Lede introductions, pull statements, card titles (`h3`), dialog titles.
4. **`--type-heading` (`clamp(32px, 3.6vw, 48px)`)**: Section headings (`h2`), catalog direction titles, key metric numbers.
5. **`--type-display` (`clamp(36px, 7.4vw, 108px)`)**: Hero title (`h1`), case study hero titles (`.display`).

### Typographic Rules & Font Families
- **Inter Variable**: Applied for all editorial text, headings, interface buttons, tables, and captions.
- **IBM Plex Mono**: Exclusively reserved for real computer code, terminal commands, file paths, variables, and technical identifiers. Never use mono for regular UI labels or badges.
- **No Arbitrary Font Sizes**: Do not declare ad-hoc pixel font sizes (e.g. `12px`, `15px`, `22px`, `28px`). Always reference the 5 fluid CSS variables.
- **Optical Glyph Scaling Exception**: Relative font sizes in `em` (e.g. `font-size: 0.85em`) are permitted solely for optical compensation of inline icons or arrows (`↗`) within a link block to maintain visual balance with adjacent text.

---

## 4. Layout, Spacing & Breakpoints

### Spacing Grid
Maintain deterministic spacing across sections and elements:
- `space-xs`: `4px` (micro badges, inline tags)
- `space-sm`: `8px` (button internal gaps, icon margins)
- `space-md`: `16px` (card internal padding, mobile gutter minimum)
- `space-lg`: `24px` (sub-section stacking, desktop card padding)
- `space-xl`: `40px` (major block separation)
- `space-2xl`: `64px` (major page section margins)
- `gutter`: `clamp(16px, 4vw, 56px)` (fluid horizontal layout margin)
- `maxw`: `1360px` (maximum content container width)

### Responsive Behavior & Breakpoints
- **Mobile (`<= 768px`)**: Single-column layouts for catalog cards, stacked hero blocks, full-width buttons, collapsible navigation drawer, minimal gutter `16px`. Touch target sizes must maintain at least `44px × 44px`.
- **Desktop (`>= 769px`)**: Multi-column catalog grids, side-by-side hero compositions, inline navigation links, expanded fluid gutter up to `56px`.

---

## 5. Standard Interactive Components

### Buttons & Interactive Chips
All interactive triggers strictly follow three canonical styles:
1. **Primary Action**: Solid dark fill (`background: var(--ink); color: #ffffff;`). Sharp corners `border-radius: 0`. No drop shadow. Hover shifts subtly in opacity or luminance.
2. **Ghost / Secondary Action**: Soft neutral fill (`background: var(--bg-sunken); color: var(--ink); border: 0;`). Never use 1px outline/border on ghost buttons.
3. **Accent Action**: Reserved for special prompts or focal triggers (`border: 2px solid var(--signal); color: var(--signal);` or crimson background with white text).
- **Prohibited**: Gradient button fills, pills (`border-radius: 9999px`), and floating elevation shadows on resting buttons are forbidden.

---

## 6. Media & Visual Content Guidelines

- **Case Study Covers & Cards**: Project thumbnails and case study cards strictly use a `16:9` aspect ratio (`aspect-ratio: 16 / 9`) with `object-fit: cover` to preserve uniform visual rhythm.
- **NO Decorative AI Icons & Emojis**: Never place decorative icons, pictograms, or emojis before section headings, titles, or list items just to "make it look nice". Icons are permitted only as functional UI controls (e.g. download arrow, external link arrow `↗`, social media logos).

---

## 7. Rainbow Spectrum Gradients & Randomizer

Rainbow spectrum gradients are a distinctive signature element of the site, but their placement is tightly restricted.

### Permitted Placements
1. **Home Hero Statement Accent**: Applied only to the text phrase `art, technology, and AI`.
2. **Case Study Titles**: Case studies in `/development/*` with `rainbowTitle: true`.
3. **Art Section Headings**: All `h1` headings across the `/art/*` section (including the Art hub `/art`, Photography catalog `/art/photography`, individual photo collections `/art/photography/*`, and Licensing `/art/photography/licensing`) must feature the signature rainbow gradient (`var(--grad-spectrum)`).
4. **Header Brand & Navigation Hover**: Dual-layer cross-fade on brand name and navigation items upon pointer hover.

### Prohibited Placements
- Never apply rainbow gradients or rainbow borders to project cards, direction cards, or backgrounds in "What Would You Like to Explore?". Keep cards crisp, clean white surfaces.

### Hover Animation Spec
- Two-layer cross-fade (`opacity: 0 -> 1`) with duration `260ms` and easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Under `-webkit-background-clip: text`, the underlying base text transitions to `color: transparent` to eliminate dark anti-aliasing outlines.
- A generative inline script in `Base.astro` rotates between three themes (*Apple Intelligence*, *Instagram Sunset*, *Cyber Prismatic*) and dynamic gradient angles on each page load.

---

## 8. Strict Anti-Patterns & Prohibitions

Coding agents must actively avoid the following generic AI tropes:

1. **NO Eyebrows, Kickers, or Overlines**:
   - Never create small category tags, uppercase tracked kickers, or eyebrow labels (e.g. `<p class="ve-label">Premise</p>`, `<p class="case-meta">Case Study</p>`) above headings. The owner explicitly dislikes them. Headings must speak for themselves directly.
2. **NO Decorative Numbering**:
   - Prohibit numbered section overlines like `01 Index`, `02 About` or decorative lists formatted as `01`, `02`, `03` (AI cliché).
3. **NO Rounded Corners**:
   - Never output `border-radius: 4px`, `8px`, `12px`, or `9999px` on buttons, inputs, cards, or portraits. Keep `border-radius: 0`.
4. **NO Middle Dots (`·`)**:
   - The middle dot symbol is completely banned as a separator across the entire site. Use commas, colons, slashes, em-dashes, or line breaks instead.
5. **NO Unnecessary Title Case**:
   - Keep case study section headings conversational in sentence case (e.g. *"The input is never clean. The system is built for that."*). Do not rewrite them into Chicago Title Case.
6. **Arrow Direction**:
   - External/page navigation arrows must point north-east: use `↗` (U+2197), not `→`. Back links use left arrow `←`.
