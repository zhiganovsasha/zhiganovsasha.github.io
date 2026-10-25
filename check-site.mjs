import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const results = [];
const check = (name, ok, extra = '') =>
  results.push(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Home: dialog via click
await page.goto(base + '/');
await page.click('[data-dialog="dialog-art"]');
check('dialog opens on click', await page.locator('#dialog-art').isVisible());
check(
  'URL unchanged after dialog',
  page.url() === base + '/',
  page.url()
);
await page.keyboard.press('Escape');
check('dialog closes on Escape', !(await page.locator('#dialog-art').isVisible()));

// Dialog via keyboard
await page.focus('[data-dialog="dialog-blog"]');
await page.keyboard.press('Enter');
check('dialog opens via keyboard', await page.locator('#dialog-blog').isVisible());
await page.click('#dialog-blog [data-close]');
check('dialog closes via Close button', !(await page.locator('#dialog-blog').isVisible()));

// CV dropdown
await page.click('.cv-trigger');
check('CV menu opens', await page.locator('.cv-menu.open').isVisible());
check(
  'CV menu aria-expanded',
  (await page.getAttribute('.cv-trigger', 'aria-expanded')) === 'true'
);
const cvHref = await page.getAttribute('.cv-menu a', 'href');
check('CV active item href', cvHref === '/cv/Alexander-Zhiganov-CV-AI-Developer.pdf', cvHref);
const disabled = await page.locator('.cv-menu span[aria-disabled="true"]').count();
check('CV disabled items count', disabled === 2, String(disabled));
await page.keyboard.press('Escape');
check('CV menu closes on Escape', !(await page.locator('.cv-menu.open').isVisible()));

// CV PDF reachable
const resp = await page.request.get(base + '/cv/Alexander-Zhiganov-CV-AI-Developer.pdf');
check('CV PDF 200', resp.status() === 200);

// Active nav state
await page.goto(base + '/development');
check(
  'AI Development aria-current',
  (await page.getAttribute('.main-nav a[href="/development"]', 'aria-current')) === 'page'
);

// Anchor card to video section
await page.click('a[href="#ai-video-production"]');
check('anchor card scrolls to section', page.url().includes('#ai-video-production'));

// YouTube embeds use nocookie
const frames = await page.locator('.video-frame iframe').all();
const srcs = await Promise.all(frames.map((f) => f.getAttribute('src')));
check('two video embeds', frames.length === 2);
check(
  'embeds use youtube-nocookie',
  srcs.every((s) => s.startsWith('https://www.youtube-nocookie.com/embed/'))
);

// Email has no mailto
const mailto = await page.locator('a[href^="mailto:"]').count();
check('no mailto links anywhere', mailto === 0);

// Case study back link
await page.goto(base + '/development/blob-tracker');
await page.click('.back');
check('back link returns to /development', page.url() === base + '/development');

// Mobile: dialog opens on tap
const mob = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
});
await mob.goto(base + '/');
await mob.tap('[data-dialog="dialog-education"]');
check('mobile tap opens dialog', await mob.locator('#dialog-education').isVisible());

// Middle dot check across pages
for (const p of ['/', '/development', '/development/shum-brain', '/development/studio-shum-ru', '/development/shum-telegram-assistant', '/development/blob-tracker']) {
  await page.goto(base + p);
  const text = await page.evaluate(() => document.body.innerText);
  check(`no middle dot on ${p}`, !text.includes('·'));
}

await browser.close();
console.log(results.join('\n'));
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
