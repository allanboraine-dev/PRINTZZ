const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    
    // Find input placeholder
    const aiInput = page.locator('input[placeholder*="Ex: I need a professional looking hoodie"]');
    await aiInput.scrollIntoViewIfNeeded();
    await aiInput.fill("design a bomber jacket with BORAINE TECH logo");
    
    // Click send button
    const sendButton = aiInput.locator('xpath=following-sibling::button');
    await sendButton.click();
    console.log("Submitted prompt...");
    
    await page.waitForTimeout(10000); // Wait for response
    
    // Screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log("Screenshot saved to screenshot.png");
    
    // Log outerHTML of the AI container
    const container = page.locator('#ai-assistant');
    const html = await container.evaluate(el => el.outerHTML);
    fs.writeFileSync('ai-container.html', html);
    console.log("Saved HTML to ai-container.html");

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await browser.close();
  }
})();
