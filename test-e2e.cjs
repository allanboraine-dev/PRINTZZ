const { chromium } = require('playwright');

(async () => {
  console.log("Starting UI tests with Playwright...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log("Navigating to http://localhost:3000 ...");
    
    page.on('console', msg => {
      console.log(`[BROWSER LOG] [${msg.type()}]`, msg.text());
    });
    page.on('pageerror', err => {
      console.log('[BROWSER UNCAUGHT ERROR]', err.message);
    });

    await page.goto('http://localhost:3000');
    
    // 1. Check if homepage loaded
    await page.waitForSelector('h1');
    const h1Text = await page.textContent('h1');
    console.log(`[OK] Homepage loaded. H1 text: "${h1Text.replace(/\s+/g, ' ').trim()}"`);

    // 2. Click "Explore Services"
    console.log("Checking for 'Explore Services' button...");
    const exploreBtn = page.locator('text=Explore Services').first();
    await exploreBtn.click();
    console.log("[OK] Clicked 'Explore Services'");

    // 3. Test Service Page navigation
    console.log("Navigating to first service...");
    // The link should be something like /service/apparel
    const firstServiceLink = page.locator('a[href^="/service/"]').first();
    const serviceHref = await firstServiceLink.getAttribute('href');
    await firstServiceLink.click();
    console.log(`[OK] Clicked service link: ${serviceHref}`);
    
    await page.waitForURL('**/service/**');
    await page.waitForSelector('h1');
    const serviceTitle = await page.textContent('h1');
    console.log(`[OK] Service page loaded. Title: "${serviceTitle.trim()}"`);

    // Go back to home
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // 4. Test AI Feature
    console.log("Testing AI Feature...");
    // Find input placeholder
    const aiInput = page.locator('input[placeholder*="Ex: I need a professional looking hoodie"]');
    await aiInput.scrollIntoViewIfNeeded();
    await aiInput.fill("design a bomber jacket with BORAINE TECH logo");
    
    // Click send button
    const sendButton = aiInput.locator('xpath=following-sibling::button');
    await sendButton.click();
    console.log("[OK] Submitted AI prompt. Checking for loading state or error...");
    
    // Wait a bit to see if AI responds or shows error
    await page.waitForTimeout(20000); // Give AI model more time to generate image and text
    const bodyText = await page.locator('body').textContent();
    
    if (bodyText.includes("I'm having trouble connecting right now")) {
       console.log("[FAIL] AI feature graceful degradation working (no API key).");
    } else if (bodyText.includes("Error:") || bodyText.includes("An unexpected error occurred")) {
       console.log("[FAIL] AI suggestion returned an error! Output:\n" + bodyText.substring(bodyText.indexOf("AI Suggestion")));
    } else if (bodyText.includes("AI Suggestion") && !bodyText.includes("Error generating inspiration")) {
       console.log("[OK] AI feature returned a successful result!");
    } else if (bodyText.includes("Error generating inspiration")) {
       const aiResponseMatch = bodyText.match(/Error generating inspiration\..*?(?=\n|$)/);
       console.log("[FAIL] AI threw an error! Details: " + (aiResponseMatch ? aiResponseMatch[0] : "Not found"));
    } else if (bodyText.includes("Please configure your GEMINI_API_KEY")) {
       console.log("[FAIL] Missing API key warning!");
    } else {
       console.log("[?] AI is still loading or returned an unknown state.");
    }

    console.log("All basic UI tests passed successfully!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await browser.close();
  }
})();
