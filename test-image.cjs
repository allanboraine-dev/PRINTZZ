const https = require('https');

https.get("https://image.pollinations.ai/prompt/test", (res) => {
  console.log("Status Code:", res.statusCode);
  console.log("Content-Type:", res.headers['content-type']);
}).on('error', (e) => {
  console.error("Error:", e);
});
