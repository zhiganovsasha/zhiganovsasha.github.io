import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const PHOTO_COLLECTION_SLUGS = [
  'street',
  'portraits',
  'landscape',
  'architecture',
  'events',
  'mobile',
  'film',
] as const;

export type PhotoCollectionSlug = (typeof PHOTO_COLLECTION_SLUGS)[number];

export interface PhotoCollectionMeta {
  slug: PhotoCollectionSlug;
  title: string;
  description: string;
  coverCode?: string;
}

export const PHOTO_COLLECTIONS: PhotoCollectionMeta[] = [
  {
    slug: 'street',
    title: 'Street',
    description:
      'Everyday urban geometry, fleeting encounters, and public space observed across cities and transit.',
    coverCode: 'AZ-PH-0015',
  },
  {
    slug: 'portraits',
    title: 'Portraits',
    description:
      'Direct portraits of people in working environments, backstage rooms, and winter aprons.',
    coverCode: 'AZ-PH-0003',
  },
  {
    slug: 'landscape',
    title: 'Landscape',
    description:
      'Wide atmospheric horizons, snowfields, industrial runways, and open terrain under changing light.',
    coverCode: 'AZ-PH-0002',
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    description:
      'Structural surfaces, engineered forms, aviation fuselages, and civic geometry.',
    coverCode: 'AZ-PH-0001',
  },
  {
    slug: 'events',
    title: 'Events',
    description:
      'Live field documentation from press runs, cultural gatherings, and operational stages.',
    coverCode: 'AZ-PH-0020',
  },
  {
    slug: 'mobile',
    title: 'Mobile',
    description:
      'Immediate pocket-camera observations captured on the move without setup.',
    coverCode: 'AZ-PH-0005',
  },
  {
    slug: 'film',
    title: 'Film',
    description:
      'Monochrome and grain-driven frames focused on contrast, texture, and nocturnal light.',
    coverCode: 'AZ-PH-0004',
  },
];

const photos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/photos' }),
  schema: z.object({
    code: z.string().regex(/^AZ-PH-\d{4}$/),
    slug: z.string().regex(/^az-ph-\d{4}$/),
    order: z.number().int().positive(),
    alt: z.string().min(5),
    year: z.string().optional(),
    location: z.string().optional(),
    collections: z.array(z.enum(PHOTO_COLLECTION_SLUGS)).min(1),
    featured: z.boolean().default(false),
    thumbSrc: z.string(),
    thumbWidth: z.number().int().positive(),
    thumbHeight: z.number().int().positive(),
    fullSrc: z.string(),
    fullWidth: z.number().int().positive(),
    fullHeight: z.number().int().positive(),
  }),
});

export const collections = { photos };
