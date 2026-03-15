import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const states = JSON.parse(readFileSync(join(rootDir, 'data/states.json'), 'utf-8'));
const cities = JSON.parse(readFileSync(join(rootDir, 'data/cities.json'), 'utf-8'));
const companies = JSON.parse(readFileSync(join(rootDir, 'data/insurance-companies.json'), 'utf-8'));
const guides = JSON.parse(readFileSync(join(rootDir, 'data/guides.json'), 'utf-8'));
const carrierReviews = JSON.parse(readFileSync(join(rootDir, 'data/carrier-reviews.json'), 'utf-8'));

const baseUrl = 'https://insurerocket.com';
const today = new Date().toISOString().split('T')[0];

const urls = [];

// Static pages
urls.push({ loc: '/', priority: '1.0', changefreq: 'weekly' });
urls.push({ loc: '/about', priority: '0.5', changefreq: 'monthly' });
urls.push({ loc: '/medicare-advantage', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/medicare-supplement', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/prescription-drug-plans', priority: '0.9', changefreq: 'weekly' });
urls.push({ loc: '/insurance-guides', priority: '0.8', changefreq: 'weekly' });

// Medicare Advantage by state
for (const state of states) {
  urls.push({ loc: `/medicare-advantage/${state.slug}`, priority: '0.8', changefreq: 'weekly' });
}

// Medicare Supplement by state
for (const state of states) {
  urls.push({ loc: `/medicare-supplement/${state.slug}`, priority: '0.8', changefreq: 'weekly' });
}

// Insurance company reviews
for (const company of companies) {
  urls.push({ loc: `/insurance-companies/${company.slug}`, priority: '0.8', changefreq: 'monthly' });
}

// Medicare plans by city
for (const city of cities) {
  urls.push({ loc: `/medicare-plans/${city.slug}`, priority: '0.7', changefreq: 'monthly' });
}

// Guides
for (const guide of guides) {
  urls.push({ loc: `/guides/${guide.slug}`, priority: '0.7', changefreq: 'monthly' });
}

// Carrier reviews
for (const review of carrierReviews) {
  urls.push({ loc: `/reviews/${review.slug}`, priority: '0.8', changefreq: 'monthly' });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(join(rootDir, 'public/sitemap.xml'), xml);
console.log(`Sitemap generated with ${urls.length} URLs`);
