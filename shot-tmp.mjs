import { chromium } from 'playwright-core';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1300, height: 1700 }, deviceScaleFactor: 2 });
await p.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
for (let y=0; y<36000; y+=500){ await p.evaluate(_y=>window.scrollTo(0,_y), y); await p.waitForTimeout(50); }
await p.waitForTimeout(800);
const grid = await p.$('#green .capsule-grid');
await grid.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
await p.evaluate(async () => { const imgs=[...document.querySelectorAll('#green img')]; await Promise.all(imgs.map(i=>i.complete?1:new Promise(r=>{i.onload=r;i.onerror=r;}))); });
await p.waitForTimeout(600);
await grid.screenshot({ path: '/tmp/green2.png' });
console.log('saved');
await b.close();
