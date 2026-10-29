# Personal paper-relief visual specification

## Canonical visual idea

Build a small physical world from cut and layered paper, then photograph it in
a controlled studio. The image should feel made, tactile, quiet, and exact. It
must not resemble a generic 3D render about artificial intelligence.

## Canonical palette

- Accent crimson: `#960018`. Generated red should visually approach this dark
  crimson rather than scarlet, coral, burgundy, or magenta.
- Paper white: `#ffffff`.
- Page canvas gray: `#f6f6f7`.
- Recessed gray: `#ececee`.
- Graphite: near-black neutral charcoal, without a blue tint.

Use white and gray for most of the frame. Graphite defines functional forms.
Crimson identifies the focal mechanism or one meaningful state. Do not spread
red evenly across every object.

## Materials and light

- Matte fibrous or subtly embossed paper and cardstock.
- Crisp cut edges and layered relief with believable thickness.
- Soft, neutral studio light from the upper left.
- Realistic contact shadows and shallow physical depth.
- Controlled microtexture. Texture supports tactility but never becomes a
  patterned background.
- No glossy plastic, polished metal, glass, liquid, neon, or translucent UI.

## Composition

The visual language does not require one fixed layout. Match the composition to
the actual component and viewing size.

At small rendered sizes, prefer one large silhouette and very few supporting
forms. At larger sizes, introduce a limited secondary story while preserving a
clear focal hierarchy. Keep important elements away from known crop zones.

Functional relationships may be shown with physical adjacency, paper strips,
slots, layers, or a small number of sturdy connectors. Avoid sprawling node
networks and repeated tiny icon tiles.

## Positive references

- `../assets/references/telegram-assistant-positive.webp`: strong central
  object, readable supporting functions, generous quiet background.
- `../assets/references/website-positive.webp`: clear product metaphor and
  controlled crimson concentration.
- `../assets/references/knowledge-system-positive.webp`: tactile knowledge
  metaphor with coherent physical connections.
- `../assets/references/video-production-positive.webp`: wide storytelling
  composition with large forms that survive thumbnail scale.

Use the references for medium, palette, lighting, relief depth, and restraint.
Do not copy their subject matter into unrelated images.

## Negative reference

`../assets/references/overdetailed-background-negative.webp` establishes the
failure mode to avoid. Its background repeats many small tracked objects and
fine connectors. Those details become noise at card size and compete with the
main subject. The restrained palette and paper material are still relevant,
but the background density is not.

Do not pass this file to the generator as a positive style reference.

## AI-slop and corporate-tech exclusions

Reject these familiar shortcuts:

- glowing brains, neural webs, circuit boards, data streams, and robot heads;
- blue-purple gradients, neon rims, chromatic glow, and sci-fi darkness;
- floating glass dashboards, translucent cards, and generic SaaS interfaces;
- isometric offices, server stacks, handshakes, rockets, lightbulbs, and stock
  business metaphors;
- random sparkles, particles, swooshes, arrows, and decorative connectors;
- fake labels, illegible interface text, logos, watermarks, and brand marks;
- uniformly distributed detail with no visual hierarchy;
- smooth plastic 3D icons or emoji-like objects.

The image should communicate through one specific physical metaphor, not a
collage of symbols for technology.

## Acceptance test

View the image at its intended CSS width. In three seconds, a viewer should be
able to identify the dominant object and understand the broad subject. The
background should recede, crimson should guide attention, and no detail should
depend on zooming in.
