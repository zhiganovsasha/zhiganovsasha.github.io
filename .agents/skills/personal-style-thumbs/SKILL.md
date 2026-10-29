---
name: personal-style-thumbs
description: Generate two website thumbnail or cover candidates in Alexander Zhiganov's established matte paper-relief style, then present both for selection and export the chosen image as an optimized WebP. Use this skill whenever the user asks for a thumbnail, cover, card image, hero visual, section artwork, or matching illustration for the personal website, especially when they mention the existing red, white, gray, papercraft, or textured visual style. Do not use it for photographs, logos, diagrams, screenshots, or images for unrelated brands.
compatibility: Requires the built-in image generation tool for candidates and Python with Pillow for the final WebP export.
---

# Personal style thumbs

Create raster artwork that belongs to the personal website's existing visual
system. The result should look like a carefully photographed physical paper
relief, not like generic AI technology art.

## Read before generating

Read `references/style-spec.md` completely. Inspect the four positive reference
images in `assets/references/` with an image viewer. Inspect
`overdetailed-background-negative.webp` only to understand what to avoid; do not
pass that negative example to the image generator as a style reference.

Use the built-in image generation tool. Pass the four positive images as style
references when the tool supports local reference paths.

## Establish the real placement

Composition depends on rendered size, not only source resolution. Before
writing prompts, determine:

- the page and component where the image is intended to appear;
- its approximate rendered width on desktop and mobile;
- the aspect ratio and any `object-fit` crop;
- whether nearby text occupies part of the composition;
- which edges need safe space.

If the location exists in this repository, inspect its component and CSS. If
the location is not known, ask the user for it. Do not invent a generic layout.
Do not edit or connect the image to the site as part of this skill.

## Scale the scene to the placement

Use these density limits as defaults, then adjust to the actual component:

- Small card, roughly 280 to 400 CSS pixels wide: one dominant subject and no
  more than three large supporting forms. Avoid thin lines, tiny icons, and
  detailed backgrounds.
- Medium cover, roughly 400 to 800 CSS pixels wide: one dominant subject and
  three to five supporting forms. Keep the background quiet and preserve safe
  crop space.
- Large feature, above roughly 800 CSS pixels wide: allow a richer physical
  scene, but keep a clear hierarchy and large readable silhouettes.

Judge both candidates at the intended rendered size. A detail that disappears
at that size does not belong in the image.

## Build the generation brief

Create a lowercase kebab-case section and image slug. Save work under:

`src/assets/generated/<section>/<image-slug>/`

Prepare a short brief containing:

- purpose and subject;
- intended page and component;
- desktop and mobile display sizes;
- aspect ratio and final pixel dimensions;
- focal subject and safe areas;
- object count appropriate to the rendered size;
- candidate A prompt and candidate B prompt.

Use 16:9 and 1440 by 810 pixels by default. Use another ratio only when the
real placement requires it.

## Generate exactly two candidates

Issue two separate image-generation calls. Candidate A and candidate B must
share the same subject, placement, materials, palette, and constraints, while
using meaningfully different compositions. Do not create arbitrary stylistic
variations.

Use this prompt structure:

```text
Use case: stylized-concept
Asset type: website <component type>, rendered at approximately <CSS size>
Primary request: <subject and purpose>
Input images: four positive references, used only for visual language
Scene/backdrop: restrained near-white paper studio surface
Subject: <one clear focal construction>
Style/medium: photographed physical paper-cut relief, matte layered cardstock,
subtle embossed paper grain, crisp cut edges, realistic contact shadows
Composition/framing: <placement-specific hierarchy and safe areas>
Lighting/mood: soft neutral studio light from the upper left, calm and precise
Color palette: paper white #ffffff, canvas gray #f6f6f7, sunken gray #ececee,
graphite, and one controlled crimson accent close to #960018
Text: none
Constraints: large readable silhouettes; detail density appropriate to the
rendered size; quiet background; no logo or watermark
Avoid: generic AI imagery, corporate technology advertising, glassmorphism,
blue or purple gradients, neon, glowing networks, floating dashboards,
isometric SaaS scenes, circuit-board decoration, humanoid robots, stock-photo
people, 3D emoji, random sparkles, fake text, excessive icons, glossy plastic,
busy scenery, and ornamental detail without meaning
```

The model may not reproduce a hex value exactly. Ask for crimson close to
`#960018`, then inspect whether the red reads as the website's dark crimson
rather than bright scarlet.

## Validate before showing the user

Inspect both candidates at full size and at the intended rendered size. A
candidate is acceptable only when:

- its focal subject is immediately readable;
- the background is quieter than the subject;
- crimson is limited and close to the official site accent;
- the paper grain is visible but not noisy;
- lighting and contact shadows make the construction physically coherent;
- it contains no text, logo, watermark, people, or prohibited tech imagery;
- it does not imitate the negative dandelion reference's detailed background;
- it remains legible after the expected crop.

If a candidate fails, regenerate that candidate with one targeted correction.
Do not present a known-bad image merely to satisfy the count of two.

## Save and present candidates

Copy the two generated originals into the work folder as:

- `candidate-a.png`
- `candidate-b.png`

Write the brief to `brief.md`. Show both images inline with clear A and B
labels, state the intended placement, and ask the user to choose. Stop here.
Do not select for the user and do not create `final.webp` before they answer.

## Export the selected candidate

After the user chooses A or B, run:

```powershell
python .agents/skills/personal-style-thumbs/scripts/export_webp.py `
  --input <selected-candidate> `
  --output <work-folder>/final.webp `
  --width <final-width> `
  --height <final-height>
```

The script refuses an incorrect aspect ratio rather than silently cropping the
composition. If it refuses the image, regenerate or explicitly agree on a crop
with the user.

Inspect the exported WebP and update `brief.md` with the selected candidate,
final path, dimensions, and file size. Report the saved path and final prompt.

## Boundaries

- Never connect the final image to a page, import it into code, or change the
  website unless the user separately asks for that work.
- Never commit, push, publish, or deploy as part of this skill without a
  separate explicit instruction.
- Preserve both local candidates so the user can revisit the choice. Candidate
  PNGs are excluded from Git by the generated-assets folder rules.
- Do not use the middle dot character in filenames, briefs, prompts, or copy.
