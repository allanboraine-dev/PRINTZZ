const https = require('https');

const input = "design a bomber jacket with BORAINE TECH logo";
const imagePrompt = `A professional, high-quality product photo or mockup showing this custom print design concept: ${input}. Clean studio lighting, photorealistic.`;
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=800&height=800&nologo=true`;

console.log("Fetching URL:", url);

https.get(url, (res) => {
  console.log("Status Code:", res.statusCode);
  console.log("Content-Type:", res.headers['content-type']);
  
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log("Redirect Location:", res.headers.location);
  }
}).on('error', (e) => {
  console.error("Error:", e);
});
