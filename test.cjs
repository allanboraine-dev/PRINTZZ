const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR LOG:', msg.text());
    } else {
      console.log('PAGE LOG:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE UNCAUGHT EXCEPTION:', error.message);
  });

  page.on('requestfailed', request => {
    console.log('PAGE REQUEST FAILED:', request.url(), request.failure().errorText);
  });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  await browser.close();
})();
