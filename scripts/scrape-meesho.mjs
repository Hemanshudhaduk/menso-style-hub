// Minimal Meesho scraper tailored for this project
// Usage: node scripts/scrape-meesho.mjs https://www.meesho.com/menswear/clp/40NO 50
// Constraints: price fixed at 99, category combo2, discount derived from original price

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT, 'src');
const ASSETS_DIR = path.resolve(SRC_DIR, 'assets');
const DATA_DIR = path.resolve(SRC_DIR, 'data');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function generateId() {
  // 6-char base36-like id: [0-9a-z], ensure starts with [1-9] to match style
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let out = '';
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function sanitizeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9-_\.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$|\.$/g, '');
}

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchText(res.headers.location));
      }
      if (res.statusCode !== 200) {
        reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchBuffer(res.headers.location));
      }
      if (res.statusCode !== 200) {
        reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function extractListProducts(html) {
  // Very heuristic parser; looks for product tiles
  const items = [];
  const regex = /<a[^>]+href=\"\/([^\"]+)\"[^>]*>([\s\S]*?)<\/a>/g;
  const base = 'https://www.meesho.com/';
  const seen = new Set();
  let m;
  while ((m = regex.exec(html))) {
    const href = m[1];
    if (!href.endsWith('\n') && !seen.has(href) && /\/p\//.test(href)) {
      seen.add(href);
      items.push(base + href);
    }
  }
  return items;
}

function extractProductDetails(html) {
  // Best-effort extraction: name, originalPrice, rating, reviews, image urls
  const nameMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'Men Shirt';

  // Price parsing (display price). We'll set price=99, use this as originalPrice
  const priceMatch = html.match(/₹\s*([0-9][0-9,]*)/);
  const originalPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : 299;

  const ratingMatch = html.match(/([3-5](?:\.[0-9])?)\s*Star/i);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0;

  const reviewsMatch = html.match(/([0-9][0-9,]*)\s*Reviews/i);
  const reviews = reviewsMatch ? parseInt(reviewsMatch[1].replace(/,/g, ''), 10) : 1000;

  const imgUrls = Array.from(new Set([...
    (html.match(/https:\/\/[^\"']+\.(?:webp|avif|jpg|jpeg|png)/gi) || [])
  ])).slice(0, 4);

  // basic description lines
  const description = name;
  const fabric = 'Cotton';
  const care = 'Hand Wash';
  const shipping = '5-7 Days';

  return { name, originalPrice, rating, reviews, imgUrls, description, fabric, care, shipping };
}

async function downloadImages(id, imgUrls) {
  const dir = path.join(ASSETS_DIR, id);
  await fs.mkdir(dir, { recursive: true });
  const localPaths = [];
  let index = 1;
  for (const url of imgUrls) {
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    const file = `${id}_${index}${ext}`;
    const filePath = path.join(dir, file);
    try {
      const buf = await fetchBuffer(url);
      await fs.writeFile(filePath, buf);
      localPaths.push({ importPath: `@/assets/${id}/${file}`, fileName: file });
      index++;
      await sleep(150);
    } catch (e) {
      // skip failed image
    }
  }
  return localPaths;
}

function computeDiscount(original) {
  const price = 99;
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}

async function main() {
  const listUrl = process.argv[2] || 'https://www.meesho.com/menswear/clp/40NO';
  const targetCount = parseInt(process.argv[3] || '50', 10);

  console.log('Fetching list:', listUrl);
  const listHtml = await fetchText(listUrl);
  let productLinks = extractListProducts(listHtml);
  if (productLinks.length === 0) {
    console.log('No links found on listing page. You may need to provide direct product URLs.');
  }

  // Ensure at least one provided example link is included
  productLinks = Array.from(new Set(['https://www.meesho.com/fatty-mouse-mens-shirts/p/auq8a', ...productLinks]));
  productLinks = productLinks.slice(0, targetCount);

  const results = [];
  for (const link of productLinks) {
    try {
      console.log('Fetching product:', link);
      const html = await fetchText(link);
      const det = extractProductDetails(html);
      const id = generateId();
      const images = await downloadImages(id, det.imgUrls);
      if (images.length === 0) continue;
      const price = 99;
      const discount = computeDiscount(det.originalPrice);

      results.push({ id, ...det, price, discount, images });
      await sleep(250);
    } catch (e) {
      console.warn('Skip product due to error:', e.message);
    }
  }

  // Build TS module
  const imports = results
    .map((p) => p.images.map((im, idx) => `import ${p.id}_${idx + 1} from '${im.importPath}';`).join('\n'))
    .join('\n');

  const entries = results.map((p) => `{
    id: "${p.id}",
    name: ${JSON.stringify(p.name)},
    price: 99,
    originalPrice: ${p.originalPrice},
    discount: ${p.discount},
    rating: ${p.rating},
    reviews: ${p.reviews},
    image: ${p.id}_1,
    images: [${p.images.map((_, idx) => `${p.id}_${idx + 1}`).join(', ')}],
    category: "combo2",
    sizes: ["S","M","L","XL","XXL","XXXL"],
    description: ${JSON.stringify(p.description)},
    fabric: ${JSON.stringify(p.fabric)},
    care: ${JSON.stringify(p.care)},
    shipping: ${JSON.stringify(p.shipping)},
    details: { kurta: [], pants: [], dupatta: [], ProductDetails: [] }
  }`).join(',\n');

  const out = `// AUTO-GENERATED by scrape-meesho.mjs
import { Product } from '@/types';
${imports}

export const generatedShirts: Product[] = [
${entries}
];
`;

  await fs.writeFile(path.join(DATA_DIR, 'generated-shirts.ts'), out, 'utf8');
  console.log('Wrote', path.join(DATA_DIR, 'generated-shirts.ts'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
