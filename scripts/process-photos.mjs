#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

function loadSharp() {
  const req = createRequire(path.join(PROJECT_ROOT, 'package.json'));
  try {
    return req('sharp');
  } catch {
    // fall through to the message below
  }
  throw new Error(
    'Could not resolve "sharp" module. Install it beside this project, ' +
      'for example "npm install --no-save sharp" in the project root.',
  );
}

const sharp = loadSharp();

const LICENSING_URL = 'https://zhiganovsasha.github.io/art/photography/licensing/';
const PASSPORT_AUTHOR = 'Aleksandr Zhiganov';
const PUBLIC_AUTHOR = 'Alexander Zhiganov';
const INSTAGRAM_URL = 'https://www.instagram.com/zhiganovsasha/';
const LINKEDIN_URL = 'https://linkedin.com/in/zhiganovsasha';

/**
 * Curated metadata map for the initial 22 test photographs from DME Spotting.
 * Any additional files in --source will also be processed automatically with
 * sequential AZ-PH-XXXX codes and extracted EXIF year.
 */
const CURATED_METADATA = {
  'IMG_9546.jpg': {
    code: 'AZ-PH-0001',
    alt: 'Singapore Airlines Airbus A350-900 parked on a snow-covered apron during snowfall, showing curved winglet, turbofan engine, and forward fuselage.',
    location: 'Moscow',
    collections: ['events', 'architecture'],
    featured: true,
  },
  'IMG_9555.jpg': {
    code: 'AZ-PH-0002',
    alt: 'Low-angle wide view across snowy tarmac of a Singapore Airlines Airbus A350-900 undergoing winter de-icing service by airport trucks.',
    location: 'Moscow',
    collections: ['landscape', 'events'],
    featured: true,
  },
  'IMG_9674.jpg': {
    code: 'AZ-PH-0003',
    alt: 'Airport security officer in a high-visibility neon jacket standing on a snow-swept apron at dusk with airliners parked behind.',
    location: 'Moscow',
    collections: ['street', 'portraits'],
    featured: true,
  },
  'IMG_9683.jpg': {
    code: 'AZ-PH-0004',
    alt: 'Monochrome close-up of a jet turbofan engine intake showing radial fan blades, central white spinner spiral, and swirling snowflakes.',
    location: 'Moscow',
    collections: ['architecture', 'film'],
    featured: true,
  },
  'IMG_9684.jpg': {
    code: 'AZ-PH-0005',
    alt: 'Man in a red winter jacket and reflective vest posing with thumbs up beneath a large jet engine intake.',
    location: 'Moscow',
    collections: ['portraits', 'mobile'],
    featured: false,
  },
  'IMG_9685.jpg': {
    code: 'AZ-PH-0006',
    alt: 'Portrait of a spotter in a grey beanie and red parka standing on snowy tarmac in front of a turbofan engine.',
    location: 'Moscow',
    collections: ['portraits'],
    featured: false,
  },
  'IMG_9686.jpg': {
    code: 'AZ-PH-0007',
    alt: 'Full-length vertical portrait of a visitor in high-visibility gear smiling beneath the circular cowling of an airliner jet engine.',
    location: 'Moscow',
    collections: ['portraits', 'events'],
    featured: true,
  },
  'IMG_9688.jpg': {
    code: 'AZ-PH-0008',
    alt: 'Spotter in winter jacket and neon safety vest holding rolled papers while posing under a large aircraft engine cowling.',
    location: 'Moscow',
    collections: ['portraits', 'mobile'],
    featured: false,
  },
  'IMG_9689.jpg': {
    code: 'AZ-PH-0009',
    alt: 'Vertical shot of a man in a red winter coat standing in footprints on snowy tarmac beneath a turbofan intake.',
    location: 'Moscow',
    collections: ['portraits'],
    featured: false,
  },
  'IMG_9690.jpg': {
    code: 'AZ-PH-0010',
    alt: 'Man wearing a knit beanie and reflective safety vest posing in front of dark jet fan blades on winter apron.',
    location: 'Moscow',
    collections: ['portraits', 'mobile'],
    featured: false,
  },
  'IMG_9691.jpg': {
    code: 'AZ-PH-0011',
    alt: 'Spotter wearing a festive Santa hat and neon vest standing on snow beneath a wide-body aircraft turbofan engine intake.',
    location: 'Moscow',
    collections: ['portraits', 'events'],
    featured: false,
  },
  'IMG_9692.jpg': {
    code: 'AZ-PH-0012',
    alt: 'Vertical portrait of a man in a Santa hat and red jacket posing under a snow-dusted jet engine nacelle.',
    location: 'Moscow',
    collections: ['portraits'],
    featured: false,
  },
  'IMG_9693.jpg': {
    code: 'AZ-PH-0013',
    alt: 'Man in a Santa hat giving a thumbs up in front of a jet engine with ground crew behind.',
    location: 'Moscow',
    collections: ['portraits', 'street'],
    featured: false,
  },
  'IMG_9694.jpg': {
    code: 'AZ-PH-0014',
    alt: 'Winter apron portrait of a spotter in a red Santa cap framed against the circular intake of a turbofan engine.',
    location: 'Moscow',
    collections: ['portraits'],
    featured: false,
  },
  'IMG_9701.jpg': {
    code: 'AZ-PH-0015',
    alt: 'Airport apron shuttle bus driving forward through heavy falling snow at dusk with warm headlights illuminating the icy road.',
    location: 'Moscow',
    collections: ['street', 'events'],
    featured: true,
  },
  'IMG_9710.jpg': {
    code: 'AZ-PH-0016',
    alt: 'Black and white rear view of a wide-body airliner taxiing across a snowy runway toward brightly lit airport terminals.',
    location: 'Moscow',
    collections: ['film', 'landscape'],
    featured: true,
  },
  'IMG_9732.jpg': {
    code: 'AZ-PH-0017',
    alt: 'Long-exposure night view through a raindrop-covered window showing glowing light trails of an aircraft moving along the dark runway.',
    location: 'Moscow',
    collections: ['street', 'film'],
    featured: true,
  },
  'IMG_9746.jpg': {
    code: 'AZ-PH-0018',
    alt: 'Regional passenger jet illuminated by runway lights taxiing past a glowing red holding point sign against a dark sky.',
    location: 'Moscow',
    collections: ['landscape', 'events'],
    featured: false,
  },
  'IMG_9781.jpg': {
    code: 'AZ-PH-0019',
    alt: 'Square night photograph of a Thai Airways Boeing 747 taxiing on snowy tarmac with a bright starburst landing light.',
    location: 'Moscow',
    collections: ['events', 'architecture'],
    featured: true,
  },
  'IMG_9786.jpg': {
    code: 'AZ-PH-0020',
    alt: 'Side profile of a Thai Airways Boeing 747 forward fuselage and iconic upper deck illuminated against the night sky.',
    location: 'Moscow',
    collections: ['architecture', 'events'],
    featured: true,
  },
  'IMG_9789.jpg': {
    code: 'AZ-PH-0021',
    alt: 'Monochrome night shot of a Thai Airways Boeing 747 nose and wing root with wing lights piercing blowing snow.',
    location: 'Moscow',
    collections: ['film', 'architecture'],
    featured: true,
  },
  'IMG_9807.jpg': {
    code: 'AZ-PH-0022',
    alt: 'Night apron scene with Thai Airways and Emirates wide-body jets parked under floodlights reflected in icy slush puddles.',
    location: 'Moscow',
    collections: ['landscape', 'street'],
    featured: true,
  },
};

