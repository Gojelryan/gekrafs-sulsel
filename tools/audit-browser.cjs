// Run with PLAYWRIGHT_MODULE pointing to an installed playwright module.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://127.0.0.1:5500', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.portfolio-card').count(), 8);
      if (width < 1024) {
        await page.locator('#menu-toggle').click();
        assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'), 'false');
        await page.locator('#menu-toggle').click();
        await page.locator('#mobile-menu a[href="#program"]').click();
        assert.equal(await page.locator('#mobile-menu').isVisible(), false);
      }
      for (const card of await page.locator('.portfolio-card').all()) {
        await card.click();
        assert.equal(await page.locator('#portfolio-dialog').isVisible(), true);
        await page.waitForFunction(() => document.querySelector('#portfolio-detail-image').naturalWidth > 0);
        assert.equal(await page.locator('#portfolio-detail-contact').isVisible(), false);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#portfolio-dialog').isVisible(), false);
      }
      await page.evaluate(async () => {
        for (const image of document.images) {
          if (image.getAttribute('src')) { image.loading = 'eager'; await image.decode().catch(() => {}); }
        }
      });
      const audit = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
        const classes = new Set([...document.querySelectorAll('[class]'), ...document.querySelector('template').content.querySelectorAll('[class]')].flatMap(el => [...el.classList]));
        const unusedClasses = [];
        function scan(rules) {
          for (const rule of rules) {
            if (rule.cssRules) scan(rule.cssRules);
            if (rule.selectorText) for (const match of rule.selectorText.matchAll(/\.([a-z][a-z0-9-]*)/g)) if (!classes.has(match[1])) unusedClasses.push(match[1]);
          }
        }
        for (const sheet of document.styleSheets) if (sheet.href?.startsWith(location.origin)) scan(sheet.cssRules);
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
          brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
          missingImages: [...document.images].filter(img => img.getAttribute('src') && !img.naturalWidth).map(img => new URL(img.src).pathname),
          unusedClasses: [...new Set(unusedClasses)],
          tailwindLoaded: getComputedStyle(document.querySelector('header')).position === 'sticky',
        };
      });
      assert.equal(audit.overflow, false);
      assert.deepEqual(audit.duplicateIds, []);
      assert.deepEqual(audit.brokenAnchors, []);
      assert.deepEqual(audit.unusedClasses, []);
      assert.equal(audit.missingImages.length, 8);
      assert(audit.missingImages.every(src => src.startsWith('/assets/images/pengurus/')));
      assert.deepEqual(errors, []);
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 0); });
      const out = path.join(__dirname, '../artifacts');
      fs.mkdirSync(out, { recursive: true });
      await page.screenshot({ path: path.join(out, `preview-${width}.png`), fullPage: true });
      results.push({ width, ...audit, errors });
      await page.close();
    }
    fs.writeFileSync(path.join(__dirname, '../artifacts/browser-audit.json'), JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
