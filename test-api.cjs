const { GoogleGenAI } = require("@google/genai");

async function test() {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyApJOBbDPwjq8BhtXM4WfpVrsc6gKj99mo" });
  
  try {
    console.log("Testing structured content generation...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Design a professional bomber jacket for my tech company BORAINE TECH.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            suggestion: { type: "STRING" },
            imagePrompt: { type: "STRING" }
          },
          required: ["suggestion", "imagePrompt"]
        }
      }
    });
    console.log("Raw response text:", response.text);
    const parsed = JSON.parse(response.text);
    console.log("Parsed keys:", Object.keys(parsed));
    console.log("Suggestion:", parsed.suggestion);
    console.log("Image Prompt:", parsed.imagePrompt);
  } catch(e) {
    console.error("Structured generation failed:", e);
  }
}

test();