function createWatermarkSvg(width, height) {
  const stepX = 360;
  const stepY = 160;
  const diag = Math.ceil(Math.hypot(width, height));
  const cols = Math.ceil(diag / stepX) + 2;
  const rows = Math.ceil(diag / stepY) + 2;
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);

  const items = [];
  for (let r = -rows; r <= rows; r++) {
    const rowOffset = (r & 1) !== 0 ? stepX / 2 : 0;
    const y = r * stepY;
    for (let c = -cols; c <= cols; c++) {
      const x = c * stepX + rowOffset;
      items.push(`<text x="${x}" y="${y}">ALEXANDER ZHIGANOV</text>`);
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <g
    transform="translate(${cx}, ${cy}) rotate(-24)"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-size="13"
    font-weight="600"
    letter-spacing="4"
    fill="#ffffff"
    fill-opacity="0.16"
    stroke="#000000"
    stroke-opacity="0.10"
    stroke-width="0.6"
  >
    ${items.join('\n    ')}
  </g>
</svg>`;
  return Buffer.from(svg, 'utf8');
}

function createIptcXmp(code, year) {
  const copyrightYear = year || '2026';
  return `<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"
    xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"
    xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/">
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${code}</rdf:li></rdf:Alt></dc:title>
   <dc:creator><rdf:Seq><rdf:li>${PASSPORT_AUTHOR}</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">Copyright ${copyrightYear} ${PUBLIC_AUTHOR}. All rights reserved.</rdf:li></rdf:Alt></dc:rights>
   <photoshop:Credit>${PUBLIC_AUTHOR}</photoshop:Credit>
   <xmpRights:Marked>True</xmpRights:Marked>
   <xmpRights:WebStatement>${LICENSING_URL}</xmpRights:WebStatement>
   <Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture</Iptc4xmpExt:DigitalSourceType>
   <plus:Licensor>
    <rdf:Seq>
     <rdf:li rdf:parseType="Resource">
      <plus:LicensorName>${PUBLIC_AUTHOR}</plus:LicensorName>
      <plus:LicensorURL>${LICENSING_URL}</plus:LicensorURL>
     </rdf:li>
    </rdf:Seq>
   </plus:Licensor>
   <Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource">
    <Iptc4xmpCore:CiUrlWork>${LICENSING_URL}</Iptc4xmpCore:CiUrlWork>
    <Iptc4xmpCore:CiEmailWork>zhiganovalex@gmail.com</Iptc4xmpCore:CiEmailWork>
   </Iptc4xmpCore:CreatorContactInfo>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function extractYearFromExif(exifBuffer) {
  if (!exifBuffer) return undefined;
  const raw = exifBuffer.toString('latin1');
  const match = raw.match(/(19\d{2}|20\d{2}):(0[1-9]|1[0-2]):([0-2]\d|3[01])/);
  return match ? match[1] : undefined;
}

function parseArgs(argv) {
  const opts = {
    source: null,
    pilot: false,
    limit: 0,
  };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--pilot') {
      opts.pilot = true;
      opts.limit = 8;
    } else if (arg === '--source' && argv[i + 1]) {
      opts.source = argv[++i];
    } else if (arg === '--limit' && argv[i + 1]) {
      opts.limit = Number.parseInt(argv[++i], 10) || 0;
    }
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv);
  const sourceDir = opts.source;

  if (!sourceDir) {
    throw new Error(
      'Missing required argument --source <folder with photos>. ' +
        'Example: node scripts/process-photos.mjs --source "/path/to/processed" --pilot',
    );
  }

  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  const thumbDir = path.join(PROJECT_ROOT, 'public/images/art/photos/thumbs');
  const fullDir = path.join(PROJECT_ROOT, 'public/images/art/photos/full');
  const contentDir = path.join(PROJECT_ROOT, 'src/content/photos');

  fs.mkdirSync(thumbDir, { recursive: true });
  fs.mkdirSync(fullDir, { recursive: true });
  fs.mkdirSync(contentDir, { recursive: true });

  const allFiles = fs
    .readdirSync(sourceDir)
    .filter((f) => /\.(jpe?g|png|webp|tif?f)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'en'));

  const files = opts.limit > 0 ? allFiles.slice(0, opts.limit) : allFiles;

  console.log(
    `Processing ${files.length} photograph(s) from "${sourceDir}"${opts.pilot ? ' [PILOT MODE]' : ''}...`
  );

  for (let idx = 0; idx < files.length; idx++) {
    const filename = files[idx];
    const inputPath = path.join(sourceDir, filename);
    const curated = CURATED_METADATA[filename];

    const order = idx + 1;
    const code = curated?.code || `AZ-PH-${String(order).padStart(4, '0')}`;
    const slug = code.toLowerCase();

    const srcImage = sharp(inputPath, { failOn: 'none' });
    const srcMeta = await srcImage.metadata();
    const extractedYear = extractYearFromExif(srcMeta.exif);
    const year = curated?.year || extractedYear;

    // 1. Clean grid thumbnail (~900px longest edge, WebP, no watermark, stripped EXIF/GPS)
    const { data: thumbRaw, info: thumbInfo } = await sharp(inputPath)
      .rotate()
      .resize({
        width: 900,
        height: 900,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const thumbOutPath = path.join(thumbDir, `${slug}.webp`);
    await sharp(thumbRaw, {
      raw: {
        width: thumbInfo.width,
        height: thumbInfo.height,
        channels: thumbInfo.channels,
      },
    })
      .webp({ quality: 84, effort: 5 })
      .toFile(thumbOutPath);

    // 2. Fullscreen version (1800-2000px longest edge -> 1920px, delicate repeating watermark, IPTC/XMP, progressive JPEG, zero EXIF/GPS)
    const { data: fullResizedRaw, info: fullInfo } = await sharp(inputPath)
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const wmSvg = createWatermarkSvg(fullInfo.width, fullInfo.height);
    const xmpString = createIptcXmp(code, year);

    const { data: watermarkedRaw, info: wmInfo } = await sharp(fullResizedRaw, {
      raw: {
        width: fullInfo.width,
        height: fullInfo.height,
        channels: fullInfo.channels,
      },
    })
      .composite([{ input: wmSvg, top: 0, left: 0 }])
      .raw()
      .toBuffer({ resolveWithObject: true });

    const fullOutPath = path.join(fullDir, `${slug}.jpg`);
    await sharp(watermarkedRaw, {
      raw: {
        width: wmInfo.width,
        height: wmInfo.height,
        channels: wmInfo.channels,
      },
    })
      .withXmp(xmpString)
      .jpeg({ quality: 88, progressive: true, mozjpeg: true })
      .toFile(fullOutPath);

    // 3. Write single-source-of-truth JSON entry
    const entry = {
      code,
      slug,
      order,
      alt:
        curated?.alt ||
        `Photograph ${code} by Alexander Zhiganov${year ? ` (${year})` : ''}.`,
      ...(year ? { year } : {}),
      ...(curated?.location ? { location: curated.location } : {}),
      collections: curated?.collections || ['events'],
      featured: curated?.featured ?? order <= 12,
      thumbSrc: `/images/art/photos/thumbs/${slug}.webp`,
      thumbWidth: thumbInfo.width,
      thumbHeight: thumbInfo.height,
      fullSrc: `/images/art/photos/full/${slug}.jpg`,
      fullWidth: wmInfo.width,
      fullHeight: wmInfo.height,
    };

    const jsonPath = path.join(contentDir, `${slug}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(entry, null, 2) + '\n', {
      encoding: 'utf8',
    });

    console.log(
      `  [${String(order).padStart(2, '0')}/${files.length}] ${code} (${filename}) -> thumb ${thumbInfo.width}x${thumbInfo.height} WebP, full ${wmInfo.width}x${wmInfo.height} JPEG`
    );
  }

  // Write Adobe Content Authenticity manifest instructions helper
  const c2paReadiness = {
    tool: 'Adobe Content Authenticity (Web App)',
    batchLimit: 50,
    authorPassportName: PASSPORT_AUTHOR,
    watermarkAndSiteName: PUBLIC_AUTHOR,
    socialAccounts: {
      linkedin: LINKEDIN_URL,
      instagram: INSTAGRAM_URL,
    },
    doNotTrainAiAssertion: true,
    licensingUrl: LICENSING_URL,
    fullJpegDirectory: 'public/images/art/photos/full/',
    processedCount: files.length,
  };
  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'public/images/art/photos/c2pa-profile.json'),
    JSON.stringify(c2paReadiness, null, 2) + '\n',
    { encoding: 'utf8' }
  );

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
